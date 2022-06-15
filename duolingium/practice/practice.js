const path = require('path');
const get = require(path.resolve( __dirname, "./practice2.js" ) );

get.getUser().then((res)=>{
    console.log("getting user")
    console.log(res)
}).catch((error)=>{
    console.error(error)
})