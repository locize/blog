---
title: The Role of i18next and Translation Management Systems in Serverless Architectures
description: The article discusses the role of i18next and Translation Management Systems in serverless architecture for efficient and cost-effective localization.

date: 2023-03-07
tags:
  - i18next
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
  - serverless
  - aws
thumbnail: i18n-serverless/title.jpg

label: i18n-serverless
lang: en
---

![](title.jpg)

In today's globalized world, localization has become a vital factor in ensuring business success. Customers prefer to interact with products and services in their native language, and businesses need to adapt to this demand.
With the emergence of Serverless Architectures, it has become easier for developers to build and deploy applications without worrying about infrastructure management. But how can businesses ensure that their serverless applications are multilingual? In this article, we'll explore the role of [i18next](https://www.i18next.com) and [TMS](../tms/) in serverless architectures and how they can help businesses build and deploy multilingual serverless applications.


## What is Serverless Architecture?

Serverless architecture is a cloud computing model where the cloud provider manages the infrastructure and automatically allocates resources as needed. It's a pay-per-use model, where businesses only pay for the actual usage of the application. Developers can focus on writing code and building applications without worrying about infrastructure management, scalability, and availability.

## What is i18next?

i18next is an open-source internationalization framework for JavaScript that provides a complete solution for managing translations in web applications. It's lightweight and easy to integrate into serverless applications. i18next allows developers to organize translations into files, use interpolation, pluralization, and format translations based on the user's locale. i18next also has support for popular frontend frameworks such as [React](../react-i18next/), [Angular](../angular-i18next/) and [Vue](../i18next-vue/), etc.


## The Challenges of Multilingual Serverless Applications

