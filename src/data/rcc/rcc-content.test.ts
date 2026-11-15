import { describe, expect, it } from 'vitest';
import { carismOfServiceIds, charisms } from './charisms';
import { discernmentCriteria, pastoralWarnings } from './discernment';
import { formationStages } from './formation';
import { fruitsOfTheSpirit, giftsInfused } from './gifts';
import { glossary, rccDocuments } from './glossary';
import { groupMoments, prayerMeetingElements } from './group';
import { historyTimeline } from './history';
import { ministries } from './ministries';
import { svesAlternativeOutline, svesSessions } from './sves';

/**
 * Guardas de conteúdo.
 *
 * Estes testes existem porque a área carismática é o diferencial do SOPRO e
 * um erro de conteúdo aqui não é um bug visual: é desinformação doutrinal.
 * Cada asserção abaixo corresponde a uma linha vermelha documentada.
 */

describe('dons e carismas', () => {
  it('traz os sete dons infusos com id único', () => {
    expect(giftsInfused).toHaveLength(7);
    expect(new Set(giftsInfused.map((gift) => gift.id)).size).toBe(7);
  });

  it('traz doze frutos do Espírito', () => {
    expect(fruitsOfTheSpirit).toHaveLength(12);
  });

  it('mantém a distinção: carisma não é dom infuso', () => {
    const giftIds = new Set(giftsInfused.map((gift) => gift.id));
    const overlap = charisms.filter((charism) => giftIds.has(charism.id));
    expect(overlap).toHaveLength(0);
  });

  it('todo carisma tem cuidado pastoral e referência escriturística', () => {
    for (const charism of charisms) {
      expect(charism.cautions.length, charism.id).toBeGreaterThan(0);
      expect(charism.scripture.length, charism.id).toBeGreaterThan(0);
      expect(charism.magisterium.length, charism.id).toBeGreaterThan(0);
    }
  });

  it('separa carismas de manifestação e de serviço', () => {
    expect(carismOfServiceIds.length).toBeGreaterThan(0);
    expect(carismOfServiceIds.length).toBeLessThan(charisms.length);
  });
});

describe('grupo de oração', () => {
  it('tem os três momentos de Atos 2', () => {
    expect(groupMoments.map((moment) => moment.id)).toEqual([
      'nucleo',
      'reuniao',
      'perseveranca',
    ]);
    expect(groupMoments.every((moment) => moment.scripture.startsWith('At 2'))).toBe(true);
  });

  it('a reunião tem exatamente três polos', () => {
    const poles = prayerMeetingElements.filter((element) => element.central);
    expect(poles).toHaveLength(3);
    expect(poles.map((pole) => pole.name)).toEqual([
      'Louvor',
      'Efusão do Espírito Santo',
      'Pregação querigmática',
    ]);
  });

  it('os elementos têm ordem e todos trazem um erro comum mapeado', () => {
    const orders = prayerMeetingElements.map((element) => element.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
    expect(prayerMeetingElements.every((element) => element.pitfall !== undefined)).toBe(true);
  });
});

describe('SVES', () => {
  it('tem nove semanas numeradas em sequência', () => {
    expect(svesSessions).toHaveLength(9);
    expect(svesSessions.map((session) => session.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('o roteiro alternativo também tem nove títulos', () => {
    expect(svesAlternativeOutline).toHaveLength(9);
  });

  it('a semana do batismo no Espírito é a oitava', () => {
    expect(svesSessions[7]?.title).toBe('Batismo no Espírito Santo');
  });
});

describe('formação', () => {
  it('tem as três fases representadas', () => {
    const phases = new Set(formationStages.map((stage) => stage.phase));
    expect(phases).toEqual(new Set(['querigma', 'basico', 'especifico']));
  });

  it('traz MB1 a MB8 e FH1 a FH3', () => {
    const ids = formationStages.map((stage) => stage.id);
    for (const id of ['mb1', 'mb2', 'mb3', 'mb4', 'mb5', 'mb6', 'mb7', 'mb8', 'fh1', 'fh2', 'fh3']) {
      expect(ids, id).toContain(id);
    }
  });
});

describe('discernimento', () => {
  it('traz os cinco critérios de eclesialidade da ChL 30', () => {
    const ids = discernmentCriteria.map((criterion) => criterion.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'primado-da-vocacao',
        'confissao-da-fe',
        'comunhao',
        'missao',
        'caridade',
      ]),
    );
  });

  it('registra o alerta da CNBB sobre o repouso no Espírito', () => {
    const warning = pastoralWarnings.find((item) => item.id === 'repouso');
    expect(warning).toBeDefined();
    expect(warning?.source).toContain('66');
  });

  it('registra o alerta sobre imitação de gestos sacramentais', () => {
    const warning = pastoralWarnings.find((item) => item.id === 'sacramentalidade');
    expect(warning?.guidance).toMatch(/Ritual de Bênçãos/);
  });

  it('registra o alerta sobre profecias que controlam decisões', () => {
    expect(pastoralWarnings.some((item) => item.id === 'profecias-de-controle')).toBe(true);
  });
});

describe('ministérios, história e glossário', () => {
  it('lista os ministérios com o que fazem e o que exigem', () => {
    expect(ministries.length).toBeGreaterThanOrEqual(12);
    for (const ministry of ministries) {
      expect(ministry.serves.length, ministry.id).toBeGreaterThan(0);
      expect(ministry.requirements.length, ministry.id).toBeGreaterThan(0);
    }
  });

  it('a linha do tempo está em ordem cronológica crescente', () => {
    const years = historyTimeline.map((event) => Number(event.year));
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it('o glossário define os termos sem repetir verbete', () => {
    const terms = glossary.map((entry) => entry.term.toLowerCase());
    expect(new Set(terms).size).toBe(terms.length);
  });

  it('nenhum documento aponta para URL inventada de terceiros', () => {
    for (const document of rccDocuments) {
      if (document.url === null) continue;
      const host = new URL(document.url).hostname;
      expect(['www.vatican.va', 'vatican.va']).toContain(host);
    }
  });
});
