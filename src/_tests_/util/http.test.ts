import * as httpResponse from '../../util/http'


describe('Http Test', () => {

    it(`Property Test Available`, async () => {
        expect(httpResponse.ok()).toBeTruthy();
        expect(httpResponse.error(500,"Error")).toBeTruthy();
    })

})