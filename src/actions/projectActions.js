import * as types from './actionTypes';
import ProjectApi from '../api/mockProjectApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadProjectsSuccess(projects) {
    return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function updateProjectSuccess(project) {
    return { type: types.UPDATE_PROJECT_SUCCESS, project };
}

export function createProjectSuccess(project) {
    return { type: types.CREATE_PROJECT_SUCCESS, project };
}

export function deleteProjectSuccess(project) {
    return { type: types.DELETE_PROJECT_SUCCESS, project };
}

export function projectChanged() {
    return { type: types.PROJECT_CHANGED };
}

export function loadProjects() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return ProjectApi.getAllProjects().then(projects => {
            dispatch(loadProjectsSuccess(projects));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function saveProject(project) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return ProjectApi.saveProject(project).then(savedProject => {
            project.id ? dispatch(updateProjectSuccess(savedProject)) :
                dispatch(createProjectSuccess(savedProject));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteProject(project) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return ProjectApi.deleteProject(project).then(deletedProject => {
            dispatch(deleteProjectSuccess(deletedProject));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}
