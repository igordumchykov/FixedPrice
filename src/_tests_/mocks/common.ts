import {APIGatewayProxyEvent} from "aws-lambda";

const getDefaults = (): APIGatewayProxyEvent => ({
    body: undefined,
    headers: undefined,
    httpMethod: null,
    isBase64Encoded: false,
    multiValueHeaders: undefined,
    multiValueQueryStringParameters: undefined,
    pathParameters: undefined,
    queryStringParameters: {},
    requestContext: undefined,
    resource: "",
    stageVariables: undefined,
    path: ''
});

export const getGatewayProxyEventMock = (p?: Partial<APIGatewayProxyEvent>): APIGatewayProxyEvent => ({
    ...getDefaults(),
    ...p
});