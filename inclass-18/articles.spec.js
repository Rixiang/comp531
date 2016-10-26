/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200);	
			return res.text();
		})
		.then(body => {
			expect(JSON.parse(body)).to.have.length.of.at.least(3);
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		fetch(url("/article"), {
            method:'POST',
            headers:new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({"body":"this is text1"})
        })
		.then(res => {
			expect(res.status).to.eql(200);
			return res.text();				
		})
		.then(body => {
			expect(JSON.parse(body).text).to.equal('this is text1');
			return JSON.parse(body).id;
		})
		.then((currid) => {
				fetch(url("/article"), {
		            method:'POST',
		            headers:new Headers({ 'Content-Type': 'application/json' }),
		            body: JSON.stringify({"body":"this is text2"})
        		})
				.then(res => {
					expect(res.status).to.eql(200)	
					return res.text()				
				})	
				.then(body => {
					expect(JSON.parse(body).id).to.equal(currid+1);
					expect(JSON.parse(body).text).to.equal('this is text2');
				})
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200);
			return res.text();				
		})
		.then(body => {
			var artlength = JSON.parse(body).length;
			var randomId = Math.floor( Math.random() * artlength + 1);
			fetch(url("/articles/" + randomId))
			.then(res => {
				expect(res.status).to.eql(200);
				return res.text();				
			})
			.then(body => {
				expect(JSON.parse(body)).to.have.lengthOf(1);
			})
		})
		.then(done)
		.catch(done)
	}, 200);

	it('should return nothing for an invalid id', (done) => {
		fetch(url("/articles/0"))
		.then(res => {
			expect(res.status).to.eql(200);
			return res.text();			
		})
		.then(body => {
			expect(JSON.parse(body)).to.have.lengthOf(0);
		})		
		.then(done)
		.catch(done)
	}, 200);

});