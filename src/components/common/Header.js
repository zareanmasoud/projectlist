import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav">
              <li className="nav-item">
                <IndexLink className="nav-link" to="/" activeClassName="active">Home <span className="sr-only">(current)</span></IndexLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects" activeClassName="active">Projects</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" activeClassName="active">About</Link>
              </li>
            </ul>
            {loading && <LoadingDots interval={300} dots={5}/>}
          </div>
        </div>
      </nav>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Header;
