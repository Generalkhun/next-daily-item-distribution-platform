
import { GoogleAuthOptions } from 'google-auth-library'
import path from 'path'
/**
 * Config API
 */
/**@note credential is for the production, if tested locally, use keyFile: ...path to keyfile instead */
const ggSheetCredential = JSON.parse(
    Buffer.from(process.env.GG_SHEET_KEY_BASE64 || '', "base64").toString()
);
// google sheets
export const GOOGLE_SHEET_AUTH_CONFIG: GoogleAuthOptions = {
    //scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    credentials: {
        client_email: ggSheetCredential.client_email,
        private_key: ggSheetCredential.private_key,
    }
    /**@note this is for the local test, use credentials instead on the production with key from the env file */
    //keyFile: './secrets/googleSheetKeyFile.json'
}

const TOTAL_HOUSE_NUM = 1000 // changable
const TOTAL_ITEM_CAT = 99
export const SHEET_RANGE_MAIN_PAGE = `MainPage!A1:J${TOTAL_HOUSE_NUM}` // contain all villager data and status
export const SHEET_RANGE_ITEM_CAT = `ItemCat!A1:D${TOTAL_ITEM_CAT}` // contain all item categories
export const SHEET_RANGE_ADD_PEOPLE = 'MainPage!A1:J' // used to append an added villager data into sheet

export const MENUS_DATA_MGT = [
    { menuName: 'addVillager', menuTitle: 'เพิ่มข้อมูลบ้าน' },
    { menuName: 'addItemCat', menuTitle: 'เพิ่มประเภทสิ่งของ' }
]
/**
 * ggsheet append param config 
 * */
export const USER_ENTERED = 'USER_ENTERED'
export const RAW = 'RAW'

/**
 * google drive api
 */
export const DRIVE_API_SECRET_DIR = path.resolve('./secrets')
export const DRIVE_API_SCOPES = ['https://www.googleapis.com/auth/drive.file'] // If modifying these scopes, delete token.json.
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

/**@note credential is for the production, if tested locally, use keyFile: ...path to keyfile instead */
const ggDriveCredential = JSON.parse(
    Buffer.from(process.env.GG_DRIVE_KEY_BASE64 || '', "base64").toString()
);
export const GOOGLE_DRIVE_AUTH_CONFIG: GoogleAuthOptions = {
    scopes: DRIVE_API_SCOPES,
    credentials: {
        client_email: ggDriveCredential.client_email,
        private_key: ggDriveCredential.private_key,
    }
    /**@note this is for the local test, use credentials instead on the production with key from the env file */
    //keyFile: './secrets/googleDriveKeyFile.json'
}
export const DRIVE_API_TOKEN_PATH = `${DRIVE_API_SECRET_DIR}/token.json`
export const DRIVE_API_TARGET_FOLDER_ID = '1UOv4BLAMemABnbAvcZH5Gwj4pCy7afSl'

/**
 * base url
 */
//export const BASEURL = 'http://localhost:3000'

/**
 * API url Client with Server
 */
// export const UPLOAD_FILE = `${BASEURL}/api/ggdrive/uploadFile`
export const GET_VILLAGER_GGSHEET_DATA = 'api/getVillagerFromGGSheet'
export const GET_ITEMCAT_GGSHEET_DATA = 'api/getItemCatDataFromGGSheet'
export const UPLOAD_IMG_SERVICE_URL = 'api/saveImgToGGDrive'
export const ADD_VILLAGER_SERVICE_URL = 'api/addVillagerToGGSheet'
export const ADD_ITEM_CAT_SERVICE_URL = 'api/addItemCatToGGSheet'
export const UPDATE_ADD_RECIEVED_ITEM_CAT_SERVICE_URL = 'api/updateAddRecievedItemCatOnGGSheet'
export const VALIDATE_SESSION_URL = 'api/validateSession'
/**
 * Config UI 
 */
export const CENTER_OF_DISTRIBUTION_LAT = 13.68474450590383
export const CENTER_OF_DISTRIBUTION_LNG = 100.47730858426843

/**
 * Cookie constants
 */
export const SESSION_ID_COOKIE = 'SESSION_ID_COOKIE'
export const SESSION_COOKIE_VALUE = 'sessionIdTmp'