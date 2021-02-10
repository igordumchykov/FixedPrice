import sinon from 'sinon';

import {getWhiteListDetails} from "../service/whiteListService";
import {DataMapper as mapper} from "@aws/dynamodb-data-mapper";

describe('test whiteListService', () => {
    afterEach(() => {
        sinon.restore()
    })

    test('should fetch white list details by email', async () => {

        const expected = {
            email: "one@gmail.com",
            uca_id: "111",
            cdp_id: "222"
        }

        sinon.stub(mapper.prototype, 'get').resolves(expected)

        const actual = await getWhiteListDetails('one@gmail.com')

        expect(actual.email).toEqual(expected.email)
        expect(actual.ucaId).toEqual(expected.uca_id)
        expect(actual.cdpId).toEqual(expected.cdp_id)
    })
    test('should return undefined if email is not in white list', async () => {

        sinon.stub(mapper.prototype, 'get').rejects({name: 'ItemNotFoundException'})

        const actual = await getWhiteListDetails('one@gmail.com')

        expect(actual).toBeUndefined()
    })

    test('should throw error', async () => {

        sinon.stub(mapper.prototype, 'get').rejects(new Error('Internal error'))

        await expect(getWhiteListDetails('one@gmail.com')).rejects.toThrow('Internal error')
    })
})