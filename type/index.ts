export type VillagerHomeData = {
  homeId: string;
  homeRepresentativesName: string;
  homeRepresentativesContactNum: string;
  homeLocation: [string, string];
  homeRepresentativesImg: string;
  isItemRecieved: boolean;
  numberOfFamilyMember: number;
  addressAdditionalDescription: string;
};

export type VillagerAddingFormState = {
  homeRepresentativesName: string
  homeRepresentativesContactNum?: string
  numberOfFamilyMember: number
  homeLocation: [string, string]
  homeRepresentativesImg?: any
  addressAdditionalDescription?: string
}

export type ItemCatAddingFormState = {
  itemCatImg: File
  itemCatName: string
  itemRecievedType: string
  itemToShortageDays: number
}

/**
 * ToAddObject is an object that will pass through api request to add to the db
 */
export type VillagerToAddObject = {
  homeId: string;
  homeRepresentativesName: string;
  homeRepresentativesContactNum?: string;
  homeLocation: [string, string];
  homeRepresentativesImg?: string;
  numberOfFamilyMember: number;
  addressAdditionalDescription?: string;
}

export type ItemCatToAddObject = {
  itemCatId: string
  itemCatImg: File
  itemCatName: string
  itemRecievedType: string
  itemToShortageDays: number
}

export interface NextViewport {
  width: string
  height: string
  // The latitude and longitude of the center of London
  latitude: number
  longitude: number
  zoom: number
}