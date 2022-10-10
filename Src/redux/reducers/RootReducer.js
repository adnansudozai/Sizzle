import { combineReducers } from 'redux'
import userdataReducer from './userdataReducer'

const rootReducers = combineReducers({userdataReducer: userdataReducer, });


export default rootReducers


