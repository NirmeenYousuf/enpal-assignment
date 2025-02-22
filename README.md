## Solution description

I have used Hapi JS for API.

API is based on the components Model. Each Entity will have its separate folder inside the components folder where all the relevant controllers for that entity, Model file, Schema validation file and other code related files if needed for that component can be placed.

This makes it easier to have all the relevant code for an entity in one place.

A separate folder for tests is created which also contains sub folder for entity and separate test files for each controller.

server.ts file in test folder serves the purpose of initializing a separate server for test. HAPI can run tests just by initializing the server.

API payload validation is being done via JOI schemas.

## NOTE:

I wanted to highlight one small note regarding the "How to submit the solution" section in the assignment. It mentions that we need to provide a Docker setup to start the database. I am include the existing Docker file and database file that are already shared with the project in a separate folder, and I expect it to run smoothly. However, I am not able to create a separate Docker file for the database or the project because my personal MacBook is quite old and no longer supports the latest versions of Docker.
That said, initializing the database was not an issue for me—I used the provided DB schema and data to create a local copy. I just wanted to flag this limitation and hope it won’t be a major issue.

This was also communicated earlier via email.

## Instruction on how to run the application

Once the DB is up using the Docker file and instructions that were shared in the assignment, please enter into api folder in the terminal

1. Update the Database credentials if needed in src/db.ts file.
2. Install dependencies by running `npm install` in api directory.
3. Run `npm run dev` command to start the API on port 3000.

Prerequisite: Database is running on Port 5432.

To execute tests, `npm run test` needs to be executed.

Once the API is running, the tests that were shared with the assignment can also be executed.
