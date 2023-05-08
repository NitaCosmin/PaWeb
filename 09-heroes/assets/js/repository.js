function deepCopyOf(entity){
  return JSON.parse(JSON.stringify(entity));
}
class Repository{
  #heroes;
  constructor(){
    this.#heroes = [
      {name:`Bob`, level:`senior`},
      {name:`Kevin`, level:`middle`},
      {name:`Dave`, level:`junior`}
    ];
  }
  readHeroes(){
    return deepCopyOf(this.#heroes);
  }
  createHero(heroToBeCreated){
    this.#heroes.push(heroToBeCreated);
  }
  deleteHero(nameOfHeroToBeDeleted){
    this.#heroes = this.#heroes.filter(hero => hero.name !== nameOfHeroToBeDeleted );
  }
  // updateHero(nameOfHeroToBeUpdated, updatedHero){
  //   const index = this.#heroes.findIndex(hero => hero.name === nameOfHeroToBeUpdated);
  //   if (index !== -1) {
  //     this.#heroes[index] = updatedHero;
  //   }
  // }
  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    this.#heroes = this
      .#heroes
        .map(hero => (hero
            .name === nameOfHeroToBeUpdated)  
              ? updatedHero: hero);
  }
  
}
