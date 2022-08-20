---
title: Der progressive Leitfaden zur jQuery-Internationalisierung (i18n) mit i18next
description: So internationalisieren Sie eine jQuery-Website richtig mit i18next.

date: 2022-02-02
tags:
  - i18next
  - jquery
  - jquery-i18next
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
categories:
  - Post
thumbnail: jquery-i18next/jquery-localization.jpg

label: jquery-i18next
lang: de
hidden: true
---

![jQuery Lokalisierung](../jquery-i18next/jquery-localization.jpg "jQuery Lokalisierungs-Beispiel")

Jeder Web-Entwickler ist vielleicht schon einmal auf das mehrjährige [Methusalem](https://de.wikipedia.org/wiki/Methusalem) jQuery gestossen.
Erstellt im Januar 2006 bei [BarCamp NYC](https://en.wikipedia.org/wiki/BarCamp) von [John Resig](https://en.wikipedia.org/wiki/John_Resig) und wird derzeit von einem [Team von Entwicklern](https://jquery.org/team/) unter der Leitung von [Timmy Willison](https://timmywil.com) geleitet.

*Man könnte denken:*
>Warum ein Blogbeitrag über die ehrwürdige, aber veraltete JavaScript-Bibliothek, welche Dinge wie das Durchlaufen und Manipulieren von HTML-Dokumenten usw. einfacher gemacht hat?

**Weil mit einer Kombination aus Vielseitigkeit und Erweiterbarkeit jQuery die Art und Weise verändert hat, wie Millionen von Menschen JavaScript schreiben!**

Und Sie können dies an der enormen Verwendung von jQuery sehen:

Basierend auf [Umfragen zur Webtechnologie von w3Techs](https://w3techs.com/technologies/overview/javascript_library) wird [jQuery](https://w3techs.com/technologies/details/js-jquery) von **95.4 %** aller Webseiten benutzt, deren JavaScript-Bibliothek sie kennen. Und von **78,3 %** aller Webseiten genutzt.

![](../jquery-i18next/w3techs.jpg)

Wenn man die [npm-Download-Trends des jquery-Moduls]((https://www.npmtrends.com/jquery)) überprüft, nähert es sich den 5 Millionen Downloads pro Woche.

![](../jquery-i18next/npmtrends.jpg)

Sie sehen also, jQuery ist nicht nur immer noch relevant, sondern nimmt den Grossteil aller Webseiten ein.

Daher verwenden wir in diesem Artikel das i18next-Framework, um eine jQuery-Website zu internationalisieren.

## Inhaltsverzeichnis
  * [Also erstmal: "Warum i18next?"](#why-i18next)
  * [Fangen wir an...](#start)
    - [Voraussetzungen](#prerequisites)
    - [Einstieg](#getting-started)
    - [Sprachumschalter](#language-switcher)
    - [Head informationen übersetzen](#head-translate)
    - [Interpolation und Pluralisierung](#interpolation-pluralization)
    - [Formatierung](#formatting)
    - [Kontext](#context)
    - [Übersetzungen vom Code trennen](#separate)
    - [Besseres Übersetzungsmanagement](#better-translation-management)
      - [Auf jeden Fall!](#for-sure)
      - [Wie sieht das aus?](#how-look)
      - [fehlende Übersetzungen speichern](#save-missing)
      - [👀 aber es gibt noch mehr...](#more)
  * [🎉🥳 Herzliche Glückwünsche 🎊🎁](#congratulations)

# Also erstmal: "Warum i18next?" <a name="why-i18next"></a>

Wenn es um die jQuery-Lokalisierung geht, ist eines der beliebtesten Frameworks [i18next](https://www.i18next.com) mit seiner jQuery-Erweiterung [jquery-i18next](https://github.com/i18next/jquery-i18next), und das aus guten Gründen:

*i18next wurde Ende 2011 erstellt. Es ist älter als die meisten Bibliotheken, die Sie heutzutage verwenden, einschliesslich Ihrer wichtigsten Frontend-Technologie ([React](../react-i18next-de/), [Angular](../angular-i18next-de/), [Vue](../i18next-vue-de/), ...). Nur [jQuery](https://jquery.com/) ist älter 😉*
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


# Fangen wir an... <a name="start"></a>

## Voraussetzungen <a name="prerequisites"></a>

Stellen Sie sicher, dass Sie eine jQuery-basierte Website oder Webanwendung haben. Wenn Sie etwas Erfahrung mit einfachem HTML, JavaScript und grundlegendem jQuery haben, ist es am besten, bevor Sie zu [jquery-i18next](https://github.com/i18next/jquery-i18next) springen. Dieses jQuery i18n-Beispiel ist nicht als jQuery-Anfänger-Tutorial gedacht.


## Einstieg <a name="getting-started"></a>

Nehmen Sie Ihr eigenes jQuery-Projekt oder erstellen Sie ein neues.

Ich habe hier eine tolle Landingpage 😉

![](../jquery-i18next/app_0.png "locize © inweso GmbH")

Wir werden die Website anpassen, um die Sprache gemäss den Vorlieben des Benutzers zu erkennen.
Und wir werden einen Sprachumschalter erstellen, um den Inhalt zwischen verschiedenen Sprachen zu ändern.

Lassen Sie uns einige i18next-Abhängigkeiten installieren:

- [i18next](https://www.i18next.com)
- [jquery-i18next](https://github.com/i18next/jquery-i18next)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

```html
<script src="https://cdn.jsdelivr.net/npm/i18next@21.6.10/i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-i18next@1.2.1/jquery-i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@6.1.3/i18nextBrowserLanguageDetector.min.js"></script>
```

Lassen Sie uns eine `i18n.js`-Datei vorbereiten:

```javascript
$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            // here we will place our translations...
          }
        }
      }
    }, (err, t) => {
      if (err) return console.error(err);

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      jqueryI18next.init(i18next, $, { useOptionsAttr: true });

      // start localizing, details:
      // https://github.com/i18next/jquery-i18next#usage-of-selector-function
      $('body').localize();
    });
});
```

Lassen Sie uns diese Datei laden:

```html
<script src="https://cdn.jsdelivr.net/npm/i18next@21.6.10/i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-i18next@1.2.1/jquery-i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@6.1.3/i18nextBrowserLanguageDetector.min.js"></script>

<script src="js/i18n.js"></script>
```

Lassen Sie uns nun versuchen, hartcodierten Text in die Übersetzungen zu verschieben.

```html
<!-- ... -->
<h1 data-i18n="intro.title">Landing Page</h1>
<h3 data-i18n="intro.subTitle">Some subtitle</h3>
<!-- ... -->
```

Da die Texte Teil unserer Übersetzungsressourcen sein werden, könnten sie auch entfernt werden:

```html
<!-- ... -->
<h1 data-i18n="intro.title"></h1>
<h3 data-i18n="intro.subTitle"></h3>
<!-- ... -->
```

Die Texte sind jetzt Teil der Übersetzungsressourcen:

```javascript
$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            intro: {
              title: 'Landing Page',
              subTitle: 'Some subtitle'
            }
          }
        }
      }
    }, (err, t) => {
      if (err) return console.error(err);

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      jqueryI18next.init(i18next, $, { useOptionsAttr: true });

      // start localizing, details:
      // https://github.com/i18next/jquery-i18next#usage-of-selector-function
      $('body').localize();
    });
});
```


## Sprachumschalter <a name="language-switcher"></a>

Lassen Sie uns nun einen Sprachumschalter definieren:

```html
<!-- ... -->
<select name="language" id="languageSwitcher"></select>
<!-- ... -->
```

Und fügen Sie auch einige Übersetzungen für die neue Sprache hinzu:

```javascript
const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
};

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('body').localize();
}

$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            intro: {
              title: 'Landing Page',
              subTitle: 'Some subtitle'
            }
          }
        },
        de: {
          translation: {
            intro: {
              title: 'Webseite',
              subTitle: 'Ein Untertitel'
            }
          }
        }
      }
    }, (err, t) => {
      if (err) return console.error(err);

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      jqueryI18next.init(i18next, $, { useOptionsAttr: true });

      // fill language switcher
      Object.keys(lngs).map((lng) => {
        const opt = new Option(lngs[lng].nativeName, lng);
        if (lng === i18next.resolvedLanguage) {
          opt.setAttribute("selected", "selected");
        }
        $('#languageSwitcher').append(opt);
      });
      $('#languageSwitcher').change((a, b, c) => {
        const chosenLng = $(this).find("option:selected").attr('value');
        i18next.changeLanguage(chosenLng, () => {
          rerender();
        });
      });

      rerender();
    });
});
```

![jquery Sprachumschalter](../jquery-i18next/app_1_switcher.jpg "locize © inweso GmbH")

![](../jquery-i18next/app_1.jpg "locize © inweso GmbH")


**🥳 Grossartig, Sie haben gerade Ihren ersten Sprachumschalter erstellt!**

Dank [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector) versucht es jetzt, die Browsersprache zu erkennen und diese Sprache automatisch zu verwenden, wenn Sie die Übersetzungen dafür bereitgestellt haben. Die manuell ausgewählte Sprache im Sprachumschalter wird im localStorage beibehalten, beim nächsten Besuch der Seite wird diese Sprache als bevorzugte Sprache verwendet.


## Head informationen übersetzen <a name="head-translate"></a>

Lassen Sie uns auch den Titel und die Beschreibung der Website übersetzen.
Wir tun dies, indem wir unsere `render`-Funktion erweitern und die zusätzlichen Übersetzungsressourcen hinzufügen:

```javascript
const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('body').localize();

  $('title').text($.t('head.title'))
  $('meta[name=description]').attr('content', $.t('head.description'))
}

// ...

resources: {
  en: {
    translation: {
      head: {
        title: 'My Awesome Landing-Page',
        description: 'The description of this awesome landing page.'
      },
      intro: {
        title: 'Landing Page',
        subTitle: 'Some subtitle'
      }
    }
  },
  de: {
    translation: {
      head: {
        title: 'Meine grossartige Webseite',
        description: 'Die Beschreibung dieser grossartigen Webseite.'
      },
      intro: {
        title: 'Webseite',
        subTitle: 'Ein Untertitel'
      }
    }
  }
}
```

Sie sehen also, das geht auch mit der Hilfsfunktion `$.t()`.

Lassen Sie uns das DOM überprüfen:

![](../jquery-i18next/dom.jpg "locize © inweso GmbH")

Sehr gut 👍


## Interpolation und Pluralisierung <a name="interpolation-pluralization"></a>

i18next geht über die Bereitstellung der standardmässigen i18n-Funktionen hinaus.
Aber sicher ist es in der Lage, [Plurale](https://www.i18next.com/translation-function/plurals) und [Interpolation](https://www.i18next.com/translation-function/interpolation) zu verarbeiten.

Zählen wir jedes Mal, wenn die Sprache geändert wird:

```html
<!-- ... -->
<li>
  <select name="language" id="languageSwitcher"></select>
</li>
<li id="languageChangedNotification" style="display: none;">
  <i data-i18n="footer.counter" data-i18n-options='{ "count": 0 }'></i>
</li>
<!-- ... -->
```

Erinnern wir uns an den Zähler in der Variable `languageChangedCounter` und erhöhen ihn bei jedem Sprachwechsel.
<br />
...und erweitern die Übersetzungsressourcen:

```javascript
const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
};

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('body').localize();

  $('title').text($.t('head.title'))
  $('meta[name=description]').attr('content', $.t('head.description'))
}

$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            head: {
              title: 'My Awesome Landing-Page',
              description: 'The description of this awesome landing page.'
            },
            intro: {
              title: 'Landing Page',
              subTitle: 'Some subtitle'
            },
            footer: {
              counter_one: 'Changed language just once',
              counter_other: 'Changed language already {{count}} times'
            }
          }
        },
        de: {
          translation: {
            head: {
              title: 'Meine grossartige Webseite',
              description: 'Die Beschreibung dieser grossartigen Webseite.'
            },
            intro: {
              title: 'Webseite',
              subTitle: 'Ein Untertitel'
            },
            footer: {
              counter_one: 'Die Sprache wurde erst ein mal gewechselt',
              counter_other: 'Die Sprache wurde {{count}} mal gewechselt'
            }
          }
        }
      }
    }, (err, t) => {
      if (err) return console.error(err);

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      jqueryI18next.init(i18next, $, { useOptionsAttr: true });

      // fill language switcher
      Object.keys(lngs).map((lng) => {
        const opt = new Option(lngs[lng].nativeName, lng);
        if (lng === i18next.resolvedLanguage) {
          opt.setAttribute("selected", "selected");
        }
        $('#languageSwitcher').append(opt);
      });
      let languageChangedCounter = 0;
      $('#languageSwitcher').change((a, b, c) => {
        const chosenLng = $(this).find("option:selected").attr('value');
        i18next.changeLanguage(chosenLng, () => {
          rerender();
            
          // language changed message
          languageChangedCounter++;
          $('#languageChangedNotification').localize({ count: languageChangedCounter })
          if (languageChangedCounter === 1) {
            $('#languageChangedNotification').show();
          }
        });
      });

      rerender();
    });
});
```

Basierend auf dem Zählwert wählt i18next die korrekte Pluralform aus.
Lesen Sie mehr über [Pluralisierung](https://www.i18next.com/translation-function/plurals) und [Interpolation](https://www.i18next.com/translation-function/interpolation) in der [offiziellen i18next-Dokumentation](https://www.i18next.com/).

![jQuery Pluralisierung](../jquery-i18next/app_2.jpg "locize © inweso GmbH")

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


## Formatierung <a name="formatting"></a>

Schauen wir uns nun an, wie wir mit Hilfe von [i18next](https://www.i18next.com) und [moment.js](https://momentjs.com/) verschiedene Datumsformate verwenden können, um Datum und Uhrzeit zu handhaben.

```html
<!-- ... -->
<script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/min/moment-with-locales.min.js"></script>
<!-- ... -->
```

Wir möchten, dass die Fusszeile das aktuelle Datum anzeigt:

```html
<!-- ... -->
<p id="footerMessage" class="text-muted small" data-i18n="footer.date"></p>
<!-- ... -->
```

Definieren Sie eine Formatfunktion, wie in der [Dokumentation](https://www.i18next.com/translation-function/formatting) dokumentiert, und fügen Sie den neuen Übersetzungsschlüssel hinzu:

```javascript
const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
};

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('body').localize();

  $('title').text($.t('head.title'))
  $('meta[name=description]').attr('content', $.t('head.description'))
}

$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            head: {
              title: 'My Awesome Landing-Page',
              description: 'The description of this awesome landing page.'
            },
            intro: {
              title: 'Landing Page',
              subTitle: 'Some subtitle'
            },
            footer: {
              counter_one: 'Changed language just once',
              counter_other: 'Changed language already {{count}} times',
              date: 'It\'s {{date, LLLL}}'
            }
          }
        },
        de: {
          translation: {
            head: {
              title: 'Meine grossartige Webseite',
              description: 'Die Beschreibung dieser grossartigen Webseite.'
            },
            intro: {
              title: 'Webseite',
              subTitle: 'Ein Untertitel'
            },
            footer: {
              counter_one: 'Die Sprache wurde erst ein mal gewechselt',
              counter_other: 'Die Sprache wurde {{count}} mal gewechselt',
              date: 'Es ist {{date, LLLL}}'
            }
          }
        }
      }
    }, (err, t) => {
      if (err) return console.error(err);

      // define the formatter function
      i18next.services.formatter.add('LLLL', (value, lng, options) => {
        return moment(value).locale(lng).format('LLLL');
      });

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      jqueryI18next.init(i18next, $, { useOptionsAttr: true });

      // fill language switcher
      Object.keys(lngs).map((lng) => {
        const opt = new Option(lngs[lng].nativeName, lng);
        if (lng === i18next.resolvedLanguage) {
          opt.setAttribute("selected", "selected");
        }
        $('#languageSwitcher').append(opt);
      });
      let languageChangedCounter = 0;
      $('#languageSwitcher').change((a, b, c) => {
        const chosenLng = $(this).find("option:selected").attr('value');
        i18next.changeLanguage(chosenLng, () => {
          rerender();
            
          // language changed message
          languageChangedCounter++;
          $('#languageChangedNotification').localize({ count: languageChangedCounter })
          if (languageChangedCounter === 1) {
            $('#languageChangedNotification').show();
          }
        });
      });

      rerender();
    });
});
```

**😎 Cool, jetzt haben wir eine sprachspezifische Datumsformatierung!**

Englisch:
![jQuery englisch](../jquery-i18next/app_3.jpg "locize © inweso GmbH")

Deutsch:
![jQuery deutsch](../jquery-i18next/app_4.jpg "locize © inweso GmbH")


## Kontext <a name="context"></a>

Was ist mit einer bestimmten Begrüssungsnachricht basierend auf der aktuellen Tageszeit? also morgens, abends usw.
Dies ist dank der [context](https://www.i18next.com/translation-function/context)-Funktion von i18next möglich.

Lassen Sie uns eine `getGreetingTime`-Funktion erstellen und das Ergebnis als Kontextinformationen für unsere Fusszeilenübersetzung verwenden.
<br />
Und fügen Sie einige kontextspezifische Übersetzungsschlüssel hinzu:

```javascript
// ...

const getGreetingTime = () => {
  const split_afternoon = 12; // 24hr time to split the afternoon
  const split_evening = 17; // 24hr time to split the evening
  const currentHour = moment().hour();

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    return 'afternoon';
  } else if (currentHour >= split_evening) {
    return 'evening';
  }
  return 'morning';
}

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('body').localize();
  $('#footerMessage').localize({ context: getGreetingTime() });
  $('title').text($.t('head.title'))
  $('meta[name=description]').attr('content', $.t('head.description'))
}

// ...

resources: {
  en: {
    translation: {
      // ...
      footer: {
        counter_one: 'Changed language just once',
        counter_other: 'Changed language already {{count}} times',
        date: 'It\'s {{date, LLLL}}',
        date_afternoon: 'Good afternoon! It\'s {{date, LLLL}}',
        date_evening: 'Good evening! Today was the {{date, LLLL}}',
        date_morning: 'Good morning! Today is {{date, LLLL}} | Have a nice day!'
      }
    }
  },
  de: {
    translation: {
      // ...
      footer: {
        counter_one: 'Die Sprache wurde erst ein mal gewechselt',
        counter_other: 'Die Sprache wurde {{count}} mal gewechselt',
        date: 'Es ist {{date, LLLL}}',
        date_afternoon: 'Guten Tag! Es ist {{date, LLLL}}',
        date_evening: 'Guten Abend! Heute war {{date, LLLL}}',
        date_morning: 'Guten Morgen! Heute ist {{date, LLLL}} | Wünsche einen schönen Tag!'
      }
    }
  }
}
```

**😁 Ja, es funktioniert!**

![jQuery Übersetzungen](../jquery-i18next/app_5.jpg "locize © inweso GmbH")


## Übersetzungen vom Code trennen <a name="separate"></a>

Die Übersetzungen in unserer `i18n.js`-Datei zu haben, funktioniert, ist aber für Übersetzer nicht so angenehm.
Lassen Sie uns die Übersetzungen vom Code trennen und sie in dedizierte JSON-Dateien verschieben.

Da es sich um eine Webanwendung handelt, hilft uns [i18next-http-backend](https://github.com/i18next/i18next-http-backend) dabei.

```html
<script src="https://cdn.jsdelivr.net/npm/i18next-http-backend@1.3.2/i18nextHttpBackend.min.js"></script>
```

Erstellen Sie einen `locales`-Ordner und verschieben Sie die Übersetzungen dorthin:

![öffentliche Übersetzungen](../jquery-i18next/public_folder.jpg "locize © inweso GmbH")

Passen Sie die Datei `i18n.js` an, um das `i18next-http-backend` zu verwenden:

```javascript
// ...

$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    .use(i18nextHttpBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en'
    }, (err, t) => {
      if (err) return console.error(err);

      // ...
    });
});
```

Jetzt werden die Übersetzungen asynchron geladen, daher kann es sein, dass die Benutzeroberfläche etwas später aktualisiert wird, sobald die Übersetzungen geladen sind.
Um dieses Verhalten zu optimieren, können Sie eine Art Ladeanzeige anzeigen, bis i18next initialisiert ist.

So etwas wie:

```html
<div id="loader">Loading...</div>
<div id="content" style="display: none;">
  <!-- your real content -->
</div>
```

```javascript
$('#loader').hide();
$('#content').show();
```

Jetzt sieht Ihre App immer noch gleich aus, aber Ihre Übersetzungen sind getrennt.

![](../jquery-i18next/spinner.gif)

Wenn Sie eine neue Sprache unterstützen möchten, erstellen Sie einfach einen neuen Ordner und eine neue JSON-Übersetzungsdatei.
Dies gibt Ihnen die Möglichkeit, die Übersetzungen an die Übersetzer zu senden.
Oder wenn Sie mit einem Übersetzungsmanagementsystem arbeiten, können Sie einfach [die Dateien mit einer CLI synchronisieren](https://github.com/locize/react-tutorial#use-the-locize-cli).


## Besseres Übersetzungsmanagement <a name="better-translation-management"></a>

Indem Sie die Übersetzungen an einige Übersetzer oder Übersetzungsagenturen senden, haben Sie mehr Kontrolle und einen direkten Kontakt mit ihnen. Das bedeutet aber auch mehr Arbeit für Sie.
Dies ist ein traditioneller Weg. Beachten Sie jedoch, dass das Versenden von Dateien immer einen Overhead verursacht.

> Gibt es eine bessere Option?

### Auf jeden Fall! <a name="sicher"></a>

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

![transformiere den Lokalisierungsprozess](../jquery-i18next/transform_your_localization_process_small.jpg "locize © inweso GmbH")

### Wie sieht das aus? <a name="how-look"></a>

Zuerst müssen Sie sich bei locize [registrieren](https://locize.app/register) und [anmelden](https://docs.locize.com/integration/getting-started/create-a-user-account).
Dann [erstellen Sie ein neues Projekt](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize und fügen Ihre Übersetzungen hinzu. Sie können Ihre Übersetzungen entweder über die [CLI](https://github.com/locize/react-tutorial#use-the-locize-cli) oder durch [Importieren der einzelnen json-Dateien](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) oder über die [API](https://docs.locize.com/integration/api#update-remove-translations) bewerkstelligen.

Danach ersetzen wir [i18next-http-backend](https://github.com/i18next/i18next-http-backend) durch [i18next-locize-backend](https://github.com/locize/i18next-locize-backend).

```html
<!-- ... -->
<script src="https://cdn.jsdelivr.net/npm/i18next-locize-backend@4.2.8/i18nextLocizeBackend.min.js"></script>
<!-- ... -->
```

Nachdem Sie die zu lokalisierenden Übersetzungen importiert haben, löschen Sie den Ordner `locales` und passen Sie die Datei `i18n.js` an, um das i18next-locize-Backend zu verwenden, und stellen Sie sicher, dass Sie die Projekt-ID und den API-Schlüssel aus Ihrem locize-Projekt kopieren:

```javascript
// ...

const locizeOptions = {
  projectId: '8d751621-323e-4bda-94c8-7d2368102e62',
  apiKey: '302aca54-2ea8-4b9f-b5f0-df1369c59427' // YOU should not expose your apps API key to production!!!
};

$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // i18next-locize-backend
    // loads translations from your project, saves new keys to it (saveMissing: true)
    // https://github.com/locize/i18next-locize-backend
    .use(i18nextLocizeBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en',
      backend: locizeOptions
    }, (err, t) => {
      if (err) return console.error(err);

      // ...
    });
});
```

[i18next-locize-backend](https://github.com/locize/i18next-locize-backend) bietet eine Funktion zum Abrufen der verfügbaren Sprachen direkt von locize an, verwenden wir sie:

```javascript
// ...

const locizeOptions = {
  projectId: '8d751621-323e-4bda-94c8-7d2368102e62',
  apiKey: '302aca54-2ea8-4b9f-b5f0-df1369c59427' // YOU should not expose your apps API key to production!!!
};

$(function () {
  const locizeBackend = new i18nextLocizeBackend(locizeOptions, (err, opts, lngs) => {
    if (err) return console.error(err);

    // use plugins and options as needed, for options, detail see
    // https://www.i18next.com
    i18next
      // i18next-locize-backend
      // loads translations from your project, saves new keys to it (saveMissing: true)
      // https://github.com/locize/i18next-locize-backend
      .use(locizeBackend)
      // detect user language
      // learn more: https://github.com/i18next/i18next-browser-languageDetector
      .use(i18nextBrowserLanguageDetector)
      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        debug: true,
        fallbackLng: 'en',
        backend: locizeOptions
      }, (err, t) => {
        if (err) return console.error(err);

        // new usage
        i18next.services.formatter.add('LLLL', (value, lng, options) => {
          return moment(value).locale(lng).format('LLLL');
        });

        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });

        // fill language switcher
        // with the lngs retrieved directly from locize...
        Object.keys(lngs).map((lng) => {
          const opt = new Option(lngs[lng].nativeName, lng);
          if (lng === i18next.resolvedLanguage) {
            opt.setAttribute("selected", "selected");
          }
          $('#languageSwitcher').append(opt);
        });
        let languageChangedCounter = 0;
        $('#languageSwitcher').change((a, b, c) => {
          const chosenLng = $(this).find("option:selected").attr('value');
          i18next.changeLanguage(chosenLng, () => {
            rerender();
            
            // language changed message
            languageChangedCounter++;
            $('#languageChangedNotification').localize({ count: languageChangedCounter })
            if (languageChangedCounter === 1) {
              $('#languageChangedNotification').show();
            }
          });
        });

        rerender();

        $('#loader').hide();
        $('#content').show();
      });
  });
});
```

Jetzt werden die Übersetzungen direkt vom [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) geliefert. Unsere jQuery i18n hat jetzt CDN-Superpower 😁.

### fehlende Übersetzungen speichern <a name="save-missing"></a>

Dank der Verwendung der [saveMissing-Funktion](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App neue Schlüssel automatisch zu locize hinzugefügt.

Übergeben Sie einfach `saveMissing: true` in den i18next-Optionen:

```javascript
// ...
.init({
  debug: true,
  fallbackLng: 'en',
  backend: locizeOptions,
  saveMissing: true // do not enable it on production
}, (err, t) => {
// ...
```

Jedes Mal, wenn Sie einen neuen Schlüssel verwenden, wird dieser zu locize gesendet, d.h.:

```javascript
<div data-i18n="new.key">this will be added automatically</div>
```

resultiert in locize wie folgt:

![missing key](../jquery-i18next/missing_key.jpg "locize © inweso GmbH")


### 👀 aber es gibt noch mehr... <a name="more"></a>

Dank des Plugins [locize-lastused](https://github.com/locize/locize-lastused) können Sie [in locize, Schlüssel welche verwendet oder nicht mehr verwendet werden, finden und filtern](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

Mit Hilfe des Plugins [locize](https://github.com/locize/locize) können Sie Ihre App im locize [InContext Editor](https://docs.locize.com/more/incontext-editor) verwenden.

Zusätzlich mit Hilfe des [Auto-MachineTranslation-Workflows](https://docs.locize.com/whats-inside/auto-machine-translation) und der Verwendung der [saveMissing-Funktionalität](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App nicht nur neue Schlüssel zur automatischen Lokalisierung hinzugefügt, sondern auch automatisch per maschineller Übersetzung in die Zielsprachen übersetzt.

*Sehen Sie sich dieses [Video](https://youtu.be/VfxBpSXarlU) an, um zu sehen, wie der Arbeitsablauf der automatischen maschinellen Übersetzung aussieht!*

{% youtube VfxBpSXarlU %}

```html
<!-- ... -->
<script src="https://cdn.jsdelivr.net/npm/locize-lastused@3.0.13/locizeLastUsed.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/locize@2.2.4/locize.min.js"></script>
<!-- ... -->
```

Verwenden Sie sie in `i18n.js`:

```javascript
const getGreetingTime = () => {
  const split_afternoon = 12; // 24hr time to split the afternoon
  const split_evening = 17; // 24hr time to split the evening
  const currentHour = moment().hour();

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    return 'afternoon';
  } else if (currentHour >= split_evening) {
    return 'evening';
  }
  return 'morning';
}

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('body').localize();
  $('#footerMessage').localize({ context: getGreetingTime() });
  $('title').text($.t('head.title'))
  $('meta[name=description]').attr('content', $.t('head.description'))
}

const locizeOptions = {
  projectId: '8d751621-323e-4bda-94c8-7d2368102e62',
  apiKey: '302aca54-2ea8-4b9f-b5f0-df1369c59427' // YOU should not expose your apps API key to production!!!
};

i18next.on('editorSaved', rerender); // used for the inContext editor

$(function () {
  const locizeBackend = new i18nextLocizeBackend(locizeOptions, (err, opts, lngs) => {
    if (err) return console.error(err);

    // use plugins and options as needed, for options, detail see
    // https://www.i18next.com
    i18next
      // locize-editor
      // InContext Editor of locize
      .use(locize.locizePlugin)
      // locize-lastused (do not use this in production)
      // sets a timestamp of last access on every translation segment on locize
      // -> safely remove the ones not being touched for weeks/months
      // https://github.com/locize/locize-lastused
      .use(locizeLastUsed)
      // i18next-locize-backend
      // loads translations from your project, saves new keys to it (saveMissing: true)
      // https://github.com/locize/i18next-locize-backend
      .use(locizeBackend)
      // detect user language
      // learn more: https://github.com/i18next/i18next-browser-languageDetector
      .use(i18nextBrowserLanguageDetector)
      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        ...opts,
        debug: true,
        fallbackLng: 'en',
        backend: locizeOptions,
        locizeLastUsed: locizeOptions,
        saveMissing: true
        // interpolation: {
        //   // legacy usage
        //   format: (value, format, lng) => {
        //     if (value instanceof Date) {
        //       return moment(value).locale(lng).format(format);
        //     }
        //     return value;
        //   }
        // }
      }, (err, t) => {
        if (err) return console.error(err);

        // new usage
        i18next.services.formatter.add('LLLL', (value, lng, options) => {
          return moment(value).locale(lng).format('LLLL');
        });

        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });

        // fill language switcher
        Object.keys(lngs).map((lng) => {
          const opt = new Option(lngs[lng].nativeName, lng);
          if (lng === i18next.resolvedLanguage) {
            opt.setAttribute("selected", "selected");
          }
          $('#languageSwitcher').append(opt);
        });
        let languageChangedCounter = 0;
        $('#languageSwitcher').change((a, b, c) => {
          const chosenLng = $(this).find("option:selected").attr('value');
          i18next.changeLanguage(chosenLng, () => {
            rerender();
            
            // language changed message
            languageChangedCounter++;
            $('#languageChangedNotification').localize({ count: languageChangedCounter })
            if (languageChangedCounter === 1) {
              $('#languageChangedNotification').show();
            }
          });
        });

        rerender();

        $('#loader').hide();
        $('#content').show();
      });
  });
});
```

[Automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key automatisch](../jquery-i18next/missing_key_auto_mt.jpg "locize © inweso GmbH")

[Filter für zuletzt verwendete Übersetzungen]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](../jquery-i18next/last_used.jpg "locize © inweso GmbH")

[InContext-Editor](https://docs.locize.com/more/incontext-editor):

![i18next inkontext](../jquery-i18next/in_context.jpg "locize © inweso GmbH")


Während der Entwicklung werden Sie nun weiterhin fehlende Schlüssel speichern und die `lastUsed` Funktion nutzen.

Und in der Produktionsumgebung sollten Sie die Funktionen `saveMissing` und `lastused` deaktivieren oder entfernen, und auch der API-Schlüssel sollte nicht angezeigt werden.


[Caching](https://docs.locize.com/more/caching):

![i18next caching](../jquery-i18next/caching.jpg "locize © inweso GmbH")

[Versionen zusammenführen](https://docs.locize.com/more/versioning#merging-versions):

![Version überschreiben](../jquery-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 Den vollständigen Code finden Sie [hier](https://github.com/i18next/jquery-i18next/tree/master/example/landing).*

*Sehen Sie sich auch den [Teil zur Code-Integration](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in diesem [YouTube-Video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

Es gibt auch ein [i18next-Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Herzlichen Glückwunsch 🎊🎁 <a name="congratulations"></a>

Ich hoffe, Sie haben ein paar neue Dinge über [i18next](https://www.i18next.com), [jQuery Lokalisierung](https://github.com/i18next/jquery-i18next) und [moderne Lokalisierungs-Workflows](https://locize.com) gelernt.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Übersetzungs-Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

# 👍
