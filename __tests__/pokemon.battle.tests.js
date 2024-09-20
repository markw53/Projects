const Trainer = require('./Trainer');
const { Charmander, Squirtle, Bulbasaur } = require('./Pokemon');
const Battle = require('./Battle');

describe('Pokemon Battle System', () => {
  let trainer1, trainer2, charmander, squirtle, bulbasaur, battle;

  beforeEach(() => {
    trainer1 = new Trainer('Ash');
    trainer2 = new Trainer('Misty');
    charmander = new Charmander();
    squirtle = new Squirtle();
    bulbasaur = new Bulbasaur();
    trainer1.catch(charmander);
    trainer2.catch(squirtle);
    trainer2.catch(bulbasaur);
    battle = new Battle();
  });

  test('Pokemon should be able to attack and reduce hit points of the defender', () => {
    battle.fight(trainer1, trainer2, 'Charmander', 'Squirtle');
    expect(squirtle.hitPoints).toBeLessThan(squirtle.maxHitPoints);
    expect(charmander.hitPoints).toBeLessThan(charmander.maxHitPoints);
  });

  test('Pokemon should adjust damage based on type advantages and weaknesses', () => {
    battle.fight(trainer1, trainer2, 'Charmander', 'Bulbasaur');
    expect(bulbasaur.hitPoints).toBeLessThan(bulbasaur.maxHitPoints); 
    expect(charmander.hitPoints).toBe(charmander.maxHitPoints); 
  });

  test('Pokemon should faint when hit points reach 0', () => {
    while (!squirtle.hasFainted()) {
      battle.fight(trainer1, trainer2, 'Charmander', 'Squirtle');
    }
    expect(squirtle.hasFainted()).toBe(true);
  });

  test('The attacker wins when the defender faints', () => {
    const winner = battle.fight(trainer1, trainer2, 'Charmander', 'Squirtle');
    expect(winner.name).toBe('Charmander');
  });
});
