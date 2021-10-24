import * as dotenv from "dotenv";

// config to use .env for environment variables
dotenv.config();

import { startWorkerThread } from "./utility/worker-helper";

// Start the node worker process
startWorkerThread().catch(err => console.log(err));