# Política de privacidade do SOPRO

**Última atualização:** 15 de novembro de 2026
**Versão:** 1.0 (MVP)

O SOPRO é um aplicativo gratuito, open-source e comunitário para organização da
vida espiritual católica. Esta política descreve, de forma direta, quais dados
existem, onde ficam e o que fazemos com eles.

> A mesma informação está disponível dentro do app, em **Privacidade**.

## 1. Resumo em três linhas

1. **Não há conta, login nem cadastro.**
2. **Seus dados espirituais ficam apenas no seu dispositivo.**
3. **A única conexão externa é a consulta da liturgia do dia, que envia somente a data.**

## 2. Dados armazenados no dispositivo

Guardados no IndexedDB do navegador, sob o banco `sopro`:

| Categoria                  | Conteúdo                                                      | Obrigatório? |
| -------------------------- | ------------------------------------------------------------- | ------------ |
| Configurações              | nome de exibição (opcional), tema, horários de oração         | não          |
| Diário espiritual          | data, título, texto, movimento interior                       | não          |
| Intenções                  | texto, pessoa, data, marcação de atendida                     | não          |
| Hábitos e marcações        | título do hábito, tipo, datas de realização                   | não          |
| Versículos favoritos       | referência, texto, nota                                       | não          |
| Plano de vida              | itens de compromisso                                          | não          |
| Calendário                 | compromissos, horários, local, recorrências, notas            | não          |
| Grupo de oração            | nome, dia, horário, local, observações                        | não          |
| Favoritos                  | referências a orações e conteúdos marcados                    | não          |
| Histórico de atividades    | registro local de ações no app                                | não          |
| Cache de liturgia          | última liturgia consultada, para leitura offline              | automático   |

Todos esses dados são **opcionais e informados por você**. O aplicativo funciona
sem nenhum deles.

## 3. Base legal e finalidade (LGPD)

Tratamos dados pessoais no seu próprio dispositivo, sob seu controle direto. Não
há transmissão a terceiros, não há perfilamento e não há tomada de decisão
automatizada. A finalidade é exclusivamente fornecer as funcionalidades que você
escolhe usar.

Dados de convicção religiosa são classificados como **dados pessoais sensíveis**
pela LGPD (Lei 13.709/2018, art. 5º, II). Por isso, o projeto adota:

- coleta mínima (nada além do informado por você);
- armazenamento estritamente local;
- controle total do titular (exportar, importar, apagar);
- ausência de compartilhamento.

## 4. A única conexão externa

Para exibir a liturgia, o app consulta a API comunitária
**[Dancrf/liturgia-diaria](https://github.com/Dancrf/liturgia-diaria)**.

- **Enviado:** a data desejada (`dia`, `mes`, `ano`) e os cabeçalhos HTTP padrão do navegador.
- **Não enviado:** nome, diário, intenções, hábitos, compromissos, favoritos — nada disso.
- **Retornado:** textos litúrgicos, guardados em cache no seu dispositivo.

Como em qualquer requisição HTTP, o servidor da API pode registrar o endereço IP de
origem. O SOPRO não controla esse registro. Se você preferir não fazer nem essa
consulta, o app continua funcionando com o conteúdo já salvo.

Nenhum outro domínio é contactado. **Não há analytics, pixels, rastreadores ou
publicidade.**

## 5. Cookies

O SOPRO não usa cookies de rastreamento. O navegador pode armazenar dados técnicos
do service worker (PWA), que servem apenas para o funcionamento offline.

## 6. Compartilhamento de dados

**Nenhum.** Não vendemos, alugamos, compartilhamos nem transferimos dados a
terceiros. Não há processadores, subcontratados ou transferência internacional.

## 7. Segurança

- Os dados ficam protegidos pela segurança do seu navegador e do seu dispositivo.
- O SOPRO **não criptografa** adicionalmente o armazenamento local — isso é uma
  limitação honesta, não uma promessa vazia.
- Em dispositivos compartilhados, use navegação privada ou apague os dados ao sair.
- Não armazenamos senhas nem dados de pagamento (não existem contas nem compras).

## 8. Seus direitos

Você pode, a qualquer momento, sem justificar e sem custo:

- **Acessar** tudo o que está salvo: exporte em JSON em *Minha caminhada →
  Configurações → Exportar cópia de segurança*.
- **Corrigir** qualquer registro editando ou excluindo no próprio app.
- **Excluir integralmente**: *Configurações → Excluir tudo* (ou limpar os dados do
  site no navegador).
- **Portabilidade**: o arquivo JSON exportado é legível e estruturado.

Como não temos seus dados em servidores, não há transmissão a ser solicitada.

## 9. Crianças e adolescentes

O app não coleta dados de ninguém, em nenhuma faixa etária. Recomendamos que menores
usem sob orientação de responsáveis, especialmente no diário.

## 10. Doações

O link de doação no rodapé é **opcional** e só aparece se uma URL estiver
configurada. Ao clicar, você sai do SOPRO e vai para um serviço externo, com sua
própria política de privacidade. O app não registra se você doou ou não, e doações
não desbloqueiam nenhuma funcionalidade.

## 11. Se o projeto evoluir

Funcionalidades futuras (sincronização, conta opcional, notificações push)
implicariam tratamento de dados fora do dispositivo. Nesse caso:

- haverá revisão específica de segurança e de adequação à LGPD **antes** de
  qualquer lançamento;
- os recursos serão optativos;
- esta política será atualizada com antecedência e com registro de versão.

## 12. Contato

Dúvidas, solicitações ou relatos de problema de privacidade:
abra uma issue em <https://github.com/omurilomota/SOPRO/issues> ou escreva para o
mantenedor indicado no repositório.

## 13. Alterações desta política

Toda mudança relevante será registrada no histórico do arquivo (`git log PRIVACY.md`)
e destacada na versão do aplicativo. A data no topo indica a última revisão.
