---
title: The key pieces to localize your software project

date: 2022-03-01
tags:
  - internationalization
  - i18n
  - i18next
  - localization
  - l10n
  - localistars
  - translation management
  - tms
  - locize

thumbnail: i18n-l10n-t9n-tms/puzzle.png
---

![](puzzle.png "The key pieces to localize your software project")

When it comes to software localization there are some important parts you have to address.

If the term localization (l10n) is new to you, then take a look at [this explanation](../localization/) or at [this blog post about software localization](../what-is-software-localization/).


# i18n - internationalization <a name="i18n"></a>

Where the software code is created, [i18n](../what-is-i18n/) is also to be found. Developers needs to instrumentalize the code to be able to be localized to various languages and regions.

There are [a lot of questions](../is-your-software-ready-for-localization/) that should be answered here.

<div style="border-left: 0.5px solid orange;padding: 0.5rem 2rem">
  <h3 style="color:orange; margin-bottom: 0px;">More information</h3>
  <p style="color:grey; margin-top: 5px;"><a href="../what-is-i18n/" title="What is i18n?">Here</a> you can read more about i18n and check if <a href="../is-your-software-ready-for-localization/" title="Is your software ready for localization?">your software is ready for localization</a>.</p>
</div>

To answer the questions about i18n, you will finally probably use a corresponding i18n framework that meets your needs.

<div style="border-left: 0.5px solid limegreen;padding: 0.5rem 2rem">
  <h3 style="color:limegreen; margin-bottom: 0px;">Advice</h3>
  <p style="color:grey; margin-top: 5px;">When it comes to web localization, one of the most popular i18n frameworks is <a href="https://www.i18next.com" title="i18next - The best i18n frameworks for JavaScript">i18next</a>.
  <br />
  <a href="https://www.i18next.com" title="i18next - The best i18n frameworks for JavaScript">
    <img src="i18next-logo.png" />
  </a>
  </p>
</div>


The biggest mistake one can do is looking on software localization as it’s only based on instrumenting your code and extract texts into resource files so you can translate them later.

The requirements are clear: enable the application to be translated later but without time to think more about it. It ends with reaching the release day with an application ready to be published in one language.


# t9n - translation <a name="t9n"></a>

When the code is ready to be localized, someone needs to translate the content.

You can have your translation done by freelancers, agencies or in-house employees. You can also start with some machine translation, but a translator should at least proofread the machine translated texts.

<div style="border-left: 0.5px solid limegreen;padding: 0.5rem 2rem">
  <h3 style="color:limegreen; margin-bottom: 0px;">Advice</h3>
  <p style="color:grey; margin-top: 5px;"><a href="https://www.localistars.com" title="localistars - The Translation Marketplace that connects clients with translators">localistars</a> is the go-to marketplace for clients and translators to get translation jobs done.
  As client you'll find translators and as translator you'll find translation jobs. Direct contact, no middleman – just localistars working together!
  <br />
  <a href="https://www.localistars.com" title="localistars - The Translation Marketplace that connects clients with translators">
    <img src="localistars-logo.svg" />
  </a>
  </p>
</div>

Text translations are just one element in the localization process. You may also think of images, documents that differs not only for different languages, but also for different countries or regions.


# TMS - Translation Management System <a name="tms"></a>

After having internationalized the code and knowing how the content is translated, how will these 2 parts interact with each other?

<div style="border-left: 0.5px solid orange;padding: 0.5rem 2rem">
  <h2 style="color:orange; margin-bottom: 0px;">What is Translation Management?</h2>
  <p style="color:grey; margin-top: 5px;">Translation management is the systematic process and automation that manages translations and other digital assets, eliminating repetitive and laborious manual tasks while enabling progress overview and control, increasing collaboration and delivering greater efficiency.</p>
</div>

## Manually merging translation files?

One day (before release) the responsible for localization will knock at the developer's door and asking for the resource files to be translated. The developer will hand them out and deep in their mind the developer knows there will be some changes in the last days before release and even more changes after release.

Some days/weeks later, the translated files will be ready and the developer will copy them to the repository but there are already a lot of changes. Some terms are not used anymore others are new and not yet translated.

Might be the time for some tooling to help you manage your translations.

Translation Management Systems are a great help. But still there is a gap between development and translation process. Files need to be exported / imported / merged and all while new content get added to be translated. The chaos is inevitable.

There are a lot of translation management systems, choose the one that fits your needs.

Modern translation management systems focuses on [continuous localization](../modern-continuous-localization/).

<div style="border-left: 0.5px solid orange;padding: 0.5rem 2rem">
  <h3 style="color:orange; margin-bottom: 0px;">More information</h3>
  <p style="color:grey; margin-top: 5px;">Not every continuous localization offered by the various translation management systems is the same. Check out the main differences <a href="../modern-continuous-localization/" title="Continuous Localization vs. Continuous Localization">here</a>.</p>
</div>

New content in your application should be immediately available in your translation management tool for your translators and newly finished translations should be passed down to the application without a developer needing to add a file to the repository or accepting a PR from the translation management.

Because software development never stops when the first version of a product is released (bug fixes, minor updates and at some point major new versions and releases) — continuously. Your localization and translation process should follow the same pattern as your software development. You should be able to deploy your translation files separated from your software so you can update and manage them independently. And if you do so, you have to make sure you can have more then one version of your translations; at least one for the current released version and one for the current development branch. That way your technical writers and translators can take care of the translations from the first day and keep up with changes with ease. By doing this it is even possible to change or add translations without shipping a new release of your software!

<div style="border-left: 0.5px solid limegreen;padding: 0.5rem 2rem">
  <h3 style="color:limegreen; margin-bottom: 0px;">Advice</h3>
  <p style="color:grey; margin-top: 5px;"><a href="https://www.locize.com" title="locize - Bridging the gap between translation and development">locize</a> removes the pain in the translation process. No more delays in shipping your software because of missing translations. Translators can keep up with changes from day one. The continuous localization process keeps up with your demanding business.
  <br />
  <a href="https://www.locize.com" title="locize - Bridging the gap between translation and development">
    <img src="locize-logo.png" />
  </a>
  </p>
</div>


# i18n, l10n, TMS - So which are the key pieces to localize your software project?

[![](puzzle_specific.png "The key pieces to localize your software project")](https://www.localistars.com/ecosystem/)

- [i18next](https://www.i18next.com)
- [locize](https://www.locize.com)
- [localistars](https://www.localistars.com)
