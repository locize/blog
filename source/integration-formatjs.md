title: Using with formatJS
hideTitle: true
noDate: true
docs: true
---

<h4 class="headline">Using locize with formatJS / messageformat</h4>

You can use locize in combination with [formatJS](http://formatjs.io/). FormatJS is a internationalization framework provided by yahoo using the ICU messageformat.

To integrate locize into your messageformat codebase you will need to load the translations from our CDN via [our API](/api.html) and needs a little more coding as using the locizify or i18next scripts.

*Eg. Browser using the our API client locizer:*

The script enables easy translation loading and provides on top functions to detect users language and to load the available languages on your project.

```js
// <script src="https://unpkg.com/locizer/locizer.min.js"></script>
locizer
  .init({
    fallbackLng: 'en',
    referenceLng: 'en',
    projectId: '[your project id]'
  })
  .load('translation', function(err, translations, lng) {
    function t(key, opts) {
      opts = opts || {};
      var m = new IntlMessageFormat(tranlations[key], lng);
      return m.format(opts);
    }
    // translate
    console.log(t('some key'));
  });
```

[Complete locizer documentation](https://github.com/locize/locizer)


*Eg. Browser using the window.fetch:*

```js
window.fetch('https://api.locize.io/[YOUR_PROJECT_ID]/latest/[LNG]/[NAMESPACE]', {
  mode: 'cors'
}).then(response => response.json())
  .then(translations => {
    function t(key, opts) {
      opts = opts || {};
      var m = new IntlMessageFormat(tranlations[key], lng);
      return m.format(opts);
    }
    // translate
    console.log(t('some key'));
  })
  .catch(e => console.warn(e));
```

(You can find your projectId and API Key in your projects settings under the API Tab.)

For more details you might read our post ["the freedom of choice"](/2016-08-18-the-freedom-of-choice/).


<div class="contact">
<hr />
<p class="callout extra-margin">Have questions? <strong><a href="mailto:support@locize.com">Contact us!</a></strong></p>
</div>
