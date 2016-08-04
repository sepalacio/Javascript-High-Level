var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now()+ '.' + ext(file.originalname))
  }
})
var upload = multer({ storage: storage }).single('picture');
var app = express();

app.set('view engine', 'pug');

//serve static files usign express framework
app.use(express.static('public'));

// Routes
app.get('/', function (req, res){
	res.render('index', {
		title: 'Platzigram'
	});
})

app.get('/signup', function (req, res){
	res.render('index', {
		title: 'Platzigram - Signup'
	});
})

app.get('/signin', function (req, res){
	res.render('index', {
		title: 'Platzigram - Signin'
	});
})

app.get('/api/pictures', function(req, res, next){
	var pictures = [
		{
			user: {
				'username': 'sebas',
				'avatar':'http://zblogged.com/wp-content/uploads/2015/11/17.jpg'				
			},
			url:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQwD_ZOkV3ALOJBAsKTlz82nyU2tBh7r-1YgsL1K2PdobJpeUgbuQ',
			likes: 0,
			liked: false,
			createdAt: new Date().getTime()
		},
		{
			user: {
				'username': 'sebas',
				'avatar':'http://zblogged.com/wp-content/uploads/2015/11/17.jpg'				
			},
			url:'office.jpg',
			likes: 1,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate()-10)
		}
	];
	setTimeout(function(){
		res.send(pictures);
	}, 2000);
})

app.post('/api/pictures', function(req, res){
	upload(req, res, function(err){
		if(err){
			return res.send(500, "Error uploading file");
		}
		res.send("The file was uploaded succesfully");
	})
})

app.listen(3000, function(err){
	if (err) return console.log("There is a mistake"), process.exit(1);

	console.log("Listening on port 3000");
})
