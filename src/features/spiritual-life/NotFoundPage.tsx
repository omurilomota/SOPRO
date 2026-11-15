import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../../components/ui/EmptyState';

export default function NotFoundPage() {
  return (
    <div className="py-10">
      <EmptyState
        icon={Compass}
        title="Essa página não existe"
        description="O endereço pode ter mudado ou o link está incompleto. Volte para o início e continue de onde estava."
        action={
          <Link
            to="/"
            className="rounded-full bg-ink px-4 py-2 text-[0.8125rem] font-medium text-canvas transition-opacity hover:opacity-90"
          >
            Ir para Hoje
          </Link>
        }
      />
    </div>
  );
}
