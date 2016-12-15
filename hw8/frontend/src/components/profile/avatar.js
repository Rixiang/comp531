import React from 'react'
import { connect } from 'react-redux'

import { updateAvatar, enableUpdateBtn } from '../../actions/updateAction'

const Avatar = ({ username, headlines, email, dob, zipcode, img, updated, avatars, disabled, update, enableUpdateBtn }) => {
    let user = "";
    if (username != ""){
        user = username;
    }else{
        user = headlines[headlines.length - 1].username;
    }
    console.log(user);
    if (!updated){
        img = avatars[user];
    }
	return (
        <div className="col-sm-4">
            <p><img src={img} className="img-rounded user" style={{width: "70%"}}></img></p>
            <div className="col-sm-6">
            	<input type="file" accept="image/*" className="form-control" id="uploadPhoto" onChange={ enableUpdateBtn }></input>
            </div>
            <div className="col-sm-3">
                <button className="btn btn-primary btn-block" id="updateAvatarBtn" onClick={ update } disabled={ disabled }>
                    <span style={{"fontSize": "11"}}>Update</span>
                </button>
            </div>
            <div className="col-sm-3">
            </div>

            <br/><br/><br/><br/>
            <h2 className="form-signin-heading">Current Info</h2>
            <label className="control-label col-sm-12"><span id ="displayName">{user}</span></label>
            <label className="control-label col-sm-12"><span id="email">{email}</span></label>
            <label className="control-label col-sm-12"><span id="dob">{dob}</span></label>
            <label className="control-label col-sm-12"><span id="zipCode">{zipcode}</span></label>
            <label className="control-label col-sm-12" style={{visibility: "hidden"}}><span id="phoneNum"></span></label>  
            <label className="control-label col-sm-12" style={{visibility: "hidden"}}><span id="pwd"></span></label>
            <label className="control-label col-sm-12" style={{visibility: "hidden"}}><span id="pwdConf"></span></label>  
        </div>
    );
}

const mapStateToProps = state => ({ username: state.logIn.username, email: state.profile.email, dob: state.profile.dob, 
                                    zipcode: state.profile.zipcode, img: state.profile.avatar, 
                                    avatars: state.profile.avatars, updated: state.profile.updated, 
                                    disabled: state.profile.avatarUpdateBtnDis, headlines: state.main.headlines });

const mapDispatchToProps = dispatch => ({ enableUpdateBtn: () => ( enableUpdateBtn(dispatch)), 
                                          update: () => ( updateAvatar(dispatch)) });

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);