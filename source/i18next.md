---
title: Using with i18next
date: 2016-05-02 17:29:37
docs: true
hideTitle: true
noDate: true
---

<h4 class="headline"><i class="material-icons" translated>translate</i> using with i18next</h4>

You can use locize in combination with [i18next](http://i18next.com). I18next is a widely used internationalization framework and offers a wide range of framework integrations and plugins for almost every need.

<h4 class="headline extra-margin"><i class="material-icons" translated>code</i> use our custom bundle</h4>

Source can be loaded via [npm](https://www.npmjs.com/package/locize), bower or load it from our CDN [https://cdn.locize.io/locize.min.js](https://cdn.locize.io/locize.min.js).


```
import locize from 'locize';

locize.init({
  lng: 'en',
  fallbacklng: 'en',
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    },
    backend: {
      projectId: '[PROJECT_ID]',
      apiKey: '[API_KEY]',
      referenceLng: 'en'
    }
  }
}, (err, t) => {
  // initialized and ready to go!
  const hw = locize.t('key'); // hw = 'hello world'
});
```

For more information visit the i18next website:

- [Getting started](http://i18next.com/docs/)
- [Translation Functionality](http://i18next.com/translate/)
- [API](http://i18next.com/docs/api/)

Just replace i18next with locize on use.

<h4 class="headline extra-margin"><i class="material-icons" translated>code</i> use our plugin with i18next</h4>

Alternatively use the plugins we offer with i18next:

<h4 class="headline extra-margin"><i class="material-icons" translated>code</i> Browser</h4>

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

<h4 class="headline extra-margin"><i class="material-icons" translated>code</i> node.js</h4>

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

<div class="contact">
<hr />
<p class="callout extra-margin">Have questions? <strong><a href="mailto:support@locize.com">Contact us!</a></strong></p>
</div>
