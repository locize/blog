---
title: vue.js - from internationalization (i18n) to localization (l10n) and back again
date: 2018-07-05
tags:
  - vue
  - vue-i18n
  - vue-i18next
  - i18n
  - l10n
  - locize
  - localization
  - internationalization
  - translation
thumbnail: vue-js-from-internationalization-i18n-to-localization-l10n-and-back-again/title.jpeg
---

![](title.jpeg "locize © inweso GmbH")

# What is internationalization?!?

>Internationalization is the designing of a product in such a way that it will meet the needs of users in many countries or can be easily adapted to do so. Internationalization might mean designing a website so that when it is translated from English to Spanish the layout still works — many words in Spanish have more characters and therefore take up more space on the page in Spanish than in English.

*quote by: https://www.investopedia.com/terms/i/internationalization.asp*

# Open Source to the rescue

Thanks to the restless open source community you won’t have to reinvent an i18n solution. Just to give you an idea let’s mention two mature solutions to translate your vue.js app here:

[vue-i18n](https://github.com/kazupon/vue-i18n) by kazuya kawaguchi (@kazupon on github)

- Made by @kazupon a core contributor of vue.js
- Easy to get started with
- powerful enough for most use cases *(lacks some features like proper pluralization for - languages having multiple pluralforms or possibility for gender specific translations)*
- learn more reading the [documentation](https://kazupon.github.io/vue-i18n/)

[vue-i18next](https://github.com/panter/vue-i18next/commits/master) by Claudio Romano (@panter on github)

- based on [i18next](https://www.i18next.com): learn once — translate everywhere
- extendable, powerful i18n features
- plugins for language detection, loading, caching, …
- learn more reading the [documentation](https://github.com/panter/vue-i18next) and the [i18next documentation](https://www.i18next.com/translation-function/essentials) for translation functionalities like plural, context, …

# From internationalization to localization

As you can see in the [getting started guide](https://kazupon.github.io/vue-i18n/guide/started.html) of vue-i18n making your vue.js application fit for translation is not as daunting as it seemed first. Honestly it’s rather easy.

Now let us show you how easy the next step could be doing the same for localization.

>After enabling the developers it’s time to enable your localization team to translate your product.

## Step 1: Creating a fast translation loop — continuous localization

Our goal is to extend vue-i18n to to use it’s existing missing function to directly send new texts to the translation managment tool and to directly load translations from there.

This enables the localization team / translators to start with translations immediately plus keeps a fast feedback loop by having the translations in development without having to export and copy those files from the translation management to the codebase.

To make this magic happen we will use [locize.com](https://locize.com) as our weapon of choice:

>locize is a new online service that offers true continuous localization.

*quote by: https://alternativeto.net/software/locize/*

>It’s time for some code — show me your code

First we will need to add the provided [locizer script](https://github.com/locize/locizer) to our page to connect the locize translation management with our code:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src=”https://unpkg.com/vue/dist/vue.js"></script>
    <script src=”https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script> 
    <script src=”https://unpkg.com/locizer/locizer.min.js"></script>
  </head>
<!-- ...
```

Now let’s use the new script to automatically detect the user language and to load the translations from locize:

```html
<script>
locizer
  .init({
    fallbackLng: 'en', // load this if detected lng is not support
    referenceLng: 'en', // the source language
    projectId: [PROJECTID], // your locize project id
    apiKey: [APIKEY] // your locize api key
  })
  .load('translations', (err, translations, detectedLng) => {
     // build message catalog format
     var messages = {};
     messages[detectedLng] = translations;
// Create VueI18n instance with options
     const i18n = new VueI18n({
       locale: detectedLng, // set locale
       messages: messages, // set locale messages
     })
// Create a Vue instance with `i18n` option
     new Vue({ i18n }).$mount('#app')
  })
</script>
```

So now we’re already loading the translations from the locize CDN directly from our project. To switch language only append `?lng=[yourLanguage]` to your url (for more options have a look [detection options](https://github.com/locize/locizer#init-options)).

![](locize_editor.png)

Our translators could easily add new languages, translate the content or change existing content.

>Time to have new paths sent to locize automatically

Just use the existing missing function of vue-i18n and pipe that call to the locizer script:

```js
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: detectedLng, // set locale
  messages: messages, // set locale messages
  missing: function(locale, path, vue) {
    // pipe to locize - that key will be created for you
    locizer.add('translations', path, path);
  }
})
```

Awesome. Now we have our code connected with our translation management. Developers could create new content that is automatically passed to the translation management. Translators could do their job without having to beg for latest source files and do not need to send latest translations to development and wait for those files to be integrated into the latest build.

>The power of true continuous localization

## Step 2: Enable translations to be in high quality

Localization is hard. Even harder if you have to guess the context during translations. So lets improve this by enabling translations directly inside your vue.js app.

![](locize_editor2.png)

To add the incontext editor we will need to add an additional script first:

```html
<script src="https://unpkg.com/locize-editor/locize-editor.js"></script>
```

A little configuration:

```js
locizeEditor.init({
  lng: detectedLng,
  defaultNS: 'translations',
  referenceLng: 'en',
  projectId: [PROJECTID]
})
```

Now open your website with `?locize=true` and you will see the incontext editor. While turned on you can click on any text element on your page to directly jump to it and make the initial translation or the changes needed.

# Summary

You see internationalization is done rather easily and localization hasn’t to be harder. With the right tools you can not only keep your development — translation cycle short but you can also improve the quality, save time and money.

**You can find the full sample here:** https://github.com/locize/locize-vue-i18n-example

Take the chance and try it yourself [locize.com](https://locize.com) comes with a 14 day free trial.

**Prefer using vue-i18next?**

Doing the same is easier by just using the i18next plugin system. Simply add https://github.com/locize/i18next-locize-backend and the editor https://github.com/locize/locize-editor to i18next. DONE.
