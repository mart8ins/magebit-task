# About project

This project is build because i recieved "Web developer Test" what was sent to me from "Magebit" after i applied for Junior React Developer vacancy.

## Project description

Simple email subscription form with validation on frontend. Responsive for all devices. Data is stored in MySQL database.
When request is sent to servers **/subscriptions** route, it returns simple HTML table where can see all email subscriptions. On this table there are options to sort by name (email), provider and date also filter by provider.
Also search input appears to find specific email adress. Pagination with 10 emails per page.
This test consisted from 3 parts what builded a single application.

### Task 1

_HTML / CSS_

**Task success**

-   [x] Completed all mandatory asked requirements.
-   [x] Used custom icons what was as an advantage requirement

### Task 2

_Javascript_

**Task success**

-   [x] Completed all mandatory asked requirements.
-   [x] Used React framework as an advantage requirement

### Task 3

_PHP / MySQL_

**Task success**

-   [x] Completed all mandatory asked requirements for functionality but instead PHP, Node with ExpressJS was used for backend.
-   [x] Created pagination what was as an advantage requirement. Pagination with 10 emails per page.

# How to run project

-   Fork and clone the projects repository to your local device
-   To run this project you will need to install [NodeJs](https://nodejs.org/en/) on your computer
-   After Node is installed, go to terminal, navigate to projects root directory and run command **npm install**, it will install all needed dependencies to run backend for this project
-   After backend dependencies are installed navigate inside "client" directory and again run command **npm install**, it will install all dependencies for REACT frontend
-   [MySQL](https://www.mysql.com/) is used as database for this applications so you also need to install and configure it
-   Inside client folder run command in terminal **npm run build**, this command will create directory "build" and compile application
-   After frontend "build" is completed, navigate back to applications root folder and in terminal run **npm start**, it will start the ExpressJs server and serve React frontend application on **http://localhost:3001/**. To see HTML table with all submited emails go to **http://localhost:3001/subscriptions**
