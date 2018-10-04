# JustinNestEgg: a chatbot-hosting website making it simple for tenants, landlords, and contractors to talk

For a coding challenge I had for a company I was applying to, they asked me to create a website that mediated communications between tenants, landlords and contractors. It was to be mainly written in Node.js and Angular, both of which I had no prior experience with. It would host a chatbot on the website that would make it convenient for tenants to report their issues to the landlord through indirect communication, so that landlords are not ovewhelmed by calls to their office. Landlords could then get in contact with contractors to go and service the rental property.

## Languages and Services Used
* Node.js - The backend logic: 
  * Parses out user responses from chatbot conversation, replies back to user 
  * Stores user service request
  * Logs conversation
  * Pulls local files for frontend use
  * Pulls database information to be displayed on website

* Angular - The frontend logic, which displays webpages built from HTML templates and backend information
  
* Javascript - The conversation logic, which determines user intent and responds appropriately

* HTML and CSS - Some of the website's building blocks

* MySQL - The database: 
  * Logs conversations between chatbot and user
  * Stores tenant issues 
  * Maintains user data

* AWS RDS - The server instance to host the website

## Conceptual Rundown
Tenants: they come in and talk to the chatbot, reporting which rental property they are living in and what issues they are facing.

Landlords: they have access to the landlord page, which stores all the issues that tenants have reported. They also have access to a list of contractors which they could contact to service their rental properties.

Contractors: they talk to the chatbot and provide their information, so that the landlord has a group of contractors they can hire to sevice their rental properties.

## Author
* Justin Picar
