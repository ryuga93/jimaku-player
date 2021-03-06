const imageStore = require('../db/imagestore'),
	router = require('express').Router();

router.get('/image/:size/:id', async (req, res) => {
	const {size, id} = req.params;
	const imageData = await imageStore.getImageById(size, id);
	if (!imageData) {
		res.status(404);
		return res.send(null);
	}

	if (imageData.image_type) {
		res.header('Content-Type', imageData.image_type);
	}
	res.set('Cache-Control', `public, max-age=${60 * 60 * 24 * 7}`); //one week
	res.send(imageData[`image_${size}`]);
});

module.exports = router;
