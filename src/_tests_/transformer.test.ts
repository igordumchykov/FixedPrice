import {WhiteListDetails} from "../service/whiteListService";
import {toWhiteListDetailsDto} from "../transformer";

describe('transformer test', () => {
    it('should convert WhiteListDetails to IWhiteListDetails', () => {
        const whiteListDetails: WhiteListDetails = {
            email: "one@gmail.com",
            uca_id: "111",
            cdp_id: "222"
        }
        const dto = toWhiteListDetailsDto(whiteListDetails)
        expect(dto.email).toEqual(whiteListDetails.email)
        expect(dto.ucaId).toEqual(whiteListDetails.uca_id)
        expect(dto.cdpId).toEqual(whiteListDetails.cdp_id)
    })
})