import { DB_VERSION } from '../../database/schema';
import { clearAllStores, dumpDatabase, isIndexedDBAvailable, restoreDatabase } from './idb';

/**
 * Exportação e exclusão de dados pessoais.
 *
 * O arquivo gerado fica inteiramente no dispositivo do usuário: nenhum upload
 * é feito. O formato inclui uma versão para permitir migrações futuras.
 */

export const BACKUP_FORMAT = 'sopro-backup';
export const BACKUP_VERSION = 1;

export interface BackupFile {
  format: typeof BACKUP_FORMAT;
  version: number;
  databaseVersion: number;
  exportedAt: string;
  data: Record<string, unknown[]>;
}

export async function buildBackup(): Promise<BackupFile> {
  if (!isIndexedDBAvailable()) {
    throw new Error('O armazenamento local não está disponível neste navegador.');
  }
  const data = await dumpDatabase();
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    databaseVersion: DB_VERSION,
    exportedAt: new Date().toISOString(),
    data: data as Record<string, unknown[]>,
  };
}

export function downloadBackup(backup: BackupFile): void {
  const stamp = backup.exportedAt.slice(0, 10);
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `sopro-dados-${stamp}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function validateBackup(payload: unknown): BackupFile {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Arquivo inválido.');
  }
  const candidate = payload as Partial<BackupFile>;
  if (candidate.format !== BACKUP_FORMAT) {
    throw new Error('Este arquivo não é uma cópia de segurança do SOPRO.');
  }
  if (typeof candidate.data !== 'object' || candidate.data === null) {
    throw new Error('O arquivo não contém dados reconhecíveis.');
  }
  return candidate as BackupFile;
}

/** Importa um backup, substituindo o conteúdo atual. */
export async function restoreBackup(backup: BackupFile): Promise<void> {
  await clearAllStores();
  await restoreDatabase(backup.data);
}

/** Exclusão integral dos dados pessoais. */
export async function eraseAllData(): Promise<void> {
  if (!isIndexedDBAvailable()) return;
  await clearAllStores();
}
