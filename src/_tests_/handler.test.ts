import sinon from 'sinon';
import {checkEmail} from "../handler";
import * as whiteListService from '../service/whiteListService';
import {IWhiteListDetails} from "../types";
import {getGatewayProxyEventMock} from "./mocks/common";

const getWhiteListDetails = sinon.stub(whiteListService, 'getWhiteListDetails');

describe('handler test', () => {


    afterEach(() => {
        getWhiteListDetails.reset()
    })

    it('should throw error if email not found', async () => {

        await getWhiteListDetails.resolves(undefined);

        const email = 'unknown@email.com'

        const response = await checkEmail(getGatewayProxyEventMock({queryStringParameters: {email: email}}));
        const body = JSON.parse(response.body) as Error

        expect(response.statusCode).toBe(404)
        expect(body.message).toEqual(`User not found for email: ${email}`)
    })

    it('should throw error if email is empty', async () => {

        const response = await checkEmail(getGatewayProxyEventMock({queryStringParameters: {email: ''}}));
        const body = JSON.parse(response.body) as Error

        expect(response.statusCode).toBe(400)
        expect(body.message).toEqual(`email parameter can not be empty`)
    })

    it('should return email details from white list', async () => {

        const expectedResponse = {
            email: "one@gmail.com",
            ucaId: "111",
            cdpId: "222"
        }
        await getWhiteListDetails.resolves(expectedResponse);

        const response = await checkEmail(getGatewayProxyEventMock({queryStringParameters: {email: expectedResponse.email}}));
        const body = JSON.parse(response.body) as IWhiteListDetails
        expect(body.email).toEqual(expectedResponse.email)
        expect(body.ucaId).toEqual(expectedResponse.ucaId)
        expect(body.cdpId).toEqual(expectedResponse.cdpId)
    })
})