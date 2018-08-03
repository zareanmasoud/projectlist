import {combineReducers} from 'redux';
import projects from './projectReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    projects,
    authors,
    ajaxCallsInProgress
});

export default rootReducer;
