INSERT INTO Users( username, password, email,name,last_name) VALUES( 'admin', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'kapitonasjonas@gmail.com', 'Jonas' ,'Kapitonas');
INSERT INTO Users( username, password, email,name,last_name) VALUES( 'user', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'user@gmail.com', 'Nikolas' ,'Cage');

INSERT INTO Roles(role_id, role) VALUES(1, 'ADMIN');
INSERT INTO Roles(role_id, role) VALUES(2, 'EMPLOYEE');
INSERT INTO Roles(role_id, role) VALUES(3, 'CUSTOMER');

INSERT INTO Users_Roles(user_id, role_id) VALUES(1, 1);
INSERT INTO Users_Roles(user_id, role_id) VALUES(2, 2);
