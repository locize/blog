---
title: Internationalization (i18n) for Deno with i18next
description: How does internationalization (i18n) for Deno look like? CLI, webserver, server side rendered sites, etc...

date: 2022-01-28 12:21:00
tags:
  - server
  - serverside
  - backend
  - cli
  - deno
  - i18n
  - i18next
  - internationalization
  - translation
  - react
  - abc
  - ejs
  - dejs
thumbnail: i18n-for-deno-with-i18next/deno_i18next.jpg
---

![Deno i18n](deno_i18next.jpg "Deno Internationalization")

You may already know how to properly internationalize a client side application, like described in this [React based tutorial](../react-i18next/), this [Angular based tutorial](../angular-i18next/) or this [Vue based tutorial](../give-vue-i18n-more-superpowers/).

In this blog post we will shed light on [Deno](https://deno.land).

> Why do I need to handle i18n in Deno?

Think of all user faced content not directly rendered in your browser...

- For example you're building a [command line interface (CLI)](#cli)?
- You're using [server side rendering (SSR)](#ssr)?
- Or you're sending some emails?
- etc.

# Let's check that out...

We will show some examples that uses [i18next](https://www.i18next.com) as i18n framework. If you're curious to know why we suggest i18next, have a look at [this page](https://locize.com/i18next.html).


# Command line interface (CLI) <a name="cli"></a>

Let's start with something simple: a verry small CLI app.
We are defining a `sayhi` command with optional language and name parameters that should respond with a salutation in the appropriate language.

```javascript
import { parse } from "https://deno.land/std/flags/mod.ts";

const { args } = Deno;
const parsedArgs = parse(args);

const cmd = parsedArgs._[0];

if (cmd !== "sayhi" && cmd !== "s") {
  throw new Error(`unknown command ${cmd}`);
}

const name = parsedArgs.n || parsedArgs.name;
const language = parsedArgs.l || parsedArgs.language;

console.log({ name, language })
```

Ok, now let's create a new `i18n.ts` file and setup i18next accordingly:

```javascript
import i18next from "https://deno.land/x/i18next/index.js";
import enTranslation from "./locales/en/translation.json" assert {
  type: "json",
};
import deTranslation from "./locales/de/translation.json" assert {
  type: "json",
};

const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

i18next
  .use(Backend)
  .init({
    // debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: enTranslation,
      },
      de: {
        translation: deTranslation,
      },
    }
  });

export default (lng: string | undefined | null) =>
  i18next.getFixedT(lng || systemLocale);
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

Now we can use the `i18n.ts` export like that:

```javascript
import { parse } from "https://deno.land/std/flags/mod.ts";
import i18n from "./i18n.ts";

const { args } = Deno;
const parsedArgs = parse(args);

const cmd = parsedArgs._[0];

if (cmd !== "sayhi" && cmd !== "s") {
  throw new Error(`unknown command ${cmd}`);
}

const name = parsedArgs.n || parsedArgs.name;
const language = parsedArgs.l || parsedArgs.language;

const t = i18n(language);
if (name) {
  console.log(t("salutationWithName", { name }));
} else {
  console.log(t("salutation"));
}
```

Ok, what's the result?

```sh
# if we execute the cli command without any parameters...
deno run --allow-read mod.ts sayhi
# result: Hello World!

# if we execute the cli command with a language parameter...
deno run --allow-read mod.ts sayhi --language de
# result: Hallo Welt!

# if we execute the cli command with a language parameter and a name parameter...
deno run --allow-read mod.ts sayhi --language de --name John
# result: Hallo John!
```

**Easy, isn't it?**

You can also i.e. use the [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend) to dynamically load your translations, for example like this:

```javascript
import i18next from "https://deno.land/x/i18next/index.js";
import Backend from "https://deno.land/x/i18next_fs_backend/index.js";

const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

i18next
  .use(Backend)
  .init({
    // debug: true,
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    fallbackLng: "en",
    preload: ['en', 'de'],
    backend: {
      loadPath: "locales/{{lng}}/{{ns}}.json",
    },
  });

export default (lng: string | undefined | null) =>
  i18next.getFixedT(lng || systemLocale);
```

*🧑‍💻 A code example can be found [here](https://github.com/i18next/i18next-cli-app-example-deno).*

## A possible next step...

A possible next step could be to professionalize the translation management.
This means the translations would be "managed" (add new languages, new translations etc...) in a translation management system (TMS), like [locize](https://www.locize.com) and synchronized with your code. To see how this could look like, check out [**Step 1** in this tutorial](https://github.com/locize/react-tutorial#step-1---keep-existing-code-setup-but-synchronize-with-locize).


# Server Side Rendering (SSR) <a name="ssr"></a>

For this example we will use the http framework [abc](https://github.com/zhmushan/abc) (created by [木杉](https://twitter.com/zhmushan), but any other framework will also work.

This time we will use a different i18next module, [i18next-http-middleware](https://github.com/i18next/i18next-http-middleware).
It can be used for all Deno web frameworks, like [abc](https://github.com/zhmushan/abc) or [ServestJS](https://github.com/keroxp/servest), but also for Node.js web frameworks, like [express](https://expressjs.com) or [Fastify](https://www.fastify.io).

As already said, here we will use [abc](https://github.com/zhmushan/abc).

Let's again start with the `i18n.js` file:

```javascript
import i18next from 'https://deno.land/x/i18next/index.js'
import Backend from 'https://deno.land/x/i18next_fs_backend/index.js'
import i18nextMiddleware from 'https://deno.land/x/i18next_http_middleware/index.js'

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    // debug: true,
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'de', 'it']
  })

