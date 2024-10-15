const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {getRandomAnimal, checkForDog} = require("./utils/utils");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let numberOfDogs = 0;
let otherAnimals = 0;
let currentAnimal = null;
let leaderboard = [];


app.get('/', (request, response) => {
    const users = [
        { name: 'John', age: 25 },
        { name: 'Jane', age: 30 },
        { name: 'Jack', age: 22 },
        { name: 'Jill', age: 35 },
        { name: 'Joe', age: 28 },
    ];

    console.log(currentAnimal);

    response.render('userList', { users: users, numberOfDogs: numberOfDogs });
});

app.get('/dogs', (request, response) => {

    currentAnimal = getRandomAnimal();
    response.render('dogInput', { numberOfDogs: numberOfDogs, currentAnimal: currentAnimal, otherAnimals: otherAnimals});
});

app.get('/hello', (request, response) => {
    response.render('hello', { message: "Hello From Hello Answer Is Not A Dog", otherAnimals: otherAnimals, numberOfDogs: numberOfDogs})
});


app.post('/dogs', (request, response) => {
    const { species } = request.body;

    const userInput = species;

    console.log(`User Answer: ${userInput}`);
    console.log(`Current Animal: ${JSON.stringify(currentAnimal)}`);

    if (checkForDog(userInput)) {
        console.log('Correct!');
        numberOfDogs++;
        console.log(numberOfDogs);
    } else {
        console.log('Incorrect!');
        otherAnimals++;

        leaderboard.push({numberOfDogs: numberOfDogs,date: new Date()});
        numberOfDogs = 0;


        console.log(otherAnimals);
        console.log(numberOfDogs);
        response.redirect('/hello');


    }

      // Redirect back to the /dogs page after processing
});

app.get('/leaderboard', (request, response) => {
    const topStreak = leaderboard.sort((a, b) => b.numberOfDogs - a.numberOfDogs).slice(0, 10);
    response.render('leaderBoard', { leaderboard: topStreak });

});




// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
