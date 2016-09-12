Microservices are small software components that are specialized in one task and work together to achieve a higher-level task.

Requirements:
npm install -g pm2

System desing:

Product Manager: This microservice will be responsible for adding, editing, and removing products from our database, as well as serving products to the customers. This microservice will be partially public for a potential admin site to add/remove products.

Order Manager: This microservice will be responsible for managing the order and billing.

Emailer: This microservice will be responsible for delivering e-mails to the customers.

UI: This microservice will expose the feature from the other microservices to a potential SPA, but we will only build the JSON interface.
