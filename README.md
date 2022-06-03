## Project 5

For this project, I created a simple Monster Game program using classes. 

The game will create monsters with initial life values, and minimum life values for the monster to be alive. Once the game is running, each monster's life will be drained by a random amount, and the game will continue until all of the monsters have died. 

The game includes a delay (via a sleep function) before each life drain.

###Primary concepts: class constructors and methods, interpreting existing code to design a new class, including constructor and methods, working with Array map() and forEach() methods, a gaming loop, working with objects and arrays

#### p5-monster.js:
```javascript
/*
    CIT 281, Project 5
    Name: Hunter Sacrey
*/
module.exports = class Monster{
    constructor({
        monsterName = "Unknown",
        minimumLife = 0,
        currentLife = 100,
    }){
        this.monsterName = monsterName;
        this.minimumLife = minimumLife;
        this.currentLife = currentLife;
        this.isAlive = (this.currentLife >= this.minimumLife) ? true : false;
    }
    getRandomInteger(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }
    //Accept an integer (positive or negative) and add it to this monster's currentLife, if its below 0, set isAlive to false
    updateLife = (lifeChangeAmount) => {
        ((this.currentLife - lifeChangeAmount) <= 0) ? this.currentLife = 0 : (this.currentLife = this.currentLife - lifeChangeAmount);
        this.isAlive = (this.currentLife > this.minimumLife) ? true : false;
    }
    //Accept 2 integers, update this monster's life, log the life drain to the console
    randomLifeDrain = (minimumLifeDrain, maximumLifeDrain) => {
        const drainAmount = this.getRandomInteger(minimumLifeDrain, maximumLifeDrain+1);
        this.updateLife(drainAmount);
        console.log(`${this.monsterName} random power drain of ${drainAmount}`);
    }
};
```

#### p5-monster-game.js:
```javascript
/*
    CIT 281, Project 5
    Name: Hunter Sacrey
*/
// Required code modules
const Monster = require("./p5-monster.js");

/*** Game Class ***/
/* Constructor expects an object */
// IMPORTANT: When declaring a class within a module,
// the class is the ONLY export!
module.exports = class MonsterGame {
  constructor({
    monsterList = [],
    gameDelayInMilliseconds = 5000,
    minimumLifeDrain = 1,
    maximumLifeDrain = 30,
  }) {
    console.log("Initializing monsters...");
    this.gameDelayInMilliseconds = gameDelayInMilliseconds;
    this.minimumLifeDrain = minimumLifeDrain;
    this.maximumLifeDrain = maximumLifeDrain;
    this.createMonsters(monsterList);
    console.log("Monsters initialized, ready to play!");
  }

  // List monsters
  listMonsters = () => {
    this.monsters.forEach((monster) => {

      console.log(
        `Monster: ${monster.monsterName}, ` +
          `Minimum Life: ${monster.minimumLife}, ` +
          `Current Life: ${monster.currentLife}, ` +
          `Status: ` +
          ((monster.isAlive) ? `Alive` : `Dead`)
      )
    });
  };

  // Create monsters from monster information
  createMonsters = (monsterList = []) => {
    this.monsters = monsterList.map((monster) => new Monster(monster));
  };

  // Update monster life value
  /*
  updateLife = (lifeChange = 0) =>
    this.monsters.forEach((monster) => monster.updateLife(lifeChange));
  */

  // Main game playing method, will exit when all monsters have died
  async playGame(GameDelay) {
    console.log("Starting game...");
    let monstersAreAlive = true;
    do {
      // Sleep game
      console.log(
        `Sleeping for ${this.gameDelayInMilliseconds} milliseconds...`
      );
      await sleep(this.gameDelayInMilliseconds);

      // Call each monster's random life drain method
      this.monsters.forEach((monster) => {
        if (monster.isAlive) {
          monster.randomLifeDrain(this.minimumLifeDrain, this.maximumLifeDrain);
        }
      });

      // List monsters
      this.listMonsters();

      // Check if any monsters are alive and set Boolean
      monstersAreAlive =
        this.monsters.filter((monster) => monster.isAlive).length > 0;

      // See if any monsters are still alive
      if (!monstersAreAlive) {
        console.log("All monsters have died, game over!");
      }
    } while (monstersAreAlive);
  }
};

// Game loop

/*** Utility Functions ***/
// https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

#### p5-data.js:
```javascript
/*
    CIT 281, Project 5
    Name: Hunter Sacrey
*/
// This is the run file which creates the Monster objects and starts the game, utilizing all of the objects and functions in the other files.

// IMPORTANT: Note no object deconstruction when importing a class
// from a class module
const MonsterGame = require("./p5-monster-game.js");

// Game monsters setup information
const monsterList = [
  {
    monsterName: "King Kong",
    minimumLife: 10,
    currentLife: 150,
  },
  {
    monsterName: "Godzilla",
    minimumLife: 10,
    currentLife: 200,
  },
];
// Game configuration information
const minimumLifeDrain = 10;
const maximumLifeDrain = 50;
const gameDelayInMilliseconds = 5000; // 5 second game delay

// Create Monster Game instance
const monsterGame = new MonsterGame(
  {
    monsterList, gameDelayInMilliseconds, minimumLifeDrain, maximumLifeDrain
  }
);

// List monsters
monsterGame.listMonsters();

// Start game
monsterGame.playGame();
```
