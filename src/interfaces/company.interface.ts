export interface Company {
    id: string;
    name: string;
    numberOfUsers: number;
    numberOfProducts: number;
    logo: string;
    percentage: number;
}

export interface IRegisterCompany {
    name: string;
    numberOfUsers: number;
    numberOfProducts: number;
    percentage: number;
}