<!-- PROJECT LOGO -->

<p align="center">
   <p align="center">
    <img src="https://s03.s3c.es/imag/_v0/770x420/9/0/3/600x400_770x420-biblioteca-cambio-de-rol-dreamstime.jpg" alt="Logo" width="80" height="80">
  </p>
   
  <p align="center">
    Biblioteca
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#authentication">Authentication</a></li>
    <li><a href="#routes">Routes</a></li>
    <li><a href="#queris">Queris</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## Installation

1. Clone the repo

   ```sh
   git clone https://github.com/martinEchavez/Biblioteca
   ```

2. Install NPM packages

   ```bash
   npm install
   ```

## Usage

1. Create an `.env` file with the following environment variables.

   | name              |        value        |
   | ----------------- | :-----------------: |
   | PORT              |        3000         |
   | CLIENT_DB         |  db client sqlite3  |
   | FILENAME_DATABASE | connection filename |
   | JWT_SECRET_KEY    |   JWT secret key    |

2. Run the following command

   ```bash
     npm run dev
   ```

## Authentication

### credentials

| name     | value |
| -------- | :---: |
| username | admin |
| password | admin |

| `POST` | : `https://mutualser-biblioteca.herokuapp.com/api/auth/signup`

| `POST` | : `https://mutualser-biblioteca.herokuapp.com/api/auth/signin`

`Body Json Input`

```json
{
  "username": "admin",
  "password": "admin"
}
```

`Response`

```json
{
  "response": {
    "message": "success",
    "status": 200,
    "auth": true,
    "token": "eyJhbGciOi"
  }
}
```

## Routes

### authetication

> | `POST` | : `https://mutualser-biblioteca.herokuapp.com//api/auth/signup`

> | `POST` | : `https://mutualser-biblioteca.herokuapp.com/api/auth/signin`

## Queris

> SELECT \* FROM book

> SELECT \* FROM reader

> SELECT \* FROM loanbook

## License

[MIT](https://choosealicense.com/licenses/mit/)
