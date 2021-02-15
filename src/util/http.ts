import {APIGatewayProxyResult} from "aws-lambda";

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function ok(payload?: any): APIGatewayProxyResult {
    const body = payload ? payload : {message: 'submitted'}
    return response(200, body)
}

export function error(statusCode: number, message: string): APIGatewayProxyResult {
    return response(statusCode, {message})
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function response(statusCode: number, payload: any, responseHeaders?: { [key: string]: string | number | boolean }): APIGatewayProxyResult {
    const headers: { [key: string]: string | number | boolean } = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Access-Control-Allow-Origin,Authorization,Content-Type,Text,X-Amz-Date,X-Amz-Security-Token,X-Amz-User-Agent,X-Api-Key,X-Auth-Id,X-Auth-Role,X-Customer-Id',
        'Access-Control-Allow-Credentials': true
    }
    if (responseHeaders) {
        for (const name in responseHeaders) {
            headers[name] = responseHeaders[name]
        }
    }
    return {
        statusCode,
        headers,
        body: typeof payload === 'string' ? payload : JSON.stringify(payload)
    }
}
