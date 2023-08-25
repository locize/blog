---
title: "TypeScript-App aufwerten: Beherrschen von i18next für typsichere Übersetzungen"
description: Entdecken Sie in diesem Handbuch, wie Sie das volle Potenzial von i18next in Ihren TypeScript-Anwendungen ausschöpfen können, indem Sie typsichere Übersetzungen beherrschen, eine genaue Lokalisierung sicherstellen und Laufzeitfehler eliminieren. ✅

date: 2023-06-22
tags:
  - i18next
  - react
  - react-i18next
  - typescript
  - types
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
thumbnail: i18next-typescript/title.jpg

label: i18next-typescript
lang: de
hidden: true
---

![TypeScript-Lokalisierung leicht gemacht mit dieser Schritt-für-Schritt-Anleitung mit i18next ✅](../i18next-typescript/title.jpg "Beispiel für TypeScript-Lokalisierung")

Mit der zunehmenden Vernetzung unserer Welt gewinnt die Entwicklung von Webanwendungen für ein [globales Publikum](../grow-online-business/) unter Entwicklern an Bedeutung. Wenn Sie TypeScript-Entwickler sind, kennen Sie wahrscheinlich die Vorteile der statischen Typisierung und die Sicherheit, die sie für Ihre Codebasis bietet. Wenn es um Internationalisierung ([i18n](../was-ist-i18n/)) und Lokalisierung ([l10n](../what-is-software-localization/)) geht, wird die Aufrechterhaltung desselben Niveaus an Typsicherheit entscheidend. Genau hier kommt [i18next](https://www.i18next.com), ein einflussreiches i18n-Framework, ins Spiel.

In der Vergangenheit stellte i18next bereits TypeScript-Definitionen für seine API zur Verfügung, so dass Entwickler von der Typüberprüfung profitieren konnten, während sie die Bibliothek nutzten. Eine wesentliche Einschränkung blieb jedoch bestehen, nämlich das Fehlen von Typsicherheit für Übersetzungsschlüssel. Wenn eine Übersetzungsressource fehlte oder ihren Namen änderte, konnte der TypeScript-Compiler dies nicht erkennen, was zu möglichen Fehlern während der Laufzeit führte.

![](../i18next-typescript/ts_api.jpg)

Mit der Einführung der neuen Iterationen von i18next wurde diese Einschränkung jedoch überwunden *(vor allem dank [Pedro Durek](https://github.com/pedrodurek))*. Jetzt rühmen sich die i18n-Schlüssel mit vollständiger Typsicherheit. Wenn ein Entwickler einen nicht vorhandenen oder geänderten i18n-Schlüssel verwendet, gibt der TypeScript-Compiler sofort eine Fehlermeldung aus und macht Sie auf das Problem aufmerksam, bevor es zu Laufzeitkomplikationen kommt. Darüber hinaus gibt es auch eine verbesserte Intellisense-Erfahrung.

In diesem Leitfaden werden wir uns mit der Kunst befassen, die neueste Version von i18next zu nutzen, um Übersetzungen zu erzielen, die unempfindlich gegen typbezogene Fehler in Ihren TypeScript-Anwendungen sind. Wir werden alles von den Grundlagen der i18next-Einrichtung bis hin zu fortgeschrittenen Techniken behandeln. Dabei profitieren Sie von dem zusätzlichen Sicherheitsnetz der Typüberprüfung für Ihre Übersetzungsschlüssel.

Am Ende dieses Leitfadens werden Sie wissen, wie Sie die typsicheren Übersetzungen von i18next in Ihren TypeScript-Projekten nutzen können. Sie werden in der Lage sein, sicherzustellen, dass Ihre Übersetzungen nicht nur präzise und anpassungsfähig sind, sondern dank der nahtlosen Integration von i18next und TypeScript auch konsequent fehlerfrei. Lassen Sie uns diese Reise gemeinsam antreten und Sie mit dem Wissen und den Werkzeugen ausstatten, die Sie benötigen, um lokalisierte Anwendungen zu erstellen, die mühelos auf unterschiedliche Sprachpräferenzen eingehen und gleichzeitig die Robustheit Ihrer Codebasis erhalten.


## In-Memory-Übersetzungen <a name="in-memory-translations"></a>

Für eine einfache i18next-Einrichtung haben Sie wahrscheinlich etwas wie dieses:

```ts
import i18next from 'i18next';
import enNs1 from './locales/en/ns1.json';
import enNs2 from './locales/en/ns2.json';
import deNs1 from './locales/de/ns1.json';
import deNs2 from './locales/de/ns2.json';

i18next.init({
  debug: true,
  fallbackLng: 'en',
  defaultNS: 'ns1',
  resources: {
    en: {
      ns1: enNs1,
      ns2: enNs2,
    },
    de: {
      ns1: deNs1,
      ns2: deNs2,
    },
  },
});
```

Sie importieren die Übersetzungsressourcen und fügen sie über die Funktion i18next [init](https://www.i18next.com/overview/api#init) hinzu.

Um die Übersetzung typsicher zu machen, erstellen wir eine Datei `i18next.d.ts`, vorzugsweise in einem Ordner `@types`, und importieren die Übersetzungsressourcen unserer Referenzsprache:

```ts
import enNs1 from '../locales/en/ns1.json';
import enNs2 from '../locales/en/ns2.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: {
      ns1: typeof enNs1;
      ns2: typeof enNs2;
    };
  }
}
```

![](../i18next-typescript/inmemory_ts_1.jpg)

<p>
  Das ist schon toll! Aber: <a target="_blank" rel="noopener" href="https://youtu.be/m-lSlJc_5NE">We Can Do Better</a>! 😜
  <a target="_blank" rel="noopener" href="https://youtu.be/m-lSlJc_5NE">
    <img class="ignore-gallery-item" src="../i18next-typescript/do_better.gif" loading="lazy" width="480" height="176" style="float: right; margin: 0 0 0 15px;">
  </a>
</p>

<br style="clear: both;" />

Mit Hilfe von [i18next-resources-for-ts](https://github.com/i18next/i18next-resources-for-ts) können wir eine einzelne Ressourcendatei erzeugen, die wir verwenden können.

Installieren Sie also `i18next-resources-for-ts` und fuehren Sie den Befehl `toc` aus, z.B. etwas wie: `i18next-resources-for-ts toc -i ./locales/de -o ./@types/resources.ts`

Wir können also die Datei `i18next.d.ts` wie folgt ändern:

```ts
import resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: typeof resources;
  }
}
```

🧑‍💻 Ein vollständiges Codebeispiel finden Sie [hier](https://github.com/locize/i18next-typescript-examples/tree/main/1).

### Pluralformen <a name="plurals"></a>

übrigens: auch Pluralschlüssel funktionieren:

![](../i18next-typescript/plurals_ts.jpg)

### Fallback-Namensraum <a name="fallbackns"></a>

Und auch die Handhabung von Fallback-Namensräumen funktioniert:

```ts
// @types/i18next.d.ts
import resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    fallbackNS: 'fallback';
    resources: typeof resources;
  }
}
```

```js
// works because of fallbackNS
i18next.t('fallbackKey')
```

### Interpolation <a name="interpolation"></a>

Leider funktioniert die automatische Interpolationsinferenz nicht, wenn die Übersetzungen in JSON-Dateien platziert werden, sondern nur in TS-Dateien mit dem Schlüsselwort `as const` oder einer Schnittstelle in einer `d.ts`-Datei, solange [dieses TypeScript-Problem](https://github.com/microsoft/TypeScript/issues/32063) nicht gelöst wird.

![](../i18next-typescript/interpolation_ts_nok.jpg)

### Schnittstelle <a name="in-memory-translations-interface"></a>

Um dieses Problem zu lösen, verwenden wir den Befehl `interface`, also etwas wie: `i18next-resources-for-ts interface -i ./locales/en -o ./@types/resources.d.ts`

Auf diese Weise können wir die Datei `i18next.d.ts` wie folgt ändern:

```ts
import Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: Resources;
  }
}
```

Jetzt funktioniert die Interpolationsableitung und schlägt fehl, wenn der übergebene Variablenname nicht übereinstimmt:

![](../i18next-typescript/interpolation_ts_ok.jpg)

🧑‍💻 Ein vollständiges Codebeispiel finden Sie [hier](https://github.com/locize/i18next-typescript-examples/tree/main/2).


## React.js <a name="react"></a>

Ein React.js-basiertes i18next-Setup mit In-Memory-Übersetzungsressourcen könnte auch [sehr ähnlich](https://github.com/locize/i18next-typescript-examples/tree/main/3) zum obigen Beispiel aussehen. Legen wir also die Messlatte ein wenig höher und sehen uns an, wie ein Setup mit Lazy-Loading-Übersetzungen wie mit [i18next-http-backend](https://github.com/i18next/i18next-http-backend) aussieht:

```ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    debug: true,
    fallbackLng: 'en',
    defaultNS: 'ns1',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18next;
```

Um die Übersetzung typsicher zu machen, erstellen wir wieder eine `i18next.d.ts` Datei, vorzugsweise in einem `@types` Ordner wie diesem:

```ts
import Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: Resources;
  }
}
```

Und wieder verwenden wir den Befehl `interface`, z.B. etwas wie: `i18next-resources-for-ts interface -i ./public/locales/en -o ./src/@types/resources.d.ts`

Auf diese Weise werden die Übersetzungen zur Laufzeit geladen, aber die Übersetzungen werden während der Entwicklung typgeprüft.

Mit der neuen [react-i18next](https://react.i18next.com) Version, wenn mehrere Namespaces geladen werden, wird die `t` Funktion die Schlüssel für den ersten Namespace ableiten und akzeptieren. Daher wird dieses Muster nun akzeptiert:

```ts
import { useTranslation } from 'react-i18next';

function Comp2() {
  const {t} = useTranslation(['ns1', 'ns2']);

  return (
    <div className="App">
      <p>{t('description.part1')}</p>
      <p>{t('description.part1', { ns: 'ns1' })}</p>
      <p>{t('description.part2', { ns: 'ns2' })}</p>
    </div>
  );
}

export default Comp2;
```

### Trans-Komponente <a name="trans"></a>

Und auch die [`Trans`-Komponente](https://react.i18next.com/latest/trans-component) ist typsicher:

```ts
import { useTranslation, Trans } from 'react-i18next';

function Comp1() {
  const {t} = useTranslation();

  return (
    <div className="App">
      <p>
        <Trans i18nKey="title">
          Welcome to react using <code>react-i18next</code> fully type-safe
        </Trans>
      </p>
      <p>{t('description.part1')}</p>
      <p>{t('description.part2')}</p>
    </div>
  );
}

export default Comp1;
```

![](../i18next-typescript/react_trans_ts.jpg)

🧑‍💻 Ein vollständiges Codebeispiel finden Sie [hier](https://github.com/locize/i18next-typescript-examples/tree/main/4).


## Keine App-gebundenen/bereitgestellten Übersetzungen <a name="locize"></a>

Es gibt auch eine Möglichkeit, die Übersetzungen vollständig von Ihrem Code-Repository zu trennen und dabei die Typsicherheit zu erhalten.

Nehmen wir das React.js-Projekt, das in [dieser grossartigen Anleitung](../react-i18next-de/) verwendet wird...

Das endgültige i18next-Setup in diesem Beispiel sieht wie folgt aus:

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';
import LastUsed from 'locize-lastused';
import { locizePlugin } from 'locize';
import { DateTime } from 'luxon';

const isProduction = process.env.NODE_ENV === 'production';

const locizeOptions = {
  projectId: process.env.REACT_APP_LOCIZE_PROJECTID as string,
  apiKey: process.env.REACT_APP_LOCIZE_APIKEY as string,
  referenceLng: process.env.REACT_APP_LOCIZE_REFLNG as string,
  version: process.env.REACT_APP_LOCIZE_VERSION as string
};

if (!isProduction) {
  i18n.use(LastUsed);
}

i18n
  .use(locizePlugin)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    backend: locizeOptions,
    locizeLastUsed: locizeOptions,
    saveMissing: !isProduction
  });

i18n.services.formatter?.add('DATE_HUGE', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng as string).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
```

Zur Laufzeit laden wir also die Übersetzung direkt aus dem [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network).

>Wie bekommen wir also typsichere Übersetzungen während der Entwicklung?

Wir erstellen einige npm-Skripte, um uns zu helfen:

1. Laden Sie die veröffentlichten Übersetzungen (in der Referenzsprache) in ein temporäres Verzeichnis herunter, z.B.:

  `downloadEn`: `locize download --project-id=0bbc223a-9aba-4a90-ab93-ab9d7bf7f780 --language=en --ver=latest --clean=true --path=./src/@types/locales`

2. Erstellen Sie die entsprechende Schnittstellendefinitionsdatei, z.B.: `interface`:

  `i18next-resources-for-ts interface -i ./src/@types/locales -o ./src/@types/resources.d.ts`

3. Abschliessendes Skript: Herunterladen, Erstellen der Schnittstelle und Löschen der temporären Dateien, z.B.:

  `update-interface`: `npm run downloadEn && npm run interface && rm -rf ./src/@types/locales`


Wie im vorigen Beispiel können wir diese Schnittstelle nun einfach in unsere Datei `i18next.d.ts` importieren:

```ts
import Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
```

Das war's schon!

![](../i18next-typescript/not_existing_key.jpg)

Die Übersetzungen sind von unserem Code-Repository getrennt und gleichzeitig erhalten wir die Typsicherheit mit Hilfe einer Schnittstelle.

🧑‍💻 Ein vollständiges Codebeispiel finden Sie [hier](https://github.com/locize/i18next-typescript-examples/tree/main/5).

Es gibt auch ein [Video](https://youtu.be/GLIas4DH3Ww) zu diesem Thema.
{% youtube GLIas4DH3Ww %}


## 🎉🥳 Herzlichen Glückwunsch 🎊🎁 <a name="congratulations"></a>

Zusammenfassend lässt sich sagen, dass die Beherrschung von i18next für typsichere Übersetzungen TypeScript-Entwickler in die Lage versetzt, das volle Potenzial ihrer Anwendungen zu erschliessen. Durch die Sicherstellung einer präzisen Lokalisierung, die Beseitigung von Laufzeitfehlern und die Nutzung der nahtlosen Integration zwischen i18next und TypeScript können Entwickler robuste, lokalisierte Anwendungen erstellen, die den verschiedenen Sprachpräferenzen gerecht werden. Mit dem Wissen und den Tools in diesem Handbuch sind Sie bestens gerüstet, um Ihre TypeScript-Applikation zu optimieren und aussergewöhnliche Benutzererlebnisse auf globaler Ebene zu liefern.
<br />
**Viel Spass beim Programmieren!**

Wenn Sie also Ihr i18n-Thema auf die nächste Stufe heben wollen, lohnt es sich, die [localization management platform - locize](https://locize.com) auszuprobieren.

Die Gründer von [locize](https://locize.com) sind auch die Schöpfer von [i18next](https://www.i18next.com). Durch die Nutzung von [locize](https://locize.com) unterstützen Sie also direkt die Zukunft von [i18next](https://www.i18next.com).

## 👍

<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Kann ich i18next für typsichere Übersetzungen in JavaScript-Projekten verwenden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Während i18next selbst in erster Linie für JavaScript-Projekte konzipiert ist, ist das Konzept der typsicheren Übersetzungen bei der Verwendung von TypeScript am vorteilhaftesten. TypeScript bietet eine statische Typprüfung, die bei der Fehlersuche hilft und die Erfahrung der Entwickler bei der Arbeit mit i18next verbessert."
      }
    },{
      "@type": "Question",
      "name": "Wie verbessert die Typensicherheit den Lokalisierungsprozess?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Typsicherheit stellt sicher, dass Übersetzungsschlüssel während der Entwicklung validiert werden, um potenzielle Laufzeitfehler zu vermeiden. Sie ermöglicht es Entwicklern, fehlende oder geänderte Übersetzungsschlüssel frühzeitig zu erkennen und so die Gesamtqualität und Zuverlässigkeit lokalisierter Anwendungen zu verbessern."
      }
    },{
      "@type": "Question",
      "name": "Kann ich i18next mit Typsicherheit auch dann verwenden, wenn mein Projekt dynamische Übersetzungen enthält?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Sie können auch mit dynamischen Übersetzungen Typsicherheit erreichen. Wenn Sie Techniken wie die Generierung von Ressourcendateien oder die Definition von Schnittstellen für Ihre Übersetzungen verwenden, können Sie die Typsicherheit auch bei dynamisch geladenen Übersetzungsinhalten aufrechterhalten."
      }
    },{
      "@type": "Question",
      "name": "Gibt es irgendwelche Leistungseinbussen bei der Verwendung von typsicheren Übersetzungen mit i18next?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typsichere Übersetzungen selbst haben keine signifikanten Auswirkungen auf die Laufzeitleistung. Das Hauptaugenmerk liegt auf der Steigerung der Entwicklerproduktivität, der Reduzierung von Fehlern und der Verbesserung der Codequalität. Die Leistung der Anwendung hängt weitgehend davon ab, wie i18next implementiert wird und wie gross die Übersetzungsressourcen sind."
      }
    },{
      "@type": "Question",
      "name": "Gibt es irgendwelche Einschränkungen oder Kompromisse bei der Verwendung von typsicheren Übersetzungen mit i18next?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Obwohl typsichere Übersetzungen zahlreiche Vorteile bieten, gibt es einige Einschränkungen zu beachten. Beispielsweise funktioniert die automatische Interpolationsinferenz möglicherweise nicht mit Übersetzungen, die in JSON-Dateien abgelegt sind. Wenn Ihre Übersetzungen von Ihrem Code-Repository getrennt sind, müssen Sie ausserdem die Synchronisierung zwischen Übersetzungsaktualisierungen und Ihrer Codebasis sicherstellen."
      }
    }]
  }
</script>
