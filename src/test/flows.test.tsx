import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { clearAllStores } from '../services/storage/idb';
import { eventRepository, journalRepository } from '../services/storage/repositories';
import { renderPage } from './renderPage';

import JournalPage from '../features/spiritual-life/JournalPage';
import PrayerGroupPage from '../features/calendar/PrayerGroupPage';
import SpiritualLifePage from '../features/spiritual-life/SpiritualLifePage';

beforeEach(async () => {
  await clearAllStores();
});

describe('fluxo do diário', () => {
  it('salva o registro no IndexedDB e o exibe na lista', async () => {
    renderPage(<JournalPage />);

    await waitFor(() => expect(screen.getByText('Nenhum registro ainda')).toBeTruthy());

    fireEvent.change(screen.getByLabelText('Registro'), {
      target: { value: 'Hoje rezei o Salmo 23 e pedi paz.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(async () => {
      const entries = await journalRepository.getAll();
      expect(entries).toHaveLength(1);
      expect(entries[0]?.body).toBe('Hoje rezei o Salmo 23 e pedi paz.');
    });

    expect(await screen.findByText('Hoje rezei o Salmo 23 e pedi paz.')).toBeTruthy();
  });

  it('não salva registro vazio', async () => {
    renderPage(<JournalPage />);
    await waitFor(() => expect(screen.getByText('Nenhum registro ainda')).toBeTruthy());

    const saveButton = screen.getByRole('button', { name: /Salvar/i });
    expect(saveButton.hasAttribute('disabled')).toBe(true);
    expect(await journalRepository.getAll()).toHaveLength(0);
  });
});

describe('fluxo do grupo de oração', () => {
  it('cadastra o grupo e cria a reunião semanal correspondente', async () => {
    renderPage(<PrayerGroupPage />);

    await waitFor(() => expect(screen.getByText('Nenhum grupo cadastrado')).toBeTruthy());

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar meu grupo/i }));
    fireEvent.change(screen.getByLabelText('Nome do grupo'), {
      target: { value: 'Grupo Sementes' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^Salvar$/ }));

    await waitFor(async () => {
      const stored = await eventRepository.getAll();
      expect(stored).toHaveLength(1);
      const event = stored[0]!;
      expect(event.title).toBe('Grupo Sementes');
      expect(event.kind).toBe('grupo-oracao');
      expect(event.recurrence.frequency).toBe('weekly');
      expect(event.prayerGroupId).not.toBeNull();
    });

    expect(await screen.findByText('Grupo Sementes')).toBeTruthy();
  });
});

describe('fluxo de hábitos', () => {
  it('adiciona um hábito e permite marcar a última semana', async () => {
    renderPage(<SpiritualLifePage />);

    await waitFor(() => expect(screen.getByText('Defina sua rotina')).toBeTruthy());

    fireEvent.change(screen.getByLabelText('Novo hábito'), {
      target: { value: 'Terço diário' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Adicionar/i }));

    expect(await screen.findByText('Terço diário')).toBeTruthy();

    const markButtons = await screen.findAllByRole('button', { name: /feito|não marcado/i });
    expect(markButtons.length).toBeGreaterThanOrEqual(7);

    fireEvent.click(markButtons[0]!);

    await waitFor(() => {
      const marked = markButtons.some((button) => button.getAttribute('aria-pressed') === 'true');
      expect(marked).toBe(true);
    });
  });
});
