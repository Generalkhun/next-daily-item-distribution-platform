import { google, sheets_v4 } from "googleapis"
import { get } from "lodash";
import { SHEET_RANGE_ITEM_CAT, SHEET_RANGE_MAIN_PAGE, SHEET_RANGE_ADD_PEOPLE, USER_ENTERED, RAW } from "../../constants";
import { ItemCatAddingFormState, VillagerAddingFormState } from "../../type";
import { formatGoogleSheetDataResponse } from "../utils/formatGoogleSheetDataResponse";
import { transformToArrayTobeAddedToGGSheet } from "../utils/transformToArrayTobeAddedToGGSheet";
import moment from "moment"
import { getGoogleSheetAuthConfig } from "./getAuthConfig";

// This funtion is to connect googlesheet api
const connectGoogleSheetsApi = async () => {
    let auth;
    const googleSheetAuthConfig = await getGoogleSheetAuthConfig();
    try {
        auth = await google.auth.getClient(googleSheetAuthConfig)
    } catch (error) {
        throw new Error(error as string);
    }
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
        //spreadsheetId: process.env.VILLAGER_DATA_SHEET_ID,
        spreadsheetId:process.env.SHEET_ID,
        range: SHEET_RANGE_MAIN_PAGE
    })
    return formatGoogleSheetDataResponse(get(response, 'data.values'))
}

export const getItemCatDataFromGoogleSheet = async () => {
    const sheets = await connectGoogleSheetsApi()

    //query and return response
    const response = await sheets.spreadsheets.values.get({
       // spreadsheetId: process.env.ITEM_CAT_DATA_SHEET_ID,
       spreadsheetId:process.env.SHEET_ID,
        range: SHEET_RANGE_ITEM_CAT
    })

    return formatGoogleSheetDataResponse(get(response, 'data.values'))
}


/**
 * Add a record to google sheet 
 */
// Add a villager data
export const addVillagerDataToGoogleSheet = async (tobeAddedVillagerData: VillagerAddingFormState) => {


    // transform the tobeAddedVillagerData to arrays format 
    const tobeAddedVillagerDataArray = transformToArrayTobeAddedToGGSheet(tobeAddedVillagerData, 10)

    // connect to the sheet 
    const sheets = await connectGoogleSheetsApi()

    // request 
    const request = {
        //spreadsheetId: process.env.VILLAGER_DATA_SHEET_ID,
        spreadsheetId:process.env.SHEET_ID,
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

    // transform the tobeAddedVillagerData to arrays format 
    const tobeAddedItemCatDataArray = transformToArrayTobeAddedToGGSheet(tobeAddedItemCatData, 4)

    // connect to the sheet 
    const sheets = await connectGoogleSheetsApi()

    // request 
    const request = {
        //spreadsheetId: process.env.ITEM_CAT_DATA_SHEET_ID,
        spreadsheetId:process.env.SHEET_ID,
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
    personRecievedItemExpirationDateText: string,
    dayToShorts: number,
}
const updateRecievedItemList = async (sheets: sheets_v4.Sheets, personRecievedItemListText: string, itemCatId: string, personId: string) => {
    const newRecievedItemList = personRecievedItemListText + ',' + itemCatId

    // request to update recieved item list
    const request = {
        //spreadsheetId: process.env.VILLAGER_DATA_SHEET_ID,
        spreadsheetId:process.env.SHEET_ID,
        range: `H${parseInt(personId) + 1}`,
        valueInputOption: RAW,
        includeValuesInResponse: true,
        requestBody: {
            "range": `H${parseInt(personId) + 1}`,
            "majorDimension": "ROWS",
            "values": [[newRecievedItemList]],
        }
    }
    const response = await sheets.spreadsheets.values.update(request as any)
    return response
}

const updateRecievedItemExpirationDate = async (sheets: sheets_v4.Sheets, personRecievedItemExpirationDateText: string, personId: string, dayToShorts: number) => {
    // concat today's date to the list and add with day to shorts of the item
    const todayDate = moment(new Date())
        .add(dayToShorts, 'days')
        .format('YYYY-MM-DD')
    const newExpiaryDate = personRecievedItemExpirationDateText + ',' + todayDate

    // request to update recieved item list
    const request = {
        //spreadsheetId: process.env.VILLAGER_DATA_SHEET_ID,
        spreadsheetId:process.env.SHEET_ID,
        range: `J${parseInt(personId) + 1}`,
        valueInputOption: RAW,
        includeValuesInResponse: true,
        requestBody: {
            "range": `J${parseInt(personId) + 1}`,
            "majorDimension": "ROWS",
            "values": [[newExpiaryDate]],
        }
    }
    const response = await sheets.spreadsheets.values.update(request as any)
    return response
}
export const updateRecieveItemStatusOnGoogleSheet = async ({ itemCatId, personId, personRecievedItemListText, personRecievedItemExpirationDateText, dayToShorts }: updateAddRecievedStatusParams) => {

    //connect google sheet
    const sheets = await connectGoogleSheetsApi()

    // update recieved item list
    const updateRecievedItemListRsp = await updateRecievedItemList(sheets, personRecievedItemListText, itemCatId, personId)

    // update recieved item expiration date
    const updateRecievedItemExpirationDateRsp = await updateRecievedItemExpirationDate(sheets, personRecievedItemExpirationDateText, personId, dayToShorts)
    const newRecievedItemList = (get(updateRecievedItemListRsp, 'data.updatedData.values') || [])[0][0]
    return newRecievedItemList
}