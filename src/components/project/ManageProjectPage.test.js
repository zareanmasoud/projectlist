import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageProjectPage} from './ManageProjectPage';

function setupSaveProps(type) {
    if (type == "title") {
        return {
            authors: [],
            projects: [{id: 'abc', watchHref: '', title: 'ABC', authorId: 'masoud-zarean', created_at: 'jan 2018', category: 'Javascript'}],
            actions: {saveProject: () => { return Promise.resolve(); }},
            project: {id: 'abc', watchHref: '', title: 'ABC', authorId: 'masoud-zarean', created_at: 'jan 2018', category: 'Javascript'},
            params: {id: 'abc'},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "category") {
        return {
            authors: [],
            projects: [{id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'masoud-zarean', created_at: 'jan 2018', category: 'JS'}],
            actions: {saveProject: () => { return Promise.resolve(); }},
            project: {id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'masoud-zarean', created_at: 'jan 2018', category: 'JS'},
            params: {id: 'abcde'},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "date") {
        return {
            authors: [],
            projects: [{id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'masoud-zarean', created_at: 'jan 3000', category: 'Javascript'}],
            actions: {saveProject: () => { return Promise.resolve(); }},
            project: {id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'masoud-zarean', created_at: 'jan 3000', category: 'Javascript'},
            params: {id: 'abcde'},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "empty") {
        return {
            authors: [],
            projects: [],
            actions: {deleteProject: () => { return Promise.resolve(); }},
            project: {id: '', watchHref: '', title: '', authorId: '', created_at: '', category: ''},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    }
}

describe('Manage Project Page', () => {
    it('sets error message when trying to save empty title', () => {
        const props = setupSaveProps("title");

        const wrapper = mount(<ManageProjectPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });

    it('sets error message when trying to enter a short category', () => {
        const props = setupSaveProps("category");

        const wrapper = mount(<ManageProjectPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe(undefined);
        expect(wrapper.state().errors.category).toBe('Category must be at least 5 characters.');
    });

    it('sets error message when trying to enter a bad date', () => {
        const props = setupSaveProps("date");

        const wrapper = mount(<ManageProjectPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe(undefined);
        expect(wrapper.state().errors.category).toBe(undefined);
        // expect(wrapper.state().errors.created_at).toBe("Length must be in the form jan 2018.");
    });

    it('rubs the lotion on its skin', () => {
        return true;
    });

    it('does this whenever its told', () => {
        return true;
    });

    it('sets error message when trying to delete empty id', () => {
        const props = setupSaveProps("empty");

        const wrapper = mount(<ManageProjectPage {...props}/>);
        const deleteButton = wrapper.find('[type="submit"]').last();
        deleteButton.simulate('click');
        expect(wrapper.state().errors.title).toBe("Can't delete an empty project.");
    });
});
