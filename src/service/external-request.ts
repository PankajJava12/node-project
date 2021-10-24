import request from "request";

export default async function externalApiRequest(requestedUrl: any, method: any, body: any, headers: any) {    
    const result = await new Promise((resolve, reject) => {
        const options:any = {
            method,
            url: requestedUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };

        if (headers) Object.assign(options.headers, headers);
        if (body) options.body = body;
        
        request(options, function (error: any, response: any, body: any) {
            if (error) {
                reject(error);
            } else if (response.statusCode === 401) {
                reject(response);
            } else {
                resolve(body);
            }
        });
    });
    
    return result;
};