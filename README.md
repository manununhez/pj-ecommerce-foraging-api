# Express Backend API

This Express backend API provides endpoints for interacting with various data related to an experiment or survey. It includes functionalities for retrieving initial data, complete results, and per-user results, as well as saving data from forms and user interactions.

## Installation

To run this Express backend locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Create a `.env` file in the root directory and add necessary environment variables if required.

## Usage

To start the server, run `npm start`. The server will listen on the specified port (default is 5000).

## Endpoints

Here are the available endpoints:

- `GET /versions`: Get initial data.
- `GET /psform/:sex`: Get form data based on gender.
- `GET /apptext/:sex`: Get application text data based on gender.
- `GET /inituserdata/:version`: Get initial user data based on version.
- `GET /bargains-result/:type`: Get complete bargains result.
- `GET /bargains-result-per-store/:type`: Get bargains result per store.
- `GET /survey-result/:type`: Get complete survey result.
- `GET /demographic-result/:type`: Get complete demographic result.
- `GET /memory-result/:type`: Get complete memory task result.
- `GET /users`: Get all users.
- `GET /participants-count-result`: Get count of participants.
- `GET /bargains-result/:type/:userId`: Get bargains result per user.
- `GET /bargains-result-per-store/:type/:userId`: Get bargains result per store per user.
- `GET /survey-result/:type/:userId`: Get survey result per user.
- `GET /demographic-result/:type/:userId`: Get demographic result per user.
- `GET /memory-result/:type/:userId`: Get memory task result per user.
- `GET /convert-short-stores`: Convert short stores.
- `GET /convert-long-stores`: Convert long stores.
- `GET /stores-long`: Get long stores from file.
- `GET /stores-short`: Get short stores from file.
- `POST /upload-stores`: Upload stores data.
- `POST /psform`: Create PS form data.
- `POST /visualpattern`: Create visual pattern data.
- `POST /userinfo`: Create user info data.
- `POST /userlogtime`: Create user log time data.
- `POST /usergeneraldata`: Create user general data.
- `POST /userbargain`: Create user bargain data.

## Configuration

You may need to set environment variables in a `.env` file for configuration. Common variables include:

- `PORT`: The port on which the server will listen.
- Other database-related variables if required.

## Technologies Used

- Node.js
- Express.js
- dotenv
- cors
- express-fileupload
- compression

## Contributing

Contributions to this project are currently not open to the public. However, if you are interested in collaborating or have inquiries about the project, please contact the project maintainers.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
