import React, {PropTypes} from 'react';
import ProjectListRow from './ProjectListRow';

const ProjectList = ({projects}) => {
    if (projects.length == 0) {
        return (<div />);
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Created At</th>
            </tr>
            </thead>
            <tbody>
                {projects.map(project =>
                    <ProjectListRow key={project.id} project={project} />
                )}
            </tbody>
        </table>
    );
};

ProjectList.propTypes = {
    projects: PropTypes.array.isRequired
};

export default ProjectList;
