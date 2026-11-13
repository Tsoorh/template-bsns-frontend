import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { DEFAULT_SITE_SETTINGS } from '../model/site-settings.model';
import '../assets/styles/pages/LegalPage.css';
import { Icons } from '../cmps/Icons';
import { useNavigate } from 'react-router-dom';

export const AccessibilityStatement = () => {
    const { language } = useLanguage();
    const { settings } = useTheme();
    const isEn = language === 'en';
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const branding = settings?.branding || DEFAULT_SITE_SETTINGS.branding;
    const contact = settings?.contact || DEFAULT_SITE_SETTINGS.contact;
    const legal = settings?.legal || DEFAULT_SITE_SETTINGS.legal;
    const brandName = isEn ? branding.name.en : branding.name.he;
    const addressStr = isEn ? contact.address.en : contact.address.he;
    const accDetails = legal.accessibilityDetails 
        ? (isEn ? legal.accessibilityDetails.en : legal.accessibilityDetails.he)
        : (isEn ? 'Accessible entrance, elevator available, service animals welcome.' : 'כניסה נגישה, מעלית זמינה, חיות שירות מתקבלות בברכה.');

    const currentDate = new Date();
    const formattedDateEn = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const formattedDateHe = currentDate.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });

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
                <h1>{isEn ? 'Accessibility Statement' : 'הצהרת נגישות'}</h1>
                <p>
                    {isEn
                        ? `The management of "${brandName}" considers it of paramount importance to provide equal service to all surfers and customers, including people with disabilities. We operate in accordance with the Equal Rights for Persons with Disabilities Law and the Service Accessibility Regulations.`
                        : `הנהלת "${brandName}" רואה בחשיבות עליונה את מתן השירות השוויוני לכלל הגולשים והלקוחות, לרבות אנשים עם מוגבלות. אנו פועלים בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות ותקנות נגישות השירות.`}
                </p>

                <h2>{isEn ? 'Website Accessibility' : 'נגישות האתר'}</h2>
                <p>
                    {isEn
                        ? 'This website has been made accessible in accordance with the Web Content Accessibility Guidelines at the AA level (WCAG 2.1 AA).'
                        : 'אתר זה הונגש בהתאם להנחיות הנגישות באינטרנט ברמת AA (תקן ישראלי ת"י 5568 המבוסס על WCAG 2.1).'}
                </p>
                <ul>
                    <li>
                        <strong>{isEn ? 'Keyboard Navigation: ' : 'ניווט מקלדת: '}</strong>
                        {isEn ? 'The website supports full navigation using the keyboard (using the Tab key and arrow keys).' : 'האתר תומך בניווט מלא באמצעות המקלדת (שימוש במקש Tab ומקשי החצים).'}
                    </li>
                    <li>
                        <strong>{isEn ? 'Browser Compatibility: ' : 'תאימות לדפדפנים: '}</strong>
                        {isEn ? 'The website is adapted to modern browsers (Chrome, Edge, Firefox, Safari) and mobile devices.' : 'האתר מותאם לדפדפנים המובילים (Chrome, Edge, Firefox, Safari) ולעבודה במובייל.'}
                    </li>
                    <li>
                        <strong>{isEn ? 'Alternative Text: ' : 'טקסט אלטרנטיבי: '}</strong>
                        {isEn ? 'Essential images and brand elements include descriptive alt text.' : 'הוספת תיאור טקסטואלי לתמונות ורכיבים גרפיים מהותיים.'}
                    </li>
                </ul>

                <h2>{isEn ? 'Physical Accessibility' : 'נגישות המקום והסטודיו'}</h2>
                <ul>
                    <li>{isEn ? `Location: ${addressStr}` : `מיקום: ${addressStr}`}</li>
                    <li>{accDetails}</li>
                </ul>

                <h2>{isEn ? 'Accessibility Inquiries & Coordinator' : 'פניות ורכז/ת נגישות'}</h2>
                <ul>
                    <li>{isEn ? `Contact Person / Coordinator: ${brandName}` : `רכז/ת נגישות: ${brandName}`}</li>
                    <li>{isEn ? `Phone: ${contact.displayPhone}` : `טלפון: ${contact.displayPhone}`}</li>
                    <li>{isEn ? `Email: ${contact.email}` : `דואר אלקטרוני: ${contact.email}`}</li>
                </ul>
                <p style={{ marginTop: '24px' }}>
                    {isEn ? `The accessibility statement was last updated on: ${formattedDateEn}` : `הצהרת הנגישות עודכנה לאחרונה בתאריך: ${formattedDateHe}`}
                </p>
            </section>
        </div>
    );
};
