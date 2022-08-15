DROP TABLE IF EXISTS `guest`;
CREATE TABLE `guest`(
`id` INT NOT NULL AUTO_INCREMENT,
`host` BOOLEAN DEFAULT false,
`name` VARCHAR(255),
`email` VARCHAR(255),
`password` VARCHAR(255),
`active` BOOLEAN DEFAULT false,
`attend` BOOLEAN DEFAULT false,
`accom` BOOLEAN DEFAULT false,
`park` BOOLEAN DEFAULT false,
PRIMARY KEY (`id`)
);