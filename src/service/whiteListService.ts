import {attribute, hashKey, table} from "@aws/dynamodb-data-mapper-annotations";
import {property} from "../util/config";
import {DataMapper} from "@aws/dynamodb-data-mapper";
import {DynamoDB} from "aws-sdk";
import {toWhiteListDetailsDto} from "../transformer";
import {IWhiteListDetails} from "../types";

const WHITE_LIST_EMAILS = property('WHITE_LIST_EMAILS')
const mapper = new DataMapper({client: new DynamoDB()});

@table(WHITE_LIST_EMAILS)
export class WhiteListDetails {
    @hashKey()
    email: string;
    @attribute()
    uca_id: string;
    @attribute()
    cdp_id: string;
}

export const getWhiteListDetails = (email: string): Promise<IWhiteListDetails> => {
    return mapper.get(Object.assign(new WhiteListDetails(), {email: email}))
        .then(result => toWhiteListDetailsDto(result))
        .catch((err) => {
            if (err.name === 'ItemNotFoundException') {
                return undefined;
            }
            console.error({message: `Error getting white list details for email ${email}`});
            throw err;
        });
}