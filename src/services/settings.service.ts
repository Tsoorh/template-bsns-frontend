import { httpService } from './http.service';
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from '../model/site-settings.model';

const BASE_URL = 'settings';

export const settingsService = {
    getSettings,
    updateSettings
};

async function getSettings(): Promise<SiteSettings> {
    try {
        const settings = await httpService.get<SiteSettings>(BASE_URL);
        return settings || DEFAULT_SITE_SETTINGS;
    } catch (err) {
        console.warn('Failed to fetch site settings, using default fallback', err);
        return DEFAULT_SITE_SETTINGS;
    }
}

async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const updated = await httpService.put<SiteSettings, Partial<SiteSettings>>(BASE_URL, settings);
    window.dispatchEvent(new CustomEvent('site-settings-changed', { detail: updated }));
    return updated;
}
