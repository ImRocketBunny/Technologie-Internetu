CREATE SCHEMA IF NOT EXISTS `tin-projekt-kruk-s18371`;

CREATE TABLE IF NOT EXISTS `tin-projekt-kruk-s18371`.`Gra`
    ( `idGry` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `nazwaG` VARCHAR(60) NOT NULL ,
      `gatunek` VARCHAR(60) NOT NULL ,
      `edycja` VARCHAR(60) NOT NULL ,
      PRIMARY KEY (`idGry`),
      UNIQUE INDEX `game_id_UNIQUE` (`idGry` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-projekt-kruk-s18371`.`Platforma`
    ( `idPlatformy` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `nazwa` VARCHAR(60) NOT NULL ,
	  `producent` VARCHAR(60) NOT NULL ,
      PRIMARY KEY (`idPlatformy`),
      UNIQUE INDEX `platform_id_UNIQUE` (`idPlatformy` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-projekt-kruk-s18371`.`Wydanie`
    ( `idWydania` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
	  `dataPremiery` DATE NOT NULL ,
      `cena` DECIMAL(10,2) UNSIGNED NOT NULL ,
	  `wersja` DECIMAL(10,4) UNSIGNED NOT NULL ,
      `game_id` INT UNSIGNED NOT NULL ,
      `platform_id` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`idWydania`),
      UNIQUE INDEX `release_id_UNIQUE` (`idWydania` ASC),
      CONSTRAINT `game_fk` FOREIGN KEY (`game_id`) REFERENCES `tin-projekt-kruk-s18371`.`Gra` (`idGry`),
      CONSTRAINT `platform_fk` FOREIGN KEY (`platform_id`) REFERENCES `tin-projekt-kruk-s18371`.`Platforma` (`idPlatformy`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-projekt-kruk-s18371`.`Gra` (`idGry`, `nazwaG`, `gatunek`, `edycja`) VALUES
  (1, 'Call of Duty: Black Ops Cold War', 'FPS', 'standard'),
  (2, 'Battlefield 4', 'FPS', 'standard'),
  (3, 'Call of Duty: Balck Ops Cold War', 'FPS', 'Digital Deluxe')
;

INSERT IGNORE INTO `tin-projekt-kruk-s18371`.`Platforma` (`idPlatformy`, `nazwa`, `producent`) VALUES
  (1, 'PlayStation 4', 'Sony'),
  (2, 'PlayStation 5', 'Sony')
;

INSERT IGNORE INTO `tin-projekt-kruk-s18371`.`Wydanie` (`idWydania`, `game_id`, `platform_id`, `dataPremiery`, `cena`, `wersja`) VALUES
  (1, 1, 1, '2020-10-20', 320.00, 1.01)
;