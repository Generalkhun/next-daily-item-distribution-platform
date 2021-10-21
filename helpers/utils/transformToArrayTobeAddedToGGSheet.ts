import { values } from "lodash"

export const transformToArrayTobeAddedToGGSheet = (tobeAddedVillagerData: Object, expectedLength: number) => {
    if (Object.keys(tobeAddedVillagerData).length !== expectedLength) {
        throw new Error(`number of field must be ${expectedLength}`)
    }
    return values(tobeAddedVillagerData)
}