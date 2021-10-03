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
  homeLocation: number[]
  homeRepresentativesImg?: any
  addressAdditionalDescription?: string
}

export type VillagerToAddObject = {
  homeId: string;
  homeRepresentativesName: string;
  homeRepresentativesContactNum?: string;
  homeLocation: [number, number];
  homeRepresentativesImg?: string;
  isItemRecieved: boolean;
  numberOfFamilyMember: number;
  addressAdditionalDescription?: string;
}