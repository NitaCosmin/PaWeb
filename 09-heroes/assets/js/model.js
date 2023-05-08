class Model {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  readHeroes() {
    return this.#repository.readHeroes();
  }

  createHero(heroToBeCreated) {
    const name = heroToBeCreated.name;
    const level = heroToBeCreated.level;
    let errorMessages = '';

    if (this.#wrongHeroName(name)) {
      errorMessages += 'The hero name is wrong. It must have a length between 3 and 100. ';
    }
    if (this.#wrongHeroLevel(level)) {
      errorMessages += 'The hero level is required. ';
    }
    if (this.#invalidHeroLevel(level)) {
      errorMessages += 'The hero level is invalid. Only "junior", "middle", or "senior" are allowed. ';
    }

    if (errorMessages === '') {
      this.#repository.createHero(heroToBeCreated);
    } else {
      throw new Error(errorMessages);
    }
  }

  deleteHero(nameOfHeroToBeDeleted) {
    const heroToBeDeleted = this.#getHeroByName(nameOfHeroToBeDeleted);

    if (heroToBeDeleted && this.#canDeleteHero(heroToBeDeleted)) {
      this.#repository.deleteHero(nameOfHeroToBeDeleted);
    }
  }

  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    const name = updatedHero.name;
    const level = updatedHero.level;
    let errorMessages = '';

    if (this.#wrongHeroName(name)) {
      errorMessages += 'The updated hero name is wrong. It must have a length between 3 and 100. ';
    }
    if (this.#wrongHeroLevel(level)) {
      errorMessages += 'The updated hero level is required. ';
    }
    if (this.#invalidHeroLevel(level)) {
      errorMessages += 'The updated hero level is invalid. Only "junior", "middle", or "senior" are allowed. ';
    }

    const heroToBeUpdated = this.#getHeroByName(nameOfHeroToBeUpdated);

    if (errorMessages === ``) {
      this.#repository.updateHero(nameOfHeroToBeUpdated, updatedHero);
    } else {
      throw new Error(errorMessages);
    }
  }
  displayAllHeroes() {
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      console.log(hero);
    }
  }

  #wrongHeroName(name) {
    return name.length < 3 || name.length > 100;
  }

  #wrongHeroLevel(level) {
    return level === '';
  }

  #invalidHeroLevel(level) {
    const validLevels = ['junior', 'middle', 'senior'];
    return !validLevels.includes(level);
  }

  #getHeroByName(name) {
    const heroes = this.#repository.readHeroes();
    return heroes.find(hero => hero.name === name);
  }

  #canDeleteHero(hero) {
    return hero.level === 'junior';
  }

  #canUpdateHero(hero, updatedHero) {
    const currentLevel = hero.level;
    const updatedLevel = updatedHero.level;

    return (
      (currentLevel === 'junior' && updatedLevel === 'middle') ||
      (currentLevel === 'middle' && updatedLevel === 'senior')
    );
  }
}
