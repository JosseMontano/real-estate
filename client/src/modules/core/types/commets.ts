export type CommentT = {
    en?: string;
    es: string;
    pt?: string;
}

export type Commentator = {
    available: boolean;
    cellphoneNumber: string;
    codeRecuperation: string;
    email: string;
    id: string;
    qualification: string;
    role: number;
    userName: string;
}

interface Description {
    en: string;
    es: string;
    pt: string;
}

interface Title {
    en: string;
    es: string;
    pt: string;
}

interface TypeRE {
    id: string;
    value: string;
}

interface RealEstate {
    address: string;
    amountBathroom: number;
    amountBedroom: number;
    available: boolean;
    description: Description;
    id: string;
    images: string[];
    latLong: string;
    price: number;
    squareMeter: number;
    title: Title;
    typeRE: TypeRE;
    typeREId: string;
    user: User
    userId: string
}

interface User {
    available: boolean;
    cellphoneNumber: string;
    email: string;
    id: string;
    role: number;
    userName: string;
    userId: string;
}

