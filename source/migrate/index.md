---
title: migrate
date: 2016-04-29 21:32:17
layout: documentation
showTitle: false
---

## Migration from i18next

Migrating an existing backend from i18next is just changing a few lines of code.

<p class="headline">Browser</p>

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

<p class="headline">node.js</p>

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

<div class="center">
<p class="callout">Have questions? <strong><a href="mailto:support@locize.com">Contact us!</a></strong></p>
</div>
