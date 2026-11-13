import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/settings.service';
import { uploadService } from '../../services/upload.service';
import { useLanguage } from '../../hooks/useLanguage';
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from '../../model/site-settings.model';

export const AdminPagesEditor: React.FC = () => {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                const data = await settingsService.getSettings();
                if (isMounted) setSettings(data);
            } catch (err) {
                console.error('Failed to load settings in AdminPagesEditor', err);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }
        load();
        return () => { isMounted = false; };
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setStatusMsg(null);
        try {
            const updated = await settingsService.updateSettings(settings);
            setSettings(updated);
            setStatusMsg({ text: isEn ? 'Story & Legal pages updated successfully!' : 'תוכן העמודים והמידע המשפטי עודכנו בהצלחה!' });
        } catch (err) {
            console.error('Failed to save settings', err);
            setStatusMsg({ text: isEn ? 'Failed to save changes.' : 'שמירת השינויים נכשלה.', isError: true });
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        setStatusMsg(null);
        try {
            const res = await uploadService.uploadMedia(file, 'general', 'template-store');
            setSettings(prev => ({
                ...prev,
                story: {
                    ...prev.story,
                    workshopImages: [...(prev.story.workshopImages || []), res.url]
                }
            }));
            setStatusMsg({ text: isEn ? 'Image uploaded and added to workshop gallery!' : 'התמונה הועלתה ונוספה לגלריית הסדנה!' });
        } catch (err) {
            console.error('Upload failed', err);
            setStatusMsg({ text: isEn ? 'Failed to upload image' : 'העלאת התמונה נכשלה', isError: true });
        } finally {
            setUploadingImage(false);
        }
    };

    const removeWorkshopImage = (index: number) => {
        setSettings(prev => ({
            ...prev,
            story: {
                ...prev.story,
                workshopImages: prev.story.workshopImages.filter((_, i) => i !== index)
            }
        }));
    };

    const updateExperiencePoint = (index: number, lang: 'en' | 'he', text: string) => {
        setSettings(prev => {
            const list = [...(prev.experiencePoints || [])];
            list[index] = { ...list[index], [lang]: text };
            return { ...prev, experiencePoints: list };
        });
    };

    const addExperiencePoint = () => {
        setSettings(prev => ({
            ...prev,
            experiencePoints: [
                ...(prev.experiencePoints || []),
                { en: 'New Craftsmanship Feature', he: 'מאפיין אומנות ואיכות חדש' }
            ]
        }));
    };

    const removeExperiencePoint = (index: number) => {
        setSettings(prev => ({
            ...prev,
            experiencePoints: prev.experiencePoints.filter((_, i) => i !== index)
        }));
    };

    if (isLoading) {
        return <div style={{ padding: '30px' }}>{isEn ? 'Loading page content...' : 'טוען תוכן עמודים...'}</div>;
    }

    return (
        <div className="admin-pages-editor" style={{ background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e0e0e0', maxWidth: '950px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h2 style={{ margin: '0 0 6px 0', fontSize: '1.4rem' }}>{isEn ? 'Story, About & Legal Pages' : 'עריכת תוכן אודות ומשפטי'}</h2>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                        {isEn 
                            ? 'Customize the storytelling on the About page, homepage value points, and legal policies.'
                            : 'התאם אישית את סיפור האומנות בעמוד אודות, נקודות היתרון בדף הבית והתנאים המשפטיים.'}
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{
                        padding: '10px 24px',
                        background: '#000',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 600,
                        border: 'none',
                        cursor: isSaving ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSaving ? (isEn ? 'Saving...' : 'שומר...') : (isEn ? 'Save All Changes' : 'שמור את כל השינויים')}
                </button>
            </div>

            {statusMsg && (
                <div style={{
                    padding: '12px 18px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    background: statusMsg.isError ? '#ffebee' : '#e8f5e9',
                    color: statusMsg.isError ? '#c62828' : '#2e7d32',
                    border: `1px solid ${statusMsg.isError ? '#ef9a9a' : '#a5d6a7'}`
                }}>
                    {statusMsg.text}
                </div>
            )}

            {/* SECTION 1: ABOUT STORY */}
            <section style={{ marginBottom: '32px', borderBottom: '1px solid #eee', paddingBottom: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '14px', borderLeft: isEn ? '4px solid #000' : 'none', borderRight: isEn ? 'none' : '4px solid #000', paddingLeft: isEn ? '10px' : 0, paddingRight: isEn ? 0 : '10px' }}>
                    📖 {isEn ? 'About Us Story & Craftsmanship' : 'סיפור המותג והסדנה (עמוד אודות)'}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Bio Title (EN)' : 'כותרת ראשית (אנגלית)'}</label>
                        <input
                            type="text"
                            value={settings.story?.bioTitle?.en || ''}
                            onChange={e => setSettings(p => ({ ...p, story: { ...p.story, bioTitle: { ...p.story.bioTitle, en: e.target.value } } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Bio Title (HE)' : 'כותרת ראשית (עברית)'}</label>
                        <input
                            type="text"
                            value={settings.story?.bioTitle?.he || ''}
                            onChange={e => setSettings(p => ({ ...p, story: { ...p.story, bioTitle: { ...p.story.bioTitle, he: e.target.value } } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Bio Story Body (EN)' : 'גוף הסיפור (אנגלית)'}</label>
                        <textarea
                            rows={4}
                            value={settings.story?.bioBody?.en || ''}
                            onChange={e => setSettings(p => ({ ...p, story: { ...p.story, bioBody: { ...p.story.bioBody, en: e.target.value } } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px', resize: 'vertical' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Bio Story Body (HE)' : 'גוף הסיפור (עברית)'}</label>
                        <textarea
                            rows={4}
                            value={settings.story?.bioBody?.he || ''}
                            onChange={e => setSettings(p => ({ ...p, story: { ...p.story, bioBody: { ...p.story.bioBody, he: e.target.value } } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px', resize: 'vertical' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Studio Section Title (EN)' : 'כותרת אודות הסטודיו (אנגלית)'}</label>
                        <input
                            type="text"
                            value={settings.story?.studioTitle?.en || ''}
                            onChange={e => setSettings(p => ({ ...p, story: { ...p.story, studioTitle: { ...p.story.studioTitle, en: e.target.value } } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Studio Section Title (HE)' : 'כותרת אודות הסטודיו (עברית)'}</label>
                        <input
                            type="text"
                            value={settings.story?.studioTitle?.he || ''}
                            onChange={e => setSettings(p => ({ ...p, story: { ...p.story, studioTitle: { ...p.story.studioTitle, he: e.target.value } } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Studio Section Body (EN)' : 'תיאור פעילות הסטודיו (אנגלית)'}</label>
                        <textarea
                            rows={3}
                            value={settings.story?.studioBody?.en || ''}
                            onChange={e => setSettings(p => ({ ...p, story: { ...p.story, studioBody: { ...p.story.studioBody, en: e.target.value } } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px', resize: 'vertical' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Studio Section Body (HE)' : 'תיאור פעילות הסטודיו (עברית)'}</label>
                        <textarea
                            rows={3}
                            value={settings.story?.studioBody?.he || ''}
                            onChange={e => setSettings(p => ({ ...p, story: { ...p.story, studioBody: { ...p.story.studioBody, he: e.target.value } } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px', resize: 'vertical' }}
                        />
                    </div>
                </div>

                {/* Workshop Images Gallery */}
                <div style={{ marginTop: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
                        📷 {isEn ? 'Workshop & Craft Images' : 'תמונות סדנה ותהליך היצירה'}
                    </label>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
                        {(settings.story?.workshopImages || []).map((imgUrl, idx) => (
                            <div key={idx} style={{ position: 'relative', width: '100px', height: '80px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd' }}>
                                <img src={imgUrl} alt={`Workshop ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button
                                    type="button"
                                    onClick={() => removeWorkshopImage(idx)}
                                    style={{
                                        position: 'absolute',
                                        top: '2px',
                                        right: '2px',
                                        background: 'rgba(0,0,0,0.7)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        fontSize: '11px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <label style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: '#f5f5f5',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600
                        }}>
                            {uploadingImage ? (isEn ? 'Uploading...' : 'מעלה תמונה...') : (isEn ? '+ Upload Workshop Photo' : '+ העלה תמונת סדנה')}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                </div>
            </section>

            {/* SECTION 2: EXPERIENCE POINTS */}
            <section style={{ marginBottom: '32px', borderBottom: '1px solid #eee', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '1.15rem', margin: 0, borderLeft: isEn ? '4px solid #000' : 'none', borderRight: isEn ? 'none' : '4px solid #000', paddingLeft: isEn ? '10px' : 0, paddingRight: isEn ? 0 : '10px' }}>
                        ✨ {isEn ? 'Homepage Brand Value Points' : 'נקודות יתרון וערך המותג (דף הבית)'}
                    </h3>
                    <button
                        type="button"
                        onClick={addExperiencePoint}
                        style={{ padding: '6px 14px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                        + {isEn ? 'Add Point' : 'הוסף נקודה'}
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(settings.experiencePoints || []).map((point, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, color: '#888', width: '20px' }}>{idx + 1}.</span>
                            <input
                                type="text"
                                placeholder={isEn ? 'English highlight' : 'תיאור באנגלית'}
                                value={point.en}
                                onChange={e => updateExperiencePoint(idx, 'en', e.target.value)}
                                style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                            />
                            <input
                                type="text"
                                placeholder={isEn ? 'Hebrew highlight' : 'תיאור בעברית'}
                                value={point.he}
                                onChange={e => updateExperiencePoint(idx, 'he', e.target.value)}
                                style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                            />
                            <button
                                type="button"
                                onClick={() => removeExperiencePoint(idx)}
                                style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: LEGAL & COMPLIANCE */}
            <section style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '14px', borderLeft: isEn ? '4px solid #000' : 'none', borderRight: isEn ? 'none' : '4px solid #000', paddingLeft: isEn ? '10px' : 0, paddingRight: isEn ? 0 : '10px' }}>
                    ⚖️ {isEn ? 'Legal, Privacy & Accessibility Settings' : 'הגדרות משפטיות, פרטיות ונגישות'}
                </h3>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '14px' }}>
                    {isEn 
                        ? 'These details automatically populate the Terms of Use, Privacy Policy, and Accessibility Statement pages.'
                        : 'פרטים אלו משתלבים אוטומטית בעמודי תקנון האתר, מדיניות הפרטיות והצהרת הנגישות.'}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Legal Registered Business Name' : 'שם העסק הרשמי / חברה בע״מ'}</label>
                        <input
                            type="text"
                            value={settings.legal?.legalBusinessName || ''}
                            onChange={e => setSettings(p => ({ ...p, legal: { ...p.legal, legalBusinessName: e.target.value } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Company / Business Reg ID (ח.פ / ע.מ)' : 'ח.פ / עוסק מורשה'}</label>
                        <input
                            type="text"
                            value={settings.legal?.regId || ''}
                            onChange={e => setSettings(p => ({ ...p, legal: { ...p.legal, regId: e.target.value } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Legal Support Email' : 'אימייל לפניות משפטיות ושירות'}</label>
                        <input
                            type="email"
                            value={settings.legal?.supportEmail || ''}
                            onChange={e => setSettings(p => ({ ...p, legal: { ...p.legal, supportEmail: e.target.value } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Privacy Officer Email' : 'אימייל ממונה פרטיות'}</label>
                        <input
                            type="email"
                            value={settings.legal?.privacyEmail || ''}
                            onChange={e => setSettings(p => ({ ...p, legal: { ...p.legal, privacyEmail: e.target.value } }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Accessibility Statement Notes (EN)' : 'הסדרי נגישות (אנגלית)'}</label>
                        <textarea
                            rows={3}
                            value={settings.legal?.accessibilityDetails?.en || ''}
                            onChange={e => setSettings(p => ({
                                ...p,
                                legal: {
                                    ...p.legal,
                                    accessibilityDetails: {
                                        en: e.target.value,
                                        he: p.legal?.accessibilityDetails?.he || ''
                                    }
                                }
                            }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>{isEn ? 'Accessibility Statement Notes (HE)' : 'הסדרי נגישות (עברית)'}</label>
                        <textarea
                            rows={3}
                            value={settings.legal?.accessibilityDetails?.he || ''}
                            onChange={e => setSettings(p => ({
                                ...p,
                                legal: {
                                    ...p.legal,
                                    accessibilityDetails: {
                                        he: e.target.value,
                                        en: p.legal?.accessibilityDetails?.en || ''
                                    }
                                }
                            }))}
                            style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
