import { values } from "lodash"

export const transformToArrayTobeAddedVillagerData = (tobeAddedVillagerData: Object) => {
    if (Object.keys(tobeAddedVillagerData).length !== 9) {
        throw new Error('number of field must be 9')
    }
    return values(tobeAddedVillagerData)
}