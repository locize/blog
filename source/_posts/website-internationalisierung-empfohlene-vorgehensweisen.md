---
title: Dies sind die Best Practices für die Internationalisierung von Webseiten
description: Was sind die empfohlenen Vorgehensweisen für die Internationalisierung von Webseiten?

date: 2021-08-16
tags:
  - website internationalization
  - best practices
  - web app translation
categories:
  - Post
thumbnail: website-internationalization-best-practices/website-internationalization-best-practices.webp

label: website-internationalization-best-practices
lang: de
hidden: true
---

![Best Practices für die Internationalisierung von Websites](../website-internationalization-best-practices/website-internationalization-best-practices.webp "Best Practices für die Internationalisierung von Websites")


Wenn es um die Internationalisierung Ihrer Website geht, soll Ihnen dieser Artikel dabei helfen, Ihre Best Practices zu ermitteln.

Dies kann das Ergebnis eines strategischen Wechsels sein oder wenn Sie ein internationales Unternehmen oder Projekt gründen möchten, ist dies das Richtige für Sie. Der Prozess, wenn Ihre Web-App international wird, sollte keine schwierige Aufgabe sein.

Ein weiterer Artikel über <a href="/blog/website-localization/" title="website localization">Website-Lokalisierung</a> zeigt Ihnen den Prozess der Planung, und wenn Sie in diesem Artikel weiterlesen, versuchen wir, Ihnen dabei zu helfen Fehler zu vermeiden. Wenn Sie sich nicht sicher sind, was Internationalisierung ist, sehen Sie sich unseren Leitfaden <a href="/blog/what-is-i18n/" title="what is i18n">Was ist i18n</a> an. Vereinfachen Sie die **Internationalisierung von Websites** mit diesen paar **Best Practices**:

