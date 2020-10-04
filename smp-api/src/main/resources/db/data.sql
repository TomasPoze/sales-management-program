INSERT INTO Users( username, password, email,name,last_name) VALUES( 'admin', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'kapitonasjonas@gmail.com', 'Jonas' ,'Kapitonas');
INSERT INTO Users( username, password, email,name,last_name) VALUES( 'user', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'user@gmail.com', 'Nikolas' ,'Cage');

INSERT INTO Clients(address,bank_acc_nr,code,email,title) VALUES ('Zirmunu','LT2134123412341234','1233213','ltucrafteriai@gmail.com','Jonas Biliunas');
INSERT INTO Users( username, password, email,name,last_name,client_client_id) VALUES( 'client', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'client@gmail.com', 'Donald' ,'Grump',1);

INSERT INTO Users( username, password, email,name,last_name) VALUES( 'buhal', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'buhal@gmail.com', 'Smygolas' ,'Rage');

-- INSERT INTO ORDERS (ORDER_ID,ORDER_DATE,ORDER_NUMBER,ORDER_STATUS,ORDER_SUM,CLIENT_CLIENT_ID) VALUES (1, '2020-09-09' ,'U-00001','NAUJAS',100,1);

INSERT INTO Roles(role_id, role) VALUES(1, 'ADMIN');
INSERT INTO Roles(role_id, role) VALUES(2, 'EMPLOYEE');
INSERT INTO Roles(role_id, role) VALUES(3, 'CLIENT');
INSERT INTO Roles(role_id, role) VALUES(4, 'ACCOUNTANT');

INSERT INTO Users_Roles(user_id, role_id) VALUES(1, 1);
INSERT INTO Users_Roles(user_id, role_id) VALUES(2, 2);
INSERT INTO Users_Roles(user_id, role_id) VALUES(3, 3);
INSERT INTO Users_Roles(user_id, role_id) VALUES(4, 4);

INSERT INTO Products_Category(category) VALUES ('Kompiuterine technika');
INSERT INTO Products_Category(category) VALUES ('Autoprekės');
INSERT INTO Products_Category(category) VALUES ('Knygos');

INSERT INTO Products(price,purchase_cost,sku,title,category_id) VALUES (10,12,'LKK403KT','Pele',1);
INSERT INTO Products(price,purchase_cost,sku,title,category_id) VALUES (40,45,'LKK401KT','Klaviatura',1);
INSERT INTO Products(price,purchase_cost,sku,title,category_id) VALUES (249.99,260,'LKK499KT','Moniturius',1);
INSERT INTO Products(price,purchase_cost,sku,title,category_id) VALUES (118,120,'LKA233AP','Navigacija TomTom',2);
INSERT INTO Products(price,purchase_cost,sku,title,category_id) VALUES (5,9,'LKK100KN','Altorių šėšėly',3);