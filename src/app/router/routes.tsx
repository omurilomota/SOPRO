import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { RouteFallback } from '../../components/layout/RouteFallback';

/**
 * Rotas da aplicação (SPA).
 *
 * Carregamento sob demanda por área mantém o bundle inicial pequeno — útil
 * para uso no celular e para o primeiro carregamento do PWA.
 */

const TodayPage = lazy(() => import('../../features/dashboard/TodayPage'));
const LiturgyPage = lazy(() => import('../../features/liturgy/LiturgyPage'));
const PrayersPage = lazy(() => import('../../features/prayers/PrayersPage'));
const PrayerDetailPage = lazy(() => import('../../features/prayers/PrayerDetailPage'));
const RosaryPage = lazy(() => import('../../features/rosary/RosaryPage'));
const RosarySessionPage = lazy(() => import('../../features/rosary/RosarySessionPage'));
const CalendarPage = lazy(() => import('../../features/calendar/CalendarPage'));
const PrayerGroupPage = lazy(() => import('../../features/calendar/PrayerGroupPage'));
const FormationsPage = lazy(() => import('../../features/formations/FormationsPage'));
const FormationTrackPage = lazy(() => import('../../features/formations/FormationTrackPage'));
const CharismaticPage = lazy(() => import('../../features/charismatic/CharismaticPage'));
const WhatIsRccPage = lazy(() => import('../../features/charismatic/WhatIsRccPage'));
const GroupMomentsPage = lazy(() => import('../../features/charismatic/GroupMomentsPage'));
const MeetingPage = lazy(() => import('../../features/charismatic/MeetingPage'));
const SvesPage = lazy(() => import('../../features/charismatic/SvesPage'));
const GiftsPage = lazy(() => import('../../features/charismatic/GiftsPage'));
const CharismsPage = lazy(() => import('../../features/charismatic/CharismsPage'));
const DiscernmentPage = lazy(() => import('../../features/charismatic/DiscernmentPage'));
const RccFormationPage = lazy(() => import('../../features/charismatic/FormationPage'));
const MinistriesPage = lazy(() => import('../../features/charismatic/MinistriesPage'));
const RccHistoryPage = lazy(() => import('../../features/charismatic/HistoryPage'));
const GlossaryPage = lazy(() => import('../../features/charismatic/GlossaryPage'));
const SpiritualLifePage = lazy(() => import('../../features/spiritual-life/SpiritualLifePage'));
const JournalPage = lazy(() => import('../../features/spiritual-life/JournalPage'));
const SettingsPage = lazy(() => import('../../features/spiritual-life/SettingsPage'));
const PrivacyPage = lazy(() => import('../../features/spiritual-life/PrivacyPage'));
const NotFoundPage = lazy(() => import('../../features/spiritual-life/NotFoundPage'));

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(<TodayPage />) },
      { path: 'liturgia', element: withSuspense(<LiturgyPage />) },
      { path: 'liturgia/:date', element: withSuspense(<LiturgyPage />) },
      { path: 'oracoes', element: withSuspense(<PrayersPage />) },
      { path: 'oracoes/:prayerId', element: withSuspense(<PrayerDetailPage />) },
      { path: 'terco', element: withSuspense(<RosaryPage />) },
      { path: 'terco/:groupId', element: withSuspense(<RosarySessionPage />) },
      { path: 'calendario', element: withSuspense(<CalendarPage />) },
      { path: 'calendario/grupo-de-oracao', element: withSuspense(<PrayerGroupPage />) },
      { path: 'formacoes', element: withSuspense(<FormationsPage />) },
      { path: 'formacoes/:trackId', element: withSuspense(<FormationTrackPage />) },
      { path: 'carismatico', element: withSuspense(<CharismaticPage />) },
      { path: 'carismatico/o-que-e', element: withSuspense(<WhatIsRccPage />) },
      { path: 'carismatico/grupo-de-oracao', element: withSuspense(<GroupMomentsPage />) },
      { path: 'carismatico/reuniao', element: withSuspense(<MeetingPage />) },
      { path: 'carismatico/sves', element: withSuspense(<SvesPage />) },
      { path: 'carismatico/dons', element: withSuspense(<GiftsPage />) },
      { path: 'carismatico/carismas', element: withSuspense(<CharismsPage />) },
      { path: 'carismatico/discernimento', element: withSuspense(<DiscernmentPage />) },
      { path: 'carismatico/formacao', element: withSuspense(<RccFormationPage />) },
      { path: 'carismatico/ministerios', element: withSuspense(<MinistriesPage />) },
      { path: 'carismatico/historia', element: withSuspense(<RccHistoryPage />) },
      { path: 'carismatico/glossario', element: withSuspense(<GlossaryPage />) },
      { path: 'caminhada', element: withSuspense(<SpiritualLifePage />) },
      { path: 'caminhada/diario', element: withSuspense(<JournalPage />) },
      { path: 'caminhada/configuracoes', element: withSuspense(<SettingsPage />) },
      { path: 'privacidade', element: withSuspense(<PrivacyPage />) },
      { path: 'hoje', element: <Navigate to="/" replace /> },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
