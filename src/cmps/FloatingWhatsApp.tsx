import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../config/site.config';
import { Icons } from './Icons';
import '../assets/styles/cmps/FloatingWhatsApp.css';

export const FloatingWhatsApp = () => {
    const { language } = useLanguage();
    const { settings } = useTheme();
    const isEnglish = language === 'en';

    const phoneNumber = settings?.contact?.whatsappNumber || siteConfig.contact.whatsappNumber;
    const brandName = isEnglish
        ? (settings?.branding?.name?.en || siteConfig.branding.name.en)
        : (settings?.branding?.name?.he || siteConfig.branding.name.he);

    const message = isEnglish
        ? `Hi, I reached out through ${brandName}'s website and would like to get more details.`
        : `היי, הגעתי דרך האתר של ${brandName} ואשמח לקבל פרטים נוספים.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const label = isEnglish ? "Chat with us on WhatsApp" : "דברו איתנו בוואטסאפ";

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp"
            aria-label={label}
            title={label}
        >
            <Icons iconName="whatsapp" />
        </a>
    );
};
