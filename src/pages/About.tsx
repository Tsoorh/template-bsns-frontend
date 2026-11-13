import { useEffect } from 'react';
import '../assets/styles/pages/AboutPage.css';
import { Icons } from '../cmps/Icons';
import { ContactSection } from '../cmps/ContactSection';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { DEFAULT_SITE_SETTINGS } from '../model/site-settings.model';

export const About = () => {
    const { language } = useLanguage();
    const { settings } = useTheme();
    const isEn = language === 'en';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const story = settings?.story || DEFAULT_SITE_SETTINGS.story;
    const branding = settings?.branding || DEFAULT_SITE_SETTINGS.branding;
    const brandName = isEn ? branding.name.en : branding.name.he;

    const bioTitle = isEn ? story.bioTitle.en : story.bioTitle.he;
    const bioBody = isEn ? story.bioBody.en : story.bioBody.he;
    const studioTitle = isEn ? story.studioTitle.en : story.studioTitle.he;
    const studioBody = isEn ? story.studioBody.en : story.studioBody.he;

    const workshopImgs = (story.workshopImages && story.workshopImages.length >= 4)
        ? story.workshopImages
        : [
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop'
        ];

    const bioImage = (story.workshopImages && story.workshopImages[0])
        ? story.workshopImages[0]
        : 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000&auto=format&fit=crop';

    return (
        <div className="about-layout" dir={isEn ? 'ltr' : 'rtl'}>
            
            {/* Part A: The Main Layout */}
            <section className="about-part-a">
                
                {/* Bio Section */}
                <div className="about-bio-section">
                    <div className="about-bio-content">
                        <div className="about-bio-divider-vertical"></div>
                        <div className="about-bio-text-wrapper">
                            <span className="about-bio-title">
                                {bioTitle}
                            </span>
                            <span className="about-bio-body" style={{ whiteSpace: 'pre-line' }}>
                                {bioBody}
                            </span>
                        </div>
                    </div>
                    <img src={bioImage} alt={brandName} className="about-bio-image" style={{ objectFit: 'cover' }} />
                </div>

                {/* Studio Section */}
                <div className="about-studio-section">
                    <div className="about-studio-gallery">
                        <img src={workshopImgs[0]} alt="Workshop detail 1" style={{ objectFit: 'cover' }} />
                        <img src={workshopImgs[1]} alt="Workshop detail 2" style={{ objectFit: 'cover' }} />
                        <img src={workshopImgs[2]} alt="Workshop detail 3" style={{ objectFit: 'cover' }} />
                        <img src={workshopImgs[3]} alt="Workshop detail 4" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="about-studio-content">
                        <div className="about-studio-divider-horizontal"></div>
                        <div className="about-studio-text" style={{ whiteSpace: 'pre-line' }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>{studioTitle}</h3>
                            {studioBody}
                        </div>
                    </div>
                </div>
                
            </section>

            {/* Part B: Gradient CTA */}
            <section className="about-gradient-sec gradient-sec">
                <div className="gradient-sec-content">
                    <div className="gradient-divider"></div>
                    <h2 className="gradient-sec-text">
                        {isEn 
                            ? 'Special models can be developed for unique architectural projects upon request.'
                            : 'ניתן לפתח דגמים ייעודיים בהתאמה אישית לפרויקטים אדריכליים לפי דרישה.'}
                    </h2>
                </div>
                <div 
                    className="gradient-sec-link animated-link" 
                    role="link" 
                    tabIndex={0}
                    onClick={() => window.location.assign('/contact')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && window.location.assign('/contact')}
                    aria-label={isEn ? "Contact us for custom projects" : "צור קשר לפרויקטים בהתאמה אישית"}
                >
                    <span>{isEn ? 'Contact Us' : 'יצירת קשר'}</span>
                    <Icons iconName={isEn ? "next" : "back"} />
                </div>
            </section>

            {/* Part C: Footer Contact Form */}
            <ContactSection />
        </div>
    );
};
