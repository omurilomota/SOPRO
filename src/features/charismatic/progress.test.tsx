import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { clearAllStores } from '../../services/storage/idb';
import { renderPage } from '../../test/renderPage';
import SvesPage from './SvesPage';
import RccFormationPage from './FormationPage';

/**
 * O progresso do caminho carismático precisa ser local, reversível e não
 * cobrar nada de ninguém. Estes testes cobrem a mecânica de marcação.
 */
beforeEach(async () => {
  await clearAllStores();
});

describe('progresso do SVES', () => {
  it('começa em zero e permite marcar e desmarcar uma semana', async () => {
    renderPage(<SvesPage />);

    expect(await screen.findByText(/0 de 9 semanas/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Marcar semana 1 como concluída' }));

    await waitFor(() => expect(screen.getByText(/1 de 9 semanas/)).toBeTruthy());

    fireEvent.click(screen.getByRole('button', { name: 'Marcar semana 1 como concluída' }));

    await waitFor(() => expect(screen.getByText(/0 de 9 semanas/)).toBeTruthy());
  });

  it('sugere a semana seguinte conforme o progresso avança', async () => {
    renderPage(<SvesPage />);

    await screen.findByText(/0 de 9 semanas/);
    expect(screen.getByText(/Comece pela semana 1/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Marcar semana 1 como concluída' }));

    await waitFor(() =>
      expect(screen.getByText(/Próximo encontro sugerido: semana 2/)).toBeTruthy(),
    );
  });
});

describe('progresso da formação', () => {
  it('permite marcar um módulo do Módulo Básico', async () => {
    renderPage(<RccFormationPage />);

    await screen.findByText(/ainda não marcou nenhum módulo/i);

    fireEvent.click(screen.getByRole('button', { name: 'Marcar MB1 — Identidade como concluído' }));

    await waitFor(() => expect(screen.getByText(/Módulos marcados até agora: 1 de 11/)).toBeTruthy());
  });
});
