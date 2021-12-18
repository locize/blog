title: Unleash the hidden superpowers of react-intl
date: 2018-08-21
tags:
  - i18next
  - react
  - react-intl
  - formatjs
  - locize
  - localization
  - internationalization
  - translation
categories:
  - Post
thumbnail: unleash-the-hidden-superpowers-of-react-intl/title.png
---

![](title.png "locize © inweso GmbH")

Let images speak to see what you will get:

![](result.png "locize © inweso GmbH")

## We do not like this clutter:

```js
const name = 'John Doe';
<FormattedMessage
   id="welcome"
   defaultMessage={`Hello {name}!`}
   values={{ name: <b>{name}</b> }}
/>
```

While react-intl works awesome having those FormattedMessage everywhere does not really help keeping your code nice and readable. Wouldn’t it be nicer you just could write:

```js
<FormattedMessage id="welcome">Hello <b>{name}</b>!</FormattedMessage>
```

## babel macros to the rescue

You could easily write a babel plugin to transform the above simplified markup to the needed react-intl FormattedMessage. But there is a better way using 
Kent C. Dodds babel macros (https://github.com/kentcdodds/babel-plugin-macros). There comes a big advantage with using macros (beside they are super simple to create) you can use those with applications created with [create-react-app](https://github.com/facebook/create-react-app) without ejecting (on time of writing needs an alpha build v2.x.x).

A babel macro is basically just a function that gets a reference of the nodes using the macro:

```js
const { createMacro } = require('babel-plugin-macros')

module.exports = createMacro(myMacro)

function myMacro({references, state, babel}) {
  // the FormattedMessage imported in below code snippet
  const { FormattedMessage = [] } = references;
  // transform each occurance
  FormattedMessage.forEach(referencePath => { /* transform */ });
}
```

We won’t go through all the details of the macro used to transform the simpler markup — but you can checkout the code here:

>https://github.com/locize/locize-react-intl-example/blob/master/src/intl.macro.js

You can use the macro like:

```js
// import the macro component
import { FormattedMessage } from "./intl.macro";
// and use it
<FormattedMessage id="welcome">Hello <b>{name}</b>!</FormattedMessage>
```

The macro will transform it to the react-intl FormattedMessage:

```js
<FormattedMessage
   id="welcome"
   defaultMessage={`Hello {name}!`}
   values={{ name: <b>{name}</b> }}
/>
```

## Plurals and Select

We could add some more macro magic to also simpler plurals and selects:

```js
import { Select, Plural } from "./intl.macro";
// select
<FormattedMessage
  id="avoid_bugs"
  defaultMessage="{gender,select,he{He avoids bugs.}she{She avoids bugs.}other{They avoid bugs.}}"
  values={{ count: 10 }}
/>
// will become
<Select
  id="avoid_bugs"
  switch={gender}
  male="He avoids bugs."
  female="She avoids bugs."
  other="They avoid bugs."
/>
// plurals
<FormattedMessage
  id="items_count"
  defaultMessage="{count,plural,=0{There is no item.}one{There is # item.}other{There are # items.}}"
  values={{ count: 10 }}
/>
// will become:
<Plural
  id="items_count"
  count={itemsCount1}
  $0="There is no item."
  one="There is # item."
  other="There are # items."
/>
```

For more options (like nesting components) have a look at the sample usages:

>https://github.com/locize/locize-react-intl-example/blob/master/src/ComponentUsingMacro.js

---

![](locize_editor.png)

Now after adopting all the features of the [demo project](https://github.com/locize/locize-react-intl-example) you will be able to:

- split translations into multiple files
- using an in-context editor
- loading translations from CDN
- detecting the user language
- automatically add new missing strings to your translation project
- updating changed strings in reference language
- submitting the description to translation context
- setting last used information so you can safely remove keys not used any longer

## From internationalization to localization

While the first part focused on helping developers writing nicer jsx markup we now will focus on helping your translators by making their work easier. One of the most important things in our fast-paced times is implementing a fast feedback loop, which is also recommended by all the common “Agile” methodologies.

So let’s go a step further:

## From internationalization to continuous localization

We like to innovate the localization process by breaking the old slow loop of exporting extracted translations, passing them to translators and importing them back again. This old process does not fit into a modern development environment using continuous development and agile methods.

**What we want:** New content in your application should be immediately available in your translation management tool for your translators and newly finished translations should be passed down to the application without a developer needing to add a file to the repository or accepting a PR from the translation management.

## Connecting your application to your translation management

In this sample we will use https://locize.com as our translation management tool — as it exposes all the needed functionality to bring localization to the level of continuous localization.

There is the locizer script available to connect your application with the translation project: https://github.com/locize/locizer

With it you can load translation files, save or update translation segments.

### Step 1: We need a way to extend react-intl components during development

This should be rather easy:

```js
import { FormattedMessage as FM } from 'react-intl';
// find out if our react app runs in dev mode
const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
// export a extended replacer component while development and original while in production
export const FormattedMessage = IS_DEV ? supportLocize()(FM) : FM;
```

Now let’s learn what the supportLocize() is:

### Step 2: Let the component send new content to the translation service

In our code we have FormattedMessages like in regular react-intl projects but we consume our overridden component during development:

```js
// see ./locize/index.js in development mode the
// react-intl components are extended to provide
// features like save of new ids, ...
// in production you get the regular unextended
// react-intl components
import { FormattedMessage } from 'locize';
<FormattedMessage
  id="app.title"
  defaultMessage="Welcome to {what} combined with locize"
  description="Welcome header on app main page"
  values={{ what: 'react-intl' }}
/>
```

Our extended component will take those props and create new translation segments on locize using the *id* and *defaultMessage*

```js
// a hoc to extend components with locize features
function supportLocize() {
  return function Wrapper(WrappedComponent) {

    class LocizeExtension extends Component {
      constructor(props, context) {
        super(props, context);

        // get needed props
        const { id, defaultMessage, description, namespace } = props;

        // get current value in message catalog
        const currentValue = translations[currentLocale] && translations[currentLocale][namespace] && translations[currentLocale][namespace][id]

        // depeding on not yet exists or changed
        // save or update the value on locize
        if (SAVE_NEW_VALUES && !currentValue) {
          locizer.add(namespace, id, defaultMessage, description);
        } else if (UPDATE_VALUES && currentValue !== defaultMessage) {
          locizer.update(namespace, id, defaultMessage, description)
        }
      }

      // render the wrapped component (react-intl's FormattedMessage)
      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    return withContext()(LocizeExtension);
  }
}
```

Based on the defaultMessage already exists in the translations catalog or not, or the defaultMessage has changed we use the locizer functions to create or update the translation segment in the source language.

Awesome, now every time we add a new `FormattedMessage` or change a `defaultMessage` those values get added or changed in your translation project immediately.

### Step 3: Directly load translations

By overriding the `IntlProvider` we could use the [locizer](https://github.com/locize/locizer) script to directly load the translations that get published to the localization CDN provided by [locize](https://locize.com).

What the component basically does is taking a prop namespace to load the translation file and the needed intl locale-data:

```js
// load the given file form locize
// and detect language while doing so
locizer.load(namespace, (err, messages, locale) => {
  currentLocale = locale;
  translations[locale] = messages;
// load react intl locale data
  import('react-intl/locale-data/' + locale)
    .then(localeData => {
      addLocaleData(localeData);
// update state to render children
      this.setState({
        locale,
        messages
      });
    });
});
```

The full code is very simple you can find the demo repository here: https://github.com/locize/locize-react-intl-example/blob/master/src/locize/index.js#L32

So this not only enables us to load one translation catalog, but by using that IntlProvider we could load multiple files and making translation a lot easier by splitting them into multiple smaller files.

### Step 4: Enable translations inside the context of your application

![](locize_editor.png)

The integration of the locize editor is very simple:

```js
locizeEditor.init({
  lng: locale,
  defaultNS: DEFAULTNAMESPACE,
  referenceLng: REFERENCELANGUAGE,
  projectId: PROJECTID,
  private: PRIVATE
});
```

Now you can open your website appending the querystring param `?locize=true` and you will see the in-context editor.

## Summary

You see internationalization is done rather easily and localization hasn’t to be harder. With the right tools you can not only keep your development — translation cycle short but you can also improve the quality, save time and money.

You can find the full sample here: https://github.com/locize/locize-react-intl-example

Take the chance and try it yourself [locize.com](https://locize.com) comes with a 14 day free trial.
