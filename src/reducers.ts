import {
  IAction,
  IStoreState,
} from './interface'

import {
  FILE_LOAD,
} from './actions'

export function myReducer(state :IStoreState={file1:'',file2:'',file3:'',file4:''}, 
  action :IAction) :IStoreState {
  switch (action.type) {
    case FILE_LOAD:
      const name :string = action.data.which
      return {
        ...state,
        [name]:action.data.file,
      }
    default:
      return state
  }
}