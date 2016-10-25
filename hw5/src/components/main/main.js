import React from 'react'
import { connect } from 'react-redux'

import NavMain from './navMain'
import Headline from './headline'

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

		            <div className="row">
		                <div className="col-sm-3">
		                    <div className="well">
		                        <p><span>January 1, Evita:</span></p>
		                        <img src="figures/evita.jpg" className="img-circle user" ></img>
		                    </div>
		                </div>
		                <div className="col-sm-9">
			                <div className="well">
			                    <p>
			                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			                    </p>
			                    <button type="button" className="btn btn-primary btn-sm " id="edit"><span>   Edit   </span></button>
			                    <button type="button" className="btn btn-primary btn-sm " id="comment">Comment</button>
			                </div>
			            </div>
			        </div>

			        <div className="row">
			            <div className="col-sm-3">
			                <div className="well">
			                    <p><span>December 25, Brenda:</span></p>
			                    <img src="figures/brenda.jpg" className="img-circle user"></img>
			                </div>
			            </div>
			            <div className="col-sm-9">
			                <div className="well">
			                    <p>
			                        <img src="figures/ys1.jpg" id="december25" className="ys"></img>   		
			                    </p>
			                    <button type="button" className="btn btn-primary btn-sm " id="edit">  Edit  </button>
			                    <button type="button" className="btn btn-primary btn-sm " id="comment">Comment</button>
			                </div>
			            </div>
			        </div>

			        <div className="row">
			            <div className="col-sm-3">
			              	<div className="well">
			                  	<p><span>December 18, Pipi:</span></p>
			                  	<img src="figures/pipi.jpg" className="img-circle user"></img>
			              	</div>
			          	</div>
			          	<div className="col-sm-9">
			              	<div className="well">
			                	<p>
			                 		<img src="figures/ys2.jpg" id="december18" className="ys"></img>
			                	</p>
			                 	<button type="button" className="btn btn-primary btn-sm " id="edit">  Edit  </button>
			                 	<button type="button" className="btn btn-primary btn-sm " id="comment">Comment</button>
			             	</div>
			         	</div>
			        </div>

			        <div className="row">
			            <div className="col-sm-3">
			              	<div className="well">
			               		<p><span>December 2, Rixiang:</span></p>
			               		<img src="figures/bird.jpg" className="img-circle user"></img>
			           		</div>
				        </div>

				        <div className="col-sm-9">
				          	<div className="well">
				            	<p>
				               		Aenean eget tortor et ipsum convallis convallis non sit amet massa. Donec nec vestibulum sem. Sed et est molestie, congue magna vitae, aliquet lacus. Ut in scelerisque ante. Curabitur ultricies est id consectetur suscipit. In ut lectus congue, dapibus lectus nec, hendrerit augue. Nullam dignissim pretium dictum. Fusce maximus condimentum orci at aliquet. Donec dictum eget leo non vehicula. Morbi consectetur dictum eros in rutrum. Sed quis rhoncus risus. Aenean eget tortor et ipsum convallis convallis non sit amet massa. Donec nec vestibulum sem. Sed et est molestie, congue magna vitae, aliquet lacus. Ut in scelerisque ante. Curabitur ultricies est id consectetur suscipit. In ut lectus congue, dapibus lectus nec, hendrerit augue. Nullam dignissim pretium dictum. Fusce maximus condimentum orci at aliquet. Donec dictum eget leo non vehicula. Morbi consectetur dictum eros in rutrum. Sed quis rhoncus risus.
				           		</p>
				           		<button type="button" className="btn btn-primary btn-sm " id="edit">  Edit  </button>
				           		<button type="button" className="btn btn-primary btn-sm " id="comment">Comment</button>
				        	</div>
				        </div>
			        </div>


			        <div className="row">
			            <div className="col-sm-3">
			              	<div className="well">
				               	<p><span>November 3, Pipi:</span></p>
				               	<img src="figures/pipi.jpg" className="img-circle user"></img>
				           	</div>
				       	</div>

				        <div className="col-sm-9">
				          	<div className="well">
				            	<p>
				            		Curabitur quis malesuada neque. Nulla quis mi congue, auctor ante id, cursus nunc. Vivamus dui nisl, pharetra quis risus eu, mattis congue mi. In pellentesque hendrerit eros eget porta. Praesent ut metus suscipit, aliquam arcu a, euismod mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus, dui sed porttitor placerat, felis mauris hendrerit tortor, non aliquet metus mi non ligula. Nunc velit purus, hendrerit ac pellentesque at, scelerisque non justo. Fusce ligula ex, sagittis sit amet justo ac, scelerisque facilisis lectus. Ut in efficitur turpis. Mauris scelerisque dapibus ligula, vel molestie risus viverra a. Donec in ultrices mauris. Nunc vestibulum quam mauris, sed sollicitudin quam eleifend fermentum.
				           		</p>
				           		<button type="button" className="btn btn-primary btn-sm " id="edit">  Edit  </button>
				           		<button type="button" className="btn btn-primary btn-sm " id="comment">Comment</button>
				        	</div>
				        </div>
			        </div>

			        <div className="row">
			            <div className="col-sm-3">
			              	<div className="well">
			               		<p><span>October 4, Brenda:</span></p>
			               		<img src="figures/brenda.jpg" className="img-circle user"></img>
			           		</div>
			        	</div>

				        <div className="col-sm-9">
				          	<div className="well">

				           	<p> <img src="figures/ys3.jpg" id="october1" className="ys"></img></p>
				         	<button type="button" className="btn btn-primary btn-sm " id="edit">  Edit  </button>
				         	<button type="button" className="btn btn-primary btn-sm " id="comment">Comment</button>
				        	</div>
				        </div>
			        </div>

			        <div className="row">
			            <div className="col-sm-3">
			              	<div className="well">
			              		<p><span>October 1, Evita:</span></p>
			               		<img src="figures/evita.jpg" className="img-circle user"></img>
			           		</div>
			        	</div>
			        	<div className="col-sm-9">
			          		<div className="well">
			             		<p>
			               			Sed dictum malesuada ipsum, eget ornare enim molestie in. In id faucibus eros, at dapibus sem. Proin commodo nibh est, at porta magna auctor eu. Nunc sed elementum mauris. Mauris sollicitudin, nisl at finibus iaculis, velit diam ullamcorper arcu, quis luctus massa risus id turpis. Etiam vitae scelerisque risus. Nullam et facilisis nisi. Sed a libero posuere, facilisis odio vitae, gravida tortor. Ut vitae nunc augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed non ante augue.
			           			</p>
			           			<button type="button" className="btn btn-primary btn-sm " id="edit">  Edit  </button>
			           			<button type="button" className="btn btn-primary btn-sm " id="comment">Comment</button>
			        		</div>
			        	</div>
			        </div>

			        <div className="row">
			            <div className="col-sm-3">
			              	<div className="well">
				               	<p><span>September 25, Brenda:</span></p>
				               	<img src="figures/brenda.jpg" className="img-circle user"></img>
				           	</div>
				        </div>

				        <div className="col-sm-9">
				          	<div className="well">
				            	<p>
				            		<img src="figures/ys4.jpg" id="september25" className="ys"></img>
				         		</p>
				         		<button type="button" className="btn btn-primary btn-sm " id="edit">  Edit  </button>
				         		<button type="button" className="btn btn-primary btn-sm " id="comment">Comment</button>
				        	</div>
				        </div>
			    	</div>
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

