title: Using with xliff, gettext, ...
hideTitle: true
noDate: true
docs: true
---

<h4 class="headline">Using locize with xliff, gettext and other localization formats</h4>

While json is the defacto standard format used in the modern web there might be cases where you need to transform the translations downloaded from locize to another format.

There are multiple converters available:

- [xliff](https://github.com/locize/xliff)
- [gettext](https://github.com/i18next/i18next-gettext-converter)

Simplest is to use those in combination with our [cli](https://github.com/locize/locize-cli) to build an automated production pipeline powered by grunt, gulp, npm script, ...
