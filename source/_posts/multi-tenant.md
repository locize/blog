---
title: Multi tenant architecture | locize
description: What is Multi-Tenant Architecture? And how we increase the value of the client by improving our software with it.

date: 2022-10-12
tags:
  - software architecture
  - cloud
  - multi-tenancy
  - customers
  - data

thumbnail: multi-tenant/multi-tenant-application.webp
---

![multi-tenant-application](multi-tenant-application.webp)

You're going to learn about a subject today that is more popular than ever.

**We now offer our consumers this unique functionality. Without the client having to pay more, this will contribute to raising the value of our localization software.**

Let's start by reviewing basic definitional information concerning multi-tenant as well as the benefits of such an architecture.

# Definition: Multi tenant

A software that is multi-tenant may serve several customers with a single application instance. A single instance of a software program (and its underlying database and technology) supports several tenants in multi-tenant software architecture, also known as software multi-tenancy (or user accounts).

Each tenant can customize the program by changing some basic parameters. This might involve the look and feel of the user interface, user administration, or adding custom code to the program.

In this situation, instead of a dedicated server, the space for each tenant or client is shared. The multi-tenant nature of SaaS systems necessitates a greater emphasis on ensuring that all efforts are taken to isolate tenant resources.

There are three main types of multi tenant architecture:

### 1) Shared database
A multi-tenancy architecture with a multi-tenant database is a single, shared database structure. Because shared resources are used, this is the simplest of the three kinds and has a relatively low cost to tenants.
To host tenants and store data, this design employs a single application and database instance. Using a single, common database schema provides for faster scaling, but can result in greater total running expenses.

### 2) Single database with several schemas
A single database with several schemas is another approach to multi-tenancy. This approach has a single application instance and separate databases for each tenant. Because of this design, each individual database incurs more expenses and requires more administrative effort. It is useful when data from various clients must be processed differently, such as when they are located in different countries with different legislation.

### 3) Several databases
Data is stored in numerous databases in the third type of multi-tenant architecture. This approach is very difficult in terms of administration and maintenance, however renters may be distinguished from one another using a predefined criterion.

![source: diegosucaria.info](multi-tenant-architecture.webp)



## The advantages of multi tenant applications
The huge advantage for shared resources is that it will make the entry cost very low and the scalability easier and faster. These are the main other advantages of multi-tenant architecture:

- <b>Lower costs:</b> When compare to other hosting architectures, it’s costs less than a single infrastructure is used for multiple tenants
- <b>No maintenance at all:</b> Always up-to-date code as the host is taking care of maintenance. New features are implemented without the customer's involvement and just once.
- <b>Highly scalable:</b> The architecture is easily scalable on demand, new users access to the same instance
- <b>Easy customization:</b> It’s highly flexible, allowing each tenant client to modify the application to their individual business needs without incurring the expense, time, and risk of having an own development.
- <b>High productivity:</b> There is an improvement in productivity for the tenant because there is no need to manage the infrastructure.

## Multi-tenant vs. single-tenant
The main difference is the access to source-code. In single-tenant architectures, a tenant will have a singular instance of an application dedicated to them. 
The key distinction is the availability of source code. A tenant in a single-tenant architecture will have a single instance of an application devoted to them.


### Example
Assume that each client has a separate residence that is completely cut off from any nearby structures. In a multi-tenant cloud architecture, tenants reside in several apartments inside the same structure. 

The same security system and communal utilities link them all. However, each tenant's privacy is protected within their apartment since they each have a key. But it's more probable that their neighbors' behavior will affect how comfortable they are in the flat.

<br /><br />

## How locize introduce multi-tenant in translation management

For locize the multi-tenant approach is less of the classical infrastrucutre topic, but it still makes perfect sense for the translation management system since it functions as a fully independent application/project that is integrated into your own application or website.

This means that our customers (you) can in turn integrate the own customers or other projects into the account without opening another account.

<div style="border-left: 0.5px solid orange;padding: 0.5rem 2rem">
<h3 style="color:orange;">Uniqueness</h3>
<p style="color:grey;">The concept of multi-tenancy is absolutely new and exclusive to the localization industry. Use the most up to date software for this purpose, <a style="color:orange" href="https://www.locize.app/register" title="locize">locize</a></p>
</div>


With the multi-tentant function to happen:

- With limited access, you can assign your own clients a dedicated project without spending money on new infrastructure.
- Advanced user management enhances workflow flexibility in general.
- The localization software will increase in scale from its current level.

<div style="border-left: 0.5px solid orange;padding: 0.5rem 2rem">
<h3 style="color:orange;">Testimonials</h3>
<p style="color:grey;">Check out our <a href="/customers.html" title="customer success stories">customer success stories</a> for more examples of who is using our service.</p>
</div>


➡️ <b>Read more:</b> <a style="color:orange" href="https://docs.locize.com/more/multi-tenant" title="multi tenant docs">Here you will find the instructions</a> how to add a multi-tenant project for locize.

![locize-multi-tenant](locize-multi-tenant.webp)

Your primary project's material serves as the foundation for the projects developed under "Tenants."

The tenant project has a complete list of all current and upcoming translations.

Now, tenants have the option of maintaining translations exactly as you gave them or changing values as necessary.

You can choose to pay such expenses by letting the consumer pay with his own credit card or by subscribing to those tenant projects using your main subscription.


## Additional links

➡️ Create a free new [user account](https://www.locize.app/register) for multi tenant experience

➡️ Find out more about [what a translation management system is](/blog/tms/)

➡️ Find out more about [localization](../localization/)