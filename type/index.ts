export type VillagerHomeData = {
  homeId: string;
  homeRepresentativesName: string;
  homeRepresentativesContactNum: string;
  homeLocation: [number, number];
  homeRepresentativesImg: string;
  isItemRecieved: boolean;
  numberOfFamilyMember: number;
  addressAdditionalDescription: string;
};


export type VillagerAddingFormState = {
  homeRepresentativesName: string
  homeRepresentativesContactNum?: string
  numberOfFamilyMember: number
  homeLocation: [string,string]
  homeRepresentativesImg?: any
  addressAdditionalDescription?: string
}

export type VillagerToAddObject = {
  homeId: string;
  homeRepresentativesName: string;
  homeRepresentativesContactNum?: string;
  homeLocation: [number, number];
  homeRepresentativesImg?: string;
  numberOfFamilyMember: number;
  addressAdditionalDescription?: string;
}

export interface NextViewport {
  width: string
  height: string
  // The latitude and longitude of the center of London
  latitude: number
  longitude: number
  zoom: number
}