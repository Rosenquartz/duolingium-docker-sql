//const { v4: uuidv4 } = require('uuid');
//
//for (let i = 0; i < 30; i ++) {
//    console.log(i);
//console.log(uuidv4().toString().replace("-","").substring(0,8));}


//const { customRandom, urlAlphabet } = require('nanoid')
//const nanoid = customRandom(urlAlphabet, 8, random)

const { nanoid } = require('nanoid');

console.log(nanoid(8));