CREATE USER 'domore'@'localhost' IDENTIFIED BY 'domore@';
CREATE USER 'domore'@'%' IDENTIFIED BY 'domore@';
CREATE USER 'domore'@'127.0.0.1' IDENTIFIED BY 'domore@';

DROP DATABASE IF EXISTS domore;

CREATE DATABASE domore DEFAULT charset 'UTF8' DEFAULT COLLATE 'utf8_general_ci';
USE domore;

GRANT ALL PRIVILEGES ON domore.* TO 'domore'@'localhost';
GRANT ALL PRIVILEGES ON domore.* TO 'domore'@'%';
GRANT ALL PRIVILEGES ON domore.* TO 'domore'@'127.0.0.1';

DROP TABLE IF EXISTS TB_USERS;
CREATE TABLE tb_users(
	id_user INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,		
    CONSTRAINT PK_USER PRIMARY KEY (id_user)
)DEFAULT CHARACTER SET 'UTF8';

INSERT INTO TB_USERS(username, password, name, email) VALUES('daniel', '12345', 'daniel munhoz', 'dc.munhoz@hotmail.com');


DROP TABLE IF EXISTS TB_TODOS;
CREATE TABLE tb_todos(
	id_todo INT NOT NULL AUTO_INCREMENT,
	id_user INT NOT NULL,
	done BOOL NOT NULL DEFAULT false,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(255),
	dt_creation DATETIME DEFAULT NOW(),
	dt_update DATETIME ON UPDATE NOW(),
	CONSTRAINT PK_TODO PRIMARY KEY (id_todo)
)DEFAULT CHARACTER SET 'UTF8';
ALTER TABLE tb_todos ADD CONSTRAINT FK_USER_TODO FOREIGN KEY (id_user) REFERENCES tb_users(id_user);

DROP TABLE IF EXISTS TB_GROUPS;
CREATE TABLE tb_groups(
	id_group INT NOT NULL AUTO_INCREMENT,
	id_user  INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	CONSTRAINT PK_GROUP PRIMARY KEY (id_group)
) DEFAULT CHARACTER SET "UTF8";
ALTER TABLE tb_groups ADD CONSTRAINT FK_USER_GROUP FOREIGN KEY (id_user) REFERENCES tb_users(id_user); 

DROP TABLE IF EXISTS tb_groupxtodos;
CREATE TABLE tb_groupxtodos(
	id_groupxtodos INT NOT NULL AUTO_INCREMENT,
	id_group INT NOT NULL,
	id_todo INT NOT NULL UNIQUE,
	CONSTRAINT pk_groupxtodos PRIMARY KEY (id_groupxtodos)
)DEFAULT CHARACTER SET "UTF8";
alter table tb_groupxtodos add constraint fk_group_groupxtodos foreign key (id_group) references tb_groups(id_group) ON DELETE CASCADE;
ALTER TABLE tb_groupxtodos ADD CONSTRAINT fk_todo_groupxtodos FOREIGN KEY (id_todo) REFERENCES tb_todos(id_todo) ON DELETE CASCADE;

