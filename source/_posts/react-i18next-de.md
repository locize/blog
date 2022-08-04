---
title: React Lokalisierung – Internationalisieren Sie mit i18next
description: React Lokalisierung leicht gemacht mit dieser ✅ Schritt-für-Schritt-Anleitung mit i18next.

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
categories:
  - Post
thumbnail: react-i18next/react-localization.jpg

redirect_from:
- /wie-internationalisiert-man-mit-react-i18next

label: react-i18next
lang: de
hidden: true
---

![React Lokalisierung leicht gemacht mit dieser Schritt-für-Schritt-Anleitung mit i18next ✅](../react-i18next/react-localization.jpg "React-Lokalisierungsbeispiel")

Die Überwindung der Sprachbarriere für Anwender Ihrer Software ist ein wichtiges Thema.
Englisch ist nicht mehr die universelle Sprache des Internets.
Ab [März 2020](https://www.internetworldstats.com/stats7.htm) waren nur 25,9 % der Internetnutzer englischsprachig.
Die Wahrscheinlichkeit ist hoch, dass Ihre Benutzer an Ihrer Website vorbeispringen, wenn sie nicht lokalisiert ist.
Ohne eine mehrsprachige Website könnten Sie daher einen grossen Teil potenzieller Benutzer verpassen.

Im JavaScript-Ökosystem gibt es viele Internationalisierungs-Frameworks. [Hier](https://medium.com/@jamuhl/i18n-frameworks-the-unfair-showdown-8d436cd6f470) finden Sie einige Details zu einigen JavaScript-Internationalisierungs-Frameworks.
In diesem Artikel verwenden wir das [i18next](https://www.i18next.com)-Framework, um eine [React.js](https://reactjs.org)-App zu internationalisieren. Diese Schritt-für-Schritt-Anleitung ist für Sie, wenn Sie nach einer Möglichkeit suchen, eine internationalisierte React.js-App zu erstellen (mit oder ohne Create React App).

## Inhaltsverzeichnis
  * [Also erstmal: "Warum i18next?"](#why-i18next)
  * [Fangen wir an...](#start)
    - [Voraussetzungen](#prerequisites)
    - [Einstieg](#getting-started)
    - [Sprachumschalter](#language-switcher)
      - [Wie bekomme ich die aktuelle Sprache?](#current-language)
    - [Interpolation und Pluralisierung](#interpolation-pluralization)
    - [Formatierung](#formatting)
    - [Kontext](#context)
    - [Übersetzungen vom Code trennen](#separate)
      - [Mehrere Namespaces](#multiple-namespaces)
    - [Besseres Übersetzungsmanagement](#better-translation-management)
      - [Auf jeden Fall!](#for-sure)
      - [Wie sieht das aus?](#how-look)
      - [fehlende Übersetzungen speichern](#save-missing)
      - [👀 aber es gibt noch mehr...](#more)
      - [📦 Bereiten wir uns auf die Produktion vor 🚀](#production)
      - [🎉🥳 Herzliche Glückwünsche 🎊🎁](#congratulations)

# Also erstmal: "Warum i18next?" <a name="why-i18next"></a>

Wenn es um React-Lokalisierung geht. Eines der beliebtesten ist [i18next](https://www.i18next.com) mit seiner React-Erweiterung [react-i18next](https://react.i18next.com), und das aus guten Gründen:

*i18next wurde Ende 2011 erstellt. Es ist älter als die meisten Bibliotheken, die Sie heutzutage verwenden, einschliesslich Ihrer wichtigsten Frontend-Technologie (react, vue, ...).*

**➡️ nachhaltig**


*Basierend darauf, wie lange i18next bereits Open Source verfügbar ist, gibt es keinen echten i18n-Fall, der nicht mit i18next gelöst werden könnte.*

**➡️ reif**


*i18next kann in jeder Umgebung mit Javascript (und einigen Nicht-Javascript - .net, elm, iOS, Android, Ruby, ...) verwendet werden, mit jedem UI-Framework, mit jedem i18n-Format, ... [die Möglichkeiten sind endlos](https://www.i18next.com/overview/supported-frameworks).*

**➡️ erweiterbar**


*Es gibt viele Funktionen und Möglichkeiten, die Sie mit i18next im Vergleich zu anderen regulären 18n-Frameworks erhalten.*

**➡️ reich**


[Hier](https://www.i18next.com/overview/comparison-to-others) finden Sie weitere Informationen darüber, warum i18next so besonders ist und [wie es funktioniert](https://locize.com/i18next.html#how-does-i18next-work).

# Fangen wir an... <a name="start"></a>

## Voraussetzungen <a name="prerequisites"></a>

Stellen Sie sicher, dass Sie Node.js und npm installiert haben. Es ist am besten, wenn Sie etwas Erfahrung mit einfachem HTML, JavaScript und einfachem React.js haben, bevor Sie zu [react-i18next](https://react.i18next.com) springen. Dieses React-Lokalisierungsbeispiel ist nicht als React-Anfänger-Tutorial gedacht.

## Einstieg <a name="getting-started"></a>

Nehmen Sie Ihr eigenes React-Projekt oder erstellen Sie ein neues, z.B. mit [create-react-app](https://create-react-app.dev).

`npx create-react-app my-app`

![react logo lernen](../react-i18next/app_0.jpg "locize © inweso GmbH")

Wir werden die App anpassen, um die Sprache gemäss den Vorlieben des Benutzers zu erkennen.
Und wir werden einen Sprachumschalter erstellen, um den Inhalt zwischen verschiedenen Sprachen zu ändern.

Lassen Sie uns einige i18next-Abhängigkeiten installieren:

- [i18next](https://www.i18next.com)
- [react-i18next](https://react.i18next.com)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

`npm install i18next react-i18next i18next-browser-languagedetector`

Lassen Sie uns eine `i18n.js`-Datei vorbereiten:
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

Lassen Sie uns diese Datei irgendwo in unsere `index.js`-Datei importieren:

Verwenden Sie für React >= 18.0.0:

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

Verwenden Sie für ältere React-Versionen:

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

Lassen Sie uns nun versuchen, den hartcodierten Text in die Übersetzungen zu verschieben.

Wir haben die [Trans-Komponente](https://react.i18next.com/latest/trans-component) für den ersten Text und den [useTranslation Hook](https://react.i18next.com/latest/usetranslation-Hook) für den zweiten Text:

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
Etwas mehr Aufwand ist nötig, wenn man High-Order-Components (HOC) verwenden möchte. Eine weitere Option in dieser Situation ist die Verwendung von [withTranslation HOC](https://react.i18next.com/latest/withtranslation-hoc).

Die Texte sind jetzt Teil der Übersetzungsressourcen:

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


## Sprachumschalter <a name="language-switcher"></a>

Lassen Sie uns nun einen Sprachumschalter definieren:

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

Und fügen Sie auch einige Übersetzungen für die neue Sprache hinzu:

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

![react Sprachumschalter](../react-i18next/app_1.jpg "locize © inweso GmbH")

**🥳 Toll, Sie haben gerade Ihren ersten Sprachumschalter erstellt!**

Dank [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector) versucht es jetzt, die Browsersprache zu erkennen und diese Sprache automatisch zu verwenden, wenn Sie die Übersetzungen dafür bereitgestellt haben. Die manuell ausgewählte Sprache im Sprachumschalter wird im localStorage beibehalten, beim nächsten Besuch der Seite wird diese Sprache als bevorzugte Sprache verwendet.

### Wie erhalte ich die aktuelle Sprache? <a name="aktuelle-sprache"></a>

Seit i18next v21 gibt es [`i18next.resolvedLanguage`](https://www.i18next.com/overview/api#resolvedlanguage).
Es ist auf die aktuell aufgelöste Sprache eingestellt und kann als primär verwendete Sprache verwendet werden, beispielsweise in einem Sprachumschalter.

Wenn Ihre erkannte Sprache zum Beispiel „en-US“ ist und Sie Übersetzungen nur für „en“ bereitgestellt haben, wird stattdessen „i18next.resolvedLanguage“ „en“ zurückgeben.

#### i18next.language vs. i18next.languages vs. i18next.resolvedLanguage

```javascript
/* language */
i18next.language;
// Wird auf die aktuell erkannte oder eingestellte Sprache gesetzt.

/* languages */
i18next.languages;
// Ist auf ein Array von Sprachcodes gesetzt, die verwendet werden, um den Übersetzungswert zu suchen.
// Wenn die Sprache eingestellt ist, wird dieses Array mit den neuen Sprachcodes gefüllt.
// Sofern nicht überschrieben, wird dieses Array mit weniger spezifischen Versionen dieses Codes für Fallback-Zwecke gefüllt, gefolgt von der Liste der Fallback-Sprachen

// mit Fallback-Sprachen initialisieren
i18next.init({
  fallbackLng: ["es", "fr", "en-US", "dev"]
});
// ändere die Sprache
i18next.changeLanguage("en-US-xx");
// neue Sprache und ihre allgemeineren Formen, gefolgt von Fallbacks
i18next.languages; // ["en-US-xx", "en-US", "en", "es", "fr", "dev"]
// Sprache erneut ändern
i18next.changeLanguage("de-DE");
// vorherige Sprache wird nicht beibehalten
i18next.languages; // ["de-DE", "de", "es", "fr", "en-US", "dev"]

/* resolvedLanguage */
i18next.resolvedLanguage;
// Wird auf die aktuell aufgelöste Sprache gesetzt.
// Es kann als primär verwendete Sprache verwendet werden,
// zum Beispiel in einem Sprachumschalter.
```

## Interpolation und Pluralisierung <a name="interpolation-pluralization"></a>

i18next geht über die Bereitstellung der standardmässigen i18n-Funktionen hinaus.
Aber sicher ist es in der Lage, [Plurale](https://www.i18next.com/translation-function/plurals) und [Interpolation](https://www.i18next.com/translation-function/interpolation) zu verarbeiten.

Zählen wir jedes Mal, wenn die Sprache geändert wird:

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

...und Erweiterung der Übersetzungsressourcen:

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

Basierend auf dem Zählwert wählt i18next die korrekte Pluralform aus.
Lesen Sie mehr über [Pluralisierung](https://www.i18next.com/translation-function/plurals) und [Interpolation](https://www.i18next.com/translation-function/interpolation) in der [offiziellen i18next-Dokumentation ](https://www.i18next.com/).

![react Pluralisierung](../react-i18next/app_2.jpg "locize © inweso GmbH")

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

### Warum funktionieren meine Pluraltasten nicht? <a name="pluralsv4"></a>

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


## Formatierung <a name="formatting"></a>

Sehen wir uns nun an, wie wir verschiedene Datumsformate mit Hilfe von [i18next](https://www.i18next.com) und [Luxon](https://moment.github.io/luxon) verwenden können, um das Datum zu verarbeiten und Zeit.

`npm install luxon`

Wir möchten eine Fusszeile haben, die das aktuelle Datum anzeigt:

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

Importieren Sie Luxon und definieren Sie eine Formatfunktion, wie in der [Dokumentation](https://www.i18next.com/translation-function/formatting) dokumentiert, und fügen Sie den neuen Übersetzungsschlüssel hinzu:

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

**😎 Cool, jetzt haben wir eine sprachspezifische Datumsformatierung!**

Englisch:
![react englisch](../react-i18next/app_3.jpg "locize © inweso GmbH")

Deutsch:
![react detsch](../react-i18next/app_4.jpg "locize © inweso GmbH")


## Kontext <a name="context"></a>

Was ist mit einer bestimmten Begrüssungsnachricht basierend auf der aktuellen Tageszeit? also morgens, abends usw.
Dies ist dank der Funktion [context](https://www.i18next.com/translation-function/context) von i18next möglich.

Lassen Sie uns eine getGreetingTime-Funktion erstellen und das Ergebnis als Kontextinformationen für unsere Fusszeilenübersetzung verwenden:

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

Und fügen Sie einige kontextspezifische Übersetzungsschlüssel hinzu:

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

**😁 Ja, es funktioniert!**

![react Übersetzungen](../react-i18next/app_5.jpg "locize © inweso GmbH")


## Übersetzungen vom Code trennen <a name="separate"></a>

Die Übersetzungen in unserer Datei `i18n.js` zu haben, funktioniert, ist aber für Übersetzer nicht so geeignet, damit zu arbeiten.
Lassen Sie uns die Übersetzungen vom Code trennen und sie in dedizierte JSON-Dateien einfügen.

Da es sich um eine Webanwendung handelt, hilft uns [i18next-http-backend](https://github.com/i18next/i18next-http-backend) dabei.

`npm install i18next-http-backend`

Verschieben Sie die Übersetzungen in den öffentlichen Ordner:

![öffentliche Übersetzungen](../react-i18next/public_locales.jpg "locize © inweso GmbH")

Passen Sie die Datei `i18n.js` an, um das `i18next-http-backend` zu verwenden:

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

Jetzt werden die Übersetzungen asynchron geladen, stellen Sie also sicher, dass Sie Ihre App mit einer [Suspense](https://reactjs.org/docs/react-api.html#reactsuspense)-Komponente umschliessen, um diesen Fehler zu verhindern: `Uncaught Error: App suspended while rendering, but no fallback UI was specified.`

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

Jetzt sieht Ihre App immer noch gleich aus, aber Ihre Übersetzungen sind getrennt.
Wenn Sie eine neue Sprache unterstützen möchten, erstellen Sie einfach einen neuen Ordner und eine neue JSON-Übersetzungsdatei.
Dies gibt Ihnen die Möglichkeit, die Übersetzungen an einige Übersetzer zu senden.
Oder wenn Sie mit einem Übersetzungsmanagementsystem arbeiten, können Sie einfach [die Dateien mit einem CLI synchronisieren](https://github.com/locize/react-tutorial#use-the-locize-cli).


*🧑‍💻 Den Code dieses ersten Teils finden Sie [hier](https://github.com/locize/react-i18next-example-app/tree/i18next).*

### Mehrere Namespaces <a name="multiple-namespaces"></a>

*💡 Übrigens: Dank der [Namespaces](https://www.i18next.com/principles/namespaces) Funktionalität von i18next, können Sie auch [mehrere Dateien](https://react.i18next.com/guides/multiple-translation-files) haben.*

Einer der Vorteile von react-i18next basiert auf i18next, es unterstützt die Trennung von Übersetzungen in mehrere Dateien - die in i18next "Namespaces" genannt werden.

Um mehrere Namespaces/Übersetzungsdateien zu verwenden, müssen Sie dies beim Aufruf von [`useTranslation`](https://react.i18next.com/latest/usetranslation-hook) angeben:
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

oder [`Translation`](https://react.i18next.com/latest/translation-render-prop):
```javascript
<Translation ns={['translation', 'common']}>
{
  (t) => <p>{t('look.deep', { ns: 'common' })}</p>
}
</Translation>
```

## Besseres Übersetzungsmanagement <a name="better-translation-management"></a>

Indem Sie die Übersetzungen an einige Übersetzer oder Übersetzungsagenturen senden, haben Sie mehr Kontrolle und einen direkten Kontakt mit ihnen. Das bedeutet aber auch mehr Arbeit für Sie.
Dies ist ein traditioneller Weg. Beachten Sie jedoch, dass das Versenden von Dateien immer einen Overhead verursacht.

> Gibt es eine bessere Option?

### Auf jeden Fall! <a name="sicher"></a>

i18next hilft dabei, die Anwendung zu übersetzen, und das ist grossartig – aber es steckt noch mehr dahinter.
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

![transformiere den Lokalisierungsprozess](../react-i18next/transform_your_localization_process_small.jpg "locize © inweso GmbH")

### Wie sieht das aus? <a name="how-look"></a>

Zuerst müssen Sie sich bei locize [registrieren](https://locize.app/register) und [anmelden](https://docs.locize.com/integration/getting-started/create-a-user-account).
Dann [erstellen Sie ein neues Projekt](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize und fügen Ihre Übersetzungen hinzu. Sie können Ihre Übersetzungen entweder über die [CLI](https://github.com/locize/react-tutorial#use-the-locize-cli) oder durch [Importieren der einzelnen json-Dateien](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) oder über die [API](https://docs.locize.com/integration/api#update-remove-translations) bewerkstelligen.

Danach ersetzen wir [i18next-http-backend](https://github.com/i18next/i18next-http-backend) durch [i18next-locize-backend](https://github.com/locize/i18next-locize-backend).

`npm install i18next-locize-backend`

Nachdem Sie die zu lokalisierenden Übersetzungen importiert haben, löschen Sie den Ordner locales:

![öffentliche Übersetzungen löschen](../react-i18next/public_locales_removed.jpg "locize © inweso GmbH")

Passen Sie die Datei `i18n.js` an, um das `i18next-locize-backend` zu verwenden, und stellen Sie sicher, dass Sie die Projekt-ID und den API-Schlüssel aus Ihrem Locize-Projekt kopieren:

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

[i18next-locize-backend](https://github.com/locize/i18next-locize-backend) bietet eine Funktion zum Abrufen der verfügbaren Sprachen direkt von locize, verwenden wir sie:

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

### fehlende Übersetzungen speichern <a name="save-missing"></a>

Dank der Verwendung der [saveMissing-Funktion](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App neue Schlüssel automatisch zu locize hinzugefügt.

Übergeben Sie einfach `saveMissing: true` in den i18next-Optionen:

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

Jedes Mal, wenn Sie einen neuen Schlüssel verwenden, wird dieser zu locize gesendet, d.h.:

```javascript
<div>{t('new.key', 'this will be added automatically')}</div>
```

resultiert in locize wie folgt:

![missing key](../react-i18next/missing_key.jpg "locize © inweso GmbH")

### 👀 aber es gibt noch mehr... <a name="more"></a>

Dank des Plugins [locize-lastused](https://github.com/locize/locize-lastused) können Sie [in locize, Schlüssel welche verwendet oder nicht mehr verwendet werden, finden und filtern](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

Mit Hilfe des Plugins [locize](https://github.com/locize/locize) können Sie Ihre App im locize [InContext Editor](https://docs.locize.com/more/incontext-editor) verwenden.

Zusätzlich mit Hilfe des [Auto-MachineTranslation-Workflows](https://docs.locize.com/whats-inside/auto-machine-translation) und der Verwendung der [saveMissing-Funktionalität](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App nicht nur neue Schlüssel zur automatischen Lokalisierung hinzugefügt, sondern auch automatisch per maschineller Übersetzung in die Zielsprachen übersetzt.

*Sehen Sie sich dieses [Video](https://youtu.be/VfxBpSXarlU) an, um zu sehen, wie der Arbeitsablauf der automatischen maschinellen Übersetzung aussieht!*

{% youtube VfxBpSXarlU %}

`npm install locize-lastused locize`

verwenden Sie sie in `i18n.js`:

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

[Automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key automatisch](../react-i18next/missing_key_auto_mt.jpg "locize © inweso GmbH")

[Filter für zuletzt verwendete Übersetzungen]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](../react-i18next/last_used.jpg "locize © inweso GmbH")

[InContext-Editor](https://docs.locize.com/more/incontext-editor):

![i18next inkontext](../react-i18next/in_context.jpg "locize © inweso GmbH")


### 📦 Bereiten wir uns auf die Produktion vor 🚀 <a name="production"></a>

Jetzt bereiten wir die App für den Produktionsstart vor (https://docs.locize.com/guides-tips-and-tricks/going-production).

Erstellen Sie zuerst in locize eine dedizierte Version für die Produktion. Aktivieren Sie die automatische Veröffentlichung für diese Version nicht, sondern veröffentlichen Sie sie manuell oder über die [API](https://docs.locize.com/integration/api#publish-version) oder über die [CLI](https://github.com/locize/locize-cli#publish-version).
Schliesslich [aktivieren Sie auch Cache-Control max-age​](https://docs.locize.com/more/caching) für diese Produktionsversion.

Nutzen wir die [Umgebungsfunktion von react-scripts](https://create-react-app.dev/docs/adding-custom-environment-variables/).

Lassen Sie uns eine Standardumgebungsdatei und eine für die Entwicklung und eine für die Produktion erstellen:

`.env`:
```
SKIP_PREFLIGHT_CHECK=true

REACT_APP_VERSION=$npm_package_version

# locize
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

Passen wir nun die Datei `i18n.js` an:

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

Während der Entwicklung werden Sie nun weiterhin fehlende Schlüssel speichern und die `lastused` Funktionalität nutzen. => `npm run start`

Und in der Produktionsumgebung sind `saveMissing` und `lastused` deaktiviert, und auch der API-Schlüssel wird nicht verfügbar gemacht. => `npm run build && npm run serve`


[Caching](https://docs.locize.com/more/caching):

![i18next Caching](../react-i18next/caching.jpg "locize © inweso GmbH")

[Versionen zusammenführen](https://docs.locize.com/more/versioning#merging-versions):

![Version überschreiben](../react-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 Den vollständigen Code finden Sie [hier](https://github.com/locize/react-i18next-example-app).*

*Sehen Sie sich auch den [Teil zur Code-Integration](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in diesem [YouTube-Video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

Es gibt auch ein [i18next-Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}

Es gibt auch eine [spanische Übersetzung dieses Blogbeitrags](https://www.ibidem-translations.com/edu/translate-react-i18next-app/).

# 🎉🥳 Herzlichen Glückwunsch 🎊🎁 <a name="congratulations"></a>

Ich hoffe, Sie haben ein paar neue Dinge über [i18next](https://www.i18next.com), [React.js-Lokalisierung](https://react.i18next.com) und [moderne Lokalisierungs-Workflows](https://locize.com) gelernt.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Übersetzungs-Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

# 👍