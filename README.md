# RESTful API with Node.js, Express, and Postgres

Create, read, update, delete in a Node.js app with an Express server and Postgres database.


## Database

```bash
brew install postgresql
brew services start postgresql
psql postgres
```

```sql
CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
CREATE DATABASE api;
GRANT ALL PRIVILEGES ON DATABASE api TO me;
```

```bash
psql -d api -U me
```

```sql
CREATE TABLE players (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  position VARCHAR(30),
  clubname VARCHAR(30), 
  avatar VARCHAR(200), 
);



## Installation

```bash
git clone git@github.com:taniarascia/node-api-postgres
cd node-api-postgres
npm install
node index.js
```

