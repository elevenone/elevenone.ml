/**
 *
 * startup
 *
 */
import PromiseDom from "./promiseDom.js";
import Router from "./router.js";
import FetchPartial from "./fetchPartial.js";
// check if dom is ready
let dom = new PromiseDom;
dom.ready.then(__start());
function __start() {
    console.log('---------------------------------');
    console.log('   dom is ready, starting now');
    console.log('---------------------------------');
    includePartials();
}
/**
 *
 * routing
 *
 */
const router = new Router({
    type: "hash",
    routes: {
        "/": "home",
        "/about": "about",
        "/products": "products",
        "/zorro": "zorro",
        // error page
        "/404": "404"
    }
}).listen().on("route", async (e) => {
    // if(typeof e.detail.route  === 'undefined' || e.detail.route === null ) {
    //     window.location.href = "404.html";
    // }
    const element = document.querySelector("section");
    const htmlfile = "/" + e.detail.route + ".html";
    console.log('route: ' + e.detail.route, ' url: ' + e.detail.url);
    console.log('htmlfile: ' + htmlfile);
    // return new Promise<string>((resolve, reject) => {
    //     fetch(url).then(function (partial) {
    //         if (partial.status == 200) {
    //             return partial.text()
    //         } else {
    //             reject('Partial ' + url + ' not found')
    //         }
    //     }).then(html => {
    //         resolve(html)
    //     })
    // })
    try {
        const response = await fetch(htmlfile)
            .then(function (result) {
            console.debug(result.type);
            console.debug(result.url);
            console.debug('status ' + result.status);
            console.debug(result.ok);
            console.debug(result.statusText);
            console.debug(result.headers);
            let testheader = new Headers();
            testheader.set('404', 'Not Found');
            return result;
        });
        // .then(function(html) {
        //     let parser = new DOMParser()
        //     let htmlfragment = parser.parseFromString(html, "txt/html")
        //     console.log(htmlfragment)
        //     return htmlfragment
        // })
        const text = await response.text();
        console.debug('___response___status___text === ' + response.statusText);
        if (!response.ok) {
            console.log('___response___status___text === ' + response.statusText);
            window.location.href = '404.html';
        }
        if (response.ok) {
            element.innerHTML = text;
            // element.innerHTML = ''
            // const partial_tag = element
            // const content = new FetchPartial()
            // content.fetchOne(htmlfile, partial_tag)
            // let parser = new DOMParser()
            // let htmlfragment = parser.parseFromString(text, "text/html")
            // // console.log('______________')
            // // console.log(htmlfragment)
            // // console.log('______________')
            // let payload = htmlfragment.querySelector('div')
            // console.log(' payload === ' + payload)
            // element.innerHTML = ''
            // element.appendChild(payload) 
        }
        else {
            throw new Error('response error');
        }
        // console.log(text)
    }
    catch (e) {
        // console.log(' try catch error == ' + e)
        element.innerHTML = e;
        throw e;
    }
    // if(response.ok) {
    //     console.log('response OK')
    //     console.log('response == ' + response.text())
    // }
    // if(!response.ok) {
    //     console.log('response NOT OK')
    //     console.log('response == ' + response)
    // }
    // element.innerHTML = response.text()
});
/**
 *
 * partial
 *
 */
function includePartials() {
    const partial = new FetchPartial();
    partial.fetchAll();
}
// function include(): void {
//     const zzz = document.querySelector("section")
//     const content = new FetchPartial()
//     content.fetchOne('about.html', zzz)
// }
// include()
