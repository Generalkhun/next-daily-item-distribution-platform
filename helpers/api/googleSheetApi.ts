import { google } from "googleapis"
import { filter, get } from "lodash";
import { GOOGLE_SHEET_AUTH_CONFIG, SHEET_RANGE_ITEM_CAT, SHEET_RANGE_MAIN_PAGE, SHEET_RANGE_ADD_PEOPLE, USER_ENTERED, RAW } from "../../constants";
import { ItemCatAddingFormState, VillagerAddingFormState } from "../../type";
import { formatGoogleSheetDataResponse } from "../utils/formatGoogleSheetDataResponse";
import { transformToArrayTobeAddedToGGSheet } from "../utils/transformToArrayTobeAddedToGGSheet";


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
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: SHEET_RANGE_MAIN_PAGE
    })

    return formatGoogleSheetDataResponse(get(response, 'data.values'))
}

export const getItemCatDataFromGoogleSheet = async () => {
    const sheets = await connectGoogleSheetsApi()

    //query and return response
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: SHEET_RANGE_ITEM_CAT
    })

    return formatGoogleSheetDataResponse(get(response, 'data.values'))
}


/**
 * Add a record to google sheet 
 */
// Add a villager data
export const addVillagerDataToGoogleSheet = async (tobeAddedVillagerData: VillagerAddingFormState) => {
    console.log('tobeAddedVillagerData', tobeAddedVillagerData);

    // transform the tobeAddedVillagerData to arrays format 
    const tobeAddedVillagerDataArray = transformToArrayTobeAddedToGGSheet(tobeAddedVillagerData, 9)

    // connect to the sheet 
    const sheets = await connectGoogleSheetsApi()

    // request 
    const request = {
        spreadsheetId: process.env.SHEET_ID,
        range: SHEET_RANGE_ADD_PEOPLE,
        valueInputOption: USER_ENTERED,
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
            "majorDimension": "ROWS",
            "values": [tobeAddedVillagerDataArray],
        }
    }
    // append data on a google sheet row
    const response = await sheets.spreadsheets.values.append(request)
    return response
}

// Add an item cat data
export const addItemCatDataToGoogleSheet = async (tobeAddedItemCatData: ItemCatAddingFormState) => {
    console.log('tobeAddedItemCatData', tobeAddedItemCatData);

    // transform the tobeAddedVillagerData to arrays format 
    const tobeAddedItemCatDataArray = transformToArrayTobeAddedToGGSheet(tobeAddedItemCatData, 4)

    // connect to the sheet 
    const sheets = await connectGoogleSheetsApi()

    // request 
    const request = {
        spreadsheetId: process.env.SHEET_ID,
        range: SHEET_RANGE_ITEM_CAT,
        valueInputOption: USER_ENTERED,
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
            "majorDimension": "ROWS",
            "values": [tobeAddedItemCatDataArray],
        }
    }
    // append data on a google sheet row
    const response = await sheets.spreadsheets.values.append(request)
    return response
}

/**
 * Update villager data status on recieving item
 */

interface updateAddRecievedStatusParams {
    itemCatId: string,
    personId: string,
    personRecievedItemListText: string,
}
export const updateRecieveItemStatusOnGoogleSheet = async ({ itemCatId, personId, personRecievedItemListText }: updateAddRecievedStatusParams) => {

    //connect google sheet
    const sheets = await connectGoogleSheetsApi()

    // new recieved item list
    const newRecievedItemList = '"' + personRecievedItemListText + ',' + itemCatId + '"'

    // request 
    const request = {
        spreadsheetId: process.env.SHEET_ID,
        range: `H${parseInt(personId) + 1}`,
        valueInputOption: RAW,
        includeValuesInResponse:true,
        requestBody: {
            "range" : `H${parseInt(personId) + 1}`,
            "majorDimension": "ROWS",
            "values": [[newRecievedItemList]],
        }
    }

    console.log('requestAPI',request);
    

    const response = await sheets.spreadsheets.values.update(request as any)
    console.log('responseAPI',response);
    return newRecievedItemList
}


// const res = await sheets.spreadsheets.values.update({
//     // Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).
//     includeValuesInResponse: 'placeholder-value',
//     // The A1 notation of the values to update.
//     range: 'placeholder-value',
//     // Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
//     responseDateTimeRenderOption: 'placeholder-value',
//     // Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.
//     responseValueRenderOption: 'placeholder-value',
//     // The ID of the spreadsheet to update.
//     spreadsheetId: 'placeholder-value',
//     // How the input data should be interpreted.
//     valueInputOption: 'placeholder-value',

//     // Request body metadata
//     requestBody: {
//       // request body parameters
//       // {
//       //   "majorDimension": "my_majorDimension",
//       //   "range": "my_range",
//       //   "values": []
//       // }
//     },
//   });