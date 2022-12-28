---
title: Localization at Networkme (by Marcelo Manteigas)
description: This is a guest blog post written by Marcelo Manteigas describing the experience with locize.

date: 2022-12-29
tags:
  - localization
  - internationalization
  - guest post
thumbnail: networkme-locize/title.jpg
---

![](title.jpg)

[Networkme](https://www.networkme.io) is a career discovery and development platform that helps students find the best job for them to start their careers. We are often recognized as the “Linkedin for students” because we provide an ecosystem for companies to interact directly with their future talent through a platform that is better suited for this particular use case. 

## The Problem

From the get-go we implemented our platform in 3 languages, Portuguese, English and Spanish to cover all the Iberian market and hopefully to capture some international user and companies looking to hire/work in this region. Our initial approach was to have a local JSON file inside the application to manage the different copies in the platform, however, as we grew in size and to currently 6 different web applications, it became almost impossible to manage everything effectively. In fact, at some point any request to change copy in any of the platform was taking 2 days to fulfill and changes would only reflect in the production environment according to the deploy schedule which could take a week.

This obviously generate a lot of frustration for both the technical team because they were spending a lot of time fulfilling these requests instead of progressing in the roadmap, and the business team felt like we were not moving at the speed they needed.

We found [locize](/) as a solution to give autonomy to business teams to make changes in the application copy and relive the technical team from this burden. Also, by using the locize tools to better encapsulate the different projects we were able to implement governance features and drastically reduce the complexity to manage application with more than 10 thousand words.


## Favorite Features

The best thing about using locize that really changed our game was the ability to have an [in-context editor](https://docs.locize.com/whats-inside/context#incontext-view) that allows non-technical collaborator to easily interface with our application copy creating an abstraction between the technical implementation in a JSON format. That is very powerful to help them navigate with agility and drastically reduced the risk of breaking anything in the application since they were changing directly in the application.


![](incontext.jpg)

The ability to create different projects and having RBAS implemented was especially important to implement the necessary governance to avoid conflicting work or worst having users accidently committing mistakes


## Final Thoughts

[locize](/) really changed positively our the dynamic inside Networkme between business and technical teams by reducing the amount of time managing copy in the web applications and empowering the copywriters with the autonomy to move at the speed they expect.
The development team became **at least 20% more productive**, since the only thing they needed to do was to create the keys through the development process and all the copy management afterwards was outside the set of their responsibilities.

If you're new to locize, watch the [demo video](https://youtu.be/ds-yEEYP1Ks) to learn more about it:
{% youtube ds-yEEYP1Ks %}