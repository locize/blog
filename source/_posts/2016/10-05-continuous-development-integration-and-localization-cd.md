title: Continuous Development, Integration and Localization => Continuous Deployment
date: 2016-10-05
tags:
  - locize
  - localization
  - internationalization
  - continuous development
  - continuous integration
  - continuous localization
  - continuous delivery
  - continuous translation
  - i18next
  - polyglot
  - formatjs
categories:
  - Post
thumbnail: /2016-10-05-continuous-development-integration-and-localization-cd/hands_world.jpg
---


<div class="img-100">
![](hands_world.jpg "localization")
</div>

### Past times

In the past most organizations that have to write some software; planned, developed and released their product in one-year or even multiple-year cycles. =>Typical waterfall process.
Every time the developer team had finished implementing the features, the product manager could start to organize and initiate the translation process.
So the only thing the developers has to guarantee, was to be able to export and import text resources.
That way the texts could be translated all together, by sending them to different agencies or regional market organizations, etc…
When translations were done (after days, weeks or even months), they’d be sent back to the product manager who forwarded them to the developers.
They then had taken the translations, imported and merged them into the product, and (re-)released.


### Status Quo

Most of today’s organizations are trying to switch the development process to a more agile approach.
By implementing more SaaS (Software as a Service) products today’s organizations start to introduce CI/CD pipelines (Continuous Integration / Continuous Deployment).
Developers focuses on instrumenting the code with the help of some i18n libraries like:

[![http://i18next.com/](i18next.png)](http://i18next.com/)

[![http://formatjs.io/](formatjs.png)](http://formatjs.io/)

[http://airbnb.io/polyglot.js/](http://airbnb.io/polyglot.js/)

and extract texts into resource files so someone can translate them later.
Normally during a development iteration or sprint there is no time to translate the resources, and not just because most people has this sort of attitude:

> << We are not interested in the translation process itself. >>

That’s why some organizations opt to add an extra step to the process after which no text resource may be added, edited, or deleted.
This **“freeze”** period gives technical writers and translators the necessary time to work on. The more text needs to be handled the longer is this period.
This process slows down the release of the software in all languages quite a bit and will result in not really doing a continuous deployment.


### True Continuous Deployment with Continuous Localization

Because software development never stops when the first version of a product is released (bug fixes, minor updates and at some point major new versions and releases) — continuously.
Your localization and translation process should follow the same pattern as your software development.
You should be able to deploy your translation files separated from your software so you can update and manage them independently. And if you do so, you have to make sure you can have more then one version of your translations; at least one for the current released version and one for the current development branch.
That way your technical writers and translators can take care of the translations from the first day and keep up with changes with ease.
By doing this it is even possible to change or add translations without shipping a new release of your software!

> Cool, but isn’t this a little over the top… an extra tooling and deployment — doesn’t all this just add more complexity and effort?

#### You don’t have to build this yourself!!! — There is:

[![](/images/locize_color.svg)](http://www.locize.com/)

[locize](http://www.locize.com) is a new online service that pushes you to the level of Continuous Localization.
The translations are managed in your [locize](http://www.locize.com) project and published from there to the [locize](http://www.locize.com) CDN to be consumed from your application.
The technical writer team can take care of the translations from the first day and keep up with changes with ease.
The processes are separated. Translations can be updated without the need to release an update of your app.
Further you keep full overview about what is translated and what not — even more if you order translations from the integrated translation providers you also keep track of your open orders.
And even if you decide to export and import translations from your project, you never loose control, as the tooling helps you when merging by showing you all the changes that are made with a nice diff.
[locize](http://www.locize.com) helps you to handle the localization process in your projects...
<div class="contact" style="margin-top: 0px;">
<hr />
<p class="callout extra-margin">...you really should give it a try: <strong><a href="https://www.locize.io/register">Register!</a></strong></p>
</div>
