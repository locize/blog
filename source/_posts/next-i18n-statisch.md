---
title: Statischer HTML-Export mit i18n-Kompatibilität in Next.js
description: So generieren Sie einen statischen HTML-Export mit i18n-Kompatibilität in Next.js.

date: 2021-12-07
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
thumbnail: next-i18n-static/title.jpg

label: next-i18n-static
lang: de
hidden: true
---

![](../next-i18n-static/title.jpg "Next.js SSG Beispiel")

Sie kennen [Next.js](https://nextjs.org), richtig? - Wenn nicht, hören Sie auf, diesen Artikel zu lesen und machen Sie etwas anderes.

Next.js ist grossartig! Es bietet Ihnen die beste Entwicklererfahrung mit allen Funktionen, die Sie benötigen ...


## Inhaltsverzeichnis
  * [ABER, Sie haben vielleicht schon davon gehört](#but)
  * [Also was können wir jetzt tun?](#what-do)
  * [Das Rezept](#recipe)
  * [Das Ergebnis](#outcome)
  * [Der freiwillige Teil](#voluntary)
  * [🎉🥳 Herzliche Glückwünsche 🎊🎁](#congratulations)
      

# **ABER**, Sie haben vielleicht schon davon gehört: <a name="but"></a>

>Error: i18n support is not compatible with next export. See here for more info on deploying: https://nextjs.org/docs/deployment

Dies passiert, wenn Sie die Funktion [internationalisiertes Routing](https://nextjs.org/docs/advanced-features/i18n-routing) verwenden und versuchen, einen [statischen HTML-Export](https://nextjs.org/docs/advanced-features/static-html-export), indem Sie `next export` ausführen.
Nun, diese Funktion erfordert einen Node.js-Server oder eine dynamische Logik, die während des Build-Prozesses nicht berechnet werden kann, deshalb ist sie [nicht unterstützt](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features).

Dies ist beispielsweise der Fall, wenn Sie [next-i18next](https://github.com/i18next/next-i18next) verwenden.

# Also was können wir jetzt tun? <a name="what-do"></a>

![](../next-i18n-static/what.jpg)

Eine naheliegende Option ist, auf den statischen HTML-Export zu verzichten und als Deployment-Umgebung einen Node.js-Server oder [Vercel](https://vercel.com) zu verwenden.

Aber manchmal ist es aufgrund von Unternehmens- oder Architekturrichtlinien zwingend erforderlich, einen statischen Webserver zu verwenden.
<br/>
Ok dann auf i18n verzichten? - Nicht wirklich, wenn wir hier sind, scheint es eine Voraussetzung zu sein.
<br/>
Also ohne [Next.js](https://nextjs.org)? - Dies bedeutet jedoch normalerweise, das gesamte Projekt neu zu schreiben.

Das Ausführen von `next export`, wenn i18n nicht verwendet wird, scheint zu funktionieren.
Was ist, wenn wir nicht versuchen, die Funktion [internationalisiertes Routing](https://nextjs.org/docs/advanced-features/i18n-routing) zu verwenden und das i18n-Routing selbst durchführen?


# Das Rezept <a name="recipe"></a>

![](../next-i18n-static/cook-book.jpg "recipe")

Um dieses Rezept zu "kochen", benötigen Sie folgende Zutaten:

- Verwenden Sie die Funktion [dynamische Routensegmente](https://nextjs.org/docs/routing/introduction#dynamic-route-segments).
- Bereitschaft, die Struktur Ihrer Projektdateien zu ändern
- Bereitschaft, ein bisschen Code anzupassen
- eine Logik, um die Benutzersprache zu erkennen und entsprechend umzuleiten

Klingt machbar. Lasst uns beginnen!


**1. Entfernen Sie die i18n-Optionen aus `next.config.js`.**

  ```diff
  - const { i18n } = require('./next-i18next.config')
  - 
  module.exports = {
  -   i18n,
    trailingSlash: true,
  }
  ```

**2. Erstellen Sie einen Ordner `[locale]` in Ihrem Seitenverzeichnis.**

  a) Verschieben Sie alle Ihre Seitendateien in diesen Ordner *(nicht `_app.js` oder `_document.js` etc..)*.

  b) Passen Sie ggf. Ihre Importe an.

**3. Erstellen Sie eine `getStatic.js`-Datei und platzieren Sie sie zum Beispiel in einem `lib`-Verzeichnis.**

  ```js
  import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
  import i18nextConfig from '../next-i18next.config'

  export const getI18nPaths = () =>
    i18nextConfig.i18n.locales.map((lng) => ({
      params: {
        locale: lng
      }
    }))

  export const getStaticPaths = () => ({
    fallback: false,
    paths: getI18nPaths()
  })

  export async function getI18nProps(ctx, ns = ['common']) {
    const locale = ctx?.params?.locale
    let props = {
      ...(await serverSideTranslations(locale, ns))
    }
    return props
  }

  export function makeStaticProps(ns = {}) {
    return async function getStaticProps(ctx) {
      return {
        props: await getI18nProps(ctx, ns)
      }
    }
  }
  ```

**4. Verwenden Sie `getStaticPaths` und `makeStaticProps` auf Ihren Seiten wie folgt:**

  ```diff
  import { useTranslation } from 'next-i18next'
  import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
  import { Header } from '../../components/Header'
  import { Footer } from '../../components/Footer'
  import Link from '../../components/Link'

  + const getStaticProps = makeStaticProps(['common', 'footer'])
  + export { getStaticPaths, getStaticProps }

  const Homepage = () => {
    const { t } = useTranslation('common')

    return (
      <>
        <main>
          <Header heading={t('h1')} title={t('title')} />
          <div>
            <Link href='/second-page'><button type='button'>{t('to-second-page')}</button></Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  export default Homepage
  ```

**5. Installieren Sie [next-language-detector](https://github.com/i18next/next-language-detector).**

  `npm i next-language-detector`

**6. Erstellen Sie eine `languageDetector.js`-Datei und legen Sie sie zum Beispiel im `lib`-Verzeichnis ab.**

  ```js
  import languageDetector from 'next-language-detector'
  import i18nextConfig from '../next-i18next.config'

  export default languageDetector({
    supportedLngs: i18nextConfig.i18n.locales,
    fallbackLng: i18nextConfig.i18n.defaultLocale
  })
  ```

**7. Erstellen Sie eine `redirect.js`-Datei und legen Sie diese zum Beispiel im `lib`-Verzeichnis ab.**

  ```js
  import { useEffect } from 'react'
  import { useRouter } from 'next/router'
  import languageDetector from './languageDetector'

  export const useRedirect = (to) => {
    const router = useRouter()
    to = to || router.asPath

    // language detection
    useEffect(() => {
      const detectedLng = languageDetector.detect()
      if (to.startsWith('/' + detectedLng) && router.route === '/404') { // prevent endless loop
        router.replace('/' + detectedLng + router.route)
        return
      }

      languageDetector.cache(detectedLng)
      router.replace('/' + detectedLng + to)
    })

    return <></>
  };

  export const Redirect = () => {
    useRedirect()
    return <></>
  }

  // eslint-disable-next-line react/display-name
  export const getRedirect = (to) => () => {
    useRedirect(to)
    return <></>
  }
  ```

**8. Erstellen Sie für jede Ihrer Seitendateien in Ihrem `[locale]`-Verzeichnis, insbesondere aber für die `index.js`-Datei, eine gleichnamige Datei mit diesem Inhalt:**

  ```js
  import { Redirect } from '../lib/redirect'
  export default Redirect
  ```

**9. Erstellen Sie eine `Link.js`-Komponente und platzieren Sie diese beispielsweise im Verzeichnis `components`.**

  ```js
  import React from 'react'
  import Link from 'next/link'
  import { useRouter } from 'next/router'

  const LinkComponent = ({ children, skipLocaleHandling, ...rest }) => {
    const router = useRouter()
    const locale = rest.locale || router.query.locale || ''

    let href = rest.href || router.asPath
    if (href.indexOf('http') === 0) skipLocaleHandling = true
    if (locale && !skipLocaleHandling) {
      href = href
        ? `/${locale}${href}`
        : router.pathname.replace('[locale]', locale)
    }

    return (
      <>
        <Link href={href}>
          <a {...rest}>{children}</a>
        </Link>
      </>
    )
  }

  export default LinkComponent
  ```

**10. Ersetzen Sie alle `next/link` `Link`-Importe durch den entsprechenden `../components/Link` `Link`-Import:**

  ```diff
  - import Link from 'next/link'
  + import Link from '../../components/Link'
  ```

**11. Fügen Sie Ihre `_document.js`-Datei hinzu oder ändern Sie sie, um das richtige html-Attribut `lang` festzulegen:**

  ```js
  import Document, { Html, Head, Main, NextScript } from 'next/document'
  import i18nextConfig from '../next-i18next.config'

  class MyDocument extends Document {
    render() {
      const currentLocale = this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale
      return (
        <Html lang={currentLocale}>
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }

  export default MyDocument
  ```

**12. Falls Sie einen Sprachumschalter haben, erstellen oder passen Sie ihn an:**

  ```js
  // components/LanguageSwitchLink.js
  import languageDetector from '../lib/languageDetector'
  import { useRouter } from 'next/router'
  import Link from 'next/link'

  const LanguageSwitchLink = ({ locale, ...rest }) => {
    const router = useRouter()

    let href = rest.href || router.asPath
    let pName = router.pathname
    Object.keys(router.query).forEach((k) => {
      if (k === 'locale') {
        pName = pName.replace(`[${k}]`, locale)
        return
      }
      pName = pName.replace(`[${k}]`, router.query[k])
    })
    if (locale) {
      href = rest.href ? `/${locale}${rest.href}` : pName
    }

    return (
      <Link
        href={href}
        onClick={() => languageDetector.cache(locale)}
      >
        <button style={{ fontSize: 'small' }}>{locale}</button>
      </Link>
    );
  };

  export default LanguageSwitchLink
  ```

  ```js
  // components/Footer.js
  import { useTranslation } from 'next-i18next'
  import { useRouter } from 'next/router'
  import LanguageSwitchLink from './LanguageSwitchLink'
  import i18nextConfig from '../next-i18next.config'

  export const Footer = () => {
    const router = useRouter()
    const { t } = useTranslation('footer')
    const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale

    return (
      <footer>
        <p>
          <span style={{ lineHeight: '4.65em', fontSize: 'small' }}>{t('change-locale')}</span>
          {i18nextConfig.i18n.locales.map((locale) => {
            if (locale === currentLocale) return null
            return (
              <LanguageSwitchLink
                locale={locale}
                key={locale}
              />
            )
          })}
        </p>
      </footer>
    )
  }
  ```


# Das Ergebnis <a name="outcome"></a>

![](../next-i18n-static/result.jpg)

Wenn Sie jetzt Ihr Projekt starten (`next dev`), sollten Sie mehr oder weniger das gleiche Verhalten wie zuvor sehen.

Was ist also der Vorteil?

Versuchen Sie: `next build && next export`

Sie sollten am Ende so etwas sehen:

```sh
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)

info  - using build directory: /Users/usr/projects/my-awesome-project/.next
info  - Copying "static build" directory
info  - No "exportPathMap" found in "/Users/usr/projects/my-awesome-project/next.config.js". Generating map from "./pages"
info  - Launching 9 workers
info  - Copying "public" directory
info  - Exporting (3/3)
Export successful. Files written to /Users/usr/projects/my-awesome-project/out
```

**Juhuu, kein `i18n support is not compatible with next export` Fehler mehr!!!**

**Herzliche Glückwünsche! Jetzt können Sie den Inhalt Ihres `out`-Verzeichnisses auf jedem statischen Webserver "verteilen".**

*🧑‍💻 Der komplette Code kann [hier](https://github.com/i18next/next-language-detector/tree/main/examples/basic) gefunden werden.*


# Der freiwillige Teil <a name="voluntary"></a>

![transformieren Sie den Lokalisierungsprozess](../next-i18n-static/transform_your_localization_process_small.jpg "locize © inweso GmbH")

Verbinden Sie sich mit einem grossartigen Übersetzungsmanagementsystem und verwalten Sie Ihre Übersetzungen außerhalb Ihres Codes.

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


# 🎉🥳 Herzliche Glückwünsche 🎊🎁 <a name="congratulations"></a>

Ich hoffe, Sie haben ein paar neue Dinge über die Generierung statischer Websites (SSG), [Next.js](https://nextjs.org), [next-i18next](https://github.com/i18next/next-i18next), [i18next](https://www.i18next.com) und [moderne Lokalisierungsworkflows](https://locize.com).

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Übersetzungs-Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

# 👍

---

# Suchen Sie nach einem optimierten Next.js-Übersetzungs-Setup?

[![next-i18next](../next-i18next/next-i18next.jpg)](../next-i18next-de/)
[Hier](../next-i18next-de/) finden Sie einen Blogbeitrag zur optimalen Verwendung von next-i18next mit clientseitigem Übersetzungsdownload und SEO-Optimierung.
