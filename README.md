<a name="readme-top"></a>

  <h3 align="center">Applicant Management - Code Test</h3>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About


<div>
<h3>Applicant Management - Code Test</h3>
<p align="justify">Meet Applicant Management – the all-in-one solution to streamline operations, boost productivity, and keep your team aligned, wherever they are.</p>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This Project is built with :

* [![ReactJs][React.js]][React-url]
* [![NodeJs][Node.js]][Nodejs-url]
* [![MySQL DB][MySQL]][MySQL-url]
* [![Sequelize ORM][Sequelize]][Sequelize-url]
* [![ExpressJs][Expressjs]][Express-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow the instruction below to install the project locally.

### Installation

Follow the steps below for installation of this project.

1. Clone the repo.
   ```sh
   git clone https://github.com/sodaAPI/EDII-Test-ReactNodeJS.git
   ```
2. Install NPM packages in ./client/ and ./server/
   ```sh
   npm install
   ```
   or
   ```sh
   npm install --force
   ```
3. Add the database in your local server.
4. Setting your databases in ./server/config/database.js, make sure you already create database in your local server.
   ```sh
   const db = new Sequelize("your_databases", "your_database_username", "your_database_password", {
   host: "localhost",
   dialect: "mysql",
   timezone: "+07:00", // Set your timezone
   pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    },
   });
   ```
5. Setting your .env in ./server/.env.
  ```sh
  APP_PORT = #Port
  SESS_SECRET = #Random Number
  SESSION_EXPIRED = #In Hour
  URL_ORIGIN = #Client URL
  EMAIL_API = #Email for nodemail
  PASSWORD_API = #Email password for nodemail
  EMAIL_HOST = #Email type for nodemail
  EMAIL_PORT = #Email port for nodemail
  BASE_DIR = #Base directory for server
  ```
6. Run your MySQL server (i'm using XAMPP).
7. Start Front-End on folder ./client/
   ```js
   npm run dev
   ```
8. Start Back-End in ./server/ folder.
   ```js
   nodemon
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React_Js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-20232A?style=for-the-badge&logo=TailwindCSS&logoColor=06B6D4
[Node.js]: https://img.shields.io/badge/Node_Js-20232A?style=for-the-badge&logo=node.js&logoColor=339933
[MySQL]: https://img.shields.io/badge/MySQL-20232A?style=for-the-badge&logo=mysql&logoColor=4479A1
[Sequelize]: https://img.shields.io/badge/Sequelize-20232A?style=for-the-badge&logo=sequelize&logoColor=52B0E7
[Expressjs]: https://img.shields.io/badge/Express_Js-20232A?style=for-the-badge&logo=express&logoColor=000000
[TailwindCSS-url]: https://tailwindcss.com/
[Express-url]: https://expressjs.com/
[Sequelize-url]: https://sequelize.org/
[MySQL-url]: https://www.mysql.com/
[Nodejs-url]: https://nodejs.org/en/
[React-url]: https://reactjs.org/
