import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { DEFAULT_SITE_SETTINGS } from '../model/site-settings.model';
import '../assets/styles/pages/LegalPage.css';
import { Icons } from '../cmps/Icons';
import { useNavigate } from 'react-router-dom';

export const TermsOfUse = () => {
    const { language } = useLanguage();
    const { settings } = useTheme();
    const isEn = language === 'en';
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const branding = settings?.branding || DEFAULT_SITE_SETTINGS.branding;
    const legal = settings?.legal || DEFAULT_SITE_SETTINGS.legal;
    const brandName = isEn ? branding.name.en : branding.name.he;
    const legalName = legal.legalBusinessName || brandName;
    const regId = legal.regId ? ` (${isEn ? 'Reg. ID' : 'ע.מ / ח.פ'}: ${legal.regId})` : '';

    return (
        <div className="legal-layout" dir={isEn ? 'ltr' : 'rtl'}>
            <div className="product-navigation-header">
                <button 
                    className="back-to-category-btn" 
                    onClick={() => navigate(-1)}
                >
                    <Icons iconName={isEn ? 'back' : 'next'} />
                    <span>{isEn ? 'Back' : 'חזרה'}</span>
                </button>
            </div>
            <section className="legal-content">
                <h1>{isEn ? 'Terms and Conditions of Use' : 'תקנון האתר ותנאי שימוש'}</h1>
                
                <h2>{isEn ? 'Introduction and General' : 'מבוא וכללי'}</h2>
                <p>
                    {isEn 
                        ? `Welcome to the official website of "${brandName}" (hereinafter: "the Website"), operated by ${legalName}${regId} (hereinafter: "the Website Management" or "the Company").`
                        : `ברוכים הבאים לאתר הרשמי של "${brandName}" (להלן: "האתר"), המופעל על ידי ${legalName}${regId} (להלן: "הנהלת האתר" או "החברה").`}
                </p>
                <p>
                    {isEn
                        ? 'The use of the website, the content included in it and the services it offers is subject to the full approval and acceptance of the terms of use detailed below. Browsing the website and/or performing actions in it constitutes your consent to these terms. If you do not agree to the terms, please refrain from using the website.'
                        : 'השימוש באתר, בתכנים הכלולים בו ובשירותים שהוא מציע כפוף לאישורם וקבלתם המלאה של תנאי השימוש המפורטים להלן. גלישה באתר ו/או ביצוע פעולות בו מהווים הסכמה מצדך לתנאים אלו. אם אינך מסכים לתנאים, אנא הימנע משימוש באתר.'}
                </p>

                <h2>{isEn ? '1. Nature of Activity on the Website – Display & Inquiry Catalog' : '1. אופי הפעילות באתר – קטלוג תצוגה והצעות מחיר'}</h2>
                <ul>
                    <li>
                        {isEn 
                            ? <span><strong>The website is a display, catalog and inquiry portfolio</strong>, showcasing bespoke and artisan products designed and crafted by the Company.</span>
                            : <span>האתר הינו <strong>אתר תצוגה, קטלוג והצעות מחיר</strong>, המציג עבודות ומוצרים בעיצוב וייצור החברה.</span>}
                    </li>
                    <li>
                        {isEn
                            ? 'Product availability, lead times, and bespoke custom finishes are subject to written confirmation via direct price quote or WhatsApp communication.'
                            : 'זמינות המוצרים, זמני ייצור והתאמות אישיות כפופים לאישור בכתב במסגרת הצעת מחיר פרטנית או התקשרות ישירה.'}
                    </li>
                </ul>

                <h2>{isEn ? '2. Intellectual Property' : '2. קניין רוחני'}</h2>
                <p>
                    {isEn
                        ? `All intellectual property rights on the website, including designs, photographs, texts, models, logos and trademarks, belong exclusively to ${legalName}. It is strictly forbidden to copy, reproduce, distribute or publish any content from this website without prior written permission.`
                        : `כל זכויות הקניין הרוחני באתר, לרבות עיצובים, צילומים, תכנים, דגמים, לוגואים וסימני מסחר, הינן רכושה הבלעדי של ${legalName}. חל איסור מוחלט להעתיק, לשכפל, להפיץ או לעשות כל שימוש מסחרי ללא אישור מראש ובכתב.`}
                </p>

                <h2>{isEn ? '3. Limitation of Liability' : '3. הגבלת אחריות'}</h2>
                <ul>
                    <li>
                        {isEn
                            ? 'The Company makes every effort to ensure that product specifications and images are accurate. However, since products are handcrafted and utilize natural materials, slight variations in shade, texture, and grain may occur between photos and the final piece. Images are for illustration purposes.'
                            : 'החברה עושה כל מאמץ כדי להבטיח שמידע המוצרים והצילומים יהיו מדויקים. עם זאת, מאחר ומדובר בעבודת יד ובחומרים טבעיים, ייתכנו הבדלי גוון, מרקם וטקסטורה קלים בין התצלום למוצר הסופי. התמונות הן להמחשה.'}
                    </li>
                </ul>

                <h2>{isEn ? '4. Jurisdiction' : '4. סמכות שיפוט'}</h2>
                <p>
                    {isEn
                        ? 'These terms shall be governed solely by the laws of the State of Israel. The exclusive jurisdiction in any matter relating to this agreement shall be given to the competent courts.'
                        : 'על תנאים אלו יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית בכל עניין הנוגע להסכם זה תהיה לבית המשפט המוסמך.'}
                </p>
            </section>
        </div>
    );
};
