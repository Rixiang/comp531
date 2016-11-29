import React from 'react'
import { connect } from 'react-redux'

import Register from './register'
import LogIn from './logIn'

const Landing = ({ getArticles }) => {
    
    const addTimeStamp = () => {
        var timestamp = new Date().getTime();
        document.getElementById("timestamp").value = timestamp;
    }

    window.addEventListener("load", addTimeStamp);

    return (
        <div>
            <div className="jumbotron text-center">
                <h1>Welcome to Rice Book</h1>
            </div>

            <div className="container">
                <div className="col-sm-6">
                     <Register/>
                </div>
                <div className="col-sm-1"></div>

                <div className="col-sm-4">
                    <LogIn/>
                </div>
                <div className="col-sm-1"></div>

            </div>

            <footer className="container-fluid text-center">
                <p>RiceBook © 2016</p>
                <p>Contact: xiang.li@rice.edu</p>
            </footer>
        </div>
    );
}


export default connect(null, null)(Landing);