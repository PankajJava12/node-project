
import { Worker, WorkerOptions } from 'worker_threads';

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

export async function startWorkerThread() {
    let wk = workerTs({ workerData: { filePath: './src/utility/worker.ts' } });
    wk.on("online", () => console.log('Worker UP'));
    wk.on("message", (msg) => console.log('Message from worker:', msg));
    wk.on("exit", (code) => console.warn('exit', code));
    wk.on("error", (err) => console.error('error', err));
}