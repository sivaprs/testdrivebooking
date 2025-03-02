#Test Drive Booking Server

## Build and Test

### Available Scripts

In the server folder, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## API Details

### Location API

| API               | Method | Description             |
| ----------------- | ------ | ----------------------- |
| /api/v1/locations | GET    | Fetch all the locations from vehicle file |

### Booking API

| API              | Method | Description               |
| ---------------- | ------ | ------------------------- |
| /api/v1/bookings | GET    | Checking for slot availability |
| /api/v1/bookings | POST   | Create new booking        |

## Other Details

#### winston logging is implemented and daily rotate file is enabled so you can check logs on the running date as well as earlier dates.

#### Unit test case returned for all the apis. Test files are under server/test folder.
