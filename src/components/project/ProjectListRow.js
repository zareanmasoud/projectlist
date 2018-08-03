import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ProjectListRow = ({project}) => {
    return (
        <tr>
            <td><a href={project.watchHref} target="_blank">Link</a></td>
            <td><Link to={'/project/' + project.id}>{project.title}</Link></td>
            <td>{project.authorId}</td>
            <td>{project.category}</td>
            <td>{project.created_at}</td>
        </tr>
    );
};

ProjectListRow.propTypes = {
    project: PropTypes.object.isRequired
};

export default ProjectListRow;
