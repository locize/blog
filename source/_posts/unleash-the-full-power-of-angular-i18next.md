---
title: Angular Localization - Unleash the full power of i18next
description: A step-by-step guide how to implement angular-i18next into your application.

date: 2021-06-14
tags:
  - i18next
  - locize
  - localization
  - l10n
  - internationalization
  - i18n
  - translation
  - angular
categories:
  - Post
thumbnail: unleash-the-full-power-of-angular-i18next/title.jpg
---

![angular localization](title.jpg "locize © inweso GmbH")

Let's talk about internationalization (i18n) for Angular (not AngularJS, not Angular 2, just Angular 😉).

When it comes to JavaScript localization. One of the most popular frameworks is [i18next](https://www.i18next.com). One of the most famous Angular extension for i18next is [angular-i18next](https://github.com/Romanchuk/angular-i18next/).
It was created back in April 2017 by [Sergey Romanchuk](https://github.com/Romanchuk).


## TOC
  * [So first of all: "Why i18next?"](#why-i18next)
  * [Let's get into it...](#start)
    - [Prerequisites](#prerequisites)
    - [Getting started](#getting-started)
    - [Language Switcher](#language-switcher)
    - [Separate translations from code](#separate)
      - [How does this look like?](#how-look)
      - [save missing translations](#save-missing)
      - [👀 but there's more...](#more)
      - [🎉🥳 Congratulations 🎊🎁](#congratulations)

# So first of all: "Why i18next?" <a name="why-i18next"></a>

*i18next was created in late 2011. It's older than most of the libraries you will use nowadays, including your main frontend technology (angular, react, vue, ...).*

**➡️ sustainable**


*Based on how long i18next already is available open source, there is no real i18n case that could not be solved with i18next.*

**➡️ mature**


*i18next can be used in any javascript (and a few non-javascript - .net, elm, iOS, android, ruby, ...) environment, with any UI framework, with any i18n format, ... [the possibilities are endless](https://www.i18next.com/overview/supported-frameworks).*

**➡️ extensible**


*There is a plenty of features and possibilities you'll get with i18next compared to other regular 18n frameworks.*

**➡️ rich**


[Here](https://www.i18next.com/overview/comparison-to-others) you can find more information about why i18next is special and [how it works](https://locize.com/i18next.html#how-does-i18next-work).


# Let's get into it... <a name="start"></a>

## Prerequisites <a name="prerequisites"></a>

Make sure you have Node.js and npm installed. It's best, if you have some experience with simple HTML, JavaScript and basic Angular, before jumping to [angular-i18next](https://github.com/Romanchuk/angular-i18next/).


## Getting started <a name="getting-started"></a>

Take your own Angular project or create a new one, i.e. with [the Angular cli](https://angular.io/guide/setup-local#install-the-angular-cli).

`npx @angular/cli new my-app`

*To simplify let's remove the "generated" content of the angular-cli:*
![angular cli](app_0.jpg "locize © inweso GmbH")

We are going to adapt the app to detect the language according to the user’s preference.
And we will create a language switcher to make the content change between different languages.

Let's install some i18next dependencies:

- [i18next](https://www.i18next.com)
- [angular-i18next](https://github.com/Romanchuk/angular-i18next/)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

`npm install i18next angular-i18next i18next-browser-languagedetector`


Let's modify our `app.module.ts` to integrate and initialize the i18next config:
```javascript
import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { I18NEXT_SERVICE, I18NextModule, I18NextLoadResult, ITranslationService, defaultInterpolationFormat  } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { AppComponent } from './app.component';

const i18nextOptions = {
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
        translation: {
            "welcome": "Welcome to Your Angular App"
        }
    },
    de: {
        translation: {
            "welcome": "Willkommen zu Deiner Vue.js App"
        }
    }
  },
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  }
};

export function appInit(i18next: ITranslationService) {
  return () => {
    let promise: Promise<I18NextLoadResult> = i18next
      .use(LocizeApi)
      .use<any>(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    I18NextModule.forRoot()
  ],
  providers: [
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Ok, now let's update the `app.component.html`:
```html
<!-- Toolbar -->
<div class="toolbar" role="banner">
  <span>{{ 'welcome' | i18next }}</span>
</div>

<div class="content" role="main">

  <!-- Highlight Card -->
  <div class="card highlight-card card-small">
    <span>{{ 'welcome' | i18next }}</span>
  </div>
</div>
```

You should now see something like this:
![app 1](app_1.jpg "locize © inweso GmbH")


Nice! So let's add an additional text, with an [interpolated unescaped](https://www.i18next.com/translation-function/interpolation#unescape) value:
```html
<!-- Toolbar -->
<div class="toolbar" role="banner">
  <span>{{ 'welcome' | i18next }}</span>
</div>

<div class="content" role="main">

  <!-- Highlight Card -->
  <div class="card highlight-card card-small">
    <span>{{ 'welcome' | i18next }}</span>
  </div>

  <br />
  <p>{{ 'descr' | i18next: { url: 'https://github.com/Romanchuk/angular-i18next' } }}</p>
</div>
```

Do not forget to add the new key also to the resources:
```javascript
const i18nextOptions = {
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
        translation: {
            "welcome": "Welcome to Your Angular App",
            "descr": "For a guide and recipes on how to configure / customize this project, check out {{-url}}."
        }
    },
    de: {
        translation: {
            "welcome": "Willkommen zu Deiner Vue.js App",
            "descr": "Eine Anleitung und Rezepte für das Konfigurieren / Anpassen dieses Projekts findest du in {{-url}}."
        }
    }
  },
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  }
};
```

Does it work? - Of course!
![app 2](app_2.jpg "locize © inweso GmbH")


And thanks to the language-detector, you can also try to switch the language with the query parameter `?lng=de`:
![language detector](app_3.jpg "locize © inweso GmbH")


## Language Switcher <a name="language-switcher"></a>

We like to offer the possibility to change the language via some sort of language switcher.

So let's add a footer section in our `app.component.html` file:
```html
<!-- Footer -->
<footer>
    <ng-template ngFor let-lang [ngForOf]="languages" let-i="index">
        <span *ngIf="i !== 0">&nbsp;|&nbsp;</span>
        <a *ngIf="language !== lang" href="javascript:void(0)" class="link lang-item {{lang}}" (click)="changeLanguage(lang)">{{ lang.toUpperCase() }}</a>
        <span *ngIf="language === lang" class="current lang-item {{lang}}">{{ lang.toUpperCase() }}</span>
    </ng-template>
</footer>
```

And we need also to update the `app.components.ts` file:
```javascript
import { Component, Inject } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  language: string = 'en';
  languages: string[] = ['en', 'de'];

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  )
  {}

  ngOnInit() {
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });
  }

  changeLanguage(lang: string){
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    this.language = lang;
  }
}
```

![app 4](app_4.jpg "locize © inweso GmbH")

**🥳 Awesome, you've just created your first language switcher!**

Thanks to [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) now it tries to detect the browser language and automatically use that language if you've provided the translations for it. The manually selected language in the language switcher is persisted in the localStorage, next time you visit the page, that language is used as preferred language.


## Separate translations from code <a name="separate"></a>

Having the translations in our code works, but is not that suitable to work with, for translators.
Let's separate the translations from the code and pleace them in dedicated json files.

[i18next-locize-backend](https://github.com/locize/i18next-locize-backend) will help us to do so.

> [What is locize?](../how-to-internationalize-react-i18next/#for-sure)

### How does this look like? <a name="how-look"></a>

First you need to signup at [locize](https://locize.app/register) and [login](https://docs.locize.com/integration/getting-started/create-a-user-account).
Then [create a new project](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize and add your translations. You can add your translations either by [importing the individual json files](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) or via [API](https://docs.locize.com/integration/api#update-remove-translations) or by using the [CLI](https://github.com/locize/locize-cli).

`npm install i18next-locize-backend`

Adapt the `app.modules.ts` file to use the i18next-locize-backend and make sure you copy the project-id from within your locize project:

```javascript
import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { I18NEXT_SERVICE, I18NextModule, I18NextLoadResult, ITranslationService, defaultInterpolationFormat  } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import LocizeApi from 'i18next-locize-backend';

import { AppComponent } from './app.component';

const i18nextOptions = {
  debug: true,
  fallbackLng: 'en',
  backend: {
    projectId: 'your-locize-project-id'
  },
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  }
};

export function appInit(i18next: ITranslationService) {
  return () => {
    let promise: Promise<I18NextLoadResult> = i18next
      .use(LocizeApi)
      .use<any>(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    I18NextModule.forRoot()
  ],
  providers: [
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

The app looks still the same, but the translations are now completely separated from the app and can be managed and released separately.
![](app_4.jpg "locize © inweso GmbH")


### save missing translations <a name="save-missing"></a>

Thanks to the use of the [saveMissing functionality](https://www.i18next.com/overview/configuration-options#missing-keys), new keys gets added to locize automatically, while developing the app.

Just pass `saveMissing: true` in the i18next options and make sure you copy the api-key from within your locize project:

```javascript
const i18nextOptions = {
  debug: true,
  saveMissing: true, // do not use the saveMissing functionality in production: https://docs.locize.com/guides-tips-and-tricks/going-production
  fallbackLng: 'en',
  backend: {
    projectId: 'my-locize-project-id',
    apiKey: 'my-api-key' // used for handleMissing functionality, do not add your api-key in a production build
  },
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  }
};
```

Each time you'll use a new key, it will be sent to locize, i.e.:

```javascript
<p>{{ 'cool' | i18next: { defaultValue: 'This is very cool!' } }}</p>
```

will result in locize like this:

![missing key](missing_key.jpg "locize © inweso GmbH")


### 👀 but there's more... <a name="more"></a>

Thanks to the [locize-lastused](https://github.com/locize/locize-lastused) plugin, you'll be able to [find and filter in locize which keys are used or not used anymore](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

With the help of the [locize](https://github.com/locize/locize) plugin, you'll be able to use your app within the locize [InContext Editor](https://docs.locize.com/more/incontext-editor).

Lastly, with the help of the [auto-machinetranslation workflow](https://docs.locize.com/whats-inside/auto-machine-translation), new keys not only gets added to locize automatically, while developing the app, but are also automatically translated into the target languages using machine translation:
![locize autotranslate](locize_autotranslate.jpg "locize © inweso GmbH")

`npm install locize-lastused locize`

use them in `app.modules.ts`:

```javascript
import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { I18NEXT_SERVICE, I18NextModule, I18NextLoadResult, ITranslationService, defaultInterpolationFormat  } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import LocizeApi from 'i18next-locize-backend';
import LastUsed from 'locize-lastused';
import { locizePlugin } from 'locize';

import { AppComponent } from './app.component';

const locizeOptions = {
  projectId: 'my-locize-project-id',
  apiKey: 'my-api-key' // used for handleMissing functionality, do not add your api-key in a production buildyour
};

const i18nextOptions = {
  debug: true,
  fallbackLng: 'en',
  saveMissing: true, // do not use the saveMissing functionality in production: https://docs.locize.com/guides-tips-and-tricks/going-production
  backend: locizeOptions,
  locizeLastUsed: locizeOptions,
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  }
};

export function appInit(i18next: ITranslationService) {
  return () => {
    let promise: Promise<I18NextLoadResult> = i18next
      // locize-lastused
      // sets a timestamp of last access on every translation segment on locize
      // -> safely remove the ones not being touched for weeks/months
      // https://github.com/locize/locize-lastused
      // do not use the lastused functionality in production: https://docs.locize.com/guides-tips-and-tricks/going-production
      .use(LastUsed)
      // locize-editor
      // InContext Editor of locize
      .use(locizePlugin)
      // i18next-locize-backend
      // loads translations from your project, saves new keys to it (saveMissing: true)
      // https://github.com/locize/i18next-locize-backend
      .use(LocizeApi)
      .use<any>(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    I18NextModule.forRoot()
  ],
  providers: [
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

[Automatic machine translation](https://docs.locize.com/whats-inside/auto-machine-translation):

![locize autotranslate](locize_autotranslate.jpg "locize © inweso GmbH")

[Last used translations filter]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![react localization](../how-to-internationalize-react-i18next/last_used.jpg "locize © inweso GmbH")

[InContext Editor](https://docs.locize.com/more/incontext-editor):

![in context](in_context.jpg "locize © inweso GmbH")

[Caching](https://docs.locize.com/more/caching):

![react localization caching](../how-to-internationalize-react-i18next/caching.jpg "locize © inweso GmbH")

[Merging versions](https://docs.locize.com/more/versioning#merging-versions):

![overwrite version](../how-to-internationalize-react-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 The complete code can be found [here](https://github.com/locize/locize-angular-example).*

There's also an [i18next crash course video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Congratulations 🎊🎁 <a name="congratulations"></a>

I hope you’ve learned a few new things about [i18next](https://www.i18next.com), [angular-i18next](https://github.com/Romanchuk/angular-i18next/) and [modern localization workflows](https://locize.com).

So if you want to take your i18n topic to the next level, it's worth to try [locize](https://locize.com).

The founders of [locize](https://locize.com) are also the creators of [i18next](https://www.i18next.com). So with using [locize](https://locize.com) you directly support the future of [i18next](https://www.i18next.com).

# 👍
