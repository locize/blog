---
title: How does server side internationalization (i18n) look like?
description: How does server side internationalization (i18n) look like? CLI, webserver, mail generation, server side rendered sites, Next.js, etc...

date: 2021-06-28 08:23:00
tags:
  - server
  - serverside
  - backend
  - cli
  - mail
  - i18n
  - i18next
  - internationalization
  - translation
  - next
  - react
categories:
  - Post
thumbnail: how-does-server-side-internationalization-look-like/server_side_backend.jpg
---

![server side internationalization next](server_side_backend.jpg "Server Side Internationalization")

You may already know how to properly internationalize a client side application, like described in this [React based tutorial](../how-to-internationalize-react-i18next/), this [Angular based tutorial](../unleash-the-full-power-of-angular-i18next/) or this [Vue based tutorial](../give-vue-i18n-more-superpowers/).

In this blog post we will shed light on the server side.

> Why do I need to handle i18n in my application's backend?

Think of all user faced content not directly rendered in your browser...

- For example you're building a [command line interface (CLI)](#cli)?
- You're [sending some emails](#email)?
- Or you're using [server side rendering (SSR)](#ssr)?
- etc.

# Let's check that out...

We will show some examples that uses [i18next](https://www.i18next.com) as i18n framework. If you're curious to know why we suggest i18next, have a look at [this page](https://locize.com/i18next.html).


# Command line interface (CLI) <a name="cli"></a>

Let's start with something simple: a verry small CLI app. For this example let's use [commander](https://github.com/tj/commander.js), originally created by [TJ Holowaychuk](https://twitter.com/tjholowaychuk).
We are defining a `sayhi` command with optional language and name parameters that should respond with a salutation in the appropriate language.

```javascript
#!/usr/bin/env node

const program = require('commander')

program
  .command('sayhi')
  .alias('s')
  .option('-l, --language <lng>', 'by default the system language is used')
  .option('-n, --name <name>', 'your name')
  .action((options) => {
    // options.language => optional language
    // options.name => optional name
    // TODO: log the salutation to the console...
  })
  .on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log('    $ mycli sayhi')
    console.log('    $ mycli sayhi --language de')
    console.log('    $ mycli sayhi --language de --name John')
    console.log()
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
```

Ok, now let's create a new `i18n.js` file and setup i18next accordingly:

```javascript
const i18next = require('i18next')

// if no language parameter is passed, let's try to use the node.js system's locale
const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale

i18next
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: require('./locales/en/translation.json')
      },
      de: {
        translation: require('./locales/de/translation.json')
      }
    }
  })

module.exports = (lng) => i18next.getFixedT(lng || systemLocale)
```

And also our translation resources:

```javascript
// locales/en/translations.json
{
  "salutation": "Hello World!",
  "salutationWithName": "Hello {{name}}!"
}

// locales/de/translations.json
{
  "salutation": "Hallo Welt!",
  "salutationWithName": "Hallo {{name}}!"
}
```

Now we can use the `i18n.js` export like that:

```javascript
#!/usr/bin/env node

const program = require('commander')
const i18n = require('../i18n.js')

program
  .command('sayhi')
  .alias('s')
  .option('-l, --language <lng>', 'by default the system language is used')
  .option('-n, --name <name>', 'your name')
  .action((options) => {
    const t = i18n(options.language)
    if (options.name) {
      console.log(t('salutationWithName', { name: options.name }))
    } else {
      console.log(t('salutation'))
    }
  })
  .on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log('    $ mycli sayhi')
    console.log('    $ mycli sayhi --language de')
    console.log('    $ mycli sayhi --language de --name John')
    console.log()
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
```

Ok, what's the result?

```sh
# if we execute the cli command without any parameters...
mycli sayhi
# result: Hello World!

# if we execute the cli command with a language parameter...
mycli sayhi --language de
# result: Hallo Welt!

# if we execute the cli command with a language parameter and a name parameter...
mycli sayhi --language de --name John
# result: Hallo John!
```

**Easy, isn't it?**

If you don't bundle your CLI app in a single executable, for example by using [pkg](https://github.com/vercel/pkg), you can also i.e. use the [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend) to dynamically load your translations, for example like this:

```javascript
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const { join } = require('path')
const { readdirSync, lstatSync } = require('fs')

// if no language parameter is passed, let's try to use the node.js system's locale
const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale

const localesFolder = join(__dirname, './locales')

i18next
  .use(Backend)
  .init({
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    fallbackLng: 'en',
    preload: readdirSync(localesFolder).filter((fileName) => {
      const joinedPath = join(localesFolder, fileName)
      return lstatSync(joinedPath).isDirectory()
    }),
    backend: {
      loadPath: join(localesFolder, '{{lng}}/{{ns}}.json')
    }
  })

module.exports = (lng) => i18next.getFixedT(lng || systemLocale)
```

*🧑‍💻 A code example can be found [here](https://github.com/i18next/i18next-cli-app-example).*

## A possible next step...

A possible next step could be to professionalize the translation management.
This means the translations would be "managed" (add new languages, new translations etc...) in a translation management system (TMS), like [locize](https://www.locize.com) and synchronized with your code. To see how this could look like, check out [**Step 1** in this tutorial](https://github.com/locize/react-tutorial#step-1---keep-existing-code-setup-but-synchronize-with-locize).


# Generate Emails <a name="email"></a>

Another typical server side use case that requires internationalization is the generation of emails.

To achieve this goal, you usually need to transform some raw data to html content (or text) to be shown in the user's preferred language.

In this example we will use [pug](https://pugjs.org) (formerly known as "Jade", and also originally created by [TJ Holowaychuk](https://twitter.com/tjholowaychuk)) to define some templates that should be filled with the data needed in the email, and [mjml](https://mjml.io) to actually design the email content.

Let's create a new `mail.js` file, which we can use, to accomplish this.

```javascript
import pug from 'pug'
import mjml2html from 'mjml'

export default (data) => {
  // first let's compile and render the mail template that will include the data needed to show in the mail content
  const mjml = pug.renderFile('./mailTemplate.pug', data)
  
  // then transform the mjml syntax to normal html
  const { html, errors } = mjml2html(mjml)
  if (errors && errors.length > 0) throw new Error(errors[0].message)

  // and return the html, if there where no errors
  return html
}
```

The `mailTemplate.pug` could look like this:

```jade
mjml
  mj-body(background-color='#F4F4F4' color='#55575d' font-family='Arial, sans-serif')
    mj-section(background-color='#024b3f' background-repeat='repeat' padding='20px 0' text-align='center' vertical-align='top')
      mj-column
        mj-image(align='center' padding='10px 25px' src='https://raw.githubusercontent.com/i18next/i18next/master/assets/i18next-ecosystem.jpg')
    mj-section(background-color='#ffffff' background-repeat='repeat' padding='20px 0' text-align='center' vertical-align='top')
      mj-column
    mj-section(background-color='#ffffff' background-repeat='repeat' background-size='auto' padding='20px 0px 20px 0px' text-align='center' vertical-align='top')
      mj-column
        mj-text(align='center' color='#55575d' font-family='Arial, sans-serif' font-size='20px' line-height='28px' padding='0px 25px 0px 25px')
          span=t('greeting', { name: name || 'there' })
          br
          br
        mj-text(align='center' color='#55575d' font-family='Arial, sans-serif' font-size='16px' line-height='28px' padding='0px 25px 0px 25px')
          =t('text')
    mj-section(background-color='#024b3f' background-repeat='repeat' padding='20px 0' text-align='center' vertical-align='top')
      mj-column
        mj-text(align='center' color='#ffffff' font-family='Arial, sans-serif' font-size='13px' line-height='22px' padding='10px 25px')
          =t('ending')&nbsp;
          a(style='color:#ffffff' href='https://www.i18next.com')
            b www.i18next.com
```

Now let's define some translations...

```javascript
// locales/en/translations.json
{
  "greeting": "Hi {{name}}!",
  "text": "You were invited to try i18next.",
  "ending": "Internationalized with"
}

// locales/de/translations.json
{
  "greeting": "Hallo {{name}}!",
  "text": "Du bist eingeladen worden i18next auszuprobieren.",
  "ending": "Internationalisiert mit"
}
```

...and use them in an `i18n.js` file:

```javascript
import { dirname, join } from 'path'
import { readdirSync, lstatSync } from 'fs'
import { fileURLToPath } from 'url'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'

const __dirname = dirname(fileURLToPath(import.meta.url))
const localesFolder = join(__dirname, './locales')

i18next
  .use(Backend) // you can also use any other i18next backend, like i18next-http-backend or i18next-locize-backend
  .init({
    // debug: true,
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    fallbackLng: 'en',
    preload: readdirSync(localesFolder).filter((fileName) => {
      const joinedPath = join(localesFolder, fileName)
      return lstatSync(joinedPath).isDirectory()
    }),
    backend: {
      loadPath: join(localesFolder, '{{lng}}/{{ns}}.json')
    }
  })

export default i18next
```

So finally, all the above can be used like that:

```javascript
import mail from './mail.js'

import i18next from './i18n.js'

const html = mail({
  t: i18next.t,
  name: 'John'
})
// that html now can be sent via some mail provider...
```

This is how the resulting html could look like:

![mail preview](mail_preview.jpg)

*🧑‍💻 A code example can be found [here](https://github.com/i18next/i18next-fs-backend/blob/master/example/fastify/app.js#L14-L19).*


# Server Side Rendering (SSR) <a name="ssr"></a>

We will try 2 different SSR examples, a classic one using [Fastify with pug](#pug) and a more trendy one using [Next.js](#nextjs).

## Fastify with Pug example <a name="pug"></a>

For this example we will use my favorite http framework [Fastify](https://www.fastify.io) (created by [Matteo Collina](https://twitter.com/matteocollina) and [Tomas Della Vedova](https://twitter.com/delvedor)), but any other framework will also work.

This time we will use a different i18next module, [i18next-http-middleware](https://github.com/i18next/i18next-http-middleware).
It can be used for all Node.js web frameworks, like [express](https://expressjs.com) or [Fastify](https://www.fastify.io), but also for Deno web frameworks, like [abc](https://github.com/zhmushan/abc) or [ServestJS](https://github.com/keroxp/servest).

As already said, here we will use [Fastify](https://www.fastify.io), my favorite 😉.

Let's again start with the `i18n.js` file:

```javascript
import { dirname, join } from 'path'
import { readdirSync, lstatSync } from 'fs'
import { fileURLToPath } from 'url'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'

const __dirname = dirname(fileURLToPath(import.meta.url))
const localesFolder = join(__dirname, '../locales')

i18next
  .use(i18nextMiddleware.LanguageDetector) // the language detector, will automatically detect the users language, by some criteria... like the query parameter ?lng=en or http header, etc...
  .use(Backend) // you can also use any other i18next backend, like i18next-http-backend or i18next-locize-backend
  .init({
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    fallbackLng: 'en',
    preload: readdirSync(localesFolder).filter((fileName) => {
      const joinedPath = join(localesFolder, fileName)
      return lstatSync(joinedPath).isDirectory()
    }),
    backend: {
      loadPath: join(localesFolder, '{{lng}}/{{ns}}.json')
    }
  })

export { i18next, i18nextPlugin: i18nextMiddleware.plugin }
```

And our translation resources...

```javascript
// locales/en/translations.json
{
  "home": {
    "title": "Hello World!"
  },
  "server": {
    "started": "Server is listening on port {{port}}."
  }
}

// locales/de/translations.json
{
  "home": {
    "title": "Hallo Welt!"
  },
  "server": {
    "started": "Der server lauscht auf dem Port {{port}}."
  }
}

// locales/it/translations.json
{
  "home": {
    "title": "Ciao Mondo!"
  },
  "server": {
    "started": "Il server sta aspettando sul port {{port}}."
  }
}
```

A simple pug template:

```jade
html
  head
    title i18next - fastify with pug
  body
    h1=t('home.title')
    div
      a(href="/?lng=en") english
      | &nbsp; | &nbsp;
      a(href="/?lng=it") italiano
      | &nbsp; | &nbsp;
      a(href="/?lng=de") deutsch
```

Our "main" file `app.js`:

```javascript
import fastify from 'fastify'
import pov from 'point-of-view'
import pug from 'pug'
import { i18next, i18nextPlugin } from './lib/i18n.js'

const port = process.env.PORT || 8080

const app = fastify()
app.register(pov, { engine: { pug } })
app.register(i18nextPlugin, { i18next })

app.get('/raw', (request, reply) => {
  reply.send(request.t('home.title'))
})

app.get('/', (request, reply) => {
  reply.view('/views/index.pug')
})

app.listen(port, (err) => {
  if (err) return console.error(err)
  // if you like you can also internationalize your log statements ;-)
  console.log(i18next.t('server.started', { port }))
  console.log(i18next.t('server.started', { port, lng: 'de' }))
  console.log(i18next.t('server.started', { port, lng: 'it' }))
})
```

Now start the app and check what language you're seeing...
![pug fastify](pug_fastify.jpg)

If you check the console output you'll also see something like this:

```sh
node app.js
# Server is listening on port 8080.
# Der server lauscht auf dem Port 8080.
# Il server sta aspettando sul port 8080.
```

*Yes, if you like, you can also internationalize your log statements 😁*

*🧑‍💻 A code example can be found [here](https://github.com/i18next/i18next-fs-backend/tree/master/example/fastify).*

### A possible next step...

Do you wish to manage your translations in a translation management system (TMS), like [locize](https://www.locize.com)?

Just use [this cli](https://github.com/locize/locize-cli) to synchronize the translations with your code. To see how this could look like check out [**Step 1** in this tutorial](https://github.com/locize/react-tutorial#step-1---keep-existing-code-setup-but-synchronize-with-locize).

Alternatively, use [i18next-locize-backend](https://github.com/locize/i18next-locize-backend) instead of the [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend).
If you're running your code in a serverless environment, make sure you [read this advice first](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc)!

**btw: Did you know, you can easily adapt your Fastify app to be used in [AWS Lambda](https://aws.amazon.com/lambda/) AND locally.**

This can be achieved with the help of [aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify).
Just create a new `lambda.js` that imports your modified `app.js` file:

```javascript
// lambda.js
import awsLambdaFastify from 'aws-lambda-fastify'
import app from './app.js'
export const handler = awsLambdaFastify(app)
```

make sure your Fastify app is exported... (`export default app`)
And only start to listen on a port, if not executed in AWS Lambda (`import.meta.url === 'file://${process.argv[1]}'` or `require.main === module` for CommonJS)

```javascript
// app.js
import fastify from 'fastify'
import pov from 'point-of-view'
import pug from 'pug'
import { i18next, i18nextPlugin } from './lib/i18n.js'

const port = process.env.PORT || 8080

const app = fastify()
app.register(pov, { engine: { pug } })
app.register(i18nextPlugin, { i18next })

app.get('/raw', (request, reply) => {
  reply.send(request.t('home.title'))
})

app.get('/', (request, reply) => {
  reply.view('/views/index.pug')
})

if (import.meta.url === `file://${process.argv[1]}`) {
  // called directly (node app.js)
  app.listen(port, (err) => {
    if (err) return console.error(err)
    console.log(i18next.t('server.started', { port }))
    console.log(i18next.t('server.started', { port, lng: 'de' }))
    console.log(i18next.t('server.started', { port, lng: 'it' }))
  })
} else {
  // imported as a module, i.e. when executed in AWS Lambda
}

export default app
```

**😎 Cool, right?**


## Next.js example <a name="nextjs"></a>

Now it's time for [Next.js](https://nextjs.org)...

When it comes to internationalization of Next.js apps one of the most popular choices is [next-i18next](https://github.com/isaachinman/next-i18next). It is based on [react-i18next](https://react.i18next.com) and users of [next-i18next](https://github.com/isaachinman/next-i18next) by default simply need to include their translation content as JSON files and don't have to worry about much else.

[Here](https://github.com/isaachinman/next-i18next/tree/master/examples/simple) you'll find a simple example.

You just need a `next-i18next.config.js` file that provides the configuration for `next-i18next` and wrapping your app with the `appWithTranslation` function, which allows to use the `t` (translate) function in your components via hooks.

```javascript
// _app.js
import { appWithTranslation } from 'next-i18next'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithTranslation(MyApp)
```

```javascript
// index.js
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// This is an async function that you need to include on your page-level components, via either getStaticProps or getServerSideProps (depending on your use case)

const Homepage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <main>
        <p>
          {t('description')}
        </p>
      </main>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
    // Will be passed to the page component as props
  },
})

export default Homepage
```

By default, `next-i18next` expects your translations to be organised as such:

```
.
└── public
    └── locales
        ├── en
        |   └── common.json
        └── de
            └── common.json
```

A demo of how such an app looks like when it is deployed, can be found [here](https://next-i18next.com).

[![next i18next demo](next-i18next_demo.jpg)](https://next-i18next.com)

**This looks really simple, right?**

## Manage the translations outside of the code

To best manage the translations there are 2 different approaches:

### POSSIBILITY 1: live translation download

When using [locize](https://www.locize.com), you can configure your next-i18next project to load the translations from the [CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) (on server and client side).

Such a configuration could look like this:

```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: {
    projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
    // apiKey: 'myApiKey', // to not add the api-key in production, used for saveMissing feature
    referenceLng: 'en'
  },
  use: [
    require('i18next-locize-backend/cjs')
  ],
  ns: ['common', 'footer', 'second-page'], // the namespaces needs to be listed here, to make sure they got preloaded
  serializeConfig: false, // because of the custom use i18next plugin
  // debug: true,
  // saveMissing: true, // to not saveMissing to true for production
}
```

[Here](https://github.com/locize/next-i18next-locize#possibility-1-config-for-locize-live-download-usage) you'll find more information and an example on how this looks like.

There is also the possibility to cache the translations locally thanks to [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend). [Here](https://github.com/locize/next-i18next-locize#optional-server-side-caching-to-filesystem) you can find more information about this option.

*If you're deploying your Next.js app in a serverless environment, consider to use the second possibility...*
*More information about the reason for this can be found [here](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc).*


### POSSIBILITY 2: bundle translations and keep in sync

**If you're not sure, choose this way.**

This option will not change the configuration of your "normal" next-i18next project:

```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  }
}
```

Just download or sync your local translations before "deploying" your app.

[Here](https://github.com/locize/next-i18next-locize#possibility-2-bundle-translations-with-app) you'll find more information and an example on how this looks like.

You can, for example, run an [npm script script](https://github.com/locize/next-i18next-locize/blob/main/package.json#L6) (or similar), which will use the [cli](https://github.com/locize/locize-cli) to download the translations from locize into the appropriate folder next-i18next is looking in to (i.e. `./public/locales`). This way the translations are bundled in your app and you will not generate any CDN downloads during runtime.

i.e. `locize download --project-id=d3b405cf-2532-46ae-adb8-99e88d876733 --ver=latest --clean=true --path=./public/locales`


# 🎉🥳 Conclusion 🎊🎁

As you see i18n is also important on server side.

I hope you’ve learned a few new things about server side internationalization and modern localization workflows.

So if you want to take your i18n topic to the next level, it's worth to try [i18next](https://www.i18next.com) and also [locize](https://www.locize.com).

👍