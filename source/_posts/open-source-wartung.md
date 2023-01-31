---
title: Die Freude, der Stolz und die Last der Pflege von Open Source
description: Die Freude und die Belastung bei der Pflege eines Open-Source-Projekts sind mit dem Zustrom von Problemen und Pull-Requests, der ständigen Verbesserung, dem Umgang mit anspruchsvollen Nutzern und der Bedeutung der Bereitstellung eines minimalen reproduzierbaren Beispiels verbunden, um den Zeit- und Arbeitsaufwand sowohl für die Betreuer als auch für die Nutzer zu reduzieren, aber trotz der Herausforderungen ist es eine lohnende Erfahrung, die ein Gefühl von Gemeinschaft und Zusammenarbeit fördert.

date: 2023-02-01
tags:
  - i18next
  - l10n
  - i18n
  - open-source
  - github
  - localization
  - internationalization
  - translation

label: maintaining-open-source
lang: de
hidden: true
---

![](../maintaining-open-source/opensource-title.jpg)

Als [Betreuer](https://github.com/i18next/i18next/graphs/contributors) von [i18next](https://www.i18next.com), einer Open-Source-Lokalisierungsbibliothek, kann ich bestätigen, dass es nichts Schöneres gibt als das Gefühl der Freude und des Stolzes, das sich einstellt, wenn man zur Open-Source-Gemeinschaft beiträgt. Es ist ein unvergleichliches Gefühl zu sehen, wie andere Ihre Arbeit nutzen und schätzen. Aber mit grosser Macht kommt grosse Verantwortung, und die Pflege eines Open-Source-Projekts kann manchmal eine schwere Last sein.

Lassen Sie mich Ihnen ein Bild malen: Es ist ein sonniger Sonntagnachmittag, und Sie sind bereit, sich zu entspannen und das Wochenende zu geniessen. Doch dann fängt Ihr Telefon an zu summen. Es ist eine Benachrichtigung von [GitHub](https://github.com), die Sie auf ein neues Problem oder eine neue Anfrage aufmerksam macht. Sie versuchen, es zu ignorieren, aber das nagende **Verantwortungsgefühl** setzt ein. Sie können nicht anders als sich zu fragen: "Was ist, wenn dies ein kritischer Fehler ist, der so schnell wie möglich behoben werden muss?" Und so klappen Sie widerwillig Ihren Laptop auf, bereit, das Problem in Angriff zu nehmen. Das, meine Freunde, ist die Freude und die Last der Pflege von Open Source.

![](../maintaining-open-source/sunday-interruption.jpg)

Aber es ist nicht nur der ständige **Fluss von Problemen und Pull Requests**, der überwältigend sein kann. Es ist auch der Druck, das Projekt **stetig zu verbessern** und zu aktualisieren, um mit der sich ständig verändernden Technologielandschaft Schritt zu halten. Bei i18next zum Beispiel müssen wir über neue Lokalisierungstrends und -technologien auf dem Laufenden bleiben und die **Kompatibilität mit den neuesten Versionen beliebter Frameworks und Bibliotheken** sicherstellen. Das kann eine Menge sein, vor allem, wenn man auch noch **einen Vollzeitjob, eine Familie und andere Verpflichtungen unter einen Hut bringen muss**.

![](../maintaining-open-source/i18next_ecosystem.webp)

Trotz der Herausforderungen ist die Betreuung eines Open-Source-Projekts eine **belohnende Erfahrung**, die ich gegen nichts eintauschen würde. Das Gefühl der Gemeinschaft und der Zusammenarbeit ist wirklich etwas Besonderes, und es ist eine **Ehre**, ein Teil von etwas zu sein, das so vielen Menschen hilft. Ausserdem gibt es nichts Schöneres als das **Gefühl der Befriedigung**, wenn man endlich einen kniffligen Fehler behebt oder eine neue Funktion implementiert, die das Projekt noch besser macht.

![](../maintaining-open-source/satisfaction.jpg)

Ein weiterer Aspekt der Pflege eines Open-Source-Projekts, der eine Herausforderung darstellen kann, ist der **Umgang mit anspruchsvollen Benutzern**. Während die meisten Benutzer die harte Arbeit, die mit der Pflege eines Projekts verbunden ist, verstehen und zu schätzen wissen, können einige sehr anspruchsvoll sein und sogar damit drohen, die Bibliothek nicht mehr zu benutzen, wenn ihr spezieller Wunsch nicht umgesetzt wird. Es kann schwierig sein, mit solchen Situationen umzugehen, da Sie Ihre Benutzer zufrieden stellen wollen, aber auch die allgemeine Richtung und die Ziele des Projekts berücksichtigen müssen. Es ist wichtig daran zu denken, dass Sie als Betreuer das letzte Wort darüber haben, was dem Projekt hinzugefügt wird und was nicht. Es ist auch wichtig, mit den Benutzern zu kommunizieren und die Gründe für bestimmte Entscheidungen zu erklären.

Wenn Sie ein Open-Source-Projekt betreuen, denken Sie daran, dass **niemand jemanden zwingt, es zu benutzen**. Es ist zwar wichtig, auf Rückmeldungen zu hören und zu versuchen, die Bedürfnisse der Nutzer zu erfüllen, aber es ist auch wichtig, sich daran zu erinnern, dass das Projekt quelloffen und frei zu verwenden ist. Das bedeutet, dass die Nutzer die Freiheit haben, das Projekt zu nutzen oder nicht, und sie haben auch die Möglichkeit, etwas dazu beizutragen oder es sogar zu "forken", wenn sie wichtige Änderungen vornehmen wollen. Als Betreuer sollten wir immer offen für Feedback und Vorschläge sein, aber wir müssen auch Vertrauen in unsere Entscheidungen und die Richtung des Projekts haben. Wir sollten auch nicht vergessen, dass die meisten von uns ehrenamtlich arbeiten, und dass dies für die meisten von uns ein Hobby, eine Leidenschaft oder ein Nebenprojekt ist, und kein bezahlter Job. Wir sollten uns nicht verausgaben, indem wir versuchen, es jedem Benutzer recht zu machen. Wenn Nutzer anfangen, auf **kostenlosen und fortlaufenden Support** zu bestehen, ist das nicht gut.

Eine häufige Herausforderung bei der Pflege eines Open-Source-Projekts ist der Umgang mit Benutzern, die auf GitHub **Probleme melden, ohne genügend Informationen** zu haben, um das Problem zu reproduzieren und zu untersuchen. Leider ist es nicht ungewöhnlich, dass Benutzer einfach sagen "es gibt einen Fehler" oder "es funktioniert nicht", ohne zusätzliche Details oder Kontext zu liefern. Dies kann es für die Betreuer extrem schwierig machen, das Problem zu verstehen und zu beheben.

Hier kommt das Konzept eines [**minimalen reproduzierbaren Beispiels**] (https://minimum-reproduction.wtf/) ins Spiel. Ein minimales reproduzierbares Beispiel ist ein kleiner, in sich geschlossener Codeschnipsel, der das Problem demonstriert. Es sollte alle Informationen enthalten, die der Betreuer benötigt, um das Problem zu reproduzieren, einschliesslich der Version der Bibliothek, der Umgebung und jeder relevanten Konfiguration.

Die Bereitstellung eines minimalen, reproduzierbaren Beispiels kann den Zeit- und Arbeitsaufwand für die Untersuchung und Behebung eines Problems erheblich reduzieren. Ohne ein solches Beispiel muss der Betreuer möglicherweise Stunden damit verbringen, das Problem zu verstehen und zu reproduzieren, was sowohl für den Betreuer als auch für den Benutzer frustrierend sein kann.

Es ist wichtig, die Benutzer über die Wichtigkeit der Bereitstellung eines minimalen reproduzierbaren Beispiels aufzuklären, und dies in der Projektdokumentation klar zu kommunizieren. Einige Projektbetreuer haben sogar eine **Vorlage für Fragen** und/oder Pull Request, die den Nutzer auffordert, ein solches Beispiel zu liefern.

![](../maintaining-open-source/mre.jpg)

Es ist auch wichtig, geduldig und verständnisvoll zu sein, wenn man mit Benutzern zu tun hat, die mit dem Konzept eines minimalen reproduzierbaren Beispiels vielleicht nicht vertraut sind. Die Pflege eines Open-Source-Projekts ist eine Gemeinschaftsarbeit, und es ist wichtig, zusammenzuarbeiten, um das Projekt besser zu machen. Ausserdem ist ein Pull Request, der einen **negativen Testfall** enthält, sehr wertvoll.

Manchmal ist es sinnvoll, eine grössere Anleitung oder einen Blog-Post zu schreiben, den die Nutzer durchgehen können, um grundlegende Probleme zu vermeiden.
Für die Verwendung von i18next in einer React Anwendung haben wir zum Beispiel [diesen Blog Post](../react-i18next-de/) geschrieben, der alle anfänglichen Probleme und Hürden behandelt.

Denken Sie daran, dass Sie als Benutzer einer Open-Source-Bibliothek die Möglichkeit haben, zu ihrer Entwicklung beizutragen und sie noch besser zu machen. Scheuen Sie sich nicht, sich einzubringen und einen Beitrag zu leisten, egal wie klein. Jedes bisschen hilft, und es ist eine grossartige Möglichkeit, der Gemeinschaft **etwas zurückzugeben**. Auch wenn Sie kein Entwickler sind, können Sie auf andere Weise einen Beitrag leisten, z. B. durch das Schreiben von Dokumentation oder die Beantwortung von Fragen anderer Benutzer.

Der beste Weg, einen Fehler in einer Open-Source-Bibliothek zu beheben, ist, ihn **selbst zu beheben und einen Pull Request** einzureichen. Es ist nicht nur eine grossartige Möglichkeit, der Gemeinschaft etwas zurückzugeben, sondern es hilft Ihnen auch, neue Fähigkeiten zu erlernen und die Codebasis besser zu verstehen und neue Fähigkeiten zu erlernen. Zögern Sie also nicht, die Ärmel hochzukrempeln und sich zu engagieren.

Zusammenfassend lässt sich sagen, dass die Betreuung eines Open-Source-Projekts eine anspruchsvolle, aber lohnende Erfahrung ist. Es erfordert Hingabe, harte Arbeit und eine Menge Geduld, um ein Open-Source-Projekt reibungslos am Laufen zu halten. Aber der **Gemeinschaftssinn und die Zusammenarbeit**, die mit Open Source einhergehen, machen das Ganze lohnenswert. Als Betreuer ist es wichtig, sich daran zu erinnern, dass **Sie nicht alleine** auf dieser Reise sind, und dass es immer andere Betreuer und Mitwirkende gibt, die bereit sind zu helfen. Als Nutzer sollten Sie sich daran erinnern, dass Sie die **Macht haben, etwas beizutragen** und etwas zu bewirken.

![](../maintaining-open-source/contribute.jpg)

Open Source ist ein Gemeinschaftsprojekt, und **jeder spielt eine Rolle** für seinen Erfolg. Betreuer, Mitwirkende und Nutzer haben alle die Verantwortung, zusammenzuarbeiten, um das Projekt zu verbessern. Betreuer sollten offen für Feedback und Vorschläge sein, und Benutzer sollten klare, detaillierte Informationen über ihre Probleme liefern und, wenn möglich, Lösungen vorschlagen oder minimale reproduzierbare Beispiele liefern.

Kurz gesagt, die Pflege eines Open-Source-Projekts ist eine anspruchsvolle, aber lohnende Erfahrung, die Menschen zusammenbringt, um auf ein gemeinsames Ziel hinzuarbeiten. Es ist wichtig, dass alle zusammenarbeiten. Lassen Sie uns also weiterhin Open-Source-Projekte unterstützen und **einen Beitrag dazu leisten** und die Welt zu einem besseren Ort machen, eine Codezeile nach der anderen.

![](../maintaining-open-source/team-work.jpg)

Abschliessend möchte ich [locize](https://locize.com/i18next.html#official-sponsor) dafür danken, dass sie uns die Möglichkeit geben, unsere i18next-Community zu unterstützen und in Open-Source-Aktivitäten zu investieren.
Ohne diese Unterstützung wäre i18next nicht da, wo es heute ist.

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
    },{
      "@type": "Question",
      "name": "Was sind die Herausforderungen bei der Pflege eines Open-Source-Projekts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sich ständig mit neuen Problemen und Pull-Requests befassen zu müssen, über die neuesten Trends und Technologien auf dem Laufenden zu bleiben, andere Verpflichtungen unter einen Hut zu bringen und mit anspruchsvollen Nutzern umzugehen, sind einige der Herausforderungen bei der Pflege eines Open-Source-Projekts."
      }
    },{
      "@type": "Question",
      "name": "Wie kann man mit anspruchsvollen Nutzern umgehen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Betreuer hat das letzte Wort darüber, was dem Projekt hinzugefügt wird. Es ist wichtig, mit den Nutzern zu kommunizieren, die Gründe für Entscheidungen zu erläutern und daran zu denken, dass das Projekt quelloffen und frei zu nutzen ist."
      }
    },{
      "@type": "Question",
      "name": "Was ist das für ein Gefühl der Freude und des Stolzes, zu einem Open-Source-Projekt beizutragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Mitarbeit an einem Open-Source-Projekt bringt Freude und Stolz, wenn man sieht, dass andere die eigene Arbeit nutzen und schätzen."
      }
    },{
      "@type": "Question",
      "name": "Ist die Pflege eines Open-Source-Projekts immer einfach?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein, die Pflege eines Open-Source-Projekts kann zuweilen eine große Belastung sein, da ständig neue Probleme und Pull-Requests auftreten und das Projekt ständig verbessert und aktualisiert werden muss."
      }
    }]
  }
</script>
