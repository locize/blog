title: The freedom of choice…i18next, polyglot or formatJS
date: 2016-08-18
tags:
  - locize
  - locizify
  - i18next
  - polyglot
  - formatjs
categories:
  - Post
thumbnail: the-freedom-of-choice/idea.jpg
redirect_from:
- /2016-08-18-the-freedom-of-choice
---


![](idea.jpg "locize flexibility")

When we started work on locize.com our localization as a service platform we basically had in mind to solve the translation process for developers using our i18n framework [i18next.com](http://i18next.com).

> Translation Management Systems are a great help. But still there is a gap between development and translation process. Files need to be exported / imported / merged and all while new content get added to be translated. The chaos is inevitable. locize.com comes to the rescue. It’s like a translation service on steroid directly connected to your i18next instrumented webproject. ([i18next](http://i18next.com/docs/process/))

A few weeks after the successful beta launch and adding a lot of third party services to order translations directly out of your locize project, we started wondering if we could also bring the awesomeness to other frontend internationalization frameworks like airbnb’s [polyglot](http://airbnb.io/polyglot.js/) or yahoo’s [formatJS](http://formatjs.io/)?

### polyglot + locize.com

Our first look at polyglot revealed that the implementation is rather similar to the i18next json format only the plurals are stored in a single key and separated by `||||`.

We decided to do a short spike using a node.js express server loading the resources from locize.com using its API and return a demo page using polyglot to translate it.

**Using request to load the translations:**

```js
function load(lng, callback) {
  var url = 'https://api.locize.app/[YOUR_PROJECT_ID]/latest/{{lng}}/translation'.replace('{{lng}}', lng);
  request(url, function(err, res, body) {
    callback(err, lng, body);
  });
}
```

**The JSON we load from the locize project looks like:**

[https://api.locize.app/897381a6-125c-40b8-9b28-2f80ae9a3612/latest/en/translation](https://api.locize.app/897381a6-125c-40b8-9b28-2f80ae9a3612/latest/en/translation)

```json
{
  "interpolate": "Hello, %{name}.",
  "intro": "The locize.com platform is fully compatible with airbnb’s polyglot i18n module.",
  "plural": "%{smart_count} car |||| %{smart_count} cars",
  "something": {
    "nested": "Nested value something.nested"
  },
  "title": "Using polyglot with locize.com"
}
```

**We return a html file injecting the loaded json when requesting the root:**

```js
app.get('/', function(req, res) {
  var lng = req.query.lng || 'en';

  fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) console.log(err);
    data = data.toString().replace('###locals###', JSON.stringify(locals[lng])).replace('###lng###', lng);

    res.set('content-type', 'text/html');
    res.send(data);
  });
});
```

**In the html we basically use polyglot as described on it’s website:**

```html
<script>
  // initialize polyglot by settings phrases on server
  var polyglot = new Polyglot({ phrases: JSON.parse('###locals###'), locale: '###lng###' });
  // translate
  document.getElementById('headline').innerHTML = polyglot.t('title');
  ...
</script>
```

You can checkout this example on github: [https://github.com/locize/locize-polyglot-example](https://github.com/locize/locize-polyglot-example).

While it is a very basic sample the main focus stays on proving just that you can profit from using locize.com using polyglot. Adapt the sample to your backend language or just use xhr directly to load the data inside your client. You directly benefit from the same benefits just i18next developers had until now using locize.com.

### formatJS + locize.com

formatJS is well known for using the intl API to parse dates and numbers plus uses the ICU message format for translations. The format is rather different from what was used in i18next, but still it’s just keybased json.

So we started from what we did with polyglot. For the backend there was no change needed, so just scroll up to the polyglot sample where we use request o load the translations.

**The JSON we load from the locize project looks like:**

[https://api.locize.app/9ac4fb1f-be22-4028-bcbc-0da13010b35e/latest/en/translation](https://api.locize.app/9ac4fb1f-be22-4028-bcbc-0da13010b35e/latest/en/translation)

```json
{
  "interpolate": "Hello, {name}.",
  "intro": "The locize.com platform is fully compatible with yahoo's format.js i18n module.",
  "plural": "You have {numPhotos, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}",
  "title": "Using format.js with locize.com"
}
```

**In the html we use the [IntlMessageFormat](https://github.com/yahoo/intl-messageformat) module and created a little helper function**

```html
<script>
  // initialize
  var resources = JSON.parse('###locals###');
  var lng = '###lng###';
  // translation helper
  function t(key, opts) {
    opts = opts || {};
    var m = new IntlMessageFormat(resources[key], lng);
    return m.format(opts);
  }
  // translate
  document.getElementById('headline').innerHTML = t('title');
  ...
</script>
```

You can see the full example on github: [https://github.com/locize/locize-formatjs-example](https://github.com/locize/locize-formatjs-example).

The sample can easily be adapted to react-intl, ember-intl, handlebars-intl, dust-intl or any other framework using icu messageformat like eg. [https://github.com/messageformat/messageformat.js](https://github.com/messageformat/messageformat.js).

### Conclusion

While initially focused on [i18next json format](http://i18next.com/docs/jsons/) when building locize.com we found out that you can profit from the locize.com service using [polyglot](http://airbnb.io/polyglot.js/) or any libary using messageformat ([formatJS](http://formatjs.io/) and others) too.

We love flexibility so we’re looking forward to our first customer creating a project using airbnb’s or yahoo’s i18n framework.
