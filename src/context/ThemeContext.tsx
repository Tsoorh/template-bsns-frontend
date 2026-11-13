import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig, type ThemeConfig } from '../config/site.config';
import { settingsService } from '../services/settings.service';
import type { SiteSettings } from '../model/site-settings.model';

interface ThemeContextType {
    theme: ThemeConfig;
    settings: SiteSettings | null;
    updateTheme: (newTheme: Partial<ThemeConfig>) => void;
    refreshSettings: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: siteConfig.theme,
    settings: null,
    updateTheme: () => {},
    refreshSettings: async () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeConfig>(siteConfig.theme);
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    const applyThemeToCssVars = (t: ThemeConfig) => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', t.primaryColor);
        root.style.setProperty('--primary-hover-color', t.primaryHoverColor);
        root.style.setProperty('--background-color', t.backgroundColor);
        root.style.setProperty('--surface-color', t.surfaceColor);
        root.style.setProperty('--header-bgc', t.headerBgColor);
        root.style.setProperty('--text-color', t.textColor);
        root.style.setProperty('--muted-text-color', t.mutedTextColor);
        root.style.setProperty('--font-primary', t.fontFamily);
    };

    const loadSettings = async () => {
        try {
            const fetched = await settingsService.getSettings();
            if (fetched) {
                setSettings(fetched);
                if (fetched.theme) {
                    const mergedTheme: ThemeConfig = {
                        ...siteConfig.theme,
                        ...fetched.theme,
                        borderRadius: (fetched.theme.borderRadius as any) || siteConfig.theme.borderRadius
                    };
                    setTheme(mergedTheme);
                    applyThemeToCssVars(mergedTheme);
                }
            }
        } catch (err) {
            console.warn('Using default theme config', err);
            applyThemeToCssVars(siteConfig.theme);
        }
    };

    useEffect(() => {
        loadSettings();

        const onSettingsChanged = (e: Event) => {
            const detail = (e as CustomEvent).detail as SiteSettings;
            if (detail && detail.theme) {
                const mergedTheme: ThemeConfig = {
                    ...siteConfig.theme,
                    ...detail.theme,
                    borderRadius: (detail.theme.borderRadius as any) || siteConfig.theme.borderRadius
                };
                setTheme(mergedTheme);
                applyThemeToCssVars(mergedTheme);
                setSettings(detail);
            }
        };

        window.addEventListener('site-settings-changed', onSettingsChanged);
        return () => window.removeEventListener('site-settings-changed', onSettingsChanged);
    }, []);

    const updateTheme = (newTheme: Partial<ThemeConfig>) => {
        setTheme(prev => {
            const next = { ...prev, ...newTheme };
            applyThemeToCssVars(next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, settings, updateTheme, refreshSettings: loadSettings }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
