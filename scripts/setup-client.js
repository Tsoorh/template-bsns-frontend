#!/usr/bin/env node

import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.resolve(__dirname, '../src/config/site.config.ts');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (query, defaultVal = '') => {
    return new Promise(resolve => {
        const prompt = defaultVal ? `${query} [${defaultVal}]: ` : `${query}: `;
        rl.question(prompt, answer => {
            resolve(answer.trim() || defaultVal);
        });
    });
};

const INDUSTRY_PRESETS = {
    '1': {
        name: 'Furniture & Woodworking',
        enableLightingSpecs: false,
        categories: [
            { id: 'dining-tables', label: { en: 'Dining Tables', he: 'שולחנות אוכל' } },
            { id: 'coffee-tables', label: { en: 'Coffee Tables', he: 'שולחנות סלון' } },
            { id: 'seating', label: { en: 'Seating & Benches', he: 'כיסאות וספסלים' } },
            { id: 'storage', label: { en: 'Credenzas & Storage', he: 'מזנונים ואחסון' } },
            { id: 'custom', label: { en: 'Bespoke Projects', he: 'פרויקטים בהתאמה' } }
        ],
        attributes: [
            {
                id: 'wood-type',
                label: { en: 'Wood Species', he: 'סוג עץ' },
                type: 'select',
                options: [
                    { en: 'Solid White Oak', he: 'אלון לבן מלא' },
                    { en: 'American Black Walnut', he: 'אגוז אמריקאי שחור' },
                    { en: 'Smoked Ash', he: 'מילה מעושנת' },
                    { en: 'Natural Teak', he: 'טיק טבעי' }
                ],
                isFilterable: true
            },
            {
                id: 'finish',
                label: { en: 'Finish', he: 'סוג גימור' },
                type: 'select',
                options: [
                    { en: 'Natural Matte Hardwax Oil', he: 'שמן שעווה מט טבעי' },
                    { en: 'Deep Charcoal Tint', he: 'גוון פחם עמוק' },
                    { en: 'Clear Protective Poly', he: 'לכה שקופה מגנה' }
                ],
                isFilterable: true
            }
        ]
    },
    '2': {
        name: 'Lighting Design & Fabrication',
        enableLightingSpecs: true,
        categories: [
            { id: 'pendant', label: { en: 'Pendant Lights', he: 'גופי תלייה' } },
            { id: 'wall', label: { en: 'Wall Sconces', he: 'מנורות קיר' } },
            { id: 'ceiling', label: { en: 'Ceiling Fixtures', he: 'צמודי תקרה' } },
            { id: 'table-lamps', label: { en: 'Table Lamps', he: 'מנורות שולחן' } },
            { id: 'architectural', label: { en: 'Architectural Systems', he: 'מערכות אדריכליות' } }
        ],
        attributes: [
            {
                id: 'material',
                label: { en: 'Material', he: 'חומר גוף' },
                type: 'select',
                options: [
                    { en: 'Solid Oak & Brass', he: 'עץ אלון מלא ופליז' },
                    { en: 'Black Anodized Aluminum', he: 'אלומיניום שחור מושחר' },
                    { en: 'Brushed Raw Brass', he: 'פליז מוברש טבעי' },
                    { en: 'Mouth-blown Glass', he: 'זכוכית מנופחת ידנית' }
                ],
                isFilterable: true
            },
            {
                id: 'color-temperature',
                label: { en: 'Light Temperature', he: 'גוון אור' },
                type: 'select',
                options: [
                    { en: '2700K Warm White', he: '2700K אור חם ואינטימי' },
                    { en: '3000K Soft Neutral', he: '3000K לבן חם מעודן' },
                    { en: 'Dim-to-Warm', he: 'עמעום חם (Dim to Warm)' }
                ],
                isFilterable: true
            }
        ]
    },
    '3': {
        name: 'Ceramics & Pottery Studio',
        enableLightingSpecs: false,
        categories: [
            { id: 'vases', label: { en: 'Vases & Vessels', he: 'אגרטלים וכלים' } },
            { id: 'dinnerware', label: { en: 'Tableware & Plates', he: 'צלחות וכלי שולחן' } },
            { id: 'planters', label: { en: 'Planters', he: 'עציצים' } },
            { id: 'sculptures', label: { en: 'Sculptural Art', he: 'אובייקטים פיסוליים' } }
        ],
        attributes: [
            {
                id: 'clay-type',
                label: { en: 'Clay Body', he: 'סוג חומר' },
                type: 'select',
                options: [
                    { en: 'Speckled Stoneware', he: 'חומר שרוף מנוקד' },
                    { en: 'Terracotta', he: 'טרקוטה חמה' },
                    { en: 'Porcelain', he: 'פורצלן עדין' }
                ],
                isFilterable: true
            },
            {
                id: 'glaze',
                label: { en: 'Glaze Finish', he: 'גלזורה' },
                type: 'select',
                options: [
                    { en: 'Matte Sand Chalk', he: 'גיר חולי מט' },
                    { en: 'Reactive Sea Glaze', he: 'גלזורה ריאקטיבית בגווני ים' },
                    { en: 'Unfinished Unglazed', he: 'חומר טבעי ללא גלזורה' }
                ],
                isFilterable: true
            }
        ]
    },
    '4': {
        name: 'Artisan Jewelry & Accessories',
        enableLightingSpecs: false,
        categories: [
            { id: 'rings', label: { en: 'Rings', he: 'טבעות' } },
            { id: 'necklaces', label: { en: 'Necklaces & Pendants', he: 'שרשראות ותליונים' } },
            { id: 'earrings', label: { en: 'Earrings', he: 'עגילים' } },
            { id: 'bracelets', label: { en: 'Bracelets', he: 'צמידים' } }
        ],
        attributes: [
            {
                id: 'precious-metal',
                label: { en: 'Metal', he: 'מתכת יקרה' },
                type: 'select',
                options: [
                    { en: '14K Yellow Gold', he: 'זהב צהוב 14K' },
                    { en: '14K Rose Gold', he: 'זהב אדום 14K' },
                    { en: '925 Sterling Silver', he: 'כסף סטרלינג 925' },
                    { en: 'Solid Platinum', he: 'פלטינה מלאה' }
                ],
                isFilterable: true
            },
            {
                id: 'gemstone',
                label: { en: 'Gemstone', he: 'אבן חן' },
                type: 'select',
                options: [
                    { en: 'Conflict-free Diamond', he: 'יהלום טבעי' },
                    { en: 'Natural Emerald', he: 'ברקת אזמרגד' },
                    { en: 'Blue Sapphire', he: 'ספיר כחול' },
                    { en: 'No Gemstone', he: 'ללא אבן' }
                ],
                isFilterable: true
            }
        ]
    }
};

