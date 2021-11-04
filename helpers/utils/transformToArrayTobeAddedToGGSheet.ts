import { values } from "lodash"

export const transformToArrayTobeAddedToGGSheet = (tobeAddedVillagerData: Object, expectedLength: number) => {
    
    console.log('transformToArrayTobeAddedToGGSheet tobeAddedVillagerData',tobeAddedVillagerData);
    console.log('transformToArrayTobeAddedToGGSheet expectedLength',expectedLength);
    if (Object.keys(tobeAddedVillagerData).length !== expectedLength) {
        throw new Error(`number of field must be ${expectedLength}`)
    }
    return values(tobeAddedVillagerData)
}