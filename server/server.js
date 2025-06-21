const express = require("express")
const mongoose = require("mongoose")
const roomsRoute = require("./routes/roomsRoute.js")
const usersRoute = require("./routes/usersRoute.js")
const bookingsroute = require("./routes/bookingsroute.js")
const dotenv = require("dotenv")
dotenv.config();

const app = express();
const cors = require("cors");

// REMOVE: app.use(cors());
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));



app.use(express.json());


const Room = require("./models/room.js");
const { error } = require("console");

async function databaseconnection() {
    await mongoose.connect(`${process.env.MONGO_URL}`);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));

databaseconnection().then((res) => {
    console.log("connected to db")
//     try {
//     temp(); 
// } catch (err) {
//     console.log(err);
// }
}).catch((error) => {
    console.log("Error in connection of db.")
    console.log(error)
})

// let data = [
//   {
//     "name": "Executive Suite",
//     "maxcount": 3,
//     "phonenumber": 9876512340,
//     "rentperday": 3200,
//     "imageurls": [
//       "https://cdn.grandvistahanoi.com/room/executive-suite/living-room.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Delux",
//     "description": "Luxury suite with all modern amenities and king-sized bed."
//   },
//   {
//     "name": "Standard Room",
//     "maxcount": 2,
//     "phonenumber": 9876543211,
//     "rentperday": 1500,
//     "imageurls": [
//       "https://www.admiralhotelmanila.com/images/standard-room.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Non-Delux",
//     "description": "A cozy room with all the essentials at an affordable price."
//   },
//   {
//     "name": "Family Room",
//     "maxcount": 5,
//     "phonenumber": 9876501234,
//     "rentperday": 4000,
//     "imageurls": [
//       "https://www.ecentralhotel.com/images/executive-king-suite.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Non-Delux",
//     "description": "Spacious room perfect for families with kids."
//   },
//   {
//     "name": "Economy Room",
//     "maxcount": 2,
//     "phonenumber": 9876523456,
//     "rentperday": 1200,
//     "imageurls": [
//       "https://upload.wikimedia.org/wikipedia/commons/9/9b/Small_hotel_room.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Non-Delux",
//     "description": "Budget-friendly room with basic facilities."
//   },
//   {
//     "name": "Deluxe Room",
//     "maxcount": 3,
//     "phonenumber": 9876534567,
//     "rentperday": 2500,
//     "imageurls": [
//       "https://halongpearlhotel.vn/assets/images/executive-suite.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Delux",
//     "description": "Comfortable room with modern design and amenities."
//   },
//   {
//     "name": "Single Room",
//     "maxcount": 1,
//     "phonenumber": 9876545678,
//     "rentperday": 1000,
//     "imageurls": [
//       "https://cdn.pixabay.com/photo/2016/11/22/19/14/hotel-room-1854143_1280.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Non-Delux",
//     "description": "Ideal for solo travelers looking for comfort and privacy."
//   },
//   {
//     "name": "Couple Room",
//     "maxcount": 2,
//     "phonenumber": 9876556789,
//     "rentperday": 2200,
//     "imageurls": [
//       "https://www.tridenthotels.com/sites/default/files/styles/slider_image/public/slider/hotel-rooms-in-bhubaneswar.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Non-Delux",
//     "description": "Perfect for couples with cozy interiors and ambiance."
//   },
//   {
//     "name": "Penthouse Suite",
//     "maxcount": 6,
//     "phonenumber": 9876567890,
//     "rentperday": 6000,
//     "imageurls": [
//       "https://images.squarespace-cdn.com/content/v1/5a16e8d7f6576e8fc4f8f56c/1603705128252-CEAZTJMGN5CWT9JV08P0/Penthouse+Suite.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Delux",
//     "description": "Top-floor suite with stunning views and premium features."
//   },
//   {
//     "name": "Business Room",
//     "maxcount": 2,
//     "phonenumber": 9876578901,
//     "rentperday": 2800,
//     "imageurls": [
//       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/236783925.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Non-Delux",
//     "description": "Designed for business travelers with workspace and fast Wi-Fi."
//   },
//   {
//     "name": "Resort Villa",
//     "maxcount": 4,
//     "phonenumber": 9876589012,
//     "rentperday": 4500,
//     "imageurls": [
//       "https://media.cntraveler.com/photos/5cb63c1be4b8d63407e9fbb1/16:9/w_2560%2Cc_limit/MilaidhooIslandMaldives-Villa-2019-2.jpg"
//     ],
//     "currentbookings": [],
//     "type": "Delux",
//     "description": "Private villa with garden view, ideal for a peaceful getaway."
//   }
// ];


// temp = async () => {
//     await Room.insertMany(data)
// }

// temp();

app.use('/api/rooms' , roomsRoute)
app.use('/api/users' , usersRoute)
app.use("/api/bookings" , bookingsroute)