## Best-Practice-Zusammenfassung
  1. [Verwenden Sie so wenig Text wie möglich in den Bildern](#little-text)
  2. [Code von der Übersetzung trennen](#separate)
  3. [Betrachten Sie verschiedene Arten der Pluralisierung von Wörtern](#plural)
  4. [Überprüfen Sie, ob das Layout längeren oder kürzeren Text unterstützt](#layout)
  5. [Machen Sie es einfach, Zeichenketten zu finden](#find)
  6. [Zeichencodierung auf UTF-8 setzen](#encoding)
  7. [Beachten Sie auch die Farben](#colors)
  8. [Wählen Sie den richtigen Lokalisierungsübersetzungsdienst](#service)


## Best Practices im Detail

### 1. Verwenden Sie so wenig Text wie möglich in den Bildern <a name="little-text"></a>
Weil Sie am Ende mehrere Bilder für denselben Artikel oder Webinhalt hochladen, da er während des Lokalisierungsprozesses übersetzt werden muss. Wenn Ihr Bild keinen Text enthält, müssen Sie bei der Lokalisierung Ihrer Website nichts ändern. Eine andere Möglichkeit besteht darin, den Text vom Bild zu trennen. Sie können eine Ebene erstellen, die über dem Bild platziert wird. Alternativ können Sie Bilddateien leicht zugänglich machen.
Auch wenn kein lesbarer Text vorhanden ist, möchten Sie das Kunstobjekt (z. B. ein Bild) manchmal aus kulturellen Gründen anpassen. Es gibt einige Bibliotheken, die bei diesem Problem helfen können, z. B. [Fragmentersetzung für Links und Bilder](https://github.com/i18next/i18nextify#fragment-replacement-for-links-and-images).

### 2. Code von der Übersetzung trennen <a name="separate"></a>
Es erscheint logisch, den Code vom Übersetzungsprozess getrennt zu halten. Während des Projekts kann der Entwickler frei arbeiten, ohne von Kollegen unterbrochen zu werden. So verlieren Sie das Projekt nicht aus den Augen und garantieren, dass keine Fehler passieren. Auf diese Weise sammeln Sie automatisch und reibungslos neue Inhalte, stellen sie zur Übersetzung ein, erhalten Übersetzungen und integrieren sie wieder in das Produkt.
Eine gute Lokalisierungsmanagement-Lösung kann hier wirklich helfen. Alle Teammitglieder können parallel kollaborativ arbeiten. So kommen Sie schneller ans Ziel.
Wenn Sie locize als <a href="https://locize.com/" title="Lokalisierungsmanagement-Plattform">Lokalisierungsmanagement-Plattform</a> verwenden, wird diese Funktion angeboten.

### 3. Betrachten Sie verschiedene Arten der Pluralisierung von Wörtern <a name="plural"></a>
Verschiedene Sprachen haben unterschiedliche grammatikalische Regeln für den Umgang mit Substantiven und Einheiten im Plural. Stellen Sie sicher, dass Sie für jede Pluralform in der Sprache eine separate Übersetzung anbieten, wenn Sie formatierte Zeichenfolgen lokalisieren, die variable Mengen enthalten. Stellen Sie sich zum Beispiel vor, Sie haben im Polnischen einen Singular und dann einen Plural, je nachdem, ob die Anzahl der Objekte mit 2, 3, 4 oder einer anderen Ziffer endet. Und jede Sammlung von Dingen, die mehr als 20 sind, erfordert einen separaten Plural auf Rumänisch. Locize erkennt und schätzt Ihren Fortschritt in den verschiedenen Sprachen genau ein, indem es die verschiedenen Pluralisierungsgesetze berücksichtigt.

![Pluralisierung](../website-internationalization-best-practices/locize_plurals.webp "Plurale")

### 4. Überprüfen Sie, ob das Layout längeren oder kürzeren Text unterstützt <a name="layout"></a>
Tatsache ist, dass Übersetzungen länger sein können als der Originaltext und das Layout kaputt machen. Überprüfen Sie daher im Voraus, ob Ihr Übersetzungsansatz unterschiedliche Übersetzungsgrössen unterstützen kann. Besonders in Europa, wo verschiedene Sprachen möglicherweise viel mehr Begriffe für dieselbe Bedeutung haben. In diesem <a href="https://www.inter-contact.de/en/blog/text-length-languages?dt=1629440931092" title="blog post">Blogbeitrag</a> finden Sie ein Vergleich der europäischen Sprachen mit einer Tabelle, die einen sehr schönen Überblick zeigt, "wie die Sprachen unterschiedlich sind". Sie können den <a href="https://docs.locize.com/whats-inside/review-workflow" title="Review-Workflow">Review-Workflow</a> verwenden, um sicherzustellen, dass Änderungen an Übersetzungen akzeptiert werden bevor sie veröffentlicht werden. Bis einer der Übersetzungsvorschläge genehmigt wird, bleibt der reale Wert unverändert.

### 5. Machen Sie es einfach, Zeichenketten zu finden <a name="find"></a>
Strings sollten auf keinen Fall direkt im Code stehen. Machen Sie es Entwicklern einfach, ihre Strings zu externalisieren und sie von Anfang an in Ressourcendateien aufzunehmen. Dies impliziert, dass jede hartcodierte Zeichenfolge unabhängig von der Sprache des Benutzers in ihrer Originalsprache angezeigt wird. Solche Probleme werden Sie nie wieder haben, wenn Sie eine Übersetzungsmanagement-Software wie locize verwenden. Mit der integrierten Suchfunktion können Übersetzer jede Zeichenfolge in Sekundenschnelle entdecken.

### 6. Zeichencodierung auf UTF-8 setzen <a name="encoding"></a>
Wählen Sie eine Kodierung, die mit allen Zielsprachen kompatibel ist. Wenn Sie sich nicht sicher sind, wählen Sie einfach UTF-8 aus. Wenn Sie sich fragen, [warum UTF-8 die beste Codierung ist](../is-your-software-ready-for-localization/#encoding), lesen Sie diese <a href="https://www.w3.org/International/questions/qa-choosing-encodings.en" title="FAQ zu UTF-8">FAQ zu UTF-8</a>. Um Assets zu unterscheiden, die für eine bestimmte Region bestimmt sind, verwenden Sie ISO 693-1 und 3166-1 Sprach- und Ländercodes, um Assets nach Gebietsschema zu kennzeichnen.

### 7. Beachten Sie auch die Farben <a name="colors"></a>
In Bezug auf die Benutzererfahrung kann die Kultur Ihres Zielbenutzers einen erheblichen Unterschied machen. Berücksichtigen Sie bei der Erstellung Ihres Webdesigns, welche Märkte Sie ansprechen möchten. Sie möchten bei Ihren Zielkunden einen positiven Eindruck hinterlassen, nicht etwas, das sie an einen schrecklichen Vorfall, ein politisches Problem oder ähnliches erinnert. Machen Sie es Ihrer Website daher einfach, Farben basierend auf dem Zielland oder der Zielregion auszutauschen.

### 8. Wählen Sie den richtigen Lokalisierungsübersetzungsdienst <a name="service"></a>
Bei der Auswahl eines <a href="https://locize.com/services.html" title="Lokalisierungs-Übersetzungsdienstes">Lokalisierungs-Übersetzungsdienstes</a> gibt es zwei Hauptthemen: eines konzentriert sich auf professionelle und langfristige Softwarelokalisierung und der andere konzentriert sich auf eine schnelle und transparente Übersetzungsarbeit.

##### Thema 1: Verwenden Sie locize als <a href="https://locize.com" title="Lokalisierungsplattform">Lokalisierungsplattform</a>
Es gibt zahlreiche Möglichkeiten, locize für Ihren Lokalisierungs-Übersetzungsdienst zu verwenden, z. B. die Verwaltung all Ihrer Übersetzungen während eines bestimmten Projekts wie einer Website, App oder eines Videospiels. Planen und verwalten Sie Ihr Lokalisierungsprojekt mit kontinuierlicher Übersetzung, während das Entwicklungsteam Ihres Projekts neue Funktionen hinzufügt. Erlauben Sie [internen Übersetzern, die Übersetzung zu verwalten](https://docs.locize.com/guides-tips-and-tricks/working-with-translators), ohne den Entwicklungsprozess zu beeinträchtigen. Sie können entweder über die Locize-Schnittstelle eine Übersetzung von einem Drittanbieter anfordern oder [localistars](https://localistars.com) nutzen, um auf faire und offene Weise direkt mit den Übersetzern selbst in Kontakt zu treten. Sehen Sie sich diesen Leitfaden an, um mehr darüber zu erfahren, <a href="https://docs.locize.com/guides-tips-and-tricks/working-with-translators/localistars" title="wie mit localistars zu integrieren">wie localistars benutzen</a>. Insgesamt ist locize eine sehr vielseitige Lösung für die Lokalisierungsanforderungen Ihres Unternehmens oder Ihrer Software.

##### Thema 2: Verwenden Sie localistars als <a href="https://localistars.com" title="Translation Marketplace">Übersetzungsmarktplatz</a>
Neben der Möglichkeit, localistars innerhalb von locize direkt zu verwenden, können Sie [localistars](https://localistars.com) auch für anspruchsvolle Papiere, Produktbroschüren sowie für finanzielle, rechtliche und technologische Themen verwenden. Localistars ist ein Marktplatz mit einem grossen Übersetzernetzwerk, auf dem [Sie direkt mit dem Übersetzer zusammenarbeiten können](https://localistars.com/translator). Es gibt keinen Mittelsmann.

## Fazit
Wenn Sie die Best Practices befolgen, können Sie einen reibungslosen Ablauf schaffen und langfristig Geld sparen. Generell ist es ratsam, sich von einem Berater beraten zu lassen, der über umfangreiche Erfahrung verfügt. Bitte zögern Sie nicht, uns zu [kontaktieren](mailto:support@locize.com), wenn Sie Fragen haben.
Wir bieten eine kostenlose 14-tägige Testversion an, sodass Sie eine möglichst gute Gelegenheit haben, alle Funktionen auszuprobieren. <a href="https://www.locize.app/register" title="Jetzt registrieren">Registrieren Sie sich noch heute</a> für eine kostenlose Testphase und beginnen Sie Ihr bestes Erlebnis.

### Sie sind Entwickler
So finden Sie [hier](https://docs.locize.com/integration/instrumenting-your-code) weitere Informationen zur Integration von Locize, z. B. für <a href="https://locize.com/javascript-localization.html" title="javascript localization">Javascript-Lokalisierung</a>. Es gibt auch einige spezielle Artikel über <a href="../react-i18next-de/" title="react Lokalisierung">react Lokalisierung</a>.
