import React from 'react'
import { connect } from 'react-redux'

const Followers = () => (
	<div>
	    <div className="well">
	        <img src="figures/pipi.jpg" className="img-rounded friend" height="65" width="65" alt="Avatar"></img>
	        <h3>Pipi</h3>
	        <p><span id="currentStatus">Busy on maimeng!</span></p>
	        <button type="button" className="btn btn-default btn-sm " id="unfollowPipi">Unfollow</button>
	    </div>

	    <div className="well">
	        <img src="figures/evita.jpg" className="img-rounded friend" height="65" width="65" alt="Avatar"></img>
	        <h3>Evita</h3>
	        <p><span id="currentStatus">Busy on leetcode!</span></p>
	        <button type="button" className="btn btn-default btn-sm " id="unfollowEvita">Unfollow</button>
	    </div>

	    <div className="well">
	        <img src="figures/brenda.jpg" className="img-rounded friend" height="65" width="65" alt="Avatar"></img>
	        <h3>Brenda</h3>
	        <p><span id="currentStatus">Busy on liaohan!</span></p>
	        <button type="button" className="btn btn-default btn-sm " id="unfollowBrenda">Unfollow</button>
	    </div>

	    <div className="well">
	        <div className=" col-sm-9">
	            <input type="text" className="form-control" placeholder="add friends..." id="txfAddFriend"></input>
	        </div>
	        <div>
	            <button type="button" className="btn btn-default btn-sm " id="btnAddFriend">Add</button>
	        </div>
	    </div>
    </div>
)

export default connect(null, null)(Followers);