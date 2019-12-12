import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {

    // Wo wollen wir uns anmelden?
    issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
 
    // Wer bin ich?
    redirectUri: window.location.origin + '/index.html',
    clientId: 'spa-demo',

    // Was wollt Ihr?
    scope: 'openid profile email voucher',
    //                 OIDC     | User-defined
}