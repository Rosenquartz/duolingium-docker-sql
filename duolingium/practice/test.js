var http = require('http')

const options = {
    hostname: 'localhost:3000/api/users',
    method: 'GET'
}

const req = http.request(options, res=> {
    console.log(res.statusCode)
})
.then(()=>{})
.catch((err)=>console.error("NOOO",err))