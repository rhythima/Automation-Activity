const puppeteer=require('puppeteer')
let page;
console.log('Before')

const browserOpenPromise=puppeteer.launch({
    headless:false,
    slowMo:true,
    defaultViewport:null
})

browserOpenPromise.then(function(browser){
    const pagesArrPromise=browser.pages();
    return pagesArrPromise
}).then(function(browserPages){
    page = browserPages[0]
    let gotopromise=page.goto('https://www.google.com/')
    return gotopromise
}).then(function(){
    // waiting for the element to appear on screen
    let elementWaitPromise=page.waitForSelector("textarea[type='search']" ,{visible:true})
    return elementWaitPromise
}).then(function(){
    console.log('Landed on google search page')
    let keyWillSendPromise=page.type("textarea[type='search']", 'pepcoding')
    return keyWillSendPromise
}).then(function(){
    let enterPressedPromise=page.keyboard.press('Enter')
    return enterPressedPromise
}).then(function(){
    let elementWaitPromise=page.waitForSelector('h3.LC20lb.DKV0Md', {visible:true})
    return elementWaitPromise
}).then(function(){
    let enterkeySendsPromise=page.click('h3.LC20lb.DKV0Md')
    return enterkeySendsPromise
}).catch(function(err){
    console.log(err)
})

console.log('After')