import {WhiteListDetails} from "./service/whiteListService";
import {IWhiteListDetails} from "./types";

export const toWhiteListDetailsDto = (whiteListDetails: WhiteListDetails): IWhiteListDetails => ({
    email: whiteListDetails?.email,
    ucaId: whiteListDetails?.uca_id,
    cdpId: whiteListDetails?.cdp_id
}) as IWhiteListDetails;