export type ProductsResultType = {
    page: number;
    items: ProductType[];
    total_count: number;
}

export type ProductType = {
    id: number;
    name: string;
    supplier: string;
    properties: ProductPropertiesType[];
    importRecord: ImportRecordType;
}

type ProductPropertiesType = {
    name: string;
    value: string;
}

type ImportRecordType = {
    stockSellPrice: {
        USD: number;
        UZS: number;
    } | null;
}