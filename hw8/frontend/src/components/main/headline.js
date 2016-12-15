import React from 'react'
import { connect } from 'react-redux'

import { updateHeadline } from '../../actions/headlineAction'

const Headline = ({ avatars, username, headline, headlines, updated, updateHeadline}) => {
	let user = "";
	if (username != ""){
		user = username;
	}else{
		user = headlines[headlines.length - 1].username;
	}
	if (!updated){
        headline = headlines[headlines.length - 1].headline;
    };
    return (
		<div className="well">
		    <img src={avatars[user]} className="img-rounded"></img>
		    <h3 id="headlineUsername">{ user }</h3>
		    <p><span id="currentStatus"> { headline } </span></p>
		    <p><input type="text" className="form-control" placeholder="share..." id="txfUploadStatus"></input></p>
		    <div  className=" col-sm-offset-9">
		        <button type="button" className="btn btn-primary btn-sm " id="btnUploadStatus" onClick={ updateHeadline }>Update</button>
		    </div>
		</div>
	);
}

const mapStateToProps = state => ({ username: state.logIn.username, avatars: state.profile.avatars, headline: state.main.headline, 
									updated: state.main.headlineUpdated, headlines: state.main.headlines});

const mapDispatchToProps = dispatch => ({ updateHeadline: () => (updateHeadline(dispatch)) });


export default connect(mapStateToProps, mapDispatchToProps)(Headline);