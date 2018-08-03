import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ProjectForm = ({project, allAuthors, onSave, onDelete, onChange, saving, deleting, errors}) => {
    return (
        <form>
            <h1>ManageProject</h1>
            <TextInput
                name="title"
                label="Title"
                value={project.title}
                onChange={onChange}
                error={errors.title}/>
            <SelectInput
                name="authorId"
                label="Author"
                value={project.authorId}
                defaultOption="Select Author"
                options={allAuthors}
                onChange={onChange}
                error={errors.authorId}/>
            <TextInput
                name="category"
                label="Category"
                value={project.category}
                onChange={onChange}
                error={errors.category}/>
            <TextInput
                name="created_at"
                label="Created At"
                value={project.created_at}
                onChange={onChange}
                error={errors.created_at}/>
            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}/>
            <input
                type="submit"
                disabled={deleting}
                value={deleting ? 'Deleting...' : 'Delete'}
                className="btn btn-danger"
                onClick={onDelete}/>
        </form>
    );
};

ProjectForm.propTypes = {
    project: React.PropTypes.object.isRequired,
    allAuthors: React.PropTypes.array,
    onSave: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    deleting: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default ProjectForm;
