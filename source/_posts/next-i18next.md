---
title: All side optimized Next.js translations (a next-i18next guide)
description: Optimize your Next.js app to best work with translations on server side and on client side with next-i18next.

date: 2022-04-03
tags:
  - i18next
  - react
  - react-i18next
  - next-i18next
  - next
  - locize
  - localization
  - l10n
  - internationalization
  - i18n
  - translation
thumbnail: next-i18next/next-i18next.jpg

label: next-i18next
lang: en
---

![](next-i18next.jpg "locize © inweso GmbH")

Writing [Next.js](https://nextjs.org) code blurs the lines between client side and server side.
<br />
The code is written once and depending on your needs it is then executed as SSG (static-site generation), SSR (server-side rendering) or CSR (client-side rendering), etc.

>So also the internationalization, right?

## How to optimize Next.js apps to best work with translations on server side and on client side with next-i18next?

*If you're using Next.js 13 with app directory, have a look at [this blog post](../next-13-app-dir-i18n/).*

Let's take the example of [next-i18next](https://github.com/i18next/next-i18next).
While next-i18next uses [i18next](https://www.i18next.com) and [react-i18next](https://react.i18next.com) under the hood, users of next-i18next simply need to include their translation content as JSON files and don't have to worry about much else.

By default, there is one [next-i18next configuration](https://github.com/i18next/next-i18next#next-i18nextconfigjs) that loads the translations from the local directory structure and renders the pages on server side.
<br />
This is ok, it works and is optimized for SEO etc. but there is more we could do.

What if we could power up the seo optimized website with always up-to-date translations without the need to redeploy your app?

We will discuss 2 different setups: [One with an active backend](#ssr) and another [one completely statically generated](#ssg).

The basic target is always the same: We want everything to be SEO optimized in all languages and serve always the newest translations to our users.

## Example with a backend server <a name="ssr"></a>

![](next-build.jpg)

Having a backend server does not mean you are forced to run your own server. It can also be a PaaS or serverless solution, like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/), etc.

Ok, let's start with the default:
<br />
You followed the normal [next-i18next setup guide](https://github.com/i18next/next-i18next#setup) and now your translations are organized more or less as such:

```
.
└── public
    └── locales
        ├── en
        |   └── common.json
        └── de
            └── common.json
```

Now let's connect to an awesome translation management system and manage your translations outside of your code.

Let's synchronize the translation files with [locize](https://locize.com).
This can be done on-demand or on the CI-Server or before deploying the app.

### What to do to reach this step:
1. in locize: signup at https://locize.app/register and [login](https://docs.locize.com/integration/getting-started/create-a-user-account)
2. in locize: [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project)
3. in locize: add all your additional languages (this can also be done via [API](https://docs.locize.com/integration/api#add-new-language))
4. install the [locize-cli](https://github.com/locize/locize-cli) (`npm i locize-cli`)

### Use the [locize-cli](https://github.com/locize/locize-cli)
Use the `locize sync` command to synchronize your local repository (`public/locales`) with what is published on locize.

Alternatively, you can also use the `locize download` command to always download the published locize translations to your local repository (`public/locales`) before bundling your app.

> But you were talking about having always up-to-date translations without the need to redeploy your app?

### Yes, let's adapt for that:

We will use the [i18next-locize-backend plugin](https://github.com/locize/i18next-locize-backend), but only on client side.

Together with some other i18next dependencies:

- [i18next-locize-backend](https://github.com/locize/i18next-locize-backend)
- [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)
- [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)

`npm install i18next-locize-backend i18next-chained-backend i18next-localstorage-backend`

And we adapt the `next-i18next.config.js` file:

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it'],
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : []
}
```

And then remove the `serverSideTranslation` to [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) or [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) (depending on your case) in the page-level components.

```javascript
//
// Without the getStaticProps or getServerSideProps function,
// the translsations are loaded via configured i18next backend.
//
// export const getStaticProps = async ({ locale }) => {
//   return {
//     props: await serverSideTranslations(locale, ['common', 'footer'])
//   }
// }
```

### That's it! Let's check the result:

The HTML returned from the server looks correctly translated. So this is well optimized for search engines.
![](ssr-translations.jpg)

And on client side, the up-to-date translations are directly fetched from the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network).
![](client-loading.jpg)

🙀 This means you can fix translations without having to change your code or redeploy your app. 🤩

*🧑‍💻 The code can be found [here](https://github.com/locize/next-i18next-locize).*


#### Additional hint:

If you've configured [caching](https://docs.locize.com/more/caching) for your locize version, you may not need the [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend) and [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) plugin.

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it'],
  },
  backend: isBrowser ? {
    projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
    version: 'production'
  } : undefined,
  serializeConfig: false,
  use: isBrowser ? [LocizeBackend] : []
}
```

### Alternative usage: <a name="alternative-usage"></a>

In case you're using the [ready flag](https://react.i18next.com/latest/usetranslation-hook#not-using-suspense) and are seeing a warning like this: `Expected server HTML to contain a matching text node for...` this is because of the following reason:

The server rendered the correct translation text, but the client still needs to lazy load the translations and will show a different UI. This means there's hydration mismatch.

This can be prevented by keeping the `getServerSideProps` or `getStaticProps` function but making use of the [`reloadResources`](https://www.i18next.com/overview/api#reloadresources) functionality of i18next.

```javascript
const LazyReloadPage = () => {

  const { t, i18n } = useTranslation(['lazy-reload-page', 'footer'], { bindI18n: 'languageChanged loaded' })
  // bindI18n: loaded is needed because of the reloadResources call
  // if all pages use the reloadResources mechanism, the bindI18n option can also be defined in next-i18next.config.js
  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ['lazy-reload-page', 'footer'])
  }, [])

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <Link href='/'>
          <button
            type='button'
          >
            {t('back-to-home')}
          </button>
        </Link>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['lazy-reload-page', 'footer']),
  },
})

export default LazyReloadPage
```

This way the ready check is also not necessary anymore, because the translations served directly by the server are used. And as soon the translations are reloaded, new translations are shown.



## Static Website example <a name="ssg"></a>

![](next-export.jpg)

With this example, we just need a static webserver, like [GitHub Pages](https://pages.github.com/) or similar.

It's pretty much the same as with [above example](#ssr), but there are some little things we need to additionally consider.

To work with static-site generation (SSG) we need to use the `next export` command, but...

>Error: i18n support is not compatible with next export. See here for more info on deploying: https://nextjs.org/docs/deployment

This happens if you're using the [internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing) feature and are trying to generate a [static HTML export](https://nextjs.org/docs/advanced-features/static-html-export) by executing `next export`.
Well, this features requires a Node.js server, or dynamic logic that cannot be computed during the build process, that's why it is [unsupported](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features).

There is a [dedicated article](../next-i18n-static/) with a solution to that Next.js problem. [Follow that guide first!](../next-i18n-static/)
[![](../next-i18n-static/title.jpg)](../next-i18n-static/)

### Done so? Then let's continue here:

It's the same `next-i18next.config.js` config like in the [previous example](#ssr):

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

// If you've configured caching for your locize version, you may not need the i18next-localstorage-backend and i18next-chained-backend plugin.
// https://docs.locize.com/more/caching

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it'],
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : []
}
```

Extend the `makeStaticProps` function with options (`emptyI18nStoreStore`):

```javascript
export function makeStaticProps(ns = [], opt = {}) {
  return async function getStaticProps(ctx) {
    const props = await getI18nProps(ctx, ns)
    if (opt.emptyI18nStoreStore) {
      // let the client fetch the translations
      props._nextI18Next.initialI18nStore = null
    }
    return {
      props
    }
  }
}
```

...and use it accordingly:

```javascript
const getStaticProps = makeStaticProps(['common', 'footer'], { emptyI18nStoreStore: true })
export { getStaticPaths, getStaticProps }
```

### That's it! Let's check the result:

The generated static HTML looks correctly translated. So this is well optimized for search engines.
![](ssg-translations.jpg)

And on client side, the up-to-date translations are directly fetched from the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network).
![](client-loading.jpg)

🙀 This means you can fix translations without having to change your code or redeploy your app. And without owning an active server. 🤩

*🧑‍💻 The code can be found [here](https://github.com/i18next/next-language-detector/tree/main/examples/client-loading).*


## Continuous Localization

Since we're now "connected" to as smart [translation management system](https://lociize.com), we can try to make use of its full potential.

### save missing translations <a name="save-missing"></a>

>I wish newly added keys in the code, would automatically be saved to locize.

**Your wish is my command!**

Extend the next-i18next config with the locize api-key and set `saveMissing: true`:

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: {
    projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
    apiKey: '14bbe1fa-6ffc-40f5-9226-7462aa4a042f',
    version: 'latest'
  },
  serializeConfig: false,
  use: isBrowser ? [LocizeBackend] : [],
  saveMissing: true // do not set saveMissing to true for production and also not when using the chained backend
}
```

Each time you'll use a new key, it will be sent to locize, i.e.:

```javascript
<div>{t('new.key', 'this will be added automatically')}</div>
```

will result in locize like this:

![missing key](missing_key.jpg "locize © inweso GmbH")


#### 👀 but there's more... <a name="more"></a>

Thanks to the [locize-lastused](https://github.com/locize/locize-lastused) plugin, you'll be able to [find and filter in locize which keys are used or not used anymore](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

With the help of the [locize](https://github.com/locize/locize) plugin, you'll be able to use your app within the locize [InContext Editor](https://docs.locize.com/more/incontext-editor).

Lastly, with the help of the [auto-machinetranslation workflow](https://docs.locize.com/whats-inside/auto-machine-translation) and the use of the [saveMissing functionality](https://www.i18next.com/overview/configuration-options#missing-keys), new keys not only gets added to locize automatically, while developing the app, but are also automatically translated into the target languages using machine translation.

*Check out this [video](https://youtu.be/VfxBpSXarlU) to see how the automatic machine translation workflow looks like!*

{% youtube VfxBpSXarlU %}

`npm install locize-lastused locize`

use them like this:

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')

const isBrowser = typeof window !== 'undefined'

const locizeOptions = {
  projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
  apiKey: '14bbe1fa-6ffc-40f5-9226-7462aa4a042f',
  version: 'latest'
}

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: locizeOptions,
  locizeLastUsed: locizeOptions,
  serializeConfig: false,
  use: isBrowser ? [LocizeBackend, require('locize').locizePlugin, require('locize-lastused/cjs')] : [], // do not use locize-lastused on production
  saveMissing: true // do not set saveMissing to true for production and also not when using the chained backend
}
```

[Automatic machine translation](https://docs.locize.com/whats-inside/auto-machine-translation):

![missing key auto](missing_key_auto_mt.jpg "locize © inweso GmbH")

[Last used translations filter]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![i18next last used](last_used.jpg "locize © inweso GmbH")

[InContext Editor](https://docs.locize.com/more/incontext-editor):

![i18next incontext](in_context.jpg "locize © inweso GmbH")

#### 📦 Let's prepare for production 🚀 <a name="production"></a>

Now, we prepare the app for [going to production](https://docs.locize.com/guides-tips-and-tricks/going-production).

First in locize, create a dedicated version for production. Do not enable auto publish for that version but publish manually or via [API](https://docs.locize.com/integration/api#publish-version) or via [CLI](https://github.com/locize/locize-cli#publish-version).
Lastly, [enable Cache-Control max-age​](https://docs.locize.com/more/caching) for that production version.

Let's adapt the `next-i18next.config.js` file once again:

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')

const isBrowser = typeof window !== 'undefined'

const locizeOptions = {
  projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
  apiKey: '14bbe1fa-6ffc-40f5-9226-7462aa4a042f',
  version: 'latest'
}

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: locizeOptions,
  locizeLastUsed: locizeOptions,
  serializeConfig: false,
  use: isBrowser ? [LocizeBackend, require('locize').locizePlugin, require('locize-lastused/cjs')] : [], // do not use locize-lastused on production
  saveMissing: true // do not set saveMissing to true for production and also not when using the chained backend
}
```

Now, during development, you'll continue to save missing keys and to make use of lastused feature. => `npm run dev`

And in production environment, saveMissing and lastused are disabled. => `npm run build && npm start`


[Caching](https://docs.locize.com/more/caching):

![i18next caching](caching.jpg "locize © inweso GmbH")

[Merging versions](https://docs.locize.com/more/versioning#merging-versions):

![overwrite version](overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 The complete code can be found [here](https://github.com/locize/next-i18next-locize).*

*Check also the [code integration part](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in this [YouTube video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

There's also an [i18next crash course video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


## 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

Awesome! Thanks to [next-i18next](https://github.com/i18next/next-i18next), [i18next](https://www.i18next.com), [react-i18next](https://react.i18next.com) and [locize](https://locize.com) your continuous localization workflow is ready to go.

So if you want to take your i18n topic to the next level, it's worth trying the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So by using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

## 👍
