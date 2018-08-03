import expect from 'expect';
import * as projectActions from './projectActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Project Actions', () => {
    describe('createProjectSuccess', () => {
        it('should create a CREATE_PROJECT_SUCCESS action', () => {
            //arrange
            const project = {id: 'clean-code', title: 'Clean Code'};
            const expectedAction = {
                type: types.CREATE_PROJECT_SUCCESS,
                project: project
            };

            const action = projectActions.createProjectSuccess(project);

            expect(action).toEqual(expectedAction);
        });
    });

    describe('deleteProjectSuccess', () => {
        it('should create DELETE_PROJECT_SUCCESS action', () => {
            //arrange
            const project = {id: 'clean-code', title: 'Clean Code'};
            const expectedAction = {
                type: types.DELETE_PROJECT_SUCCESS,
                project: project
            };

            const action = projectActions.deleteProjectSuccess(project);

            expect(action).toEqual(expectedAction);
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should create BEGIN_AJAX_CALL and LOAD_PROJECTS_SUCCESS when loading projects', (done) => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/projects')
        //   .reply(200, {body: {project [{id: 1, firstName: 'Cory', lastName: 'House'}] }});

        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_PROJECTS_SUCCESS, body: {projects: [{id: 'clean-code', title: 'Clean Code'}]}}
        ];

        const store = mockStore({projects: []}, expectedActions);
        store.dispatch(projectActions.loadProjects()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_PROJECTS_SUCCESS);
            done();
        });
    });
});

/// need test for PROJECT_CHANGED
