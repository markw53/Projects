class Pokemon {
    constructor(name, hitPoints, attackDamage, move = 'tackle') {
      this.name = name;
      this.hitPoints = hitPoints;
      this.maxHitPoints = hitPoints; 
      this.attackDamage = attackDamage;
      this.move = move;
    }
  
    takeDamage(damage) {
      this.hitPoints = Math.max(0, this.hitPoints - damage); 
    }
  
    useMove() {
      console.log(`${this.name} used ${this.move}!`);
      return this.attackDamage;
    }
  
    hasFainted() {
      return this.hitPoints === 0;
    }
  }
  
  class Fire extends Pokemon {
    constructor(name, hitPoints, attackDamage, move = 'ember') {
      super(name, hitPoints, attackDamage, move);
      this.type = 'fire';
    }
  
    isEffectiveAgainst(opponent) {
      return opponent.type === 'grass';
    }
  
    isWeakTo(opponent) {
      return opponent.type === 'water';
    }
  }
  
  class Water extends Pokemon {
    constructor(name, hitPoints, attackDamage, move = 'water gun') {
      super(name, hitPoints, attackDamage, move);
      this.type = 'water';
    }
  
    isEffectiveAgainst(opponent) {
      return opponent.type === 'fire';
    }
  
    isWeakTo(opponent) {
      return opponent.type === 'grass';
    }
  }
  
  class Grass extends Pokemon {
    constructor(name, hitPoints, attackDamage, move = 'vine whip') {
      super(name, hitPoints, attackDamage, move);
      this.type = 'grass';
    }
  
    isEffectiveAgainst(opponent) {
      return opponent.type === 'water';
    }
  
    isWeakTo(opponent) {
      return opponent.type === 'fire';
    }
  }
  
  class Normal extends Pokemon {
    constructor(name, hitPoints, attackDamage, move = 'tackle') {
      super(name, hitPoints, attackDamage, move);
      this.type = 'normal';
    }
  
    isEffectiveAgainst() {
      return false; 
    }
  
    isWeakTo() {
      return false; 
    }
  }

  class Charmander extends Fire {
    constructor() {
      super('Charmander', 80, 40, 'ember'); // Fire Pokemon with move "ember"
    }
  }

  class Squirtle extends Water {
    constructor() {
      super('Squirtle', 100, 30, 'water gun'); // Water Pokemon with move "water gun"
    }
  }

  class Bulbasaur extends Grass {
    constructor() {
      super('Bulbasaur', 90, 35, 'vine whip'); // Grass Pokemon with move "vine whip"
    }
  }

  class Rattata extends Normal {
    constructor() {
      super('Rattata', 70, 25, 'tackle'); // Normal Pokemon with default move "tackle"
    }
  }
  
class Trainer {
  constructor(name) {
    this.name = name;
    this.belt = [new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball()];
  }

  catch(pokemon) {
    const emptyBall = this.belt.find(pokeball => pokeball.isEmpty());
    if (emptyBall) {
      emptyBall.throw(pokemon);
    } else {
      console.log('No empty Pokeball available!');
    }
  }

  getPokemon(pokemonName) {
    const pokeball = this.belt.find(pokeball => pokeball.contains() === pokemonName);
    if (pokeball) {
      return pokeball.throw();
    } else {
      console.log(`${pokemonName} is not in the belt.`);
      return null;
    }
  }
}

class Pokeball {
    constructor() {
      this.pokemon = null;
    }
  
    throw(pokemon = null) {
      if (pokemon) {
        if (!this.pokemon) {
          this.pokemon = pokemon;
          console.log(`You caught ${pokemon.name}!`);
        } else {
          console.log('Pokeball is already occupied!');
        }
      } else {
        if (this.pokemon) {
          console.log(`Go ${this.pokemon.name}!`);
          return this.pokemon;
        } else {
          console.log('Pokeball is empty!');
          return null;
        }
      }
    }
  
    isEmpty() {
      return this.pokemon === null;
    }
  
    contains() {
      return this.isEmpty() ? 'empty' : this.pokemon.name;
    }
  }
  
  class Battle {
    calculateDamage(attacker, defender) {
      let damage = attacker.attackDamage;
  
      if (attacker.isEffectiveAgainst(defender)) {
        damage *= 1.25;
        console.log(`${attacker.name} is strong against ${defender.name}, damage increased!`);
      } else if (attacker.isWeakTo(defender)) {
        damage *= 0.75;
        console.log(`${attacker.name} is weak against ${defender.name}, damage reduced!`);
      }
  
      return damage;
    }
  
    attack(attacker, defender) {
      const damage = this.calculateDamage(attacker, defender);
      defender.takeDamage(damage);
  
      console.log(`${attacker.name} used ${attacker.move} on ${defender.name}!`);
      if (defender.hasFainted()) {
        console.log(`${defender.name} has fainted!`);
        return attacker;
      }
  
      return null;
    }
  
    fight(trainer1, trainer2, pokemon1Name, pokemon2Name) {
      const pokemon1 = trainer1.getPokemon(pokemon1Name);
      const pokemon2 = trainer2.getPokemon(pokemon2Name);
  
      let winner = null;
  
      while (!pokemon1.hasFainted() && !pokemon2.hasFainted()) {
        winner = this.attack(pokemon1, pokemon2);
        if (winner) return winner;
  
        winner = this.attack(pokemon2, pokemon1);
        if (winner) return winner;
      }
  
      return winner;
    }
  }
  
  module.exports  = { Pokemon, Fire, Water, Grass, Normal, Charmander, Squirtle, Bulbasaur, Rattata, Trainer, Pokeball, Battle };
  

  