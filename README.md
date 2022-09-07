# GYM-API	

**gym-api** is a api restful implementen in js with express. 

## Proyecto Sturcture
```
+-- config
|   +--\*.js
|   +--index.js
+-- controller
+-- model
+-- router
|   +--\*.js
|   +-- index.js
|   +-- jwt_config.js
+-- test
|   +--\*.js
+-- index.js
+--package.json
```




## Installation

You need [node.js](https://nodejs.org/) installed.

Use the package manager [npm](https://www.npmjs.com/) to install all dependence of  **gym-api**.

```bash
npm i
```

This api uses MongoDb as the database. The **gym-db** database needs to be created and the **admin**/ **admin** user must be registered for it or modify the configuration file (for example config/dev.js) to add the connection that you already have in your environment. 

* MongoDB installation https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ 
* Create DB gym-db
* Create user admin/ admin

```bash
db.createUser(
  {
    user: "admin",
    pwd: passwordPrompt(),  // or cleartext password
    roles: [
       { role: "readWrite", db: "gym-db" }
    ]
  }
)
```

* Para iniciar servicio mongo: sudo systemctl start mongod

### MongoDB with Docker

There is a directory docker under the root project, which contains a docker-compose.yml and mongo-init.js with the configuration 
to build a container to run mongo service and to create the gym-db database with access for a user admin/admin and the creation of the
collection "users" with an admin user admin@gmail.com/admin123 to access the gym platform.

Only the first time execute

```bash
sudo docker-compose up
```

Then to start and stop the service

```bash
sudo docker-compose start
sudo docker-compose stop
```

List containers
```bash
sudo docker-compose ps
```
Remove containers
```bash
sudo docker-compose down
```


## Usage

```bash
//To ejecute server local use
npm run dev
//To run unit test use
npm run test
//To run convera use
npm run coverage
```

## Endpoints
| Method | Endpoint        | Req JWT | Description                                                  |
| ------ | --------------- | ------- | ------------------------------------------------------------ |
| POST   | /login          |         | Login with a User                                            |
| POST   | /register       |         | Registe a User                                               |
| GET    | /activities     | Yes     | Get all Activities                                           |
| POST   | /activities     | Yes     | Create a Activity                                            |
| GET    | /activities/:id | Yes     | Find a Activity by id                                        |
| PUT    | /activities/:id | Yes     | Update a Activity Bu                                         |
| DELETE | /activities/:id | Yes     | Delete a Activity by id                                      |
| GET    | /api-docs       |         | Enpoint that exposes a Swagger with the definition of the api |

