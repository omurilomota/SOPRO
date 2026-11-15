import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { clearAllStores } from '../services/storage/idb';
import { clearLiturgyCache, setLiturgyProvider } from '../services/liturgy';
import type { Liturgy } from '../types/liturgy';
import { renderPage } from './renderPage';

import TodayPage from '../features/dashboard/TodayPage';
import LiturgyPage from '../features/liturgy/LiturgyPage';
import PrayersPage from '../features/prayers/PrayersPage';
import PrayerDetailPage from '../features/prayers/PrayerDetailPage';
import RosaryPage from '../features/rosary/RosaryPage';
import RosarySessionPage from '../features/rosary/RosarySessionPage';
import CalendarPage from '../features/calendar/CalendarPage';
import PrayerGroupPage from '../features/calendar/PrayerGroupPage';
import FormationsPage from '../features/formations/FormationsPage';
import FormationTrackPage from '../features/formations/FormationTrackPage';
import CharismaticPage from '../features/charismatic/CharismaticPage';
import WhatIsRccPage from '../features/charismatic/WhatIsRccPage';
import GroupMomentsPage from '../features/charismatic/GroupMomentsPage';
import MeetingPage from '../features/charismatic/MeetingPage';
import SvesPage from '../features/charismatic/SvesPage';
import GiftsPage from '../features/charismatic/GiftsPage';
import CharismsPage from '../features/charismatic/CharismsPage';
import DiscernmentPage from '../features/charismatic/DiscernmentPage';
import RccFormationPage from '../features/charismatic/FormationPage';
import MinistriesPage from '../features/charismatic/MinistriesPage';
import RccHistoryPage from '../features/charismatic/HistoryPage';
import GlossaryPage from '../features/charismatic/GlossaryPage';
import SpiritualLifePage from '../features/spiritual-life/SpiritualLifePage';
import JournalPage from '../features/spiritual-life/JournalPage';
import SettingsPage from '../features/spiritual-life/SettingsPage';
import PrivacyPage from '../features/spiritual-life/PrivacyPage';
import NotFoundPage from '../features/spiritual-life/NotFoundPage';

function fakeLiturgy(date: string): Liturgy {
  return {
    date,
    dateLabel: date,
    celebrations: [
      {
        id: 'teste',
        title: '33º Domingo do Tempo Comum',
        color: 'verde',
        colorRaw: 'Verde',
        isPrimary: true,
        readings: [
          {
            label: 'Evangelho',
            kind: 'gospel',
            options: [
              {
                reference: 'Mt 25,14-30',
                title: 'Proclamação do Evangelho',
                refrain: null,
                text: 'Naquele tempo, Jesus contou esta parábola.',
              },
            ],
          },
        ],
        prayers: {
          collect: 'Oração coleta de teste.',
          offerings: null,
          communion: null,
          extras: [],
        },
        antiphons: { entrance: null, communion: null },
      },
    ],
    source: 'dancrf-v2',
    fetchedAt: new Date().toISOString(),
    provider: 'Fake',
    providerUrl: null,
    season: { key: 'comum', name: 'Tempo Comum', color: 'verde' },
  };
}

beforeEach(async () => {
  await clearAllStores();
  await clearLiturgyCache();
  setLiturgyProvider({
    id: 'fake',
    name: 'Fake',
    homepage: null,
    fetchByDate: async (date) => fakeLiturgy(date),
  });
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
});

