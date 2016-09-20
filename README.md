Microservices are small software components that are specialized in one task and work together to achieve a higher-level task.

Requirements:
npm install -g pm2

System desing:

Product Manager: This microservice will be responsible for adding, editing, and removing products from our database, as well as serving products to the customers. This microservice will be partially public for a potential admin site to add/remove products.

Order Manager: This microservice will be responsible for managing the order and billing. We could adopt the following two strategies here:
• Order manager calls product manager and gets the details
• UI calls product manager and delegates the data to the order manager
We are going for the second: UI will gather the information needed to generate an order and it will only call the order manager when all the data required is available.
There are a few immediate effects in our architecture, as follows:
• When something goes wrong, if we only have one level of depth, we don't need to check in too many places.
• We are more resilient. If something goes wrong, it is the UI of the microservice that notices it, returning the appropriate HTTP code, in this case, without having to translate the errors that occurred a few levels above the client-facing microservice.
• It is easier to deploy and test. Not much easier, but we don't need to juggle around, we can see straight away if the product manager is reached from the UI, instead of having to go through the order manager.

Emailer: This microservice will be responsible for delivering e-mails to the customers.

UI: This microservice will expose the feature from the other microservices to a potential SPA, but we will only build the JSON interface.