export const i18n = i18next
export const middleware = i18nextMiddleware
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

A simple ejs template:

```html
<html>

  <head>
      <title>i18next - abc with dejs</title>
  </head>

  <body>
      <h1><%= t('home.title') %></h1>
      <div><a href="/?lng=en">english</a>&nbsp; | &nbsp;<a href="/?lng=de">deutsch</a> | &nbsp;<a href="/?lng=it">italiano</a></div>
      <hr />
      <div><a href=<%= "/raw?lng=" + i18n.resolvedLanguage %>>raw test</a></div>
  </body>

</html>
```

Our "main" file `index.js`:

```javascript
// deno run --allow-net --allow-read index.js
import { Application } from 'https://deno.land/x/abc/mod.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts"
import { i18n, middleware } from './i18n.js'
import { renderFile } from 'https://deno.land/x/dejs/mod.ts'

const port = config.PORT || 8080
const app = new Application()

app.renderer = {
  render(name, data) {
    return renderFile(`./views/${name}.html`, data)
  }
}

const handle = middleware.handle(i18n)

app.use((next) =>
  (c) => {
    handle(c)
    return next(c)
  }
)

app.get('/', (c) => c.render('index', { t: c.request.t, i18n: c.request.i18n }))
app.get('/raw', (c) => c.request.t('home.title'))

app.start({ port })

console.log(i18n.t('server.started', { port }))
console.log(i18n.t('server.started', { port, lng: 'de' }))
console.log(i18n.t('server.started', { port, lng: 'it' }))
```

Now start the app and check what language you're seeing...
![dejs abc](dejs_abc.jpg)

If you check the console output you'll also see something like this:

```sh
node app.js
# Server is listening on port 8080.
# Der server lauscht auf dem Port 8080.
# Il server sta aspettando sul port 8080.
```

*Yes, if you like, you can also internationalize your log statements 😁*

*🧑‍💻 A code example can be found [here](https://github.com/i18next/i18next-http-middleware/tree/master/example/deno).*

### A possible next step...

Do you wish to manage your translations in a translation management system (TMS), like [locize](https://www.locize.com)?

Just use [this cli](https://github.com/locize/locize-cli) to synchronize the translations with your code. To see how this could look like check out [**Step 1** in this tutorial](https://github.com/locize/react-tutorial#step-1---keep-existing-code-setup-but-synchronize-with-locize).

Alternatively, use [i18next-locize-backend](https://github.com/locize/i18next-locize-backend) instead of the [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend).
If you're running your code in a serverless environment, make sure you [read this advice first](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc)!

There's also an [i18next crash course video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Conclusion 🎊🎁

As you see i18n is also important for Deno.

I hope you’ve learned a few new things about Deno server side internationalization and modern localization workflows.

So if you want to take your i18n topic to the next level, it's worth to try [i18next](https://www.i18next.com) and also [locize](https://www.locize.com).

👍