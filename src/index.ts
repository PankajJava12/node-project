import * as dotenv from "dotenv";
dotenv.config();

import { startWorkerThread } from "./utility/worker-helper";

startWorkerThread().catch(err => console.log(err));