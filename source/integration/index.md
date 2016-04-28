---
title: integration
date: 2016-04-28 11:52:41
layout: documentation
showTitle: false
---

## Basic Integration

Using our **locizify script** is the most simplest way to get your website or webapplication translated.

Just drop the following script to your html document.

```html
<head>
  <script src="/locizify.js"></script>
  <script>
    locizify.init({
      saveMissing: true,
      fallbackLng: '[REFERENCE_LANGUAGE]',
      backend: {
        referenceLng: '[REFERENCE_LANGUAGE]',
        apiKey: '[API_KEY]',
        projectId: '[PROJECT_ID]'
      }
    });
  </script>

  // ...
</head>
```

Reload your page and see the phrases ready to translate in your locize project.
