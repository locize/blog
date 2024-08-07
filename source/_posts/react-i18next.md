---
title: React Localization - Internationalize with i18next 
description: Integrate i18next seamlessly into your React applications. Follow this easily with this ✅ A complete step-by-step guide to react-i18next.

date: 2021-04-14
tags:
  - i18next
  - react
  - react-i18next
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
thumbnail: react-i18next/react-localization.jpg
redirect_from:
- /2021-04-14-how-to-internationalize-react-i18next
- /how-to-internationalize-react-i18next

# meta:
#   - name="description";content="Integrate i18next seamlessly into your React applications. Follow this easily with this ✅ step-by-step guide."

label: react-i18next
lang: en
---

![React Localization made easy with this step-by-step guide using i18next ✅](react-localization.jpg "React Localization example")

Overcoming the language barrier for users who use your software is an important topic.
English is no longer the universal language of the internet.
As of [March 2020](https://www.internetworldstats.com/stats7.htm), only 25.9% of internet users were English speakers.
The chances are high that your users will skip past your website if non-localized.
Therefore, without a multilingual website you might missing out on a large share of potential users.

In the JavaScript ecosystem, there are a lot of internationalization frameworks. [Here](https://medium.com/@jamuhl/i18n-frameworks-the-unfair-showdown-8d436cd6f470) you can find some details about some JavaScript internationalization frameworks.
In this article, we will be using the [i18next](https://www.i18next.com) framework to internationalize a [React.js](https://reactjs.org) app. This step-by-step guide is for you if you're looking for a way to create an internationalized React.js app (with or without Create React App).</br><div style="margin-top: -25px;">Basically, we're going to answer the following question: <h2 style="display: inline; font-size: 18px;">"How to use i18n in React?"</h2></div>

### TOC
  * [So first of all: "Why i18next?"](#why-i18next)
  * [Let's get into it...](#start)
    - [Prerequisites](#prerequisites)
    - [Getting started](#getting-started)
    - [Language Switcher](#language-switcher)
      - [How to get the current language?](#current-language)
    - [Interpolation and Pluralization](#interpolation-pluralization)
    - [Formatting](#formatting)
    - [Context](#context)
    - [Separate translations from code](#separate)
      - [Multiple namespaces](#multiple-namespaces)
    - [Better translation management](#better-translation-management)
      - [For sure!](#for-sure)
      - [How does this look like?](#how-look)
      - [save missing translations](#save-missing)
      - [👀 but there's more...](#more)
      - [📦 Let's prepare for production 🚀](#production)
  * [🎉🥳 Congratulations 🎊🎁](#congratulations)


>Streamline your i18next setup process with this step-by-step guide. Get your localization framework up and running in no time and ensure smooth language transitions for your users. Follow the instructions and avoid any setup complications for your next international project.

## So first of all: "Why i18next?" <a name="why-i18next"></a>

When it comes to React localization, one of the most popular is [i18next](https://www.i18next.com) with its react extension [react-i18next](https://react.i18next.com), and for good reasons:

*i18next was created in late 2011. It's older than most of the libraries you will use nowadays, including your main frontend technology (React, [Angular](../angular-i18next/), [Vue](../i18next-vue/), ...).*
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


## Let's get into it <small style="font-size: 0.65em;">(react-i18next)</small>... <a name="start"></a>

### Prerequisites <a name="prerequisites"></a>

Make sure you have Node.js and npm installed. It's best, if you have some experience with simple HTML, JavaScript and basic React.js, before jumping to [react-i18next](https://react.i18next.com) - the powerful **React i18n** framework. This react-i18next localization example is not intended to be a React beginner tutorial.


### Getting started <a name="getting-started"></a>

Take your own React project or create a new one, i.e. with [create-react-app](https://create-react-app.dev).

`npx create-react-app my-app`

![learn react logo](app_0.jpg "locize © inweso GmbH")

We are going to adapt the app to detect the language according to the user’s preference.
And we will create a language switcher to make the content change between different languages.

Let's install some i18next dependencies:

- [i18next](https://www.i18next.com)
- [react-i18next](https://react.i18next.com)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

`npm install i18next react-i18next i18next-browser-languagedetector`

Let's prepare an `i18n.js` file:
```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
        }
      }
    }
  });

export default i18n;
```

Let's import that file somewhere in our `index.js` file:

For React >= 18.0.0 use:

```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// import i18n (needs to be bundled ;))
import './i18n';

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

For older React versions use:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import i18n (needs to be bundled ;))
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Now let's try to move some hard coded text out to the translations.

We have used the [Trans component](https://react.i18next.com/latest/trans-component) for the first text and the [useTranslation hook](https://react.i18next.com/latest/usetranslation-hook) for the second text:

```javascript
import logo from './logo.svg';
import './App.css';
import { useTranslation, Trans } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to reload.
          </Trans>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('description.part2')}
        </a>
      </header>
    </div>
  );
}

export default App;
```
There is some more effort necessary if you wish to use High-Order-Components (HOC). Another option in this situation is to use [withTranslation HOC](https://react.i18next.com/latest/withtranslation-hoc).

The texts are now part of the translation resources:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            part2: 'Learn React'
          }
        }
      }
    }
  });

export default i18n;
```


### Language Switcher <a name="language-switcher"></a>

Now let's define a language switcher:

```javascript
import logo from './logo.svg';
import './App.css';
import { useTranslation, Trans } from 'react-i18next';

const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
};

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to reload.
          </Trans>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('description.part2')}
        </a>
      </header>
    </div>
  );
}

export default App;
```

And also add some translations for the new language:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            part2: 'Learn React'
          }
        }
      },
      de: {
        translation: {
          description: {
            part1: 'Ändere <1>src/App.js</1> und speichere um neu zu laden.',
            part2: 'Lerne React'
          }
        }
      }
    }
  });

export default i18n;
```

![react language switcher](app_1.jpg "locize © inweso GmbH")

**🥳 Awesome, you've just created your first language switcher!**

Thanks to [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) now it tries to detect the browser language and automatically use that language if you've provided the translations for it. The manually selected language in the language switcher is persisted in the localStorage, next time you visit the page, that language is used as preferred language.

#### How to get the current language? <a name="current-language"></a>

Since i18next v21 there is [`i18next.resolvedLanguage`](https://www.i18next.com/overview/api#resolvedlanguage).
It is set to the current resolved language and it can be used as primary used language, for example in a language switcher.

If your detected language for example is `en-US` and you provided translations only for `en` *(fallbackLng)* instead `i18next.resolvedLanguage` will return `en`.

##### i18next.language vs. i18next.languages vs. i18next.resolvedLanguage

```javascript
/* language */
i18next.language;
// Is set to the current detected or set language.

/* languages */
i18next.languages;
// Is set to an array of language codes that will be used to look up the translation value.
// When the language is set, this array is populated with the new language codes.
// Unless overridden, this array is populated with less-specific versions of that code for fallback purposes, followed by the list of fallback languages

// initialize with fallback languages
i18next.init({
  fallbackLng: ["es", "fr", "en-US", "dev"]
});
// change the language
i18next.changeLanguage("en-US-xx");
// new language and its more generic forms, followed by fallbacks
i18next.languages; // ["en-US-xx", "en-US", "en", "es", "fr", "dev"]
// change the language again
i18next.changeLanguage("de-DE");
// previous language is not retained
i18next.languages; // ["de-DE", "de", "es", "fr", "en-US", "dev"]

/* resolvedLanguage */
i18next.resolvedLanguage;
// Is set to the current resolved language.
// It can be used as primary used language,
// for example in a language switcher.
```

### Interpolation and Pluralization <a name="interpolation-pluralization"></a>

i18next goes beyond just providing the standard i18n features.
But for sure it's able to handle [plurals](https://www.i18next.com/translation-function/plurals) and [interpolation](https://www.i18next.com/translation-function/interpolation).

Let's count each time the language gets changed:

```javascript
import logo from './logo.svg';
import './App.css';
import { useTranslation, Trans } from 'react-i18next';
import { useState } from 'react';

const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
};

function App() {
  const { t, i18n } = useTranslation();
  const [count, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => {
              i18n.changeLanguage(lng);
              setCounter(count + 1);
            }}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          <i>{t('counter', { count })}</i>
        </p>
        <p>
          <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to reload.
          </Trans>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('description.part2')}
        </a>
      </header>
    </div>
  );
}

export default App;
```

...and extending the translation resources:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            part2: 'Learn React'
          },
          counter_one: 'Changed language just once',
          counter_other: 'Changed language already {{count}} times'
        }
      },
      de: {
        translation: {
          description: {
            part1: 'Ändere <1>src/App.js</1> und speichere um neu zu laden.',
            part2: 'Lerne React'
          },
          counter_one: 'Die Sprache wurde erst ein mal gewechselt',
          counter_other: 'Die Sprache wurde {{count}} mal gewechselt'
        }
      }
    }
  });

export default i18n;
```

Based on the count value i18next will choose the correct plural form.
Read more about [pluralization](https://www.i18next.com/translation-function/plurals) and [interpolation](https://www.i18next.com/translation-function/interpolation) in the [official i18next documentation](https://www.i18next.com/).

![react pluralization](app_2.jpg "locize © inweso GmbH")

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

#### Why are my plural keys not working? <a name="pluralsv4"></a>

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


### Formatting <a name="formatting"></a>

Now, let’s check out how we can use different date formats with the help of [i18next](https://www.i18next.com) and [Luxon](https://moment.github.io/luxon) to handle date and time.

`npm install luxon`

We like to have a footer displaying the current date:

```javascript
import './Footer.css';

const Footer = ({ t }) => (
  <div className="Footer">
    <div>{t('footer.date', { date: new Date() })}</div>
  </div>
);

export default Footer;

// imported in our App.js and used like this
// <Footer t={t} />
```

import luxon and define a format function, like documented in the [documentation](https://www.i18next.com/translation-function/formatting) and add the new translation key:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DateTime } from 'luxon';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng) => { // legacy usage
      //   if (value instanceof Date) {
      //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      //   }
      //   return value;
      // }
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            part2: 'Learn React'
          },
          counter_one: 'Changed language just once',
          counter_other: 'Changed language already {{count}} times',
          footer: {
            date: 'Today is {{date, DATE_HUGE}}'
          }
        }
      },
      de: {
        translation: {
          description: {
            part1: 'Ändere <1>src/App.js</1> und speichere um neu zu laden.',
            part2: 'Lerne React'
          },
          counter_one: 'Die Sprache wurde erst ein mal gewechselt',
          counter_other: 'Die Sprache wurde {{count}} mal gewechselt',
          footer: {
            date: 'Heute ist {{date, DATE_HUGE}}'
          }
        }
      }
    }
  });

// new usage
i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

**😎 Cool, now we have a language specific date formatting!**

English:
![react english](app_3.jpg "locize © inweso GmbH")

German:
![react german](app_4.jpg "locize © inweso GmbH")


### Context <a name="context"></a>

What about a specific greeting message based on the current day time? i.e. morning, evening, etc.
This is possible thanks to the [context](https://www.i18next.com/translation-function/context) feature of i18next.

Let's create a `getGreetingTime` function and use the result as context information for our footer translation:

```javascript
import { DateTime } from 'luxon';
import './Footer.css';

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

const Footer = ({ t }) => (
  <div className="Footer">
    <div>{t('footer.date', { date: new Date(), context: getGreetingTime() })}</div>
  </div>
);

export default Footer;
```

And add some context specific translations keys:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { DateTime } from 'luxon';

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng) => { // legacy usage
      //   if (value instanceof Date) {
      //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      //   }
      //   return value;
      // }
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            part2: 'Learn React'
          },
          counter_one: 'Changed language just once',
          counter_other: 'Changed language already {{count}} times',
          footer: {
            date: 'Today is {{date, DATE_HUGE}}',
            date_morning: 'Good morning! Today is {{date, DATE_HUGE}} | Have a nice day!',
            date_afternoon: 'Good afternoon! It\'s {{date, DATE_HUGE}}',
            date_evening: 'Good evening! Today was the {{date, DATE_HUGE}}'
          }
        }
      },
      de: {
        translation: {
          description: {
            part1: 'Ändere <1>src/App.js</1> und speichere um neu zu laden.',
            part2: 'Lerne React'
          },
          counter_one: 'Die Sprache wurde erst ein mal gewechselt',
          counter_other: 'Die Sprache wurde {{count}} mal gewechselt',
          footer: {
            date: 'Heute ist {{date, DATE_HUGE}}',
            date_morning: 'Guten Morgen! Heute ist {{date, DATE_HUGE}} | Wünsche einen schönen Tag!',
            date_afternoon: 'Guten Tag! Es ist {{date, DATE_HUGE}}',
            date_evening: 'Guten Abend! Heute war {{date, DATE_HUGE}}'
          }
        }
      }
    }
  });

// new usage
i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

**😁 Yeah, It works!**

![react translations](app_5.jpg "locize © inweso GmbH")


### Separate translations from code <a name="separate"></a>

Having the translations in our `i18n.js` file works, but is not that suitable to work with, for translators.
Let's separate the translations from the code and pleace them in dedicated json files.

Because this is a web application, [i18next-http-backend](https://github.com/i18next/i18next-http-backend) will help us to do so.

`npm install i18next-http-backend`

Move the translations to the public folder:

![public locales](public_locales.jpg "locize © inweso GmbH")

Adapt the `i18n.js` file to use the `i18next-http-backend`:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { DateTime } from 'luxon';

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng) => { // legacy usage
      //   if (value instanceof Date) {
      //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      //   }
      //   return value;
      // }
    }
  });

// new usage
i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

Now the translations are loaded asynchronously, so make sure you wrap your app with a [Suspense](https://reactjs.org/docs/react-api.html#reactsuspense) component to prevent this error: `Uncaught Error: App suspended while rendering, but no fallback UI was specified.`

```javascript
import { Suspense } from 'react';

function App() {
  // your app's code...
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  );
}
```

Now your app looks still the same, but your translations are separated.
If you want to support a new language, you just create a new folder and a new translation json file.
This gives you the possibility to send the translations to some translators.
Or if you're working with a <a href="../tms/" title="translation management systems">translation management system</a> you can just [synchronize the files with a cli](https://github.com/locize/react-tutorial#use-the-locize-cli).


*🧑‍💻 The code of this first part can be found [here](https://github.com/locize/react-i18next-example-app/tree/i18next).*

#### Multiple namespaces <a name="multiple-namespaces"></a>

*💡 btw: you can also have [multiple translation files](https://react.i18next.com/guides/multiple-translation-files) thanks to the [namespaces](https://www.i18next.com/principles/namespaces) feature of i18next*

One of the advantages of react-i18next is based on i18next, it supports the separation of translations into multiple files - which are called namespaces in i18next.

In order to use multiple namespaces/translation files, you need to specify it when calling [`useTranslation`](https://react.i18next.com/latest/usetranslation-hook):
```javascript
const { t } = useTranslation(['translation', 'common']);
// ...
// t('look.deep', { ns: 'common' })
```

[`withTranslation`](https://react.i18next.com/latest/withtranslation-hoc):
```javascript
withTranslation(['translation', 'common'])(MyComponent);
// ...
// t('look.deep', { ns: 'common' })
```

or [`Translation`](https://react.i18next.com/latest/translation-render-prop):
```javascript
<Translation ns={['translation', 'common']}>
{
  (t) => <p>{t('look.deep', { ns: 'common' })}</p>
}
</Translation>
```

### Better translation management <a name="better-translation-management"></a>

By sending the translations to some translators or translator agency you have more control and a direct contact with them. But this also means more work for you.
This is a traditional way. But be aware sending files around creates always an overhead.

> Does a better option exist?

#### For sure! <a name="for-sure"></a>

[i18next](https://www.i18next.com) helps to get the application translated, and this is great - but there is more to it.
- How do you integrate any translation services / agency?
- How do you keep track of new or removed content?
- How do you handle proper versioning?
- How do you deploy translation changes without deploying your complete application?
- and a lot more...

**Looking for something like this❓**

- [Easy to integrate](https://docs.locize.com/integration/instrumenting-your-code#i-18-next)
- Continuous deployment? [Continuous localization](https://locize.com/how-it-works.html#continouslocalization)!
- Manage the translation files with ease
- [Order professional translations](https://docs.locize.com/guides-tips-and-tricks/working-with-translators)
- Analytics & Statistics
- [Profit from our content delivery network (CDN)](https://docs.locize.com/whats-inside/cdn-content-delivery-network)
- [Versioning of your translations](https://docs.locize.com/more/versioning)
- [Automatic and On-Demand Machine Translation](https://docs.locize.com/whats-inside/auto-machine-translation)
- [Riskfree: Take your data with you](https://docs.locize.com/more/general-questions/how-is-locize-different-from-the-alternatives#service-lock-in)
- [Transparent and fair pricing](https://locize.com/pricing.html)
- and a lot more...

![transform the localization process](transform_your_localization_process_small.jpg "locize © inweso GmbH")

#### How does this look like? <a name="how-look"></a>

First you need to signup at [locize](https://locize.app/register) and [login](https://docs.locize.com/integration/getting-started/create-a-user-account).
Then [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize and add your translations. You can add your translations either by using the [cli](https://github.com/locize/react-tutorial#use-the-locize-cli) or by [importing the individual json files](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) or via [API](https://docs.locize.com/integration/api#update-remove-translations).

Done so, we're going to replace [i18next-http-backend](https://github.com/i18next/i18next-http-backend) with [i18next-locize-backend](https://github.com/locize/i18next-locize-backend).

`npm install i18next-locize-backend`

After having imported the translations to locize, delete the locales folder:

![public locales removed](public_locales_removed.jpg "locize © inweso GmbH")

Adapt the `i18n.js` file to use the `i18next-locize-backend` and make sure you copy the project-id and api-key from within your locize project:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';
import { DateTime } from 'luxon';

const locizeOptions = {
  projectId: '0bbc223a-9aba-4a90-ab93-ab9d7bf7f780',
  apiKey: 'aaad4141-54ba-4625-ae37-657538fe29e7', // YOU should not expose your apps API key to production!!!
  referenceLng: 'en',
};

i18n
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
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng) => { // legacy usage
      //   if (value instanceof Date) {
      //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      //   }
      //   return value;
      // }
    },
    backend: locizeOptions
  });

// new usage
i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

[i18next-locize-backend](https://github.com/locize/i18next-locize-backend) offers a functionality to retrieve the available languages directly from locize, let's use it:

```javascript
import logo from './logo.svg';
import './App.css';
import { useTranslation, Trans } from 'react-i18next';
import { useState, Suspense, useEffect } from 'react';
import Footer from './Footer'

function App() {
  const { t, i18n } = useTranslation();
  const [count, setCounter] = useState(0);

  const [lngs, setLngs] = useState({ en: { nativeName: 'English' }});

  useEffect(() => {
    i18n.services.backendConnector.backend.getLanguages((err, ret) => {
      if (err) return // TODO: handle err...
      setLngs(ret);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => {
              i18n.changeLanguage(lng);
              setCounter(count + 1);
            }}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          <i>{t('counter', { count })}</i>
        </p>
        <p>
          <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to reload.
          </Trans>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('description.part2')}
        </a>
      </header>
      <Footer t={t} />
    </div>
  );
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  );
}
```

#### save missing translations <a name="save-missing"></a>

Thanks to the use of the [saveMissing functionality](https://www.i18next.com/overview/configuration-options#missing-keys), new keys gets added to locize automatically, while developing the app.

Just pass `saveMissing: true` in the i18next options:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';
import { DateTime } from 'luxon';

const locizeOptions = {
  projectId: '0bbc223a-9aba-4a90-ab93-ab9d7bf7f780',
  apiKey: 'aaad4141-54ba-4625-ae37-657538fe29e7', // YOU should not expose your apps API key to production!!!
  referenceLng: 'en',
};

i18n
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
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng) => { // legacy usage
      //   if (value instanceof Date) {
      //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      //   }
      //   return value;
      // }
    },
    backend: locizeOptions,
    saveMissing: true
  });

// new usage
i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

Each time you'll use a new key, it will be sent to locize, i.e.:

```javascript
<div>{t('new.key', 'this will be added automatically')}</div>
```

will result in locize like this:

![missing key](missing_key.jpg "locize © inweso GmbH")


#### 👀 but there's more... <a name="more"></a>

Thanks to the [locize-lastused](https://github.com/locize/locize-lastused) plugin, you'll be able to [find and filter in locize which keys are used or not used anymore](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

With the help of the [locize](https://github.com/locize/locize) plugin, you'll be able to use your app within the locize [InContext Editor](https://docs.locize.com/more/incontext-editor).

Lastly, with the help of the [auto-machinetranslation workflow](https://docs.locize.com/whats-inside/auto-machine-translation) and the use of the [saveMissing functionality](https://www.i18next.com/overview/configuration-options#missing-keys), new keys not only gets added to locize automatically, while developing the app, but are also automatically translated into the target languages using machine translation.

*Check out this [video](https://youtu.be/VfxBpSXarlU) to see how the automatic machine translation workflow looks like!*

{% youtube VfxBpSXarlU %}

`npm install locize-lastused locize`

use them in `i18n.js`:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';
import LastUsed from 'locize-lastused';
import { locizePlugin } from 'locize';
import { DateTime } from 'luxon';

const locizeOptions = {
  projectId: '0bbc223a-9aba-4a90-ab93-ab9d7bf7f780',
  apiKey: 'aaad4141-54ba-4625-ae37-657538fe29e7', // YOU should not expose your apps API key to production!!!
  referenceLng: 'en',
};

i18n
  // locize-lastused
  // sets a timestamp of last access on every translation segment on locize
  // -> safely remove the ones not being touched for weeks/months
  // https://github.com/locize/locize-lastused
  .use(LastUsed)
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
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng) => { // legacy usage
      //   if (value instanceof Date) {
      //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      //   }
      //   return value;
      // }
    },
    backend: locizeOptions,
    locizeLastUsed: locizeOptions,
    saveMissing: true
  });

// new usage
i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

[Automatic machine translation](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key auto](missing_key_auto_mt.jpg "locize © inweso GmbH")

[Last used translations filter]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](last_used.jpg "locize © inweso GmbH")

[InContext Editor](https://docs.locize.com/more/incontext-editor):

![i18next incontext](in_context.jpg "locize © inweso GmbH")


#### 📦 Let's prepare for production 🚀 <a name="production"></a>

Now, we prepare the app for [going to production](https://docs.locize.com/guides-tips-and-tricks/going-production).

First in locize, create a dedicated version for production. Do not enable auto publish for that version but publish manually or via [API](https://docs.locize.com/integration/api#publish-version) or via [CLI](https://github.com/locize/locize-cli#publish-version).
Lastly, [enable Cache-Control max-age​](https://docs.locize.com/more/caching) for that production version.

Let's making use of the [environment feature of react-scripts](https://create-react-app.dev/docs/adding-custom-environment-variables/).

Lets' create a default environment file and one for development and one for production:

`.env`:
```
SKIP_PREFLIGHT_CHECK=true

REACT_APP_VERSION=$npm_package_version

## locize
REACT_APP_LOCIZE_PROJECTID=0bbc223a-9aba-4a90-ab93-ab9d7bf7f780
REACT_APP_LOCIZE_REFLNG=en
```

`.env.development`:
```
REACT_APP_LOCIZE_VERSION=latest
REACT_APP_LOCIZE_APIKEY=aaad4141-54ba-4625-ae37-657538fe29e7
```

`.env.production`:
```
REACT_APP_LOCIZE_VERSION=production
```

Now let's adapt the `i18n.js` file:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';
import LastUsed from 'locize-lastused';
import { locizePlugin } from 'locize';
import { DateTime } from 'luxon';

const isProduction = process.env.NODE_ENV === 'production';

const locizeOptions = {
  projectId: process.env.REACT_APP_LOCIZE_PROJECTID,
  apiKey: process.env.REACT_APP_LOCIZE_APIKEY, // YOU should not expose your apps API key to production!!!
  referenceLng: process.env.REACT_APP_LOCIZE_REFLNG,
  version: process.env.REACT_APP_LOCIZE_VERSION
};

if (!isProduction) {
  // locize-lastused
  // sets a timestamp of last access on every translation segment on locize
  // -> safely remove the ones not being touched for weeks/months
  // https://github.com/locize/locize-lastused
  i18n.use(LastUsed);
}

i18n
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
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng) => { // legacy usage
      //   if (value instanceof Date) {
      //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      //   }
      //   return value;
      // }
    },
    backend: locizeOptions,
    locizeLastUsed: locizeOptions,
    saveMissing: !isProduction // you should not use saveMissing in production
  });

// new usage
i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

Now, during development, you'll continue to save missing keys and to make use of lastused feature. => `npm run start`

And in production environment, saveMissing and lastused are disabled, and also the api-key is not exposed. => `npm run build && npm run serve`


[Caching](https://docs.locize.com/more/caching):

![i18next caching](caching.jpg "locize © inweso GmbH")

[Merging versions](https://docs.locize.com/more/versioning#merging-versions):

![overwrite version](overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 The complete code for this React example can be found [here](https://github.com/locize/react-i18next-example-app). And a TypeScript version [here](https://github.com/locize/react-i18next-example-app-ts).*

*Check also the [code integration part](https://www.youtube.com/watch?v=TFV_vhJs5DY&t=294s) in this [YouTube video](https://www.youtube.com/watch?v=TFV_vhJs5DY).*

There's also an [i18next crash course video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}

There is also a [Spanish translation of this blog post](https://www.ibidem-translations.com/edu/translate-react-i18next-app/).

## 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about [i18next](https://www.i18next.com), [React.js localization](https://react.i18next.com) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth trying the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So by using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

## 👍

<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Why i18next?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sustainability: i18next was created in late 2011. It's older than most of the libraries you will use nowadays, including your main frontend tech (React, Angular, Vue, ...). Maturity: Based on how long i18next already is available open source, there is no real i18n case that could not be solved with i18next. Extensibility: i18next can be used in any javascript (and a few non-javascript - .net, elm, iOS, android, ruby, ...) environment, with any UI framework, with any i18n format, ... the possibilities are endless. Richness: There is a plenty of features and possibilities you'll get with i18next compared to other regular i18n frameworks."
      }
    },{
      "@type": "Question",
      "name": "How does i18next work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "image": "https://locize.com/img/i18next_how_it_works.png",
        "text": "At first, i18next seems to be a simple key/translation dictionary, but in reality it is an elaborated and very extensible i18n framework with a lot of power. It offers translations to be provided from different sources, a language detection, plural form resolutions, caching, post processing, alternative i18n formats and more. You see it does not only offer the standard i18n features, like interpolation, formatting, etc. But the best thing about it is certainly the limitless ecosystem around i18next. We don't know of any other i18n framework with such a large community. That's why we like i18next that much!"
      }
    },{
      "@type": "Question",
      "name": "What is i18next and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "image": "https://locize.com/img/i18next_how_it_works.png",
        "text": "i18next is an internationalization-framework written in and for JavaScript. But it's much more than that. i18next goes beyond just providing the standard i18n features such as (plurals, context, interpolation, format). It provides you with a complete solution to localize your product from web to mobile and desktop. At first, i18next seems to be a simple key/translation dictionary, but in reality it is an elaborated and very extensible i18n framework with a lot of power. It offers translations to be provided from different sources, a language detection, plural form resolutions, caching, post processing, alternative i18n formats and more. You see it does not only offer the standard i18n features, like interpolation, formatting, etc. But the best thing about it is certainly the limitless ecosystem around i18next. We don't know of any other i18n framework with such a large community. That's why we like i18next that much!"
      }
    },{
      "@type": "Question",
      "name": "What is i18next?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "i18next is an internationalization-framework written in and for JavaScript. But it's much more than that. i18next goes beyond just providing the standard i18n features such as (plurals, context, interpolation, format). It provides you with a complete solution to localize your product from web to mobile and desktop."
      }
    },{
      "@type": "Question",
      "name": "What are the benefits of using i18next over other internationalization libraries?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lightweight and flexible: i18next is a small library that doesn't require a lot of setup and can be easily integrated with other libraries and frameworks. Support for multiple languages: i18next supports a wide range of languages and provides a simple way to switch between them on the fly. Easy to use API: i18next provides a simple and intuitive API for translating and formatting strings, dates, and numbers. Pluralization and gender handling: i18next provides built-in support for handling pluralization and gender in different languages. Good performance: i18next is designed for performance and provides caching mechanisms to minimize the number of lookups. Active community: i18next has a large and active community of developers who contribute to the library and provide support for new features and bug fixes."
      }
    },{
      "@type": "Question",
      "name": "Can i18next be integrated with popular frontend frameworks like React, Vue, and Angular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, i18next can be integrated with popular frontend frameworks such as React, Vue, and Angular. There are official packages for each framework and community-supported packages available for integration."
      }
    },{
      "@type": "Question",
      "name": "Can i18next be used for server-side rendering and how does it impact performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, i18next can be used for server-side rendering. Using i18next on the server-side can improve the performance of your website by allowing you to pre-render the internationalized content, which can then be served to the user's browser."
      }
    }]
  }
</script>
