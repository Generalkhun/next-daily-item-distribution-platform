
import { GoogleAuthOptions } from 'google-auth-library'
export const GOOGLE_SHEET_AUTH_CONFIG: GoogleAuthOptions = {
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    keyFile: './secrets.json'
}

const TOTAL_HOUSE_NUM = 1000 // changable
export const SHEET_RANGE_MAIN_PAGE = `MainPage!A1:I${TOTAL_HOUSE_NUM}`