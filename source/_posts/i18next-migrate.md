---
title: Fastest way to unleash the full power of i18next (in 3 steps)
description: Learn the fastest way to unleash the full power of i18next with locize and get the most out of your internationalization efforts.

date: 2023-02-14
tags:
  - i18next
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
thumbnail: i18next-migrate/title.jpg

label: i18next-migrate
lang: en
---

![](title.jpg)

Internationalization ([i18n](../what-is-i18n/)) and localization ([l10n](../localization/)) are crucial for businesses that want to expand globally and reach a wider audience. To do this, you need a robust solution that can handle different languages and cultural nuances, and this is where [i18next](https://www.i18next.com) and [locize](/) come in. These two elements have been designed to help you get the most out of your i18n efforts, and when used together, they are a powerhouse combination that can help you achieve your goals faster and more efficiently.
<br />
In this article, we'll explore the fastest way to unleash the full power of i18next in 3 steps.

## Precondition
We assume you know i18next and already use it. If you don't know i18next, we suggest you read [this](../react-i18next/).
<br />
In this article, we also assume you're loading your translation resources via [i18next-http-backend](https://github.com/i18next/i18next-http-backend) plugin, but that's not really mandatory.


## Step 1 - Create a locize project
Sign up and create a new locize project for free, like described [here](https://docs.locize.com/integration/getting-started#step-1-signup-and-create-a-project).

![](add_project.jpg)

Define your source language and if needed change the [i18n format](https://docs.locize.com/integration/supported-i18n-formats).

Then, add all your target languages, as described [here](https://docs.locize.com/integration/getting-started/add-content#add-languages)

![](add_lng.jpg)


## Step 2 - Migrate your translations

Execute the [locize cli](https://github.com/locize/locize-cli) [migrate](https://github.com/locize/locize-cli#migration-of-existing-i18next-files) command.

Copy-Paste the project-id and the api-key from your locize project settings page, and use it as arguments for your command. Also, make sure to pass the path of your current translation files.

`npx locize migrate --project-id d950a914-a349-4b04-94ac-000fdf28beed --api-key 4cde8595-062b-44a7-b645-6a3fe739e792 --path public/locales`

![](cli.jpg)


## Step 3 - i18next-locize-backend

Install the [i18next-locize-backend](https://github.com/locize/i18next-locize-backend) plugin and replace your current backend plugin.

Copy the project-id and pass it via i18next backend options.

![](backend.jpg)


## Done!

Yes, the important part is already done.
<br />
Now the translations are directly coming from locize. This means you can also delete your old locales directory.

If you change a translation text in locize, you can see the updated texts in your UI.

This is already awesome, but we can do more.



## Extra Step 4 - InContext editor

By installing the [locize](https://github.com/locize/locize) module and passing it to i18next, we can work directly within the [InContext view](https://docs.locize.com/different-views/incontext) of locize.

![](incontext.jpg)


## Extra Step 5 - Save missing keys <a name="save-missing"></a>

Enabling the saveMissing option of i18next and passing the api-key via backend options, will automatically add newly defined keys to locize.
<br />
Additionally, if you enable the [automatic machine translation](https://docs.locize.com/whats-inside/auto-machine-translation) option in locize, the passed default value of your new keys is automatically translated into your target languages.

![](save_missing.jpg)


That's just a first sneak peek on how you can power up i18next.
<br />
locize offers a lot more.

[Try it for free](https://www.locize.app/register) and [send us](mailto:support@locize.com) your feedback.

{% youtube jeRxew3OV64 %}


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
      "name": "What is locize?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "locize is a powerful l10n solution that works in conjunction with i18next to help businesses achieve their goals faster and more efficiently."
      }
    }, {
      "@type": "Question",
      "name": "How do I use i18next and locize together?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To use i18next and locize together, you can follow the three steps outlined in the article: create a locize project, migrate your translations, and replace your current backend plugin with the i18next-locize-backend plugin."
      }
    }, {
      "@type": "Question",
      "name": "What is the InContext editor in locize?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The InContext editor in locize is a feature that allows you to work directly within the locize platform to edit your translations. By installing the locize module, you can use the InContext view to make changes to your translations directly from within your UI."
      }
    }, {
      "@type": "Question",
      "name": "How do I add new keys to locize automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can add new keys to locize automatically by enabling the saveMissing option of i18next and passing the api-key via the backend options. Additionally, if you enable the automatic machine translation option in locize, the default values of your new keys will be automatically translated into your target languages."
      }
    }]
  }
</script>
