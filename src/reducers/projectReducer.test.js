import expect from 'expect';
import projectReducer from './projectReducer';
import * as actions from '../actions/projectActions';

describe('Project Reducer', () => {
    it('should add a project when passed CREATE_PROJECT_SUCCESS', () => {
        const initialState = [
            {title: 'A'},
            {title: 'B'}
        ];

        const newProject = {title: 'C'};

        const action = actions.createProjectSuccess(newProject);

        const newState = projectReducer(initialState, action);

        expect(newState.length).toEqual(3);
        expect(newState[0].title).toEqual('A');
        expect(newState[1].title).toEqual('B');
        expect(newState[2].title).toEqual('C');
    });

   it('should update a project when passed UPDATE_PROJECT_SUCCESS', () => {
        const initialState = [
            {id: 'a', title: 'A'},
            {id: 'b', title: 'B'},
            {id: 'c', title: 'C'}
        ];

        const project = {id: 'b', title: 'New Title'};
        const action = actions.updateProjectSuccess(project);

        const newState = projectReducer(initialState, action);
        const updatedProject = newState.find(crs => crs.id == project.id);
        const untouchedProject = newState.find(crs => crs.id == 'a');

        expect(newState.length).toEqual(3);
        expect(updatedProject.title).toEqual('New Title');
        expect(untouchedProject.title).toEqual('A');
    });

    it('should delete a project when passed DELETE_PROJECT_SUCCESS', () => {
        const initialState = [
            {id: 'a', title: 'A'},
            {id: 'b', title: 'B'},
            {id: 'c', title: 'C'}
        ];

        const project = {id: 'a', title: 'A'};
        const action = actions.deleteProjectSuccess(project);

        const newState = projectReducer(initialState, action);
        const undefinedIfNotDeleted = newState.find(crs => crs.id == project.id);

        expect(newState.length).toEqual(2);
        expect(undefinedIfNotDeleted).toEqual(undefined);
    });
});
