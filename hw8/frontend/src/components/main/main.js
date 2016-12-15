import React from 'react'
import { connect } from 'react-redux'

import NavMain from './navMain'
import Headline from './headline'
import Followers from './followers'
import Articles from './articles'
import AddArticle from './addArticle'

const Main = () => {
	return (
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
		                <AddArticle/>
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
}

export default connect(null, null)(Main);

