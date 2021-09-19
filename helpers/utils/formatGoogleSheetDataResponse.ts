import { forEach, map, reduce, slice ,replace} from 'lodash'
export const formatGoogleSheetDataResponse = (sheetDataArray: any) => {

    // extract fields 
    const fieldsname = sheetDataArray[0]

    // loop through the rest and inject their field name, returned as object

    const objectifyedRecords = map(slice(sheetDataArray, 1), (record: string[]) => {
        let namedRecord = {}
        for (let i = 0; i < fieldsname.length; i++) {
            namedRecord = {
                ...namedRecord,
                [fieldsname[i]]: replace(record[i],/\\|"/g, '')
            }
        }
        return namedRecord
    })
    return objectifyedRecords
}