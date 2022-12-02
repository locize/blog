---
title: Beamen Sie Ihre Svelte-Internationalisierung auf ein neues Level❕ (ein svelte-i18n Leitfaden)
description: Einfache Svelte-Lokalisierung leicht gemacht mit dieser ✅Schritt-für-Schritt-Anleitung mit svelte-i18n.

date: 2022-04-05
tags:
  - svelte
  - svelte-i18n
  - i18n
  - l10n
  - locize
  - localization
  - internationalization
  - translation
thumbnail: svelte-i18n/svelte-i18n.jpg

label: svelte-i18n
lang: de
hidden: true
---

![](../svelte-i18n/svelte-i18n.jpg "locize © inweso GmbH")

Es macht Spass, mit [Svelte](https://svelte.dev) zusammenzuarbeiten. Das Design ist elegant und die robusten First-Party-Ergänzungen, mit denen gekoppelt werden kann, machen das Erstellen von Browser-Apps zum Vergnügen.

Das bekannteste i18n-Plugin für das progressive JavaScript-Framework [Svelte](https://svelte.dev) ist wohl [svelte-i18n](https://github.com/kaisermann/svelte-i18n).

>[Christian Kaisermann](https://kaisermann.me), vielen Dank für dieses grossartige i18n-Plugin!

In diesem Tutorial werden wir zusätzliche Superkräfte zu [svelte-i18n](https://github.com/kaisermann/svelte-i18n) hinzufügen. 😉

![](../svelte-i18n/svelte-i18n-stats.jpg "locize © inweso GmbH")

## Inhaltsverzeichnis
  * [Wie sieht also ein einfaches Svelte-i18n-Setup aus? Lassen Sie uns darauf eingehen...](#start)
  * [Is it possible to make a svelte-18n setup even better?](#svelte-i18n-better)
    - [Voraussetzungen](#prerequisites)
    - [Einstieg](#getting-started)
    - [Sprachumschalter](#language-switcher)
    - [Wo sind die zusätzlichen Superkräfte?](#superpowers)
    - [Wie sieht das aus?](#how-look)
    - [fehlende Übersetzungen speichern](#save-missing)
    - [In-Kontext-Editor](#in-context)
    - [👀 aber es gibt noch mehr...](#more)
    - [🎉🥳 Herzlichen Glückwunsch 🎊🎁](#congratulations)

# Wie sieht also ein einfaches Svelte-i18n-Setup aus? <a name="start"></a>
## Lassen Sie uns darauf eingehen...

## Voraussetzungen <a name="prerequisites"></a>

Stellen Sie sicher, dass Sie Node.js und npm installiert haben. Wenn Sie etwas Erfahrung mit einfachem HTML, JavaScript und einfachem Svelte haben, ist es am besten, bevor Sie zu [svelte-i18n](https://github.com/kaisermann/svelte-i18n) springen.

## Einstieg <a name="getting-started"></a>

Nehmen Sie Ihr eigenes Svelte-Projekt oder erstellen Sie ein [neues](https://svelte.dev/blog/the-easiest-way-to-get-started).

Lassen Sie uns die svelte-i18n-Abhängigkeit installieren:

`npm install svelte-i18n`

Erstellen Sie eine `i18n.js`-Datei:

```javascript
import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

const fallbackLocale = 'en';
const lngs = [fallbackLocale, 'de'];

addMessages('en', {
  welcome: 'Welcome to Your Svelte App'
});
addMessages('de', {
  welcome: 'Willkommen zu deiner Svelte-App'
});

let initialLocale;
const detectedLocale = getLocaleFromNavigator(); // the locale could be region specific, i.e. de-CH
if (lngs.indexOf(detectedLocale) > -1) initialLocale = detectedLocale;
if (!initialLocale && detectedLocale.indexOf('-') > 0) {
  const foundLng = lngs.find((l) => detectedLocale.indexOf(l + '-') === 0);
  if (foundLng) initialLocale = foundLng;
}
if (!initialLocale) initialLocale = fallbackLocale;

init({
  fallbackLocale,
  initialLocale
});
```

Importieren Sie die Datei `i18n.js` in Ihre Datei `main.js`:

```javascript
import App from './App.svelte';

import './i18n';

const app = new App({
  target: document.body,
  props: {}
});

export default app;
```

Versuchen wir nun, unseren ersten internationalisierten Text zu verwenden.
Importieren Sie in Ihrer Vorlage `_` aus `svelte-i18n` und verwenden Sie es wie folgt:

```javascript
<script>
  import { _ } from 'svelte-i18n';
</script>

<main>
  <img alt="svelte logo" src="img/svelte-logo.png" />
  <h1>{$_('welcome')}</h1>
</main>
```

Nett! Jetzt fügen wir ein weiteres Textelement hinzu ...

```javascript
<script>
  import { _ } from 'svelte-i18n';
</script>

<main>
  <img alt="svelte logo" src="img/svelte-logo.png" />
  <h1>{$_('welcome')}</h1>
  <p>{@html $_('descr', { values: { link: `<a href="https://svelte.dev/tutorial" target="_blank">${$_('doc')}</a>` } })}</p>
</main>
```

Und die entsprechenden Übersetzungen:

```javascript
addMessages('en', {
  welcome: 'Welcome to Your Svelte App',
  descr: 'Visit the {link} to learn how to build Svelte apps.',
  doc: 'Svelte tutorial'
});
addMessages('de', {
  welcome: 'Willkommen zu deiner Svelte-App',
  descr: 'Besuchen Sie den {link}, um zu erfahren, wie Sie Svelte-Apps erstellen.',
  doc: 'Svelte Tutorial'
});
```

Jetzt sollten Sie, abhängig von Ihrer Browsersprache, so etwas sehen:

![](../svelte-i18n/app_0.jpg "locize © inweso GmbH")


## Sprachumschalter <a name="language-switcher"></a>

Jetzt werden wir einen Sprachumschalter erstellen, um den Inhaltswechsel zwischen verschiedenen Sprachen vorzunehmen.

```javascript
<script>
  import { _, locale, locales } from 'svelte-i18n';
</script>

<main>
  <img alt="svelte logo" src="img/svelte-logo.png" />
  <h1>{$_('welcome')}</h1>
  <p>{@html $_('descr', { values: { link: `<a href="https://svelte.dev/tutorial" target="_blank">${$_('doc')}</a>` } })}</p>
  <select bind:value={$locale}>
    {#each $locales as locale}
      <option value={locale}>{locale}</option>
    {/each}
  </select>
</main>
```

Und wir speichern die aktuell gewählte Sprache im localStorage:

```javascript
import { addMessages, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

const fallbackLocale = 'en';
const lngs = [fallbackLocale, 'de'];

addMessages('en', {
  welcome: 'Welcome to Your Svelte App',
  descr: 'Visit the {link} to learn how to build Svelte apps.',
  doc: 'Svelte tutorial'
});
addMessages('de', {
  welcome: 'Willkommen zu deiner Svelte-App',
  descr: 'Besuchen Sie den {link}, um zu erfahren, wie Sie Svelte-Apps erstellen.',
  doc: 'Svelte Tutorial'
});

locale.subscribe((lng) => {
  if (lng) localStorage.setItem('svelte-i18n-locale', lng);
});

let initialLocale;
const detectedLocale = localStorage.getItem('svelte-i18n-locale') || getLocaleFromNavigator(); // the locale could be region specific, i.e. de-CH
if (lngs.indexOf(detectedLocale) > -1) initialLocale = detectedLocale;
if (!initialLocale && detectedLocale.indexOf('-') > 0) {
  const foundLng = lngs.find((l) => detectedLocale.indexOf(l + '-') === 0);
  if (foundLng) initialLocale = foundLng;
}
if (!initialLocale) initialLocale = fallbackLocale;

init({
  fallbackLocale,
  initialLocale
});
```

![](../svelte-i18n/app_1.jpg "locize © inweso GmbH")

**🥳 Grossartig, Sie haben gerade Ihren ersten Sprachumschalter erstellt!**

## Wo sind die zusätzlichen Superkräfte? <a name="superpowers"></a>

Lernen wir [locizer](https://github.com/locize/locizer) kennen...

[locizer](https://github.com/locize/locizer) ist ein einfaches Modul, um auf Daten aus Ihrem [locize](https://www.locize.com)-Projekt zuzugreifen und diese in Ihrer Anwendung zu verwenden.

> [Was ist locize?](../react-i18next-de/#for-sure)

### Wie sieht das aus? <a name="how-look"></a>

Zuerst müssen Sie sich bei locize [registrieren](https://locize.app/register) und [anmelden](https://docs.locize.com/integration/getting-started/create-a-user-account).
Dann [erstellen Sie ein neues Projekt](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize und fügen Ihre Übersetzungen hinzu. Sie können Ihre Übersetzungen entweder über die [CLI](https://github.com/locize/react-tutorial#use-the-locize-cli) oder durch [Importieren der einzelnen json-Dateien](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) oder über die [API](https://docs.locize.com/integration/api#update-remove-translations) bewerkstelligen.

Die Übersetzungen im Code zu haben, funktioniert, ist aber für Übersetzer nicht so geeignet, damit zu arbeiten.
Die Verwendung von locize trennt die Übersetzungen vom Code.

Nachdem alle Übersetzungen importiert wurden, sollte es wie folgt aussehen:
![](../svelte-i18n/locize_imported.jpg "locize © inweso GmbH")

Fertig, als werden wir [locizer](https://github.com/locize/locizer) installieren.

`npm install locizer`

Passen wir die Datei `i18n.js` an:

```javascript
import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import locizer from 'locizer';

const fallbackLocale = 'en';
const lngs = [fallbackLocale, 'de'];
const namespace = 'messages'; // your namespace name added in locize

locizer.init({
  projectId: 'your-locize-project-id'
});

lngs.forEach((l) => {
  register(l, () => new Promise((resolve, reject) => {
    locizer.load(namespace, l, (err, ns) => {
      if (err) return reject(err);
      resolve(ns);
    });
  }));
})

locale.subscribe((lng) => {
  if (lng) localStorage.setItem('svelte-i18n-locale', lng);
});

let initialLocale;
const detectedLocale = localStorage.getItem('svelte-i18n-locale') || getLocaleFromNavigator();
if (lngs.indexOf(detectedLocale) > -1) initialLocale = detectedLocale;
if (!initialLocale && detectedLocale.indexOf('-') > 0) {
  const foundLng = lngs.find((l) => detectedLocale.indexOf(l + '-') === 0);
  if (foundLng) initialLocale = foundLng;
}
if (!initialLocale) initialLocale = fallbackLocale;

init({
  fallbackLocale,
  initialLocale
});
```

Da die Übersetzungen jetzt asynchron geladen werden, möchten wir vielleicht auch eine Lademeldung anzeigen, bis die Übersetzungen fertig sind:

```javascript
<script>
  import { isLoading, _, locale, locales } from 'svelte-i18n';
</script>

<main>
  <img alt="svelte logo" src="img/svelte-logo.png" />
  {#if $isLoading}
    <p>
      loading translations...
    </p>
  {:else}
    <h1>{$_('welcome')}</h1>
    <p>{@html $_('descr', { values: { link: `<a href="https://svelte.dev/tutorial" target="_blank">${$_('doc')}</a>` } })}</p>
    <select bind:value={$locale}>
      {#each $locales as locale}
        <option value={locale}>{locale}</option>
      {/each}
    </select>
  {/if}
</main>
```

Jetzt werden Ihre Übersetzungen direkt von [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) abgerufen.
<br />
🙀 Das bedeutet, dass Sie Übersetzungen korrigieren können, ohne Ihren Code ändern oder Ihre App erneut bereitstellen zu müssen. 🤩

### fehlende Übersetzungen speichern <a name="save-missing"></a>

>Ich möchte, dass neu hinzugefügte Schlüssel im Code automatisch gespeichert werden, um sie zu lokalisieren.

**Ihr Wunsch ist mir Befehl!**

Erweitern Sie die `i18n.js`-Datei mit dem locize api-key und der `handleMissingMessage`-Funktion:

```javascript
import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import locizer from 'locizer';

const fallbackLocale = 'en';
const lngs = [fallbackLocale, 'de'];
const namespace = 'messages';
const apiKey = 'my-api-key'; // do not expose your API-Key in production

locizer.init({
  projectId: 'your-locize-project-id',
  apiKey
});

lngs.forEach((l) => {
  register(l, () => new Promise((resolve, reject) => {
    locizer.load(namespace, l, (err, ns) => {
      if (err) return reject(err);
      resolve(ns);
    });
  }));
})

locale.subscribe((lng) => {
  if (lng) localStorage.setItem('svelte-i18n-locale', lng);
});

let initialLocale;
const detectedLocale = localStorage.getItem('svelte-i18n-locale') || getLocaleFromNavigator();
if (lngs.indexOf(detectedLocale) > -1) initialLocale = detectedLocale;
if (!initialLocale && detectedLocale.indexOf('-') > 0) {
  const foundLng = lngs.find((l) => detectedLocale.indexOf(l + '-') === 0);
  if (foundLng) initialLocale = foundLng;
}
if (!initialLocale) initialLocale = fallbackLocale;

init({
  fallbackLocale,
  initialLocale,
  handleMissingMessage: apiKey ? ({ locale, id, defaultValue }) => {
    if (locale !== locizer.referenceLng) return;
    locizer.add(namespace, id, defaultValue);
  } : undefined
});
```

Wenn Sie jetzt einen neuen Schlüssel in Ihren Vorlagen hinzufügen, `<h2>{$_('howAreYou', { default: 'How are you?' })}</h2>`:

```javascript
<script>
  import { isLoading, _, locale, locales } from 'svelte-i18n';
</script>

<main>
  <img alt="svelte logo" src="img/svelte-logo.png" />
  {#if $isLoading}
    <p>
      loading translations...
    </p>
  {:else}
    <h1>{$_('welcome')}</h1>
    <h2>{$_('howAreYou', { default: 'How are you?' })}</h2>
    <p>{@html $_('descr', { values: { link: `<a href="https://svelte.dev/tutorial" target="_blank">${$_('doc')}</a>` } })}</p>
    <select bind:value={$locale}>
      {#each $locales as locale}
        <option value={locale}>{locale}</option>
      {/each}
    </select>
  {/if}
</main>
```

Es wird automatisch zu locize hinzugefügt:
![](../svelte-i18n/locize_missing.jpg "locize © inweso GmbH")

Schliesslch werden mit Hilfe des [Arbeitsablaufs für automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation) nicht nur neue Schlüssel in locize hinzugefügt, während die App entwickelt wird, sondern werden auch automatisch per maschineller Übersetzung in die Zielsprachen übersetzt:
![](../svelte-i18n/locize_autotranslate.jpg "locize © inweso GmbH")

*Schauen Sie sich dieses [Video](https://youtu.be/VfxBpSXarlU) an, um zu sehen, wie der Arbeitsablauf der automatischen maschinellen Übersetzung aussieht!*

{% youtube VfxBpSXarlU %}


### In-Kontext-Editor <a name="in-context"></a>

Es gibt noch eine coole Sache, die wir machen können ...
<br />

Lassen Sie uns [locize](https://github.com/locize/locize) installieren:

`npm install locize`

```javascript
import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import locizer from 'locizer';
import { addLocizeSavedHandler } from 'locize';

const fallbackLocale = 'en';
const lngs = [fallbackLocale, 'de'];
const namespace = 'messages';
const apiKey = 'my-api-key'; // do not expose your API-Key in production

locizer.init({
  projectId: 'your-locize-project-id',
  apiKey
});

lngs.forEach((l) => {
  register(l, () => new Promise((resolve, reject) => {
    locizer.load(namespace, l, (err, ns) => {
      if (err) return reject(err);
      resolve(ns);
    });
  }));
})

locale.subscribe((lng) => {
  if (lng) localStorage.setItem('svelte-i18n-locale', lng);
});

let initialLocale;
const detectedLocale = localStorage.getItem('svelte-i18n-locale') || getLocaleFromNavigator();
if (lngs.indexOf(detectedLocale) > -1) initialLocale = detectedLocale;
if (!initialLocale && detectedLocale.indexOf('-') > 0) {
  const foundLng = lngs.find((l) => detectedLocale.indexOf(l + '-') === 0);
  if (foundLng) initialLocale = foundLng;
}
if (!initialLocale) initialLocale = fallbackLocale;

init({
  fallbackLocale,
  initialLocale,
  handleMissingMessage: apiKey ? ({ locale, id, defaultValue }) => {
    if (locale !== locizer.referenceLng) return;
    locizer.add(namespace, id, defaultValue);
  } : undefined
});

addLocizeSavedHandler(() => location.reload());
```

Öffnen Sie nun den locize [InContext Editor](https://docs.locize.com/more/incontext-editor) und staunen Sie:

![i18n incontext editor](../svelte-i18n/in_context.jpg "locize © inweso GmbH")


### 👀 aber es gibt noch mehr... <a name="more"></a>

[Caching](https://docs.locize.com/more/caching):

![](../react-i18next/caching.jpg "locize © inweso GmbH")

[Versionen zusammenführen](https://docs.locize.com/more/versioning#merging-versions):

![](../react-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 Den Code finden Sie [hier](https://github.com/locize/locizer/tree/master/example/svelte).*


# 🎉🥳 Herzlichen Glückwunsch 🎊🎁 <a name="congratulations"></a>

Ich hoffe, Sie haben ein paar neue Dinge über [Svelte-Lokalisierung](https://github.com/kaisermann/svelte-i18n) und [moderne Lokalisierungs-Workflows](https://locize.com) gelernt.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, [locize](https://locize.com) auszuprobieren.


# 👍