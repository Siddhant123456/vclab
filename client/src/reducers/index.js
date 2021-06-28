import {combineReducers} from 'redux';

import {authReducer} from './auth'
import { classReducer } from './class';
export default combineReducers({authData : authReducer , classes : classReducer});