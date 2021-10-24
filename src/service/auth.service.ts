import externalApiRequest from "./external-request";

const { SIMULATOR_SERVICE_URL: simulatorURL } = process.env;

export default async function authenticateAndGetToken(body: any) {
    console.log('Getting token from /auth API');
    
    const authURL = `${simulatorURL}/auth`;

    const result:any = await externalApiRequest(authURL, 'POST', body, null);    
    
    return result.token;
}