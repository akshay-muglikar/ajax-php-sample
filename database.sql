
CREATE DATABASE TEMPDB;
Create table job_type(job_type_id int not null auto_increment primary key, job_type_desc varchar(100));

CREATE TABLE EMPLOYEE(firstname varchar(100),lastname varchar(100), gender varchar(20), job_type_id int , id int not null auto_increment primary key, foreign key(job_type_id) references Job_type(job_type_id));

insert into job_type(job_type_desc) values ('job_type1'),('job_type2'),('job_type3');

CREATE USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Testakshay@123';

GRANT ALL PRIVILEGES ON *.* TO 'test'@'localhost';
