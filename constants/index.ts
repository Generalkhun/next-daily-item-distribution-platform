
import { GoogleAuthOptions } from 'google-auth-library'
export const GOOGLE_SHEET_AUTH_CONFIG: GoogleAuthOptions = {
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    keyFile: './secrets.json'
}

const TOTAL_HOUSE_NUM = 1000 // changable
const TOTAL_ITEM_CAT = 99
export const SHEET_RANGE_MAIN_PAGE = `MainPage!A1:I${TOTAL_HOUSE_NUM}` // contain all villager data and status
export const SHEET_RANGE_ITEM_CAT = `ItemCat!A1:C${TOTAL_ITEM_CAT}` // contain all item categories


export const MENUS_DATA_MGT = [
    { menuName: 'addVillager', menuTitle: 'เพิ่มบ้าน' },
    { menuName: 'addItemCat', menuTitle: 'เพิ่มประเภทสิ่งของ' }
]