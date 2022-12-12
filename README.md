# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

## Setup

In order to successfully connect the databases locally, please create the following environment variable files in the parent directory:

.env.development
.env.test

Into each, please add the following for both the development and test databases (database names can be found in setup.sql):

PGDATABASE=<database-name-here>

Please ensure both of these files are added to to the .gitignore file