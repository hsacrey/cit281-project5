
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
