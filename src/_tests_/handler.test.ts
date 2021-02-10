import sinon from 'sinon';
import {checkEmail} from "../handler";
import * as whiteListService from '../service/whiteListService';
import {IWhiteListDetails} from "../types";


const createApiGatewayProxyEvent = email => {
    return {
        body: undefined,
        headers: undefined,
        httpMethod: null,
        isBase64Encoded: false,
        multiValueHeaders: undefined,
        multiValueQueryStringParameters: undefined,
        pathParameters: undefined,
        queryStringParameters: {
            email: email
        },
        requestContext: undefined,
        resource: "",
        stageVariables: undefined,
        path: ''
    }
}

const getWhiteListDetails = sinon.stub(whiteListService, 'getWhiteListDetails');

describe('handler test', () => {


    afterEach(() => {
        getWhiteListDetails.reset()
    })

    test('should throw error if email not found', async () => {

        await getWhiteListDetails.returns(Promise.resolve(undefined));

        const email = 'unknown@email.com'

        const response = await checkEmail(createApiGatewayProxyEvent(email));
        const body = JSON.parse(response.body) as Error

        expect(response.statusCode).toBe(404)
        expect(body.message).toEqual(`User not found for email: ${email}`)
    })

    test('should throw error if email is empty', async () => {

        const response = await checkEmail(createApiGatewayProxyEvent(''));
        const body = JSON.parse(response.body) as Error

        expect(response.statusCode).toBe(400)
        expect(body.message).toEqual(`email parameter can not be empty`)
    })

    test('should return email details from white list', async () => {

        const expectedResponse = {
            email: "one@gmail.com",
            ucaId: "111",
            cdpId: "222"
        }
        await getWhiteListDetails.returns(Promise.resolve(expectedResponse));

        const response = await checkEmail(createApiGatewayProxyEvent(expectedResponse.email));
        const body = JSON.parse(response.body) as IWhiteListDetails
        expect(body.email).toEqual(expectedResponse.email)
        expect(body.ucaId).toEqual(expectedResponse.ucaId)
        expect(body.cdpId).toEqual(expectedResponse.cdpId)
    })
})