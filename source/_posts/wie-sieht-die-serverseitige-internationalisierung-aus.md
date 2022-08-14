---
title: Wie sieht die serverseitige Internationalisierung (i18n) aus?
description: Wie sieht die serverseitige Internationalisierung (i18n) aus? CLI, Webserver, E-Mail-Generierung, serverseitig gerenderte Sites, Next.js usw.

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

label: how-does-server-side-internationalization-look-like
lang: de
hidden: true
---

![serverseitige Internationalisierung next.js](../how-does-server-side-internationalization-look-like/server_side_backend.jpg "Serverseitige Internationalisierung")

Möglicherweise wissen Sie bereits, wie Sie eine clientseitige Anwendung ordnungsgemäss internationalisieren, wie in diesem [React-basierten Tutorial](../react-i18next-de/), diesem [Angular-basierten Tutorial](../unleash-the-full-power-of-angular-i18next/) oder dieses [Vue-basierte Tutorial](../give-vue-i18n-more-superpowers/).

In diesem Blogbeitrag beleuchten wir die Serverseite.

> Warum muss ich i18n im Backend meiner Anwendung behandeln?

Denken Sie an alle benutzerseitigen Inhalte, die nicht direkt in Ihrem Browser gerendert werden ...

- Zum Beispiel bauen Sie eine [Befehlszeilenschnittstelle (CLI)](#cli)?
- Sie [senden E-Mails](#email)?
- Oder verwenden Sie [serverseitiges Rendering (SSR)](#ssr)?
- etc.

# Lassen Sie uns das überprüfen ...

Wir zeigen einige Beispiele, die [i18next](https://www.i18next.com) als i18n-Framework verwenden. Wenn Sie wissen möchten, warum wir i18next vorschlagen, werfen Sie einen Blick auf [diese Seite](https://locize.com/i18next.html).


# Befehlszeilenschnittstelle (CLI) <a name="cli"></a>

Beginnen wir mit etwas Einfachem: einer sehr kleinen CLI-App. Für dieses Beispiel verwenden wir [commander](https://github.com/tj/commander.js), ursprünglich erstellt von [TJ Holowaychuk](https://twitter.com/tjholowaychuk).
Wir definieren einen `sayhi`-Befehl mit optionalen Sprach- und Namensparametern, der mit einer Anrede in der entsprechenden Sprache antworten sollte.

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

Ok, jetzt erstellen wir eine neue `i18n.js`-Datei und richten i18next entsprechend ein:

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

Und auch unsere Übersetzungsressourcen:

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

Jetzt können wir den `i18n.js`-Export so verwenden:

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

Ok, was ist das Ergebnis?

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

**Einfach, nicht wahr?**

Wenn Sie Ihre CLI-App nicht in einer einzigen ausführbaren Datei bündeln, beispielsweise durch Verwendung von [pkg](https://github.com/vercel/pkg), können Sie auch z. B. das [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend), um Ihre Übersetzungen dynamisch zu laden, zum Beispiel so:

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

*🧑‍💻 Ein Codebeispiel finden Sie [hier](https://github.com/i18next/i18next-cli-app-example).*

## Ein möglicher nächster Schritt...

Ein möglicher nächster Schritt könnte die Professionalisierung des Übersetzungsmanagements sein.
Das bedeutet, dass die Übersetzungen in einem Übersetzungsmanagementsystem (TMS) wie [locize](https://www.locize.com) „verwaltet“ (neue Sprachen hinzufügen, neue Übersetzungen usw.) und mit Ihrem Code synchronisiert werden. Sehen Sie sich [**Schritt 1** in diesem Tutorial](https://github.com/locize/react-tutorial#step-1---keep-existing-code-setup-but-synchronize-with-locize) an, um zu sehen, wie das aussehen könnte.


# E-Mails generieren <a name="email"></a>

Ein weiterer typischer serverseitiger Anwendungsfall, der eine Internationalisierung erfordert, ist die Generierung von E-Mails.

Um dieses Ziel zu erreichen, müssen Sie normalerweise einige Rohdaten in HTML-Inhalte (oder Text) umwandeln, die in der bevorzugten Sprache des Benutzers angezeigt werden.

In diesem Beispiel verwenden wir [pug](https://pugjs.org) (früher bekannt als „Jade“ und ebenfalls ursprünglich erstellt von [TJ Holowaychuk](https://twitter.com/tjholowaychuk)), um einige zu definieren Vorlagen, die mit den in der E-Mail benötigten Daten gefüllt werden sollen, und [mjml](https://mjml.io), um den E-Mail-Inhalt tatsächlich zu gestalten.

Lassen Sie uns eine neue `mail.js`-Datei erstellen, die wir verwenden können, um dies zu erreichen.

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

Die `mailTemplate.pug` könnte so aussehen:

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

Lassen Sie uns nun einige Übersetzungen definieren...

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

...und verwenden Sie sie in einer `i18n.js`-Datei:

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

Schliesslich können alle oben genannten Elemente wie folgt verwendet werden:

```javascript
import mail from './mail.js'

import i18next from './i18n.js'

const html = mail({
  t: i18next.t,
  name: 'John'
})
// that html now can be sent via some mail provider...
```

So könnte das resultierende HTML aussehen:

![mail Vorschau](../how-does-server-side-internationalization-look-like/mail_preview.jpg)

*🧑‍💻 Ein Codebeispiel finden Sie [hier](https://github.com/i18next/i18next-fs-backend/blob/master/example/fastify/app.js#L14-L19).*


# Serverseitiges Rendern (SSR) <a name="ssr"></a>

Wir werden 2 verschiedene SSR-Beispiele ausprobieren, ein klassisches mit [Fastify with pug](#pug) und ein trendigeres mit [Next.js](#nextjs).

## Fastify mit Pug-Beispiel <a name="pug"></a>

Für dieses Beispiel verwenden wir mein bevorzugtes http-Framework [Fastify](https://www.fastify.io) (erstellt von [Matteo Collina](https://twitter.com/matteocollina) und [Tomas Della Vedova](https://twitter.com/delvedor)), aber jedes andere Framework funktioniert auch.

Dieses Mal verwenden wir ein anderes i18next-Modul, [i18next-http-middleware](https://github.com/i18next/i18next-http-middleware).
Es kann für alle Node.js-Webframeworks verwendet werden, wie [express](https://expressjs.com) oder [Fastify](https://www.fastify.io), aber auch für [Deno](../i18n-for-deno-with-i18next) Web-Frameworks wie [abc](https://github.com/zhmushan/abc) oder [ServestJS](https://github.com/keroxp/servest).

Wie bereits gesagt, verwenden wir hier [Fastify](https://www.fastify.io), mein Favorit 😉.

Beginnen wir wieder mit der Datei `i18n.js`:

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

Und unsere Übersetzungsressourcen...

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

Eine einfache pug-Vorlage:

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

Unsere "Haupt"-Datei `app.js`:

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

Starten Sie nun die App und prüfen Sie, welche Sprache Sie sehen...
![pug fastify](../how-does-server-side-internationalization-look-like/pug_fastify.jpg)

Wenn Sie die Konsolenausgabe überprüfen, sehen Sie auch Folgendes:

```sh
node app.js
# Server is listening on port 8080.
# Der server lauscht auf dem Port 8080.
# Il server sta aspettando sul port 8080.
```

*Ja, wenn Sie möchten, können Sie Ihre Protokollauszüge auch internationalisieren 😁*

*🧑‍💻 Ein Codebeispiel finden Sie [hier](https://github.com/i18next/i18next-fs-backend/tree/master/example/fastify).*

### Ein möglicher nächster Schritt...

Möchten Sie Ihre Übersetzungen in einem Übersetzungsmanagementsystem (TMS) wie [locize](https://www.locize.com) verwalten?

Verwenden Sie einfach [dieses CLI](https://github.com/locize/locize-cli), um die Übersetzungen mit Ihrem Code zu synchronisieren. Um zu sehen, wie das aussehen könnte, sehen Sie sich [**Schritt 1** in diesem Tutorial](https://github.com/locize/react-tutorial#step-1---keep-existing-code-setup-but-synchronize-with-locize) an.

Verwenden Sie alternativ [i18next-locize-backend](https://github.com/locize/i18next-locize-backend) anstelle von [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend).
Wenn Sie Ihren Code in einer serverlosen Umgebung ausführen, stellen Sie sicher, dass Sie [diesen Rat zuerst lesen](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc)!

**Übrigens: Wussten Sie, dass Sie Ihre Fastify-App ganz einfach für die Verwendung in [AWS Lambda](https://aws.amazon.com/lambda/) UND lokal anpassen können?**

Dies kann mit Hilfe von [aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify) erreicht werden.
Erstellen Sie einfach eine neue `lambda.js`, die Ihre modifizierte `app.js`-Datei importiert:

```javascript
// lambda.js
import awsLambdaFastify from 'aws-lambda-fastify'
import app from './app.js'
export const handler = awsLambdaFastify(app)
```

Stellen Sie sicher, dass Ihre Fastify-App exportiert wird ... (`export default app`)
Und beginnen Sie nur, auf einem Port zu lauschen, wenn er nicht in AWS Lambda ausgeführt wird (`import.meta.url === 'file://${process.argv[1]}'` oder `require.main === module ` für CommonJS)

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

**😎 Cool, oder?**


## Next.js-Beispiel <a name="nextjs"></a>

Jetzt ist es Zeit für [Next.js](https://nextjs.org)...

Wenn es um die Internationalisierung von Next.js-Apps geht, ist [next-i18next](https://github.com/i18next/next-i18next) eine der beliebtesten Optionen. Es basiert auf [react-i18next](https://react.i18next.com) und Benutzer von [next-i18next](https://github.com/i18next/next-i18next) müssen standardmässig einfach ihre Übersetzungsinhalte als JSON-Dateien und müssen sich um nichts weiter kümmern.

[Hier](https://github.com/i18next/next-i18next/tree/master/examples/simple) finden Sie ein einfaches Beispiel.

Sie benötigen lediglich eine `next-i18next.config.js`-Datei, die die Konfiguration für `next-i18next` bereitstellt und Ihre App mit der `appWithTranslation`-Funktion umschliesst, die es ermöglicht, die `t` (translate)-Funktion in Ihren Komponenten zu verwenden über Haken.

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

Standardmässig erwartet `next-i18next`, dass Ihre Übersetzungen wie folgt organisiert sind:

```
.
└── public
    └── locales
        ├── en
        |   └── common.json
        └── de
            └── common.json
```

A demo of how such an app looks like when it is deployed, can be found [here](https://next.i18next.com).

[![next i18next demo](../how-does-server-side-internationalization-look-like/next-i18next_demo.jpg)](https://next.i18next.com)

**Das sieht wirklich einfach aus, oder?**

## Verwalten Sie die Übersetzungen ausserhalb des Codes

Um die Übersetzungen optimal zu verwalten, gibt es drei verschiedene Ansätze:

### MÖGLICHKEIT 1: Live-Übersetzung herunterladen

Wenn Sie [locize](https://www.locize.com) verwenden, können Sie Ihr next-i18next-Projekt so konfigurieren, dass die Übersetzungen aus dem [CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) (auf Server- und Clientseite).

Eine solche Konfiguration könnte wie folgt aussehen:

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

[Hier](https://github.com/locize/next-i18next-locize#possibility-2-config-for-locize-live-download-usage) finden Sie weitere Informationen und ein Beispiel, wie dies aussieht.

Dank [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) besteht auch die Möglichkeit, die Übersetzungen lokal zwischenzuspeichern. [Hier](https://github.com/locize/next-i18next-locize#optional-server-side-caching-to-filesystem) finden Sie weitere Informationen zu dieser Option.

*Wenn Sie Ihre Next.js-App in einer serverlosen Umgebung bereitstellen, sollten Sie die zweite Möglichkeit in Betracht ziehen ...*
*Weitere Informationen zu den Gründen dafür finden Sie [hier](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc).*


### MÖGLICHKEIT 2: Übersetzungen bündeln und synchron halten

**Wenn Sie sich nicht sicher sind, wählen Sie diesen Weg.**

Diese Option ändert nicht die Konfiguration Ihres "normalen" next-i18next-Projekts:

```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  }
}
```

Laden Sie einfach Ihre lokalen Übersetzungen herunter oder synchronisieren Sie sie, bevor Sie Ihre App „bereitstellen“.

[Hier](https://github.com/locize/next-i18next-locize#possibility-2-bundle-translations-with-app) finden Sie weitere Informationen und ein Beispiel dafür, wie dies aussieht.

Sie können beispielsweise ein [npm-Skript](https://github.com/locize/next-i18next-locize/blob/main/package.json#L6) (oder ähnliches) ausführen, das die [cli ](https://github.com/locize/locize-cli), um die Übersetzungen von locize in den entsprechenden Ordner herunterzuladen, in dem next-i18next nachschaut (z. B. `./public/locales`). Auf diese Weise werden die Übersetzungen in Ihrer App gebündelt und Sie generieren während der Laufzeit keine CDN-Downloads.

i.e. `locize download --project-id=d3b405cf-2532-46ae-adb8-99e88d876733 --ver=latest --clean=true --path=./public/locales`

### Bester Ansatz: optimiert für Server- und Clientseite

[![next-i18next](../next-i18next/next-i18next.jpg)](../next-i18next/)
[Hier](../next-i18next/) finden Sie einen Blogbeitrag zur optimalen Verwendung von next-i18next mit clientseitigem Übersetzungsdownload und SEO-Optimierung.

---

Es gibt auch ein [i18next Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Fazit 🎊🎁

Wie Sie sehen, ist i18n auch serverseitig wichtig.

Ich hoffe, Sie haben ein paar neue Dinge über serverseitige Internationalisierung und moderne Lokalisierungsworkflows gelernt.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, [i18next](https://www.i18next.com) und auch [locize](https://www.locize.com) auszuprobieren.

👍