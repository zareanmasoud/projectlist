import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
              <div className="col-sm-8 mx-auto">
                <h1>Project Administration</h1>
                <p>Using React, Redux, and React Router in ES6</p>
                <Link to="about" className="btn btn-info btn-lg">Learn more</Link>
              </div>
            </div>
        );
    }
}

export default HomePage;
