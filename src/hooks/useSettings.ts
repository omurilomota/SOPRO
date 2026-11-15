import { useTheme } from '../app/providers/ThemeProvider';

/** Atalho semântico para as configurações do usuário. */
export function useSettings() {
  const { settings, updateSettings, settingsLoaded } = useTheme();
  return { settings, updateSettings, settingsLoaded };
}
