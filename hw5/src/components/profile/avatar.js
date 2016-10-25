import React from 'react'
import { connect } from 'react-redux'

const Avatar = () => (
	<div className="col-sm-4">
        <p><img src="figures/bird.jpg" className="img-rounded user"></img></p>
        <div className="col-sm-8">
        	<input type="file" className="form-control" id="uploadPhoto" value="Upload your photo"></input>
        </div>
        <div className="col-sm-4">
        </div>
        <br/><br/>
        <h2 className="form-signin-heading">Current Info</h2>
        <label className="control-label col-sm-12"><span id ="displayName">Rixiang</span></label>
        <label className="control-label col-sm-12"><span id="email">xiang.li@rice.edu</span></label>
        <label className="control-label col-sm-12"><span id="phoneNum">713-348-6000</span></label>
        <label className="control-label col-sm-12">01-01-1989</label>
        <label className="control-label col-sm-12"><span id="zipCode">77005</span></label>
        <label className="control-label col-sm-12" style={{visibility: "hidden"}}> ><span id="pwd">123456</span></label> 
		<label className="control-label col-sm-12" style={{visibility: "hidden"}}><span id="pwdConf">123456</span></label>       
    </div>
);

export default connect(null, null)(Avatar);