let express = require('express');
let formidable = require('express-formidable');
let app = express ();
app.use(formidable({uploadDir:'./public'}));

app.listen(7777,()=> console.log('server upload run'));
app.post('/', (req,res) => 


	{
console.log(req.fields);

		res.send('hei low');});