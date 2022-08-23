title: how we eat our own dogfood
date: 2016-06-11
tags:
  - locize
  - locizify
categories:
  - Post
thumbnail: eat-our-own-dogfood/result.png
redirect_from:
- /2016-06-11-eat-our-own-dogfood
---

After relaunching our website with new templates for our documentation, post pages and adding a new landing page, we decided to have at least the landing page translated.

As we use [hexo](https://hexo.io/) to generate our static content it was just a natural fit to use our [locizify script](http://locize.com/integration.html) so we don't have to instrument the page ourself.

As we might add other areas later we decided to have a fixed namespace (filename) for the landing page. We used the advanced option to init locizify like described [here](https://github.com/locize/locizify#via-init-function).

We ended with following snipplet:

```js
<script src="https://unpkg.com/locizify@^2.0.0"></script>
<script>
  locizify.init({
    namespace: 'landingpage',
    saveMissing: true,
    fallbackLng: 'en',
    backend: {
      projectId: '3d0aa5aa-4660-4154-b6d9-907dbef10bb2',
      apiKey: '******** private ********',
      referenceLng: 'en',
      version: 'production'
    },

    // ignore some dynamic widgets
    ignoreIds: ['nudgespotInappContainer', 'nudgespotInappMessagesContainer', 'nudgespotInappConversationsContainer', '__bs_notify__'],
    ignoreClasses: ['nudgespot-clean']
  });
</script>
```

After reloading the page we had the source content in english inside our project. We translated that to german and italian in no time using our editor.

![](translate.png "translate to german")

As the latest version gets auto published reloading the page with the additional querystring parameter `?lng=de` (or switching browser language) was enough to test the translation.

Next we created a production version (going to project settings -> versions) so we can change or prepare new content during development without messing with the currently released page version.


![](version.png "translate to german")

After that we wanted to avoid the flickering on initial load where the page first gets displayed in the source language until locizify loaded and initial translated the page.

To optimize this we just needed to add `display: none` to body [(more info)](https://github.com/locize/locizify#avoid-flickering-on-initial-load):

```html
<body style="display: none">
```

Finally we needed a solution to let the user change the language on our page. We started with a simple list of links:

```html
<ul>
  <a href="/?lng=en">english</a>
  <a href="/?lng=de">deutsch</a>
  <a href="/?lng=it">italiano</a>
</ul>
```

But decided a select element would fit more to our current layout. We needed to add binding to i18next [changeLanguage event](http://i18next.com/docs/api/#on-language-changed) to select current language and handle the select `onChange` event.

Further we use `locizify.getLanguages` to get current available languages in our project, so we don't have to touch the code when we add new languages:

**the select element:**

```html
<select id="languageSelect" onChange="handleSelectChange()" translated>
</select>
```

**the script:**

```js
// the select element
var ele = document.getElementById('languageSelect');
var availableLngs = [];

// create select options based on project languages
locizify.getLanguages(function(err, lngs) {
  availableLngs = Object.keys(lngs || {});
  availableLngs.forEach(function(l) {
    var lng = lngs[l];

    // return if not at least 90% is translated
    if (lng.translated.production < 0.9) return;

    // append ele
    var optEle = document.createElement("OPTION");
    optEle.setAttribute('value', l);
    optEle.innerHTML = lng.nativeName;
    ele.appendChild(optEle);
  });

  updateSelect();
});

// selects the value based on i18next lngs
function updateSelect() {
  var selected;
  locizify.i18next.languages.forEach(function(l) {
    if (!selected && availableLngs.indexOf(l) > -1) selected = l;
  });

  ele.value = selected || 'en';
}

// reload page on selection
function handleSelectChange() {
  var value = ele.options[ele.selectedIndex].value;
  window.location = updateQueryStringParameter(window.location.href, 'lng', value);
}

// bind i18next change language event
locizify.i18next.on('languageChanged', function(lng) {
  updateSelect();
});

// just a helper to update uri with new params
function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}
```

That's all. Our project was translated in no time including a custom language selector:

![](result.png "translated to german")

We are very pleased with the outcome of eating our own dogfood. Next step will be to order professional translations for the languages we can't translate ourself...
