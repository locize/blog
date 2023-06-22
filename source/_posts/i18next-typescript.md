---
title: "Supercharge Your TypeScript App: Mastering i18next for Type-Safe Translations"
description: Discover how to unleash the full potential of i18next in your TypeScript applications by mastering type-safe translations, ensuring accurate localization and eliminating runtime errors, with this guide. ✅

date: 2023-06-22
tags:
  - i18next
  - react
  - react-i18next
  - typescript
  - types
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
thumbnail: i18next-typescript/title.jpg

label: i18next-typescript
lang: en
---

![TypeScript Localization made easy with this step-by-step guide using i18next ✅](title.jpg "TypeScript Localization example")

As our world becomes increasingly interconnected, the development of web applications that cater to a [global audience](../grow-online-business/) takes precedence among developers. If you're a TypeScript developer, you're likely acquainted with the advantages of static typing and the assurance it provides in your codebase. When it comes to internationalization ([i18n](../what-is-i18n/)) and localization ([l10n](../what-is-software-localization/)), maintaining the same level of type safety becomes crucial. This is precisely where [i18next](https://www.i18next.com), an influential i18n framework, enters the picture.

In the past, i18next already furnished TypeScript definitions for its API, enabling developers to benefit from type checking while utilizing the library. However, a significant limitation persisted, specifically the absence of type safety for translation keys. Consequently, if a translation resource was missing or underwent a name change, the TypeScript compiler failed to detect it, resulting in potential errors during runtime.

![](ts_api.jpg)

Nevertheless, with the advent of the new iterations of i18next, that limitation has been overcome *(thanks largely to [Pedro Durek](https://github.com/pedrodurek))*. Now, i18n keys boast complete type safety. Whenever a developer employs a non-existent or modified i18n key, the TypeScript compiler immediately raises an error, promptly alerting you to the issue before it gives rise to runtime complications. In addition, there is also an improved intellisense experience.

Within this guide, we will delve into the art of leveraging the latest version of i18next to attain translations that are impervious to type-related errors in your TypeScript applications. We will encompass everything from the fundamentals of i18next setup to advanced techniques. All the while, you will benefit from the added safety net of type checking for your translation keys.

By the conclusion of this guide, you will possess a profound comprehension of how to harness the force of i18next's type-safe translations within your TypeScript projects. You will be equipped to ensure that your translations are not only precise and adaptable but also consistently error-free, courtesy of the seamless integration between i18next and TypeScript. Let us embark on this journey together and furnish you with the knowledge and tools necessary to create localized applications that effortlessly cater to diverse language preferences while maintaining the robustness of your codebase.


## In-Memory translations <a name="in-memory-translations"></a>

For a simple i18next setup, you probably have something like this:

```ts
import i18next from 'i18next';
import enNs1 from './locales/en/ns1.json';
import enNs2 from './locales/en/ns2.json';
import deNs1 from './locales/de/ns1.json';
import deNs2 from './locales/de/ns2.json';

i18next.init({
  debug: true,
  fallbackLng: 'en',
  defaultNS: 'ns1',
  resources: {
    en: {
      ns1: enNs1,
      ns2: enNs2,
    },
    de: {
      ns1: deNs1,
      ns2: deNs2,
    },
  },
});
```

You import the translation resources and your adding them via i18next [init](https://www.i18next.com/overview/api#init) function.

To make the translation type-safe, we create an `i18next.d.ts` file preferably in a `@types` folder and we import the translation resources of our reference language:

```ts
import enNs1 from '../locales/en/ns1.json';
import enNs2 from '../locales/en/ns2.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: {
      ns1: typeof enNs1;
      ns2: typeof enNs2;
    };
  }
}
```

![](inmemory_ts_1.jpg)

<p>
  That's already great! But: <a target="_blank" rel="noopener" href="https://youtu.be/m-lSlJc_5NE">We Can Do Better</a>! 😜
  <a target="_blank" rel="noopener" href="https://youtu.be/m-lSlJc_5NE">
    <img class="ignore-gallery-item" src="do_better.gif" loading="lazy" width="480" height="176" style="float: right; margin: 0 0 0 15px;">
  </a>
</p>

<br style="clear: both;" />

With the help of [i18next-resources-for-ts](https://github.com/i18next/i18next-resources-for-ts) we can generate a single resource file that we can use.

So install `i18next-resources-for-ts` and execute the `toc` command, i.e. something like: `i18next-resources-for-ts toc -i ./locales/en -o ./@types/resources.ts`

So we can modify the `i18next.d.ts` file like this:

```ts
import resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: typeof resources;
  }
}
```

🧑‍💻 A complete code example can be found [here](https://github.com/locize/i18next-typescript-examples/tree/main/1).

### Plurals <a name="plurals"></a>

btw: also plural keys works:

![](plurals_ts.jpg)

### Fallback Namespace <a name="fallbackns"></a>

And also fallback namespace handling works:

```ts
// @types/i18next.d.ts
import resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    fallbackNS: 'fallback';
    resources: typeof resources;
  }
}
```

```js
// works because of fallbackNS
i18next.t('fallbackKey')
```

### Interpolation <a name="interpolation"></a>

Unfortunately, automatic interpolation inference won't work if your translations are placed in JSON files, only in TS files using `as const` keyword or an interface in a `d.ts` file, as long as [this TypeScript issue](https://github.com/microsoft/TypeScript/issues/32063) is not addressed.

![](interpolation_ts_nok.jpg)

### Interface <a name="in-memory-translations-interface"></a>

To address this, let's make use of the `interface` command, i.e. something like: `i18next-resources-for-ts interface -i ./locales/en -o ./@types/resources.d.ts`

This way we can change the `i18next.d.ts` file like this:

```ts
import Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: Resources;
  }
}
```

Now the interpolation inference works and fails if the passed variable name does not match:

![](interpolation_ts_ok.jpg)

🧑‍💻 A complete code example can be found [here](https://github.com/locize/i18next-typescript-examples/tree/main/2).


## React.js <a name="react"></a>

A React.js based i18next setup with in-memory translation resources could also [look very similar](https://github.com/locize/i18next-typescript-examples/tree/main/3) to the above example, so let's raise the bar a little bit and see what a setup with lazy loading translations like with [i18next-http-backend](https://github.com/i18next/i18next-http-backend) looks like:

```ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    debug: true,
    fallbackLng: 'en',
    defaultNS: 'ns1',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18next;
```

To make the translation type-safe, we again create an `i18next.d.ts` file preferably in a `@types` folder like this:

```ts
import Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: Resources;
  }
}
```

And again we make use of the `interface` command, i.e. something like: `i18next-resources-for-ts interface -i ./public/locales/en -o ./src/@types/resources.d.ts`

This way, the translations are loaded at runtime, but the translations are type-checked during development.

With the new [react-i18next](https://react.i18next.com) version, when loading multiple namespaces, `t` function will infer and accept the keys for the first namespace. So this pattern is now accepted:

```ts
import { useTranslation } from 'react-i18next';

function Comp2() {
  const {t} = useTranslation(['ns1', 'ns2']);

  return (
    <div className="App">
      <p>{t('description.part1')}</p>
      <p>{t('description.part1', { ns: 'ns1' })}</p>
      <p>{t('description.part2', { ns: 'ns2' })}</p>
    </div>
  );
}

export default Comp2;
```

### Trans component <a name="trans"></a>

And also the [`Trans` component](https://react.i18next.com/latest/trans-component) is type-safe:

```ts
import { useTranslation, Trans } from 'react-i18next';

function Comp1() {
  const {t} = useTranslation();

  return (
    <div className="App">
      <p>
        <Trans i18nKey="title">
          Welcome to react using <code>react-i18next</code> fully type-safe
        </Trans>
      </p>
      <p>{t('description.part1')}</p>
      <p>{t('description.part2')}</p>
    </div>
  );
}

export default Comp1;
```

![](react_trans_ts.jpg)

🧑‍💻 A complete code example can be found [here](https://github.com/locize/i18next-typescript-examples/tree/main/4).


## No app-bundled/provided translations <a name="locize"></a>

There is also a way to keep the translations completely separate from your code repository while maintaining type safety.

Let's take the React.js project used in [this awesome guide](../react-i18next/)...

The final i18next setup in this example looks like this:

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';
import LastUsed from 'locize-lastused';
import { locizePlugin } from 'locize';
import { DateTime } from 'luxon';

const isProduction = process.env.NODE_ENV === 'production';

const locizeOptions = {
  projectId: process.env.REACT_APP_LOCIZE_PROJECTID as string,
  apiKey: process.env.REACT_APP_LOCIZE_APIKEY as string,
  referenceLng: process.env.REACT_APP_LOCIZE_REFLNG as string,
  version: process.env.REACT_APP_LOCIZE_VERSION as string
};

if (!isProduction) {
  i18n.use(LastUsed);
}

i18n
  .use(locizePlugin)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    backend: locizeOptions,
    locizeLastUsed: locizeOptions,
    saveMissing: !isProduction
  });

i18n.services.formatter?.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng as string).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

So at runtime we load the translation directly from the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network).

>So how do we get type-safe translations during development?

We create some npm scripts to help us:

1. Download the published translations (in reference language) to a temporary directory, i.e.:

  `downloadEn`: `locize download --project-id=0bbc223a-9aba-4a90-ab93-ab9d7bf7f780 --language=en --ver=latest --clean=true --path=./src/@types/locales`

2. Create the appropriate interface definition file, i.e.: `interface`:

  `i18next-resources-for-ts interface -i ./src/@types/locales -o ./src/@types/resources.d.ts`

3. Final script: download, create interface and delete the temporary files, i.e.:

  `update-interface`: `npm run downloadEn && npm run interface && rm -rf ./src/@types/locales`


Like in the previous example, we now can just import that interface in our `i18next.d.ts` file:

```ts
import Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
```

That's it!

![](not_existing_key.jpg)

The translations are separated from our code repository and at the same time we maintain type safety with the help of an interface.

🧑‍💻 A complete code example can be found [here](https://github.com/locize/i18next-typescript-examples/tree/main/5).


## 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

In conclusion, mastering i18next for type-safe translations empowers TypeScript developers to unlock the full potential of their applications. By ensuring accurate localization, eliminating runtime errors, and leveraging the seamless integration between i18next and TypeScript, developers can create robust, localized applications that cater to diverse language preferences. With the knowledge and tools provided in this guide, you are equipped to supercharge your TypeScript app and deliver exceptional user experiences on a global scale.
<br />
**Happy coding!**

So if you want to take your i18n topic to the next level, it's worth trying the [localization management platform - locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So by using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

## 👍

<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Can I use i18next for type-safe translations in JavaScript projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While i18next itself is primarily designed for JavaScript projects, the concept of type-safe translations is most beneficial when using TypeScript. TypeScript provides static type checking, which helps catch errors and provides enhanced developer experience when working with i18next."
      }
    },{
      "@type": "Question",
      "name": "How does type safety improve the localization process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Type safety ensures that translation keys are validated during development, preventing potential runtime errors. It allows developers to catch missing or modified translation keys early, improving the overall quality and reliability of localized applications."
      }
    },{
      "@type": "Question",
      "name": "Can I still use i18next with type safety if my project has dynamic translations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can still achieve type safety with dynamic translations. By using techniques like generating resource files or defining interfaces for your translations, you can maintain type safety even with dynamically loaded translation content."
      }
    },{
      "@type": "Question",
      "name": "Are there any performance implications when using type-safe translations with i18next?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Type-safe translations themselves do not significantly impact runtime performance. The primary focus is on enhancing developer productivity, reducing errors, and improving code quality. The performance of the application largely depends on how i18next is implemented and the size of translation resources."
      }
    },{
      "@type": "Question",
      "name": "Are there any limitations or trade-offs when using type-safe translations with i18next?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While type-safe translations provide numerous benefits, there are a few limitations to consider. For example, automatic interpolation inference may not work with translations placed in JSON files. Additionally, if your translations are separated from your code repository, you need to ensure synchronization between translation updates and your codebase."
      }
    }]
  }
</script>
