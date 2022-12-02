---
title: I18N im Multiversum der Formate
description: Ein schöner Überblick über die verfügbaren i18n-Formate für JavaScript.
date: 2022-02-18

tags:
  - internationalization
  - i18n
  - localization
  - l10n
  - i18next
thumbnail: i18n-formats-javascript/i18n_in_the_multiverse_of_madness.jpg

label: i18n-formats-javascript
lang: de
hidden: true
---

![](../i18n-formats-javascript/i18n_in_the_multiverse_of_madness.jpg "I18N im Multiversum der Formate")

*Jede Nacht... träume ich denselben Traum. Und dann... beginnt der Alptraum.*
<br />
*Ich tue, was ich tun muss ... um i18n zu schützen.*
<br />
*Mit diesem Blogbeitrag öffne ich eine Tür zwischen Universen, und ich weiss nicht, wer oder was durch sie gehen wird...*


>Was wissen Sie über das i18n-Format-Multiversum?

Manche Leute haben ihre Theorien... sie glauben, dass es gefährlich ist.
<br />
Ich denke, sie haben Recht ... aber ich möchte, dass Sie zumindest wissen, dass andere Paralleluniversen existieren und wie sie aussehen.


## Klarstellung

Es gibt weitaus mehr i18n-Formate als diejenigen, welche ich hier aufliste.
Um mich nicht im Wahnsinn der unendlichen i18n-Format-Universen zu verlieren, beschränke ich mich hier auf die ersten acht Formate, die im JavaScript-Ökosystem verwendet werden und die ich finden konnte.

