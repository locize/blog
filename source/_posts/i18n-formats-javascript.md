title: I18N in the Multiverse of Formats
date: 2022-02-18
tags:
  - internationalization
  - i18n
  - localization
  - l10n
  - i18next
categories:
  - Post
thumbnail: i18n-multiverse/i18n_in_the_multiverse_of_madness.jpg
redirect_from:
- /i18n-multiverse
---

![](i18n_in_the_multiverse_of_madness.jpg "I18N in the Multiverse of Madness")

*Every night... I dream the same dream. And then... the nightmare begins.*
<br />
*I do what I have to do... to protect i18n.*
<br />
*With this blog post I open a doorway between universes, and I don't know who or what will walk through it...*


>What do you know about the i18n format multiverse?

Some folks have their theories... they believe it is dangerous.
<br />
I think they are right... but I want you at least to know that other parallel universes exist and what they look like.


### Clarification

There are far more i18n formats than the ones I am listing here.
In order not to get lost in the madness of the infinite i18n format universes, I limit myself here to the first eight formats used in the JavaScript ecosystem that I was able to find.

To define some sort of sorting, the formats are listed based on their weekly [downloads](https://www.npmtrends.com/i18next-vs-intl-messageformat-vs-vue-i18n-vs-i18n-js-vs-node-polyglot-vs-jed-vs-fbt-vs-@fluent/bundle):
![](npmtrends.jpg)


* [i18next](#i18next)
* [ICU Message Format](#icu)
* [vue-i18n](#vue-i18n)
* [i18n-js](#i18n-js)
* [Polyglot.js](#polyglot)
* [Gettext](#gettext)
* [FBT](#fbt)
* [Fluent](#fluent)


## i18next <a name="i18next"></a>

One of the most popular i18n format is the one used by the i18n framework [i18next](https://www.i18next.com).
<br />
It is usually a [JSON based format](https://www.i18next.com/misc/json-format) with ability to do [plurals](https://www.i18next.com/translation-function/plurals) (also for languages with [multiple plural forms](https://www.i18next.com/translation-function/plurals#languages-with-multiple-plurals)), [context](https://www.i18next.com/translation-function/context), [interpolation](https://www.i18next.com/translation-function/interpolation), [formatting](https://www.i18next.com/translation-function/formatting), [nesting](https://www.i18next.com/translation-function/nesting) and more.

Let's imagine, we would like to show these text based on how many of which dessert I would like to eat:

- I would like to eat a cake.
- I would like to eat 3 muffins.
- I would like to eat something.

So we can choose to eat what and how much to eat.

With this format it would look like this:
```json
{
  "dessert_cake_one": "I would like to eat a cake.",
  "dessert_muffin_one": "I would like to eat a muffin.",
  "dessert_cake_other": "I would like to eat {{count}} cakes.",
  "dessert_muffin_other": "I would like to eat {{count}} muffins.",
  "dessert": "I would like to eat something."
}
```

And the instrumented code may look like this *(may differ, based on your chosen technology)*:
```js
i18next.t('dessert', { context: 'cake', count: 1 }) // -> "I would like to eat a cake."
i18next.t('dessert', { context: 'muffin', count: 1 }) // -> "I would like to eat a muffin."
i18next.t('dessert', { context: 'cake', count: 5 }) // -> "I would like to eat 5 cakes."
i18next.t('dessert', { context: 'muffin', count: 5 }) // -> "I would like to eat 5 muffins."
i18next.t('dessert') // -> "I would like to eat something."
```

You see the translation key remains the same for each invocation, and the `context` and `count` option differs.

btw: for a languages with multiple plural forms, the instrumented code keeps as is, but the translation json would be different.
<br />
This is an "englishified" example for Arabic plural rules *(so most people can read it)*:
<br />
*The [plural rule](https://unicode-org.github.io/cldr-staging/charts/37/supplemental/language_plural_rules.html) for arabic is like this:*

| plural form | example count |
|---|---|
| zero | 0 |
| one | 1 |
| two | 2 |
| few | 3-10, 103-110, 1003, … |
| many | 11-26, 111, 1011, … |
| other | 100-102, 200-202, 300-302, 400-402, 500-502, 600, 1000, 10000, 100000, 1000000, … |

```json
{
  "dessert_cake_zero": "I would like to eat no cake.",
  "dessert_muffin_zero": "I would like to eat no muffin.",
  "dessert_cake_one": "I would like to eat a cake.",
  "dessert_muffin_one": "I would like to eat a muffin.",
  "dessert_cake_two": "I would like to eat two cakes.",
  "dessert_muffin_two": "I would like to eat two muffins.",
  "dessert_cake_few": "I would like to eat a few cakes.",
  "dessert_muffin_few": "I would like to eat a few muffins.",
  "dessert_cake_many": "I would like to eat many cakes.",
  "dessert_muffin_many": "I would like to eat many muffins.",
  "dessert_cake_other": "I would like to eat {{count}} cakes.",
  "dessert_muffin_other": "I would like to eat {{count}} muffins.",
  "dessert": "I would like to eat something."
}
```

```js
i18next.t('dessert', { context: 'cake', count: 1 }) // -> "I would like to eat a cake."
i18next.t('dessert', { context: 'muffin', count: 2 }) // -> "I would like to eat two muffins."
i18next.t('dessert', { context: 'cake', count: 5 }) // -> "I would like to eat a few cakes."
i18next.t('dessert', { context: 'muffin', count: 13 }) // -> "I would like to eat many muffins."
i18next.t('dessert', { context: 'cake', count: 100 }) // -> "I would like to eat 100 cakes."
i18next.t('dessert') // -> "I would like to eat something."
```

With nesting we can also reduce the repetitions:
```json
{
  "eat": "I would like to eat",
  "dessert_cake_one": "$t(eat) a cake.",
  "dessert_muffin_one": "$t(eat) a muffin.",
  "dessert_cake_other": "$t(eat) {{count}} cakes.",
  "dessert_muffin_other": "$t(eat) {{count}} muffins.",
  "dessert": "$t(eat) something."
}
```
But it may be that the translators like this nesting substitution less.


## ICU Message Format <a name="icu"></a>

The second format is the [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/).
<br />
There are multiple JavaScript modules implementing the ICU message syntax. One of the most used is [intl-messageformat](https://formatjs.io/docs/core-concepts/icu-syntax/) by [Format.js](https://formatjs.io). It is used behind the scenes also in [react-intl](https://formatjs.io/docs/react-intl).

It is also a key/value based format that could be stored in a JSON or however you like:
```js
import { createIntl } from '@formatjs/intl'

const intl = createIntl({
  locale: 'en',
  messages: {
    dessert: `I would like to eat {what, select,
      cake {{count, plural,
        one {a cake}
        other {{count} cakes}
      }}
      muffin {{count, plural,
        one {a muffin}
        other {{count} muffins}
      }}
      other {something}
    }.`,
  },
})
```

It also offers plural and select, and the instrumented code may look like this *(may differ, based on your chosen technology)*:
<br />
Compared to the previous format, this one uses only 1 key to generate all variations. So the value may look a bit more complex.

```js
intl.formatMessage({ id: 'dessert' }, { what: 'cake', count: 1 }) // -> "I would like to eat a cake."
intl.formatMessage({ id: 'dessert' }, { what: 'muffin', count: 1 }) // -> "I would like to eat a muffin."
intl.formatMessage({ id: 'dessert' }, { what: 'cake', count: 5 }) // -> "I would like to eat 5 cakes."
intl.formatMessage({ id: 'dessert' }, { what: 'muffin', count: 5 }) // -> "I would like to eat 5 muffins."
intl.formatMessage({ id: 'dessert' }, { what: undefined }) // -> "I would like to eat something."
```

Also here the translation key remains the same for each invocation, and the context and count option differs.


## vue-i18n <a name="vue-i18n"></a>

The next found format, while exploring the multiverse, is the [vue-i18n format](https://kazupon.github.io/vue-i18n/guide/messages.html#structure). It is used practically only in the [vue-i18n](https://kazupon.github.io/vue-i18n/) framework itself.
<br />
It is also able to do some [interpolation with formatting](https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting), [pluralization](https://kazupon.github.io/vue-i18n/guide/pluralization.html) and more. But a context feature is missing.

This is how our example would look like:

```js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  fallbackLocale: 'en',
  messages: {
    en: {
      dessert_cake: 'I would like to eat a cake. | I would like to eat {count} cakes.',
      dessert_muffin: 'I would like to eat a muffin. | I would like to eat {count} muffins.',
      dessert: 'I would like to eat something.'
    }
  }
})
```

And the corresponding invocation:
```js
$t('dessert_cake', { count: 1 }) // -> "I would like to eat a cake."
$t('dessert_muffin', { count: 1 }) // -> "I would like to eat a muffin."
$t('dessert_cake', { count: 5 }) // -> "I would like to eat 5 cakes."
$t('dessert_muffin', { count: 5 }) // -> "I would like to eat 5 muffins."
$t('dessert') // -> "I would like to eat something."
```

Compared the the previous formats, this one needs to change the translation key to accomplish a context like feature.


## i18n-js <a name="i18n-js"></a>

The origin of this format start Ruby. The [i18n-js format](https://www.npmjs.com/package/i18n-js) is a direct export of translations defined by [Ruby on Rails](https://guides.rubyonrails.org/i18n.html).
<br />
To export the translations, a [Ruby gem](https://github.com/fnando/i18n-js) can be used, that's completely disconnected from Rails and that can be used for the solely purpose of exporting the translations, even if your project is written in a different language.
<br />
For JavaScript there's a companion JavaScript [package](https://www.npmjs.com/package/i18n-js).
It comes bundled with all base translations made available by [rails-i18n](https://github.com/svenfuchs/rails-i18n/tree/master/rails/locale). Base translations allow formatting date, numbers, and sentence connectors, among other things.

The used JSON based format will look like this:

```json
{
  "dessert_cake": {
    "one": "I would like to eat a cake.",
    "other": "I would like to eat %{count} cakes."
  },
  "dessert_muffin": {
    "one": "I would like to eat a muffin.",
    "other": "I would like to eat %{count} muffins."
  },
  "dessert": "I would like to eat something."
}
```

The pluralization keys are organiized nested under the normal translation key.

And the corresponding invocation:
```js
i18n.t('dessert_cake', { count: 1 }); // -> "I would like to eat a cake."
i18n.t('dessert_muffin', { count: 1 }); // -> "I would like to eat a muffin."
i18n.t('dessert_cake', { count: 5 }); // -> "I would like to eat 5 cakes."
i18n.t('dessert_muffin', { count: 5 }); // -> "I would like to eat 5 muffins."
i18n.t('dessert'); // -> "I would like to eat something."
```

Also this format needs to change the translation key to accomplish a context like feature.


## Polyglot.js <a name="polyglot"></a>

This older format provides a solution for interpolation and pluralization, based off of [Airbnb](https://www.airbnb.com)’s experience.
<br />
[Polyglot.js](https://airbnb.io/polyglot.js/) adds basic i18n functionality to Airbnb's Backbone.js and Node.js apps.

This format uses only 3 keys, but...

```json
{
  "dessert_cake": "I would like to eat a cake. |||| I would like to eat %{smart_count} cakes.",
  "dessert_muffin": "I would like to eat a muffin. |||| I would like to eat %{smart_count} muffins.",
  "dessert": "I would like to eat something."
}
```

The plural forms are merged in a single value separated by the delimiter `||||` *(4 vertical pipe characters)*.

And the corresponding invocation:
```js
polyglot.t('dessert_cake', { smart_count: 1 }) // -> "I would like to eat a cake."
polyglot.t('dessert_muffin', { smart_count: 1 }) // -> "I would like to eat a muffin."
polyglot.t('dessert_cake', { smart_count: 5 }) // -> "I would like to eat 5 cakes."
polyglot.t('dessert_muffin', { smart_count: 5 }) // -> "I would like to eat 5 muffins."
polyglot.t('dessert') // -> "I would like to eat something."
```

Also this format needs to change the translation key to accomplish a context like feature.


## Gettext <a name="gettext"></a>

[Gettext](http://www.gnu.org/software/gettext/) is a very old translation standard. There are implementations of Gettext in a lot of programming languages.
<br />
[Jed](https://messageformat.github.io/Jed/) is one of the most used gettext implementations for JavaScript. Jed doesn't include a Gettext file parser, but several third-party parsers exist that can have their output adapted for Jed.

So an original Gettext po format...

```txt
msgid ""
msgstr ""
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"lang: en\n"
"plural_forms: nplurals=2; plural=(n != 1);\n"

#: 
msgid "dessert"
msgstr "I would like to eat something."

#: 
msgctxt "cake"
msgid "dessert"
msgid_plural "I would like to eat %d cakes."
msgstr[0] "I would like to eat a cake."
msgstr[1] "I would like to eat %d cakes."

#: 
msgctxt "muffin"
msgid "dessert"
msgid_plural "I would like to eat %d muffins."
msgstr[0] "I would like to eat a muffin."
msgstr[1] "I would like to eat %d muffins."
```

...would look like this when used in Jed:

```js
const i18n = new Jed({
  locale_data: {
    messages: {
      "": {
        domain: "messages",
        lang: "en",
        plural_forms: "nplurals=2; plural=(n != 1);"
      },

      "cake\u0004dessert": [
        "I would like to eat a cake.",
        "I would like to eat %d cakes."
      ],
      "muffin\u0004dessert": [
        "I would like to eat a muffin.",
        "I would like to eat %d muffins."
      ],
      dessert: ["I would like to eat something."]
    }
  }
})
```

Not very intuitive, but it works.

```js
i18n.translate('dessert').withContext('cake').fetch() // -> "I would like to eat a cake."
i18n.translate('dessert').withContext('muffin').fetch() // -> "I would like to eat a muffin."
i18n.translate('dessert').withContext('cake').ifPlural(5).fetch(5) // -> "I would like to eat 5 cakes."
i18n.translate('dessert').withContext('muffin').ifPlural(5).fetch(5) // -> "I would like to eat 5 muffins."
i18n.translate('dessert').fetch() // -> "I would like to eat something."
```

This format offers, pluralization, interpolation and a context feature, but a strange API in my opinion.


## FBT <a name="fbt"></a>

Of all the formats encountered in the i18n multiverse, this format is arguably the most distant universe, or should I say: most distant "metaverse" ;-)
<br />
[FBT](https://facebook.github.io/fbt/) is invented, used and maintained by [Facebook](https://www.facebook.com).
<br />
It is... special. It comes with text extraction and at the center are not the translations but your code.

So first you need to instrument your code:
```jsx
<fbt desc="eating cake">
  I would like to eat
  <fbt:plural
    count={1}
    name="number of cakes"
    showCount="ifMany"
    many="cakes">
    a cake
  </fbt:plural>.
</fbt> <!-- "I would like to eat a cake." -->
<fbt desc="eating muffin">
  I would like to eat
  <fbt:plural
    count={5}
    name="number of muffins"
    showCount="ifMany"
    many="muffins">
    a muffin
  </fbt:plural>.
</fbt> <!-- "I would like to eat 5 muffins." -->
<fbt desc="eating something">
  I would like to eat something.
</fbt> <!-- "I would like to eat something." -->
```

Run some scripts, and then you can use the prepared translation files:
```json
{
  "fb-locale": "en",
  "translations": {
    "bxFNG7FeHhfvzOcxJ4WpXA==": {
      "tokens": [],
      "translations": [
        {
          "translation": "I would like to eat {number of cakes} cakes.",
          "variations": {}
        }
      ],
      "types": []
    },
    "1kfdpAZKBoeV6P/6/jU9BQ==": {
      "tokens": [],
      "translations": [
        {
          "translation": "I would like to eat a cake.",
          "variations": {}
        }
      ],
      "types": []
    },
    "Yglr/cfclqA86jmKXJXtjg==": {
      "tokens": [],
      "translations": [
        {
          "translation": "I would like to eat {number of muffins} muffins.",
          "variations": {}
        }
      ],
      "types": []
    },
    "Ic2KkQ3gBr6AUcgtsH576g==": {
      "tokens": [],
      "translations": [
        {
          "translation": "I would like to eat a muffin.",
          "variations": {}
        }
      ],
      "types": []
    },
    "r2YYz0TzAkH0b0TSwFMEAw==": {
      "tokens": [],
      "translations": [
        {
          "translation": "I would like to eat something.",
          "variations": {}
        }
      ],
      "types": []
    }
  }
}
```

Each instrumented code part is mapped with a hash to the translations.
<br />
Like said... it's really different then all other formats.


## Fluent <a name="fluent"></a>

The last format in this multiverse trip is [Fluent](https://projectfluent.org) a [Mozilla](https://mozilla.org) project.
<br />
The Fluent format shares a lot of philosophy that drove the design of [ICU Message Format](#icu).

It's also a key/value based format:
```js
import { FluentBundle, FluentResource } from "@fluent/bundle";

const resource = new FluentResource(`
dessert =
  I would like to eat 
  {$toEat ->
    [cake] {$count ->
      [one] a cake
     *[other] {$count} cakes
    }
    [muffin] {$count ->
      [one] a muffin
     *[other] {$count} muffins
    }
   *[other] something
  }.
`)

const bundle = new FluentBundle('en')
bundle.addResource(resource)

bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: 'cake', count: 1 }) // -> "I would like to eat a cake."
bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: 'muffin', count: 1 }) // -> "I would like to eat a muffin."
bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: 'cake', count: 5 }) // -> "I would like to eat 5 cakes."
bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: 'muffin', count: 5 }) // -> "I would like to eat 5 muffins."
bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: '' }) // -> "I would like to eat something."
```

Like [ICU Message Format](#icu) it uses only 1 key to generate all variations. So the value may look a bit more complex, like language on its own.


# Coming back home

![](portal.jpg)

We looked through the portals of the i18n multiverse and got a few small first impressions about the various formats.
<br />
Some are very similar and some others are really different. In the end it's a matter of taste.
<br />
Which format do you feel comfortable with?

The most important thing is that all team members are comfortable with it, and that all tools in the localization process supports that format.
<br />
So choose your translation management system (TMS) carefully.

Looking at the [history](https://www.i18next.com/misc/the-history-of-i18next) of the currently most used i18n format, we can see the the creators of [i18next](#i18next) are also the founders of a great [translation management system](https://locize.com).
<br />
So with choosing [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).
<br />
➡️ [i18next](https://www.i18next.com) + [locize](https://locize.com) = true [continuous localization](https://locize.com/how-it-works.html#continouslocalization)

Watch the demo [video](https://youtu.be/ds-yEEYP1Ks) to learn more:
{% youtube ds-yEEYP1Ks %}
