import { z } from 'zod';

/**
 * Validação da resposta da API comunitária Dancrf/liturgia-diaria (v2).
 *
 * Documentação: https://github.com/Dancrf/liturgia-diaria/blob/main/docs/v2/README.md
 * A validação é tolerante: campos opcionais podem faltar, mas a estrutura
 * mínima precisa existir para que os dados sejam considerados confiáveis.
 */

const optionSchema = z
  .object({
    referencia: z.string().nullish(),
    titulo: z.string().nullish(),
    refrao: z.string().nullish(),
    texto: z.string(),
    tipo: z.string().nullish(),
  })
  .passthrough();

const readingArray = z.array(optionSchema).nullish();

const extraSchema = z.object({
  titulo: z.string(),
  texto: z.string(),
});

export const liturgyV2Schema = z
  .object({
    data: z.string().min(1),
    liturgia: z.string().min(1),
    cor: z.string().nullish(),
    oracoes: z
      .object({
        coleta: z.string().nullish(),
        oferendas: z.string().nullish(),
        comunhao: z.string().nullish(),
        extras: z.array(extraSchema).nullish(),
      })
      .partial()
      .nullish(),
    leituras: z
      .object({
        primeiraLeitura: readingArray,
        salmo: readingArray,
        segundaLeitura: readingArray,
        evangelho: readingArray,
        extras: readingArray,
      })
      .partial()
      .nullish(),
    antifonas: z
      .object({
        entrada: z.string().nullish(),
        comunhao: z.string().nullish(),
      })
      .partial()
      .nullish(),
  })
  .passthrough();

export type LiturgyV2Response = z.infer<typeof liturgyV2Schema>;

export const liturgyErrorSchema = z.object({
  erro: z.string(),
  data: z.string().nullish(),
});
