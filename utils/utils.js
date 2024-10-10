const animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'dog' },
    { name: 'Harold', species: 'fish' },
    { name: 'Ursula', species: 'cat' },
    { name: 'Jimmy', species: 'fish' },
]


function getRandomAnimal() {
    return animals[Math.floor(Math.random() * animals.length)];
}

function checkForDog(animalName) {
    return animalName.species === 'dog';

}

module.exports = {
    getRandomAnimal,
    checkForDog

}


