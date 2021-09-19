import { google } from "googleapis"
import { GOOGLE_SHEET_AUTH_CONFIG, SHEET_RANGE_MAIN_PAGE } from "../../constants";


// This funtion is to connect googlesheet api
const connectGoogleSheetsApi = async () => {
    const auth = await google.auth.getClient(GOOGLE_SHEET_AUTH_CONFIG)
    // connect to googlesheet 
    const sheets = google.sheets({ version: 'v4', auth })
    return sheets
}


/**
 * this funtion is to fetch all data from the googlesheet, SHEET_RANGE_MAIN_PAGE is use as a constant to provide the api which range in the sheet we need
 *  */
export const getAllVillagerDataFromGoogleSheet = async () => {

    const sheets = await connectGoogleSheetsApi()

    //query and return response
    const  response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: SHEET_RANGE_MAIN_PAGE
    })
    console.log('responseaa',response);
    
    return response
}