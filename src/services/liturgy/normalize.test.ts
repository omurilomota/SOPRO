import { describe, expect, it } from 'vitest';
import { liturgyMatchesDate, normalizeColor, normalizeV2, parseProviderDate } from './normalize';
import { liturgyV2Schema } from './schema';

/** Resposta real da API (resumida), capturada de https://liturgia.up.railway.app/v2/. */
const REAL_RESPONSE = {
  data: '15/11/2026',
  liturgia: '33º Domingo do Tempo Comum',
  cor: 'Verde',
  oracoes: {
    coleta: 'Senhor nosso Deus, concedei-nos a graça...',
    oferendas: 'Nós vos pedimos, Senhor...',
    comunhao: 'Alimentados, Senhor...',
    extras: [],
  },
  leituras: {
    primeiraLeitura: [
      {
        referencia: 'Pr 31,10-13.19-20.30-31',
        titulo: 'Leitura do livro dos Provérbios',
        texto: '10Uma mulher forte, quem a encontrará?...',
      },
    ],
    salmo: [
      {
        referencia: 'Sl 127(128)',
        refrao: 'Felizes os que temem o Senhor e trilham seus caminhos!',
        texto: '– Feliz és tu se temes o Senhor...',
      },
    ],
    segundaLeitura: [
      {
        referencia: '1Ts 5,1-6',
        titulo: 'Leitura da primeira carta de São Paulo aos Tessalonicenses',
        texto: '1Quanto ao tempo e à hora...',
      },
    ],
    evangelho: [
      {
        referencia: 'Mt 25,14-30',
        titulo: 'Proclamação do Evangelho de Jesus Cristo segundo Mateus',
        texto: '[Naquele tempo, Jesus contou esta parábola...]',
      },
    ],
    extras: [],
  },
  antifonas: {
    entrada: 'Meus pensamentos são de paz...',
    comunhao: 'Para mim só há um bem...',
  },
};

describe('parseProviderDate', () => {
  it('converte dd/mm/aaaa em ISO sem passar por UTC', () => {
    expect(parseProviderDate('15/11/2026')).toBe('2026-11-15');
    expect(parseProviderDate('01/02/2080')).toBe('2080-02-01');
  });

  it('rejeita datas impossíveis', () => {
    expect(parseProviderDate('31/02/2026')).toBeNull();
    expect(parseProviderDate('00/00/0000')).toBeNull();
    expect(parseProviderDate('texto qualquer')).toBeNull();
  });

  it('aceita ISO já normalizado', () => {
    expect(parseProviderDate('2026-11-15')).toBe('2026-11-15');
  });
});

describe('normalizeColor', () => {
  it('mapeia as cores oficiais da fonte', () => {
    expect(normalizeColor('Verde')).toBe('verde');
    expect(normalizeColor('vermelho')).toBe('vermelho');
    expect(normalizeColor('Rosa')).toBe('rosa');
    expect(normalizeColor('Branco')).toBe('branco');
  });

  it('nunca inventa cor: desconhecida quando não reconhece', () => {
    expect(normalizeColor('Azul')).toBe('desconhecida');
    expect(normalizeColor(null)).toBe('desconhecida');
  });
});

describe('normalizeV2', () => {
  it('valida e normaliza a resposta real da API', () => {
    const parsed = liturgyV2Schema.safeParse(REAL_RESPONSE);
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    const liturgy = normalizeV2(parsed.data, { provider: 'teste', providerUrl: null });
    expect(liturgy).not.toBeNull();
    expect(liturgy?.date).toBe('2026-11-15');
    expect(liturgy?.celebrations).toHaveLength(1);

    const celebration = liturgy!.celebrations[0]!;
    expect(celebration.title).toBe('33º Domingo do Tempo Comum');
    expect(celebration.color).toBe('verde');
    expect(celebration.readings.map((reading) => reading.kind)).toEqual([
      'reading',
      'psalm',
      'reading',
      'gospel',
    ]);
    expect(celebration.readings[1]?.options[0]?.refrain).toContain('Felizes os que temem');
    expect(celebration.prayers.collect).toContain('concedei-nos a graça');
    expect(celebration.antiphons.entrance).toContain('pensamentos são de paz');
    expect(liturgy?.season?.key).toBe('comum');
  });

  it('preserva formas longa e breve como opções da mesma leitura', () => {
    const parsed = liturgyV2Schema.safeParse({
      data: '19/04/2025',
      liturgia: 'Sábado Santo - Vigília Pascal',
      cor: 'Branco',
      leituras: {
        primeiraLeitura: [
          { referencia: 'Gn 1, 1-2, 2 (Forma Longa)', texto: 'Longa...' },
          { referencia: 'Gn 1, 1. 26-31a (Forma Breve)', texto: 'Breve...' },
        ],
      },
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    const liturgy = normalizeV2(parsed.data, { provider: 'teste', providerUrl: null });
    const first = liturgy?.celebrations[0]?.readings[0];
    expect(first?.options).toHaveLength(2);
    expect(first?.options[1]?.reference).toContain('Forma Breve');
  });

  it('ignora leituras sem texto em vez de preencher com conteúdo fictício', () => {
    const parsed = liturgyV2Schema.safeParse({
      data: '15/11/2026',
      liturgia: 'Teste',
      leituras: { primeiraLeitura: [{ referencia: 'X', texto: '   ' }] },
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    const liturgy = normalizeV2(parsed.data, { provider: 'teste', providerUrl: null });
    expect(liturgy?.celebrations[0]?.readings).toHaveLength(0);
  });

  it('rejeita respostas sem os campos mínimos', () => {
    expect(liturgyV2Schema.safeParse({ liturgia: 'X' }).success).toBe(false);
    expect(liturgyV2Schema.safeParse({ data: '15/11/2026' }).success).toBe(false);
    expect(liturgyV2Schema.safeParse({ data: '15/11/2026', liturgia: 'X' }).success).toBe(true);
  });

  it('retorna null quando a data não é interpretável', () => {
    const parsed = liturgyV2Schema.safeParse({ data: 'xxx', liturgia: 'Teste' });
    if (!parsed.success) return;
    expect(normalizeV2(parsed.data, { provider: 'teste', providerUrl: null })).toBeNull();
  });

  it('compara a data devolvida com a data pedida', () => {
    const parsed = liturgyV2Schema.safeParse(REAL_RESPONSE);
    if (!parsed.success) throw new Error('fixture inválida');
    const liturgy = normalizeV2(parsed.data, { provider: 'teste', providerUrl: null })!;
    expect(liturgyMatchesDate(liturgy, '2026-11-15')).toBe(true);
    expect(liturgyMatchesDate(liturgy, '2026-11-16')).toBe(false);
  });
});
