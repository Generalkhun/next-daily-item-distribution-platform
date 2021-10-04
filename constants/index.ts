
import { GoogleAuthOptions } from 'google-auth-library'
import path from 'path'
/**
 * Config API
 */
// google sheets
export const GOOGLE_SHEET_AUTH_CONFIG: GoogleAuthOptions = {
    //scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    
    keyFile: './secrets/googleSheetKeyFile.json'
}

const TOTAL_HOUSE_NUM = 1000 // changable
const TOTAL_ITEM_CAT = 99
export const SHEET_RANGE_MAIN_PAGE = `MainPage!A1:I${TOTAL_HOUSE_NUM}` // contain all villager data and status
export const SHEET_RANGE_ITEM_CAT = `ItemCat!A1:C${TOTAL_ITEM_CAT}` // contain all item categories
export const SHEET_RANGE_ADD_PEOPLE = 'MainPage!A1:I' // used to append an added villager data into sheet

export const MENUS_DATA_MGT = [
    { menuName: 'addVillager', menuTitle: 'เพิ่มบ้าน' },
    { menuName: 'addItemCat', menuTitle: 'เพิ่มประเภทสิ่งของ' }
]
export const USER_ENTERED = 'USER_ENTERED' // use inside ggsheet append param config

//google drive
export const SECRET_DIR = path.resolve('./secret')
export const SCOPES = ['https://www.googleapis.com/auth/drive.file'] // If modifying these scopes, delete token.json.
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
export const TOKEN_PATH = `${SECRET_DIR}/token.json`
export const TARGET_FOLDER_ID = '1UOv4BLAMemABnbAvcZH5Gwj4pCy7afSl'

/**
 * base url
 */
export const BASEURL = 'http://localhost:3000'

/**
 * API url Client with Server
 */
export const UPLOAD_EXAM_FILE_URL = `${BASEURL}/api/uploadExamFileApi`
export const UPLOAD_FILE = `${BASEURL}/api/ggdrive/uploadFile`

/**
 * Config UI 
 */
export const CENTER_OF_DISTRIBUTION_LAT = 13.68474450590383
export const CENTER_OF_DISTRIBUTION_LNG = 100.47730858426843