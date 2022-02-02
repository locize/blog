title: A tale of the last 10 years in web development

date: 2018-08-28
tags:
  - locize
  - localization
  - internationalization
  - web
  - l10n
  - i18n
  - i18next
categories:
  - Post
thumbnail: a-tale-of-the-last-10-years-in-web-development/title.png
redirect_from:
- /2018-08-28-a-tale-of-the-last-10-years-in-web-development
---

![web development](title.png "locize © inweso GmbH")

> This is a work of fiction. Names, characters, businesses, places, events, locales, and incidents depicted in this story are either the products of my imagination or used in a fictitious manner. Any resemblance to actual persons, living or dead, or actual events is purely coincidental.

# An Introduction

This story is based on a true story of each of us. Over the past 10 years, many web developers have experienced such a journey. Starting from [jQuery](https://jquery.com/), passing through [Angular](https://angular.io/), using [React](https://reactjs.org/) and streak [Vue](https://vuejs.org/).

When reading, “darker areas” of the beginnings of single page applications (SPA) are undergone. This can cause unwanted nervous muscle twitches from the past.

For risks and side effects read the package leaflet _(there is none)_ and consult your doctor or pharmacist _(I don’t know if they could understand)_.

* * *

Once upon a time, in spring 2008 in a small company in Sheffield, there was a software developer called Dorian. He was working on a desktop application built with [Microsoft .NET](https://www.microsoft.com/net/download/dotnet-framework-runtime).  
Not far from there, in Rotherham, Shaun worked in a similar company as web developer.  
Both companies were very similar and sometimes even had the same customers. So it happened that the top management of both companies met and they merged.  
Patty, who had been promoted to development manager, had the task to assemble a new web development team. After she had already inducted Shaun into her team, she also found Dorian and noticed a possible team change.  
She beat him an offer and Dorian joined straight the team in Rotherham.  
For Dorian, professional development with Javascript was something new. He’d learned Javascript during his studies, but he’d used it rather than animate a website.  
Shaun, on the other hand, even showed him how to handle [node.js](https://nodejs.org/) and linux and mac. Dorian had always only worked with Windows so far. And from Javascript in the backend he was quite astonished and surprised.  
Patty saw the first weeks relaxed and felt that she was uniting these two, the right thing.

Soon it was time to productively implement a new web application. Together, they decided to try to use [node.js](https://nodejs.org/) in the backend and [jQuery](https://jquery.com/) in the frontend.  
They did choose [jQuery](https://jquery.com/) because the support of the community was great, it made DOM manipulation painless, played well with [AJAX](https://en.wikipedia.org/wiki/Ajax_%28programming%29), made basic animation a piece of cake, had a lot of plug-ins, etc…  
Since the web application was not only for English speaking users, they used [jquery-i18next](https://github.com/i18next/jquery-i18next) as an internationalization (i18n) library.

<script src="https://gist.github.com/adrai/14c32d1a5269c03bc42fe0683235296b.js" alt="https://github.com/adrai/i18next-main-differentiator/tree/master/jquery"></script>

_To see how this could look like click_ [_here_](https://adrai.github.io/i18next-main-differentiator/jquery/)_._

* * *

After about 3 to 4 years, the first signs of weakness of the web application began.  
There were overusing big/clever plugins, had big/complex files and polluted the global namespace.  
The heavy use of long chains of selectors (_“ul#leftnav li p a.current“_) made the code brittle.  
They started to lose track of what’s where because of the neat idea to use _.data()_ to attach data to the DOM elements, to track the page state.  
Everything started being slow…  
Patty had new major features in the pipeline. But the team, which had problems to grow, recommended a refactoring phase.  
Quickly the team got support from 2 freelancers, Serge and Martina. Patty introduced the new ones as “the experts”.  
Serge and Martina had [Angular](https://angular.io/) know-how and persuaded everyone to replace the [jQuery](https://jquery.com/) solution with [Angular](https://angular.io/).  
Their arguments sounded promising:  
Instead of unobtrusive Javascript with selectors, now declarative templates.  
From semantic HTML, to semantic models. Instead of classic separation of concerns (HTML, CSS, JS), the usage of MVC pattern. No plug-ins but directives. _$scope_ instead of closure.  
Instead of manual DOM manipulation and binding, modern data binding. Less “spaghetti” code and more dependency injection. From unorganized, to modular service architecture.

Because [i18next](https://www.i18next.com) was not only built for [jQuery](https://jquery.com/), they could use [ng-i18next](https://github.com/i18next/ng-i18next) and at least keep the same configuration and use the same [localization files](https://github.com/adrai/i18next-main-differentiator/tree/master/locales) as before!

<script src="https://gist.github.com/adrai/54e3d4b2356dfd6934b4842f7c7b4dfc.js" alt="https://github.com/adrai/i18next-main-differentiator/tree/master/angular"></script>

_To see how this could look like click_ [_here_](https://adrai.github.io/i18next-main-differentiator/angular/)_._

* * *

During the next 3 to 4 years, Patty added more freelancers and contractors to the team.  
Shaun and Dorian started to recognize that making the simplest features work seems a struggle.  
There were more and more performance and complexity issues.  
Directives, services and filters theoretically were available, but ultimately, everything was built around controllers and their two-way bound _$scope_.  
Angular seemed to be fine for the beginning, when it was a simple application, but as the frontend application grew in complexity, this led to the [scope soup problem](https://toddmotto.com/no-scope-soup-bind-to-controller-angularjs/) amongst other issues.  
Additionally, the fear of [Angular](https://angular.io/) 2’s release was on the horizon. By trying some samples, Shaun said:

> _“Is this still Angular?”_

In the meantime, the backend had turned into a solid foundation based on DDD, CQRS and event sourcing.  
During a late-night beer, Dorian told Shaun about [React](https://reactjs.org/) and [Redux](https://redux.js.org/). He said that when he read about [React](https://reactjs.org/), [Redux](https://redux.js.org/) and FLUX he immediately felt that this was a natural fit to the existing backend.  
Finally, they convinced Patty to rewrite the whole frontend with these arguments:

![react](react.gif "https://blog.gisspan.com")


*   [Angular](https://angular.io/) was a framework vs. [React](https://reactjs.org/) was a library
*   the more flexible state management with [Redux](https://redux.js.org/)
*   virtual DOM, one-way data flow, PropTypes and a well-defined component lifecycle
*   the obvious natural fit with their backend
*   single source of truth
*   [JSX](https://jsx.github.io/), a natural evolution of Javascript
*   [React](https://reactjs.org/) has faster learning curve. It feels like learning faster.

As with the last technology change, this time there was an [i18next](https://www.i18next.com) option. Just used the new [react-i18next](https://react.i18next.com/) library and still the same [localization files](https://github.com/adrai/i18next-main-differentiator/tree/master/locales)!


<script src="https://gist.github.com/adrai/78ac88e6dd61b4249c05b535e896de35.js" alt="https://github.com/adrai/i18next-main-differentiator/tree/master/react"></script>

_To see how this could look like click_ [_here_](https://adrai.github.io/i18next-main-differentiator/react/)_._

* * *

Around the year 2018, many freelancers and contractors were no longer in the team. Instead of them now younger developers started to ask for something new…

> _“_[_React_](https://reactjs.org/) _is ok, but what’s about_ [_Vue_](https://vuejs.org/)_?”_

Shaun and Dorian organized a little technical session and they explained that [React](https://reactjs.org/) and [Vue](https://vuejs.org/) had more similarities than differences:

*   both were fast and lightweight
*   both had a component based architecture
*   both used a virtual DOM
*   both could be dropped into a single HTML file or be a module in a more sophisticated [webpack](https://webpack.js.org/) setup
*   both had separate router and state management libraries

Long talk short, the session ended with the following sentence by Shaun:

> “Ok, let’s try to write our web app in [Vue](https://vuejs.org/) and create a PoC…”

Whether they’ve really switched to [Vue](https://vuejs.org/), we do not know, but what we know is that if that’s the case, then they’re sure to use [vue-i18next](https://github.com/panter/vue-i18next) or a similar library.

<script src="https://gist.github.com/adrai/54ccddbabbba736e0460c1f01e546179.js" alt="https://github.com/adrai/i18next-main-differentiator/tree/master/vue"></script>

_To see how this could look like click_ [_here_](https://adrai.github.io/i18next-main-differentiator/vue/)_._

* * *

[i18next](https://www.i18next.com) was right:

> “learn once — translate everywhere”!

**_Technologies and libraries come and go, but_** [**_i18next_**](https://www.i18next.com) **_remains!_**

### Post-credits scene

There are voices who say that they have also replaced their [i18next-xhr-backend](https://github.com/i18next/i18next-xhr-backend) with that of [locize](https://github.com/locize/i18next-locize-backend).

_To see how this could look like look at_ [_this video_](https://youtu.be/kw-GEQbgmSc)[_._](https://youtu.be/kw-GEQbgmSc%29.*)

{% youtube kw-GEQbgmSc %}
