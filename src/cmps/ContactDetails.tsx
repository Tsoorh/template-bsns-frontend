import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../config/site.config';
import { Icons } from './Icons';

interface ContactDetailsProps {
    showTitle?: boolean;
}

export const ContactDetails = ({ showTitle = true }: ContactDetailsProps) => {
    const { language } = useLanguage();
    const { settings } = useTheme();
    const isEn = language === 'en';

    const contact = settings?.contact || siteConfig.contact;
    const branding = settings?.branding || siteConfig.branding;
    const brandName = isEn ? branding.name.en : branding.name.he;
    const addressStr = isEn ? contact.address.en : contact.address.he;

    const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
        isEn ? "Hi, I would like to get more information." : "היי, אשמח לקבל פרטים נוספים."
    )}`;

    return (
        <>
            <div className="contact-title-group">
                {showTitle && <h3 className="contact-title">{isEn ? 'Contact Us' : 'יצירת קשר'}</h3>}
                <div className="contact-socials">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={isEn ? "Contact us on WhatsApp" : "צור קשר בוואטסאפ"}>
                        <Icons iconName="whatsapp" />
                    </a>
                    {contact.socialLinks?.facebook && (
                        <a href={contact.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label={isEn ? "Visit our Facebook page" : "בקר בעמוד הפייסבוק שלנו"}>
                            <Icons iconName="facebook" />
                        </a>
                    )}
                    {contact.socialLinks?.instagram && (
                        <a href={contact.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label={isEn ? "Visit our Instagram page" : "בקר בעמוד האינסטגרם שלנו"}>
                            <Icons iconName="instagram" />
                        </a>
                    )}
                    <a href={`mailto:${contact.email}`} aria-label={isEn ? "Send us an email" : "שלח לנו אימייל"}>
                        <Icons iconName="gmail" />
                    </a>
                </div>
            </div>
            <div className="contact-details">
                <span className="contact-detail-text">{brandName}</span>
                <span className="contact-detail-text">{addressStr}</span>
                <div className="contact-contact-row">
                    <span className="contact-detail-text" dir="ltr">{contact.displayPhone}</span>
                    <span className="contact-detail-text">{contact.email}</span>
                </div>
            </div>
        </>
    );
};
