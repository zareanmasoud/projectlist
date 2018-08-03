import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as projectActions from '../actions/projectActions';
import * as authorActions from '../actions/authorActions';

describe('Store', function() {
    it('Should handle creating projects', function() {
        const store = createStore(rootReducer, initialState);

        const project = {
            title: "Clean Code"
        };

        const action = projectActions.createProjectSuccess(project);
        store.dispatch(action);

        const actual = store.getState().projects[0];
        const expected = {
            title: "Clean Code"
        };

        expect(actual).toEqual(expected);
    });

    it ('Should handle creating authors', function() {
        const store = createStore(rootReducer, initialState);

        const author = {
            id: 'matt-wigdahl',
            firstName: 'Matt',
            lastName: 'Wigdahl'
        };

        const action = authorActions.createAuthorSuccess(author);
        store.dispatch(action);

        const actual = store.getState().authors[0];
        const expected = {
            id: 'matt-wigdahl',
            firstName: 'Matt',
            lastName: 'Wigdahl'
        };

        expect(actual).toEqual(expected);
    });
});
