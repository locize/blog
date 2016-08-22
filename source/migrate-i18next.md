title: Migrating i18next project
docs: true
hideTitle: true
noDate: true
---

Migrating an existing backend from i18next is just changing a few lines of code.

<h4 class="headline"><i class="material-icons" translated>code</i> Browser</h4>

Just use the `i18next-locize-backend`

```js
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

(You can find your projectId and API Key in your projects settings under the API Tab.)

Find more details and configuration options on the [github page](https://github.com/locize/i18next-locize-backend).

<h4 class="headline extra-margin"><i class="material-icons" translated>code</i> node.js</h4>

Just use the `i18next-node-locize-backend`

```js
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

(You can find your projectId and API Key in your projects settings under the API Tab.)

Find more details and configuration options on the [github page](https://github.com/locize/i18next-node-locize-backend).

<h4 class="headline extra-margin"><i class="material-icons" translated>content_copy</i> Migrating your data</h4>

You can use our [commandline tool](https://github.com/locize/locizify-cli) to copy your existing translations over to your locize project.



<div class="contact">
<hr />
<p class="callout extra-margin">Have questions? <strong><a href="mailto:support@locize.com">Contact us!</a></strong></p>
</div>
