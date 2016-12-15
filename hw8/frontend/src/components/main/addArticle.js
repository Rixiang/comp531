import React from 'react'
import { connect } from 'react-redux'

import { postArticle } from '../../actions/articlesAction'

const AddArticle = ({ postArticle}) => (
	<div className="row">
        <div className="col-sm-12">
            <div className="panel panel-default text-left">
                <div className="panel-body">
                    <form >
                    	<div className="form-group col-sm-12">
                            <textarea className="form-control" id="postText" rows="4" placeholder="share..."></textarea><br/>
                            <input type="file" className="form-control" accept="image/*" id="postPhoto" name="upload a photo"></input>
                        </div>
                        <button type="reset" className="btn btn-primary btn-sm col-sm-offset-10">Clear</button>
                        <button type="button" className="btn btn-primary btn-sm " onClick={ postArticle } id="postArticleBtn"> Post </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);


const mapDispatchToProps = dispatch => ({ postArticle: _ => postArticle(dispatch) });

export default connect(null, mapDispatchToProps)(AddArticle);