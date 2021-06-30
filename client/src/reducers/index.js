import {combineReducers} from 'redux';

import {authReducer} from './auth'
import { classReducer } from './class';
import { userReducer } from './user';
export default combineReducers({authData : authReducer , classes : classReducer , userProfile : userReducer});