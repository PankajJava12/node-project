import { Worker, WorkerOptions } from 'worker_threads';

/**
 * @function workerTs
 * @description This function returns worker thread by using filePath from wkOpts param
 * @param wkOpts Worker options with workerData
 * @returns worker thread 
 */
const workerTs = (wkOpts: WorkerOptions) => {
    wkOpts.eval = true;

    return new Worker(`
            const wk = require('worker_threads');
            let filePath = wk.workerData.filePath;

            delete wk.workerData.filePath;
            require(filePath);
        `,
        wkOpts
    );
}

/**
 * @function startWorkerThread
 * @description This function starts worker thread and consume realtime event API
 * and stores data into MongoDB
 */
export async function startWorkerThread() {
    // Start a worker thread as worker.ts 
    const wk = workerTs({ workerData: { filePath: './src/utility/worker.ts' } });
    wk.on("online", () => console.log('Worker UP'));
    wk.on("message", (msg) => console.log('Message from worker:', msg));
    wk.on("exit", (code) => console.warn('exit', code));
    wk.on("error", (err) => console.error('error', err));
}