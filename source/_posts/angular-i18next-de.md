---
title: Angular Lokalisierung - Entfesseln Sie die volle Leistung von i18next
description: Eine Schritt-für-Schritt-Anleitung zur Implementierung von angular-i18next in Ihre Anwendung.

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
thumbnail: angular-i18next/title.jpg

label: angular-i18next
lang: de
hidden: true
---

![angular Lokalisierung](../angular-i18next/title.jpg "locize © inweso GmbH")

Reden wir über die Internationalisierung (i18n) für Angular (nicht AngularJS, nicht Angular 2, nur Angular 😉).

Wenn es um die JavaScript-Lokalisierung geht, ist eines der beliebtesten Frameworks [i18next](https://www.i18next.com). Eine der bekanntesten Angular-Erweiterungen für i18next ist [angular-i18next](https://github.com/Romanchuk/angular-i18next/).
Es wurde bereits im April 2017 von [Sergey Romanchuk](https://github.com/Romanchuk) erstellt.


## Inhaltsverzeichnis
  * [Also erstmal: "Warum i18next?"](#why-i18next)
  * [Fangen wir an...](#start)
    - [Voraussetzungen](#prerequisites)
    - [Einstieg](#getting-started)
    - [Sprachumschalter](#language-switcher)
    - [Übersetzungen vom Code trennen](#separate)
      - [Wie sieht das aus?](#how-look)
      - [fehlende Übersetzungen speichern](#save-missing)
      - [👀 aber es gibt noch mehr...](#more)
  * [🎉🥳 Herzliche Glückwünsche 🎊🎁](#congratulations)

# Also erstmal: "Warum i18next?" <a name="why-i18next"></a>

*i18next wurde Ende 2011 erstellt. Es ist älter als die meisten Bibliotheken, die Sie heutzutage verwenden, einschliesslich Ihrer wichtigsten Frontend-Technologie ([React](../react-i18next-de/), Angular, [Vue](../i18next-vue-de/), ...).*
<br />
**➡️ nachhaltig**


*Basierend darauf, wie lange i18next bereits Open Source verfügbar ist, gibt es keinen echten i18n-Fall, der nicht mit i18next gelöst werden könnte.*
<br />
**➡️ reif**


*i18next kann in jeder Umgebung mit Javascript (und einigen Nicht-Javascript - .net, elm, iOS, Android, Ruby, ...) verwendet werden, mit jedem UI-Framework, mit jedem i18n-Format, ... [die Möglichkeiten sind endlos](https://www.i18next.com/overview/supported-frameworks).*
<br />
**➡️ erweiterbar**


*Es gibt viele Funktionen und Möglichkeiten, die Sie mit i18next im Vergleich zu anderen regulären 18n-Frameworks erhalten.*
<br />
**➡️ reich**


[Hier](https://www.i18next.com/overview/comparison-to-others) finden Sie weitere Informationen darüber, warum i18next so besonders ist und [wie es funktioniert](https://locize.com/i18next.html#how-does-i18next-work).


# Fangen wir an... <a name="start"></a>

## Voraussetzungen <a name="prerequisites"></a>

Stellen Sie sicher, dass Sie Node.js und npm installiert haben. Wenn Sie etwas Erfahrung mit einfachem HTML, JavaScript und grundlegendem Angular haben, ist es am besten, bevor Sie zu [angular-i18next](https://github.com/Romanchuk/angular-i18next/) springen.


## Einstieg <a name="getting-started"></a>

Nehmen Sie Ihr eigenes Angular-Projekt oder erstellen Sie ein neues, z. B. mit [der Angular-Cli](https://angular.io/guide/setup-local#install-the-angular-cli).

`npx @angular/cli new my-app`

*Entfernen wir der Einfachheit halber den "generierten" Inhalt der Angular-Cli:*
![angular cli](../angular-i18next/app_0.jpg "locize © inweso GmbH")

Wir werden die App anpassen, um die Sprache gemäss den Vorlieben des Benutzers zu erkennen.
Und wir werden einen Sprachumschalter erstellen, um den Inhalt zwischen verschiedenen Sprachen zu ändern.

Lassen Sie uns einige i18next-Abhängigkeiten installieren:

- [i18next](https://www.i18next.com)
- [angular-i18next](https://github.com/Romanchuk/angular-i18next/)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

`npm install i18next angular-i18next i18next-browser-languagedetector`


Lassen Sie uns unsere `app.module.ts` ändern, um die i18next-Konfiguration zu integrieren und zu initialisieren:
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

Ok, jetzt aktualisieren wir die `app.component.html`:
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

Sie sollten jetzt so etwas sehen:
![app 1](../angular-i18next/app_1.jpg "locize © inweso GmbH")


Nett! Fügen wir also einen zusätzlichen Text mit einem [interpolierten unescapten](https://www.i18next.com/translation-function/interpolation#unescape)-Wert hinzu:
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

Vergessen Sie nicht, den neuen Schlüssel auch zu den Ressourcen hinzuzufügen:
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

Funktioniert es? - Na sicher!
![app 2](../angular-i18next/app_2.jpg "locize © inweso GmbH")


Und dank des Sprach-Detektors können Sie auch versuchen, die Sprache mit dem Abfrageparameter `?lng=de` umzuschalten:
![Sprach-Detektor](../angular-i18next/app_3.jpg "locize © inweso GmbH")


## Sprachumschalter <a name="language-switcher"></a>

Wir wollen gerne die Möglichkeit anbieten, die Sprache über eine Art Sprachumschalter zu ändern.

Fügen wir also einen Fusszeilenabschnitt in unserer Datei `app.component.html` hinzu:
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

Und wir müssen auch die Datei `app.components.ts` aktualisieren:
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

![app 4](../angular-i18next/app_4.jpg "locize © inweso GmbH")

**🥳 Grossartig, Sie haben gerade Ihren ersten Sprachumschalter erstellt!**

Dank [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector) versucht es jetzt, die Browsersprache zu erkennen und diese Sprache automatisch zu verwenden, wenn Sie die Übersetzungen dafür bereitgestellt haben. Die manuell ausgewählte Sprache im Sprachumschalter wird im localStorage beibehalten, beim nächsten Besuch der Seite wird diese Sprache als bevorzugte Sprache verwendet.


## Übersetzungen vom Code trennen <a name="separate"></a>

Die Übersetzungen in unserer Datei `i18n.js` zu haben, funktioniert, ist aber für Übersetzer nicht so geeignet, damit zu arbeiten.
Lassen Sie uns die Übersetzungen vom Code trennen und sie in dedizierte JSON-Dateien einfügen.

[i18next-locize-backend](https://github.com/locize/i18next-locize-backend) wird uns dabei helfen.

> [Was ist locize?](../react-i18next/#for-sure)

### Wie sieht das aus? <a name="how-look"></a>

Zuerst müssen Sie sich bei locize [registrieren](https://locize.app/register) und [anmelden](https://docs.locize.com/integration/getting-started/create-a-user-account).
Dann [erstellen Sie ein neues Projekt](https://docs.locize.com/integration/getting-started/add-a-new-project) in locize und fügen Ihre Übersetzungen hinzu. Sie können Ihre Übersetzungen entweder über die [CLI](https://github.com/locize/react-tutorial#use-the-locize-cli) oder durch [Importieren der einzelnen json-Dateien](https://docs.locize.com/more/general-questions/how-to-import-translations-from-a-file) oder über die [API](https://docs.locize.com/integration/api#update-remove-translations) bewerkstelligen.

`npm install i18next-locize-backend`

Passen Sie die Datei `app.modules.ts` an, um das i18next-locize-backend zu verwenden, und stellen Sie sicher, dass Sie die Projekt-ID aus Ihrem Locize-Projekt kopieren:

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

Die App sieht immer noch gleich aus, aber die Übersetzungen sind jetzt komplett von der App getrennt und können separat verwaltet und freigegeben werden.
![](../angular-i18next/app_4.jpg "locize © inweso GmbH")


### save missing translations <a name="save-missing"></a>

### fehlende Übersetzungen speichern <a name="save-missing"></a>

Dank der Verwendung der [saveMissing-Funktion](https://www.i18next.com/overview/configuration-options#missing-keys) werden während der Entwicklung der App neue Schlüssel automatisch zu locize hinzugefügt.

Übergeben Sie einfach `saveMissing: true` in den i18next-Optionen und stellen Sie sicher, dass Sie den API-Schlüssel aus Ihrem Locize-Projekt kopieren:

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

Jedes Mal, wenn Sie einen neuen Schlüssel verwenden, wird dieser zu locize gesendet, d. h.:

```javascript
<p>{{ 'cool' | i18next: { defaultValue: 'This is very cool!' } }}</p>
```

resultiert in locize wie folgt:

![missing key](../angular-i18next/missing_key.jpg "locize © inweso GmbH")


### 👀 aber es gibt noch mehr... <a name="more"></a>

Dank des Plugins [locize-lastused](https://github.com/locize/locize-lastused) können Sie [in locize, Schlüssel welche verwendet oder nicht mehr verwendet werden, finden und filtern](https://docs.locize.com/guides-tips-and-tricks/unused-translations).

Mit Hilfe des Plugins [locize](https://github.com/locize/locize) können Sie Ihre App im locize [InContext Editor](https://docs.locize.com/more/incontext-editor) verwenden.

Schliesslch werden mit Hilfe des [Arbeitsablaufs für automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation) nicht nur neue Schlüssel in locize hinzugefügt, während die App entwickelt wird, sondern werden auch automatisch per maschineller Übersetzung in die Zielsprachen übersetzt:
![locize autotranslate](../angular-i18next/locize_autotranslate.jpg "locize © inweso GmbH")

`npm install locize-lastused locize`

verwenden Sie sie in `app.modules.ts`:

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

[Automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation):

![locize autotranslate](../angular-i18next/locize_autotranslate.jpg "locize © inweso GmbH")

[Filter für zuletzt verwendete Übersetzungen]((https://docs.locize.com/guides-tips-and-tricks/unused-translations)):

![react localization](../react-i18next/last_used.jpg "locize © inweso GmbH")

[InContext-Editor](https://docs.locize.com/more/incontext-editor):

![i18next inkontext](../angular-i18next/in_context.jpg "locize © inweso GmbH")

[Caching](https://docs.locize.com/more/caching):

![caching](../react-i18next/caching.jpg "locize © inweso GmbH")

[Versionen zusammenführen](https://docs.locize.com/more/versioning#merging-versions):

![Version überschreiben](../react-i18next/overwrite_version.jpg "locize © inweso GmbH")

*🧑‍💻 Den vollständigen Code finden Sie [hier](https://github.com/locize/locize-angular-example).*

*Sehen Sie sich auch den [Teil zur Code-Integration](https://www.youtube.com/watch?v=ds-yEEYP1Ks&t=423s) in diesem [YouTube-Video](https://www.youtube.com/watch?v=ds-yEEYP1Ks).*

Es gibt auch ein [i18next-Crashkurs-Video](https://youtu.be/SA_9i4TtxLQ).
{% youtube SA_9i4TtxLQ %}


# 🎉🥳 Herzlichen Glückwunsch 🎊🎁 <a name="congratulations"></a>

Ich hoffe, Sie haben ein paar neue Dinge über [i18next](https://www.i18next.com), [angular-i18next](https://github.com/Romanchuk/angular-i18next/) und [moderne Lokalisierungs-Workflows](https://locize.com) gelernt.

Wenn Sie also Ihr i18n-Thema auf die nächste Ebene bringen möchten, lohnt es sich, die [Übersetzungs-Management Platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Mit der Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

# 👍
