import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { DEFAULT_SITE_SETTINGS } from '../model/site-settings.model';
import '../assets/styles/pages/LegalPage.css';
import { Icons } from '../cmps/Icons';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy = () => {
    const { language } = useLanguage();
    const { settings } = useTheme();
    const isEn = language === 'en';
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const branding = settings?.branding || DEFAULT_SITE_SETTINGS.branding;
    const legal = settings?.legal || DEFAULT_SITE_SETTINGS.legal;
    const contact = settings?.contact || DEFAULT_SITE_SETTINGS.contact;
    const brandName = isEn ? branding.name.en : branding.name.he;
    const privacyEmail = legal.privacyEmail || contact.email;

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
                <h1>{isEn ? 'Privacy Policy' : 'מדיניות הפרטיות'}</h1>
                <p>
                    {isEn
                        ? `The Management of "${brandName}" respects the privacy of users on this website. This document details how we collect, use and protect your information.`
                        : `הנהלת "${brandName}" מכבדת את פרטיותם של המשתמשים באתר. מסמך זה מפרט כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.`}
                </p>

                <h2>{isEn ? 'Information Collection' : 'איסוף המידע'}</h2>
                <p>
                    {isEn ? 'While using the website, two types of information may be collected:' : 'בעת השימוש באתר, ייתכן ויאספו שני סוגי מידע:'}
                </p>
                <ul>
                    <li>
                        {isEn
                            ? 'Personal information provided voluntarily: When filling out an inquiry or quote request form (such as: full name, email address, phone number).'
                            : 'מידע אישי שנמסר מרצון: בעת מילוי טופס יצירת קשר או בקשת הצעת מחיר (כגון: שם מלא, כתובת דוא"ל, מספר טלפון).'}
                    </li>
                    <li>
                        {isEn
                            ? 'Technical information: Anonymous analytics collected to ensure site performance and smooth navigation.'
                            : 'מידע טכני: נתונים אנונימיים לצורך הבטחת ביצועי האתר וחוויית גלישה חלקה.'}
                    </li>
                </ul>

                <h2>{isEn ? 'Use of Information' : 'השימוש במידע'}</h2>
                <ul>
                    <li>{isEn ? 'Responding to your inquiries and quotes.' : 'מענה לפניותיך ולבקשות הצעות מחיר.'}</li>
                    <li>{isEn ? 'Providing consultation and coordinating bespoke product orders.' : 'מתן ייעוץ ותיאום הזמנות לפריטים בהתאמה אישית.'}</li>
                </ul>

                <h2>{isEn ? 'Contact Regarding Privacy' : 'יצירת קשר בנושאי פרטיות'}</h2>
                <p>
                    {isEn
                        ? `For any questions regarding your personal information, contact us at: ${privacyEmail}`
                        : `לכל שאלה, עדכון או מחיקת פרטים, ניתן לפנות אלינו בדוא״ל: ${privacyEmail}`}
                </p>
            </section>
        </div>
    );
};
