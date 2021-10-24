
This node application uses node worker thread to consume long polling service and persist the records in MongoDB via mongoose module.

**Prerequesites**:

- NodeJS: v14.18.1
- MongoDB: 4.2.10
- Docker for MongoDB **(Optional)**

**Installation steps**

 1. Clone the project by `git clone https://github.com/PankajJava12/node-project.git`
 2. Navigate to project directory: node-project
 3. Use command: `npm install`

Alternatively for MongoDB, To run with docker container use below:
- `docker-compose up -d`
 
**Run**
- Run the app by `npm start`

**Tests**
- To run the unit test `npm run test`