---
title: Localization at Immersive Communities (by Mario Stopfer)
description: This is a guest blog post written by Mario Stopfer describing the experience with locize.

date: 2022-11-08
tags:
  - localization
  - internationalization
  - guest post
thumbnail: immersive-locize/title.jpg
---

![](title.jpg)

[Immersive Communities](https://immersive.community) is a social media platform for content creators. It allows users to create their community and have mambers write articles on any topic they care about. As a solo-developer, I've worked for just over 4 years to deliver the platform to a global audience. Since my goal was to have a global reach from day one, it goes without saying that localization was something I took seriously.

I've decided to have the platform fully localized in 10 languages at launch. This, would certainly take a lot of time and effor, so I started looking for possible SaaS solutions to his problem. My first search result was [locize](/) and it looked promising so I gave it a go. Needless to say, I wasn't disappoined and I neded up using [locize](/) to fully localize my platform.

# Favorite Features

The best thing about [locize](/) that I found useful was the ability to create multiple projects. Inside each project you can have multiple documents ([namespaces](https://docs.locize.com/more/namespaces)), which came useful to me, since I would have at least 2 different website types.

One would be the main website and the other, the other would represent all the other community websites where users can write articles on. Now I had the ability to load only the [namespaces](https://docs.locize.com/more/namespaces) and translations I wanted, based on which website layout I was loading.

The other invaluable feature was the ability to automatically translate all your phrases using Google Translate, but [locize](/) took it one step further by being compliant with [i18next](https://www.i18next.com) standards and also adding appropriate singular and plural translations. This would not be possible for me to do by myself since I would have to have inshight into the grammar rules of each language I wanted localized.

# Corner Cases handled with Ease

Aside from plurals, I also had to handle time and counts of items. Luckily, using interpolation, [locize](/) understood my request and properly formatted the time which I used to show how long ago each article was written. Also, the count of items, for example comments each article gets, was formatted properly. But this was not the biggest hurdle I had to jump over.

My real challenge was to localize my [Landing Page](https://immersive.community/home/login). The challenge came in the form of not only translating the text, but also adding the appropriate styling. Since different languages have different grammar rules, I couldn't just reuse a word which I translated previously, style it and add it to the phrase list.

This means that I had to use regular white font with my titles, but also had to apply a **CSS** color gradient on some words, to indicate important part of each title. I had to add styling for each title at a different place and then have them translated and displayed to the user. 

The best part is that this was not just any text, but actually **Markdown**, which was then passed through a Markdown processor, which actually then generated styled **HTML**. The end result is that titles on the landing page have multiple styles applied to them.

![](screens.jpg)

# Final Thoughts

I found [locize](/) to be invaluable to my localization effort. I will continue using it for other projects and the ability to pause your project and pay less for your monthly subscription when you're not using it is an added bonus!

In [this article](https://betterprogramming.pub/how-i-built-a-social-network-in-4-years-as-a-solo-developer-4af70fb2d4c8) you can read a lot more about how I built this social network in 4 years as a solo developer.

If you're new to locize, watch the [demo video](https://youtu.be/ds-yEEYP1Ks) to learn more about it:
{% youtube ds-yEEYP1Ks %}

