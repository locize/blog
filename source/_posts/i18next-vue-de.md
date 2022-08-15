---
title: Vue-Lokalisierung – Internationalisieren Sie mit i18next
description: Vue-Lokalisierung leicht gemacht dank dieser ✅ Schritt-für-Schritt-Anleitung mit i18next.

date: 2022-05-16
tags:
  - i18next
  - vue
  - i18next-vue
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
categories:
  - Post
thumbnail: i18next-vue/vue-localization.jpg

label: i18next-vue
lang: de
hidden: true
---

![Vue-Lokalisierung leicht gemacht dank dieser ✅ Schritt-für-Schritt-Anleitung mit i18next](../i18next-vue/vue-localization.jpg "Vue-Lokalisierungs-Beispiel")

Da [Vue.js](https://vuejs.org/) ein zugängliches, leistungsfähiges und vielseitiges Framework zum Erstellen von Web-Benutzeroberflächen ist, benötigt es auch eine erstklassige Internationalisierungslösung.
Sie kennen vielleicht [vue-i18n](../give-vue-i18n-more-superpowers/), aber für diejenigen, die bereits [i18next](https://www.i18next.com) kennen, ist eine an Vue.js angepasste Version von i18next besser geeignet.

In diesem Tutorial verwenden wir das Modul [i18next-vue](https://github.com/i18next/i18next-vue).


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
    - [Besseres Übersetzungsmanagement](#better-translation-management)
      - [Auf jeden Fall!](#for-sure)
      - [Wie sieht das aus?](#how-look)
      - [fehlende Übersetzungen speichern](#save-missing)
      - [👀 aber es gibt noch mehr...](#more)
      - [📦 Bereiten wir uns auf die Produktion vor 🚀](#production)
  * [🎉🥳 Herzliche Glückwünsche 🎊🎁](#congratulations)

# Also erstmal: "Warum i18next?" <a name="why-i18next"></a>

Wenn es um Vue-Lokalisierung geht, ist eines der beliebtesten Frameworks [i18next](https://www.i18next.com) mit seiner Vue-Erweiterung [i18next-vue](https://i18next.github.io/i18next-vue), und das aus guten Gründen:

*i18next wurde Ende 2011 erstellt. Es ist älter als die meisten Bibliotheken, die Sie heutzutage verwenden, einschliesslich Ihrer wichtigsten Frontend-Technologie ([React](../react-i18next-de/), [Angular](../angular-i18next/), Vue, ...).*
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

Stellen Sie sicher, dass Sie Node.js und npm installiert haben. Wenn Sie etwas Erfahrung mit einfachem HTML, JavaScript und grundlegendem Vue.js haben, ist es am besten, bevor Sie zu [i18next-vue](https://i18next.github.io/i18next-vue/) springen.


## Einstieg <a name="getting-started"></a>

Nehmen Sie Ihr eigenes Vue-Projekt oder erstellen Sie ein neues, neues, z. B. mit [dem Befehl vue create cli](https://cli.vuejs.org/guide/creating-a-project.html#vue-create).

`npx @vue/cli create vue-starter-project`

![lerne vue logo](../i18next-vue/app_0.jpg "locize © inweso GmbH")

Wir werden die App anpassen, um die Sprache gemäss den Vorlieben des Benutzers zu erkennen.
Und wir werden einen Sprachumschalter erstellen, um den Inhalt zwischen verschiedenen Sprachen zu ändern.

Lassen Sie uns einige i18next-Abhängigkeiten installieren:

- [i18next](https://www.i18next.com)
- [i18next-vue](https://github.com/i18next/i18next-vue)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

`npm install i18next i18next-vue i18next-browser-languagedetector`

Lassen Sie uns eine `i18n.js`-Datei vorbereiten:
```javascript
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
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
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```

Lassen Sie uns diese Datei in unsere `main.js`-Datei importieren:

```javascript
import { createApp } from 'vue'
import i18n from './i18n'
import App from './App.vue'

i18n(createApp(App)).mount('#app')
```

Lassen Sie uns nun versuchen, hartcodierten Text in die Übersetzungen zu verschieben.

Für den ersten Text verwenden wir einfach eine einfache `welcome`-Schlüssel, um direkt die `$t`-Funktion aufzurufen. Das `$t` ist mehr oder weniger dasselbe wie [`i18next.t`](https://www.i18next.com/overview/api#t).

Für den zweiten Text verwenden wir die [`v-html`-Direktive](https://vuejs.org/guide/essentials/template-syntax.html#raw-html), um echtes HTML direkt auszugeben.

>**Sicherheitswarnung**<br />Das dynamische Rendern von beliebigem HTML auf Ihrer Website kann sehr gefährlich sein, da es leicht zu XSS-Schwachstellen führen kann. Verwenden Sie `v-html` nur für vertrauenswürdige Inhalte und niemals für von Benutzern bereitgestellte Inhalte.


```javascript
<template>
  <div class="hello">
    <h1>{{ $t('welcome') }}</h1>
    <p v-html="$t('descr')"></p>
  </div>
</template>

<script>
export default {
  name: 'TranslationShowCase'
}
</script>
```

Die Texte sind jetzt Teil der Übersetzungsressourcen:

```javascript
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to Your Vue.js App',
          descr: 'For a guide and recipes on how to configure / customize '
            + 'this project,<br>check out the '
            + '<a href="https://cli.vuejs.org" target="_blank" '
            + 'rel="noopener">vue-cli documentation</a>.'
        }
      }
    }
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```


## Sprachumschalter <a name="language-switcher"></a>

Lassen Sie uns nun einen Sprachumschalter definieren:

```javascript
<template>
  <div class="hello">
    <h1>{{ $t('welcome') }}</h1>
    <p v-html="$t('descr')"></p>
    <hr />
    <div>
      <div v-if="languages">
        <span v-for="(lng, index) in Object.keys(languages)" :key="lng">
          <a v-if="$i18next.resolvedLanguage !== lng" v-on:click="$i18next.changeLanguage(lng)">
            {{ languages[lng].nativeName }}
          </a>
          <strong v-if="$i18next.resolvedLanguage === lng">
            {{ languages[lng].nativeName }}
          </strong>
          <span v-if="index < (Object.keys(languages).length - 1)">&nbsp;|&nbsp;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslationShowCase',
  data () {
    return {
      languages: {
        en: { nativeName: 'English' },
        de: { nativeName: 'Deutsch' }
      }
    }
  }
}
</script>
```

Und fügen Sie auch einige Übersetzungen für die neue Sprache hinzu:

```javascript
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to Your Vue.js App',
          descr: 'For a guide and recipes on how to configure / customize '
            + 'this project,<br>check out the '
            + '<a href="https://cli.vuejs.org" target="_blank" '
            + 'rel="noopener">vue-cli documentation</a>.'
        }
      },
      de: {
        translation: {
          welcome: 'Willkommen zu Deiner Vue.js App',
          descr: 'Eine Anleitung und Rezepte zum Konfigurieren/Anpassen '
            + 'dieses Projekts findest du<br>in der '
            + '<a href="https://cli.vuejs.org" target="_blank" '
            + 'rel="noopener">vue-cli-Dokumentation</a>.'
        }
      }
    }
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```

![vue Sprachumschalter](../i18next-vue/app_1.jpg "locize © inweso GmbH")

**🥳 Grossartig, Sie haben gerade Ihren ersten Sprachumschalter erstellt!**

Dank [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector) versucht es jetzt, die Browsersprache zu erkennen und diese Sprache automatisch zu verwenden, wenn Sie die Übersetzungen dafür bereitgestellt haben. Die manuell ausgewählte Sprache im Sprachumschalter wird im localStorage beibehalten, beim nächsten Besuch der Seite wird diese Sprache als bevorzugte Sprache verwendet.

### Wie erhalte ich die aktuelle Sprache? <a name="current-language"></a>

Seit i18next v21 gibt es [`i18next.resolvedLanguage`](https://www.i18next.com/overview/api#resolvedlanguage).
Es ist auf die aktuell aufgelöste Sprache eingestellt und kann als primär verwendete Sprache verwendet werden, beispielsweise in einem Sprachumschalter.

Wenn Ihre erkannte Sprache zum Beispiel `en-US` ist und Sie Übersetzungen nur für `en` bereitgestellt haben, wird stattdessen `i18next.resolvedLanguage` `en` zurückgeben.

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

Wenn Sie sehen möchten, wie das funktioniert, schauen Sie sich [diesen Abschnitt in diesem anderen Blogbeitrag](../react-i18next-de/#interpolation-pluralization) an.


## Formatierung <a name="formatting"></a>

Auch [Formatierung](https://www.i18next.com/translation-function/formatting) kann durchgeführt werden.

Wenn Sie sehen möchten, wie das funktioniert, schauen Sie sich [diesen Abschnitt in diesem anderen Blogbeitrag](../react-i18next-de/#formatting) an.


## Kontext <a name="context"></a>

Was ist mit einer bestimmten Begrüssungsnachricht basierend auf der aktuellen Tageszeit? also morgens, abends usw.
Dies ist dank der Funktion [context](https://www.i18next.com/translation-function/context) von i18next möglich.

Wenn Sie sehen möchten, wie das funktioniert, schauen Sie sich [diesen Abschnitt in diesem anderen Blogbeitrag](../react-i18next-de/#context) an.


## Übersetzungen vom Code trennen <a name="separate"></a>

Die Übersetzungen in unserer Datei `i18n.js` zu haben, funktioniert, ist aber für Übersetzer nicht so geeignet, damit zu arbeiten.
Lassen Sie uns die Übersetzungen vom Code trennen und sie in dedizierte JSON-Dateien einfügen.

Da es sich um eine Webanwendung handelt, hilft uns [i18next-http-backend](https://github.com/i18next/i18next-http-backend) dabei.

`npm install i18next-http-backend`

Verschieben Sie die Übersetzungen in den `public` Ordner:

![public locales](../i18next-vue/public_locales.jpg "locize © inweso GmbH")

Passen Sie die Datei `i18n.js` an, um das `i18next-http-backend` zu verwenden:

```javascript
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18next
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en'
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```

Jetzt werden die Übersetzungen asynchron geladen.
Wenn Sie eine langsame Netzwerkverbindung haben, werden Sie möglicherweise feststellen, dass bis zum Laden der Übersetzungen nur die i18n-Schlüssel angezeigt werden.

Um dies zu verhindern, nutzen wir die neue [Suspense](https://vuejs.org/guide/built-ins/suspense.html)-Funktionalität von Vue.js.

Passen wir zuerst die Datei `i18n.js` an, indem wir das i18next-Init-Promise exportieren:
```javascript
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

export const
  i18nextPromise = i18next
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en'
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```

...und verwenden Sie diese in der `App.vue`:
```javascript
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TranslationShowCase />
</template>

<script>
import TranslationShowCase from './components/TranslationShowCase.vue'
import { i18nextPromise } from './i18n.js'

export default {
  name: 'App',
  components: {
    TranslationShowCase
  },
  // used in combination with Suspense.
  // useful when translations are not in-memory...
  async setup() {
    await i18nextPromise
    return {}
  }
}
</script>
```

Lassen Sie uns eine neue Datei erstellen: z. B. `Suspenser.vue`:

```javascript
<template>
  <Suspense>
    <template #default>
      <App />
    </template>
    <template #fallback>
      <div>
        <img alt="Vue logo" src="./assets/logo.png">
        <h1>Loading...</h1>
      </div>
    </template>
  </Suspense>
</template>

<script>
import App from './App.vue'

export default {
  name: 'Suspenser',
  components: {
    App
  }
}
</script>
```

Und verwenden Sie diese in Ihrer `main.js`-Datei:

```javascript
import { createApp } from 'vue'
import i18n from './i18n'
import App from './Suspenser.vue'

i18n(createApp(App)).mount('#app')
```

Solange Ihre Übersetzungen geladen werden, sehen Sie jetzt die Fallback-Vorlage:
![](../i18next-vue/app_2.jpg "locize © inweso GmbH")

Jetzt sieht Ihre App immer noch gleich aus, aber Ihre Übersetzungen sind getrennt.
Wenn Sie eine neue Sprache unterstützen möchten, erstellen Sie einfach einen neuen Ordner und eine neue JSON-Übersetzungsdatei.
Dies gibt Ihnen die Möglichkeit, die Übersetzungen an einige Übersetzer zu senden.
Oder wenn Sie mit einem Übersetzungsmanagementsystem arbeiten, können Sie einfach [die Dateien mit einem CLI synchronisieren](https://github.com/locize/react-tutorial#use-the-locize-cli).## Besseres Übersetzungsmanagement <a name="better-translation-management"></a>

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

![transformiere den Lokalisierungsprozess](../react-i18next/transform_your_localization_process_small.jpg "locize © inweso GmbH")

### Wie sieht das aus? <a name="how-look"></a>

Zuerst müssen Sie sich bei locize [registrieren](https://locize.app/register) und [anmelden](https://docs.locize.com/integration/getting-started/create-a-user-account).
Dann [erstellen Sie ein neues Projekt](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize und fügen Ihre Übersetzungen hinzu. Sie können Ihre Übersetzungen entweder über die [CLI](https://github.com/locize/react-tutorial#use-the-locize-cli) oder durch [Importieren der einzelnen json-Dateien](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) oder über die [API](https://docs.locize.com/integration/api#update-remove-translations) bewerkstelligen.

Danach ersetzen wir [i18next-http-backend](https://github.com/i18next/i18next-http-backend) durch [i18next-locize-backend](https://github.com/locize/i18next-locize-backend).

`npm install i18next-locize-backend`

Nachdem Sie die zu lokalisierenden Übersetzungen importiert haben, löschen Sie den Ordner locales.

Passen Sie die Datei `i18n.js` an, um das `i18next-locize-backend` zu verwenden, und stellen Sie sicher, dass Sie die Projekt-ID und den API-Schlüssel aus Ihrem Locize-Projekt kopieren:

```javascript
import I18NextVue from 'i18next-vue'
import i18next from 'i18next'
import Backend from 'i18next-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const locizeOptions = {
  projectId: '94c21299-0cf5-4ad3-92eb-91f36fc3f20f',
  apiKey: 'bc8586d9-fceb-489c-86ac-2985393ed955', // YOU should not expose your apps API key to production!!!
  version: 'latest'
}

export const
  i18nextPromise = i18next
                    // i18next-locize-backend
                    // loads translations from your project, saves new keys to it (saveMissing: true)
                    // https://github.com/locize/i18next-locize-backend
                    .use(Backend)
                    // detect user language
                    // learn more: https://github.com/i18next/i18next-browser-languageDetector
                    .use(LanguageDetector)
                    // init i18next
                    // for all options read: https://www.i18next.com/overview/configuration-options
                    .init({
                      debug: true,
                      fallbackLng: 'en',
                      backend: locizeOptions
                    })

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```

[i18next-locize-backend](https://github.com/locize/i18next-locize-backend) bietet eine Funktion zum Abrufen der verfügbaren Sprachen direkt von locize, verwenden wir sie:

```javascript
<template>
  <div class="hello">
    <h1>{{ $t('welcome') }}</h1>
    <p v-html="$t('descr')"></p>
    <i>{{ $t('new.key', 'this will be added automatically') }}</i>
    <hr />
    <div>
      <div v-if="languages">
        <span v-for="(lng, index) in Object.keys(languages)" :key="lng">
          <a v-if="$i18next.resolvedLanguage !== lng" v-on:click="$i18next.changeLanguage(lng)">
            {{ languages[lng].nativeName }}
          </a>
          <strong v-if="$i18next.resolvedLanguage === lng">
            {{ languages[lng].nativeName }}
          </strong>
          <span v-if="index < (Object.keys(languages).length - 1)">&nbsp;|&nbsp;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import i18next from 'i18next'

export default {
  name: 'TranslationShowCase',
  data () {
    return {
      languages: []
    }
  },
  async mounted () {
    this.languages = await i18next.services.backendConnector.backend.getLanguages()
  }
}
</script>
```

### fehlende Übersetzungen speichern <a name="save-missing"></a>

Dank der Verwendung der [saveMissing-Funktion](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App neue Schlüssel automatisch zu locize hinzugefügt.

Übergeben Sie einfach `saveMissing: true` in den i18next-Optionen:

```javascript
import I18NextVue from 'i18next-vue'
import i18next from 'i18next'
import Backend from 'i18next-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const locizeOptions = {
  projectId: '94c21299-0cf5-4ad3-92eb-91f36fc3f20f',
  apiKey: 'bc8586d9-fceb-489c-86ac-2985393ed955', // YOU should not expose your apps API key to production!!!
  version: 'latest'
}

export const
  i18nextPromise = i18next
                    // i18next-locize-backend
                    // loads translations from your project, saves new keys to it (saveMissing: true)
                    // https://github.com/locize/i18next-locize-backend
                    .use(Backend)
                    // detect user language
                    // learn more: https://github.com/i18next/i18next-browser-languageDetector
                    .use(LanguageDetector)
                    // init i18next
                    // for all options read: https://www.i18next.com/overview/configuration-options
                    .init({
                      debug: true,
                      fallbackLng: 'en',
                      backend: locizeOptions,
                      saveMissing: true
                    })

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```

Jedes Mal, wenn Sie einen neuen Schlüssel verwenden, wird dieser zu locize gesendet, d.h.:

```javascript
<i>{{ $t('new.key', 'this will be added automatically') }}</i>
```

resultiert in locize wie folgt:

![missing key](../i18next-vue/missing_key.jpg "locize © inweso GmbH")


### 👀 aber es gibt noch mehr... <a name="more"></a>

Dank des Plugins [locize-lastused](https://github.com/locize/locize-lastused) können Sie [in locize, Schlüssel welche verwendet oder nicht mehr verwendet werden, finden und filtern](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

Mit Hilfe des Plugins [locize](https://github.com/locize/locize) können Sie Ihre App im locize [InContext Editor](https://docs.locize.com/more/incontext-editor) verwenden.

Zusätzlich mit Hilfe des [Auto-MachineTranslation-Workflows](https://docs.locize.com/whats-inside/auto-machine-translation) und der Verwendung der [saveMissing-Funktionalität](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App nicht nur neue Schlüssel zur automatischen Lokalisierung hinzugefügt, sondern auch automatisch per maschineller Übersetzung in die Zielsprachen übersetzt.

*Sehen Sie sich dieses [Video](https://youtu.be/VfxBpSXarlU) an, um zu sehen, wie der Arbeitsablauf der automatischen maschinellen Übersetzung aussieht!*

{% youtube VfxBpSXarlU %}

`npm install locize-lastused locize`

verwenden Sie sie in `i18n.js`:

```javascript
import I18NextVue from 'i18next-vue'
import i18next from 'i18next'
import Backend from 'i18next-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'

const locizeOptions = {
  projectId: '94c21299-0cf5-4ad3-92eb-91f36fc3f20f',
  apiKey: 'bc8586d9-fceb-489c-86ac-2985393ed955', // YOU should not expose your apps API key to production!!!
  version: 'latest'
}

export const
  i18nextPromise = i18next
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
                    // init i18next
                    // for all options read: https://www.i18next.com/overview/configuration-options
                    .init({
                      debug: true,
                      fallbackLng: 'en',
                      saveMissing: true,
                      backend: locizeOptions,
                      locizeLastUsed: locizeOptions
                    })

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```

[Automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key automatisch](../i18next-vue/missing_key_auto_mt.jpg "locize © inweso GmbH")

[Filter für zuletzt verwendete Übersetzungen]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](../i18next-vue/last_used.jpg "locize © inweso GmbH")

[InContext-Editor](https://docs.locize.com/more/incontext-editor):

![i18next inkontext](../i18next-vue/in_context.jpg "locize © inweso GmbH")


### 📦 Bereiten wir uns auf die Produktion vor 🚀 <a name="production"></a>

Jetzt bereiten wir die App für den Produktionsstart vor (https://docs.locize.com/guides-tips-and-tricks/going-production).

Erstellen Sie zuerst in locize eine dedizierte Version für die Produktion. Aktivieren Sie die automatische Veröffentlichung für diese Version nicht, sondern veröffentlichen Sie sie manuell oder über die [API](https://docs.locize.com/integration/api#publish-version) oder über die [CLI](https://github.com/locize/locize-cli#publish-version).
Schliesslich [aktivieren Sie auch Cache-Control max-age​](https://docs.locize.com/more/caching) für diese Produktionsversion.

Nutzen wir die Umgebungsfunktion.

Lassen Sie uns eine Standardumgebungsdatei und eine für die Entwicklung und eine für die Produktion erstellen:

`.env`:
```
VUE_APP_LOCIZE_PROJECTID=94c21299-0cf5-4ad3-92eb-91f36fc3f20f
```

`.env.development`:
```
VUE_APP_LOCIZE_VERSION=latest
VUE_APP_LOCIZE_APIKEY=bc8586d9-fceb-489c-86ac-2985393ed955
```

`.env.production`:
```
VUE_APP_LOCIZE_VERSION=production
```

Passen wir nun die Datei `i18n.js` an:

```javascript
import I18NextVue from 'i18next-vue'
import i18next from 'i18next'
import Backend from 'i18next-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'

const isProduction = process.env.NODE_ENV === 'production'

const locizeOptions = {
  projectId: process.env.VUE_APP_LOCIZE_PROJECTID,
  apiKey: process.env.VUE_APP_LOCIZE_APIKEY, // YOU should not expose your apps API key to production!!!
  version: process.env.VUE_APP_LOCIZE_VERSION
}

if (!isProduction) {
  // locize-lastused
  // sets a timestamp of last access on every translation segment on locize
  // -> safely remove the ones not being touched for weeks/months
  // https://github.com/locize/locize-lastused
  i18next.use(LastUsed);
}

export const
  i18nextPromise = i18next
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
                    // init i18next
                    // for all options read: https://www.i18next.com/overview/configuration-options
                    .init({
                      debug: !isProduction,
                      fallbackLng: 'en',
                      saveMissing: !isProduction,
                      backend: locizeOptions,
                      locizeLastUsed: locizeOptions
                    })

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
```

Während der Entwicklung werden Sie nun weiterhin fehlende Schlüssel speichern und die `lastused` Funktionalität nutzen. => `npm run serve`

Und in der Produktionsumgebung sind `saveMissing` und `lastused` deaktiviert, und auch der API-Schlüssel wird nicht verfügbar gemacht. => `npm run build`


[Caching](https://docs.locize.com/more/caching):

![i18next caching](../i18next-vue/caching.jpg "locize © inweso GmbH")

[Versionen zusammenführen](https://docs.locize.com/more/versioning#merging-versions):

![Version überschreiben](../i18next-vue/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 Den vollständigen Code finden Sie [hier](https://github.com/locize/locize-i18next-vue-example).*

*Sehen Sie sich auch den [Teil zur Code-Integration](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in diesem [YouTube-Video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

Es gibt auch ein [i18next-Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Herzlichen Glückwunsch 🎊🎁 <a name="congratulations"></a>

Ich hoffe, Sie haben ein paar neue Dinge über [i18next](https://www.i18next.com), [Vue.js localization](https://i18next.github.io/i18next-vue/) und [moderne Lokalisierungs-Workflows](https://locize.com) gelernt.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Übersetzungs-Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

# 👍
