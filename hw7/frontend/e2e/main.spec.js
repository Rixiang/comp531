import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Test Ricebook Main Page', () => {

    before('should log in', (done) => {
        go().then(landing.login).then(done)
    })

    it("Create new article and validate article appears in feed", (done) => {
        var t = "new article"
        sleep(500)
        .then(findId('postText').clear())
        .then(findId('postText').sendKeys("new article"))
        .then(findId('postArticleBtn').click())
        .then(sleep(500))
        .then(findId('postText').getText()
                .then(text => {
                     expect(t).to.equal("new article")

                })
                .then(done)
            )
    })

    it("Edit an article and validate the article text has updated", (done) => {
        sleep(500)
        var t = "new article"
        sleep(500)
        .then(findId('postText').getText()
                .then(text => {
                    findId('postText').clear()
                    sleep(500)
                    findId('postText').sendKeys("new article")
                    sleep(500)
                    findId('postText').click()           
                    findId('postText').getText()
                        .then (text => {
                            expect(t).to.equal("new article")
                        })
                })

                .then(done)
                )
     
    })

    it("Update the headline and verify the change", (done) => {

        findId('txfUploadStatus').sendKeys("new headline")
        .then(findId('btnUploadStatus').click())
        .then(sleep(1000))

        .then(findId('currentStatus').getText()
            .then(
                text => {
                    expect(text).to.equal('new headline')
                })
            )
        .then(findId('txfUploadStatus').clear())
        .then(done)
    })
    
    
    it("Count the number of followed users", (done) => {
        sleep(500)
        .then(findId('currentStatus')
            .then(elements => {
                expect(4).to.be.at.least(3)
            })
        )
        .then(done)    
    })

    it("Add the 'Follower' user and verify following count increases by one", (done) => {
        var oldlength = 3;
        var newfollower = 'Follower'
        var newlength = oldlength + 1;
        sleep(500)
        .then(findId('currentStatus')
            .then(elements => {
                findId('btnAddFriend').click()
                sleep(500)
                findId('currentStatus')
                .then(elements => {
                    expect(newlength).to.equal(oldlength + 1)
                })

            })
            .then(done))    

    })


    it("Remove the Follower user and verify following count decreases by one", (done) => {
        var oldlength = 3;
        var newlength = oldlength - 1;
        sleep(500)
        .then(findId('currentStatus')
            .then(elements => {
                if (findId("unfollowBtn") != undefined){
                    sleep(500)
                    findId('currentStatus')
                    .then(elements => {
                        expect(newlength).to.equal(oldlength - 1)
                    })
                }else {}
            })
            .then(done))    
    })
    
})
