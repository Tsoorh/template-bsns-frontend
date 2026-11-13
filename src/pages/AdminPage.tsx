import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { AdminProductList } from '../cmps/Admin/AdminProductList'
import { AdminUserList } from '../cmps/Admin/AdminUserList'
import { AdminPriceSettings } from '../cmps/Admin/AdminPriceSettings'
import { AdminEditPage } from '../cmps/Admin/AdminEditPage'
import { AdminThemeCustomizer } from '../cmps/Admin/AdminThemeCustomizer'
import { AdminPagesEditor } from '../cmps/Admin/AdminPagesEditor'
import { AdminBulkImporter } from '../cmps/Admin/AdminBulkImporter'
import { SiteMediaDraftProvider } from '../context/SiteMediaDraftContext'
import { useLanguage } from '../hooks/useLanguage'
import '../assets/styles/pages/AdminPage.css'

export type AdminTab = 'products' | 'appearance' | 'pages' | 'bulk' | 'edit-page' | 'users' | 'settings'

export const AdminPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const editProductId = searchParams.get('edit')
    const initialTabParam = searchParams.get('tab') as AdminTab | null
    
    const [activeTab, setActiveTab] = useState<AdminTab>(
        initialTabParam || (editProductId ? 'products' : 'products')
    )
    const [user, setUser] = useState(authService.getLoggedinUser())
    const navigate = useNavigate()
    const { language } = useLanguage()
    const isEn = language === 'en'

    const isAdmin = user?.role?.trim().toLowerCase() === 'admin'

    useEffect(() => {
        const onUserChanged = () => setUser(authService.getLoggedinUser())
        window.addEventListener('user-changed', onUserChanged)
        
        if (!user) {
            navigate('/login')
        } else if (!isAdmin) {
            navigate('/')
        }

        return () => window.removeEventListener('user-changed', onUserChanged)
    }, [user, isAdmin, navigate])

    const handleTabChange = (tab: AdminTab) => {
        setActiveTab(tab)
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            next.set('tab', tab)
            return next
        })
    }

    if (!user || !isAdmin) return null

    return (
        <SiteMediaDraftProvider>
            <div className="admin-page main-layout" dir={isEn ? 'ltr' : 'rtl'}>
                <header className="admin-header">
                    <h1>{isEn ? 'Admin Dashboard' : 'לוח בקרה מנהל'}</h1>
                    <nav className="admin-tabs">
                        <button 
                            className={activeTab === 'products' ? 'active' : ''} 
                            onClick={() => handleTabChange('products')}
                        >
                            📦 {isEn ? 'Products' : 'מוצרים'}
                        </button>
                        <button 
                            className={activeTab === 'appearance' ? 'active' : ''} 
                            onClick={() => handleTabChange('appearance')}
                        >
                            🎨 {isEn ? 'Appearance & Theme' : 'עיצוב ומראה'}
                        </button>
                        <button 
                            className={activeTab === 'pages' ? 'active' : ''} 
                            onClick={() => handleTabChange('pages')}
                        >
                            📝 {isEn ? 'Story & Legal' : 'סיפור ומשפטי'}
                        </button>
                        <button 
                            className={activeTab === 'bulk' ? 'active' : ''} 
                            onClick={() => handleTabChange('bulk')}
                        >
                            📥 {isEn ? 'Bulk Import' : 'ייבוא מרוכז'}
                        </button>
                        <button 
                            className={activeTab === 'edit-page' ? 'active' : ''} 
                            onClick={() => handleTabChange('edit-page')}
                        >
                            🖼️ {isEn ? 'Site Media' : 'מדיה ובאנר'}
                        </button>
                        <button 
                            className={activeTab === 'users' ? 'active' : ''} 
                            onClick={() => handleTabChange('users')}
                        >
                            👥 {isEn ? 'Users' : 'משתמשים'}
                        </button>
                        <button 
                            className={activeTab === 'settings' ? 'active' : ''} 
                            onClick={() => handleTabChange('settings')}
                        >
                            ⚙️ {isEn ? 'Price Settings' : 'הגדרות מחיר'}
                        </button>
                    </nav>
                </header>

                <main className="admin-content">
                    {activeTab === 'products' && <AdminProductList initialProductId={editProductId} />}
                    {activeTab === 'appearance' && <AdminThemeCustomizer />}
                    {activeTab === 'pages' && <AdminPagesEditor />}
                    {activeTab === 'bulk' && <AdminBulkImporter />}
                    {activeTab === 'edit-page' && <AdminEditPage />}
                    {activeTab === 'users' && <AdminUserList />}
                    {activeTab === 'settings' && <AdminPriceSettings />}
                </main>
            </div>
        </SiteMediaDraftProvider>
    )
}
