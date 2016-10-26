import React from 'react'
import { connect } from 'react-redux'

import NavMain from './navMain'
import Headline from './headline'
import Followers from './followers'
import Articles from './articles'

const Main = () => (
	<div>
		<NavMain/>

	    <div className="container-fluid text-center">
	        <div className="row">
	            <div className="col-sm-3 well">

	                <Headline/>

	                <div className="well">
	                    <p>Interests</p>
	                    <p>
	                        <span className="label label-default">Javascript</span>
	                        <span className="label label-primary">Java</span>
	                        <span className="label label-success">C++</span>
	                        <span className="label label-info">C#</span>
	                        <span className="label label-warning">SQL</span>
	                        <span className="label label-danger">Python</span>
	                    </p>
	                </div>

	                <Followers/>

	            </div>


	            <div className="col-sm-9">
	                <div className="row">
		                <div className="col-sm-12">
		                    <div className="panel panel-default text-left">
		                        <div className="panel-body">
		                            <form >
		                            	<div className="form-group col-sm-12">
		                                    <textarea className="form-control" id="post" rows="4" placeholder="share..."></textarea><br/>
		                                    <input type="file" className="form-control" id="uploadPhoto" value="Upload a photo" name="upload a photo"></input>
		                                </div>
		                                <button type="reset" className="btn btn-primary btn-sm col-sm-offset-10">Cancel</button>
		                                <button type="button" className="btn btn-primary btn-sm "> Post </button>
		                            </form>
		                        </div>
		                    </div>
		                </div>
		            </div>


		            <Articles/>


		        </div>
	        </div>
	    </div>
	    
	    <footer className="container-fluid text-center">
	        <p>RiceBook © 2016</p>
	        <p>Contact: xiang.li@rice.edu</p>
	    </footer>
	</div>
)


export default connect(null, null)(Main);

