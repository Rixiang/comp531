import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Test Ricebook Landing Page', () => {

    before('should log in', (done) => {
        go().then(landing.register).then(done)
    })

    it('should register a new account', (done) => {
        sleep(500)
        .then(findId('signOnInfo').getText()
            .then(text => {
                expect(text).to.equal('Success!')
            })
            .then(done))
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('logInInfo')
            .then(element => {
                expect(element).to.be.ok
            })
            .then(done))
    })
    
})
