import {IAction} from './interface'

export const FILE_LOAD = 'FILE_LOAD'

export function fileLoad(which: string, file :any): IAction {
  return {
      type: FILE_LOAD,
      data: {which, file}
  }
}