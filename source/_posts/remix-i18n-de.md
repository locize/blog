---
title: So internationalisieren Sie eine Remix-Anwendung (Teil 1)
description: Einfache Remix-Lokalisierung leicht gemacht mit dieser ✅Schritt-für-Schritt-Anleitung mit i18next.

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
lang: de
hidden: true
---

![remix Lokalisierung](../remix-i18n/remix-localization.jpg "Remix Lokalisierungs-Beispiel")

Reden wir über Internationalisierung (i18n) für [Remix](https://remix.run)...

Wenn es um JavaScript-Lokalisierung geht, ist eines der beliebtesten Frameworks [i18next](https://www.i18next.com) und eines der bekanntesten Remix-Module für i18next ist [remix-i18next](https://github.com/sergiodxa/remix-i18next).
Es wurde im Oktober 2021 von [Sergio Xalambrí](https://github.com/sergiodxa) erstellt.

***Es gibt auch einen [zweiten Teil dieses Blogposts](../remix-i18next-de/), der sich mehr auf einen kontinuierlichen Lokalisierungsworkflow konzentriert.***

## Inhaltsverzeichnis
  * [Also erstmal: "Warum i18next?"](#why-i18next)
  * [Fangen wir an...](#start)
    - [Voraussetzungen](#prerequisites)
    - [Einstieg](#getting-started)
    - [Sprach Wechsler](#language-switcher)
    - [Der freiwillige Teil](#voluntary)
  * [🎉🥳 Herzliche Glückwünsche 🎊🎁](#congratulations)
  * [Teil 2](../remix-i18next-de/)


# Also erstmal: "Warum i18next?" <a name="why-i18next"></a>

*i18next wurde Ende 2011 erstellt. Es ist älter als die meisten Bibliotheken, die Sie heutzutage verwenden, einschliesslich der wichtigsten Frontend-Technologien (Angular, React, Vue, ...).*
<br />
**➡️ nachhaltig**


*Basierend darauf, wie lange i18next bereits Open Source verfügbar ist, gibt es keinen echten i18n-Fall, welcher nicht mit i18next gelöst werden könnte.*
<br />
**➡️ reif**


*i18next kann in jeder Umgebung mit Javascript (und einigen Nicht-Javascript - .net, elm, iOS, Android, Ruby, ...) verwendet werden, mit jedem UI-Framework, mit jedem i18n-Format, ... [die Möglichkeiten sind endlos](https://www.i18next.com/overview/supported-frameworks).*
<br />
**➡️ erweiterbar**


*Es gibt viele Funktionen und Möglichkeiten, die Sie mit i18next im Vergleich zu anderen regulären i18n-Frameworks erhalten.*
<br />
**➡️ reich**

[Hier](https://www.i18next.com/overview/comparison-to-others) finden Sie weitere Informationen darüber, warum i18next so besonders ist und [wie es funktioniert](https://locize.com/i18next.html#how-does-i18next-work).


# Fangen wir an... <a name="start"></a>

## Voraussetzungen <a name="prerequisites"></a>

Stellen Sie sicher, dass Sie Node.js und npm installiert haben. Es ist am besten, wenn Sie etwas Erfahrung mit einfachem HTML, JavaScript und grundlegendem [React](https://reactjs.org) und [Remix](https://remix.run) haben, bevor Sie mit [remix-i18next]( https://github.com/sergiodxa/remix-i18next) loslegen.


## Einstieg <a name="getting-started"></a>

Nehmen Sie Ihr eigenes Remix-Projekt oder verwenden Sie diese Beispiel-App [hier](https://github.com/locize/locize-remix-i18next-example/tree/start).

```sh
git clone -b start git@github.com:locize/locize-remix-i18next-example.git
cd locize-remix-i18next-example
npm i
npm run dev
```

Wir werden die App anpassen, um die Sprache gemäss den Vorlieben des Benutzers zu erkennen.
Und wir werden einen Sprachumschalter erstellen, um den Inhalt zwischen verschiedenen Sprachen zu ändern.

Lassen Sie uns einige i18next-Abhängigkeiten installieren:

- [remix-i18next](https://github.com/sergiodxa/remix-i18next)
- [i18next](https://www.i18next.com)
- [react-i18next](https://react.i18next.com)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)
- [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend)
- [i18next-http-backend](https://github.com/i18next/i18next-http-backend)

`npm install remix-i18next i18next react-i18next i18next-browser-languagedetector i18next-fs-backend i18next-http-backend`

Erstellen Sie eine Datei `i18nextOptions.js` und fügen Sie den folgenden Code hinzu:
```javascript
export default {
  debug: process.env.NODE_ENV !== 'production',
  fallbackLng: 'en',
  supportedLngs: ['en', 'de'],
  defaultNS: 'common',
  react: { useSuspense: false }
}
```

Und eine `i18n.server.js`-Datei und fügen Sie den folgenden Code hinzu:
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

Bereiten Sie einige Ordner wie folgt vor:
![](../remix-i18n/folder.jpg)

Passen Sie nun in Ihrer `entry.client.jsx` den Code wie folgt an:
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

Und passen Sie in Ihrer `entry.server.jsx` den Code so an:
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

Das letzte wichtige Stück ist die `root.jsx`-Datei:
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

Wir sind bereit, mit der Verwendung der `t`-Funktion zu beginnen.
<br />
In Ihren Pages-Dateien können Sie jetzt mit respond-i18next auf die `t`-Funktion zugreifen:

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

Fügen Sie die Schlüssel zu Ihren Übersetzungen hinzu, z. B. `public/locales/en/index.json`:
```json
{
  "title": "Welcome to Remix"
}
```

Sie können dies für alle Ihre Seiten und Komponenten tun:

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

Dies sieht aus wie die normale Verwendung von [react-i18next](https://react.i18next.com).
<br />
Da wir hier kein `Suspense` verwenden, stellen Sie einfach sicher, dass Sie das `ready`-Flag überprüfen, bevor Sie die `t`-Funktion aufrufen. Die Übersetzungen werden verzögert geladen, sobald Sie auf der Clientseite zu einer anderen Seite navigieren.

Wir können auch Dinge wie den Seitentitel übersetzen.
<br />
Da remix-i18next Text innerhalb von Loadern oder Aktionen übersetzen kann, können wir dies beispielsweise in unserer `root.jsx` tun:

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

Fügen Sie die Schlüssel zu Ihren Übersetzungen hinzu, z. B. `public/locales/en/common.json`:
```json
{
  "headTitle": "New Remix App"
}
```

## Sprach Wechsler <a name="language-switcher"></a>

remix-i18next erkennt standardmässig die aktuelle Sprache in dieser Reihenfolge:
- der lng-Suchparameter
- ein Cookie (wenn einer weitergegeben wird)
- die Session (wenn Sie den SessionStorage benutzen)
- der Accept-Language-Header
- die von Ihnen konfigurierte Fallback-Sprache

Wir möchten zusätzlich die Möglichkeit anbieten, die Sprache über eine Art Sprachumschalter zu ändern.

Fügen wir also einen Abschnitt in unserer Datei `index.js` hinzu:
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

Um das aktuelle Gebietsschema beizubehalten, speichern wir es in einem Cookie.
Erstellen Sie einfach eine neue `cookie.js`-Datei:

```javascript
import { createCookie } from 'remix'

export let i18nCookie = createCookie('i18n', {
  sameSite: 'lax',
  path: '/',
})
```

Und verwenden Sie es so in `i18n.server.js`:
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

und auch in `root.jsx`:

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

Das bedeutet also, dass wir den Suchparameter lng verwenden, um die Sprache zu ändern. Und behalten die aktuell erkannte Sprache im Cookie.

![app](../remix-i18n/app.jpg "locize © inweso GmbH")
![app de](../remix-i18n/app_de.jpg "locize © inweso GmbH")

**🥳 Grossartig, die App ist internationalisiert und wir haben gerade unseren ersten Sprachumschalter erstellt!**

*🧑‍💻 Den vollständigen Code finden Sie [hier](https://github.com/locize/locize-remix-i18next-example/tree/local).*


## Der freiwillige Teil <a name="voluntary"></a>

![transformieren Sie den Lokalisierungsprozess](../remix-i18n/transform_your_localization_process_small.jpg "locize © inweso GmbH")

Verbinden Sie sich mit einem grossartigen Übersetzungsmanagementsystem und verwalten Sie Ihre Übersetzungen ausserhalb Ihres Codes.

Lassen Sie uns die Übersetzungsdateien mit [locize](https://locize.com) synchronisieren.
Dies kann bei Bedarf oder auf dem CI-Server oder vor der Bereitstellung der App erfolgen.

## Was zu tun ist, um diesen Schritt zu erreichen:
1. in locize: Anmeldung unter https://locize.app/register und [login](https://docs.locize.com/integration/getting-started/create-a-user-account)
2. in locize: [ein neues Projekt erstellen](https://docs.locize.com/integration/getting-started/add-a-new-project)
3. in locize: Fügen Sie alle Ihre zusätzlichen Sprachen hinzu (dies kann auch über [API](https://docs.locize.com/integration/api#add-new-language) erfolgen)
4. installieren der [locize-cli](https://github.com/locize/locize-cli) (`npm i locize-cli`)

## Verwenden Sie die [locize-cli](https://github.com/locize/locize-cli)
Verwenden Sie den Befehl `locize sync`, um Ihr lokales Repository (`public/locales`) mit dem zu synchronisieren, was auf locize veröffentlicht wird.

Alternativ können Sie auch den Befehl `locize download` verwenden, um die veröffentlichten locize-Übersetzungen immer in Ihr lokales Repository (`public/locales`) herunterzuladen, bevor Sie Ihre App bündeln.


# 🎉🥳 Herzliche Glückwünsche 🎊🎁 <a name="congratulations"></a>

Ich hoffe, Sie haben ein paar neue Dinge über i18n gelernt in [Remix](https://remix.run), [remix-i18next](https://github.com/sergiodxa/remix-i18next), [i18next] (https://www.i18next.com) und auch etwas über [moderne Lokalisierungsworkflows](https://locize.com).

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Localization Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

Es gibt auch ein [i18next Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}

# 👍

*Wenn Sie wissen möchten, wie Sie die volle Leistung von i18next entfesseln können, [schauen Sie sich **"Teil 2"** an](../remix-i18next-de/)!*
