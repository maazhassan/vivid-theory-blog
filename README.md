This repository contains my code for the Vivid Theory Coding Challenge.

## Database

Within `/db`, you will find 2 `.sql` files:
- `create_db.sql` contains the commands to create a new database and create the Blogs table
- `seed_db.sql` contains the commands to populate the new table with fake testing data

To use these scripts, run the following commands from inside the `/db` directory:

```bash
psql -U postgres # connect to postgres
\i 'create_db.sql' # create database
\i 'seed_db.sql' # seed database with test data
```

The commands within the files can also be run manually.

## Backend

Before running the backend, you will need to create a `.env` file in the root of the `/backend` directory. This file must contain the following variables:

```shell
POSTGRES_USER = "postgres" # your postgres user
POSTGRES_PASSWORD = "postgres" # your postgres password
POSTGRES_DB = "vivid_blog_challenge" # don't change unless you changed the db name in the SQL scripts
```

You may also choose to set the following optional variables (the following are the default values otherwise):

```shell
POSTGRES_PORT = 5432
SERVER_PORT = 3000
```

After setting up your `.env` file, you can run the server with:

```bash
cd backend
npm i
npm start
```

The server will then be running on `localhost:<SERVER_PORT>`.

## Frontend

Before running the frontend, you will need to create a `.env.local` file in the root of the `/frontend` directory. Only one variable is required in this file:

```shell
NEXT_PUBLIC_API_DOMAIN = http://localhost:3000 # point this to your server's url
```

To run the frontend in development mode:

```bash
cd frontend
npm run dev
```

To run the frontend in production mode:

```bash
cd frontend
npm run build
npm start
```

The client will then be running on `localhost:8000`. You can change the port in the `package.json` file.