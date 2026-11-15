import { ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';

export default function NotFoundPage() {
  return (
    <div className="py-12">
      <p className="rubric mb-3">Erro 404</p>
      <EmptyState
        label="Essa página não existe"
        description="O endereço pode ter mudado ou o link está incompleto. Volte para o início e continue de onde estava."
        action={
          <ButtonLink to="/" variant="solid" size="sm">
            Ir para Hoje
          </ButtonLink>
        }
      />
    </div>
  );
}
