import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		let item = {  id: 1, text: 'hi', done: false, toggle: false, remove:false }

		let node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text={item.text} done={item.done} toggle={item.toggle} remove={item.remove}/>
			</div>)
		let elements = findDOMNode(node).children[0]
		expect(elements.children.length).to.equal(3)
		expect(elements.children[1].className).to.equal('')
		expect(elements.children[1].innerHTML).to.equal(item.text)
	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		let node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text={_ => _} done={_ => _} toggle={() => { toggled=true }} remove={_ => _}/>
			</div>)
		let elements = findDOMNode(node).children[0]
		TestUtils.Simulate.click(elements.children[0])
		expect(toggled).to.be.true;
	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		// when the remove button is clicked via TestUtils.Simulate.click()
		// we expect the variable removed to be true
		let node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text={_ => _} done={_ => _} toggle={_ => _} remove={() => { removed=true }}/>
			</div>)
		let elements = findDOMNode(node).children[0]
		TestUtils.Simulate.click(elements.children[2])
		expect(removed).to.be.true;
	})

	it('should display a completed ToDo', () => {
		let node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text={_ => _} done={true} toggle={_ => _} remove={_ => _}/>
			</div>)
		let elements = findDOMNode(node).children[0]
		expect(elements.children[1].className).to.equal("completed");
	})

})
