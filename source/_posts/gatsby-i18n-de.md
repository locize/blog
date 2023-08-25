---
title: Beste Internationalisierung für Gatsby (ein i18next-basierter Leitfaden)
description: Gatsby-Lokalisierung leicht gemacht mit dieser ✅ Schritt-für-Schritt-Anleitung mit i18next.

date: 2022-08-09
tags:
  - i18next
  - react
  - react-i18next
  - gatsby
  - gatsby-plugin-react-i18next
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
thumbnail: gatsby-i18n/gatsby-i18next.jpg

label: gatsby-i18n
lang: de
hidden: true
---

![Gatsby-Lokalisierung leicht gemacht mit dieser Schritt-für-Schritt-Anleitung mit i18next ✅](../gatsby-i18n/gatsby-i18next.jpg "Gatsby-Lokalisierungsbeispiel")

Sie kennen [Gatsby](https://www.gatsbyjs.com), richtig? - Wenn nicht, hören Sie auf, diesen Artikel zu lesen und machen Sie etwas anderes.

Ja, Gatsby ist ein Open-Source-Framework, welches Funktionen von React, GraphQL und Webpack in einem einzigen Tool zum Erstellen statischer Websites und Apps kombiniert.

> Aber wie sieht die Internationalisierung (i18n) in Gatsby aus?

Es gibt einige Plugins/Bibliotheken, die bei der Instrumentierung des Gatsby-Codes für die Internationalisierung helfen können.
In diesem Artikel verwenden wir ein Plugin, das auf dem berühmten i18n-Framework [i18next](https://www.i18next.com) bzw. seiner grossartigen Erweiterung für [React.js](https://reactjs.org) basiert - [react-i18next](https://react.i18next.com).
<br />
Das von uns verwendete Gatsby-Plugin ist [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next), erstellt von [Dmitriy Nevzorov](https://twitter.com/nevzorov_d).

### Inhaltsverzeichnis
  * [Also erstmal: "Warum i18next?"](#why-i18next)
  * [Fangen wir an...](#start)
    - [Voraussetzungen](#prerequisites)
    - [Einstieg](#getting-started)
    - [Sprachumschalter](#language-switcher)
    - [Internationalisierte Links](#i18n-link)
    - [Interpolation und Pluralisierung](#interpolation-pluralization)
    - [Formatierung](#formatting)
    - [Kontext](#context)
    - [Schlüsselextraktion](#extract)
    - [Auf jeden Fall!](#for-sure)
    - [Wie sieht das aus?](#how-look)
    - [👀 aber es gibt noch mehr... (In-Kontext-Editor)](#more)
  * [🎉🥳 Herzliche Glückwünsche 🎊🎁](#congratulations)

## Also erstmal: "Warum i18next?" <a name="why-i18next"></a>

Wenn es um React-Lokalisierung geht, ist eines der beliebtesten Frameworks [i18next](https://www.i18next.com) mit seiner React-Erweiterung [react-i18next](https://react.i18next.com), und das aus guten Gründen:

*i18next wurde Ende 2011 erstellt. Es ist älter als die meisten Bibliotheken, die Sie heutzutage verwenden, einschliesslich Ihrer wichtigsten Frontend-Technologie ([React](../react-i18next-de/), [Angular](../angular-i18next-de/), [Vue](../i18next-vue-de/), ...).*
<br />
**➡️ nachhaltig**


*Basierend darauf, wie lange i18next bereits Open Source verfügbar ist, gibt es keinen echten i18n-Fall, der nicht mit i18next gelöst werden könnte.*
<br />
**➡️ reif**


*i18next kann in jeder Umgebung mit Javascript (und einigen Nicht-Javascript - .net, elm, iOS, Android, Ruby, ...) verwendet werden, mit jedem UI-Framework, mit jedem i18n-Format, ... [die Möglichkeiten sind endlos](https://www.i18next.com/overview/supported-frameworks).*
<br />
**➡️ erweiterbar**


*Es gibt viele Funktionen und Möglichkeiten, die Sie mit i18next im Vergleich zu anderen regulären 18n-Frameworks erhalten.*
<br />
**➡️ reich**


[Hier](https://www.i18next.com/overview/comparison-to-others) finden Sie weitere Informationen darüber, warum i18next so besonders ist und [wie es funktioniert](https://locize.com/i18next.html#how-does-i18next-work).


## Fangen wir an... <a name="start"></a>

### Voraussetzungen <a name="prerequisites"></a>

Stellen Sie sicher, dass Sie Node.js und npm installiert haben. Am besten, wenn Sie etwas Erfahrung mit einfachem HTML, JavaScript, React.js und einfachem Gatsby haben, bevor Sie zu [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next). Dieses Gatsby-Lokalisierungsbeispiel ist nicht als Gatsby- oder React-Tutorial für Anfänger gedacht.


### Einstieg <a name="getting-started"></a>

Nehmen Sie Ihr eigenes Gatsby-Projekt oder erstellen Sie ein neues, z. B. mit der [gatsby-cli](https://www.gatsbyjs.com/docs/reference/gatsby-cli/#new).

`npx gatsby-cli new`

Wir werden einen Sprachumschalter erstellen, um den Inhalt zwischen verschiedenen Sprachen zu ändern.

Lassen Sie uns einige i18next-Abhängigkeiten installieren:

- [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next)
- [i18next](https://www.i18next.com)
- [react-i18next](https://react.i18next.com)

`npm install gatsby-plugin-react-i18next i18next react-i18next`

Erstellen Sie ein `locales`-Verzeichnis und fügen Sie einen Unterordner für Ihre Standard-/Referenzsprache hinzu (z. B. `en` für Englisch).
<br />
Dort fügen wir dann unsere Namespace-Dateien hinzu, wie:
```
|-- en
    |-- common.json
    |-- index.json
```

Lassen Sie uns eine `languages.js`-Datei hinzufügen:
```javascript
const { join } = require('path')
const { readdirSync, lstatSync } = require('fs')

const defaultLanguage = 'en';

// based on the directories get the language codes
const languages = readdirSync(join(__dirname, 'locales')).filter((fileName) => {
  const joinedPath = join(join(__dirname, 'locales'), fileName)
  const isDirectory = lstatSync(joinedPath).isDirectory()
  return isDirectory
});
// defaultLanguage as first
languages.splice(languages.indexOf(defaultLanguage), 1);
languages.unshift(defaultLanguage);

module.exports = {
  languages,
  defaultLanguage,
};
```

Importieren Sie die Datei `languages.js` in die Datei `gatsby-config.js` und konfigurieren Sie einige Plugins:
```javascript
const { languages, defaultLanguage } = require('./languages');
// somewhere in your plugins add:
module.exports = {
  // ...
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        languages,
        defaultLanguage,
        siteUrl,
        i18nextOptions: {
          // debug: true,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          }
        },
      },
    },
    // ...
  ]
}
```

Beginnen wir nun mit der Instrumentierung unseres ersten internationalisierten Textes.
<br />
Da [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next) alle Methoden und Komponenten von [react-i18next](https://react.i18next.com) exportiert, können wir dies tun:
<br />
In einer "page"-Datei:

```javascript
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';
import React from 'react';
// ...

const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Seo title={t('seo')} />
      <h1>
        <Trans i18nKey="title">Hi people</Trans>
      </h1>
      { /* ... */}
    </Layout>
  )
}

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
```

Definieren Sie jetzt auch eine `locales/en/index.json`-Namespace-Datei, wie folgt:
```json
{
  "seo": "Home",
  "title": "Hi people"
}
```

Und vielleicht auch noch eine für Deutsch?

`locales/de/index.json`:
```json
{
  "seo": "Startseite",
  "title": "Hallo Leute"
}
```


### Sprachumschalter <a name="language-switcher"></a>

Um zwischen verschiedenen Sprachen wechseln zu können, benötigen wir einen Sprachumschalter:

```javascript
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';

const Header = ({ siteTitle }) => {
  const { languages, originalPath, t, i18n } = useI18next();
  return (
    <header className="main-header">
      {/* ... */}
      <ul className="languages">
        {languages.map((lng) => (
          <li key={lng}>
            <Link to={originalPath} language={lng} style={{ textDecoration: i18n.resolvedLanguage === lng ? 'underline' : 'none' }}>
              {lng}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
```

Sie sollten jetzt so etwas sehen:

![gatsby Sprachumschalter](../gatsby-i18n/app_0.jpg "locize © inweso GmbH")

Standardmässig wird [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next) beim ersten Laden auf die `defaultLanguage` zurückfallen, wenn die erkannte Sprache des Browsers im `languages`-Array nicht verfügbar ist.

Wenn Sie im `languages`-Array auf eine andere Sprache zurückgreifen möchten, können Sie die Option `fallbackLanguage` definieren.

Jetzt sollte auch das Umschalten auf `de` (Deutsch) funktionieren:

![gatsby Sprachumschalter](../gatsby-i18n/app_1.jpg "locize © inweso GmbH")

**🥳 Toll, Sie haben gerade Ihren ersten Sprachumschalter erstellt!**

### Internationalisierte Links <a name="i18n-link"></a>

Lassen Sie uns eine zweite Seite erstellen ...

```javascript
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/layout';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const SecondPage = (props) => {
  const { t } = useTranslation();
  const [count, setCounter] = useState(0);
  return (
    <Layout>
      <Seo title={t('title')} />
      <h1>
        <Trans i18nKey="title">Page two</Trans>
      </h1>
      <p>
        <Trans i18nKey="welcome">Welcome to page 2</Trans> ({props.path})
      </p>
      {/* ... */}
    </Layout>
  );
};

export default SecondPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["page-2"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
```

Ein neuer Namensraum:<br />`locales/en/page-2.json`
```json
{
  "title": "Page two",
  "welcome": "Welcome to page 2"
}
```

`locales/de/page-2.json`
```json
{
  "title": "Seite zwei",
  "welcome": "Willkommen auf Seite 2"
}
```

...und verweisen Sie von der ersten Seite auf diese Seite:

```javascript
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';
import React from 'react';
// ...

const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Seo title={t('seo')} />
      <h1>
        <Trans i18nKey="title">Hi people</Trans>
      </h1>
      { /* ... */}
      <p>
        <Link to="/page-2/">
          <Trans i18nKey="goToPage2">Go to page 2</Trans>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
```

Ein neuer Übersetzungsschlüssel für `locales/en/index.json`:
```json
{
  "seo": "Home",
  "title": "Hi people",
  "goToPage2": "Go to page 2"
}
```

`locales/de/index.json`:
```json
{
  "seo": "Startseite",
  "title": "Hallo Leute",
  "goToPage2": "Gehen Sie zu Seite 2"
}
```

Die aus `gatsby-plugin-react-i18next` exportierte `Link`-Komponente verlinkt automatisch auf die richtige Sprache.
<br />
Die `Link`-Komponente ist identisch mit der Gatsby-Link-Komponente, ausser dass Sie die zusätzliche Sprach-prop bereitstellen können, um einen Link zu einer Seite mit einer anderen Sprache zu erstellen.


### Interpolation und Pluralisierung <a name="interpolation-pluralization"></a>

i18next geht über die Bereitstellung der standardmässigen i18n-Funktionen hinaus.
Aber sicher ist es in der Lage, [Plurale](https://www.i18next.com/translation-function/plurals) und [Interpolation](https://www.i18next.com/translation-function/interpolation) zu verarbeiten.

Zählen wir jedes Mal, wenn auf eine Schaltfläche geklickt wird:

```javascript
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/layout';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const SecondPage = (props) => {
  const { t } = useTranslation();
  const [count, setCounter] = useState(0);
  return (
    <Layout>
      <Seo title={t('title')} />
      <h1>
        <Trans i18nKey="title">Page two</Trans>
      </h1>
      <p>
        <Trans i18nKey="welcome">Welcome to page 2</Trans> ({props.path})
      </p>
      <p>
        <button onClick={() => {
          setCounter(count + 1);
        }}>{
          t('counter', { count })
        }</button>
      </p>
      {/* ... */}
    </Layout>
  );
};

export default SecondPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["page-2"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
```

...und erweitern die Übersetzungsressourcen:<br />`locales/en/page-2.json`
```json
{
  "title": "Page two",
  "welcome": "Welcome to page 2",
  "counter_one": "clicked one time",
  "counter_other": "clicked {{count}} time",
  "counter_zero": "Click me!"
}
```

`locales/de/page-2.json`
```json
{
  "title": "Seite zwei",
  "welcome": "Willkommen auf Seite 2",
  "counter_one": "einmal angeklickt",
  "counter_other": "{{count}} Mal geklickt",
  "counter_zero": "Klick mich!"
}
```

Basierend auf dem Zählwert wählt i18next die korrekte Pluralform aus.

i18next bietet auch die Möglichkeit, eine spezielle Übersetzung für `{count: 0}` zu haben, sodass eine natürlichere Sprache verwendet werden kann. Wenn der `count` Wert `0` ist und ein `_zero`-Eintrag vorhanden ist, dann wird er anstelle des Plural-Suffix der regulären Sprache (`_other`) verwendet.

Lesen Sie mehr über [Pluralisierung](https://www.i18next.com/translation-function/plurals) und [Interpolation](https://www.i18next.com/translation-function/interpolation) in der [offiziellen i18next-Dokumentation](https://www.i18next.com/).

![gatsby Pluralisierung](../gatsby-i18n/app_2.gif "locize © inweso GmbH")

*💡 i18next ist auch in der Lage, Sprachen mit mehreren Pluralformen zu verarbeiten, wie Arabisch:*

```javascript
// translation resources:
{
  "key_zero": "zero",
  "key_one": "singular",
  "key_two": "two",
  "key_few": "few",
  "key_many": "many",
  "key_other": "other"
}

// usage:
t('key', {count: 0}); // -> "zero"
t('key', {count: 1}); // -> "singular"
t('key', {count: 2}); // -> "two"
t('key', {count: 3}); // -> "few"
t('key', {count: 4}); // -> "few"
t('key', {count: 5}); // -> "few"
t('key', {count: 11}); // -> "many"
t('key', {count: 99}); // -> "many"
t('key', {count: 100}); // -> "other"
```

#### Warum funktionieren meine Pluralformen nicht? <a name="pluralsv4"></a>

Sehen Sie diese Warnung in der Entwicklungskonsole (`debug: true`)?

> i18next::pluralResolver: Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.

Mit [v21](https://www.i18next.com/misc/migration-guide#v20.x.x-to-v21.0.0) hat i18next das Suffix mit dem in der [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules).
In Umgebungen, in denen die API [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules) nicht verfügbar ist (wie bei älteren Android-Geräten), müssen Sie möglicherweise zu [polyfill](https://github.com/eemeli/intl-pluralrules) die [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules)-API.
Falls es nicht verfügbar ist, wird auf die Pluralbehandlung von [i18next JSON format v3](https://www.i18next.com/misc/json-format#i-18-next-json-v3) zurückgegriffen. Und wenn Ihr json bereits die neuen Suffixe verwendet, werden Ihre Pluralschlüssel wahrscheinlich nicht angezeigt.

*tldr;*

`npm install intl-pluralrules`

```javascript
import 'intl-pluralrules'
```


### Formatierung <a name="formatting"></a>

Sehen wir uns nun an, wie wir verschiedene Datumsformate mit Hilfe von [i18next](https://www.i18next.com) und [Luxon](https://moment.github.io/luxon) verwenden können, um das Datum zu verarbeiten und Zeit.

`npm install luxon`

Wir möchten eine Fusszeile haben, die das aktuelle Datum anzeigt:

```javascript
import React from 'react';
import { DateTime } from 'luxon';
import { useI18next } from 'gatsby-plugin-react-i18next';
// ...

const Layout = ({ children }) => {
  const { t, i18n } = useI18next();

  // defining custom formatters is normally done immediately after the i18next.init call, but with gatsby-plugin-react-i18next is not possible, so let's add it here
  if (!i18n.services.formatter.date_huge) {
    i18n.services.formatter.add('date_huge', (value, lng, options) => {
      return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
    });
  }

  return (
    <>
      <Header />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0 1.0875rem 1.45rem',
        }}
      >
        <main>{children}</main>
        <footer style={{ marginTop: 50 }}>
          <i>
            {
              t('footer', { date: new Date() })
            }
          </i>
        </footer>
      </div>
    </>
  );
};

export default Layout;
```

Importieren Sie Luxon und definieren Sie eine Formatfunktion, wie in der [Dokumentation](https://www.i18next.com/translation-function/formatting) dokumentiert, und fügen Sie den neuen Übersetzungsschlüssel hinzu:

`locales/en/common.json`
```json
{
  "footer": "Today is {{date, date_huge}}"
}
```

`locales/de/common.json`
```json
{
  "footer": "Heute ist {{date, date_huge}}"
}
```

**😎 Cool, jetzt haben wir eine sprachspezifische Datumsformatierung!**

Englisch:
![gatsby english](../gatsby-i18n/app_3.jpg "locize © inweso GmbH")

Deutsch:
![gatsby german](../gatsby-i18n/app_4.jpg "locize © inweso GmbH")


### Kontext <a name="context"></a>

Was ist mit einer bestimmten Begrüssungsnachricht basierend auf der aktuellen Tageszeit? also morgens, abends usw.
Dies ist dank der Funktion [context](https://www.i18next.com/translation-function/context) von i18next möglich.

Lassen Sie uns eine `getGreetingTime`-Funktion erstellen und das Ergebnis als Kontextinformationen für unsere Fusszeilenübersetzung verwenden:

```javascript
import React from 'react';
import { DateTime } from 'luxon';
import { useI18next } from 'gatsby-plugin-react-i18next';
// ...

const getGreetingTime = (d = DateTime.now()) => {
  const split_afternoon = 12; // 24hr time to split the afternoon
  const split_evening = 17; // 24hr time to split the evening
  const currentHour = parseFloat(d.toFormat('hh'));
	
  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    return 'afternoon';
  } else if (currentHour >= split_evening) {
    return 'evening';
  }
  return 'morning';
}

const Layout = ({ children }) => {
  const { t, i18n } = useI18next();

  // defining custom formatters is normally done immediately after the i18next.init call, but with gatsby-plugin-react-i18next is not possible, so let's add it here
  if (!i18n.services.formatter.date_huge) {
    i18n.services.formatter.add('date_huge', (value, lng, options) => {
      return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
    });
  }

  return (
    <>
      <Header />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0 1.0875rem 1.45rem',
        }}
      >
        <main>{children}</main>
        <footer style={{ marginTop: 50 }}>
          <i>
            {
              t('footer', { date: new Date(), context: getGreetingTime() })
            }
          </i>
        </footer>
      </div>
    </>
  );
};

export default Layout;
```

Und fügen Sie einige kontextspezifische Übersetzungsschlüssel hinzu:

`locales/en/common.json`
```json
{
  "footer": "Today is {{date, date_huge}}",
  "footer_afternoon": "Good afternoon! It's {{date, date_huge}}",
  "footer_evening": "Good evening! Today was the {{date, date_huge}}",
  "footer_morning": "Good morning! Today is {{date, date_huge}} | Have a nice day!"
}
```

`locales/de/common.json`
```json
{
  "footer": "Heute ist {{date, date_huge}}",
  "footer_afternoon": "Guten Nachmittag! Es ist {{date, date_huge}}",
  "footer_evening": "Guten Abend! Heute war der {{date, date_huge}}",
  "footer_morning": "Guten Morgen! Heute ist {{date, date_huge}} | Einen schönen Tag noch!"
}
```

**😁 Ja, es funktioniert!**

![gatsby Übersetzungen](../gatsby-i18n/app_5.jpg "locize © inweso GmbH")


### Schlüsselextraktion <a name="extract"></a>

Dank [babel-plugin-i18next-extract](https://i18next-extract.netlify.app) können Sie automatisch Übersetzungen innerhalb der `t`-Funktion und der `Trans`-Komponente aus Ihren Seiten extrahieren und in den Namespace-Dateien speichern.

Es funktioniert so:
<br />
Installieren Sie zuerst die erforderlichen Abhängigkeiten:

`npm install @babel/cli @babel/plugin-transform-typescript babel-plugin-i18next-extract`

Erstellen oder aktualisieren Sie die Datei `babel-extract.config.js` (nennen Sie sie NICHT `babel.config.js`, sonst wird sie von Gatsby verwendet):

```javascript
const { defaultLanguage } = require('./languages');
process.env.NODE_ENV = 'test';
module.exports = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    [
      'i18next-extract',
      {
        keyAsDefaultValue: [defaultLanguage],
        useI18nextDefaultValue: [defaultLanguage],
        // discardOldKeys: true,
        defaultNS: 'common',
        outputPath: 'locales/{{locale}}/{{ns}}.json',
        customTransComponents: [['gatsby-plugin-react-i18next', 'Trans']],
        compatibilityJSON: 'v4',
      }
    ]
  ],
  overrides: [
    {
      test: [`**/*.ts`, `**/*.tsx`],
      plugins: [[`@babel/plugin-transform-typescript`, {isTSX: true}]]
    }
  ]
};
```

Fügen Sie Ihrer `package.json` ein Skript hinzu:

```json
"scripts": {
  "extract": "babel --config-file ./babel-extract.config.js -o tmp/chunk.js 'src/**/*.{js,jsx,ts,tsx}' && rm -rf tmp"
}
```

Wenn Sie Übersetzungen pro Seite für einen bestimmten Namensraum extrahieren möchten, können Sie am Anfang der Seite einen speziellen Kommentar hinzufügen:

```javascript
// i18next-extract-mark-ns-start index

import React from 'react';
// ...
```

zu Info: Es gibt auch andere [Kommentarhinweise](https://i18next-extract.netlify.app/#/comment-hints), die Sie verwenden können.

Alle Ihre Seiten vorbereitet? Schön, also versuchen wir das:

```javascript
// i18next-extract-mark-ns-start index

import React from 'react';
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Seo from '../components/seo';

const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Seo title={t('seo')} />
      <h1>
        <Trans i18nKey="title">Hi people</Trans>
      </h1>
      <p>
        <Trans i18nKey="welcome">Welcome to your new Gatsby site.</Trans>
      </p>
      <p>
        <Trans i18nKey="cta">Now go build something great.</Trans>
      </p>
      <p>
        <Link to="/page-2/">
          <Trans i18nKey="goToPage2">Go to page 2</Trans>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["common", "index"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
```

Das Ausführen von `npm run extract` fügt nun diesen neuen `cta`-Schlüssel zur Namespace-Datei hinzu:

```json
{
  "cta": "Now go build something great.",
  "goToPage2": "Go to page 2",
  "seo": "Home",
  "title": "Hi people",
  "welcome": "Welcome to your new Gatsby site."
}
```

### Extra-Power <a name="extra-power"></a>

**Das ist alles schon toll, aber wir können noch mehr!**

Schön wäre eine Übersicht, welche Übersetzungen fehlen und welche Dateien komplett übersetzt sind...
<br />
Und was, wenn Sie neue Schlüssel extrahiert haben, und dieser würde automatisch übersetzt werden?
<br />
Um dies wahr werden zu lassen, benötigen wir ein [Übersetzungsmanagement-System](../i18n-l10n-t9n-tms/)...


Indem Sie die Übersetzungen an einige Übersetzer oder Übersetzungsagenturen senden, haben Sie mehr Kontrolle und einen direkten Kontakt mit ihnen. Das bedeutet aber auch mehr Arbeit für Sie.
Dies ist ein traditioneller Weg. Beachten Sie jedoch, dass das Versenden von Dateien immer einen Overhead verursacht.

> Gibt es eine bessere Option?

#### Auf jeden Fall! <a name="sicher"></a>

[i18next](https://www.i18next.com) hilft dabei, die Anwendung zu übersetzen, und das ist grossartig – aber es steckt noch mehr dahinter.
- Wie integrieren Sie eventuelle Übersetzungsdienste/-agenturen?
- Wie behalten Sie den Überblick über neue oder entfernte Inhalte?
- Wie gehen Sie mit der richtigen Versionierung um?
- und vieles mehr...

**Suche Sie nach sowas❓**

- [Einfach zu integrieren](https://docs.locize.com/integration/instrumenting-your-code#i-18-next)
- Kontinuierliche Bereitstellung? [Kontinuierliche Lokalisierung](https://locize.com/how-it-works.html#continouslocalization)!
- Einfache Verwaltung der Übersetzungsdateien
- [Professionelle Übersetzungen bestellen](https://docs.locize.com/guides-tips-and-tricks/working-with-translators)
- Analytik & Statistik
- [Versionierung Ihrer Übersetzungen](https://docs.locize.com/more/versioning)
- [Automatische und maschinelle Übersetzung auf Abruf](https://docs.locize.com/whats-inside/auto-machine-translation)
- [Risikofrei: Nehmen Sie Ihre Daten mit](https://docs.locize.com/more/general-questions/how-is-locize-different-from-the-alternatives#service-lock-in)
- [Transparente und faire Preisgestaltung](https://locize.com/pricing.html)
- und vieles mehr...

![transformiere den Lokalisierungsprozess](../gatsby-i18n/transform_your_localization_process_small.jpg "locize © inweso GmbH")

#### Wie sieht das aus? <a name="how-look"></a>

Zuerst müssen Sie sich bei locize [registrieren](https://locize.app/register) und [anmelden](https://docs.locize.com/integration/getting-started/create-a-user-account).
Dann [erstellen Sie ein neues Projekt](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize und fügen Ihre Übersetzungen hinzu. Sie können Ihre Übersetzungen entweder über die [CLI](https://github.com/locize/react-tutorial#use-the-locize-cli) oder durch [Importieren der einzelnen json-Dateien](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) oder über die [API](https://docs.locize.com/integration/api#update-remove-translations) bewerkstelligen.

Lassen Sie uns nun die [locize-cli](https://github.com/locize/locize-cli) installieren:

`npm install -g locize-cli`

Wir bereiten ein neues Skript vor, das unsere lokalen Änderungen mit locize synchronisiert.
Und auch ein optionales zweites Skript, das nur die neuesten Übersetzungen von locize herunterlädt.
Stellen Sie sicher, dass Sie Ihre Projekt-ID und Ihren API-Schlüssel verwenden:

```json
"scripts": {
  "syncLocales": "locize sync --project-id=5d47a999-5c34-4161-a389-bc2189507a50 --ver=latest --api-key=42ca9d58-18da-44c7-8dd3-8f59b8c35bda --path=./locales",
  "downloadLocales": "locize download --project-id=5d47a999-5c34-4161-a389-bc2189507a50 --ver=latest --clean=true --path=./locales"
}
```

Verwenden Sie das Skript `npm run syncLocales`, um Ihr lokales Repository mit dem zu synchronisieren, was auf locize veröffentlicht wurde.

Alternativ können Sie auch das Skript `npm run downloadLocales` verwenden, um die veröffentlichten Lokalisierungsübersetzungen immer in Ihr lokales Repository herunterzuladen, bevor Sie Ihre App bündeln.


Wenn wir jetzt einen neuen Übersetzungsschlüssel hinzufügen, etwa so:

```javascript
<Trans i18nKey="newKey">this will be added automatically after "extract" and "syncLocales"</Trans>
```

und anschliessend `npm run export` und dann `npm run syncLocales` ausführen, erhalten wir Folgendes:

`locales/en/page-2.json`:
```json
{
  "back": "Go back to the homepage",
  "counter_one": "clicked one time",
  "counter_other": "clicked {{count}} time",
  "counter_zero": "Click me!",
  "title": "Page two",
  "welcome": "Welcome to page 2",
  "newKey": "this will be added automatically after \"extract\" and \"syncLocales\""
}
```

`locales/de/page-2.json`:
```json
{
  "back": "Gehen Sie zurück zur Startseite",
  "counter_one": "einmal angeklickt",
  "counter_other": "{{count}} Mal geklickt",
  "counter_zero": "Klick mich!",
  "title": "Seite zwei",
  "welcome": "Willkommen auf Seite 2",
  "newKey": "dies wird automatisch nach \"extract\" und \"syncLocales\" hinzugefügt"
}
```

![neuer Schlüssel](../gatsby-i18n/locize_new_key.jpg "locize © inweso GmbH")

*Dank der optional aktivierten [automatische maschinelle Übersetzung Option](https://docs.locize.com/whats-inside/auto-machine-translation) werden während der Entwicklung der App nicht nur neue Schlüssel zu locize hinzugefügt, sondern auch automatisch mittels maschineller Übersetzung in die Zielsprachen übersetzt.*

![gatsby Übersetzungen](../gatsby-i18n/app_6.jpg "locize © inweso GmbH")


#### 👀 aber es gibt noch mehr... (In-Kontext-Editor) <a name="more"></a>

Mit Hilfe des Plugins [locize](https://github.com/locize/locize) können Sie Ihre App im locize [InContext Editor](https://docs.locize.com/more/incontext-editor) verwenden.

Neugierig zu sehen, wie das aussieht?

Ok, installieren Sie zuerst die `locize`-Abhängigkeit:

`npm install locize`

Fügen Sie dann im Code (wir wählen unsere Datei `layout.js` aus) Folgendes hinzu:

```javascript
import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { locizePlugin, setEditorLng } from 'locize';
// ...

const Layout = ({ children }) => {
  const { t, i18n } = useI18next();

  // defining custom formatters is normally done immediately after the i18next.init call, but with gatsby-plugin-react-i18next is not possible, so let's add it here
  if (!i18n.services.formatter.date_huge) {
    i18n.services.formatter.add('date_huge', (value, lng, options) => {
      return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
    });
    // also the locize plugin normally is automatically configured, but here we need to do it that way
    locizePlugin.init(i18n);
    setEditorLng(i18n.resolvedLanguage);
  }

  return (
    <>
      <Header />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0 1.0875rem 1.45rem',
        }}
      >
        <main>{children}</main>
        <footer style={{ marginTop: 50 }}>
          <i>
            {
              t('footer', { date: new Date(), context: getGreetingTime() })
            }
          </i>
        </footer>
      </div>
    </>
  );
};

export default Layout;
```

Und in der `gatsby-config.js` fügen Sie einige neue React-Optionen hinzu:

```javascript
const { languages, defaultLanguage } = require('./languages');
module.exports = {
  // ...
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        languages,
        defaultLanguage,
        siteUrl,
        i18nextOptions: {
          // debug: true,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          react: {
            bindI18n: 'languageChanged editorSaved', // the editorSaved event will trigger a rerender
          }
        },
      },
    },
    // ...
  ]
}
```

Gehen Sie dann zu Ihrem Locize-Projekt und definieren Sie Ihre Kontext-Editor-URLs, wie [hier](https://docs.locize.com/different-views/incontext#setup-and-configuration) beschrieben.

**Das Ergebnis wird wie folgt aussehen:**
![i18next In-Kontext](../gatsby-i18n/in_context.gif "locize © inweso GmbH")


>Ist das nicht toll?


*🧑‍💻 Den vollständigen Code finden Sie [hier](https://github.com/locize/locize-gatsby-example).*

Wenn Sie mehr Grundlagen über i18next erfahren möchten, gibt es auch ein [i18next-Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}

## 🎉🥳 Herzlichen Glückwunsch 🎊🎁 <a name="congratulations"></a>

Ich hoffe, Sie haben ein paar neue Dinge über [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next), [i18next](https://www.i18next.com), [React.js-Lokalisierung](https://react.i18next.com) und [moderne Lokalisierungs-Workflows](https://locize.com) gelernt.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Übersetzungs-Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

## 👍
