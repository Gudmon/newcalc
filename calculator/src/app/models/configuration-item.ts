export interface ConfigurationItem {
    id: string,
    name: string,
    code: string,
    price: number,
    namePrice: string,
    imgUrl?: string,
    imgUrls?: string[],
    oilTankCooler?: ConfigurationItem,
    disabledOption?: boolean
}