---
title: Der schnellste Weg, um die volle Leistung von i18next zu entfesseln (in 3 Schritten)
description: Erfahren Sie, wie Sie mit locize am schnellsten die volle Leistung von i18next entfesseln und das Beste aus Ihren Internationalisierungsbemühungen herausholen können.

date: 2023-02-14
tags:
  - i18next
  - locize
  - l10n
  - i18n
  - localization
  - internationalization
  - translation
thumbnail: i18next-migrate/title.jpg

label: i18next-migrate
lang: de
hidden: true
---

![](../i18next-migrate/title.jpg)

Internationalisierung ([i18n](../was-ist-i18n/)) und Lokalisierung ([l10n](../lokalisierung/)) sind für Unternehmen, die global expandieren und ein grösseres Publikum erreichen möchten, von entscheidender Bedeutung. Dazu benötigen Sie eine robuste Lösung, welche mit verschiedenen Sprachen und kulturellen Nuancen umgehen kann, und genau hier kommen [i18next](https://www.i18next.com) und [locize](/) ins Spiel. Diese beiden Elemente wurden entwickelt, um Ihnen zu helfen, das Beste aus Ihren i18n-Bemühungen herauszuholen, und wenn sie zusammen verwendet werden, sind sie eine leistungsstarke Kombination, die Ihnen helfen kann, Ihre Ziele schneller und effizienter zu erreichen.
<br />
In diesem Artikel zeigen wir Ihnen, wie Sie in 3 Schritten die volle Leistungsfähigkeit von i18next ausschöpfen können.

## Vorbedingung
Wir gehen davon aus, dass Sie i18next kennen und es bereits verwenden. Wenn Sie i18next nicht kennen, empfehlen wir Ihnen, [diesen Artikel](../react-i18next-de/) zu lesen.
<br />
In diesem Artikel gehen wir auch davon aus, dass Sie Ihre Übersetzungsressourcen über das [i18next-http-backend](https://github.com/i18next/i18next-http-backend) Plugin laden, aber das ist nicht unbedingt erforderlich.


## Schritt 1 - Erstellen Sie ein locize Projekt
Melden Sie sich an und erstellen Sie kostenlos ein neues locize Projekt, wie [hier](https://docs.locize.com/integration/getting-started#step-1-signup-and-create-a-project) beschrieben.

![](../i18next-migrate/add_project.jpg)

Definieren Sie Ihre Ausgangssprache und ändern Sie bei Bedarf das [i18n-Format](https://docs.locize.com/integration/supported-i18n-formats).

Fügen Sie dann alle Ihre Zielsprachen hinzu, wie [hier](https://docs.locize.com/integration/getting-started/add-content#add-languages) beschrieben.

![](../i18next-migrate/add_lng.jpg)


## Schritt 2 - Migrieren Sie Ihre Übersetzungen

Führen Sie den [migrate](https://github.com/locize/locize-cli#migration-of-existing-i18next-files) Befehl der [locize cli](https://github.com/locize/locize-cli) aus.

Kopieren Sie die Projekt-ID und den Api-Schlüssel von der Einstellungsseite Ihres locize Projekts und verwenden Sie sie als Argumente für den Befehl. Übergeben Sie auch den Pfad zu Ihren aktuellen Übersetzungsdateien.

`npx locize migrate --project-id d950a914-a349-4b04-94ac-000fdf28beed --api-key 4cde8595-062b-44a7-b645-6a3fe739e792 --path public/locales`

![](../i18next-migrate/cli.jpg)


## Schritt 3 - i18next-locize-backend

Installieren Sie das [i18next-locize-backend](https://github.com/locize/i18next-locize-backend) Plugin und ersetzen Sie Ihr aktuelles Backend-Plugin.

Kopieren Sie die Projekt-ID und übergeben Sie sie über die i18next-Backend-Optionen.

![](../i18next-migrate/backend.jpg)


## Erledigt!

Ja, der wichtigste Teil ist bereits erledigt.
<br />
Jetzt kommen die Übersetzungen direkt von locize. Das bedeutet, dass Sie auch das alte locales-Verzeichnis löschen können.

Wenn Sie einen Übersetzungstext in locize ändern, können Sie die aktualisierten Texte in der Benutzeroberfläche sehen.

Das ist bereits grossartig, aber wir können noch mehr tun.



## Extra-Schritt 4 - InContext-Editor

Durch Installation des Moduls [locize](https://github.com/locize/locize) und Übergabe an i18next können wir direkt in der [InContext-Ansicht](https://docs.locize.com/different-views/incontext) von locize arbeiten.

![](../i18next-migrate/incontext.jpg)


## Extra Schritt 5 - Fehlende Schlüssel speichern <a name="save-missing"></a>

Wenn Sie die saveMissing-Option von i18next aktivieren und den api-Schlüssel über die Backend-Optionen übergeben, werden automatisch neue definierte Schlüssel zu locize hinzugefügt.
<br />
Wenn Sie ausserdem die Option [automatische maschinelle Übersetzung](https://docs.locize.com/whats-inside/auto-machine-translation) in locize aktivieren, werden die übergebenen Standardwerte Ihrer neuen Schlüssel automatisch in die entsprechende Zielsprachen übersetzt.

![](../i18next-migrate/save_missing.jpg)


Das ist nur ein erster Vorgeschmack darauf, wie Sie i18next mit mehr Energie versorgen können.
<br />
locize bietet eine Menge mehr.

[Testen Sie es kostenlos](https://www.locize.app/register) und [senden Sie uns](mailto:support@locize.com) Ihr Feedback.

{% youtube jeRxew3OV64 %}


<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Was ist i18next?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "i18next ist ein in und für JavaScript geschriebenes Internationalisierungs-Framework. Aber es ist viel mehr als das. i18next bietet mehr als nur die Standard-i18n-Funktionen wie (Plural, Kontext, Interpolation, Format). Es bietet Ihnen eine Komplettlösung für die Lokalisierung Ihres Produkts vom Web über das Handy bis zum Desktop."
      }
    }, {
      "@type": "Question",
      "name": "Was ist locize?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "locize ist eine leistungsstarke l10n-Lösung, die in Verbindung mit i18next Unternehmen hilft, ihre Ziele schneller und effizienter zu erreichen."
      }
    }, {
      "@type": "Question",
      "name": "Wie kann ich i18next und locize zusammen verwenden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Um i18next und locize zusammen zu verwenden, können Sie die drei im Artikel beschriebenen Schritte befolgen: Erstellen Sie ein locize-Projekt, migrieren Sie Ihre Übersetzungen und ersetzen Sie Ihr aktuelles Backend-Plugin durch das i18next-locize-backend Plugin."
      }
    }, {
      "@type": "Question",
      "name": "Was ist der InContext-Editor in locize?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der InContext-Editor in locize ist eine Funktion, mit der Sie direkt in der locize-Plattform arbeiten können, um Ihre Übersetzungen zu bearbeiten. Wenn Sie das locize-Modul installieren, können Sie die InContext-Ansicht verwenden, um Änderungen an Ihren Übersetzungen direkt in Ihrer Benutzeroberfläche vorzunehmen."
      }
    }, {
      "@type": "Question",
      "name": "Wie füge ich neue Schlüssel automatischen zu locize hinzu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sie können neue Schlüssel automatisch zu locize hinzufügen, indem Sie die saveMissing-Option von i18next aktivieren und den api-key über die Backend-Optionen übergeben. Wenn Sie ausserdem die Option für die automatische maschinelle Übersetzung in locize aktivieren, werden die Standardwerte Ihrer neuen Schlüssel automatisch in Ihre Zielsprachen übersetzt."
      }
    }]
  }
</script>
