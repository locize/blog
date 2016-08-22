title: Using with polyglot
hideTitle: true
noDate: true
docs: true
---

<h4 class="headline">Using locize with polyglot</h4>

You can use locize in combination with [polyglot](http://airbnb.io/polyglot.js/). Polyglot is a internationalization framework provided by airbnb. Runs on the browser and node.js.

To integrate locize into your polyglot you will need to load the translations from our CDN via [our API](/api.html) and needs a little more coding as using the locizify or i18next scripts.

*Eg. Browser using the window.fetch:*

```js
window.fetch('https://api.locize.io/[YOUR_PROJECT_ID]/latest/[LNG]/[NAMESPACE]', {
  mode: 'cors'
}).then(response => response.json())
  .then(translations => {
    const polyglot = new Polyglot({ phrases: translations, locale: '[LNG]' });
    console.log(polyglot.t('some key'));
  })
  .catch(e => console.warn(e));
```

(You can find your projectId and API Key in your projects settings under the API Tab.)

*Eg. NodeJS using the request module:*

```js
var request = require('request');
var polyglot = require('node-polyglot');

request('https://api.locize.io/[YOUR_PROJECT_ID]/latest/[LNG]/[NAMESPACE]', function(err, res, translations) {
  var polyglot = new Polyglot({ phrases: translations, locale: '[LNG]' });
  console.log(polyglot.t('some key'));
});
}
```

For more details you might read our post ["the freedom of choice"](/2016-08-18-the-freedom-of-choice/).

<div class="contact">
<hr />
<p class="callout extra-margin">Have questions? <strong><a href="mailto:support@locize.com">Contact us!</a></strong></p>
</div>
