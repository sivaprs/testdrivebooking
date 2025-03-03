# Vehicle Test Drive Booking Application

It is a web application for user to reserve to test drive vehicle.

### Client Application

#### Tech Stack

1. ReactJS(version 19)
2. Material UI (version 5)

Details about how to run and test are mentioned in Readme in the client folder along with Source files in client folder.

### Server Application

#### Tech Stack

1. NodeJS (version v20.14.0)
2. Express Framework (version 4.21)
3. Winston (for logging)

Details about how to run and test as well as api details are mentioned in Readme in the server folder along with Source files in server folder.

### Data Presistance 

 Both Vechicles and Reversations are stored as JSON (as per the requirement) in the server/db folder.

### Build and Test
Run the below command in the main folder

$ docker-compose up --build -d

Access application : 
http://localhost:3000/home

Default - vehicle type set as tesla_model3 in UI. If we want to override can pass type in query string as http://localhost:3000/home?type=tesla_model3






