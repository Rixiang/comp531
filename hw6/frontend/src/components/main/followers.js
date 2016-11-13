import React from 'react'
import { connect } from 'react-redux'

import Follower from './follower'
import ErrorAddFollower from './errorAddFollower'
import { addFollower } from '../../actions/followingAction'

const Followers = ({ followers, headlines, avatars, addFollower }) => {
	let followerList = [];
	if (followers != null){
		followerList = followers.map( (o, idx) =>  {
			let username = headlines[idx].username;
			let headline = headlines[idx].headline;
			let avatar = avatars[username];
			//console.log(JSON.stringify(avatars));
			return <Follower avatar={avatar} username={username} headline={headline}/>;
		});
	}
			
	return (
		<div>
		{ followerList}

		<div className="well">
	        <div className=" col-sm-9">
	            <input type="text" className="form-control" placeholder="add friends..." id="txfAddFriend"></input>
	        </div>
	        <div>
	            <button type="button" className="btn btn-default btn-sm " id="btnAddFriend" onClick={addFollower}>Add</button>
	        </div>
	    </div>
	    <ErrorAddFollower/>	
    </div>
	);
}

const mapStateToProps = state => ({ followers: state.main.following, headlines: state.main.headlines, avatars: state.main.followerAvatars });

const mapDispatchToProps = dispatch => ({ addFollower: () => (addFollower(dispatch)) });


export default connect(mapStateToProps, mapDispatchToProps)(Followers);