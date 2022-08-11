---
title: How to internationalize a Remix application (Part 2)
description: Remix localization made easy focusing on continuous localization.

date: 2022-03-03
tags:
  - i18next
  - react
  - react-i18next
  - remix-i18next
  - remix
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
categories:
  - Post
thumbnail: remix-i18next/remix-localization.jpg
---

![remix localization](remix-localization.jpg "Remix Localization example")

In the [previous blog post](../remix-i18n/) we learned on a simple way how we can instrumented our [Remix](https://remix.run) app to be ready for localization by using [remix-i18next](https://github.com/sergiodxa/remix-i18next).
<br />
In this blog post we will try to unleash the full power of [i18next](https://www.i18next.com) and focus on a continuous localization workflow.

## TOC
  * [Better translation management](#better-translation-management)
    - [For sure!](#for-sure)
    - [How does this look like?](#how-look)
    - [save missing translations](#save-missing)
    - [👀 but there's more...](#more)
    - [📦 Let's prepare for production 🚀](#production)
  * [🎉🥳 Congratulations 🎊🎁](#congratulations)


# Better translation management <a name="better-translation-management"></a>

In the previous blog post there was a [voluntary part](../remix-i18n/#voluntary). This already was the first step.

By sending the translations to some translators or translator agency you have more control and a direct contact with them. But this also means more work for you.
This is a traditional way. But be aware sending files around creates always an overhead.

> Does a better option exist?

### For sure! <a name="for-sure"></a>

[i18next](https://www.i18next.com) helps to get the application translated, and this is great - but there is more to it.
- How do you integrate any translation services / agency?
- How do you keep track of new or removed content?
- How you handle proper versioning?
- How you deploy translation changes without deploying your complete application?
- and a lot more...

**Looking for something like this❓**

- [Easy to integrate](https://docs.locize.com/integration/instrumenting-your-code#i-18-next)
- Continuous deployment? [Continuous localization](https://locize.com/how-it-works.html#continouslocalization)!
- Manage the translation files with ease
- [Order professional translations](https://docs.locize.com/guides-tips-and-tricks/working-with-translators/localistars)
- Analytics & Statistics
- [Profit from our content delivery network (CDN)](https://docs.locize.com/whats-inside/cdn-content-delivery-network)
- [Versioning of your translations](https://docs.locize.com/more/versioning)
- [Automatic and On-Demand Machine Translation](https://docs.locize.com/whats-inside/auto-machine-translation)
- [Riskfree: Take your data with you](https://docs.locize.com/more/general-questions/how-is-locize-different-from-the-alternatives#service-lock-in)
- [Transparent and fair pricing](https://locize.com/pricing.html)
- and a lot more...


### How does this look like? <a name="how-look"></a>

First, if not already done, you need to signup at [locize](https://locize.app/register) and [login](https://docs.locize.com/integration/getting-started/create-a-user-account).
Then [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize and add your translations. You can add your translations either by using the [cli](https://github.com/locize/react-tutorial#use-the-locize-cli) or by [importing the individual json files](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) or via [API](https://docs.locize.com/integration/api#update-remove-translations).

Done so, we're going change the way the translations are loaded on server side and on client side.

Currently the translations are downloaded from locize via CLI and are then served on server side in the `public/locales` folder. Thanks to remix-i18next then the translations are downloaded by the client.

We now would like the client side to directly consume the translations provided by the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network).
Instead on server side we'll continue to "bundle" the translations first.
See [downloadLocales script in package.json](https://github.com/locize/locize-remix-i18next-example/blob/main/package.json#L34).
We're doing so to prevent an elevated amount of downloads generated on server side. [Read this](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc) for more information about this topic about serverless environments.

We have to install [i18next-locize-backend](https://github.com/locize/i18next-locize-backend).

`npm install i18next-locize-backend`

Adapt the `entry.client.jsx` file to use the i18next-locize-backend and make sure you copy the project-id and api-key from within your locize project.
```javascript
import { hydrate } from 'react-dom'
import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next'
import Backend from 'i18next-locize-backend'
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'
import i18nextOptions from './i18nextOptions'

const locizeOptions = {
  projectId: 'f6d74b76-9677-4a0d-b400-86e1507397ab',
  apiKey: '1c2bbc21-027d-4f41-995a-e8beb451cdef', // YOU should not expose your apps API key to production!!!
  version: 'latest'
}

// initialize i18next using initReactI18next and configuring it
if (!i18next.isInitialized) { // prevent i18next to be initialized multiple times
  i18next
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // i18next-locize-backend
    // loads translations from your project, saves new keys to it (saveMissing: true)
    // https://github.com/locize/i18next-locize-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      ...i18nextOptions,
      // This function detects the namespaces your routes rendered while SSR use
      // and pass them here to load the translations
      ns: getInitialNamespaces(),
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ['htmlTag'],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: [],
      },
      backend: locizeOptions
    })
    .then(() => {
      // then hydrate your app
      return hydrate(
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>,
        document
      )
    })
}
```

The `entry.server.jsx` file, the `root.jsx` and the `i18nextOptions.js` file should still look the same:

```javascript
import { renderToString } from 'react-dom/server'
import { RemixServer } from 'remix'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import i18nextOptions from './i18nextOptions'
import i18n from './i18n.server'

export default async function handleRequest(
  request,
  statusCode,
  headers,
  context
) {
  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  const instance = createInstance()

  // Then we could detect locale from the request
  const lng = await i18n.getLocale(request)
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18n.getRouteNamespaces(context)

  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state.
  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend.init({
    .init({
      ...i18nextOptions, // use the same configuration as in your client side.
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render want to use
      backend: {
        loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
      }
    })

  // Then you can render your app wrapped in the I18nextProvider as in the
  // entry.client file
  const markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={context} url={request.url} />
    </I18nextProvider>
  );

  headers.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: statusCode,
    headers: headers,
  })
}
```

```javascript
export default {
  debug: process.env.NODE_ENV !== 'production',
  fallbackLng: 'en',
  supportedLngs: ['en', 'de'],
  defaultNS: 'common',
  react: { useSuspense: false }
}
```

In the `root.jsx` file we need to call `useRemixI18Next` only on server side:

```javascript
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import { json } from '@remix-run/node'
import { useChangeLanguage } from 'remix-i18next'
import remixI18n from './i18n.server'
import { useTranslation } from 'react-i18next'
import styles from './styles/index.css'
import { i18nCookie } from './cookie'

export const loader = async ({ request }) => {
  const locale = await remixI18n.getLocale(request)
  const t = await remixI18n.getFixedT(request, 'common')
  const title = t('headTitle')
  return json({ locale, title }, {
    headers: {"Set-Cookie": await i18nCookie.serialize(locale)}
  })
}

export const handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ['common']
};

export function meta({ data }) {
  return { title: data.title }
}

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
  const { i18n } = useTranslation()
  const { locale } = useLoaderData()
  
  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale)

  return (
    <html lang={i18n.resolvedLanguage}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
```

That's it:

![](app.jpg)

The app looks more or less the same, but on client side the translations are fetched directly from the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network).
This means if you change translations in locize they will be available to your Remix app, without having to change or redeploy your app.
*Only to have the newest translations on server side (i.e. for SEO optimizations) a new `npm run downloadLocales` and rebuild is needed.*


### save missing translations <a name="save-missing"></a>

Thanks to the use of the [saveMissing functionality](https://www.i18next.com/overview/configuration-options#missing-keys), new keys gets added to locize automatically, while developing the app.

Just pass `saveMissing: true` in the i18next options:

```javascript
import { hydrate } from 'react-dom'
import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next'
import Backend from 'i18next-locize-backend'
import i18nextOptions from './i18nextOptions'

const locizeOptions = {
  projectId: 'f6d74b76-9677-4a0d-b400-86e1507397ab',
  apiKey: '1c2bbc21-027d-4f41-995a-e8beb451cdef', // YOU should not expose your apps API key to production!!!
  version: 'latest'
}

// initialize i18next using initReactI18next and configuring it
if (!i18next.isInitialized) { // prevent i18next to be initialized multiple times
  i18next
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // i18next-locize-backend
    // loads translations from your project, saves new keys to it (saveMissing: true)
    // https://github.com/locize/i18next-locize-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      ...i18nextOptions,
      // This function detects the namespaces your routes rendered while SSR use
      // and pass them here to load the translations
      ns: getInitialNamespaces(),
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ['htmlTag'],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: [],
      },
      backend: locizeOptions,
      saveMissing: true
    })
    .then(() => {
      // then hydrate your app
      return hydrate(
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>,
        document
      )
    })
}
```

Each time you'll use a new key, it will be sent to locize, i.e.:

```javascript
<div>{t('new.key', 'this will be added automatically')}</div>
```

will result in locize like this:

![missing key](missing_key.jpg "locize © inweso GmbH")


### 👀 but there's more... <a name="more"></a>

Thanks to the [locize-lastused](https://github.com/locize/locize-lastused) plugin, you'll be able to [find and filter in locize which keys are used or not used anymore](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

With the help of the [locize](https://github.com/locize/locize) plugin, you'll be able to use your app within the locize [InContext Editor](https://docs.locize.com/more/incontext-editor).

Lastly, with the help of the [auto-machinetranslation workflow](https://docs.locize.com/whats-inside/auto-machine-translation) and the use of the [saveMissing functionality](https://www.i18next.com/overview/configuration-options#missing-keys), new keys not only gets added to locize automatically, while developing the app, but are also automatically translated into the target languages using machine translation.

*Check out this [video](https://youtu.be/VfxBpSXarlU) to see how the automatic machine translation workflow looks like!*

{% youtube VfxBpSXarlU %}

`npm install locize-lastused locize`

use them like this:

```javascript
import { hydrate } from 'react-dom'
import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next'
import Backend from 'i18next-locize-backend'
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'
import i18nextOptions from './i18nextOptions'

const locizeOptions = {
  projectId: 'f6d74b76-9677-4a0d-b400-86e1507397ab',
  apiKey: '1c2bbc21-027d-4f41-995a-e8beb451cdef', // YOU should not expose your apps API key to production!!!
  version: 'latest'
}

// initialize i18next using initReactI18next and configuring it
if (!i18next.isInitialized) { // prevent i18next to be initialized multiple times
  i18next
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // i18next-locize-backend
    // loads translations from your project, saves new keys to it (saveMissing: true)
    // https://github.com/locize/i18next-locize-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // locize-lastused
    // sets a timestamp of last access on every translation segment on locize
    // -> safely remove the ones not being touched for weeks/months
    // https://github.com/locize/locize-lastused
    .use(LastUsed)
    // locize-editor
    // InContext Editor of locize
    .use(locizePlugin)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      ...i18nextOptions,
      // This function detects the namespaces your routes rendered while SSR use
      // and pass them here to load the translations
      ns: getInitialNamespaces(),
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ['htmlTag'],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: [],
      },
      backend: locizeOptions,
      locizeLastUsed: locizeOptions,
      saveMissing: true
    })
    .then(() => {
      // then hydrate your app
      return hydrate(
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>,
        document
      )
    })
}
```

[Automatic machine translation](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key auto](missing_key_auto_mt.jpg "locize © inweso GmbH")

[Last used translations filter]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](last_used.jpg "locize © inweso GmbH")

[InContext Editor](https://docs.locize.com/more/incontext-editor):

![i18next incontext](in_context.jpg "locize © inweso GmbH")


### 📦 Let's prepare for production 🚀 <a name="production"></a>

Now, we prepare the app for [going to production](https://docs.locize.com/guides-tips-and-tricks/going-production).

First in locize, create a dedicated version for production. Do not enable auto publish for that version but publish manually or via [API](https://docs.locize.com/integration/api#publish-version) or via [CLI](https://github.com/locize/locize-cli#publish-version).
Lastly, [enable Cache-Control max-age​](https://docs.locize.com/more/caching) for that production version.

Let's adapt the `entry.client.jsx` file:

```javascript
import { hydrate } from 'react-dom'
import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next'
import Backend from 'i18next-locize-backend'
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'
import i18nextOptions from './i18nextOptions'

const isProduction = process.env.NODE_ENV === 'production'

const locizeOptions = {
  projectId: 'f6d74b76-9677-4a0d-b400-86e1507397ab',
  apiKey: !isProduction ? '1c2bbc21-027d-4f41-995a-e8beb451cdef' : undefined, // YOU should not expose your apps API key to production!!!
  version: isProduction ? 'production' : 'latest'
}

if (!isProduction) {
  // locize-lastused
  // sets a timestamp of last access on every translation segment on locize
  // -> safely remove the ones not being touched for weeks/months
  // https://github.com/locize/locize-lastused
  i18next.use(LastUsed)
}

// initialize i18next using initReactI18next and configuring it
if (!i18next.isInitialized) { // prevent i18next to be initialized multiple times
  i18next
    // locize-editor
    // InContext Editor of locize
    .use(locizePlugin)
    // i18next-locize-backend
    // loads translations from your project, saves new keys to it (saveMissing: true)
    // https://github.com/locize/i18next-locize-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      ...i18nextOptions,
      // This function detects the namespaces your routes rendered while SSR use
      // and pass them here to load the translations
      ns: getInitialNamespaces(),
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ['htmlTag'],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: [],
      },
      backend: locizeOptions,
      locizeLastUsed: locizeOptions,
      saveMissing: !isProduction // you should not use saveMissing in production
    })
    .then(() => {
      // then hydrate your app
      return hydrate(
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>,
        document
      )
    })
}
```

Now, during development, you'll continue to save missing keys and to make use of lastused feature. => `npm run dev`

And in production environment, saveMissing and lastused are disabled. => `npm run build && npm start`


[Caching](https://docs.locize.com/more/caching):

![i18next caching](caching.jpg "locize © inweso GmbH")

[Merging versions](https://docs.locize.com/more/versioning#merging-versions):

![overwrite version](overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 The complete code can be found [here](https://github.com/locize/locize-remix-i18next-example).*

*Check also the [code integration part](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in this [YouTube video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

There's also an [i18next crash course video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

Awesome! Thanks to [remix-i18next](https://github.com/sergiodxa/remix-i18next), [i18next](https://www.i18next.com), [react-i18next](https://react.i18next.com) and [locize](https://locize.com) your continuous localization workflow is ready to go.

So if you want to take your i18n topic to the next level, it's worth to try the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So with using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

# 👍
