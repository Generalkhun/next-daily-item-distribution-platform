import { DRIVE_API_SCOPES, GOOGLE_DRIVE_KEYFILE_PATH, GOOGLE_SHEET_KEYFILE_PATH } from "../../constants";
import { GoogleAuthOptions } from 'google-auth-library'
import { promises as fsp } from "fs"

export const getGoogleDriveAuthConfig = async () => {
    console.log("🚀 ~ file: getAuthConfig.ts:7 ~ getGoogleDriveAuthConfig ~ process.env.GG_DRIVE_KEY_BASE64", process.env.GG_DRIVE_KEY_BASE64)
    const ggDriveCredential = JSON.parse(
        Buffer.from(process.env.GG_DRIVE_KEY_BASE64 || '', "base64").toString()
    );
    //generate a json file to store a keyfile
    await singleObjJsonFileGenerator(ggDriveCredential, GOOGLE_DRIVE_KEYFILE_PATH);
    const GOOGLE_DRIVE_AUTH_CONFIG: GoogleAuthOptions = {
        scopes: DRIVE_API_SCOPES,
        /**
         * @note keyfile from secrets folder local test.
         * Use keyfile from generated one instead on the production with keys from the env vars
        */
        //keyFile: './secrets/googleDriveKeyFile.json'
        keyFile: GOOGLE_DRIVE_KEYFILE_PATH,
    }
    return GOOGLE_DRIVE_AUTH_CONFIG;
}

export const getGoogleSheetAuthConfig = async () => {
    console.log("🚀 ~ file: getAuthConfig.ts:25 ~ getGoogleSheetAuthConfig ~ process.env.GG_SHEET_KEY_BASE64", process.env.GG_SHEET_KEY_BASE64)
    const ggSheetCredential = JSON.parse(
        Buffer.from(process.env.GG_SHEET_KEY_BASE64 || '', "base64").toString()
    );
    //generate a json file to store a keyfile
    await singleObjJsonFileGenerator(ggSheetCredential, GOOGLE_SHEET_KEYFILE_PATH);
    // google sheets
    const GOOGLE_SHEET_AUTH_CONFIG: GoogleAuthOptions = {
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        //scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        /**
         * @note keyfile from secrets folder local test.
         * Use keyfile from generated one instead on the production with keys from the env vars
        */
        //keyFile: './secrets/googleSheetKeyFile.json'
        keyFile: GOOGLE_SHEET_KEYFILE_PATH,
    }
    return GOOGLE_SHEET_AUTH_CONFIG;
}

const singleObjJsonFileGenerator = async (obj: Object, path: string) => {
    const json = JSON.stringify(obj);
    try {
        await fsp.writeFile(path, json);
    } catch (error) {
        throw new Error(error as string)
    }
}