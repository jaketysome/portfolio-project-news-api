# News API

## Background

The intention of this News API is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Several endpoints are provided handling a number of methods including GET, POST, PATCH and DELETE.

The GET/api/articles endpoint comes with a number of available queries, offering greater refinement to the available requests.

The server is built using **Express.js** and interfaces with the **PostgreSQL** databases using **node-postgres**.

The API was built using **TDD** principles and is provided with a full test suite.

Enjoy!

## Hosted API

The web service is hosted on **Render.com** at the following URL.

Link:
https://nc-news-api-service.onrender.com/

## Required

PostgreSQL Version 2.5.12
Node Version 16.17.0

## Setup

### 1. Clone Repository

Please enter command:

git clone https://github.com/jaketysome/portfolio-project-news-api.git

### 2. Install Dependancies

Please run the following command to install dependancies:

* npm install

### 3. Local Database Connections

In order to successfully connect the local databases, please create the following .env files in the parent directory:

* .env.development
* .env.test

Into each, please add PGDATABASE=database_name_here for both the development and test databases (database names can be found in setup.sql):

***Please ensure both of these files are added to to the .gitignore file.***

### 4. Seed Local Database

Seeding of test database is handled by the test file.

To seed the development version, a script is provided:

* npm run seed

### 5. Testing

To run tests, please use the following script:

* npm test app
