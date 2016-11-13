import React from 'react'
import { connect } from 'react-redux'

import { deleteFollower } from '../../actions/followingAction'

const Follower = ( {avatar, username, headline, deleteFollower} ) => (
	    <div className="well">
	        <img src={avatar} className="img-rounded friend" height="65" width="65" alt="Avatar"></img>
	        <h3>{username}</h3>
	        <p><span id="currentStatus">{headline}</span></p>
	        <button type="button" className="btn btn-default btn-sm " id="unfollowBtn" onClick={deleteFollower}>Unfollow</button>
	    </div>
)

const mapStateToProps = (state, ownProps) => ({ avatar: ownProps.avatar, username: ownProps.username, headline: ownProps.headline });
									  
const mapDispatchToProps = (dispatch, ownProps) => ({ deleteFollower: () => (deleteFollower(dispatch, ownProps.username)) });

export default connect(mapStateToProps, mapDispatchToProps)(Follower);

