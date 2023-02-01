---
title: The progressive guide to jQuery internationalization (i18n) using i18next
description: How to properly internationalize a jQuery website using i18next.

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
thumbnail: jquery-i18next/jquery-localization.jpg
redirect_from:
- /how-to-jquery-i18next

label: jquery-i18next
lang: en
---

![jQuery localization](jquery-localization.jpg "jQuery Localization example")

Every web developer may have met the perennial [Methuselah](https://en.wikipedia.org/wiki/Methuselah) jQuery.
Created back in January 2006 at [BarCamp NYC](https://en.wikipedia.org/wiki/BarCamp) by [John Resig](https://en.wikipedia.org/wiki/John_Resig) and currently maintained by a [team of developers](https://jquery.org/team/) led by [Timmy Willison](https://timmywil.com).

*You may think:*
>Why a blog post about the venerable but aged JavaScript library, that made things like HTML document traversal and manipulation, etc. easier?

**Because with a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript!**

And you can see this by the huge usage of jQuery:

Based on [w3Techs web technology surveys](https://w3techs.com/technologies/overview/javascript_library), [jQuery](https://w3techs.com/technologies/details/js-jquery) is used by **95.4%** of all the websites whose JavaScript library they know. And **78.3%** of all websites.

![](w3techs.jpg)

Checking the [npm download trends of the jquery](https://www.npmtrends.com/jquery) module it is approaching the 5 million downloads per week.

![](npmtrends.jpg)

So you see, jQuery is not only still relevant, it takes up the majority of all websites.

Therefore, in this article, we will be using the i18next framework to internationalize a jQuery website.

### TOC
  * [So first of all: "Why i18next?"](#why-i18next)
  * [Let's get into it...](#start)
    - [Prerequisites](#prerequisites)
    - [Getting started](#getting-started)
    - [Language Switcher](#language-switcher)
    - [Translate head information](#head-translate)
    - [Interpolation and Pluralization](#interpolation-pluralization)
    - [Formatting](#formatting)
    - [Context](#context)
    - [Separate translations from code](#separate)
    - [Better translation management](#better-translation-management)
      - [For sure!](#for-sure)
      - [How does this look like?](#how-look)
      - [save missing translations](#save-missing)
      - [👀 but there's more...](#more)
  * [🎉🥳 Congratulations 🎊🎁](#congratulations)

## So first of all: "Why i18next?" <a name="why-i18next"></a>

When it comes to jQuery localization, one of the most popular is [i18next](https://www.i18next.com) with it's jQuery extension [jquery-i18next](https://github.com/i18next/jquery-i18next), and for good reasons:

*i18next was created in late 2011. It's older than most of the libraries you will use nowadays, including your main frontend technology ([React](../react-i18next/), [Angular](../angular-i18next/), [Vue](../i18next-vue/), ...). Only [jQuery](https://jquery.com/) is older 😉*
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


## Let's get into it... <a name="start"></a>

### Prerequisites <a name="prerequisites"></a>

Make sure you have a jQuery based website or web app. It's best, if you have some experience with simple HTML, JavaScript and basic jQuery, before jumping to [jquery-i18next](https://github.com/i18next/jquery-i18next). This jQuery i18n example is not intended to be a jQuery beginner tutorial.


### Getting started <a name="getting-started"></a>

Take your own jQuery project or create a new one.

I have here an awesome landing page 😉

![](app_0.png "locize © inweso GmbH")

We are going to adapt the website to detect the language according to the user’s preference.
And we will create a language switcher to make the content change between different languages.

Let's install some i18next dependencies:

- [i18next](https://www.i18next.com)
- [jquery-i18next](https://github.com/i18next/jquery-i18next)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

```html
<script src="https://cdn.jsdelivr.net/npm/i18next@21.6.10/i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-i18next@1.2.1/jquery-i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@6.1.3/i18nextBrowserLanguageDetector.min.js"></script>
```

Let's prepare an `i18n.js` file:

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

Let's load that file:

```html
<script src="https://cdn.jsdelivr.net/npm/i18next@21.6.10/i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-i18next@1.2.1/jquery-i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@6.1.3/i18nextBrowserLanguageDetector.min.js"></script>

<script src="js/i18n.js"></script>
```

Now let's try to move some hard coded text out to the translations.

```html
<!-- ... -->
<h1 data-i18n="intro.title">Landing Page</h1>
<h3 data-i18n="intro.subTitle">Some subtitle</h3>
<!-- ... -->
```

Since the texts will be part of our translation resources, they could also be removed:

```html
<!-- ... -->
<h1 data-i18n="intro.title"></h1>
<h3 data-i18n="intro.subTitle"></h3>
<!-- ... -->
```

The texts are now part of the translation resources:

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


### Language Switcher <a name="language-switcher"></a>

Now let's define a language switcher:

```html
<!-- ... -->
<select name="language" id="languageSwitcher"></select>
<!-- ... -->
```

And also add some translations for the new language:

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

![jquery language switcher](app_1_switcher.jpg "locize © inweso GmbH")

![](app_1.jpg "locize © inweso GmbH")


**🥳 Awesome, you've just created your first language switcher!**

Thanks to [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) now it tries to detect the browser language and automatically use that language if you've provided the translations for it. The manually selected language in the language switcher is persisted in the localStorage, next time you visit the page, that language is used as preferred language.


### Translate head information <a name="head-translate"></a>

Let's translate also the title and description of the website.
We do this by extending our `rerender` function, and adding the additional translation resources:

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

So you see, this can be also done with the `$.t()` helper function.

Let's check the DOM:

![](dom.jpg "locize © inweso GmbH")

Nice 👍


### Interpolation and Pluralization <a name="interpolation-pluralization"></a>

i18next goes beyond just providing the standard i18n features.
But for sure it's able to handle [plurals](https://www.i18next.com/translation-function/plurals) and [interpolation](https://www.i18next.com/translation-function/interpolation).

Let's count each time the language gets changed:

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

Let's remember the count in the `languageChangedCounter` variable and increment it on each language change.
<br />
...and extending the translation resources:

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

Based on the count value i18next will choose the correct plural form.
Read more about [pluralization](https://www.i18next.com/translation-function/plurals) and [interpolation](https://www.i18next.com/translation-function/interpolation) in the [official i18next documentation](https://www.i18next.com/).

![jQuery pluralization](app_2.jpg "locize © inweso GmbH")

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


### Formatting <a name="formatting"></a>

Now, let’s check out how we can use different date formats with the help of [i18next](https://www.i18next.com) and [moment.js](https://momentjs.com/) to handle date and time.

```html
<!-- ... -->
<script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/min/moment-with-locales.min.js"></script>
<!-- ... -->
```

We like to have the footer displaying the current date:

```html
<!-- ... -->
<p id="footerMessage" class="text-muted small" data-i18n="footer.date"></p>
<!-- ... -->
```

Define a format function, like documented in the [documentation](https://www.i18next.com/translation-function/formatting) and add the new translation key:

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

**😎 Cool, now we have a language specific date formatting!**

English:
![jQuery english](app_3.jpg "locize © inweso GmbH")

German:
![jQuery german](app_4.jpg "locize © inweso GmbH")


### Context <a name="context"></a>

What about a specific greeting message based on the current day time? i.e. morning, evening, etc.
This is possible thanks to the [context](https://www.i18next.com/translation-function/context) feature of i18next.

Let's create a `getGreetingTime` function and use the result as context information for our footer translation.
<br />
And add some context specific translations keys:

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

**😁 Yeah, It works!**

![jQuery translations](app_5.jpg "locize © inweso GmbH")


### Separate translations from code <a name="separate"></a>

Having the translations in our `i18n.js` file works, but is not that suitable to work with, for translators.
Let's separate the translations from the code and pleace them in dedicated json files.

Because this is a web application, [i18next-http-backend](https://github.com/i18next/i18next-http-backend) will help us to do so.

```html
<script src="https://cdn.jsdelivr.net/npm/i18next-http-backend@1.3.2/i18nextHttpBackend.min.js"></script>
```

Create a `locales` folder and move the translations there:

![public locales](public_folder.jpg "locize © inweso GmbH")

Adapt the `i18n.js` file to use the `i18next-http-backend`:

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
      // i.e. if you want to customize a different translation path,
      // use the loadPath option:
      // backend: {
      //   loadPath: '/assets/locales/{{lng}}/{{ns}}.json'
      // }
    }, (err, t) => {
      if (err) return console.error(err);

      // ...
    });
});
```

Now the translations are loaded asynchronously, so it may be the UI will refresh a bit later, as soon as the translations are loaded.
To optimize this behaviour, you can show some sort of loading indicator until the i18next is initialized.

Something like:

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

Now your app looks still the same, but your translations are separated.

![](spinner.gif)

If you want to support a new language, you just create a new folder and a new translation json file.
This gives you the possibility to send the translations to some translators.
Or if you're working with a translation management system you can just [synchronize the files with a cli](https://github.com/locize/react-tutorial#use-the-locize-cli).


### Better translation management <a name="better-translation-management"></a>

By sending the translations to some translators or translator agency you have more control and a direct contact with them. But this also means more work for you.
This is a traditional way. But be aware sending files around creates always an overhead.

> Does a better option exist?

#### For sure! <a name="for-sure"></a>

i18next helps to get the application translated, and this is great - but there is more to it.
- How do you integrate any translation services / agency?
- How do you keep track of new or removed content?
- How do you handle proper versioning?
- How do you deploy translation changes without deploying your complete application?
- and a lot more...

**Looking for something like this❓**

- [Easy to integrate](https://docs.locize.com/integration/instrumenting-your-code#i-18-next)
- Continuous deployment? [Continuous localization](https://locize.com/how-it-works.html#continouslocalization)!
- Manage the translation files with ease
- [Order professional translations](https://docs.locize.com/guides-tips-and-tricks/working-with-translators/localistars)
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

```html
<!-- ... -->
<script src="https://cdn.jsdelivr.net/npm/i18next-locize-backend@4.2.8/i18nextLocizeBackend.min.js"></script>
<!-- ... -->
```

After having imported the translations to locize, delete the `locales` folder and adapt the `i18n.js` file to use the i18next-locize-backend and make sure you copy the project-id and api-key from within your locize project:

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

[i18next-locize-backend](https://github.com/locize/i18next-locize-backend) offers a functionality to retrieve the available languages directly from locize, let's use it:

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

Now the translations are served directly from the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network). The jQuery i18n has now CDN superpower 😁.

#### save missing translations <a name="save-missing"></a>

Thanks to the use of the [saveMissing functionality](https://www.i18next.com/overview/configuration-options#missing-keys), new keys gets added to locize automatically, while developing the app.

Just pass `saveMissing: true` in the i18next options:

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

Each time you'll use a new key, it will be sent to locize, i.e.:

```javascript
<div data-i18n="new.key">this will be added automatically</div>
```

will result in locize like this:

![missing key](missing_key.jpg "locize © inweso GmbH")


#### 👀 but there's more... <a name="more"></a>

Thanks to the [locize-lastused](https://github.com/locize/locize-lastused) plugin, you'll be able to [find and filter in locize which keys are used or not used anymore](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

With the help of the [locize](https://github.com/locize/locize) plugin, you'll be able to use your app within the locize [InContext Editor](https://docs.locize.com/more/incontext-editor).

Lastly, with the help of the [auto-machinetranslation workflow](https://docs.locize.com/whats-inside/auto-machine-translation) and the use of the [saveMissing functionality](https://www.i18next.com/overview/configuration-options#missing-keys), new keys not only gets added to locize automatically, while developing the app, but are also automatically translated into the target languages using machine translation.

*Check out this [video](https://youtu.be/VfxBpSXarlU) to see how the automatic machine translation workflow looks like!*

{% youtube VfxBpSXarlU %}

```html
<!-- ... -->
<script src="https://cdn.jsdelivr.net/npm/locize-lastused@3.0.13/locizeLastUsed.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/locize@2.2.4/locize.min.js"></script>
<!-- ... -->
```

use them in `i18n.js`:

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

[Automatic machine translation](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key auto](missing_key_auto_mt.jpg "locize © inweso GmbH")

[Last used translations filter]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](last_used.jpg "locize © inweso GmbH")

[InContext Editor](https://docs.locize.com/more/incontext-editor):

![i18next incontext](in_context.jpg "locize © inweso GmbH")


Now, during development, you'll continue to save missing keys and to make use of `lastused` feature.

And in production environment, you should disable or remove the `saveMissing` and `lastused` functionality, and also the api-key should not exposed.


[Caching](https://docs.locize.com/more/caching):

![i18next caching](caching.jpg "locize © inweso GmbH")

[Merging versions](https://docs.locize.com/more/versioning#merging-versions):

![overwrite version](overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 The complete code can be found [here](https://github.com/i18next/jquery-i18next/tree/master/example/landing).*

*Check also the [code integration part](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in this [YouTube video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

There's also an [i18next crash course video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


## 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about [i18next](https://www.i18next.com), [jQuery localization](https://github.com/i18next/jquery-i18next) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth trying the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So by using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

## 👍
