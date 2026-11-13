import { siteConfig, type AttributeDefinition, type CategoryDefinition } from '../config/site.config'

export const PRODUCT_OPTIONS = {
    WOOD_TYPES: (siteConfig.attributes.find((a: AttributeDefinition) => a.id === 'material')?.options || [
        { en: 'Solid Oak', he: 'עץ אלון מלא' },
        { en: 'American Walnut', he: 'עץ אגוז אמריקאי' },
        { en: 'Standard / Neutral', he: 'סטנדרטי / ללא גימור' }
    ]) as { en: string; he: string }[],
    CATEGORIES: siteConfig.categories.map((c: CategoryDefinition) => c.label),
    MATERIALS: (siteConfig.attributes.find((a: AttributeDefinition) => a.id === 'finish')?.options || [
        { en: 'Natural Matte', he: 'מט טבעי' },
        { en: 'Smoked Dark', he: 'כהה מעושן' },
        { en: 'Polished', he: 'מלוטש' }
    ]) as { en: string; he: string }[],
    SCREW_TYPES: ['E27', 'G9', 'GU10', 'Linestra Bulb', 'LED (Integrated)', 'Mixed: GU10 + E27', 'Mixed: G9 + E27'],
    LIGHT_TYPES: ['LED - Max 5W', 'LED - Max 7W', 'LED - Max 9W', 'LED - Max 10W', 'LED - Max 15W', 'LED - Max 20W', 'LED - Max 35W', 'LED - Max 36W']
} as const
