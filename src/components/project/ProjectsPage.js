import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as projectActions from '../../actions/projectActions';
import ProjectList from './ProjectList';
import {browserHistory} from 'react-router';

export class ProjectsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddProjectPage = this.redirectToAddProjectPage.bind(this);
  }

  redirectToAddProjectPage() {
    browserHistory.push('/project');
  }

  render() {
    const {projects} = this.props;

    const numEntries = (projects.length == 0) ? "" : (" (" + projects.length + (projects.length > 1 ? " Entries)" : " Entry)"));

    return (
      <div>
        <h1>Projects{numEntries}</h1>
        <input type="submit"
               value="Add Project"
               className="btn btn-success add-project"
               onClick={this.redirectToAddProjectPage}/>
        <ProjectList projects={projects}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const mapped = {
    projects: [...state.projects].sort((a, b) => {
      return a.title.localeCompare(b.title);
    })
  };

  return mapped;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

ProjectsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
