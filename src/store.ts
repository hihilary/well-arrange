import {createStore} from 'redux'
import {IStoreState} from './interface'
import {myReducer} from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

// 不打括号，换行可能造成误解，这里可以不打括号
/* tslint-disable */
const store = (
    createStore<IStoreState, any, {}, {}>(
    myReducer, 
    composeWithDevTools()
    )
)   
/* tslint-enable */

export default store