One of the biggest challenges of building multilingual serverless applications is managing translations. Applications that are built for a global audience require content to be translated into multiple languages. Manually managing translations can be a daunting task, as it involves managing multiple translation files, keeping track of translations, and ensuring consistency across languages. Additionally, deploying multiple versions of the application for each language can be a logistical nightmare, especially if you have to manage multiple tiny parts like [AWS Lambda](https://aws.amazon.com/lambda/) functions.

For classic web applications, you usually have 2 parts where internationalization tasks occur: The client side (usually some modern single page app) and the server side.
The translation resources are usually stored in the same place, so that the client and the server can read them. In case of i18next, the client can access them useing [i18next-http-backend](https://github.com/i18next/i18next-http-backend) and the server can access them using [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend).

- [Here](../react-i18next/#separate) is an example of what this might look like on the client side.
- [Here](../how-does-server-side-internationalization-look-like/#pug) for an example of how this could look on the server side.

But for serverless environments, you may have multiple clients, and you may have multiple small serverless functions that respond to a request in the appropriate language, or send some emails in the user's preferred language, and so on.


## Serverless E-Mails

Let's think about a serverless function that generates and sends some emails.
For example we want to send an invitation to someone.
We need the email address, the recipient's preferred language, an email template and some translations.

To achieve this goal, you usually need to transform some raw data into html content (or text) to be displayed in the user's preferred language.

In this example we will use [pug](https://pugjs.org) (formerly known as "Jade", and also originally created by [TJ Holowaychuk](https://twitter.com/tjholowaychuk)) to define some templates that should be filled with the data needed in the email, and [mjml](https://mjml.io) to actually design the email content.

Let's create a new `mail.js` file, which we can use, to accomplish this.

```javascript
import pug from 'pug'
import mjml2html from 'mjml'

export default (data) => {
  // first let's compile and render the mail template that will include the data needed to show in the mail content
  const mjml = pug.renderFile('./mailTemplate.pug', data)
  
  // then transform the mjml syntax to normal html
  const { html, errors } = mjml2html(mjml)
  if (errors && errors.length > 0) throw new Error(errors[0].message)

  // and return the html, if there where no errors
  return html
}
```

The `mailTemplate.pug` could look like this:

```jade
mjml
  mj-body(background-color='#F4F4F4' color='#55575d' font-family='Arial, sans-serif')
    mj-section(background-color='#024b3f' background-repeat='repeat' padding='20px 0' text-align='center' vertical-align='top')
      mj-column
        mj-image(align='center' padding='10px 25px' src='https://raw.githubusercontent.com/i18next/i18next/master/assets/i18next-ecosystem.jpg')
    mj-section(background-color='#ffffff' background-repeat='repeat' padding='20px 0' text-align='center' vertical-align='top')
      mj-column
    mj-section(background-color='#ffffff' background-repeat='repeat' background-size='auto' padding='20px 0px 20px 0px' text-align='center' vertical-align='top')
      mj-column
        mj-text(align='center' color='#55575d' font-family='Arial, sans-serif' font-size='20px' line-height='28px' padding='0px 25px 0px 25px')
          span=t('greeting', { name: name || 'there' })
          br
          br
        mj-text(align='center' color='#55575d' font-family='Arial, sans-serif' font-size='16px' line-height='28px' padding='0px 25px 0px 25px')
          =t('text')
    mj-section(background-color='#024b3f' background-repeat='repeat' padding='20px 0' text-align='center' vertical-align='top')
      mj-column
        mj-text(align='center' color='#ffffff' font-family='Arial, sans-serif' font-size='13px' line-height='22px' padding='10px 25px')
          =t('ending')&nbsp;
          a(style='color:#ffffff' href='https://www.i18next.com')
            b www.i18next.com
```

Now let's define some translations...

```javascript
// locales/en/translations.json
{
  "greeting": "Hi {{name}}!",
  "text": "You were invited to try i18next.",
  "ending": "Internationalized with"
}

// locales/de/translations.json
{
  "greeting": "Hallo {{name}}!",
  "text": "Du bist eingeladen worden i18next auszuprobieren.",
  "ending": "Internationalisiert mit"
}
```

...and use them in an `i18n.js` file:

```javascript
import { dirname, join } from 'path'
import { readdirSync, lstatSync } from 'fs'
import { fileURLToPath } from 'url'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'

const __dirname = dirname(fileURLToPath(import.meta.url))
const localesFolder = join(__dirname, './locales')

i18next
  .use(Backend)
  .init({
    // debug: true,
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    fallbackLng: 'en',
    preload: readdirSync(localesFolder).filter((fileName) => {
      const joinedPath = join(localesFolder, fileName)
      return lstatSync(joinedPath).isDirectory()
    }),
    ns: 'news-mailer',
    backend: {
      loadPath: join(localesFolder, '{{lng}}/{{ns}}.json')
    }
  })

export default (lng) => i18next.getFixedT(lng)
```

So finally, all the above can be used like that:

```javascript
import mail from './mail.js'
import getT from './i18n.js'

const t = getT('en')

const html = mail({
  t,
  name: 'John'
})
// that html now can be sent via some mail provider...
// await send('john@example.com', t('subject'), html)
```

This is how the resulting html could look like:

![mail preview](mail_preview.jpg)

*🧑‍💻 A code example can be found [here](https://github.com/i18next/i18next-fs-backend/blob/master/example/fastify/app.js#L14-L19).*


## Translation Management Systems in Serverless Architecture

Ok, i18next seems to be able to handle these i18n tasks. But what about managing of all those translation files in these different serverless functions and also in the different clients?
There's no central location anymore - it's all distributed.
<br />
We need a solution for that! We need a [Translation Management System](../i18n-l10n-t9n-tms/).

A Translation Management System ([TMS](../tms/)) is a software platform that enables businesses to manage their translation workflow. It provides a central repository for storing translations and enables collaboration between translators. When integrated with i18next, TMS such as [locize](/) can streamline the localization process in a serverless architecture. Here are some of the benefits of using a TMS integrated with i18next in a serverless architecture:

### Automatic updates of translations
When using a TMS, translations can be automatically updated whenever a new language is added or an existing translation is changed. This eliminates the need to manually update the translations in the codebase, which can be a time-consuming task.

### Improved scalability
A TMS can handle translation requests from multiple applications and languages, making it easy to scale the localization process. By integrating a TMS with i18next, businesses can easily manage translations for multiple applications without worrying about the scalability of the translation process.

### Reduced costs
By using a TMS, businesses can reduce the cost of managing translations. A TMS provides a central repository for storing translations, eliminating the need to manage translations in multiple codebases. This reduces the time and effort required to manage translations, resulting in lower costs.

### Improved security
A TMS provides a secure environment for storing translations, making it easy to manage translations without worrying about security concerns. By using a TMS integrated with i18next, businesses can ensure that their translations are stored securely and are only accessible by authorized personnel.


## Implementing Possible Approaches for TMS with i18next

### Client side

For the client side it's that we can go full steam ahead. We can live download the translations on demand directly from the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network). This way we can change translations or add new languages directly in locize without having to modify or redeploy the client app.

In addition, we can unleash a lot of extra features to speed up the localization process. For example:
- We can use the [saveMissing](../i18next-migrate/#save-missing) feature to add new keys and automatically translate them with machine translation.
- We can [find and filter](https://docs.locize.com/guides-tips-and-tricks/unused-translations) in locize which keys are used or not used anymore, thanks to the [last-used](https://github.com/locize/locize-lastused) plugin.
- We can find and edit translations directly in the [In-Context editor](https://docs.locize.com/more/incontext-editor).

Have a look at [this tutorial](../react-i18next/) or [this video](https://youtu.be/jeRxew3OV64) to just see just a few of these cool things.

{% youtube jeRxew3OV64 %}


### Server(less) side

For the serverless side we could trigger a new serverless deployment every time a new [translation version](https://docs.locize.com/more/versioning) is published. Using [webhook events](https://docs.locize.com/integration/webhook#versionpublished) or triggering a Github Action via [GitHub Repository Dispatch Event](https://docs.locize.com/integration/github-repository-dispatch-event).

Or download the latest translations each time a serverless function is built and deployed using the [locize-cli](https://github.com/locize/locize-cli#download-current-published-files) or with the [Github Action](https://github.com/marketplace/actions/locize-download).

```sh
# i.e. for our email example, that we implemented
locize download --project-id=3183fd58-99d0-4d4b-896d-5768ca438c24 --ver=latest --namespace=news-mailer --clean=true --path=./locales
```


## Conclusion

In summary, i18next and a translation management system like locize are powerful tools for managing translations in a serverless architecture. By integrating i18next with a TMS, businesses can streamline the localization process and reduce the cost of managing translations. The integration also provides improved scalability and security. Enterprises and developers can easily implement a TMS integrated with i18next in their serverless architecture by following the steps outlined above.


- *If you're already using i18next and want to unleash its full potential, have a look at [this](../i18next-migrate/).*
- *If you're new to i18next, have a look at [this guide](../react-i18next/) and check out the free [crash course](https://youtu.be/SA_9i4TtxLQ).*
- *If you want to see a nice overview of the different i18n formats, have a look at [this](../i18n-formats-javascript/).*
- *If you like to see how locize looks like, check out [this video](https://youtu.be/TFV_vhJs5DY) and try the [free trial](https://www.locize.app/register).*

{% youtube TFV_vhJs5DY %}

<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What is i18next?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "i18next is an internationalization-framework written in and for JavaScript. But it's much more than that. i18next goes beyond just providing the standard i18n features such as (plurals, context, interpolation, format). It provides you with a complete solution to localize your product from web to mobile and desktop."
      }
    }, {
      "@type": "Question",
      "name": "What is serverless architecture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Serverless architecture is a cloud computing model where the cloud provider manages the infrastructure and automatically allocates resources as needed. Developers can focus on writing code and building applications without worrying about infrastructure management, scalability, and availability. It's a pay-per-use model, where businesses only pay for the actual usage of the application."
      }
    }, {
      "@type": "Question",
      "name": "What are the challenges of building multilingual serverless applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One of the biggest challenges of building multilingual serverless applications is managing translations. Applications that are built for a global audience require content to be translated into multiple languages. Manually managing translations can be a daunting task, as it involves managing multiple translation files, keeping track of translations, and ensuring consistency across languages. Additionally, deploying multiple versions of the application for each language can be a logistical nightmare, especially if you have to manage multiple tiny parts like AWS Lambda functions."
      }
    }, {
      "@type": "Question",
      "name": "What are the Translation Management Systems (TMS) in Serverless Architecture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Translation Management System (TMS) is a software platform that enables businesses to manage their translation workflow. It provides a central repository for storing translations and enables collaboration among translators. When integrated with i18next, TMS like locize can streamline the localization process in a serverless architecture. Some of the benefits of using a TMS integrated with i18next in serverless architecture include automatic updates of translations, centralized translation management, and easier collaboration among translators."
      }
    }, {
      "@type": "Question",
      "name": "How can businesses ensure that their serverless applications are multilingual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Businesses can ensure that their serverless applications are multilingual by using i18next and TMS in serverless architecture. i18next is an internationalization framework that allows developers to manage translations in web applications. TMS provides a central repository for storing translations and enables collaboration among translators. By integrating i18next and TMS, businesses can streamline the localization process in a serverless architecture, automate the updates of translations, and ensure consistency across languages."
      }
    }]
  }
</script>
