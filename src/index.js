console.log("First web service starting up ...");

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 5 - here's our 404 page
const errorPage = `
<html>
	<head>
		<title>404 - File Not Found!</title>
	</head>
	<body>
		<h1>404 - File Not Found!</h1>
		<p>Yeah, sorry. There's nothing here.</p>
	</body>
</html>`;


const getRandomJoke = () => {
	const jokes = [{"q":"What do you call a very small valentine?","a":"A valen-tiny!"},{"q":"What did the dog say when he rubbed his tail on the sandpaper?","a":"Ruff, Ruff!"},{"q":"Why don't sharks like to eat clowns?","a":"Because they taste funny!"},{"q":"What did the fish say when be bumped his head?","a":"Dam!"},{"q":"Why did the drunk walk into the bar?","a":"He couldn't see it coming!"},{"q":"What's worse than a stick in the eye?","a":"A stick in each eye."},{"q":"I keep trying to lose weight.","a":"It keeps finding me."},{"q":"I know a guy who's really good at Russian Roulette...","a":"He's only lost once!"},{"q":"What do you get a man with no elbows?","a":"Elbows."},{"q":"What is a duck's favorite drug?","a":"Quack cocaine!"},{"q":"What do you call a boomerang that doesn't come back?","a":"A stick."},{"q":"I don't usually like cooking with fresh herbs...","a":"But this thyme... It's different."},{"q":"Do you wanna hear a knock-knock joke?","a":"Two guys walk into a bar."},{"q":"I tried to kill a spider with soap?","a":"He got away clean."},{"q":"What do you call a time traveling bounty hunter?","a":"A ManDelorean!"},{"q":"What's red and bad for your teeth?","a":"A brick."},{"q":"What do you call a belt made of watches?","a":"A waist of time!"},{"q":"What's the best way to carve wood?","a":"Whittle by whittle!"},{"q":"Why was 6 afraid of 7?","a":"Because 7 was a registered 6 offender!"}]; //oh boy raw pasted json! can't wait to learn how to put this in a different file bc i can't remember how to do that rn
	let jokeIndex = Math.floor(Math.random() * jokes.length);
	return JSON.stringify(jokes[jokeIndex]);
}


const onRequest = (request, response) => {
	const parsedUrl = url.parse(request.url);
	const pathname = parsedUrl.pathname;
   
	if (pathname =="/random-joke") {
		response.writeHead(200, {'Content-Type': 'application/JSON'});
		response.write(getRandomJoke());
		response.end();
	} else {
		response.writeHead(404, {'Content-Type': 'text/html'}); //send response headers
		response.write(errorPage); //send content
		response.end(); //close connection	
	}
};


http.createServer(onRequest).listen(port); //method chaining!

console.log(`Listening on 127.0.0.1: ${port}`);