---
title: migrate
date: 2016-04-29 21:32:17
layout: documentation
showTitle: false
---

## Migrating an existing i18next project

Migrating an existing backend from i18next is just changing a few lines of code.

<p class="headline"><i class="material-icons" translated>code</i> Browser</p>

Just use the `i18next-locize-backend`

```html
import i18next from 'i18next';
import Backend from 'i18next-locize-backend';

i18next
  .use(Backend)
  .init({
    // ...other options

    backend: {
      projectId: '[PROJECT_ID]',
      apiKey: '[API_KEY]',
      referenceLng: '[LNG]'
    }
  });
```

Find more details and configuration options on the [github page](https://github.com/locize/i18next-locize-backend).

<p class="headline extra-margin"><i class="material-icons" translated>code</i> node.js</p>

Just use the `i18next-node-locize-backend`

```html
import i18next from 'i18next';
import Backend from 'i18next-node-locize-backend';

i18next
  .use(Backend)
  .init({
    // ...other options

    backend: {
      projectId: '[PROJECT_ID]',
      apiKey: '[API_KEY]',
      referenceLng: '[LNG]'
    }
  });
```

Find more details and configuration options on the [github page](https://github.com/locize/i18next-node-locize-backend).

<p class="headline extra-margin"><i class="material-icons" translated>content_copy</i> Migrating your data</p>

You can use our [commandline tool](https://github.com/locize/locizify-cli) to copy your existing translations over to your locize project.



<div class="center">
<p class="callout extra-margin">Have questions? <strong><a href="mailto:support@locize.com">Contact us!</a></strong></p>
</div>
