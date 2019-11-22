CREATE USER 'domore'@'localhost' IDENTIFIED BY 'domore@';
CREATE USER 'domore'@'%' IDENTIFIED BY 'domore@';
CREATE USER 'domore'@'127.0.0.1' IDENTIFIED BY 'domore@';

DROP DATABASE IF EXISTS domore;

CREATE DATABASE domore DEFAULT charset 'UTF8' DEFAULT COLLATE 'utf8_general_ci';
USE domore;

GRANT ALL PRIVILEGES ON domore.* TO 'domore'@'localhost';
GRANT ALL PRIVILEGES ON domore.* TO 'domore'@'%';
GRANT ALL PRIVILEGES ON domore.* TO 'domore'@'127.0.0.1';

CREATE TABLE tb_users(
	id_user INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,		
    CONSTRAINT PK_USER PRIMARY KEY (id_user)
)DEFAULT CHARACTER SET 'UTF8';

INSERT INTO TB_USERS(username, password, name, email) VALUES('daniel', '12345', 'daniel munhoz', 'dc.munhoz@hotmail.com');