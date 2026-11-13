export interface BusinessContactConfig {
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
    siteId: "template-store",
    domain: "https://example.com",
    branding: {
        name: { en: "Studio Artisana", he: "סטודיו ארטיזנה" },
        tagline: { en: "Handcrafted Luxury Design", he: "עיצוב יוקרתי בעבודת יד" },
        logoUrl: "/images/placeholders/brand-logo.svg",
        credits: {
            allRightsReserved: { en: "© All rights reserved to Studio Artisana", he: "© כל הזכויות שמורות לסטודיו ארטיזנה" },
            builtBy: { en: "Powered by WebCraft", he: "נבנה ע״י WebCraft" },
            builtByUrl: "https://example.com"
        }
    },
    contact: {
        phone: "050-000-0000",
        displayPhone: "050-000-0000",
        whatsappNumber: "972500000000",
        email: "hello@studioartisana.com",
        address: { en: "7 Craftsman Way, Tel Aviv", he: "דרך האומנים 7, תל אביב" },
        socialLinks: {
            instagram: "https://instagram.com",
            facebook: "https://facebook.com"
        }
    },
    theme: {
        primaryColor: "#2C2A29",
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
    categories: [
        { id: "collection-new", label: { en: "New Collection", he: "קולקציה חדשה" } },
        { id: "featured", label: { en: "Signature Pieces", he: "פריטי דגל" } },
        { id: "bespoke", label: { en: "Custom Commissions", he: "התאמה אישית" } },
        { id: "all", label: { en: "All Objects", he: "כל הפריטים" } }
    ],
    features: {
        enableLightingSpecs: false,
        enableDynamicAttributes: true,
        enableWholesalePricing: true
    },
    attributes: [
        {
            id: "material",
            label: { en: "Material", he: "חומר" },
            type: "select",
            options: [
                { en: "Solid Oak", he: "עץ אלון מלא" },
                { en: "American Walnut", he: "עץ אגוז אמריקאי" },
                { en: "Brushed Brass", he: "פליז מוברש" },
                { en: "Studio Ceramic", he: "קרמיקה סטודיו" }
            ],
            isFilterable: true
        },
        {
            id: "finish",
            label: { en: "Finish", he: "גימור" },
            type: "select",
            options: [
                { en: "Natural Matte", he: "מט טבעי" },
                { en: "Smoked Dark", he: "כהה מעושן" },
                { en: "Polished", he: "מלוטש" }
            ],
            isFilterable: true
        }
    ]
};
