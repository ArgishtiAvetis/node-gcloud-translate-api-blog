// Imports the Google Cloud client library
const translator = require('@google-cloud/translate');

const translate = translator({
  projectId: 'challer-fec3a',
  keyFilename: __dirname + '/credentials.json'
});

module.exports = function(app, Post) {


	function renderHomepage(res, l) {
		Post.find({}).exec((err, posts) => {
			if (err) {
				throw err;
			} else {
				//console.log(posts);
				res.render('index', {
					posts: posts,
					lang: l,
					page: ''
				});
			}
		});
 	}


	app.get('/:lang?', (req, res) => {

		var l = req.params.lang;

		if (l) {
			renderHomepage(res, l);
		} else {
			Post.find({}).exec((err, posts) => {
			if (err) {
				throw err;
			} else {
				//console.log(posts);
				res.render('index', {
					posts: posts,
					lang: '',
					page: ''
				});
			}
		});
		}
		

	});

	app.get('/blog/:category', (req, res) => {
		res.render('category', {
			category: req.params.category,
			lang: ''
		});
	});

	app.get('/author/:name', (req, res) => {
		res.render('author', {
			author: req.params.name,
			lang: ''
		});
	});

	app.get('/:lang?/p/:slug', (req, res) => {

		var slug = req.params.slug;
		var lang = req.params.lang ? req.params.lang : '';

		Post.findOne({
			slug: req.params.slug
		}).exec((err, post) => {
			if (err) {
				console.log(err);
			} else {
				res.render('post', {
					post: post,
					lang: lang,
					page: `/p/${post.slug}`
				});
			}
		});		

	});

	app.get('/search', (req, res) => {
		res.render('search', {
			searchterm: req.query.searchterm,
			lang: ''
		});
	});
	

	app.get('/:lang?/pupsik/admin', (req, res) => {
		res.render('admin', {
			lang: '',
			page: '/pupsik/admin'
		});
	});


const t1 = 'ru';  // russian
const t2 = 'hi';  // hindi


	app.post('/add-post', (req, res) => {

		var title = req.body.title;
		var body = req.body.body;

		var text = [title, body];

		var savePost = (title_ru, body_ru, title_hi, body_hi) => {
			var newPost = new Post({
				title: title.trim(),
				title_ru: title_ru,
				title_hi: title_hi,
				body: body.trim(),
				body_ru: body_ru,
				body_hi: body_hi,
				slug: title.trim().replace(/\s+/g, "-")
			});
			newPost.save((err, newPost) => {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/');
				}
			});
		} 

		function getTranslations(callback) {

			var r_text = [];
			var h_text = [];

			translate.translate(text, t1)
		    .then((russian) => {
			    let ru = russian[0];
			    ru = Array.isArray(ru) ? ru : [ru];

			    console.log('Translations:');

				ru.forEach((translation, i) => {
		      		console.log(`${text[i]} => (${t1}) ${translation}`);
		      		r_text.push(translation);
				});

				translate.translate(text, t2)
			    .then((hindi) => {
				    let hi = hindi[0];
				    hi = Array.isArray(hi) ? hi : [hi];

				    console.log('Translations:');

					hi.forEach((translation, i) => {
			      		console.log(`${text[i]} => (${t2}) ${translation}`);
			      		h_text.push(translation);
					});

					callback(r_text[0], r_text[1], h_text[0], h_text[1]);
					
				})
				.catch((err) => {
			      console.error('ERROR:', err);
			    });

			})
			.catch((err) => {
		      console.error('ERROR:', err);
		    });



		}

		getTranslations(savePost);

		// translate.translate(text, t1)
	 //    .then((russian) => {
		//     let ru = russian[0];
		//     ru = Array.isArray(ru) ? ru : [ru];

		//     console.log('Translations:');

		//  //    ru.forEach((translation, i) => {
		//  //      	console.log(`${text[i]} => (${t1}) ${translation}`);
		// 	// });

		// 	var savePost = (title_ru, body_ru) => {
		// 		var newPost = new Post({
		// 			title: title.trim(),
		// 			title_ru: title_ru,
		// 			body: body.trim(),
		// 			body_ru: body_ru,
		// 			slug: title.trim().replace(/\s+/g, "-")
		// 		});
		// 		newPost.save((err, newPost) => {
		// 			if (err) {
		// 				console.log(err);
		// 			} else {
		// 				res.redirect('/');
		// 			}
		// 		});
		// 	} 

		// 	var getTranslations = (callback) => {
				
		// 		var t_ru = [];

		// 		ru.forEach((translation, i) => {
		//       		console.log(`${text[i]} => (${t1}) ${translation}`);
		//       		t_ru.push(translation);
		// 		});

		// 		callback(t_ru[0], t_ru[1]);

		// 	}

		// 	getTranslations(savePost);

	 //    })
	 //    .catch((err) => {
	 //      console.error('ERROR:', err);
	 //    });

	});


}