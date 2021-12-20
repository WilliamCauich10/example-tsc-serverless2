/**
 * @description Lambda del proceso Usuarios
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import winston from 'winston'
import { CommonResponse } from '../../common/model/commonResponse'
import { ResponseManager } from '../../common/helpers/responseManager'
import { errorConstants } from '../../common/helpers/errorConstants'
import { UsuarioManager } from './manager'

/**
 * Funcion para obtener catalo de Usuarioas
 * @param {any} event Parametro enviado por API Gateway
 * @param {any} context Parametro enviado por API Gateway
 * @return {Promise<CommonResponse>} result Objeto serializado en JSON
 */
export async function getData(event: any, context: any): Promise<CommonResponse> {
  // Variables
  const usuarioManager = new UsuarioManager()
  const responseManager = new ResponseManager()

  try {
    // En el parametro event se encuentran los valores del Path y Query Params

    // Se realiza la consulta
    const result = await usuarioManager.getUsuarios()
    if (typeof result === 'undefined') {
      return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
    }
    // Se genera el response
    return responseManager.handleResponse(result)
  } catch (err) {
    // Se registra el error presentado
    winston.error(err)
    // Se entrega el error al lambda
    return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
  }
}

/**
 * Funcion para obtener catalod e Programas
 * @param {any} event Parametro enviado por API Gateway
 * @param {any} context Parametro enviado por API Gateway
 * @return {Promise<CommonResponse>} result Objeto serializado en JSON
 */
export async function getDataById(event: any, context: any): Promise<CommonResponse> {
  // Variables
  const usuarioManager = new UsuarioManager()
  const responseManager = new ResponseManager()

  try {
    // En el parametro event se encuentran los valores del Path y Query Params
    // Se realiza la consulta
    const result = await usuarioManager.getUsuarios(event.pathParameters.id)
    // Se genera el response
    return responseManager.handleResponse(result)
  } catch (err) {
    // Se registra el error presentado
    winston.error(err)
    // Se entrega el error al lambda
    return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
  }
}
