import externalApiRequest from "./external-request";

const { SIMULATOR_SERVICE_URL: simulatorURL } = process.env;

export default async function getRealtimeEvent(token: any) {
    console.log('Getting realtime event data from /results API');
    
    const getURL = `${simulatorURL}/results`
    const headers = { 'Authorization': `Bearer ${token}` };
    const result = await externalApiRequest(getURL, 'GET', null, headers);

    console.log('result', result)
    return result;
}