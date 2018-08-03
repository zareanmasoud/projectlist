import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {ProjectsPage} from './ProjectsPage';
import {Provider} from 'react-redux';

function setup(numProjects, prefix) {
    let props = {projects: []};

    while(numProjects > 0) {
        props.projects.push({
            id: 'test-project-' + numProjects,
            title: (prefix == true ? String.fromCharCode(97+numProjects) + ' ' : '') + 'How To Test Stuff, Vol ' + numProjects
        });

        numProjects--;
    }

    return mount(<ProjectsPage {...props} />);
}

it('renders with no item count when there are no items', () => {
    const wrapper = setup(0, false);
    expect(wrapper.find('h1').text()).toEqual('Projects');
});

it ('renders with a singular item count when there is an item', () => {
    const wrapper = setup(1, false);
    expect(wrapper.find('h1').text()).toEqual('Projects (1 Entry)');
});

it ('renders with a plural item count when there is more than one an item', () => {
    const wrapper = setup(2, false);
    expect(wrapper.find('h1').text()).toEqual('Projects (2 Entries)');
});

it ('should sort alphabetically by title', () => {
    const wrapper = setup(4, true);
    expect(wrapper.props().projects == wrapper.props().projects.sort((a, b) => {
        return a.title.localeCompare(b.title);
    }));
});
