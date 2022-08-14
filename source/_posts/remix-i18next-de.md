---
title: So internationalisieren Sie eine Remix-Anwendung (Teil 2)
description: Remix-Lokalisierung leicht gemacht mit Fokus auf kontinuierliche Lokalisierung.

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

label: remix-i18next
lang: de
hidden: true
---

![Remix-Lokalisierung](../remix-i18next/remix-localization.jpg "Remix-Lokalisierungsbeispiel")

Im [vorherigen Blogbeitrag](../remix-i18n-de/) haben wir auf einfache Weise gelernt, wie wir unsere [Remix](https://remix.run)-App lokalisierungsfertig instrumentieren können, indem wir [remix-i18next](https://github.com/sergiodxa/remix-i18next) verwenden.
<br />
In diesem Blogbeitrag werden wir versuchen, die volle Leistungsfähigkeit von [i18next](https://www.i18next.com) freizusetzen und uns auf einen kontinuierlichen Lokalisierungsworkflow zu konzentrieren.

## Inhaltsverzeichnis
  * [Besseres Übersetzungsmanagement](#better-translation-management)
    - [Auf jeden Fall!](#for-sure)
    - [Wie sieht das aus?](#how-look)
    - [fehlende Übersetzungen speichern](#save-missing)
    - [👀 aber es gibt noch mehr...](#more)
    - [📦 Bereiten wir uns auf die Produktion vor 🚀](#production)
  * [🎉🥳 Herzliche Glückwünsche 🎊🎁](#congratulations)


# Besseres Übersetzungsmanagement <a name="better-translation-management"></a>

Im vorherigen Blogbeitrag gab es einen [freiwilligen Teil](../remix-i18n-de/#voluntary). Dies war bereits der erste Schritt.

Indem Sie die Übersetzungen an einige Übersetzer oder Übersetzungsagenturen senden, haben Sie mehr Kontrolle und einen direkten Kontakt mit ihnen. Das bedeutet aber auch mehr Arbeit für Sie.
Dies ist ein traditioneller Weg. Beachten Sie jedoch, dass das Versenden von Dateien immer einen Overhead verursacht.

> Gibt es eine bessere Option?

### Auf jeden Fall! <a name="for-sure"></a>

[i18next](https://www.i18next.com) hilft dabei, die Anwendung zu übersetzen, und das ist grossartig – aber es steckt noch mehr dahinter.
- Wie integrieren Sie eventuelle Übersetzungsdienste/-agenturen?
- Wie behalten Sie den Überblick über neue oder entfernte Inhalte?
- Wie gehen Sie mit der richtigen Versionierung um?
- Wie stellen Sie Übersetzungsänderungen bereit, ohne Ihre vollständige Anwendung bereitzustellen?
- und vieles mehr...

**Suche Sie nach sowas❓**

- [Einfach zu integrieren](https://docs.locize.com/integration/instrumenting-your-code#i-18-next)
- Kontinuierlicher Einsatz? [Kontinuierliche Lokalisierung](https://locize.com/how-it-works.html#continouslocalization)!
- Einfache Verwaltung der Übersetzungsdateien
- [Professionelle Übersetzungen bestellen](https://docs.locize.com/guides-tips-and-tricks/working-with-translators/localistars)
- Analytik & Statistik
- [Profitieren Sie von unserem Content Delivery Network (CDN)](https://docs.locize.com/whats-inside/cdn-content-delivery-network)
- [Versionierung Ihrer Übersetzungen](https://docs.locize.com/more/versioning)
- [Automatische und maschinelle Übersetzung auf Abruf](https://docs.locize.com/whats-inside/auto-machine-translation)
- [Risikofrei: Nehmen Sie Ihre Daten mit](https://docs.locize.com/more/general-questions/how-is-locize-different-from-the-alternatives#service-lock-in)
- [Transparente und faire Preisgestaltung](https://locize.com/pricing.html)
- und vieles mehr...


### Wie sieht das aus? <a name="how-look"></a>

Zuerst müssen Sie sich bei locize [registrieren](https://locize.app/register) und [anmelden](https://docs.locize.com/integration/getting-started/create-a-user-account).
Dann [erstellen Sie ein neues Projekt](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize und fügen Ihre Übersetzungen hinzu. Sie können Ihre Übersetzungen entweder über die [CLI](https://github.com/locize/react-tutorial#use-the-locize-cli) oder durch [Importieren der einzelnen json-Dateien](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) oder über die [API](https://docs.locize.com/integration/api#update-remove-translations) bewerkstelligen.

Danach ändern wir die Art und Weise, wie die Übersetzungen auf der Serverseite und auf der Clientseite geladen werden.

Derzeit werden die Übersetzungen von locize über CLI heruntergeladen und dann serverseitig im Ordner `public/locales` bereitgestellt. Dank remix-i18next werden die Übersetzungen dann vom Client heruntergeladen.

Wir möchten nun, dass die Clientseite die vom [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) bereitgestellten Übersetzungen direkt nutzt.
Stattdessen "bündeln" wir zunächst serverseitig die Übersetzungen.
Siehe [downloadLocales script in package.json](https://github.com/locize/locize-remix-i18next-example/blob/main/package.json#L34).
Wir tun dies, um zu verhindern, dass serverseitig eine erhöhte Anzahl von Downloads generiert wird. [Lesen Sie dies](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc) für Weitere Informationen zu diesem Thema über serverlose Umgebungen.

Wir müssen [i18next-locize-backend](https://github.com/locize/i18next-locize-backend) installieren.

`npm install i18next-locize-backend`

Passen Sie die Datei `entry.client.jsx` an, um das i18next-locize-backend zu verwenden, und stellen Sie sicher, dass Sie die Projekt-ID und den API-Schlüssel aus Ihrem locize-Projekt kopieren.
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

Die `entry.server.jsx`-Datei, die `root.jsx`- und die `i18nextOptions.js`-Datei sollten immer noch gleich aussehen:

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

In der `root.jsx`-Datei müssen wir `useRemixI18Next` nur serverseitig aufrufen:

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

Das ist es:

![](../remix-i18next/app.jpg)

Die App sieht mehr oder weniger gleich aus, aber auf der Clientseite werden die Übersetzungen direkt vom [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) abgerufen.
Das bedeutet, wenn Sie Übersetzungen in locize ändern, stehen sie Ihrer Remix-App zur Verfügung, ohne dass Sie Ihre App ändern oder erneut bereitstellen müssen.
*Nur um die neusten Übersetzungen serverseitig zu haben (z.B. für SEO-Optimierungen) ist ein neues `npm run downloadLocales` und Rebuild nötig.*


### fehlende Übersetzungen speichern <a name="save-missing"></a>

Dank der Verwendung der [saveMissing-Funktionalität](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App neue Schlüssel zur automatischen Lokalisierung hinzugefügt.

Übergeben Sie einfach `saveMissing: true` in den i18next-Optionen:

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

Jedes Mal, wenn Sie einen neuen Schlüssel verwenden, wird dieser zu locize gesendet, d. h.:

```javascript
<div>{t('new.key', 'this will be added automatically')}</div>
```

ergibt in locize das folgende:

![missing key](../remix-i18next/missing_key.jpg "locize © inweso GmbH")


### 👀 aber es gibt noch mehr... <a name="more"></a>

Dank des Plugins [locize-lastused](https://github.com/locize/locize-lastused) können Sie [in locize Schlüssel finden und filtern, welche verwendet oder nicht mehr verwendet werden](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

Mit Hilfe des Plugins [locize](https://github.com/locize/locize) können Sie Ihre App im locize [InContext Editor](https://docs.locize.com/more/incontext-editor) verwenden.

Mit Hilfe des [Auto-MachineTranslation-Workflows](https://docs.locize.com/whats-inside/auto-machine-translation) und der Verwendung der [saveMissing-Funktionalität](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App nicht nur neue Schlüssel zur automatischen Lokalisierung hinzugefügt, sondern auch automatisch mittels maschineller Übersetzung in die Zielsprachen übersetzt.

*Schauen Sie sich dieses [Video](https://youtu.be/VfxBpSXarlU) an, um zu sehen, wie der Arbeitsablauf der automatischen maschinellen Übersetzung aussieht!*

{% youtube VfxBpSXarlU %}

`npm install locize-lastused locize`

verwenden Sie sie wie folgt:

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

[Automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key automatisch](../remix-i18next/missing_key_auto_mt.jpg "locize © inweso GmbH")

[Filter für zuletzt verwendete Übersetzungen]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](../remix-i18next/last_used.jpg "locize © inweso GmbH")

[InContext Editor](https://docs.locize.com/more/incontext-editor):

![i18next inkontext](../remix-i18next/in_context.jpg "locize © inweso GmbH")


### 📦 Bereiten wir uns auf die Produktion vor 🚀 <a name="production"></a>

Jetzt bereiten wir die App für den Produktionsstart vor (https://docs.locize.com/guides-tips-and-tricks/going-production).

Erstellen Sie zuerst in locize eine dedizierte Version für die Produktion. Aktivieren Sie die automatische Veröffentlichung für diese Version nicht, sondern veröffentlichen Sie sie manuell oder über die [API](https://docs.locize.com/integration/api#publish-version) oder über die [CLI](https://github.com/locize/locize-cli#publish-version).
Schliesslich [aktivieren Sie auch Cache-Control max-age​](https://docs.locize.com/more/caching) für diese Produktionsversion.

Passen wir die Datei `entry.client.jsx` an:

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

Während der Entwicklung werden Sie nun weiterhin fehlende Schlüssel speichern und die `lastused` Funktionalität nutzen. => `npm run dev`

Und in der Produktionsumgebung sind saveMissing und lastused deaktiviert. => `npm run build && npm start`


[Caching](https://docs.locize.com/more/caching):

![i18next caching](../remix-i18next/caching.jpg "locize © inweso GmbH")

[Versionen zusammenführen](https://docs.locize.com/more/versioning#merging-versions):

![Version überschreiben](../remix-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 Den vollständigen Code finden Sie [hier](https://github.com/locize/locize-remix-i18next-example).*

*Sehen Sie sich auch den [Teil zur Code-Integration](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in diesem [YouTube-Video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

Es gibt auch ein [i18next-Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Herzliche Glückwünsche 🎊🎁 <a name="congratulations"></a>

Genial! Dank [remix-i18next](https://github.com/sergiodxa/remix-i18next), [i18next](https://www.i18next.com), [react-i18next](https://react.i18next.com) und [locize](https://locize.com) ist Ihr kontinuierlicher Lokalisierungs-Workflow einsatzbereit.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Übersetzungs-Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

# 👍
