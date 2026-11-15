import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { loadSettings, patchSettings } from '../../services/storage/settings';
import type { UserSettings } from '../../types/spiritual-life';

type ThemePreference = UserSettings['theme'];

interface ThemeContextValue {
  theme: ThemePreference;
  resolved: 'light' | 'dark';
  setTheme: (theme: ThemePreference) => void;
  settings: UserSettings | null;
  updateSettings: (patch: Partial<UserSettings>) => Promise<void>;
  settingsLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme: ThemePreference): 'light' | 'dark' {
  const resolved = theme === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : theme;
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  document.documentElement.style.colorScheme = resolved;
  return resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>('system');
  const [resolved, setResolved] = useState<'light' | 'dark'>('light');
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    void loadSettings().then((loaded) => {
      if (!active) return;
      setSettings(loaded);
      setThemeState(loaded.theme);
      setResolved(applyTheme(loaded.theme));
      setSettingsLoaded(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!settingsLoaded) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (theme === 'system') setResolved(applyTheme('system'));
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme, settingsLoaded]);

  const setTheme = useCallback((next: ThemePreference) => {
    setThemeState(next);
    setResolved(applyTheme(next));
    void patchSettings({ theme: next }).then(setSettings).catch(() => undefined);
  }, []);

  const updateSettings = useCallback(async (patch: Partial<UserSettings>) => {
    const updated = await patchSettings(patch);
    setSettings(updated);
    if (patch.theme) {
      setThemeState(patch.theme);
      setResolved(applyTheme(patch.theme));
    }
  }, []);

  const value = useMemo(
    () => ({ theme, resolved, setTheme, settings, updateSettings, settingsLoaded }),
    [theme, resolved, setTheme, settings, updateSettings, settingsLoaded],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider.');
  return context;
}
