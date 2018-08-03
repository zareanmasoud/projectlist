import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as projectActions from '../../actions/projectActions';
import ProjectForm from './ProjectForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import NotFoundPage from '../common/NotFoundPage';
import {withRouter} from 'react-router';

export class ManageProjectPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            project: {...props.project},
            errors: {},
            saving: false,
            deleting: false,
            dirty: false
        };

        this.updateProjectState = this.updateProjectState.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

/// improve appearance on this (and the author analogue)
    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.dirty == true)
                return 'You have not saved your changes.  Are you sure you want to leave this page?';
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.project == null || nextProps.project == null ||
            (this.props.project.id != nextProps.project.id)) {
            this.setState({project: {...nextProps.project}});
        }
    }

    updateProjectState(event) {
        const field = event.target.name;
        let project = this.state.project;
        project[field] = event.target.value;
        return this.setState({project: project, dirty: true});
    }

    // dateIsValid(date) {
    //     if (/^[a-z]?[a-z]?[a-z] [1-2]?[0-9]$/.test(date)) {
    //         return true;
    //     }
    //     return false;
    // }

    projectFormIsValid(mode) {
        let formIsValid = true;
        let errors = {};

        if (mode == "save") {
            if (this.state.project.title.length < 5) {
                errors.title = 'Title must be at least 5 characters.';
                formIsValid = false;
            } else if (this.state.project.category.length < 5) {
                errors.category = 'Category must be at least 5 characters.';
                formIsValid = false;
            }
            // else if (!this.dateIsValid(this.state.project.created_at)) {
            //     errors.length = 'Date must be in the form jan 2018.';
            //     formIsValid = false;
            // }
        } else if (mode == "delete") {
            if (this.state.project.id == null || this.state.project.id == '') {
                errors.title = "Can't delete an empty project.";
                formIsValid = false;
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    saveProject(event) {
        event.preventDefault();

        if (!this.projectFormIsValid("save")) {
            return;
        }

        this.setState({saving: true});

        this.props.actions.saveProject(this.state.project)
            .then(() => this.redirect("save"))
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    deleteProject(event) {
        event.preventDefault();

        if (!this.projectFormIsValid("delete")) {
            return;
        }

        this.setState({deleting: true});

        this.props.actions.deleteProject(this.state.project)
            .then(() => this.redirect("delete"))
            .catch(error => {
                toastr.error(error);
                this.setState({deleting: false});
            });
    }

    redirect(mode) {
        let toast = "<<uninitialized>>";

        if (mode == "save") {
            this.setState({saving: false, dirty: false});
            toast = "Project saved";
        } else if (mode == "delete") {
            this.setState({deleting: false, dirty: false});
            toast = "Project deleted";
        }

        toastr.success(toast);
        this.context.router.push('/projects');
    }

    render() {
        if ((this.props.params.id != "" && this.props.params.id !== undefined) &&
            !this.props.projects.find(crs => crs.id == this.props.params.id)) {
            return (<NotFoundPage />);
        }
        else {
            return (
                <ProjectForm
                    allAuthors={this.props.authors}
                    onChange={this.updateProjectState}
                    onSave={this.saveProject}
                    onDelete={this.deleteProject}
                    project={this.state.project}
                    errors={this.state.errors}
                    saving={this.state.saving}
                    deleting={this.state.deleting}
                />
            );
        }
    }
}

ManageProjectPage.propTypes = {
    project: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    params: PropTypes.object,
    route: PropTypes.object,
    router: PropTypes.object
};

ManageProjectPage.contextTypes = {
    router: PropTypes.object
};

function getProjectById(projects, id) {
    const project = projects.filter(project => project.id == id);

    if (project.length) return project[0]; // filter returns an array -- grab the first one
    return null;
}

function mapStateToProps(state, ownProps) {
    const projectId = ownProps.params.id; // from the path '/project/:id'

    let project = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if (projectId && state.projects.length > 0) {
        project = getProjectById(state.projects, projectId);
    }

    return {
        project: project,
        authors: authorsFormattedForDropdown(state.authors),
        projects: [...state.projects]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageProjectPage));
