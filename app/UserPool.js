import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
    UserPoolId: "us-east-1_5qoXG6k8m",
    ClientId: "3rho29us0pkjp3h0c2de96va9u"
}

export default new CognitoUserPool(poolData);