---
title: locizify v2 - improvements
date: 2017-02-21
tags:
  - locizify
thumbnail: images/locize_color.svg
redirect_from:
- /2017-02-21-locizify-v2
---

## We use the unpkg CDN

In the past we deployed the locizify script to our own CDN space. While this was ok migrating over to [https://unpkg.com](https://unpkg.com) allows us to provide you an improved usage. In the past your code was bound to the latest deployed script on our CDN. As we strongly respect [semver](http://semver.org/) we just were able to update the script with non breaking updates.

Now as you could use the source from unpkg you're able to fix the version in your code like:

```
https://unpkg.com/locizify // latest
https://unpkg.com/locizify@2.0.1 // specific version
https://unpkg.com/locizify@^2.0.0 // latest non breaking version 2.x.x
```

full sample:

```html
<script id="locizify" projectid="[PROJECT_ID]"
    apikey="[API_KEY]" referencelng="[LNG]"
    fallbacklng="[LNG]" saveMissing="true"
    src="https://unpkg.com/locizify@^2.0.0" />
```

## New Features

### merging

Sometimes you want to keep innerHTML of an element together to make it easier to translate.

Before:

```html
<p>Might be easier to translate this <a href="#">the new way</a></p>
```

```js
// resulting keys
{
  "Might be easier to translate this ": "Might be easier to translate this ",
  "the new way": "the new way"
}
```

Using merge:

```html
<p merge>Might be easier to translate this <a href="#">the new way</a></p>
```

```js
// resulting keys
{
  "Might be easier to translate this <a href="#">the new way</a>": "Might be easier to translate this <a href="#">the new way</a>"
}
```

While you can set the `merge` attribute on every element you like to have this behaviour. You can also specify this globally on init:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/locizify@^2.0.0"></script>
    <script>
      locizify.init({
        // merging content (eg. a tags in p tags)
        mergeTags: [], // tags to merge innerHtml to one key
        inlineTags: [], // tags to inline (eg. a, span, abbr, ...)
        ignoreInlineOn: [], // tags to ignore inlining tags under inlineTags
      });
    </script>
  </head>
  ...
```

### cleanup for keys

With v2 we improved the key generation from content by removing unused whitespaces:

Before:

```html
<p>
  Having text
  over multiple lines
  <span> with space in front</span>
</p>
```

```js
// resulting keys
{
  "  Having text/n  over multiple lines": "  Having text/n  over multiple lines",
  " with space in front": " with space in front"
}
```

Using cleanup (default enabled in v2):

```html
<p>
  Having text
  over multiple lines
  <span> with space in front</span>
</p>
```

```js
// resulting keys
{
  "Having text over multiple lines": "Having text over multiple lines",
  "with space in front": "with space in front"
}
```

All the unnecessary whitespaces get removed making translation more easy. You can manually toggle this off or ignore it for certain tags:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/locizify@^2.0.0"></script>
    <script>
      locizify.init({
        // cleanup for keys
        cleanIndent: true, // removes indent, eg. if a p tag spans multiple lines
        ignoreCleanIndentFor: ['PRE', 'CODE'], // ignores cleaning up of indent for those tags needing that extra spaceing
        cleanWhitespace: true, // removes surrounding whitespace from key
      });
    </script>
  </head>
  ...
```

### Fragment replacement for links and images

```html
<img src="/images/{{a.png}}" alt="big A" />
<a href="/{{statistic}}">Open my statistics</a>
```

You will find `a.png` and `statistic` to be a key in your translations - it's value can be replaced to eg. a-de.png for german (all other languages will fallback to a.png)

### Translate other then default attributes on elements

eg: for validation error messages
```html
<input data-parsley-error-message="This field is required" />
```

Just add `data-parsley-error-message` to the `translateAttributes` Array on init:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/locizify@^2.0.0"></script>
    <script>
      locizify.init({
        translateAttributes: ['placeholder', 'title', 'alt', 'value#input.type=button', 'value#input.type=submit'],
      });
    </script>
  </head>
  ...
```

You can define rules like:

``[attributeToTranslate]#element.andOrAttributeWithValue`

```js
value#input // all values on input
value#type // all values on elements having an attribute type
value#input.type=button // all values on input element having an attribute type set to button
```

## Migration from v1

To make v2 having the same behaviour as v1 you could change the init options like:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/locizify@^2.0.0"></script>
    <script>
      locizify.init({
        // cleanup for keys
        cleanIndent: false,
        cleanWhitespace: false,

        ...
      });
    </script>
  </head>
  ...
```

This way you assert keys get not cleaned of whitespaces so they match the counterpart of v1.
