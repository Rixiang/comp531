import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Test Ricebook Profile Page', () => {

    before('should log in', (done) => {
        go().then(landing.login).then(done)
    })

    it("Update user's email and verify", (done) => {
        sleep(500)
        .then(findId('nevToProfile').click())
        .then(sleep(500))

        sleep(500)
        .then(findId('emailAddr').clear())
        .then(findId('emailAddr').sendKeys('rixiang@live.com'))
        .then(findId('registerSubmit').click())
        .then(sleep(1000))
        .then(findId('email').getText()
        .then(text=>{
            expect(text).to.eql('rixiang@live.com')
        }))
        .then(done)
    })

    it("Update user's zipcode and verify", (done) => {
        sleep(500)
        
        sleep(500)
        .then(findId('zipCodeValue').clear())
        .then(findId('zipCodeValue').sendKeys(77030))
        .then(findId('registerSubmit').click())
        .then(sleep(2000))
        .then(findId('zipCode').getText()
        .then(text=>{
            expect(parseInt(text)).to.eql(77030)
        }))
        .then(done)
    })

    it("Update user's password and verify", (done) => {
        sleep(500)
        
        .then(findId('pwdValue').clear())
        .then(findId('pwdConfValue').clear())
        .then(findId('pwdValue').sendKeys('newpassword'))
        .then(findId('pwdConfValue').sendKeys('newpassword'))
        .then(findId('registerSubmit').click())
        .then(sleep(1000))
        .then(findId('updateInfo').then((element)=>{
            expect(element).to.be.ok
        }))
        .then(sleep(500))
        .then(done)
    })


    
})
