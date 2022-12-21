import { DRIVE_API_SCOPES } from "../../constants";
import { GoogleAuthOptions } from 'google-auth-library'

export const getGoogleDriveAuthConfig = () => {
    const ggDriveCredential = JSON.parse(
        Buffer.from(process.env.GG_DRIVE_KEY_BASE64 || '', "base64").toString()
    );
    const GOOGLE_DRIVE_AUTH_CONFIG: GoogleAuthOptions = {
        scopes: DRIVE_API_SCOPES,
        credentials: {
            client_email: ggDriveCredential.client_email,
            private_key: ggDriveCredential.private_key,
        }
        /**@note this is for the local test, use credentials instead on the production with key from the env file */
        //keyFile: './secrets/googleDriveKeyFile.json'
    }
    return GOOGLE_DRIVE_AUTH_CONFIG;
}

export const getGoogleSheetAuthConfig = () => {
    const ggSheetCredential = JSON.parse(
        Buffer.from(process.env.GG_SHEET_KEY_BASE64 || '', "base64").toString()
    );
    // google sheets
    const GOOGLE_SHEET_AUTH_CONFIG: GoogleAuthOptions = {
        //scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        credentials: {
            client_email: ggSheetCredential.client_email,
            private_key: ggSheetCredential.private_key,
        }
        /**@note this is for the local test, use credentials instead on the production with key from the env file */
        //keyFile: './secrets/googleSheetKeyFile.json'
    }
    return GOOGLE_SHEET_AUTH_CONFIG;
}