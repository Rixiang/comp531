import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'

import * as headlineActions from './headlineAction'


it('should update the status message', (done) => {
  
  // the result from the mocked AJAX call
  const username = 'sep1test'
  const headline = 'A new headline!'
  const url = 'https://webdev-dummy.herokuapp.com'

  fetch(`${url}/headline`, {
  	method: 'PUT',
  	headers: {'Content-Type':'application/json'},
  	json: { username, headline }
  })

  // review how complex actions work in Redux
  // updateHeadline returns a complex action
  // the complex action is called with dispatch as an argument
  // dispatch is then called with an action as an argument

  headlineActions.updateHeadline('does not matter')(
  	fn => fn(action => {
	  expect(action).to.eql({ 
	  	headline, type: 'updateHeadline'
	  })
	  done()
  	}))

})