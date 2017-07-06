module.exports = function(app, Post) {


	app.get('/', (req, res) => {

		Post.find({}).exec((err, posts) => {
			if (err) {
				throw err;
			} else {
				//console.log(posts);
				res.render('index', {
					posts: posts
				});
			}
		});
		
	});

	app.get('/:lang', (req, res) => {

		var l = req.params.lang;

		switch(l) {
			case 'ru':
				console.log(l)
			break;
			case 'fr':
				console.log(l)
			break;

			default: 
				console.log('defaulkt');
			break;
		}

	});

	app.get('/blog/:category', (req, res) => {
		res.render('category', {
			category: req.params.category
		});
	});

	app.get('/author/:name', (req, res) => {
		res.render('author', {
			author: req.params.name
		});
	});

	app.get('/p/:slug', (req, res) => {

		Post.findOne({
			slug: req.params.slug
		}).exec((err, post) => {
			if (err) {
				console.log(err);
			} else {
				res.render('post', {
					post: post
				});
			}
		});		

	});

	app.get('/search', (req, res) => {
		res.render('search', {
			searchterm: req.query.searchterm
		});
	});
	

	app.get('/pupsik/admin', (req, res) => {
		res.render('admin');
	});

	app.post('/add-post', (req, res) => {

		var title = req.body.title;
		var body = req.body.body;

		var newPost = new Post({
			title: title.trim(),
			body: body.trim(),
			slug: title.trim().replace(/\s+/g, "-")
		});

		newPost.save((err, newPost) => {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		})

	});


}