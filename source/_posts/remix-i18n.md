---
title: How to internationalize a Remix application (Part 1)
description: Simple Remix localization made easy with this ✅step-by-step guide using i18next.

date: 2022-03-02
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
thumbnail: remix-i18n/remix-localization.jpg

label: remix-i18n
lang: en
---

![remix localization](remix-localization.jpg "Remix Localization example")

Let's talk about internationalization (i18n) for [Remix](https://remix.run)...

When it comes to JavaScript localization, one of the most popular frameworks is [i18next](https://www.i18next.com) and one of the most famous Remix module for i18next is [remix-i18next](https://github.com/sergiodxa/remix-i18next).
It was created in October 2021 by [Sergio Xalambrí](https://github.com/sergiodxa).

***There is also a [second part of this blog post](../remix-i18next/), that focuses more on a continuous localization workflow.***

## TOC
  * [So first of all: "Why i18next?"](#why-i18next)
  * [Let's get into it...](#start)
    - [Prerequisites](#prerequisites)
    - [Getting started](#getting-started)
    - [Language Switcher](#language-switcher)
    - [The voluntary part](#voluntary)
  * [🎉🥳 Congratulations 🎊🎁](#congratulations)
  * [Part 2](../remix-i18next/)


# So first of all: "Why i18next?" <a name="why-i18next"></a>

*i18next was created in late 2011. It's older than most of the libraries you will use nowadays, including your main frontend technology ([React](../react-i18next/), [Angular](../angular-i18next/), [Vue](../i18next-vue/), ...).*
<br />
**➡️ sustainable**


*Based on how long i18next already is available open source, there is no real i18n case that could not be solved with i18next.*
<br />
**➡️ mature**


*i18next can be used in any javascript (and a few non-javascript - .net, elm, iOS, android, ruby, ...) environment, with any UI framework, with any i18n format, ... [the possibilities are endless](https://www.i18next.com/overview/supported-frameworks).*
<br />
**➡️ extensible**


*There is a plenty of features and possibilities you'll get with i18next compared to other regular i18n frameworks.*
<br />
**➡️ rich**


[Here](https://www.i18next.com/overview/comparison-to-others) you can find more information about why i18next is special and [how it works](https://locize.com/i18next.html#how-does-i18next-work).


# Let's get into it... <a name="start"></a>

## Prerequisites <a name="prerequisites"></a>

Make sure you have Node.js and npm installed. It's best, if you have some experience with simple HTML, JavaScript and basic [React](https://reactjs.org) and [Remix](https://remix.run), before jumping to [remix-i18next](https://github.com/sergiodxa/remix-i18next).


## Getting started <a name="getting-started"></a>

Take your own Remix project or use this example app [here](https://github.com/locize/locize-remix-i18next-example/tree/start).

```sh
git clone -b start git@github.com:locize/locize-remix-i18next-example.git
cd locize-remix-i18next-example
npm i
npm run dev
```

We are going to adapt the app to detect the language according to the user’s preference.
And we will create a language switcher to make the content change between different languages.

Let's install some i18next dependencies:

- [remix-i18next](https://github.com/sergiodxa/remix-i18next)
- [i18next](https://www.i18next.com)
- [react-i18next](https://react.i18next.com)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)
- [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend)
- [i18next-http-backend](https://github.com/i18next/i18next-http-backend)

`npm install remix-i18next i18next react-i18next i18next-browser-languagedetector i18next-fs-backend i18next-http-backend`

Create a `i18nextOptions.js` file and add the following code:
```javascript
export default {
  debug: process.env.NODE_ENV !== 'production',
  fallbackLng: 'en',
  supportedLngs: ['en', 'de'],
  defaultNS: 'common',
  react: { useSuspense: false }
}
```

And a `i18n.server.js` file and add the following code:
```javascript
import { RemixI18Next } from 'remix-i18next'
import i18nextOptions from './i18nextOptions'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'

export default new RemixI18Next({
  detection: {
    // This is the list of languages your application supports
    supportedLanguages: i18nextOptions.supportedLngs,
    // This is the language you want to use in case the user language is not
    // listed above
    fallbackLanguage: i18nextOptions.fallbackLng,
  },
  // This is the configuration for i18next used when translating messages server
  // side only
  i18next: {
    backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
  },
  // The backend you want to use to load the translations
  // Tip: You could pass `resources` to the `i18next` configuration and avoid
  // a backend here
  backend: Backend,
})
```

Prepare some folders like this:
![](folder.jpg)

Now in your `entry.client.jsx` adapt the code like this:
```javascript
import { hydrate } from 'react-dom'
import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { getInitialNamespaces } from 'remix-i18next'
import i18nextOptions from './i18nextOptions'

// initialize i18next using initReactI18next and configuring it
if (!i18next.isInitialized) // prevent i18next to be initialized multiple times
  i18next
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .use(LanguageDetector) // Setup a client-side language detector
    .use(Backend) // Setup your backend
    .init({
      ...i18nextOptions,
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
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
      }
    })
    .then(() => {
      // then hydrate your app wrapped in the I18nextProvider
      return hydrate(
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>,
        document
      )
    })
```

And in your `entry.server.jsx` adapt the code like this:
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
        loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
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

The last important piece is the `root.jsx` file:
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

export const loader = async ({ request }) => {
  const locale = await remixI18n.getLocale(request)
  const t = await remixI18n.getFixedT(request, 'common')
  const title = t('headTitle')
  return json({ locale, title })
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
    <html lang={i18n.language}>
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

We're ready to start to use the `t` function.
<br />
In your pages files, you can now use react-i18next to access the `t` function:

```javascript
import { useTranslation } from 'react-i18next'

export const handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ['index']
};

export default function Index() {
  const { t, ready, i18n } = useTranslation('index')
  if (!ready) return <Loading /> // i18next may not be ready when changing route with <Link>
  
  return (
    <>
      <div>{t('title')}</div>
    </>
  )
}
```

Add the keys to your translations, i.e. `public/locales/en/index.json`:
```json
{
  "title": "Welcome to Remix"
}
```

You can do this for all your pages and components:

```javascript
import { Link, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import { Component } from 'react'
import logo from '../logo.svg'
import styles from '../styles/app.css'
import Loading from '../components/Loading'

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

class LegacyWelcomeClass extends Component {
  render() {
    const { t } = this.props
    return <h2>{t('title')}</h2>
  }
}
const Welcome = withTranslation('index')(LegacyWelcomeClass)

// Component using the Trans component
function MyComponent({ t }) {
  return (
    <Trans t={t} i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  )
}

export const handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ['index']
};

export default function Index() {
  const { t, ready, i18n } = useTranslation('index')
  if (!ready) return <Loading /> // i18next may not be ready when changing route with <Link>

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
      </div>
      <div className="App-intro">
        <MyComponent t={t} />
      </div>
      <div>{t('description.part2')}</div>
      <hr />
      <div>
        <Link to="/second">{t('goto.second')}</Link>
      </div>
    </div>
  )
}
```

This looks like the normal [react-i18next](https://react.i18next.com) usage.
<br />
Due to we're not using `Suspense` here, just make sure you check the `ready` flag before calling the `t` function. The translations will get lazy loaded as soon as you navigate on client side to another page.

We can also translate stuff like the page title.
<br />
Since remix-i18next can translate text inside loaders or actions, we can do this for example in our `root.jsx`:

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

export const loader = async ({ request }) => {
  const locale = await remixI18n.getLocale(request)
  const t = await remixI18n.getFixedT(request, 'common')
  const title = t('headTitle')
  return json({ locale, title })
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

Add the keys to your translations, i.e. `public/locales/en/common.json`:
```json
{
  "headTitle": "New Remix App"
}
```

## Language Switcher <a name="language-switcher"></a>

remix-i18next by default will detect the current language in this order:
- the lng search parameter
- a cookie (if you pass one)
- the session (if you pass the sessionStorage)
- the Accept-Language header
- the fallback language you configured

We additionally like to offer the possibility to change the language via some sort of language switcher.

So let's add a section in our `index.js` file:
```javascript
import { Link, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import { Component } from 'react'
import logo from '../logo.svg'
import styles from '../styles/app.css'
import Loading from '../components/Loading'

export const loader = async ({ request }) => {
  return json({
    lngs: {
      en: { nativeName: 'English' },
      de: { nativeName: 'Deutsch' }
    }
  })
}

export const handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ['index']
};

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

class LegacyWelcomeClass extends Component {
  render() {
    const { t } = this.props
    return <h2>{t('title')}</h2>
  }
}
const Welcome = withTranslation('index')(LegacyWelcomeClass)

// Component using the Trans component
function MyComponent({ t }) {
  return (
    <Trans t={t} i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  )
}

export default function Index() {
  const { lngs } = useLoaderData()
  const { t, ready, i18n } = useTranslation('index')
  if (!ready) return <Loading /> // i18next may not be ready when changing route with <Link>

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
      </div>
      <div className="App-intro">
        <div>
          {Object.keys(lngs).map((lng) => (
            <Link
              key={lng}
              style={{ marginRight: 5, fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              to={`/?lng=${lng}`}
            >
              {lngs[lng].nativeName}
            </Link>
          ))}
        </div>
        <MyComponent t={t} />
      </div>
      <div>{t('description.part2')}</div>
      <hr />
      <div>
        <Link to="/second">{t('goto.second')}</Link>
      </div>
    </div>
  )
}
```

To persist the current locale, we will save it in a cookie.
Just create a new `cookie.js` file:

```javascript
import { createCookie } from 'remix'

export let i18nCookie = createCookie('i18n', {
  sameSite: 'lax',
  path: '/',
})
```

And use it like this in `i18n.server.js`:
```javascript
import { RemixI18Next } from 'remix-i18next'
import i18nextOptions from './i18nextOptions'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import { i18nCookie } from './cookie'

export default new RemixI18Next({
  detection: {
    // persist language selection in cookie
    cookie: i18nCookie,
    // This is the list of languages your application supports
    supportedLanguages: i18nextOptions.supportedLngs,
    // This is the language you want to use in case the user language is not
    // listed above
    fallbackLanguage: i18nextOptions.fallbackLng,
  },
  // This is the configuration for i18next used when translating messages server
  // side only
  i18next: {
    backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
  },
  // The backend you want to use to load the translations
  // Tip: You could pass `resources` to the `i18next` configuration and avoid
  // a backend here
  backend: Backend,
})
```

and also in `root.jsx`:

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
    <html lang={i18n.language}>
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

So this means we're using the lng search parameter to change the language. And persist the current detected language in the cookie.

![app](app.jpg "locize © inweso GmbH")
![app de](app_de.jpg "locize © inweso GmbH")

**🥳 Awesome, the app is internationalized and we've just created our first language switcher!**

*🧑‍💻 The complete code can be found [here](https://github.com/locize/locize-remix-i18next-example/tree/local).*


## The voluntary part <a name="voluntary"></a>

![transform the localization process](transform_your_localization_process_small.jpg "locize © inweso GmbH")

Connect to an awesome translation management system and manage your translations outside of your code.

Let's synchronize the translation files with [locize](https://locize.com).
This can be done on-demand or on the CI-Server or before deploying the app.

## What to do to reach this step:
1. in locize: signup at https://locize.app/register and [login](https://docs.locize.com/integration/getting-started/create-a-user-account)
2. in locize: [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project)
3. in locize: add all your additional languages (this can also be done via [API](https://docs.locize.com/integration/api#add-new-language))
4. install the [locize-cli](https://github.com/locize/locize-cli) (`npm i locize-cli`)

## Use the [locize-cli](https://github.com/locize/locize-cli)
Use the `locize sync` command to synchronize your local repository (`public/locales`) with what is published on locize.

Alternatively, you can also use the `locize download` command to always download the published locize translations to your local repository (`public/locales`) before bundling your app.


# 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about i18n in [Remix](https://remix.run), [remix-i18next](https://github.com/sergiodxa/remix-i18next), [i18next](https://www.i18next.com) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth to try the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So with using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

There's also an [i18next crash course video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}

# 👍

*If you like to know how to unleash the full power of i18next, [check out **"Part 2"**](../remix-i18next/)!*
