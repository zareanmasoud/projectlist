import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageAuthorPage} from './ManageAuthorPage';

function setupSaveProps(type) {
    if (type == "firstName") {
        return {
            projects: [],
            authors: [],
            actions: {saveAuthor: () => { return Promise.resolve(); }},
            author: {lastName: 'Zarean'},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "lastName") {
        return {
            projects: [],
            authors: [],
            actions: {saveAuthor: () => { return Promise.resolve(); }},
            author: {firstName: 'Masoud'},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "dupe") {
        return {
            projects: [],
            authors: [{id: 'masoud-zarean', firstName: 'Masoud', lastName: 'Zarean'}],
            actions: {saveAuthor: () => { return Promise.resolve(); }},
            author: {id: '', firstName: 'Masoud', lastName: 'Zarean'},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "empty") {
        return {
            projects: [],
            authors: [{id: 'masoud-zarean', firstName: 'Masoud', lastName: 'Zarean'}],
            actions: {deleteAuthor: () => { return Promise.resolve(); }},
            author: {id: '', firstName: 'Masoud', lastName: 'Zarean'},
            params: {id: ''},
            router: {setRouteLeaveHook: () => {}}
        };
    } else if (type == "projectLink") {
        return {
            projects: [{id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'masoud-zarean', created_at: 'jan 2018', category: 'Javascript'}],
            authors: [{id: 'masoud-zarean', firstName: 'Matt', lastName: 'Wigdahl'}],
            actions: {deleteAuthor: () => { return Promise.resolve(); }},
            author: {id: 'masoud-zarean', firstName: 'Masoud', lastName: 'Zarean'},
            params: {id: 'masoud-zarean'},
            router: {setRouteLeaveHook: () => {}}
        };
    }
}

describe('Manage Author Page', () => {
    it('sets error message when trying to save empty first name', () => {
        const props = setupSaveProps("firstName");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.firstName).toBe('First name must be at least 1 character.');
    });

    it('sets error message when trying to enter empty last name', () => {
        const props = setupSaveProps("lastName");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.firstName).toBe(undefined);
        expect(wrapper.state().errors.lastName).toBe('Last name must be at least 1 character.');
    });

    it('sets error message when trying to enter a duplicate author', () => {
        const props = setupSaveProps("dupe");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.firstName).toBe("Can't insert a duplicate author.");
    });

    it('sets error message when trying to delete empty id', () => {
        const props = setupSaveProps("empty");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const deleteButton = wrapper.find('[type="submit"]').last();
        deleteButton.simulate('click');
        expect(wrapper.state().errors.firstName).toBe("Can't delete an unsaved author.");
    });

    it('sets error message when trying to delete an author linked to a project', () => {
        const props = setupSaveProps("projectLink");

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const deleteButton = wrapper.find('[type="submit"]').last();
        deleteButton.simulate('click');
        expect(wrapper.state().errors.firstName).toBe("Can't delete an author that's referenced by a project.");
    });
});
