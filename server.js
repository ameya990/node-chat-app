var express = require('express');
var app = express();
app.use(express.static(__dirname));
const server = app.listen(3000, () => {
    console.log("Server is sun raha hai on ", server.address().port)
});