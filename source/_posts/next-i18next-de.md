---
title: Allseitig optimierte Next.js-Übersetzungen (ein next-i18next Leitfaden)
description: Optimieren Sie Ihre Next.js-App so, dass sie am besten mit Übersetzungen auf Server- und Client-Seite mit next-i18next funktioniert.

date: 2022-04-03
tags:
  - i18next
  - react
  - react-i18next
  - next-i18next
  - next
  - locize
  - localization
  - l10n
  - internationalization
  - i18n
  - translation
categories:
  - Post
thumbnail: next-i18next/next-i18next.jpg

label: next-i18next
lang: de
hidden: true
---

![](../next-i18next/next-i18next.jpg "locize © inweso GmbH")

Das Schreiben von [Next.js](https://nextjs.org)-Code verwischt die Grenzen zwischen Client- und Serverseite.
<br />
Der Code wird einmal geschrieben und dann je nach Bedarf als SSG (Static-Site Generation), SSR (Server-Side Rendering) oder CSR (Client-Side Rendering) etc. ausgeführt.

>Also auch die Internationalisierung, oder?

# Wie kann man Next.js-Apps optimieren, um am besten mit Übersetzungen auf Serverseite und auf Clientseite mit next-i18next zu arbeiten?

Nehmen wir das Beispiel von [next-i18next](https://github.com/i18next/next-i18next).
Während next-i18next [i18next](https://www.i18next.com) und [react-i18next](https://react.i18next.com) unter der Haube verwendet, müssen Benutzer von next-i18next einfach ihre Übersetzungsinhalte als JSON-Dateien einbinden und müssen sich um nichts weiter kümmern.

Standardmässig gibt es eine [next-i18next-Konfiguration](https://github.com/i18next/next-i18next#next-i18nextconfigjs), welche die Übersetzungen aus der lokalen Verzeichnisstruktur lädt und die Seiten serverseitig rendert.
<br />
Das ist ok, es funktioniert und ist für SEO etc. optimiert, aber wir könnten noch mehr tun.

Was wäre, wenn wir die SEO-optimierte Website mit immer aktuellen Übersetzungen versorgen könnten, ohne dass Sie Ihre App erneut bereitstellen müssen?

Wir werden 2 verschiedene Setups besprechen: [Eines mit einem aktiven Backend](#ssr) und ein anderes [ein vollständig statisch generiertes](#ssg).

Das grundlegende Ziel ist immer das gleiche: Wir wollen, dass alles in allen Sprachen SEO-optimiert ist und unseren Nutzern immer die neusten Übersetzungen zur Verfügung stellt.

# Beispiel mit einem Backend-Server <a name="ssr"></a>

![](../next-i18next/next-build.jpg)

Einen Backend-Server zu haben, bedeutet nicht, dass Sie gezwungen sind, Ihren eigenen Server zu betreiben. Es kann auch eine PaaS- oder serverless Lösung sein, wie [Vercel](https://vercel.com/) oder [Netlify](https://www.netlify.com/) usw.

Ok, fangen wir mit dem Default an:
<br />
Sie haben die normale [next-i18next Einrichtungsanleitung](https://github.com/i18next/next-i18next#setup) befolgt und jetzt sind Ihre Übersetzungen mehr oder weniger so organisiert:

```
.
└── public
    └── locales
        ├── en
        |   └── common.json
        └── de
            └── common.json
```

Lassen Sie uns jetzt eine Verbindung zu einem grossartigen Übersetzungsverwaltungssystem herstellen und Ihre Übersetzungen ausserhalb Ihres Codes verwalten.

Lassen Sie uns die Übersetzungsdateien mit [locize](https://locize.com) synchronisieren.
Dies kann bei Bedarf oder auf dem CI-Server oder vor der Bereitstellung der App erfolgen.

## Was zu tun ist, um diesen Schritt zu erreichen:
1. in locize: Anmeldung unter https://locize.app/register und [login](https://docs.locize.com/integration/getting-started/create-a-user-account)
2. in locize: [ein neues Projekt erstellen](https://docs.locize.com/integration/getting-started/add-a-new-project)
3. in locize: Fügen Sie alle Ihre zusätzlichen Sprachen hinzu (dies kann auch über die [API](https://docs.locize.com/integration/api#add-new-language) erfolgen)
4. installiere das [locize-cli](https://github.com/locize/locize-cli) (`npm i locize-cli`)

## Benutzen Sie die [locize-cli](https://github.com/locize/locize-cli)
Verwenden Sie den Befehl `locize sync`, um Ihr lokales Repository (`public/locales`) mit dem zu synchronisieren, was auf locize veröffentlicht wurde.

Alternativ können Sie auch den Befehl `locize download` verwenden, um die veröffentlichten locize-Übersetzungen immer in Ihr lokales Repository (`public/locales`) herunterzuladen, bevor Sie Ihre App bündeln.

> Aber Sie sprachen davon, immer aktuelle Übersetzungen zu haben, ohne Ihre App erneut bereitstellen zu müssen?

## Ja, passen wir uns dem an:

Wir werden das [i18next-locize-backend](https://github.com/locize/i18next-locize-backend)-Plugin verwenden, aber nur auf Client-Seite.

Zusammen mit einigen anderen i18next-Abhängigkeiten:

- [i18next-locize-backend](https://github.com/locize/i18next-locize-backend)
- [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)
- [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)

`npm install i18next-locize-backend i18next-chained-backend i18next-localstorage-backend`

Und wir passen die Datei `next-i18next.config.js` an:

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it'],
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : []
}
```

Und entfernen Sie dann die `serverSideTranslation` zu [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) oder [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) (abhängig von Ihrem Fall) in den Komponenten auf Seitenebene.

```javascript
//
// Ohne die Funktion getStaticProps oder getServerSideProps,
// werden die Übersetzungen über das konfigurierte i18next-Backend geladen.
//
// export const getStaticProps = async ({ locale }) => {
//   return {
//     props: await serverSideTranslations(locale, ['common', 'footer'])
//   }
// }
```

## Das ist es! Überprüfen wir das Ergebnis:

Das vom Server zurückgegebene HTML sieht korrekt übersetzt aus. Das ist also gut für Suchmaschinen optimiert.
![](../next-i18next/ssr-translations.jpg)

Und auf der Clientseite werden die aktuellen Übersetzungen direkt vom [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) abgerufen.
![](../next-i18next/client-loading.jpg)

🙀 Das bedeutet, dass Sie Übersetzungen korrigieren können, ohne Ihren Code ändern oder Ihre App erneut bereitstellen zu müssen. 🤩

*🧑‍💻 Den Code finden Sie  [hier](https://github.com/locize/next-i18next-locize).*


### Zusätzlicher Hinweis:

Wenn Sie [Caching](https://docs.locize.com/more/caching) für Ihre Locize-Version konfiguriert haben, benötigen Sie das [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend) und [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)-Plugin nicht unbedingt.

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it'],
  },
  backend: isBrowser ? {
    projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
    version: 'production'
  } : undefined,
  serializeConfig: false,
  use: isBrowser ? [LocizeBackend] : []
}
```

## Alternative Verwendung: <a name="alternative-usage"></a>

Falls Sie das [Ready-Flag](https://react.i18next.com/latest/usetranslation-hook#not-using-suspense) verwenden und eine Warnung wie diese sehen: `Expected server HTML to contains a matching text node for...`, hat dies folgenden Grund:

Der Server hat den korrekten Übersetzungstext gerendert, aber der Client muss die Übersetzungen immer noch verzögert laden und zeigt eine andere Benutzeroberfläche an. Dies bedeutet, dass es eine Hydratationsfehlanpassung gibt.

Dies kann verhindert werden, indem die `getServerSideProps`- oder `getStaticProps`-Funktion beibehalten wird, aber die [`reloadResources`](https://www.i18next.com/overview/api#reloadresources)-Funktionalität von i18next genutzt wird.

```javascript
const LazyReloadPage = () => {

  const { t, i18n } = useTranslation(['lazy-reload-page', 'footer'], { bindI18n: 'languageChanged loaded' })
  // bindI18n: loaded is needed because of the reloadResources call
  // if all pages use the reloadResources mechanism, the bindI18n option can also be defined in next-i18next.config.js
  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ['lazy-reload-page', 'footer'])
  }, [])

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <Link href='/'>
          <button
            type='button'
          >
            {t('back-to-home')}
          </button>
        </Link>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['lazy-reload-page', 'footer']),
  },
})

export default LazyReloadPage
```

Auf diese Weise entfällt auch die Ready-Prüfung, da die direkt vom Server bereitgestellten Übersetzungen verwendet werden. Und sobald die Übersetzungen neu geladen werden, werden neue Übersetzungen angezeigt.


# Beispiel für eine statische Website <a name="ssg"></a>

![](../next-i18next/next-export.jpg)

Bei diesem Beispiel brauchen wir nur einen statischen Webserver wie [GitHub Pages](https://pages.github.com/) oder ähnliches.

Es ist ziemlich dasselbe wie bei [obigem Beispiel](#ssr), aber es gibt ein paar Kleinigkeiten, die wir zusätzlich beachten müssen.

Um mit der Static-Site-Generierung (SSG) zu arbeiten, müssen wir den Befehl `next export` verwenden, aber...

>Error: i18n support is not compatible with next export. See here for more info on deploying: https://nextjs.org/docs/deployment

Dies passiert, wenn Sie die Funktion [internationalisiertes Routing](https://nextjs.org/docs/advanced-features/i18n-routing) verwenden und versuchen, einen [statischen HTML-Export](https://nextjs.org/docs/advanced-features/static-html-export), indem Sie `next export` ausführen.
Nun, diese Funktion erfordert einen Node.js-Server oder eine dynamische Logik, die während des Build-Prozesses nicht berechnet werden kann, deshalb ist sie [nicht unterstützt](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features).

Es gibt einen [dedizierten Artikel](../next-i18n-statisch/) mit einer Lösung für dieses Next.js-Problem. [Folge zuerst dieser Anleitung!](../next-i18n-statisch/)
[![](../next-i18n-static/title.jpg)](../next-i18n-statisch/)

## Gemacht? Dann machen wir hier weiter:

Es ist dieselbe `next-i18next.config.js`-Konfiguration wie im [vorherigen Beispiel](#ssr):

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

// If you've configured caching for your locize version, you may not need the i18next-localstorage-backend and i18next-chained-backend plugin.
// https://docs.locize.com/more/caching

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it'],
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : []
}
```

Erweitern Sie die `makeStaticProps`-Funktion mit Optionen (`emptyI18nStoreStore`):

```javascript
export function makeStaticProps(ns = [], opt = {}) {
  return async function getStaticProps(ctx) {
    const props = await getI18nProps(ctx, ns)
    if (opt.emptyI18nStoreStore) {
      // let the client fetch the translations
      props._nextI18Next.initialI18nStore = null
    }
    return {
      props
    }
  }
}
```

...und entsprechend verwenden:

```javascript
const getStaticProps = makeStaticProps(['common', 'footer'], { emptyI18nStoreStore: true })
export { getStaticPaths, getStaticProps }
```

## Das ist es! Überprüfen wir das Ergebnis:

Das generierte statische HTML sieht korrekt übersetzt aus. Das ist also gut für Suchmaschinen optimiert.
![](../next-i18next/ssg-translations.jpg)

Und auf der Client-Seite werden die aktuellen Übersetzungen direkt aus dem [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) abgerufen.
![](../next-i18next/client-loading.jpg)

🙀 Das bedeutet, dass Sie Übersetzungen korrigieren können, ohne Ihren Code ändern oder Ihre App erneut bereitstellen zu müssen. Und ohne einen aktiven Server zu besitzen. 🤩

*🧑‍💻 Der Code kann [here](https://github.com/i18next/next-language-detector/tree/main/examples/client-loading) gefunden werden.*


# Kontinuierliche Lokalisierung

Da wir jetzt mit as smart [Übersetzungsmanagementsystem](https://lociize.com) "verbunden“ sind, können wir versuchen, sein volles Potenzial auszuschöpfen.

## fehlende Übersetzungen speichern <a name="save-missing"></a>

>Ich möchte, dass neu hinzugefügte Schlüssel im Code automatisch gespeichert werden, um zu lokalisieren.

**Dein Wunsch ist mir Befehl!**

Erweitern Sie die next-i18next config mit dem locize api-key und setzen Sie `saveMissing: true`:

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: {
    projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
    apiKey: '14bbe1fa-6ffc-40f5-9226-7462aa4a042f',
    version: 'latest'
  },
  serializeConfig: false,
  use: isBrowser ? [LocizeBackend] : [],
  saveMissing: true // do not set saveMissing to true for production and also not when using the chained backend
}
```

Jedes Mal, wenn Sie einen neuen Schlüssel verwenden, wird dieser zu locize gesendet, d.h.:

```javascript
<div>{t('new.key', 'this will be added automatically')}</div>
```

resultiert in locize wie folgt:

![missing key](../next-i18next/missing_key.jpg "locize © inweso GmbH")


### 👀 aber es gibt noch mehr... <a name="more"></a>

Dank des Plugins [locize-lastused](https://github.com/locize/locize-lastused) können Sie [in locize, Schlüssel welche verwendet oder nicht mehr verwendet werden, finden und filtern](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

Mit Hilfe des Plugins [locize](https://github.com/locize/locize) können Sie Ihre App im locize [InContext Editor](https://docs.locize.com/more/incontext-editor) verwenden.

Zusätzlich mit Hilfe des [Auto-MachineTranslation-Workflows](https://docs.locize.com/whats-inside/auto-machine-translation) und der Verwendung der [saveMissing-Funktionalität](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App nicht nur neue Schlüssel zur automatischen Lokalisierung hinzugefügt, sondern auch automatisch per maschineller Übersetzung in die Zielsprachen übersetzt.

*Sehen Sie sich dieses [Video](https://youtu.be/VfxBpSXarlU) an, um zu sehen, wie der Arbeitsablauf der automatischen maschinellen Übersetzung aussieht!*

{% youtube VfxBpSXarlU %}

`npm install locize-lastused locize`

und zwar so:

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')

const isBrowser = typeof window !== 'undefined'

const locizeOptions = {
  projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
  apiKey: '14bbe1fa-6ffc-40f5-9226-7462aa4a042f',
  version: 'latest'
}

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: locizeOptions,
  locizeLastUsed: locizeOptions,
  serializeConfig: false,
  use: isBrowser ? [LocizeBackend, require('locize').locizePlugin, require('locize-lastused/cjs')] : [], // do not use locize-lastused on production
  saveMissing: true // do not set saveMissing to true for production and also not when using the chained backend
}
```

[Automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key automatisch](../next-i18next/missing_key_auto_mt.jpg "locize © inweso GmbH")

[Filter für zuletzt verwendete Übersetzungen]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](../next-i18next/last_used.jpg "locize © inweso GmbH")

[InContext-Editor](https://docs.locize.com/more/incontext-editor):

![i18next inkontext](../next-i18next/in_context.jpg "locize © inweso GmbH")

### 📦 Bereiten wir uns auf die Produktion vor 🚀 <a name="production"></a>

Now, we prepare the app for [going to production](https://docs.locize.com/guides-tips-and-tricks/going-production).

Jetzt bereiten wir die App für den Produktionsstart vor (https://docs.locize.com/guides-tips-and-tricks/going-production).

Erstellen Sie zuerst in locize eine dedizierte Version für die Produktion. Aktivieren Sie die automatische Veröffentlichung für diese Version nicht, sondern veröffentlichen Sie sie manuell oder über die [API](https://docs.locize.com/integration/api#publish-version) oder über die [CLI](https://github.com/locize/locize-cli#publish-version).
Schliesslich [aktivieren Sie auch Cache-Control max-age​](https://docs.locize.com/more/caching) für diese Produktionsversion.

Passen wir die Datei `next-i18next.config.js` noch einmal an:

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')

const isBrowser = typeof window !== 'undefined'

const locizeOptions = {
  projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
  apiKey: '14bbe1fa-6ffc-40f5-9226-7462aa4a042f',
  version: 'latest'
}

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: locizeOptions,
  locizeLastUsed: locizeOptions,
  serializeConfig: false,
  use: isBrowser ? [LocizeBackend, require('locize').locizePlugin, require('locize-lastused/cjs')] : [], // do not use locize-lastused on production
  saveMissing: true // do not set saveMissing to true for production and also not when using the chained backend
}
```

Während der Entwicklung werden Sie nun weiterhin fehlende Schlüssel speichern und die `lastused` Funktionalität nutzen. => `npm run dev`

Und in der Produktionsumgebung sind `saveMissing` und `lastused` deaktiviert, und auch der API-Schlüssel wird nicht verfügbar gemacht. => `npm run build && npm start`


[Caching](https://docs.locize.com/more/caching):

![i18next Caching](../next-i18next/caching.jpg "locize © inweso GmbH")

[Versionen zusammenführen](https://docs.locize.com/more/versioning#merging-versions):

![Version überschreiben](../next-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 Den vollständigen Code finden Sie [hier](https://github.com/locize/next-i18next-locize).*

*Sehen Sie sich auch den [Teil zur Code-Integration](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in diesem [YouTube-Video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

Es gibt auch ein [i18next-Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Herzlichen Glückwunsch 🎊🎁 <a name="congratulations"></a>

Genial! Dank an [next-i18next](https://github.com/i18next/next-i18next), [i18next](https://www.i18next.com), [react-i18next](https://react.i18next.com) und [locize](https://locize.com) ist Ihr kontinuierlicher Lokalisierungs-Workflow einsatzbereit.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Übersetzungs-Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

# 👍
