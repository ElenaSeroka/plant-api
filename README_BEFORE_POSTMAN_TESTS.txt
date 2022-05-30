PLEASE NOTE!
If tests are run in Postman once, they should all pass.

If one wishes to run the tests again, one must manually change the following variables:

https://api-plants-es.herokuapp.com/users/register HTTP METHOD POST 
change the value of the email

https://api-plants-es.herokuapp.com/webhooks/register HTTP METHOD POST 
change the value of the url

This is because the first time the application runs the test, these values are stored in the database.
If one wishes to run these again, these will fail, due to a duplicate 409 error. The application
does not allow duplicate URLs for webhooks or duplicate emails. 

