## About the API
I've implemented an API for handling information about plants! The intended users are anyone who whants information about plants - my idea was to make a site about how to find plants to suit your needs, beginner gardeners, or plants who need a lot of sun. It would function as a information bank about common houseplants, and users could contribute to the body of knowledge. The API also gives some supporting functions:

 1. List all plants in DB.
 2. List plants by common name.
 3. List plants by id. 
 4. Add, update and delete plants from database.
 5. Register for a webhook. The entered URL will be notified when a plant is added in DB.

The API is functional but very simple, and many additional features should be implemented if the API would be used in a real-life situation.  
More errorhandling and better messages should be implemented for ease of use in reality.

I decided to use Heroku, on the free tier to deploy the application.

## 1. Explain and defend your implementation of HATEOAS in your solution.
When entering an endpoint the user will be presented with a welcome message, as well as a brief explenation of what one can do within the API, and what keys must be included in the body of the message. Linksto self and to other associated endpoints are also included, as are link to crud-operations.

## 2. If your solution should implement multiple representations of the resources. How would you do it?
One could present the resources as JSON, XML or HTML. I chose to use JSON in my application, as I am familiar with it. 
One could use other formats by letting users choose which representation format they would want. This could be done when registering, or when logging in, if this should be able to change. There, the user could specify the preferred format. The application would then have to keep track of which format each user has chosen, in order to present recourses in that specific format for each user.

## 3. Motivate and defend your authentication solution.
I chose to use JSON Web Tokens (JWTs) to authenticate the user. "As per the REST (REpresentational “State” Transfer) architecture, the server does not store any state about the client session on the server-side. This restriction is called Statelessness." The JWT allows the REST API to remain stateless. When a user logs in, they will recieve a JWT. This JWT is then used as a Bearer Token, upon interacting with the recources, and registering webhooks. For this specific task, I believed this to be an adequately secure solution for authentication.

#### 3a. What other authentication solutions could you implement?
 - HTTP Basic Authentication (username and password)
 - Registering and receiveing an API key 
 - OAuth 2.0

#### 3b. What are the pros/cons of this solution?
I think most users are enjoy the OAuth 2.0 authentication process, which would have been an easier and more user-friendly authentication method. JWTs, and using Bearer tokens are a more robust method than basic HTTP Authentication. This is why I choose to implement JWTs. With more time I would have liked to attempt to implement OAuth 2.0 Authentication, as I have never tried that in combination with a RESTful API.

## 4. Explain how your webhook works.
The logged in user can register a url to which a webhook is sent, and an associated secret by going to the endpoint https://api-plants-es.herokuapp.com/webhooks/register. The reason for this url format is to, in the future, give the user an option to unregister at the endpoint  https://api-plants-es.herokuapp.com/webhooks/unregister. Every time a new plant is added to the database a post request is sent to the unique url in the database collection webhook. The user who added the plant is presented, alongside the new plant. Duplicate urls are not possible. The secret is sent in the header:

I used https://webhook.site/ to test my webhook functionality.

## 5. Since this is your first own web API, there are probably things you would solve in another way, looking back at this assignment. Write your thoughts about this.
I would very much have liked to add filtering to the application, as well as more entries in the database. I would have like to understand how to code both pagination and filtering in combination. I also would have like to add more information about each plant. The plant model I have implemented contains more fields than name and type of plant, but I did not have time to populate the database with a differing amount of fields filled in (such as for example optimal sun or temperature level. 
As previously mentioned, I  would have liked to implement OAuth 2.0 as an authentication method, just to have tried it. Instead I used JWTs, as I experience with these. 


## 6. Which "linguistic design rules" have you implemented? List them here and motivate "for each" of them very briefly why you choose them? Remember that you must consider "at least" FIVE "linguistic design rules" as the linguistic quality of your API.

 1. **rule 1** *(Forward slash separator (/) must be used to indicate a "hierarchical relationship")*. This feels like a smart and logical way to separate a hierarchical relationship.
 2. **rule 2** *(A trailing forward-slash (/) should not be included in URIs.)*. This feels like  a cleaner and more easily readable URI.
 3. **rule 3** *(Hyphens (-) should be used to improve the readability of URIs.)*. This feels like a easier to read way to add terms with two words. If everyone uses this, there will never be any confusion about how to write common-name. If there are no rules about hyphens or large letters or underscores, this simple term could be written: commonName, Commonname, Common_name, common_Name, etc, etc. By only using - and small letters, a standard is born that everyone keeps to, and one can assume how endpoints should be spelled. 
 4. **rule 4** *(Underscores (_) should not be used in URIs)*. When writing links there is often an underline used. If one uses underscores, it can be difficult to read, as an underscore then is very easy to miss.  
 5. **rule 5** *(Lowercase letters should be preferred in URI paths)*. Using lowercase letters makes the URI easier to read, and removes any doubts regardning if one should use large or small letters in any part of the URI. This is a standrard I personally feel is very important, and should be kept consistent, so that it remains a standard. 
 6. **rule 6** *(File extensions should not be included in URIs)*. File extensions are not used because of the idea that URIs (and therefore URLs) should be independent of implementation. I think this makes sense, and makes it more universal and client independant.  
 7.  **rule 7** *(A "singular" noun should be used for document names)*. One searches for one plant, and such is used in singular (cactus).
 8.  **rule 8** *( A "plural" noun should be used for collection names.)*. One searches within one collection of many plants, and such is used in plural (plants).
 9. **rule 10** *(  CRUD function names or their synonyms should not be used in URIs.)*. The HTTP methods should be used to communicate what to do.  For example - if one wants to manipulate the plant sage, one can write a single endpoint: 
https://api-plants-es.herokuapp.com/plants/common-name/sage and only change the method and body. 
 10. **rule 11** *(A verb or verb phrase should be used for controller names)*. This makes the code easier to understand and follow  within the application, from route to controller.  

## 7. Did you do something extra besides the fundamental requirements? Explain them.
## -


## 8. Link to document with the API's endpoints
[/seroka_API_Documentation.txt](seroka_API_Documentation.txt)
