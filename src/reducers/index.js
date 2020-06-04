import { combineReducers } from 'redux';
import cityReducer from './cityReducer';

// todo if no more reducers remove combineReducers
export default combineReducers({ cityReducer });
