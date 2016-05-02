---
title: i18next
date: 2016-05-02 17:29:37
layout: documentation
showTitle: false
---

<p class="headline"><i class="material-icons" translated>translate</i> using with i18next</p>

You can use locize in combination with [i18next](http://i18next.com). I18next is a widely used internationalization framework and offers a wide range of framework integrations and plugins for almost every need.

Check out their [getting started guide](http://i18next.com/docs/). For using locize you just need to use the plugins we offer:

<p class="headline extra-margin"><i class="material-icons" translated>code</i> Browser</p>

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
