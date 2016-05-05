---
title: technology stack - locize is serverless
date: 2016-04-07 20:03:12
tags:
---

### No Servers?

We believe that the best DevOps is **NoOps**.
Nothing against DevOps or DevOps people. On the contrary, but we think we could do differently!

Instead of spending time on setting up virtual machines and maintaining them, we setup our stack directly on different services – leaving ourselves more time to work on great features.

**locize** gave us a chance to have a look around at new paths for building long lasting components.

We used a set of AWS solutions:
- ・ [AWS DynamoDB](https://aws.amazon.com/dynamodb)
- ・ [AWS CloudFront CDN](https://aws.amazon.com/de/cloudfront)
- ・ [AWS Simple Storage Service S3](https://aws.amazon.com/s3)

but specifically:
- ・ [AWS API Gateway](https://aws.amazon.com/api-gateway)
- ・ [AWS Lambda](https://aws.amazon.com/lambda)

### Amazon Lambda
[AWS Lambda](https://aws.amazon.com/lambda) is a compute service where you can upload your code to AWS Lambda and the service can run the code on your behalf using AWS infrastructure.
All this without the hassle of own virtual machines, containers or any infrastructure for that matter.
It integrates very well with [S3](https://aws.amazon.com/s3) _(where we serve the localized files)_ and with [DynamoDB](https://aws.amazon.com/dynamodb) _(our main work storage)_.
We don’t have to worry about scaling, multi-server communication and other problems related to distributed systems.
We use the [node.js](https://nodejs.org) runtime for all our lambda functions.
<div class="center">
<img width="100%" src="https://nodejs.org/static/images/logos/nodejs-new-white-pantone.png" alt="node.js" />
</div>

### Amazon API Gateway
[AWS API Gateway](https://aws.amazon.com/api-gateway) lets you create a RESTful API to expose selected back-end features. The back end can be another AWS service, such as [AWS Lambda](https://aws.amazon.com/lambda) or [AWS DynamoDB](https://aws.amazon.com/dynamodb), or it can be an existing web application.

### Below you can see how **locize** uses this services
<div class="center">
<img width="100%" src="/images/aws.png" />
</div>


### What about the client side?
In an other blog post ;-)
