import React, { useState } from 'react';
import { productService } from '../../services/product.service';
import { useLanguage } from '../../hooks/useLanguage';

export const AdminBulkImporter: React.FC = () => {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [result, setResult] = useState<{
        message: string;
        totalImported: number;
        imagesUploaded: number;
        errors: string[];
    } | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleDownloadTemplate = async () => {
        setIsDownloadingTemplate(true);
        setErrorMsg(null);
        try {
            await productService.downloadImportTemplate();
        } catch (err) {
            console.error('Failed to download template', err);
            setErrorMsg(isEn ? 'Failed to download spreadsheet template.' : 'הורדת תבנית האקסל נכשלה.');
        } finally {
            setIsDownloadingTemplate(false);
        }
    };

    const handleExcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setExcelFile(file);
            setErrorMsg(null);
        }
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages(files);
            setErrorMsg(null);
        }
    };

    const handleImport = async () => {
        if (!excelFile) {
            setErrorMsg(isEn ? 'Please select an Excel (.xlsx) file first.' : 'אנא בחר קובץ אקסל (.xlsx) להעלאה.');
            return;
        }

        setIsImporting(true);
        setErrorMsg(null);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('spreadsheet', excelFile);
            images.forEach(img => {
                formData.append('images', img);
            });

            const res = await productService.bulkImport(formData);
            setResult(res);
            // Dispatch event so other components (e.g. product list) can refresh
            window.dispatchEvent(new CustomEvent('products-updated'));
        } catch (err: any) {
            console.error('Bulk import error', err);
            setErrorMsg(
                err?.response?.data?.message || 
                (isEn ? 'Bulk import failed. Please verify spreadsheet columns and image filenames.' : 'הייבוא נכשל. אנא בדוק את מבנה הקובץ ושמות התמונות.')
            );
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <div className="admin-bulk-importer" style={{ background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e0e0e0', maxWidth: '880px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h2 style={{ margin: '0 0 6px 0', fontSize: '1.4rem' }}>
                        📦 {isEn ? 'Bulk Product & Photo Importer' : 'ייבוא מוצרים ותמונות מרוכז'}
                    </h2>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                        {isEn 
                            ? 'Upload a spreadsheet with product details and drop matching local photos to populate the store in seconds.'
                            : 'העלה קובץ אקסל עם פרטי המוצרים ותיקיית תמונות תואמות לאכלוס מיידי של הקטלוג.'}
                    </p>
                </div>

                <button
                    onClick={handleDownloadTemplate}
                    disabled={isDownloadingTemplate}
                    style={{
                        padding: '10px 18px',
                        background: '#f5f5f5',
                        color: '#111',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: isDownloadingTemplate ? 'not-allowed' : 'pointer',
                        fontSize: '0.88rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    📥 {isDownloadingTemplate ? (isEn ? 'Downloading...' : 'מוריד תבנית...') : (isEn ? 'Download Excel Template' : 'הורד תבנית אקסל לדוגמה')}
                </button>
            </div>

            {/* Explanatory Steps */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                <div style={{ background: '#fafafa', padding: '16px', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>1. {isEn ? 'Fill Template' : 'מלאו את התבנית'}</div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#666', lineHeight: 1.4 }}>
                        {isEn ? 'Enter Hebrew & English names, descriptions, categories, prices, and image filenames (e.g. chair-1.jpg).' : 'הזינו שמות ותיאורים בעברית ובאנגלית, קטגוריות, מחירים ושמות קבצי התמונות.'}
                    </p>
                </div>
                <div style={{ background: '#fafafa', padding: '16px', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>2. {isEn ? 'Drop Photos' : 'גררו תמונות מוצר'}</div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#666', lineHeight: 1.4 }}>
                        {isEn ? 'Select all matching product images from your computer. Filenames are matched automatically.' : 'בחרו את כל תמונות המוצרים מהמחשב. המערכת תתאים בין השמות לאקסל אוטומטית.'}
                    </p>
                </div>
                <div style={{ background: '#fafafa', padding: '16px', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>3. {isEn ? 'Instant Cloud Sync' : 'סנכרון ענן מיידי'}</div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#666', lineHeight: 1.4 }}>
                        {isEn ? 'Images are saved to Cloudflare R2 ($0 egress fees) under this client folder.' : 'התמונות נשמרות בענן Cloudflare R2 (ללא עלויות תעבורה) תחת תיקיית המותג.'}
                    </p>
                </div>
            </div>

            {errorMsg && (
                <div style={{ padding: '12px 16px', background: '#ffebee', color: '#c62828', borderRadius: '8px', border: '1px solid #ef9a9a', marginBottom: '20px', fontSize: '0.9rem' }}>
                    ⚠️ {errorMsg}
                </div>
            )}

            {result && (
                <div style={{ padding: '16px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', border: '1px solid #a5d6a7', marginBottom: '20px' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem' }}>✅ {result.message}</h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem' }}>
                        {isEn 
                            ? `Successfully imported ${result.totalImported} products with ${result.imagesUploaded} uploaded images.`
                            : `נוצרו בהצלחה ${result.totalImported} מוצרים עם ${result.imagesUploaded} תמונות שהועלו.`}
                    </p>
                    {result.errors && result.errors.length > 0 && (
                        <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#e65100' }}>
                            <strong>{isEn ? 'Notices:' : 'הערות:'}</strong>
                            <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                                {result.errors.map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Inputs Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                {/* 1. SPREADSHEET */}
                <div style={{ border: '2px dashed #ddd', borderRadius: '10px', padding: '24px', textAlign: 'center', background: '#fdfdfd' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📊</div>
                    <h3 style={{ fontSize: '1rem', margin: '0 0 6px 0' }}>{isEn ? '1. Select Spreadsheet' : '1. בחר קובץ אקסל'}</h3>
                    <p style={{ fontSize: '0.82rem', color: '#777', margin: '0 0 14px 0' }}>{isEn ? 'Supports .xlsx, .xls' : 'קבצי .xlsx, .xls'}</p>
                    
                    <label style={{
                        display: 'inline-block',
                        padding: '8px 18px',
                        background: '#000',
                        color: '#fff',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: 600
                    }}>
                        {excelFile ? (isEn ? 'Change File' : 'החלף קובץ') : (isEn ? 'Browse Excel File' : 'בחר קובץ')}
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleExcelChange}
                            style={{ display: 'none' }}
                        />
                    </label>

                    {excelFile && (
                        <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#2e7d32', fontWeight: 600 }}>
                            📄 {excelFile.name} ({(excelFile.size / 1024).toFixed(1)} KB)
                        </div>
                    )}
                </div>

                {/* 2. PHOTOS DROPZONE */}
                <div style={{ border: '2px dashed #ddd', borderRadius: '10px', padding: '24px', textAlign: 'center', background: '#fdfdfd' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🖼️</div>
                    <h3 style={{ fontSize: '1rem', margin: '0 0 6px 0' }}>{isEn ? '2. Select Product Photos' : '2. בחר תמונות מוצר'}</h3>
                    <p style={{ fontSize: '0.82rem', color: '#777', margin: '0 0 14px 0' }}>{isEn ? 'Select multiple image files' : 'בחר תמונות מרובות מקובץ או תיקייה'}</p>
                    
                    <label style={{
                        display: 'inline-block',
                        padding: '8px 18px',
                        background: '#000',
                        color: '#fff',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: 600
                    }}>
                        {images.length > 0 ? (isEn ? 'Change Photos' : 'החלף תמונות') : (isEn ? 'Select Photos (Multiple)' : 'בחר תמונות (ריבוי קבצים)')}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImagesChange}
                            style={{ display: 'none' }}
                        />
                    </label>

                    {images.length > 0 && (
                        <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#2e7d32', fontWeight: 600 }}>
                            📷 {images.length} {isEn ? 'photos selected' : 'תמונות נבחרו'}
                        </div>
                    )}
                </div>
            </div>

            {/* Selected Images Preview Chips */}
            {images.length > 0 && (
                <div style={{ marginBottom: '24px', background: '#f9f9f9', padding: '14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                        {isEn ? `Selected Image Filenames (${images.length}):` : `שמות התמונות שנבחרו (${images.length}):`}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', maxHeight: '110px', overflowY: 'auto' }}>
                        {images.slice(0, 30).map((file, i) => (
                            <span key={i} style={{ background: '#fff', border: '1px solid #ddd', padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem', color: '#555' }}>
                                {file.name}
                            </span>
                        ))}
                        {images.length > 30 && (
                            <span style={{ fontSize: '0.78rem', color: '#888', alignSelf: 'center' }}>
                                + {images.length - 30} {isEn ? 'more...' : 'נוספות...'}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Run Import Button */}
            <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                <button
                    type="button"
                    onClick={handleImport}
                    disabled={isImporting || !excelFile}
                    style={{
                        padding: '12px 36px',
                        background: !excelFile ? '#ccc' : '#2e7d32',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        cursor: isImporting || !excelFile ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    {isImporting ? (isEn ? '⏳ Importing Products & Uploading Images...' : '⏳ מייבא מוצרים ומעלה תמונות...') : (isEn ? '🚀 Start Bulk Import' : '🚀 התחל ייבוא')}
                </button>
            </div>
        </div>
    );
};
