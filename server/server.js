const express = require('express'),
	app = express(),
	path = require('path'),
	fs = require('fs'),
	port = 3500;

//ensure the path for videos exists
['./videos', './data', './data/temp'].forEach(dir => {
	try {
		fs.mkdirSync(dir);
	} catch(e) {}
});

app.use(express.static('./static'));
app.use('/videos', express.static('./videos'));

app.use(require('./routes/images'));
app.use(require('./routes/broadcast'));

app.get('/v/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../static/index.html'));
});
app.get('/feather-sprite.svg', (req, res) => {
	res.sendFile(path.join(__dirname, '../node_modules/feather-icons/dist/feather-sprite.svg'));
});
app.listen(port, () => console.log(`dev server listening on port ${port}`));