async function run() {
    console.log('\n========================================================');
    console.log('🚀 Client Storefront Scaffolder — Quick Client Onboarding');
    console.log('========================================================\n');

    const brandNameEn = await ask('1. Client Business Name (English)', 'Studio Artisana');
    const brandNameHe = await ask('2. Client Business Name (Hebrew)', 'סטודיו ארטיזנה');
    const taglineEn = await ask('3. Tagline (English)', 'Handcrafted Luxury Design');
    const taglineHe = await ask('4. Tagline (Hebrew)', 'עיצוב יוקרתי בעבודת יד');
    const whatsapp = await ask('5. WhatsApp Number (international, e.g. 972501234567)', '972500000000');
    const email = await ask('6. Contact Email', 'hello@studioartisana.com');
    const phone = await ask('7. Phone for display', '050-000-0000');
    const addressHe = await ask('8. Address (Hebrew)', 'רובע האומנים, תל אביב');
    const addressEn = await ask('9. Address (English)', 'Artisan Quarter, Tel Aviv');
    const primaryColor = await ask('10. Primary Brand Color (HEX)', '#2C2A29');

    console.log('\nSelect Industry Preset:');
    console.log('  [1] Furniture & Woodworking');
    console.log('  [2] Lighting Design & Fabrication');
    console.log('  [3] Ceramics & Pottery Studio');
    console.log('  [4] Artisan Jewelry & Fine Craft');
    console.log('  [5] Custom Industry');

    const industryChoice = await ask('Choose preset (1-5)', '1');

    let selectedPreset = INDUSTRY_PRESETS[industryChoice];
    if (!selectedPreset) {
        selectedPreset = {
            name: 'Custom Boutique Store',
            enableLightingSpecs: false,
            categories: [
                { id: 'collection-new', label: { en: 'New Collection', he: 'קולקציה חדשה' } },
                { id: 'signature', label: { en: 'Signature Pieces', he: 'פריטי דגל' } },
                { id: 'custom', label: { en: 'Bespoke Creations', he: 'עיצוב אישי' } }
            ],
            attributes: [
                {
                    id: 'material',
                    label: { en: 'Material', he: 'חומר' },
                    type: 'select',
                    options: [
                        { en: 'Premium Natural Material', he: 'חומר טבעי מובחר' },
                        { en: 'Artisanal Composite', he: 'תרכובת סטודיו' }
                    ],
                    isFilterable: true
                }
            ]
        };
    }

    const siteId = brandNameEn.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'client-store';

    const configContent = `export interface BusinessContactConfig {
    phone: string;
    displayPhone: string;
    whatsappNumber: string; // International format without '+' (e.g. '972501234567')
    email: string;
    address: { en: string; he: string };
    socialLinks: {
        instagram?: string;
        facebook?: string;
        pinterest?: string;
        linkedin?: string;
    };
}

export interface BrandingConfig {
    name: { en: string; he: string };
    tagline: { en: string; he: string };
    logoUrl: string;
    logoDarkUrl?: string;
    faviconUrl?: string;
    credits: {
        allRightsReserved: { en: string; he: string };
        builtBy: { en: string; he: string };
        builtByUrl?: string;
    };
}

export interface ThemeConfig {
    primaryColor: string;
    primaryHoverColor: string;
    backgroundColor: string;
    surfaceColor: string;
    headerBgColor: string;
    textColor: string;
    mutedTextColor: string;
    fontFamily: string;
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export interface CategoryDefinition {
    id: string;
    label: { en: string; he: string };
    image?: string;
}

export interface AttributeDefinition {
    id: string;
    label: { en: string; he: string };
    type: 'select' | 'text' | 'number';
    options?: { en: string; he: string }[];
    isFilterable: boolean;
}

export interface FeaturesConfig {
    enableLightingSpecs?: boolean;
    enableDynamicAttributes?: boolean;
    enableWholesalePricing?: boolean;
}

export interface SiteConfig {
    siteId: string;
    domain: string;
    branding: BrandingConfig;
    contact: BusinessContactConfig;
    theme: ThemeConfig;
    mode: 'whatsapp_direct' | 'ecommerce_checkout' | 'showcase_only';
    supportedLanguages: ('he' | 'en')[];
    defaultLanguage: 'he' | 'en';
    categories: CategoryDefinition[];
    attributes: AttributeDefinition[];
    features?: FeaturesConfig;
}

export const siteConfig: SiteConfig = {
    siteId: ${JSON.stringify(siteId)},
    domain: "https://${siteId}.com",
    branding: {
        name: { en: ${JSON.stringify(brandNameEn)}, he: ${JSON.stringify(brandNameHe)} },
        tagline: { en: ${JSON.stringify(taglineEn)}, he: ${JSON.stringify(taglineHe)} },
        logoUrl: "/images/placeholders/brand-logo.svg",
        credits: {
            allRightsReserved: { 
                en: "© All rights reserved to " + ${JSON.stringify(brandNameEn)}, 
                he: "© כל הזכויות שמורות ל" + ${JSON.stringify(brandNameHe)} 
            },
            builtBy: { en: "Powered by WebCraft", he: "נבנה ע״י WebCraft" },
            builtByUrl: "https://example.com"
        }
    },
    contact: {
        phone: ${JSON.stringify(phone)},
        displayPhone: ${JSON.stringify(phone)},
        whatsappNumber: ${JSON.stringify(whatsapp)},
        email: ${JSON.stringify(email)},
        address: { en: ${JSON.stringify(addressEn)}, he: ${JSON.stringify(addressHe)} },
        socialLinks: {
            instagram: "https://instagram.com",
            facebook: "https://facebook.com"
        }
    },
    theme: {
        primaryColor: ${JSON.stringify(primaryColor)},
        primaryHoverColor: "#4A4846",
        backgroundColor: "#FAF8F5",
        surfaceColor: "#FFFFFF",
        headerBgColor: "#FAF8F5",
        textColor: "#1A1A1A",
        mutedTextColor: "#666666",
        fontFamily: "'Heebo', sans-serif",
        borderRadius: "md"
    },
    mode: "whatsapp_direct",
    supportedLanguages: ["he", "en"],
    defaultLanguage: "he",
    categories: ${JSON.stringify(selectedPreset.categories, null, 8)},
    features: {
        enableLightingSpecs: ${selectedPreset.enableLightingSpecs},
        enableDynamicAttributes: true,
        enableWholesalePricing: true
    },
    attributes: ${JSON.stringify(selectedPreset.attributes, null, 8)}
};
`;

    fs.writeFileSync(CONFIG_PATH, configContent, 'utf8');

    console.log('\n========================================================');
    console.log(`✅ Client configuration written to src/config/site.config.ts!`);
    console.log(`   Industry: ${selectedPreset.name}`);
    console.log(`   Brand: ${brandNameEn} / ${brandNameHe}`);
    console.log(`   Site ID: ${siteId}`);
    console.log('========================================================\n');
    console.log('Next steps:');
    console.log('  1. Run `npm run dev` to see the new client site.');
    console.log('  2. Open the Admin Dashboard -> "Bulk Import" to drop product photos and Excel sheet.');
    console.log('  3. Open "Appearance & Theme" to fine-tune colors or upload the client logo.\n');

    rl.close();
}

run();
