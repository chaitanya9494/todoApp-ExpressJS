CREATE DATABASE IF NOT EXISTS todo_app_db;
USE todo_app_db;

CREATE USER IF NOT EXISTS 'todouser'@'%' IDENTIFIED BY 'todopassword';
GRANT ALL PRIVILEGES ON todo_app_db.* TO 'todouser'@'%';
FLUSH PRIVILEGES;
