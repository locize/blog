---
title: i18n with Next.js 13 and app directory (an i18next guide)
description: Looking for a way to internationalize your Next.js 13 project with the new app directory feature? Then this guide is for you!

date: 2023-01-02
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
thumbnail: next-13-app-dir-i18n/next-13-app-dir-i18n.jpg

label: next-13-app-dir-i18n
lang: en
---

![](next-13-app-dir-i18n.jpg "locize © inweso GmbH")

At [Next.js Conf](https://nextjs.org/conf), the [Vercel](https://vercel.com) team [announced Next.js 13](https://nextjs.org/blog/next-13) which introduced the new [app directory](https://beta.nextjs.org/docs/app-directory-roadmap).
<br />
It includes support for [Layouts](https://nextjs.org/blog/next-13#layouts), [Server Components](https://nextjs.org/blog/next-13#server-components), [Streaming](https://nextjs.org/blog/next-13#streaming) and [Support for Data Fetching](https://nextjs.org/blog/next-13#data-fetching).

> Awesome! **Next.js 13** has been [released](https://nextjs.org/blog/next-13)!
<br />
It seems pretty fast and it lays the foundations to be dynamic without limits.

## Afterthoughts...

This sounds good, but looking more into the app directory, it looks like this is a completely new Next.js setup... not really comparable to the old one...

> What does this mean regarding i18n?

Looking at the [docs](https://beta.nextjs.org/docs/app-directory-roadmap#not-planned-features) it seems our old approaches will not work anymore.

![](not-planned.jpg)

Nice features provided by [next-i18next](https://next.i18next.com) *(and other Next.js related i18n modules)*, like described [here](../next-i18next/) and [here](../next-i18n-static/) are not suited to this new app directory setup.

## A new approach

In this section, you'll see how we can internationalize the new app directory with the use of [i18next](https://www.i18next.com), [react-i18next](https://react.i18next.com) and [i18next-resources-to-backend](https://github.com/i18next/i18next-resources-to-backend).
<br />
`npm install i18next react-i18next i18next-resources-to-backend`

1. [Folder structure](#step-1)
2. [Language detection](#step-2)
3. [i18n instrumentation](#step-3)
4. [Language switcher](#step-4)
5. [Client side](#step-5)
6. [Bonus](#step-6)


### 1. Folder structure <a name="step-1"></a>

Let's start by creating a new folder structure that uses the language as url parameter. A so-called [dynamic segment](https://beta.nextjs.org/docs/routing/defining-routes#dynamic-segments):

```
.
└── app
    └── [lng]
        ├── second-page
        |   └── page.js
        ├── layout.js
        └── page.js
```

The `app/[lng]/page.js` file could look like this:

```js
import Link from 'next/link'

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>Hi there!</h1>
      <Link href={`/${lng}/second-page`}>
        second page
      </Link>
    </>
  )
}
```

And the `app/[lng]/second-page/page.js` file could look like this:

```js
import Link from 'next/link'

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>Hi from second page!</h1>
      <Link href={`/${lng}`}>
        back
      </Link>
    </>
  )
}
```

Last the `app/[lng]/layout.js` file could look like this:

```js
import { dir } from 'i18next'

const languages = ['en', 'de']

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
```

## 2. Language detection <a name="step-2"></a>

Now navigating to `http://localhost:3000/en` or `http://localhost:3000/de` should show something, and also the links to the second page and back should work, but navigating to `http://localhost:3000` will return a 404 error.
<br />
To fix that we'll create a Next.js middleware and refactor a bit of code:

Let's first create a new file `app/i18n/settings.js`:

```js
export const fallbackLng = 'en'
export const languages = [fallbackLng, 'de']
```

Then adapt the `app/[lng]/layout.js` file:

```js
import { dir } from 'i18next'
import { languages } from '../i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
```

And finally create a `middleware.js` file:
<br />
`npm install accept-language`

```js
import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

const cookieName = 'i18next'

export function middleware(req) {
  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}
```

![](middleware.gif)

Navigating to the root path `/` will now check if there's already a cookie with the last chosen language, as fallback it will check the `Accept-Language` header and the last fallback is the defined fallback language.
<br />
The detected language will be used to redirect to the appropriate page.


## 3. i18n instrumentation <a name="step-3"></a>

Let's prepare i18next in the `app/i18n/index.js` file:
<br />
We're not using the i18next singleton here but creating a new instance on each `useTranslation` call, because during compilation everything seems to be executed in parallel. Having a separate instance will keep the translations consistent.

```js
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

const initI18next = async (lng, ns) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}
```

In the `app/i18n/settings.js` file we'll add the i18next options:
<br />

```js
export const fallbackLng = 'en'
export const languages = [fallbackLng, 'de']
export const defaultNS = 'translation'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}
```

Let's prepare some translation files:

```
.
└── app
    └── i18n
        └── locales
            ├── en
            |   ├── translation.json
            |   └── second-page.json
            └── de
                ├── translation.json
                └── second-page.json
```

`app/i18n/locales/en/translation.json`:
```json
{
  "title": "Hi there!",
  "to-second-page": "To second page"
}
```

`app/i18n/locales/de/translation.json`:
```json
{
  "title": "Hallo Leute!",
  "to-second-page": "Zur zweiten Seite"
}
```

`app/i18n/locales/en/second-page.json`:
```json
{
  "title": "Hi from second page!",
  "back-to-home": "Back to home"
}
```

`app/i18n/locales/de/second-page.json`:
```json
{
  "title": "Hallo von der zweiten Seite!",
  "back-to-home": "Zurück zur Hauptseite"
}
```


Now we're ready to use that in our pages...
<br />
Server pages can by `async` this way we can await the `useTranslation` response.

`app/[lng]/page.js`:

```js
import Link from 'next/link'
import { useTranslation } from '../i18n'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
    </>
  )
}
```

`app/[lng]/second-page/page.js`:

```js
import Link from 'next/link'
import { useTranslation } from '../../i18n'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng, 'second-page')
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>
        {t('back-to-home')}
      </Link>
    </>
  )
}
```

![](app_de_1.jpg)

### 4. Language switcher <a name="step-4"></a>

Now let's define a language switcher in a Footer component:

`app/[lng]/components/Footer/index.js`:

```js
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'
import { useTranslation } from '../../../i18n'

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
        )
      })}
    </footer>
  )
}
```

You see we can also use the [react-i18next Trans component](https://react.i18next.com/latest/trans-component).

A new namespace:

`app/i18n/locales/en/footer.json`:

```json
{
  "languageSwitcher": "Switch from <1>{{lng}}</1> to: "
}
```

`app/i18n/locales/de/footer.json`:

```json
{
  "languageSwitcher": "Wechseln von <1>{{lng}}</1> nach: "
}
```

And add that Footer component to the pages:

`app/[lng]/page.js`:

```js
import Link from 'next/link'
import { useTranslation } from '../i18n'
import { Footer } from './components/Footer'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}
```

`app/[lng]/second-page/page.js`:

```js
import Link from 'next/link'
import { useTranslation } from '../../i18n'
import { Footer } from '../components/Footer'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng, 'second-page')
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>
        {t('back-to-home')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}
```

![](switcher.gif)

**🥳 Awesome, you've just created your first language switcher!**


### 5. Client side <a name="step-5"></a>

So far we've created server side pages only.
<br />
So what do client side pages look like?

Since client side react components can't `async` we need to do some adjustments.


Let's introduce the `app/i18n/client.js` file:

```js
'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

// 
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : []
  })

export function useTranslation(lng, ns, options) {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
  }
  return ret
}
```

On client side the normal i18next singleton is ok. It will be initialized just once. And we can make use of the "normal" useTranslation hook. We just wrap it to have the possibility to pass in the language.

To align with the server side [language detection](#step-2) we make use of [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) and configure it accordingly.


We also need to create 2 versions of the Footer component.


```
.
└── app
    └── [lng]
        └── components
            └── Footer
                ├── client.js
                ├── FooterBase.js
                └── index.js
```

`app/[lng]/components/Footer/FooterBase.js`:

```js
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'

export const FooterBase = ({ t, lng }) => {
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
        )
      })}
    </footer>
  )
}
```

The server side part continuous to use the `async` version, `app/[lng]/components/Footer/index.js`:

```js
import { useTranslation } from '../../../i18n'
import { FooterBase } from './FooterBase'

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}
```

The client side part will use the new `i18n/client` version, `app/[lng]/components/Footer/client.js`:

```js
'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18n/client'

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}
```

A client side page could look like this - `app/[lng]/client-page/page.js`:

```js
'use client'

import Link from 'next/link'
import { useTranslation } from '../../i18n/client'
import { Footer } from '../components/Footer/client'
import { useState } from 'react'

export default function Page({ params: { lng } }) {
  const { t } = useTranslation(lng, 'client-page')
  const [counter, setCounter] = useState(0)
  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('counter', { count: counter })}</p>
      <div>
        <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
        <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
      </div>
      <Link href={`/${lng}`}>
        <button type="button">
          {t('back-to-home')}
        </button>
      </Link>
      <Footer lng={lng} />
    </>
  )
}
```

With some translation resources:

`app/i18n/locales/en/client-page.json`:

```json
{
  "title": "Client page",
  "counter_one": "one selected",
  "counter_other": "{{count}} selected",
  "counter_zero": "none selected",
  "back-to-home": "Back to home"
}
```

`app/i18n/locales/de/client-page.json`:

```json
{
  "title": "Client Seite",
  "counter_one": "eines ausgewählt",
  "counter_other": "{{count}} ausgewählt",
  "counter_zero": "keines ausgewählt",
  "back-to-home": "Zurück zur Hauptseite"
}
```

And a link in our initial page - `app/[lng]/page.js`:

```js
import Link from 'next/link'
import { useTranslation } from '../i18n'
import { Footer } from './components/Footer'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
      <br />
      <Link href={`/${lng}/client-page`}>
        {t('to-client-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}
```

...with translation resources:

`app/i18n/locales/en/translation.json`:
```json
{
  "title": "Hi there!",
  "to-second-page": "To second page",
  "to-client-page": "To client page"
}
```

`app/i18n/locales/de/translation.json`:
```json
{
  "title": "Hallo Leute!",
  "to-second-page": "Zur zweiten Seite",
  "to-client-page": "Zur clientseitigen Seite"
}
```

**🎉🥳 Congratulations 🎊🎁**


The result should look like this:

![](result.gif)

*🧑‍💻 The complete code of an example app can be found [here](https://github.com/i18next/next-13-app-dir-i18next-example).*


### 6. Bonus <a name="step-6"></a>

![transform the localization process](transform_your_localization_process_small.jpg "locize © inweso GmbH")

Connect to an awesome [translation management system](../tms/) and manage your translations outside of your code.

Let's synchronize the translation files with [locize](https://locize.com).
This can be done on-demand or on the CI-Server or before deploying the app.

#### What to do to reach this step:
1. in locize: signup at https://locize.app/register and [login](https://docs.locize.com/integration/getting-started/create-a-user-account)
2. in locize: [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project)
3. install the [locize-cli](https://github.com/locize/locize-cli) (`npm i locize-cli`)
4. in locize: add all your additional languages (this can also be done via [API](https://docs.locize.com/integration/api#add-new-language) or with using the [migrate command](https://github.com/i18next/next-13-app-dir-i18next-example/blob/main/package.json#L10) of the locize-cli)

#### Use the [locize-cli](https://github.com/locize/locize-cli)
Use the `locize download` command to always download the published locize translations to your local repository (`app/i18n/locales`) before bundling your app. *[example](https://github.com/i18next/next-13-app-dir-i18next-example/blob/main/package.json#L11)*

Alternatively, you can also use the `locize sync` command to synchronize your local repository (`app/i18n/locales`) with what is published on locize. *[example](https://github.com/i18next/next-13-app-dir-i18next-example/blob/main/package.json#L12)*


## 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about i18n in the new app directory setup, [Next.js](https://nextjs.org), [i18next](https://www.i18next.com), [react-i18next](https://react.i18next.com), [react-i18next](https://react.i18next.com), [i18next-resources-to-backend](https://github.com/i18next/i18next-resources-to-backend) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth trying the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So by using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

## 👍
