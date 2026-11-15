import { MonitorSmartphone, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider';

const THEME_ORDER = ['system', 'light', 'dark'] as const;

const THEME_META = {
  system: { icon: MonitorSmartphone, label: 'Tema automático' },
  light: { icon: Sun, label: 'Tema claro' },
  dark: { icon: Moon, label: 'Tema escuro' },
} as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const meta = THEME_META[theme];
  const Icon = meta.icon;

  const cycle = () => {
    const index = THEME_ORDER.indexOf(theme);
    setTheme(THEME_ORDER[(index + 1) % THEME_ORDER.length] ?? 'system');
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="p-1.5 text-muted transition-colors hover:text-rubric"
      aria-label={`${meta.label} — alternar tema`}
      title={meta.label}
    >
      <Icon size={15} strokeWidth={1.5} aria-hidden />
    </button>
  );
}