Um eine Art Sortierung zu definieren, werden die Formate basierend auf ihren wöchentlichen [Downloads](https://www.npmtrends.com/i18next-vs-intl-messageformat-vs-vue-i18n-vs-i18n-js-vs-node-polyglot-vs-jed-vs-fbt-vs-@fluent/bundle) aufgelistet:
![](../i18n-formats-javascript/npmtrends.jpg)


* [i18next](#i18next)
* [ICU Message Format](#icu)
* [vue-i18n](#vue-i18n)
* [i18n-js](#i18n-js)
* [Polyglot.js](#polyglot)
* [Gettext](#gettext)
* [FBT](#fbt)
* [Fluent](#fluent)


# i18next <a name="i18next"></a>

Eines der beliebtesten i18n-Formate wird vom i18n-Framework [i18next] verwendet.(https://www.i18next.com).
<br />
Es ist normalerweise ein [JSON-basiertes Format](https://www.i18next.com/misc/json-format) mit der Fähigkeit, [Plurale](https://www.i18next.com/translation-function/plurals) zu behandeln (auch für Sprachen mit [mehreren Pluralformen](https://www.i18next.com/translation-function/plurals#languages-with-multiple-plurals)), [Kontext](https://www.i18next.com/translation-function/context), [Interpolation](https://www.i18next.com/translation-function/interpolation), [Formate](https://www.i18next.com/translation-function/formatting), [Verschachtelungen](https://www.i18next.com/translation-function/nesting) und mehr.

Stellen wir uns vor, wir möchten diesen Text basierend darauf anzeigen, wie viel von welchem Dessert ich essen möchte:

- Ich möchte einen Kuchen essen.
- Ich möchte 3 Muffins essen.
- Ich würde gerne etwas essen.

So können wir entscheiden, was und wie viel wir essen.

With this format it would look like this:
```json
{
  "dessert_cake_one": "Ich möchte einen Kuchen essen.",
  "dessert_muffin_one": "Ich möchte einen Muffin essen.",
  "dessert_cake_other": "Ich möchte {{count}} Kuchen essen.",
  "dessert_muffin_other": "Ich möchte {{count}} Muffins essen.",
  "dessert": "Ich würde gerne etwas essen."
}
```

Und der instrumentierte Code kann so aussehen *(kann je nach gewählter Technologie abweichen)*:
```js
i18next.t('dessert', { context: 'cake', count: 1 }) // -> "Ich möchte einen Kuchen essen."
i18next.t('dessert', { context: 'muffin', count: 1 }) // -> "Ich möchte einen Muffin essen."
i18next.t('dessert', { context: 'cake', count: 5 }) // -> "Ich möchte 5 Kuchen essen."
i18next.t('dessert', { context: 'muffin', count: 5 }) // -> "Ich möchte 5 Muffins essen."
i18next.t('dessert') // -> "Ich würde gerne etwas essen."
```

Sie sehen, dass der Übersetzungsschlüssel für jeden Aufruf gleich bleibt und die Optionen `context` und `count` unterschiedlich sind.

Übrigens: Für Sprachen mit mehreren Pluralformen bleibt der instrumentierte Code unverändert, aber die Übersetzung im json wäre anders.
<br />
Dies ist ein "deutschifiziertes" Beispiel für arabische Pluralregeln *(damit die meisten Leute es lesen können)*:
<br />
*Die [Pluralregel](https://unicode-org.github.io/cldr-staging/charts/37/supplemental/language_plural_rules.html) für Arabisch lautet wie folgt:*

| Pluralform | Beispiel Anzahl |
|---|---|
| zero | 0 |
| one | 1 |
| two | 2 |
| few | 3-10, 103-110, 1003, … |
| many | 11-26, 111, 1011, … |
| other | 100-102, 200-202, 300-302, 400-402, 500-502, 600, 1000, 10000, 100000, 1000000, … |

```json
{
  "dessert_cake_zero": "Ich möchte keinen Kuchen essen.",
  "dessert_muffin_zero": "Ich möchte keinen Muffin essen.",
  "dessert_cake_one": "Ich möchte einen Kuchen essen.",
  "dessert_muffin_one": "Ich möchte einen Muffin essen.",
  "dessert_cake_two": "Ich möchte zwei Kuchen essen.",
  "dessert_muffin_two": "Ich möchte zwei Muffins essen.",
  "dessert_cake_few": "Ich möchte ein paar Kuchen essen.",
  "dessert_muffin_few": "Ich möchte ein paar Muffins essen.",
  "dessert_cake_many": "Ich möchte viele Kuchen essen.",
  "dessert_muffin_many": "Ich möchte viele Muffins essen.",
  "dessert_cake_other": "Ich möchte {{count}} Kuchen essen.",
  "dessert_muffin_other": "Ich möchte {{count}} Muffins essen.",
  "dessert": "Ich würde gerne etwas essen."
}
```

```js
i18next.t('dessert', { context: 'cake', count: 1 }) // -> "Ich möchte einen Kuchen essen."
i18next.t('dessert', { context: 'muffin', count: 2 }) // -> "Ich möchte zwei Muffins essen."
i18next.t('dessert', { context: 'cake', count: 5 }) // -> "Ich möchte ein paar Kuchen essen."
i18next.t('dessert', { context: 'muffin', count: 13 }) // -> "Ich möchte viele Muffins essen."
i18next.t('dessert', { context: 'cake', count: 100 }) // -> "Ich möchte 100 Kuchen essen."
i18next.t('dessert') // -> "Ich würde gerne etwas essen."
```

Mit Verschachtelung können wir auch die Wiederholungen reduzieren:
```json
{
  "eat": "Ich würde gerne",
  "dessert_cake_one": "$t(eat) einen Kuchen essen.",
  "dessert_muffin_one": "$t(eat) ein Muffin essen.",
  "dessert_cake_other": "$t(eat) {{count}} Kuchen essen.",
  "dessert_muffin_other": "$t(eat) {{count}} Muffins essen.",
  "dessert": "$t(eat) etwas essen."
}
```
Aber es kann sein, dass die Übersetzer diese Verschachtelungssubstitution weniger mögen.


# ICU Message Format <a name="icu"></a>

Das zweite Format ist das [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/).
<br />
Es gibt mehrere JavaScript-Module, welche die ICU Message Format Syntax implementieren. Eines der am häufigsten verwendeten ist [intl-messageformat](https://formatjs.io/docs/core-concepts/icu-syntax/) von [Format.js](https://formatjs.io). Es wird hinter den Kulissen auch in [react-intl](https://formatjs.io/docs/react-intl) verwendet.

Es ist auch ein Schlüssel/Wert-basiertes Format, welches in einem JSON gespeichert werden kann oder wie Sie auch immer möchten:
```js
import { createIntl } from '@formatjs/intl'

const intl = createIntl({
  locale: 'de',
  messages: {
    dessert: `Ich möchte {what, select,
      cake {{count, plural,
        one {einen Kuchen}
        other {{count} Kuchen}
      }}
      muffin {{count, plural,
        one {ein Muffin}
        other {{count} Muffins}
      }}
      other {etwas}
    } essen.`,
  },
})
```

Es bietet auch Plural und Select, und der instrumentierte Code kann wie folgt aussehen *(kann je nach gewählter Technologie abweichen)*:
<br />
Im Vergleich zum vorherigen Format verwendet dieses nur 1 Schlüssel, um alle Variationen zu generieren. Der Wert kann also etwas komplexer aussehen.

```js
intl.formatMessage({ id: 'dessert' }, { what: 'cake', count: 1 }) // -> "Ich möchte einen Kuchen essen."
intl.formatMessage({ id: 'dessert' }, { what: 'muffin', count: 1 }) // -> "Ich möchte einen Muffin essen."
intl.formatMessage({ id: 'dessert' }, { what: 'cake', count: 5 }) // -> "Ich möchte 5 Kuchen essen."
intl.formatMessage({ id: 'dessert' }, { what: 'muffin', count: 5 }) // -> "Ich möchte 5 Muffins essen."
intl.formatMessage({ id: 'dessert' }, { what: undefined }) // -> "Ich möchte etwas essen."
```

Auch hier bleibt der Übersetzungsschlüssel für jeden Aufruf gleich, und die Kontext- und Zähloption ist unterschiedlich.


# vue-i18n <a name="vue-i18n"></a>

Das nächste gefundene Format beim Erkunden des Multiversums ist das [vue-i18n-Format](https://kazupon.github.io/vue-i18n/guide/messages.html#structure). Es wird praktisch nur im Framework [vue-i18n](https://kazupon.github.io/vue-i18n/) selbst verwendet.
<br />
Es ist auch in der Lage [Interpolation mit Formatierung](https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting) anzubieten, [Plurale](https://kazupon.github.io/vue-i18n/guide/pluralization.html) und anderes. Aber eine Kontextfunktion fehlt.

So würde unser Beispiel aussehen:

```js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  fallbackLocale: 'de',
  messages: {
    en: {
      dessert_cake: 'Ich möchte einen Kuchen essen. | Ich möchte {count} Kuchen essen.',
      dessert_muffin: 'Ich möchte einen Muffin essen. | Ich möchte {count} Muffins essen.',
      dessert: 'Ich würde gerne etwas essen.'
    }
  }
})
```

And the corresponding invocation:
```js
$t('dessert_cake', { count: 1 }) // -> "Ich möchte einen Kuchen essen."
$t('dessert_muffin', { count: 1 }) // -> "Ich möchte einen Muffin essen."
$t('dessert_cake', { count: 5 }) // -> "Ich möchte 5 Kuchen essen."
$t('dessert_muffin', { count: 5 }) // -> "Ich möchte 5 Muffins essen."
$t('dessert') // -> "Ich würde gerne etwas essen."
```

Im Vergleich zu den vorherigen Formaten muss dieses den Übersetzungsschlüssel ändern, um eine kontextähnliche Funktion zu erreichen.


# i18n-js <a name="i18n-js"></a>

Der Ursprung dieses Formats ist in Ruby. Das [i18n-js-Format](https://www.npmjs.com/package/i18n-js) ist ein direkter Export von Übersetzungen, welche von [Ruby on Rails](https://guides.rubyonrails.org/i18n.html).
<br />
Zum Exportieren der Übersetzungen kann ein [Ruby Gem](https://github.com/fnando/i18n-js) verwendet werden, das vollständig von Rails getrennt ist und ausschliesslich zum Exportieren der Übersetzungen verwendet werden kann, auch wenn Ihr Projekt in einer anderen Sprache geschrieben ist.
<br />
Für JavaScript gibt es ein begleitendes JavaScript-[Paket](https://www.npmjs.com/package/i18n-js).
Es wird mit allen Basisübersetzungen geliefert, welche von [rails-i18n](https://github.com/svenfuchs/rails-i18n/tree/master/rails/locale) zur Verfügung gestellt werden. Basisübersetzungen ermöglichen unter anderem die Formatierung von Datum, Zahlen und Satzkonnektoren.

Das verwendete JSON-basierte Format sieht folgendermassen aus:

```json
{
  "dessert_cake": {
    "one": "Ich möchte einen Kuchen essen.",
    "other": "Ich möchte %{count} Kuchen essen."
  },
  "dessert_muffin": {
    "one": "Ich möchte einen Muffin essen.",
    "other": "Ich möchte %{count} Muffins essen."
  },
  "dessert": "Ich würde gerne etwas essen."
}
```

Die Pluralisierungsschlüssel sind unter dem normalen Übersetzungsschlüssel verschachtelt organisiert.

Und der entsprechende Aufruf:
```js
i18n.t('dessert_cake', { count: 1 }); // -> "Ich möchte einen Kuchen essen."
i18n.t('dessert_muffin', { count: 1 }); // -> "Ich möchte einen Muffin essen."
i18n.t('dessert_cake', { count: 5 }); // -> "Ich möchte 5 Kuchen essen."
i18n.t('dessert_muffin', { count: 5 }); // -> "Ich möchte 5 Muffins essen."
i18n.t('dessert'); // -> "Ich würde gerne etwas essen."
```

Auch dieses Format muss den Übersetzungsschlüssel ändern, um eine kontextähnliche Funktion zu erreichen.


# Polyglot.js <a name="polyglot"></a>

Dieses ältere Format bietet eine Lösung für Interpolation und Pluralisierung, basierend auf der Erfahrung von [Airbnb](https://www.airbnb.com).
<br />
[Polyglot.js](https://airbnb.io/polyglot.js/) fügt den Backbone.js- und Node.js-Apps von Airbnb grundlegende i18n-Funktionen hinzu.

Dieses Format verwendet nur 3 Schlüssel, aber...

```json
{
  "dessert_cake": "Ich möchte einen Kuchen essen. |||| Ich möchte %{smart_count} Kuchen essen.",
  "dessert_muffin": "Ich möchte einen Muffin essen. |||| Ich möchte %{smart_count} Muffins essen.",
  "dessert": "Ich würde gerne etwas essen."
}
```

Die Pluralformen werden zu einem einzigen Wert zusammengefasst, welcher durch das Trennzeichen `||||` *(4 senkrechte Striche)* getrennt ist.

Und der entsprechende Aufruf:
```js
polyglot.t('dessert_cake', { smart_count: 1 }) // -> "Ich möchte einen Kuchen essen."
polyglot.t('dessert_muffin', { smart_count: 1 }) // -> "Ich möchte einen Muffin essen."
polyglot.t('dessert_cake', { smart_count: 5 }) // -> "Ich möchte 5 Kuchen essen."
polyglot.t('dessert_muffin', { smart_count: 5 }) // -> "Ich möchte 5 Muffins essen."
polyglot.t('dessert') // -> "Ich würde gerne etwas essen."
```

Auch dieses Format muss den Übersetzungsschlüssel ändern, um eine kontextähnliche Funktion zu erreichen.


# Gettext <a name="gettext"></a>

[Gettext](http://www.gnu.org/software/gettext/) ist ein sehr alter Übersetzungsstandard. Es gibt Implementierungen von Gettext in vielen Programmiersprachen.
<br />
[Jed](https://messageformat.github.io/Jed/) ist eine der am häufigsten verwendeten gettext-Implementierungen für JavaScript. Jed enthält keinen Gettext-Dateiparser, aber es gibt mehrere Parser von Drittanbietern, deren Ausgabe für Jed angepasst werden kann.

Also ein originales Gettext po Format...

```txt
msgid ""
msgstr ""
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"lang: de\n"
"plural_forms: nplurals=2; plural=(n != 1);\n"

#: 
msgid "dessert"
msgstr "Ich würde gerne etwas essen."

#: 
msgctxt "cake"
msgid "dessert"
msgid_plural "Ich möchte %d Kuchen essen."
msgstr[0] "Ich möchte einen Kuchen essen."
msgstr[1] "Ich möchte %d Kuchen essen."

#: 
msgctxt "muffin"
msgid "dessert"
msgid_plural "Ich möchte %d Muffins essen."
msgstr[0] "Ich möchte einen Muffin essen."
msgstr[1] "Ich möchte %d Muffins essen."
```

...würde so aussehen, wenn es in Jed verwendet wird:

```js
const i18n = new Jed({
  locale_data: {
    messages: {
      "": {
        domain: "messages",
        lang: "de",
        plural_forms: "nplurals=2; plural=(n != 1);"
      },

      "cake\u0004dessert": [
        "Ich möchte einen Kuchen essen.",
        "Ich möchte %d Kuchen essen."
      ],
      "muffin\u0004dessert": [
        "Ich möchte einen Muffin essen.",
        "Ich möchte %d Muffins essen."
      ],
      dessert: ["Ich würde gerne etwas essen."]
    }
  }
})
```

Nicht sehr intuitiv, aber es funktioniert.

```js
i18n.translate('dessert').withContext('cake').fetch() // -> "Ich möchte einen Kuchen essen."
i18n.translate('dessert').withContext('muffin').fetch() // -> "Ich möchte einen Muffin essen."
i18n.translate('dessert').withContext('cake').ifPlural(5).fetch(5) // -> "Ich möchte 5 Kuchen essen."
i18n.translate('dessert').withContext('muffin').ifPlural(5).fetch(5) // -> "Ich möchte 5 Muffins essen."
i18n.translate('dessert').fetch() // -> "Ich würde gerne etwas essen."
```

Dieses Format bietet Pluralisierung, Interpolation und eine Kontextfunktion, aber meiner Meinung nach eine seltsame API.


# FBT <a name="fbt"></a>

Von allen im i18n-Multiversum anzutreffenden Formaten ist dieses Format wohl das am weitesten entfernte Universum, oder sollte ich sagen: das am weitesten entfernte "Metaversum" ;-)
<br />
[FBT](https://facebook.github.io/fbt/) wird von [Facebook](https://www.facebook.com) erfunden, verwendet und gepflegt.
<br />
Es ist... besonders. Es kommt mit Textextraktion und im Zentrum stehen nicht die Übersetzungen, sondern Ihr Code.

Also müssen Sie zuerst Ihren Code instrumentieren:
```jsx
<fbt desc="eating cake">
  Ich würde gerne
  <fbt:plural
    count={1}
    name="number of cakes"
    showCount="ifMany"
    many="cakes">
    einen Kuchen
  </fbt:plural> essen.
</fbt> <!-- "Ich möchte einen Kuchen essen." -->
<fbt desc="eating muffin">
  Ich würde gerne
  <fbt:plural
    count={5}
    name="number of muffins"
    showCount="ifMany"
    many="muffins">
    ein Muffin
  </fbt:plural> essen.
</fbt> <!-- "Ich möchte 5 Muffins essen." -->
<fbt desc="eating something">
  Ich würde gerne etwas essen.
</fbt> <!-- "Ich würde gerne etwas essen." -->
```

Führen Sie einige Skripte aus, und Sie können die vorbereiteten Übersetzungsdateien verwenden:
```json
{
  "fb-locale": "de",
  "translations": {
    "bxFNG7FeHhfvzOcxJ4WpXA==": {
      "tokens": [],
      "translations": [
        {
          "translation": "Ich möchte {number of cakes} Kuchen essen.",
          "variations": {}
        }
      ],
      "types": []
    },
    "1kfdpAZKBoeV6P/6/jU9BQ==": {
      "tokens": [],
      "translations": [
        {
          "translation": "Ich möchte einen Kuchen essen.",
          "variations": {}
        }
      ],
      "types": []
    },
    "Yglr/cfclqA86jmKXJXtjg==": {
      "tokens": [],
      "translations": [
        {
          "translation": "Ich möchte {number of muffins} Muffins essen.",
          "variations": {}
        }
      ],
      "types": []
    },
    "Ic2KkQ3gBr6AUcgtsH576g==": {
      "tokens": [],
      "translations": [
        {
          "translation": "Ich möchte einen Muffin essen.",
          "variations": {}
        }
      ],
      "types": []
    },
    "r2YYz0TzAkH0b0TSwFMEAw==": {
      "tokens": [],
      "translations": [
        {
          "translation": "Ich würde gerne etwas essen.",
          "variations": {}
        }
      ],
      "types": []
    }
  }
}
```

Jeder instrumentierte Codeteil wird mit einem Hash auf die Übersetzungen abgebildet.
<br />
Wie gesagt... es ist wirklich anders als alle anderen Formate.


# Fluent <a name="fluent"></a>

Das letzte Format dieser Multiversum-Reise ist [Fluent](https://projectfluent.org), ein [Mozilla](https://mozilla.org)-Projekt.
<br />
Das Fluent-Format teilt viele Philosophien, welche das Design von [ICU Message Format](#icu) vorangetrieben haben.

Es ist auch ein Schlüssel/Wert-basiertes Format:
```js
import { FluentBundle, FluentResource } from "@fluent/bundle";

const resource = new FluentResource(`
dessert =
  Ich möchte 
  {$toEat ->
    [cake] {$count ->
      [one] einen Kuchen
     *[other] {$count} Kuchen
    }
    [muffin] {$count ->
      [one] ein Muffin
     *[other] {$count} Muffins
    }
   *[other] etwas
  } essen.
`)

const bundle = new FluentBundle('de')
bundle.addResource(resource)

bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: 'cake', count: 1 }) // -> "Ich möchte einen Kuchen essen."
bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: 'muffin', count: 1 }) // -> "Ich möchte einen Muffin essen."
bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: 'cake', count: 5 }) // -> "Ich möchte 5 Kuchen essen."
bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: 'muffin', count: 5 }) // -> "Ich möchte 5 Muffins essen."
bundle.formatPattern(bundle.getMessage('dessert').value, { toEat: '' }) // -> "Ich möchte etwas essen."
```

Wie [ICU Message Format](#icu) verwendet es nur 1 Schlüssel, um alle Variationen zu generieren. Der Wert kann also etwas komplexer aussehen, wie eine eigenständige Sprache.


# Zurück nach Hause kommen

![](../i18n-formats-javascript/portal.jpg)

Wir haben die Portale des i18n-Multiversums durchforstet und ein paar kleine erste Eindrücke zu den verschiedenen Formaten gewonnen.
<br />
Einige sind sehr ähnlich und einige andere sind wirklich anders. Am Ende ist es Geschmackssache.
<br />
Mit welchem Format fühlen Sie sich wohl?

Das Wichtigste ist, dass alle Teammitglieder damit vertraut sind und dass alle Tools im Lokalisierungsprozess dieses Format unterstützen.
<br />
Wählen Sie Ihr Übersetzungsmanagementsystem (TMS) also sorgfältig aus.

Wenn wir uns die [Geschichte](https://www.i18next.com/misc/the-history-of-i18next) des derzeit am häufigsten verwendeten i18n-Formats ansehen, können wir sehen, dass die Schöpfer von [i18next](#i18next) auch die Gründer eines grossartigen [Übersetzungsmanagementsystems](https://locize.com) sind.
<br />
Mit der Wahl von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).
<br />
➡️ [i18next](https://www.i18next.com) + [locize](https://locize.com) = echte [kontinuierliche Lokalisierung](https://locize.com/how-it-works.html#continouslocalization)

Sehen Sie sich dieses [Video](https://youtu.be/ds-yEEYP1Ks) an, um mehr darüber zu erfahren:
{% youtube ds-yEEYP1Ks %}
