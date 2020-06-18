# largeproject

## Setup
Setup should be easy for all systems because it just requires NodeJS and MongoDB installations.

1. Download and install [NodeJS](https://nodejs.org/en/) for your system.
2. Download and install [MongoDB](https://www.mongodb.com/try/download/community) for your system.
	+ You may also get [MongoDB Compass](https://www.mongodb.com/try/download/compass) which will help with manually configuring the DB.
3. Run this command with previleges.
	+ Windows:
		1. Open PowerShell as administrator
		2. `npm install -g expo-cli`
	+ Max/Linux:
		1. `sudo npm install -g expo-cli`
4. Run the following commands (run in the project root).
```bash
cd web
npm install
cd ../mobile
npm install
cd ..
```

## Web App
To run the web app, go into the `web` folder and run `npm start`. This launches both the front-end and the back-end. The browser should open automatically to http://localhost:3000

## Mobile App

### Using Expo
Install Expo on your phone's app store.

In the `mobile` directory, run `npm run web`. This will launch your web browser. In the bottom left, there's a QR code. Scan that code, and Expo will open automatically and start downloading assets.

### Using a simulator
If you're running a system capable of simulator your device, you may follow the instructions [here](https://docs.expo.io/get-started/installation/#running-the-expo-client-on-your-computer) to set that up.

## Building
To get production-worthy code for the front-end, run `npm run build` from the `frontend` directory. This will automatically minimize HTML, CSS, and JS assets as well as making the JS code compatible for older web browsers. So feel free to using ES6 syntax for the front-end!

Note that production code should run quite smooth compared to unoptimized code.

## Technical Info
+ The API server runs on port 8000.
+ React has it's own development server that serves you the web assets. This is on port 3000.
+ React automatically refreshes the page when you make changes.
+ The server automatically restarts when you make changes but will not refresh the page as it isn't always necessary.
+ In development, the React server will automatically forward all /api requests to the backend.
+ React supports ES6 by default. I have also configured the backend to support it as well.