# Backend intern assignment

## Running the application
To run the application, first cd into project directory with terminal and install dependencies with below command.
Run npm run serve command to start the dev server.

**Please make sure to provide connection string for mongoDB instance in `.env-example` and rename it as `.env`**
```
> cd project_directory

> npm install

> npm run serve
```

## Testing Application

use below commands to test the application or use any external API client such as postMan.

**Create a user in the database**
 ```
curl  -X POST \
  'http://localhost:3000/createUser' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: ' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "name": "joy",
  "email" : "joy@gmail.com",
  "password": "admin"
}'
 ```

**Login  with user**
Authentication token will auto expire in 20 seconds to allow better testing.
 ```
 curl  -X POST \
  'http://localhost:3000/loginUser' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: ' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "email" : "ray@gmail.com",
  "password": "admin"
}'
 ```


**Refresh JWT token**
 ```
curl  -X POST \
  'http://localhost:3000/refreshToken' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: Bearer <PUT_Refresh_TOKEN_HERE>'
 ```


**jwt Auth middleware check on the "/" endpoint**
 ```
curl  -X GET \
  'http://localhost:3000' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: Beare <PUT_AUTH_TOKEN_HERE>'

 ```

**Log out end point**

 ```
curl  -X POST \
  'http://localhost:3000/logout' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: Bearer <PUT_AUTH_TOKEN_HERE>'
 ```