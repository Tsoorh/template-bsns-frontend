export type hebrewEnglishObj = {
    he: string
    en: string
}

export type ProductPrice = {
    amount: number
    variant?: hebrewEnglishObj
    wood?: hebrewEnglishObj // Legacy alias for variant
    size?: string
    sku?: string
}

export type ProductSize = {
    height?: number
    diameter?: number
    length?: number
    width?: number
    depth?: number
    upTo?: number
}

export type Product = {
    _id?: string
    id?: string
    name: hebrewEnglishObj
    description: hebrewEnglishObj
    price?: ProductPrice[]
    isActive?: boolean
    isNew?: boolean
    isFeatured?: boolean
}

export type FullProduct = Product & {
    category: hebrewEnglishObj[]
    imgsUrl: string[]
    size: ProductSize[]
    attributes?: Record<string, string | string[] | hebrewEnglishObj>
    // Backwards compatibility aliases
    socketType?: { screwType?: string; lightType?: string }
    material?: hebrewEnglishObj[]
    woodType?: hebrewEnglishObj[]
    diameter?: number
    createdAt?: string
    updatedAt?: string
}

export type ProductFilterCriteria = {
    txt?: string
    category?: string[]
    material?: string[]
    woodType?: string[]
    screwType?: string[]
    minPrice?: number
    maxPrice?: number
    attributes?: Record<string, string[]>
}

export type FilterBy = {
    txt?: string
    price?: number
    category?: string
    isActive?: boolean
    isNew?: boolean
    isFeatured?: boolean
}

export type ProductParams = { productId: string }

export type FullProductOrNull = FullProduct | null
export type FullProductsOrNull = FullProduct[] | null
