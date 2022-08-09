---
title: Best internationalization for Gatsby (an i18next based guide)
description: Gatsby Localization made easy with this ✅ step-by-step guide using i18next.

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
categories:
  - Post
thumbnail: gatsby-i18n/gatsby-i18next.jpg
---

![Gatsby Localization made easy with this step-by-step guide using i18next ✅](gatsby-i18next.jpg "Gatsby Localization example")

You know [Gatsby](https://www.gatsbyjs.com), right? - If not, stop reading this article and make something else.

Yes, Gatsby the an open-source framework that combines functionality from React, GraphQL and Webpack into a single tool for building static websites and apps.

> But how does internationalization (i18n) looks like in Gatsby?

There are some plugins/libraries that may help instrumenting the Gatsby code for internationalization.
In this article we will use a plugin based on the famous i18n framework [i18next](https://www.i18next.com), respectively its great extension for [React.js](https://reactjs.org) - [react-i18next](https://react.i18next.com).
<br />
The Gatsby plugin we're using is [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next) created by [Dmitriy Nevzorov](https://twitter.com/nevzorov_d).

## TOC
  * [So first of all: "Why i18next?"](#why-i18next)
  * [Let's get into it...](#start)
    - [Prerequisites](#prerequisites)
    - [Getting started](#getting-started)
    - [Language Switcher](#language-switcher)
    - [Internationalized links](#i18n-link)
    - [Interpolation and Pluralization](#interpolation-pluralization)
    - [Formatting](#formatting)
    - [Context](#context)
    - [Key extraction](#extract)
    - [For sure!](#for-sure)
    - [How does this look like?](#how-look)
    - [👀 but there's more... (InContext Editor)](#more)
  * [🎉🥳 Congratulations 🎊🎁](#congratulations)

# So first of all: "Why i18next?" <a name="why-i18next"></a>

When it comes to React localization. One of the most popular i18n framework is [i18next](https://www.i18next.com) with it's react extension [react-i18next](https://react.i18next.com), and for good reasons:

*i18next was created in late 2011. It's older than most of the libraries you will use nowadays, including your main frontend technology (react, vue, ...).*
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

Make sure you have Node.js and npm installed. It's best, if you have some experience with simple HTML, JavaScript, React.js and basic Gatsby, before jumping to [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next). This Gatsby localization example is not intended to be a Gatsby or React beginner tutorial.


## Getting started <a name="getting-started"></a>

Take your own Gatsby project or create a new one, i.e. with the [gatsby-cli](https://www.gatsbyjs.com/docs/reference/gatsby-cli/#new).

`npx gatsby-cli new`

We will create a language switcher to make the content change between different languages.

Let's install some i18next dependencies:

- [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next)
- [i18next](https://www.i18next.com)
- [react-i18next](https://react.i18next.com)

`npm install gatsby-plugin-react-i18next i18next react-i18next`

Create a `locales` directory and add a subfolder for your default/reference language (i.e. `en` for English).
<br />
There we will then add our namespace files, like:
```
|-- en
    |-- common.json
    |-- index.json
```

Let's add a `languages.js` file:
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

Import the `languages.js` file in the `gatsby-config.js` file and configure some plugins:
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

Now let's start to instrument our first internationalized text.
<br />
Since [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next) is exporting all methods and components of [react-i18next](https://react.i18next.com), we can do this:
<br />
In a page file:

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

Now also define an `locales/en/index.json` namespace file, like this:
```json
{
  "seo": "Home",
  "title": "Hi people"
}
```

And maybe also another one for German?

`locales/de/index.json`:
```json
{
  "seo": "Startseite",
  "title": "Hallo Leute"
}
```


## Language Switcher <a name="language-switcher"></a>

To be able to switch between different languages, we need a language switcher:

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

You should now see something like this:

![gatsby language switcher](app_0.jpg "locize © inweso GmbH")

By default, on first load, [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next) will fallback to the `defaultLanguage` if the browser's detected language is not included in the array of `languages`.

If you want to fallback to a different language in the `languages` array, you can set the `fallbackLanguage` option.

Now switching to `de` (German) should also work:

![gatsby language switcher](app_1.jpg "locize © inweso GmbH")

**🥳 Awesome, you've just created your first language switcher!**

## Internationalized links <a name="i18n-link"></a>

Let's create a second page...

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

A new namespace:<br />`locales/en/page-2.json`
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

...and link to that page from the first one:

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

A new translation key for `locales/en/index.json`:
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

The `Link` component exported from `gatsby-plugin-react-i18next`automatically links to the correct language.
<br />
The `Link` component is identical to Gatsby Link component except that you can provide additional language prop to create a link to a page with different language.


## Interpolation and Pluralization <a name="interpolation-pluralization"></a>

i18next goes beyond just providing the standard i18n features.
But for sure it's able to handle [plurals](https://www.i18next.com/translation-function/plurals) and [interpolation](https://www.i18next.com/translation-function/interpolation).

Let's count each time a button gets clicked:

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

...and extending the translation resources:<br />`locales/en/page-2.json`
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

Based on the count value i18next will choose the correct plural form.

i18next provides also the ability to have special translation for `{count: 0}`, so that a more natural language can be used. If the `count` is `0`, and a `_zero` entry is present, then it will be used instead of the regular language plural suffix (`_other`).

Read more about [pluralization](https://www.i18next.com/translation-function/plurals) and [interpolation](https://www.i18next.com/translation-function/interpolation) in the [official i18next documentation](https://www.i18next.com/).

![gatsby pluralization](app_2.gif "locize © inweso GmbH")

*💡 i18next is also able to handle languages with multiple plural forms, like arabic:*

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

### Why are my plural keys not working? <a name="pluralsv4"></a>

Are you seeing this warning in the development console (`debug: true`)?

> i18next::pluralResolver: Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.

With [v21](https://www.i18next.com/misc/migration-guide#v20.x.x-to-v21.0.0) i18next streamlined the suffix with the one used in the [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules).
In environments where the [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules) API  is not available (like older Android devices), you may need to [polyfill](https://github.com/eemeli/intl-pluralrules) the [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules) API.
In case it is not available it will fallback to the [i18next JSON format v3](https://www.i18next.com/misc/json-format#i-18-next-json-v3) plural handling. And if your json is already using the new suffixes, your plural keys will probably not be shown.

*tldr;*

`npm install intl-pluralrules`

```javascript
import 'intl-pluralrules'
```


## Formatting <a name="formatting"></a>

Now, let’s check out how we can use different date formats with the help of [i18next](https://www.i18next.com) and [Luxon](https://moment.github.io/luxon) to handle date and time.

`npm install luxon`

We like to have a footer displaying the current date:

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

Import luxon and define a format function, like documented in the [documentation](https://www.i18next.com/translation-function/formatting) and add the new translation key:

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

**😎 Cool, now we have a language specific date formatting!**

English:
![gatsby english](app_3.jpg "locize © inweso GmbH")

German:
![gatsby german](app_4.jpg "locize © inweso GmbH")


## Context <a name="context"></a>

What about a specific greeting message based on the current day time? i.e. morning, evening, etc.
This is possible thanks to the [context](https://www.i18next.com/translation-function/context) feature of i18next.

Let's create a `getGreetingTime` function and use the result as context information for our footer translation:

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

And add some context specific translations keys:

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

**😁 Yeah, It works!**

![gatsby translations](app_5.jpg "locize © inweso GmbH")


## Key extraction <a name="extract"></a>

Thanks to the [babel-plugin-i18next-extract](https://i18next-extract.netlify.app) you can automatically extract translations inside the `t` function and `Trans` component from your pages and save them in the namespace files.

It works like this:
<br />
First install the required dependencies:

`npm install @babel/cli @babel/plugin-transform-typescript babel-plugin-i18next-extract`

Create or update the `babel-extract.config.js` file (do NOT name it `babel.config.js`, or it will be used by gatsby):

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

Add a script to your `package.json`:

```json
"scripts": {
  "extract": "babel --config-file ./babel-extract.config.js -o tmp/chunk.js 'src/**/*.{js,jsx,ts,tsx}' && rm -rf tmp"
}
```

If you want to extract translations per page for a specific namespace, you can add a special comment at the beginning of the page:

```javascript
// i18next-extract-mark-ns-start index

import React from 'react';
// ...
```

fyi: There are also other [comment hints](https://i18next-extract.netlify.app/#/comment-hints) you can use.

Prepared all your pages? Nice, so let's try that:

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

Running `npm run extract` will now add that new `cta` key to the namespace file:

```json
{
  "cta": "Now go build something great.",
  "goToPage2": "Go to page 2",
  "seo": "Home",
  "title": "Hi people",
  "welcome": "Welcome to your new Gatsby site."
}
```

## Extra power <a name="extra-power"></a>

**This is all already great, but we can do even more!**

It would be nice, to have an overview showing which translations are missing and which files are completely translated...
<br />
And think about when having extracted new keys, they would automatically be translated?
<br />
To make this true we need a [translation management](../i18n-l10n-t9n-tms/)...


By sending the translations to some translators or translator agency you have more control and a direct contact with them. But this also means more work for you.
This is the traditional way. But be aware, sending files around creates always an overhead.

> Does a better option exist?

### For sure! <a name="for-sure"></a>

i18next helps to get the application translated, and this is great - but there is more to it.
- How do you integrate any translation services / agency?
- How do you keep track of new or removed content?
- How you handle proper versioning?
- and a lot more...

**Looking for something like this❓**

- [Easy to integrate](https://docs.locize.com/integration/instrumenting-your-code#i-18-next)
- Continuous deployment? [Continuous localization](https://locize.com/how-it-works.html#continouslocalization)!
- Manage the translation files with ease
- [Order professional translations](https://docs.locize.com/guides-tips-and-tricks/working-with-translators/localistars)
- Analytics & Statistics
- [Versioning of your translations](https://docs.locize.com/more/versioning)
- [Automatic and On-Demand Machine Translation](https://docs.locize.com/whats-inside/auto-machine-translation)
- [Riskfree: Take your data with you](https://docs.locize.com/more/general-questions/how-is-locize-different-from-the-alternatives#service-lock-in)
- [Transparent and fair pricing](https://locize.com/pricing.html)
- and a lot more...

![transform the localization process](transform_your_localization_process_small.jpg "locize © inweso GmbH")

### How does this look like? <a name="how-look"></a>

First you need to signup at [locize](https://locize.app/register) and [login](https://docs.locize.com/integration/getting-started/create-a-user-account).
Then [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize and add all required languages. And finally you can add your translations either by using the [cli](https://github.com/locize/react-tutorial#use-the-locize-cli) or by [importing the individual json files](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) or via [API](https://docs.locize.com/integration/api#update-remove-translations).

Now let's install the [locize-cli](https://github.com/locize/locize-cli):

`npm install -g locize-cli`

We'll prepare a new script that will synchronize our local changes with locize.
And also an optional second script that will just download the newest translations from locize.
Make sure you use your project-id and api-key:

```json
"scripts": {
  "syncLocales": "locize sync --project-id=5d47a999-5c34-4161-a389-bc2189507a50 --ver=latest --api-key=42ca9d58-18da-44c7-8dd3-8f59b8c35bda --path=./locales",
  "downloadLocales": "locize download --project-id=5d47a999-5c34-4161-a389-bc2189507a50 --ver=latest --clean=true --path=./locales"
}
```

Use the `npm run syncLocales` script to synchronize your local repository with what is published on locize.

Alternatively, you can also use the `npm run downloadLocales` script to always download the published locize translations to your local repository before bundling your app.


If we now add a new translation key, like this:

```javascript
<Trans i18nKey="newKey">this will be added automatically after "extract" and "syncLocales"</Trans>
```

and run `npm run export` and then `npm run syncLocales`, we get this:

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

![new key](locize_new_key.jpg "locize © inweso GmbH")

*Thanks to the optionally enabled [automatic machine translation](https://docs.locize.com/whats-inside/auto-machine-translation) option, new keys not only gets added to locize, while developing the app, but are also automatically translated into the target languages using machine translation.*

![gatsby translations](app_6.jpg "locize © inweso GmbH")


### 👀 but there's more... (InContext Editor) <a name="more"></a>

With the help of the [locize](https://github.com/locize/locize) plugin, you'll be able to use your app within the locize [InContext Editor](https://docs.locize.com/more/incontext-editor).

Want to see how this looks like?

Ok, first install the locize dependency:

`npm install locize`

Then in the code (we choose our `layout.js` file) add this:

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

And in the `gatsby-config.js` add some new react options:

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

Then go to your locize project and define your in-context editor urls, like described [here](https://docs.locize.com/different-views/incontext#setup-and-configuration).

**The result will look like this:**
![i18next incontext](in_context.gif "locize © inweso GmbH")


>Isn't this great?


*🧑‍💻 The complete code can be found [here](https://github.com/locize/locize-gatsby-example).*

If you want to learn more basics about i18next, there's also an [i18next crash course video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}

# 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next), [i18next](https://www.i18next.com), [React.js localization](https://react.i18next.com) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth to try the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So with using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

# 👍
