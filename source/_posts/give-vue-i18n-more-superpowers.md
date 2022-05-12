title: Give vue-i18n more superpowers❕

date: 2021-06-08
tags:
  - vue
  - vue-i18n
  - i18n
  - l10n
  - locize
  - localization
  - internationalization
  - translation
categories:
  - Post
thumbnail: give-vue-i18n-more-superpowers/title.jpg
redirect_from:
- /2021-06-08-give-vue-i18n-more-superpowers
---

![](title.jpg "locize © inweso GmbH")

It’s joyful to work with [Vue.js](https://vuejs.org/). The design is elegant and the robust first-party additions which can be coupled with, make building browser apps a pleasure.

The most famous i18n plugin for the progressive JavaScript framework [Vue.js](https://vuejs.org/) is probably [Vue I18n](https://vue-i18n.intlify.dev/).

>[Kazuya](https://github.com/kazupon), thank you for this great i18n plugin!

![](vue-i18n-stats.jpg "locize © inweso GmbH")

## TOC
  * [New versions](#new-versions)
  * [So how does a basic vue-i18n setup look like? Let's get into it...](#start)
  * Is it possible to make a vue-18n setup even better?
    - [Prerequisites](#prerequisites)
    - [Getting started](#getting-started)
    - [Language Switcher](#language-switcher)
    - [Component interpolation and directive](#component-directive)
    - [Where are the additional superpowers?](#superpowers)
    - [How does this look like?](#how-look)
    - [save missing translations](#save-missing)
    - [👀 but there's more...](#more)
    - [🎉🥳 Congratulations 🎊🎁](#congratulations)


# New versions <a name="new-versions"></a>

Beside templates, directives, data binding, event handling, etc... with v3 Vue.js is now introducing also [Composition API](https://vuejs.org/api/composition-api-setup.html), [Teleport](https://vuejs.org/guide/built-ins/teleport.html), Fragments... and [Suspense](https://vuejs.org/guide/built-ins/suspense.html).
The appropriate version to Vue.js v3 for [Vue I18n](https://vue-i18n.intlify.dev/) is [v9](https://blog.intlify.dev/posts/vue-i18n-9.html).


# So how does a basic vue-i18n setup look like? <a name="start"></a>
## Let's get into it...

## Prerequisites <a name="prerequisites"></a>

Make sure you have Node.js and npm installed. It's best, if you have some experience with simple HTML, JavaScript and basic Vue.js, before jumping to [vue-i18n](https://vue-i18n.intlify.dev/).


## Getting started <a name="getting-started"></a>

Take your own Vue.js project or create a new one, i.e. with [the vue create cli command](https://cli.vuejs.org/guide/creating-a-project.html#vue-create).

```sh
npx @vue/cli create vue-starter-project
# select vue 3 preset
```

Let's install the vue-i18n dependency:

`npm install vue-i18n`

Let's prepare the `main.js` file:

```javascript
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import App from './App.vue'

export const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      message: {
        welcome: 'Welcome to Your Vue.js App'
      }
    },
    de: {
      message: {
        welcome: 'Willkommen zu Deiner Vue.js App'
      }
    }
  }
  // If you need to specify other options, you can set other options
  // ...
})

createApp(App).use(i18n).mount('#app')
```

Now let's create a first component `TranslationShowCase.vue`:

```javascript
<template>
  <div class="hello">
    <h1>{{ $t("welcome") }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TranslationShowCase'
}
</script>
```

...and use that component in `App.vue`:

```javascript
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TranslationShowCase />
</template>

<script>
import TranslationShowCase from './components/TranslationShowCase.vue'

export default {
  name: 'App',
  components: {
    TranslationShowCase
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

You should now see something like this:
![](app_0.jpg "locize © inweso GmbH")


## Language Switcher <a name="language-switcher"></a>

Now we will create a language switcher to make the content change between different languages.

```javascript
<template>
  <div class="hello">
    <h1>{{ $t("welcome") }}</h1>
  </div>
  <hr />
  <div>
    <div>
      <a v-if="$i18n.locale !== 'de'" v-on:click="changeLanguage('de')">DE</a>
      <strong v-if="$i18n.locale === 'de'">DE</strong>
      &nbsp;|&nbsp;
      <a v-if="$i18n.locale !== 'en'" v-on:click="changeLanguage('en')">EN</a>
      <strong v-if="$i18n.locale === 'en'">EN</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslationShowCase',
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
```

![](app_1.jpg "locize © inweso GmbH")

**🥳 Awesome, you've just created your first language switcher!**

## Component interpolation and directive <a name="component-directive"></a>

Now let's try [component interpolation](https://vue-i18n.intlify.dev/guide/advanced/component.html#basic-usage) and the [translation directive](https://vue-i18n.intlify.dev/api/directive.html#translationdirective):

```javascript
<template>
  <div class="hello">
    <h1>{{ $t("welcome") }}</h1>
  </div>
  <p>
    <i18n-t keypath="descr" tag="label" for="doc">
      <a href="https://cli.vuejs.org" target="_blank">{{ $t('doc') }}</a>
    </i18n-t>
  </p>
  <div>
    <div>
      <span v-t="{path:'end'}" /> <!-- can also be written like: <i v-t="'end'" /> -->
    </div>
  </div>
  <hr />
  <div>
    <div>
      <a v-if="$i18n.locale !== 'de'" v-on:click="changeLanguage('de')">DE</a>
      <strong v-if="$i18n.locale === 'de'">DE</strong>
      &nbsp;|&nbsp;
      <a v-if="$i18n.locale !== 'en'" v-on:click="changeLanguage('en')">EN</a>
      <strong v-if="$i18n.locale === 'en'">EN</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslationShowCase',
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
```

...and add the new keys to your translations:

```javascript
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

export const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      message: {
        welcome: 'Welcome to Your Vue.js App',
        descr: 'For a guide and recipes on how to configure / customize this project, check out the {0}.',
        doc: 'vue-cli documentation',
        end: 'have fun!'
      }
    },
    de: {
      message: {
        welcome: 'Willkommen zu Deiner Vue.js App',
        descr: 'Eine Anleitung und Rezepte für das Konfigurieren / Anpassen dieses Projekts findest du in der {0}.',
        doc: 'vue-cli Dokumentation',
        end: 'habe Spass!'
      }
    }
  }
  // If you need to specify other options, you can set other options
  // ...
})

createApp(App).use(i18n).mount('#app')
```

This should be the result:

![](app_2.jpg "locize © inweso GmbH")


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

Let's create a dedicated `i18n.js` file:

```javascript
import { createI18n } from 'vue-i18n'
import locizer from 'locizer'

const namespace = 'messages' // your namespace name added in locize
locizer.init({
  projectId: 'your-locize-project-id'
})

export const i18n = createI18n({
  locale: locizer.lng, // locizer.lng is the language detected in your browser.
  fallbackLocale: 'en' // set fallback locale
  // If you need to specify other options, you can set other options
  // ...
})

// called from within setup hook in App.vue
export const loadMessagesPromise = new Promise((resolve, reject) => {
  locizer.loadAll(namespace, (err, messages) => {
    if (err) return reject(err);
    Object.keys(messages).forEach((l) => {
      i18n.global.setLocaleMessage(l, messages[l])
    })
    resolve(messages)
  })
})
```

The translations are now loaded asynchronously, that's why we export the `loadMessagesPromise` and use it in your `App.vue`:

```javascript
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TranslationShowCase />
</template>

<script>
import { loadMessagesPromise } from './i18n'
import TranslationShowCase from './components/TranslationShowCase.vue'

export default {
  name: 'App',
  components: {
    TranslationShowCase
  },
  // used in combination with Suspense.
  // useful when translations are not in-memory...
  async setup() {
    await loadMessagesPromise
    return {}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Additionally, we make use of the new [Suspense](https://vuejs.org/guide/built-ins/suspense.html) functionality of Vue.js.
Let's create a new file: i.e. `Suspenser.vue`:

```javascript
<template>
  <Suspense>
    <template #default>
      <App />
    </template>
    <template #fallback>
      <span>Loading...</span>
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

And use that in your `main.js` file:

```javascript
import { createApp } from 'vue'
import { i18n } from './i18n'
import App from './Suspenser.vue'

createApp(App).use(i18n).mount('#app')
```

Now, as long your translations gets loaded you'll see the fallback template:
![](app_3.jpg "locize © inweso GmbH")

If your browser is configured with german language, you may now have seen the language automatically was set to german by default. This is because of the language detection feature of locizer. You can configure the language detection with other [options](https://github.com/locize/locizer#init-options)
By default the language detection also is looking for the query parameter lng, so you can also type this url to test this: http://localhost:8080/?lng=de
![](app_2.jpg "locize © inweso GmbH")


### save missing translations <a name="save-missing"></a>

>I wish newly added keys in the code, would automatically be saved to locize.

**Your wish is my command!**

Extend the `i18n.js` file with the locize api-key and the handleMissing function:

```javascript
import { createI18n } from 'vue-i18n'
import locizer from 'locizer'

const namespace = 'messages' // your namespace name added in locize
const apiKey = 'my-api-key' // used for handleMissing functionality, do not add your api-key in a production build
locizer.init({
  projectId: 'your-locize-project-id',
  apiKey
})

export const i18n = createI18n({
  locale: locizer.lng, // locizer.lng is the language detected in your browser.
  fallbackLocale: 'en' // set fallback locale
  // If you need to specify other options, you can set other options
  // ...
})

// called from within setup hook in App.vue
export const loadMessagesPromise = new Promise((resolve, reject) => {
  locizer.loadAll(namespace, (err, messages) => {
    if (err) return reject(err);
    Object.keys(messages).forEach((l) => {
      i18n.global.setLocaleMessage(l, messages[l])
    })
    resolve(messages)
  })
})

export function handleMissing (locale, key) {
  if (!apiKey) return
  if (locale !== locizer.referenceLng) return
  locizer.add(namespace, key, key)
}
```

And use it in the component:

```javascript
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TranslationShowCase />
</template>

<script>
import { useI18n } from 'vue-i18n'
import { loadMessagesPromise, handleMissing } from './i18n'
import TranslationShowCase from './components/TranslationShowCase.vue'

export default {
  name: 'App',
  components: {
    TranslationShowCase
  },
  // used in combination with Suspense.
  // useful when translations are not in-memory...
  async setup() {
    useI18n().setMissingHandler(handleMissing)
    await loadMessagesPromise
    return {}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Now, if you add a new key in your templates, `<h2>{{ $t("How are you?") }}</h2>`:

```javascript
<template>
  <div class="hello">
    <h1>{{ $t("welcome") }}</h1>
    <h2>{{ $t("How are you?") }}</h2>
  </div>
  <p>
    <i18n-t keypath="descr" tag="label" for="doc">
      <a href="https://cli.vuejs.org" target="_blank">{{ $t('doc') }}</a>
    </i18n-t>
  </p>
  <div>
    <div>
      <span v-t="{path:'end'}" /> <!-- can also be written like: <i v-t="'end'" /> -->
    </div>
  </div>
  <hr />
  <div>
    <div>
      <a v-if="$i18n.locale !== 'de'" v-on:click="changeLanguage('de')">DE</a>
      <strong v-if="$i18n.locale === 'de'">DE</strong>
      &nbsp;|&nbsp;
      <a v-if="$i18n.locale !== 'en'" v-on:click="changeLanguage('en')">EN</a>
      <strong v-if="$i18n.locale === 'en'">EN</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslationShowCase',
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
```

It gets automatically saved to locize:
![](locize_missing.jpg "locize © inweso GmbH")

Lastly, with the help of the [auto-machinetranslation workflow](https://docs.locize.com/whats-inside/auto-machine-translation), new keys not only gets added to locize automatically, while developing the app, but are also automatically translated into the target languages using machine translation:
![](locize_autotranslate.jpg "locize © inweso GmbH")

![](app_4.jpg "locize © inweso GmbH")

### 👀 but there's more... <a name="more"></a>

[Caching](https://docs.locize.com/more/caching):

![](../how-to-internationalize-react-i18next/caching.jpg "locize © inweso GmbH")

[Merging versions](https://docs.locize.com/more/versioning#merging-versions):

![](../how-to-internationalize-react-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 The code can be found [here](https://github.com/locize/locizer/tree/master/example/vue).*


# 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about [Vue.js localization](https://vue-i18n.intlify.dev/) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth to try [locize](https://locize.com).


# 👍
