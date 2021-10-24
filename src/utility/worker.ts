import { parentPort } from 'worker_threads';
import { connectToDatabase } from '../db/db.init';
import raceModel from '../model/race.model';
import authenticateAndGetToken from '../service/auth.service';
import getRealtimeEvent from '../service/realtime.event.service';

const { SIMULATOR_AUTH_EMAIL, SIMULATOR_AUTH_PASSWORD } = process.env;
let token: any;

/**
 * @function init
 * @description This function will do polling on realtime simulator and get the event data 
 * The stores the event data into MongoDB
 */
async function init() {
    try {
        if (!token) {
            token = await authenticateAndGetToken({
                email: SIMULATOR_AUTH_EMAIL,
                password: SIMULATOR_AUTH_PASSWORD
            });
        }

        const result:any = await getRealtimeEvent(token);

        if (result) {
            const race = new raceModel(result);
            await race.save();
            parentPort?.postMessage('Saved one race document in mongo db')
        } else {
            console.log('----Got null response from /results API----');
            console.log('----System will request the event data again after 15 seconds----');
            await new Promise(resolve => setTimeout(resolve, 15000));
        }

        await init();
    } catch (error) {
        console.log(' Error caught', error.body || error);

        if (error.statusCode === 401) {
            console.log('Access denied or token expired');
            console.log('Retring auth');
            token = null; // nulify token so that auth request will be make
            await init();
        }
        if (error.statusCode === 204) {
            // In case of status code 204, wait for 15 seconds and then request again to /results API
            await new Promise(resolve => setTimeout(resolve, 15000));
            await init();
        }
    }
}

connectToDatabase().then(() => {
    init().then();
}).catch((e) => {
    console.log('Error while connecting to MongoDB')
    console.log('Error:', e);
});