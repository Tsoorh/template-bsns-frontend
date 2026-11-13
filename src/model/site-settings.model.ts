import type { hebrewEnglishObj } from './product.model'

export interface BusinessContactConfig {
    phone: string
    displayPhone: string
    whatsappNumber: string
    email: string
    address: hebrewEnglishObj
    socialLinks: {
        instagram?: string
        facebook?: string
        pinterest?: string
        linkedin?: string
    }
}

export interface BrandingConfig {
    name: hebrewEnglishObj
    tagline: hebrewEnglishObj
    logoUrl: string
    logoDarkUrl?: string
    faviconUrl?: string
    credits: {
        allRightsReserved: hebrewEnglishObj
        builtBy: hebrewEnglishObj
        builtByUrl?: string
    }
}

export interface ThemeConfig {
    primaryColor: string
    primaryHoverColor: string
    backgroundColor: string
    surfaceColor: string
    headerBgColor: string
    textColor: string
    mutedTextColor: string
    fontFamily: string
    borderRadius: string
}

export interface StoryConfig {
    bioTitle: hebrewEnglishObj
    bioBody: hebrewEnglishObj
    studioTitle: hebrewEnglishObj
    studioBody: hebrewEnglishObj
    workshopImages: string[]
}

export interface LegalConfig {
    legalBusinessName: string
    regId?: string
    supportEmail: string
    supportPhone: string
    privacyEmail?: string
    accessibilityDetails?: hebrewEnglishObj
}

export interface SiteSettings {
    _id: string
    id?: string
    branding: BrandingConfig
    contact: BusinessContactConfig
    theme: ThemeConfig
    story: StoryConfig
    experiencePoints: hebrewEnglishObj[]
    legal: LegalConfig
    updatedAt?: string
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
    _id: 'default_settings',
    id: 'default_settings',
    branding: {
        name: { en: 'Studio Artisana', he: 'סטודיו ארטיזנה' },
        tagline: { en: 'Handcrafted Design & Objects', he: 'עיצוב וחפצים בעבודת יד' },
        logoUrl: '/images/placeholders/brand-logo.svg',
        credits: {
            allRightsReserved: { en: '© All rights reserved to Studio Artisana', he: '© כל הזכויות שמורות לסטודיו ארטיזנה' },
            builtBy: { en: 'Crafted with Care', he: 'נבנה בתשומת לב' }
        }
    },
    contact: {
        phone: '050-000-0000',
        displayPhone: '050-000-0000',
        whatsappNumber: '972500000000',
        email: 'hello@studioartisana.com',
        address: { en: 'Artisan Quarter, Tel Aviv', he: 'רובע האומנים, תל אביב' },
        socialLinks: {
            instagram: 'https://instagram.com',
            facebook: 'https://facebook.com'
        }
    },
    theme: {
        primaryColor: '#2C2A29',
        primaryHoverColor: '#4A4846',
        backgroundColor: '#FAF8F5',
        surfaceColor: '#FFFFFF',
        headerBgColor: '#FAF8F5',
        textColor: '#1A1A1A',
        mutedTextColor: '#666666',
        fontFamily: "'Heebo', sans-serif",
        borderRadius: '1rem'
    },
    story: {
        bioTitle: {
            en: 'Craftsmanship rooted in material, form, and precision.',
            he: 'אומנות ויצירה שצמחה מתוך חיבור לחומר, לצורה ולדיוק.'
        },
        bioBody: {
            en: 'Every piece in our collection is born in our local studio workshop. We blend traditional woodworking, metal spinning, and artisanal finishing to create timeless objects designed to enrich modern spaces.\n\nFrom one-of-a-kind bespoke commissions to limited production series, we oversee every step of design and manufacturing.',
            he: 'כל פריט בקולקציה שלנו נולד בסדנת הסטודיו המקומית. אנו משלבים נגרות מסורתית, עיבוד מתכת מדויק וגימורים בעבודת יד ליצירת חפצים על-זמניים שנועדו להעשיר חללים מודרניים.\n\nמהזמנות בהתאמה אישית לפרויקטים ועד סדרות מוגבלות, אנו מלווים ומבקרים כל שלב בתכנון ובייצור.'
        },
        studioTitle: {
            en: 'Dialogue between raw material and architecture.',
            he: 'דיאלוג מתמיד בין חומר גלם לאדריכלות.'
        },
        studioBody: {
            en: 'We work closely with architects, interior designers, and discerning private clients to tailor dimensions, materials, and finishes to the unique character of each project.',
            he: 'אנו עובדים בשיתוף פעולה הדוק עם אדריכלים, מעצבי פנים ולקוחות פרטיים להתאמת מידות, חומרים וגימורים לאופיו הייחודי של כל פרויקט.'
        },
        workshopImages: [
            '/images/placeholders/craft-1.webp',
            '/images/placeholders/craft-2.webp',
            '/images/placeholders/craft-3.webp',
            '/images/placeholders/craft-4.webp'
        ]
    },
    experiencePoints: [
        { en: 'Artisan handcrafted in local studio', he: 'עבודת יד מוקפדת בסטודיו מקומי' },
        { en: 'Bespoke custom dimensions and finishes', he: 'התאמה אישית מלאה של מידות וגימורים' },
        { en: 'Full architectural project collaboration', he: 'ליווי מלא לפרויקטים אדריכליים ומעצבים' },
        { en: 'Sustainable natural materials & premium warranty', he: 'חומרים טבעיים ואיכותיים עם אחריות מקיפה' }
    ],
    legal: {
        legalBusinessName: 'Studio Artisana Ltd.',
        regId: '515000000',
        supportEmail: 'support@studioartisana.com',
        supportPhone: '050-000-0000',
        privacyEmail: 'privacy@studioartisana.com',
        accessibilityDetails: {
            en: 'Accessible entrance, elevator available, service animals welcome, digital accessibility in accordance with WCAG 2.1 AA standards.',
            he: 'כניסה נגישה, מעלית זמינה, חיות שירות מתקבלות בברכה, ונגישות דיגיטלית בהתאם לתקן WCAG 2.1 ברמת AA.'
        }
    }
}
