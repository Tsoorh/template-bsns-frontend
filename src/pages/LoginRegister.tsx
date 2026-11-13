import { useState, type ChangeEvent, type FormEvent } from "react"
import { useLanguage } from "../hooks/useLanguage"
import { authService } from "../services/auth.service"
import '../assets/styles/pages/LoginRegister.css'

export const LoginRegister = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const { language } = useLanguage()
    const isEnglish = language === 'en'

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (ev: FormEvent) => {
        ev.preventDefault()
        setErrorMsg('')
        setIsLoading(true)
        
        try {
            const loggedInUser = await authService.login({ 
                username: credentials.username.trim(), 
                password: credentials.password 
            })
            
            if (loggedInUser?.role?.trim().toLowerCase() === 'admin') {
                window.location.assign('/dashboard')
            } else {
                window.location.assign('/')
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Auth error:', err.message)
            } else {
                console.error('Auth error:', err)
            }
            setErrorMsg(isEnglish ? 'Incorrect username or password.' : 'שם משתמש או סיסמה שגויים.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={`auth-page ${isEnglish ? 'ltr' : 'rtl'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
            <div className="auth-page-wrapper theme-dark">
                <div className="auth-layout-grid">
                    
                    <div className="auth-form-container">
                        <div className="auth-box">
                            <h1 style={{ marginBottom: '8px' }}>{isEnglish ? 'Store & Admin Login' : 'התחברות למערכת'}</h1>
                            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '24px' }}>
                                {isEnglish ? 'Demo Admin: admin@template.com / Admin123!' : 'מנהל מערכת לדוגמה: admin@template.com / Admin123!'}
                            </p>
                            
                            <form onSubmit={onSubmit} className="auth-form">
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={credentials.username} 
                                    onChange={handleChange} 
                                    placeholder={isEnglish ? 'Email / Username' : 'אימייל / שם משתמש'} 
                                    required 
                                    className="auth-input"
                                    autoComplete="username"
                                />
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={credentials.password} 
                                    onChange={handleChange} 
                                    placeholder={isEnglish ? 'Password' : 'סיסמה'} 
                                    required 
                                    className="auth-input"
                                    autoComplete="current-password"
                                />
                                
                                {errorMsg && <p className="error-msg">{errorMsg}</p>}
                                
                                <button type="submit" className="submit-btn" disabled={isLoading}>
                                    {isLoading 
                                        ? (isEnglish ? 'Logging in...' : 'מתחבר...') 
                                        : (isEnglish ? 'Sign In' : 'התחבר')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
