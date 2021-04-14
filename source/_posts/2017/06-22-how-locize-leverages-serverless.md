title: How locize leverages serverless
date: 2017-06-22
tags:
  - serverless
  - backend
  - aws
  - service
categories:
  - Post
thumbnail: /2017-06-22-how-locize-leverages-serverless/title.png
---

![](title.png "locize © inweso GmbH")

_[slides](https://www.slideshare.net/adrai/locize-tech-talk)_

## Why we choose serverless?

![](why.png "locize © inweso GmbH")

When we started with [locize](http://www.locize.com) we did not know how fast it would scale… serverless means we didn’t need to make that choice. The serverless architecture scales with our business model.

The next argument is, we hate maintaining and operating infrastructure. We believe in NoOps. Here serverless saves not only computing power but human resources too.

Finally you may ask: Why not a PaaS solution? => We are working with PaaS solutions since early 2011 and we always had the dream to have a platform where you really pay only when something is used (i.e. call of a function, query of a table, etc…) so you can fully concentrate to the business code.
And last but not least: serverless is really cool!


## Why we choose AWS?

![](why_aws.png "locize © inweso GmbH")

We think AWS is the only production-ready FaaS provider (and more) that works out of the box and scales like you expected. It’s designed with an API-first approach, so everything can be automated.
We think AWS has in mind a possible future where you can also run functions directly on the edge (directly on hardware).
Additionally AWS has not only lambda but completes the serverless offering with:

- API Gateway
- DynamoDB
- Simple Storage Service (S3)
- CloudFront
- Simple Email Service (SES)
- and a lot more...


## The basic setup

![](setup.png "locize © inweso GmbH")

When Developers/Translation Editors/Managers, etc… goes to www.locize.app, the locize-app-client (which is hosted on S3 and exposed by CloudFront) is served. The client then accesses our lambda backend through the API-Gateway also exposed by CloudFront. Our main working storage (DynamoDB) is then accessed by our lambda functions.
Each time someone publishes (or auto-publishes) a translation resource a lambda function will save that resource to S3. When published, the endusers of your product can access them via CDN edge locations offered and exposed by CloudFront too.


## Full-Stack JavaScript

![](full_js.png "locize © inweso GmbH")

locize is a single language solution! Everything is JavaScript!
The complete application backend, the api, the cli and other tools runs on [node.js](https://nodejs.org)… and the locize-app-client is a modern SPA based on [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).


## Lambda functions

![](types.png "locize © inweso GmbH")

locize uses 3 different base lambda types.
These are not real „AWS-defined“ lambda types but we've defined these types ourself.

### Express

![](express.png "locize © inweso GmbH")

The first type is the express type.
It defines RESTful APIs using the normal [express](http://expressjs.com/) framework.
You see the app.js file looks like a normal [express](http://expressjs.com/)  based project.
But at the end of the file you see that if this file is executed directly (like `node app.js`) it will start to listen on port 3000 and can be used to test locally.
But if required by another file it exports the configured [express](http://expressjs.com/) app.
For this scenario there is an additional file (lambda.js) that uses the help of the npm module „aws-serverless-express“ to proxy and map the lambda function calls to http requests and responses. 

### Async

![](async.png "locize © inweso GmbH")

The second type is the async type.
This lambda function is triggered by other lambda functions to compute non blocking tasks. i.e. calculation of current words in project, or publishing translation resources to S3, etc…
The key element here is that a lambda function is able to call another lambda function by simply using the official aws-sdk npm module.
With the help of AWS policies you can define exactly which function can be invoked.

### S3 event

![](s3.png "locize © inweso GmbH")

The last type is the S3 event type.
This lambda function is i.e. triggered by a new CloudFront log file that was saved to s3 (this feature can be enabled on CloudFront).
We use this to i.e. calculate the amount of downloads or to generate statistics.

## Our tooling

![](claudia.png "locize © inweso GmbH")

Because we have a pure JavaScript landscape we’ve chosen [claudia.js](https://claudiajs.com/)
It automatically installs and configures a lot on AWS. From API-Gateway to Lambda versioning.
[Claudia.js](https://claudiajs.com/) does not abstract away AWS services. It’s really transparent and easy to understand.
That’s why our advice is: if you want to build simple services and run them with AWS lambda, and you're looking for something low-overhead, easy to get started with, and you only want to use the [node.js](https://nodejs.org) runtime, Claudia is a good choice.
