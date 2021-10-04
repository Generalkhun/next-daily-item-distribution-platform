
import { GoogleAuthOptions } from 'google-auth-library'
export const GOOGLE_SHEET_AUTH_CONFIG: GoogleAuthOptions = {
    //scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    keyFile: './secrets.json'
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


export const CENTER_OF_DISTRIBUTION_LAT = 13.68474450590383
export const CENTER_OF_DISTRIBUTION_LNG = 100.47730858426843