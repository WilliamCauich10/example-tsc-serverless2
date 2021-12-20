/**
 * @description Logica de negocio del proceso usuarios
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import { TYPES } from 'tedious'
import { DbConstants } from '../../common/db/dbConstants'
import { DbManager } from '../../common/db/dbManager'
import { enumDB, enumDBEngine, enumConfigSource } from '../../common/db/enums'
import { DbParameter } from '../../common/model/dbParameter'
/**
 * Logica de negocios program
 */
export class UsuarioManager {
  /**
   * Contructor
   */
  constructor() {
    // this.dbManager = new DbManager(enumConfigSource.env)
  }

  /**
   *
   * @param {string?} userId
   * @return {Promise<object[] | undefined>}
   */
  getUsuarios(userId?: string): Promise<object[] | undefined> {
    // Se inicializa el manejador de BD
    const dbManager: DbManager = new DbManager()
    // Se asigna la configuracion y motor de BD
    dbManager.setConfiguration(enumDB.rds, enumDBEngine.mysql)

    const params: DbParameter[] = []

    if (userId) {
      params.push({ columnName: 'id', value: userId })
      // Se ejecuta el query
      return dbManager.executeStatement(DbConstants.CONST_DB_USUARIO_BY_ID, params)
    } else {
      // Se ejecuta el query
      return dbManager.executeStatement(DbConstants.CONST_DB_ALL_USUARIOS)
    }
  }
}
