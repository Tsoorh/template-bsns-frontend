import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../config/site.config';
import '../assets/styles/cmps/AppFooter.css';

export const AppFooter = () => {
    const { language } = useLanguage();
    const { settings } = useTheme();
    const isEn = language === 'en';

    const credits = settings?.branding?.credits || siteConfig.branding.credits;
    const allRights = isEn ? credits.allRightsReserved.en : credits.allRightsReserved.he;
    const builtBy = isEn ? credits.builtBy.en : credits.builtBy.he;
    const builtByUrl = credits.builtByUrl || siteConfig.branding.credits.builtByUrl;

    return (
        <footer className="app-footer" dir={isEn ? 'ltr' : 'rtl'}>
            <span>{allRights}</span>
            <span>
                {builtByUrl ? (
                    <a href={builtByUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {builtBy}
                    </a>
                ) : (
                    builtBy
                )}
            </span>
        </footer>
    );
};
