import { CloudOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export function OfflineBanner() {
  const online = useOnlineStatus();
  if (online) return null;

  return (
    <div
      role="status"
      className="flex items-center justify-center gap-2 border-b border-brass/25 bg-brass-soft px-4 py-2 text-center text-[0.75rem] text-brass-strong dark:text-brass"
    >
      <CloudOff size={14} aria-hidden />
      <span>
        Você está offline. Suas anotações, compromissos e a última liturgia consultada seguem
        disponíveis.
      </span>
    </div>
  );
}
