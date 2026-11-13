import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { settingsService } from '../../services/settings.service';
import { uploadService } from '../../services/upload.service';
import { useLanguage } from '../../hooks/useLanguage';
import type { SiteSettings } from '../../model/site-settings.model';

export const AdminThemeCustomizer: React.FC = () => {
    const { settings, updateTheme } = useTheme();
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [formData, setFormData] = useState<SiteSettings | null>(settings);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    if (!formData) return <div>{isEn ? 'Loading appearance settings...' : 'טוען הגדרות מראה...'}</div>;

    const handleColorChange = (key: keyof typeof formData.theme, val: string) => {
        setFormData(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                theme: { ...prev.theme, [key]: val }
            };
            updateTheme({ [key]: val });
            return updated;
        });
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingLogo(true);
        setStatusMsg(null);
        try {
            const res = await uploadService.uploadMedia(file, 'brand', 'template-store');
            setFormData(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    branding: { ...prev.branding, logoUrl: res.url }
                };
            });
            setStatusMsg({ text: isEn ? 'Logo uploaded successfully!' : 'הלוגו הועלה בהצלחה!' });
        } catch (err) {
            setStatusMsg({ text: isEn ? 'Failed to upload logo' : 'העלאת הלוגו נכשלה', isError: true });
        } finally {
            setUploadingLogo(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setStatusMsg(null);
        try {
            await settingsService.updateSettings(formData);
            setStatusMsg({ text: isEn ? 'Settings saved successfully!' : 'ההגדרות נשמרו בהצלחה!' });
        } catch (err) {
            setStatusMsg({ text: isEn ? 'Failed to save settings' : 'שמירת ההגדרות נכשלה', isError: true });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="admin-theme-customizer" style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e0e0e0', maxWidth: '850px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.4rem' }}>
                {isEn ? 'Brand Appearance & Theme' : 'מראה המותג וערכת צבעים'}
            </h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
                {isEn 
                    ? 'Customize brand colors, header, logo, and contact details in real-time.' 
                    : 'התאמה אישית של צבעי המותג, לוגו ופרטי יצירת קשר בזמן אמת.'}
            </p>

            {statusMsg && (
                <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    backgroundColor: statusMsg.isError ? '#ffebee' : '#e8f5e9',
                    color: statusMsg.isError ? '#c62828' : '#2e7d32'
                }}>
                    {statusMsg.text}
                </div>
            )}

            {/* Logo Section */}
            <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{isEn ? 'Brand Logo' : 'לוגו המותג'}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        width: '160px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed #ccc',
                        borderRadius: '8px',
                        background: formData.theme.headerBgColor,
                        padding: '6px'
                    }}>
                        <img src={formData.branding.logoUrl} alt="Logo Preview" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                        <label style={{ display: 'inline-block', padding: '8px 16px', background: '#2C2A29', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                            {uploadingLogo ? (isEn ? 'Uploading...' : 'מעלה...') : (isEn ? 'Upload New Logo' : 'העלה לוגו חדש')}
                            <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} disabled={uploadingLogo} />
                        </label>
                        <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
                            {isEn ? 'Recommended: SVG or PNG with transparent background' : 'מומלץ: קובץ SVG או PNG עם רקע שקוף'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Colors Section */}
            <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>{isEn ? 'Color Palette' : 'פלטת צבעים'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>{isEn ? 'Primary Color' : 'צבע ראשי'}</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input type="color" value={formData.theme.primaryColor} onChange={e => handleColorChange('primaryColor', e.target.value)} style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer', borderRadius: '4px' }} />
                            <input type="text" value={formData.theme.primaryColor} onChange={e => handleColorChange('primaryColor', e.target.value)} style={{ padding: '6px 10px', width: '100px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>{isEn ? 'Background Canvas' : 'רקע הדף'}</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input type="color" value={formData.theme.backgroundColor} onChange={e => handleColorChange('backgroundColor', e.target.value)} style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer', borderRadius: '4px' }} />
                            <input type="text" value={formData.theme.backgroundColor} onChange={e => handleColorChange('backgroundColor', e.target.value)} style={{ padding: '6px 10px', width: '100px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>{isEn ? 'Header Background' : 'רקע תפריט עליון'}</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input type="color" value={formData.theme.headerBgColor} onChange={e => handleColorChange('headerBgColor', e.target.value)} style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer', borderRadius: '4px' }} />
                            <input type="text" value={formData.theme.headerBgColor} onChange={e => handleColorChange('headerBgColor', e.target.value)} style={{ padding: '6px 10px', width: '100px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact & WhatsApp */}
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>{isEn ? 'WhatsApp & Contact' : 'וואטסאפ ויצירת קשר'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>
                            {isEn ? 'WhatsApp Number (Intl format, no +)' : 'מספר וואטסאפ (ללא פלוס)'}
                        </label>
                        <input 
                            type="text" 
                            value={formData.contact.whatsappNumber} 
                            onChange={e => setFormData({ ...formData, contact: { ...formData.contact, whatsappNumber: e.target.value } })}
                            placeholder="972501234567"
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>
                            {isEn ? 'Display Phone' : 'טלפון לתצוגה'}
                        </label>
                        <input 
                            type="text" 
                            value={formData.contact.displayPhone} 
                            onChange={e => setFormData({ ...formData, contact: { ...formData.contact, displayPhone: e.target.value } })}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>
                            {isEn ? 'Email' : 'דוא״ל'}
                        </label>
                        <input 
                            type="email" 
                            value={formData.contact.email} 
                            onChange={e => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving}
                style={{
                    padding: '10px 24px',
                    background: '#2C2A29',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
            >
                {isSaving ? (isEn ? 'Saving...' : 'שומר...') : (isEn ? 'Save Appearance & Brand' : 'שמור מראה ומותג')}
            </button>
        </div>
    );
};
