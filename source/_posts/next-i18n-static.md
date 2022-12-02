---
title: Static HTML Export with i18n compatibility in Next.js
description: How to generate a static HTML export with i18n compatibility in Next.js.

date: 2021-12-07
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
thumbnail: next-i18n-static/title.jpg
redirect_from:
- /2021-12-07-next-i18n-static

label: next-i18n-static
lang: en
---

![](title.jpg "Next.js SSG example")

You know [Next.js](https://nextjs.org), right? - If not, stop reading this article and make something else.

Next.js is awesome! It gives you the best developer experience with all the features you need...


## TOC
  * [BUT, you may have heard about this](#but)
  * [So what can we do now?](#what-do)
  * [The recipe](#recipe)
  * [The outcome](#outcome)
  * [The voluntary part](#voluntary)
  * [🎉🥳 Congratulations 🎊🎁](#congratulations)
      

# **BUT**, you may have heard about this: <a name="but"></a>

>Error: i18n support is not compatible with next export. See here for more info on deploying: https://nextjs.org/docs/deployment

This happens if you're using the [internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing) feature and are trying to generate a [static HTML export](https://nextjs.org/docs/advanced-features/static-html-export) by executing `next export`.
Well, this features requires a Node.js server, or dynamic logic that cannot be computed during the build process, that's why it is [unsupported](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features).

This is the case if you're using [next-i18next](https://github.com/i18next/next-i18next) for example.

# So what can we do now? <a name="what-do"></a>

![](what.jpg)

An obvious option is, to renounce to the static HTML export and use a Node.js server or [Vercel](https://vercel.com) as deployment environment.

But sometimes, due to company or architectural guidelines it is mandatory to use a static web server.
<br/>
Ok then renounce to i18n? - Not really, if we are here, it seems like to be a requirement.
<br/>
So then do it without [Next.js](https://nextjs.org)? - But this usually means to rewrite the whole project.

Executing `next export` when not using i18n seems to work.
What if we do not try to use the [internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing) feature and do the i18n routing on our own?


# The recipe <a name="recipe"></a>

![](cook-book.jpg "recipe")

To "cook" this recipe you will need the following ingredients:

- use the [dynamic route segments](https://nextjs.org/docs/routing/introduction#dynamic-route-segments) feature
- willingness to change the structure of your project files
- willingness to adapt a bit of code
- a logic to detect the user language and redirect accordingly

Sounds feasible. Let's start!


**1. Remove the i18n options from `next.config.js`.**

  ```diff
  - const { i18n } = require('./next-i18next.config')
  - 
  module.exports = {
  -   i18n,
    trailingSlash: true,
  }
  ```

**2. Create a `[locale]` folder inside your pages directory.**

  a) Move all your pages files to that folder *(not `_app.js` or `_document.js` etc..)*.

  b) Adapt your imports, if needed.

**3. Create a `getStatic.js` file and place it for example in a `lib` directory.**

  ```js
  import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
  import i18nextConfig from '../next-i18next.config'

  export const getI18nPaths = () =>
    i18nextConfig.i18n.locales.map((lng) => ({
      params: {
        locale: lng
      }
    }))

  export const getStaticPaths = () => ({
    fallback: false,
    paths: getI18nPaths()
  })

  export async function getI18nProps(ctx, ns = ['common']) {
    const locale = ctx?.params?.locale
    let props = {
      ...(await serverSideTranslations(locale, ns))
    }
    return props
  }

  export function makeStaticProps(ns = {}) {
    return async function getStaticProps(ctx) {
      return {
        props: await getI18nProps(ctx, ns)
      }
    }
  }
  ```

**4. Use `getStaticPaths` and `makeStaticProps` in your pages, like this:**

  ```diff
  import { useTranslation } from 'next-i18next'
  import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
  import { Header } from '../../components/Header'
  import { Footer } from '../../components/Footer'
  import Link from '../../components/Link'

  + const getStaticProps = makeStaticProps(['common', 'footer'])
  + export { getStaticPaths, getStaticProps }

  const Homepage = () => {
    const { t } = useTranslation('common')

    return (
      <>
        <main>
          <Header heading={t('h1')} title={t('title')} />
          <div>
            <Link href='/second-page'><button type='button'>{t('to-second-page')}</button></Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  export default Homepage
  ```

**5. Install [next-language-detector](https://github.com/i18next/next-language-detector).**

  `npm i next-language-detector`

**6. Create a `languageDetector.js` file and place it for example in the `lib` directory.**

  ```js
  import languageDetector from 'next-language-detector'
  import i18nextConfig from '../next-i18next.config'

  export default languageDetector({
    supportedLngs: i18nextConfig.i18n.locales,
    fallbackLng: i18nextConfig.i18n.defaultLocale
  })
  ```

**7. Create a `redirect.js` file and place it for example in the `lib` directory.**

  ```js
  import { useEffect } from 'react'
  import { useRouter } from 'next/router'
  import languageDetector from './languageDetector'

  export const useRedirect = (to) => {
    const router = useRouter()
    to = to || router.asPath

    // language detection
    useEffect(() => {
      const detectedLng = languageDetector.detect()
      if (to.startsWith('/' + detectedLng) && router.route === '/404') { // prevent endless loop
        router.replace('/' + detectedLng + router.route)
        return
      }

      languageDetector.cache(detectedLng)
      router.replace('/' + detectedLng + to)
    })

    return <></>
  };

  export const Redirect = () => {
    useRedirect()
    return <></>
  }

  // eslint-disable-next-line react/display-name
  export const getRedirect = (to) => () => {
    useRedirect(to)
    return <></>
  }
  ```

**8. For each of your pages files in your `[locale]` directory, but especially for the `index.js` file, create a file with the same name with this content:**

  ```js
  import { Redirect } from '../lib/redirect'
  export default Redirect
  ```

**9. Create a `Link.js` component and place it for example in the `components` directory.**

  ```js
  import React from 'react'
  import Link from 'next/link'
  import { useRouter } from 'next/router'

  const LinkComponent = ({ children, skipLocaleHandling, ...rest }) => {
    const router = useRouter()
    const locale = rest.locale || router.query.locale || ''

    let href = rest.href || router.asPath
    if (href.indexOf('http') === 0) skipLocaleHandling = true
    if (locale && !skipLocaleHandling) {
      href = href
        ? `/${locale}${href}`
        : router.pathname.replace('[locale]', locale)
    }

    return (
      <>
        <Link href={href}>
          <a {...rest}>{children}</a>
        </Link>
      </>
    )
  }

  export default LinkComponent
  ```

**10. Replace al `next/link` `Link` imports with the appropriate `../components/Link` `Link` import:**

  ```diff
  - import Link from 'next/link'
  + import Link from '../../components/Link'
  ```

**11. Add or modify your `_document.js` file to set the correct html `lang` attribute:**

  ```js
  import Document, { Html, Head, Main, NextScript } from 'next/document'
  import i18nextConfig from '../next-i18next.config'

  class MyDocument extends Document {
    render() {
      const currentLocale = this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale
      return (
        <Html lang={currentLocale}>
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }

  export default MyDocument
  ```

**12. In case you have a language switcher, create or adapt it:**

  ```js
  // components/LanguageSwitchLink.js
  import languageDetector from '../lib/languageDetector'
  import { useRouter } from 'next/router'
  import Link from 'next/link'

  const LanguageSwitchLink = ({ locale, ...rest }) => {
    const router = useRouter()

    let href = rest.href || router.asPath
    let pName = router.pathname
    Object.keys(router.query).forEach((k) => {
      if (k === 'locale') {
        pName = pName.replace(`[${k}]`, locale)
        return
      }
      pName = pName.replace(`[${k}]`, router.query[k])
    })
    if (locale) {
      href = rest.href ? `/${locale}${rest.href}` : pName
    }

    return (
      <Link
        href={href}
        onClick={() => languageDetector.cache(locale)}
      >
        <button style={{ fontSize: 'small' }}>{locale}</button>
      </Link>
    );
  };

  export default LanguageSwitchLink
  ```

  ```js
  // components/Footer.js
  import { useTranslation } from 'next-i18next'
  import { useRouter } from 'next/router'
  import LanguageSwitchLink from './LanguageSwitchLink'
  import i18nextConfig from '../next-i18next.config'

  export const Footer = () => {
    const router = useRouter()
    const { t } = useTranslation('footer')
    const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale

    return (
      <footer>
        <p>
          <span style={{ lineHeight: '4.65em', fontSize: 'small' }}>{t('change-locale')}</span>
          {i18nextConfig.i18n.locales.map((locale) => {
            if (locale === currentLocale) return null
            return (
              <LanguageSwitchLink
                locale={locale}
                key={locale}
              />
            )
          })}
        </p>
      </footer>
    )
  }
  ```


# The outcome <a name="outcome"></a>

![](result.jpg)

If you now start your project (`next dev`) you should see, more or less, the same behaviour as before.

So what's the benefit?

Try: `next build && next export`

You should see something like this at the end:

```sh
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)

info  - using build directory: /Users/usr/projects/my-awesome-project/.next
info  - Copying "static build" directory
info  - No "exportPathMap" found in "/Users/usr/projects/my-awesome-project/next.config.js". Generating map from "./pages"
info  - Launching 9 workers
info  - Copying "public" directory
info  - Exporting (3/3)
Export successful. Files written to /Users/usr/projects/my-awesome-project/out
```

**Yeah no `i18n support is not compatible with next export` error anymore!!!**

**Congratulations! Now you can "deploy" the content of your `out` directory to any static web server.**

*🧑‍💻 The complete code can be found [here](https://github.com/i18next/next-language-detector/tree/main/examples/basic).*


# The voluntary part <a name="voluntary"></a>

![transform the localization process](transform_your_localization_process_small.jpg "locize © inweso GmbH")

Connect to an awesome translation management system and manage your translations outside of your code.

Let's synchronize the translation files with [locize](https://locize.com).
This can be done on-demand or on the CI-Server or before deploying the app.

## What to do to reach this step:
1. in locize: signup at https://locize.app/register and [login](https://docs.locize.com/integration/getting-started/create-a-user-account)
2. in locize: [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project)
3. in locize: add all your additional languages (this can also be done via [API](https://docs.locize.com/integration/api#add-new-language))
4. install the [locize-cli](https://github.com/locize/locize-cli) (`npm i locize-cli`)

## Use the [locize-cli](https://github.com/locize/locize-cli)
Use the `locize sync` command to synchronize your local repository (`public/locales`) with what is published on locize.

Alternatively, you can also use the `locize download` command to always download the published locize translations to your local repository (`public/locales`) before bundling your app.


# 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about static site generation (SSG), [Next.js](https://nextjs.org), [next-i18next](https://github.com/i18next/next-i18next), [i18next](https://www.i18next.com) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth to try the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So with using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

# 👍

---

# Looking for an optimized Next.js translations setup?

[![next-i18next](../next-i18next/next-i18next.jpg)](../next-i18next/)
[Here](../next-i18next/) you'll find a blog post on how to best use next-i18next with client side translation download and SEO optimization.
