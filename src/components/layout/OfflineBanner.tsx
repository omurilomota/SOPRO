import { CloudOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export function OfflineBanner() {
  const online = useOnlineStatus();
  if (online) return null;

  return (
    <div
      role="status"
      className="flex items-center justify-center gap-2 border-b border-rule bg-paper-2 px-4 py-1.5 text-center text-[0.6875rem] text-ink-2"
    >
      <CloudOff size={12} className="text-rubric" aria-hidden />
      <span>
        Você está offline. Suas anotações, compromissos e a última liturgia consultada seguem
        disponíveis.
      </span>
    </div>
  );
}