describe('telas renderizam sem erro', () => {
  it('Hoje', async () => {
    renderPage(<TodayPage />);
    expect(await screen.findByRole('heading', { level: 1 })).toBeTruthy();
    await waitFor(() =>
      expect(screen.getByText('33º Domingo do Tempo Comum')).toBeTruthy(),
    );
  });

  it('Liturgia', async () => {
    renderPage(<LiturgyPage />, { path: '/liturgia/:date', initialEntries: ['/liturgia/2026-11-15'] });
    expect(await screen.findByText('33º Domingo do Tempo Comum')).toBeTruthy();
  });

  it('Liturgia com data inválida usa o dia de hoje', async () => {
    renderPage(<LiturgyPage />, { path: '/liturgia/:date', initialEntries: ['/liturgia/xx'] });
    expect(await screen.findByText('33º Domingo do Tempo Comum')).toBeTruthy();
  });

  it('Orações', () => {
    renderPage(<PrayersPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Biblioteca de orações/i })).toBeTruthy();
    expect(screen.getByText('Pai-Nosso')).toBeTruthy();
  });

  it('Detalhe de oração', () => {
    renderPage(<PrayerDetailPage />, {
      path: '/oracoes/:prayerId',
      initialEntries: ['/oracoes/pai-nosso'],
    });
    expect(screen.getByRole('heading', { level: 1, name: 'Pai-Nosso' })).toBeTruthy();
  });

  it('Detalhe de oração inexistente mostra estado vazio', () => {
    renderPage(<PrayerDetailPage />, {
      path: '/oracoes/:prayerId',
      initialEntries: ['/oracoes/nao-existe'],
    });
    expect(screen.getByText('Oração não encontrada')).toBeTruthy();
  });

  it('Terço', () => {
    renderPage(<RosaryPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Rezar o Terço/i })).toBeTruthy();
  });

  it('Sessão do terço inicia na primeira etapa', () => {
    renderPage(<RosarySessionPage />, { path: '/terco/:groupId', initialEntries: ['/terco/gozosos'] });
    expect(screen.getByText('Sinal da Cruz')).toBeTruthy();
    expect(screen.getByText(/Etapa 1 de/)).toBeTruthy();
  });

  it('Sessão do terço com grupo inválido mostra estado vazio', () => {
    renderPage(<RosarySessionPage />, { path: '/terco/:groupId', initialEntries: ['/terco/xxx'] });
    expect(screen.getByText('Mistérios não encontrados')).toBeTruthy();
  });

  it('Calendário', async () => {
    renderPage(<CalendarPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Seus compromissos/i })).toBeTruthy();
    expect(await screen.findByText('Meu grupo de oração')).toBeTruthy();
  });

  it('Grupo de oração', async () => {
    renderPage(<PrayerGroupPage />);
    expect(await screen.findByText('Nenhum grupo cadastrado')).toBeTruthy();
  });

  it('Formações', () => {
    renderPage(<FormationsPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Trilhas e biblioteca/i })).toBeTruthy();
  });

  it('Trilha de formação', () => {
    renderPage(<FormationTrackPage />, {
      path: '/formacoes/:trackId',
      initialEntries: ['/formacoes/trilha-fundamentos'],
    });
    expect(
      screen.getByRole('heading', { level: 1, name: /Fundamentos da vida cristã/i }),
    ).toBeTruthy();
  });

  it('Vida no Espírito — hub', () => {
    renderPage(<CharismaticPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /A Renovação Carismática Católica/i }),
    ).toBeTruthy();
    expect(screen.getByText(/Os três momentos do Grupo de Oração/i)).toBeTruthy();
  });

  it('Vida no Espírito — o que é', () => {
    renderPage(<WhatIsRccPage />);
    expect(screen.getByRole('heading', { level: 1, name: /O que é a Renovação/i })).toBeTruthy();
  });

  it('Vida no Espírito — grupo de oração', () => {
    renderPage(<GroupMomentsPage />);
    expect(screen.getByRole('heading', { level: 1, name: /três momentos/i })).toBeTruthy();
    expect(screen.getByText(/Núcleo de Serviço/)).toBeTruthy();
  });

  it('Vida no Espírito — reunião', () => {
    renderPage(<MeetingPage />);
    expect(screen.getByRole('heading', { level: 1, name: /A reunião por dentro/i })).toBeTruthy();
    expect(screen.getAllByText('Pregação querigmática').length).toBeGreaterThan(0);
  });

  it('Vida no Espírito — SVES', () => {
    renderPage(<SvesPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Seminário de Vida no Espírito/i })).toBeTruthy();
    expect(screen.getByText('O Semeador')).toBeTruthy();
  });

  it('Vida no Espírito — dons e carismas', () => {
    renderPage(<GiftsPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Dons, carismas e frutos/i })).toBeTruthy();
    expect(screen.getAllByText('Sabedoria').length).toBeGreaterThan(0);
  });

  it('Vida no Espírito — carismas', () => {
    renderPage(<CharismsPage />);
    expect(screen.getByRole('heading', { level: 1, name: /carismas, um por um/i })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Palavra de sabedoria' })).toBeTruthy();
  });

  it('Vida no Espírito — discernimento', () => {
    renderPage(<DiscernmentPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Discernir sem se enganar/i })).toBeTruthy();
    expect(screen.getByText(/primado da vocação/i)).toBeTruthy();
  });

  it('Vida no Espírito — formação', () => {
    renderPage(<RccFormationPage />);
    expect(screen.getByRole('heading', { level: 1, name: /processo formativo/i })).toBeTruthy();
    expect(screen.getByText('MB1 — Identidade')).toBeTruthy();
  });

  it('Vida no Espírito — ministérios', () => {
    renderPage(<MinistriesPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Onde servir/i })).toBeTruthy();
    expect(screen.getByText('Intercessão')).toBeTruthy();
  });

  it('Vida no Espírito — história', () => {
    renderPage(<RccHistoryPage />);
    expect(screen.getByRole('heading', { level: 1, name: /De Duquesne a hoje/i })).toBeTruthy();
    expect(screen.getAllByText('1967').length).toBeGreaterThan(0);
  });

  it('Vida no Espírito — glossário', () => {
    renderPage(<GlossaryPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Falar a mesma língua/i })).toBeTruthy();
    expect(screen.getAllByText('Querigma').length).toBeGreaterThan(0);
  });

  it('Minha caminhada', async () => {
    renderPage(<SpiritualLifePage />);
    expect(screen.getByRole('heading', { level: 1, name: /Minha caminhada/i })).toBeTruthy();
    await waitFor(() => expect(screen.getByText('Rotina e hábitos')).toBeTruthy());
  });

  it('Diário', async () => {
    renderPage(<JournalPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Diário espiritual/i })).toBeTruthy();
    await waitFor(() => expect(screen.getByText('Nenhum registro ainda')).toBeTruthy());
  });

  it('Configurações', async () => {
    renderPage(<SettingsPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Preferências e dados/i })).toBeTruthy();
    await waitFor(() => expect(screen.getByText('Exportar cópia de segurança')).toBeTruthy());
  });

  it('Privacidade', () => {
    renderPage(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /O que acontece com os seus dados/i }),
    ).toBeTruthy();
  });

  it('Página não encontrada', () => {
    renderPage(<NotFoundPage />);
    expect(screen.getByText('Essa página não existe')).toBeTruthy();
  });
});
