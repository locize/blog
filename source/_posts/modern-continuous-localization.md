title: Continuous Localization vs. Continuous Localization 🤔
date: 2022-02-14
tags:
  - continuous localization
  - localization
  - l10n
  - continuous development
  - continuous integration
  - continuous delivery
  - continuous translation
thumbnail: modern-continuous-localization/title.jpg
redirect_from:
- /2022-02-14-modern-continuous-localization
---


![](title.jpg "continuous localization")

## Why Continuous Localization?

Because software development never stops when the first version of a product is released (bug fixes, minor updates and at some point major new versions and releases) — continuously. Your [localization](../localization/) and translation process should follow the same pattern as your software development.

>You're already using agile concepts in your software development, right?

Add some agility also in your localization process!
<br />
Translations should take place in parallel with agile sprints and in smaller batches. This means translating just a part of a software product and not the whole at once. Even better, translating continuously.

The benefit to developers is clear-cut: align localization efforts with the development cycle by automating and accelerating the steps involved. This way, they can seamlessly integrate their localization processes into their development cycle.
<br />
You localize, as a normal part of the development process cycle. No separate localization testing phase. Translation testing is part of normal software testing activity.
<br />
The translators can work on text that the developers have just added. There is no wait for a particular milestone.
<br />
Keeping translations in sync with development, reduces drastically the project complexity. A project management enjoys this, because it takes lots of tedious work from product managers that they would otherwise have to perform.

>**tldr; Shorter, faster development cycles, faster time-to-market.**


## How Continuous Localization Works

### The classical approach

The following team roles are at least included in a typical in-house localization team:

- Software engineer — Responsible for implementing the continuous localization workflow.
- Localization QA / translator — Responsible for the quality of the localized product.
- Product manager — Someone who oversees the whole process, working with engineers and translators, and is responsible for deadlines.

![](classic-continuous-localization.png "classic continuous localization")

After a successful implementation for the continuous localization workflow, the process will look more or less like this:

1. The developers create new strings in the reference language and commit dem in their code repository, like [GitHub](http://github.com), [GitLab](https://gitlab.com) or any other [Version Control System](https://en.wikipedia.org/wiki/Version_control).
2. The strings gets synchronized with the translation management system.
3. The translators work on new translations.
4. The translations are synchronized back to the code repository.
5. The CI/CD pipeline picks the current (or defined) state of the code repository, and builds, tests, etc...
6. The result is deployed.
7. The end user can enjoy the new features and new translations.

*While this approach can be implemented together with most translation management systems, there is also a more modern approach...*

### The modern approach

You should be able to deploy your translation files separated from your software so you can update and manage them independently. Something like a platform, that anyone can directly integrate with.

![](real-continuous-localization.png "real continuous localization")

The process could look like this:

1. The developers work as usual on their features and create strings on-the-fly. Those new keys get's automatically pushed as missing strings to the translation management system (TMS).
2. The translators work on new translations and can instantaneously validate the translations.
3. Since translations are "connected" directly to your software product, they can be released at any time. This way you can also fix translations of your previously released product, without having to redeploy it.

If you do so, you have to make sure you can have more than one version of your translations; at least one for the current released version and one for the current development branch. That way your technical writers and translators can take care of the translations from the first day and keep up with changes with ease. By doing this it is even possible to change or add translations without shipping a new release of your software!
You may also want to have some reviewing workflow, auditing, integrated ordering of external translations, etc...

>Cool, but isn’t this a little over the top… an extra tooling and deployment — doesn’t all this just add more complexity and effort?

#### You don’t have to build this yourself!!! — There is [locize](/)!

Watch the demo video to learn more:
{% youtube ds-yEEYP1Ks %}

[locize](/) removes the pain in the translation process. No more delays in shipping your software because of missing translations. Translators can keep up with changes from day one. The continuous localization process keeps up with your demanding business.

