import React from 'react'
import { connect } from 'react-redux'

import { updateHeadline } from '../../actions/headlineAction'

const Headline = ({ headline, updateHeadline }) => (
	<div className="well">
	    <img src="figures/bird.jpg" className="img-rounded"></img>
	    <h3>Rixiang</h3>
	    <p><span id="currentStatus"> { headline } </span></p>
	    <p><input type="text" className="form-control" placeholder="share..." id="txfUploadStatus"></input></p>
	    <div  className=" col-sm-offset-9">
	        <button type="button" className="btn btn-primary btn-sm " id="btnUploadStatus" onClick={ updateHeadline }>Update</button>
	    </div>
	</div>
)

const mapStateToProps = (state) => ({ headline: state.main.headline});
const mapDispatchToProps = (dispatch) => ({ updateHeadline: () => (updateHeadline(dispatch)) });


export default connect(mapStateToProps, mapDispatchToProps)(Headline);