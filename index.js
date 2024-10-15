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

app.get('/', (request, response) => {
    const users = [
        { name: 'John', age: 25 },
        { name: 'Jane', age: 30 },
        { name: 'Jack', age: 22 },
        { name: 'Jill', age: 35 },
        { name: 'Joe', age: 28 },
    ];

    currentAnimal = getRandomAnimal();
    console.log(currentAnimal);

    if (checkForDog(currentAnimal)) {
        numberOfDogs++;
    } else {
        console.log('Not a dog');
        numberOfDogs = 0;
    }

    response.render('userList', { animal: currentAnimal, users: users, numberOfDogs: numberOfDogs });
});

app.get('/dogs', (request, response) => {

    currentAnimal = getRandomAnimal();
    response.render('dogInput', { numberOfDogs: numberOfDogs, currentAnimal: currentAnimal });
});

app.get('/hello', (request, response) => {
    response.render('hello', { message: "Hello From Hello Answer Is Not A Dog", otherAnimals: otherAnimals})
});

app.post('/dogs', (request, response) => {
    const { species } = request.body;

    const userInput = species;

    currentAnimal = getRandomAnimal();

    console.log(`User Answer: ${userInput}`);
    console.log(`Current Animal: ${JSON.stringify(currentAnimal)}`);

    if (checkForDog(userInput)) {
        console.log('Correct!');
        numberOfDogs++;
        otherAnimals = 0;
        console.log(numberOfDogs);
    } else {
        response.redirect('/hello');

        console.log('Incorrect!');
        otherAnimals++;
        console.log(otherAnimals);

    }

    response.redirect('/dogs');  // Redirect back to the /dogs page after processing
});




// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
