---
title: Beam your Svelte internationalization up to a new level❕ (a svelte-i18n guide)
description: Simple Svelte localization made easy with this ✅step-by-step guide using svelte-i18n.

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
categories:
  - Post
thumbnail: svelte-i18n/svelte-i18n.jpg
---

![](svelte-i18n.jpg "locize © inweso GmbH")

It’s joyful to work with [Svelte](https://svelte.dev). The design is elegant and the robust first-party additions which can be coupled with, make building browser apps a pleasure.

The most famous i18n plugin for the progressive JavaScript framework [Svelte](https://svelte.dev) is probably [svelte-i18n](https://github.com/kaisermann/svelte-i18n).

>[Christian Kaisermann](https://kaisermann.me), thank you for this great i18n plugin!

In this tutorial, we will add additional superpowers to [svelte-i18n](https://github.com/kaisermann/svelte-i18n) 😉

![](svelte-i18n-stats.jpg "locize © inweso GmbH")

## TOC
  * [So how does a basic svelte-i18n setup look like? Let's get into it...](#start)
  * [Is it possible to make a svelte-18n setup even better?](#svelte-i18n-better)
    - [Prerequisites](#prerequisites)
    - [Getting started](#getting-started)
    - [Language Switcher](#language-switcher)
    - [Where are the additional superpowers?](#superpowers)
    - [How does this look like?](#how-look)
    - [save missing translations](#save-missing)
    - [in context editing](#in-context)
    - [👀 but there's more...](#more)
    - [🎉🥳 Congratulations 🎊🎁](#congratulations)

# So how does a basic svelte-i18n setup look like? <a name="start"></a>
## Let's get into it...

## Prerequisites <a name="prerequisites"></a>

Make sure you have Node.js and npm installed. It's best, if you have some experience with simple HTML, JavaScript and basic Svelte, before jumping to [svelte-i18n](https://github.com/kaisermann/svelte-i18n).

## Getting started <a name="getting-started"></a>

Take your own Svelte project or create a [new one](https://svelte.dev/blog/the-easiest-way-to-get-started).

Let's install the svelte-i18n dependency:

`npm install svelte-i18n`

Create a `i18n.js` file:

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

Import the `i18n.js` file, in your `main.js` file:

```javascript
import App from './App.svelte';

import './i18n';

const app = new App({
  target: document.body,
  props: {}
});

export default app;
```

Now let's try to use our first internationalized text.
In your template import `_` from `svelte-i18n` and use it like this:

```javascript
<script>
  import { _ } from 'svelte-i18n';
</script>

<main>
  <img alt="svelte logo" src="img/svelte-logo.png" />
  <h1>{$_('welcome')}</h1>
</main>
```

Nice! Now let's add another text element...

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

And the corresponding translations:

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

Now, depending on your browser language you should see something like this:

![](app_0.jpg "locize © inweso GmbH")


## Language Switcher <a name="language-switcher"></a>

Now we will create a language switcher to make the content change between different languages.

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

And we will store the current chosen language in the localStorage:

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

![](app_1.jpg "locize © inweso GmbH")

**🥳 Awesome, you've just created your first language switcher!**

## Where are the additional superpowers? <a name="superpowers"></a>

Let's meet [locizer](https://github.com/locize/locizer)...

[locizer](https://github.com/locize/locizer) is a lightweight module to access data from your [locize](https://www.locize.com) project and use that inside your application.

> [What is locize?](../how-to-internationalize-react-i18next/#for-sure)

### How does this look like? <a name="how-look"></a>

First you need to signup at [locize](https://locize.app/register) and [login](https://docs.locize.com/integration/getting-started/create-a-user-account).
Then [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize and add your translations. You can add your translations either by [importing the individual json files](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) or via [API](https://docs.locize.com/integration/api#update-remove-translations) or by using the [CLI](https://github.com/locize/locize-cli).

Having the translations in your code file works, but is not that suitable to work with, for translators.
Using locize separates the translations from the code.

Having imported all translations should look like this:
![](locize_imported.jpg "locize © inweso GmbH")

Done so, we're going to install [locizer](https://github.com/locize/locizer).

`npm install locizer`

Let's adapt the `i18n.js` file:

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

Since the translations are now loaded asynchronous, we may also want to show a loading message until the translations are ready:

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

Now your translations are fetched directly from [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network).
<br />
🙀 This means you can fix translations without having to change your code or redeploy your app. 🤩

### save missing translations <a name="save-missing"></a>

>I wish newly added keys in the code, would automatically be saved to locize.

**Your wish is my command!**

Extend the `i18n.js` file with the locize api-key and the `handleMissingMessage` function:

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

Now, if you add a new key in your templates, `<h2>{$_('howAreYou', { default: 'How are you?' })}</h2>`:

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

It gets automatically saved to locize:
![](locize_missing.jpg "locize © inweso GmbH")

Lastly, with the help of the [auto-machinetranslation workflow](https://docs.locize.com/whats-inside/auto-machine-translation), new keys not only gets added to locize automatically, while developing the app, but are also automatically translated into the target languages using machine translation:
![](locize_autotranslate.jpg "locize © inweso GmbH")

*Check out this [video](https://youtu.be/VfxBpSXarlU) to see how the automatic machine translation workflow looks like!*

{% youtube VfxBpSXarlU %}


### in context editing <a name="in-context"></a>

There's another cool think we can do...
<br />

Let's install [locize](https://github.com/locize/locize):

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

Now open the locize [InContext Editor](https://docs.locize.com/more/incontext-editor) and be amazed:

![i18n incontext editor](in_context.jpg "locize © inweso GmbH")


### 👀 but there's more... <a name="more"></a>

[Caching](https://docs.locize.com/more/caching):

![](../how-to-internationalize-react-i18next/caching.jpg "locize © inweso GmbH")

[Merging versions](https://docs.locize.com/more/versioning#merging-versions):

![](../how-to-internationalize-react-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 The code can be found [here](https://github.com/locize/locizer/tree/master/example/svelte).*


# 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about [Svelte localization](https://github.com/kaisermann/svelte-i18n) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth to try [locize](https://locize.com).


# 👍