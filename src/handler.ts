import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getWhiteListDetails} from "./service/whiteListService";
import {error, ok} from "./util/http";

export const checkEmail = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const email: string = event.queryStringParameters?.email
    if(!email) {
        const err = 'email parameter can not be empty'
        console.error(err)
        return error(400, err)
    }
    console.log(`Get white list details for email: ${email}`)
    const details = await getWhiteListDetails(email)
    if (!details) {
        console.error('User not found! Invalid email param');
        return error(404, `User not found for email: ${email}`);
    }
    return ok(details)
};