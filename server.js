var _ = require('lodash')
var log = require('beautylog')
var express = require('express')
var bodyParser = require('body-parser')
var remoteip = require('remoteip')
var app = express()

var data = [
]

app.use(bodyParser.json())

app.post('/send-public', function(req, res) {
	
	var body = req.body

	found = _.find(data, function(x) { body.name == x.name})

	if(!found) {
		data.push({
			name: body.name,
			intranet: body.intranet,
			public: body.public
		})
	} else {
		if(body.public) found.public = body.public
		if(body.intranet) found.intranet = body.intranet
	}

	res.json(data)
})

app.get('/get-ip', function(req, res) {
	res.send(remoteip.get(req))
})

app.get('/get-all-adresses', function(req, res) {
	log.info("data:" + JSON.stringify(data))
	res.json(data)
})

app.listen(8087)

log.success('server start at 8087')
