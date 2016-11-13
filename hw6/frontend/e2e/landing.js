import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.registerInfo = {
    username: 'Rixiang',
    displayname: '',
    email: 'xiang.li@rice.edu',
    phone: '123-123-1234',
    birth: '09171989',
    zipcode: '77030',
    password: 'xiangli@rice',
    passwordconfirmation: 'xiangli@rice'
}

exports.creds = {
    username: 'xl68test',
    password: 'began-track-suffer'
}

exports.login = () => 
    sleep(500)
    .then(findId('inputAccount').clear())
    .then(findId('inputPassword').clear())
    .then(findId('inputAccount').sendKeys(exports.creds.username))
    .then(findId('inputPassword').sendKeys(exports.creds.password))
    .then(findId('logIn').click())
    .then(sleep(2000))

exports.register = () => 
    sleep(500)
    .then(findId('registerAccount').clear())
    .then(findId('registerDisplayName').clear())
    .then(findId('registerEmail').clear())
    .then(findId('registerPhone').clear())
    .then(findId('registerZip').clear())
    .then(findId('registerPwd').clear())
    .then(findId('registerPwdConfirm').clear())
    .then(findId('registerAccount').sendKeys(exports.registerInfo.username))
    .then(findId('registerDisplayName').sendKeys(exports.registerInfo.displayname))
    .then(findId('registerEmail').sendKeys(exports.registerInfo.email))
    .then(findId('registerPhone').sendKeys(exports.registerInfo.phone))
    .then(findId('registerDob').sendKeys(exports.registerInfo.birth))
    .then(findId('registerZip').sendKeys(exports.registerInfo.zipcode))
    .then(findId('registerPwd').sendKeys(exports.registerInfo.password))
    .then(findId('registerPwdConfirm').sendKeys(exports.registerInfo.passwordconfirmation))
    .then(findId('signOn').click())
    .then(sleep(2000))