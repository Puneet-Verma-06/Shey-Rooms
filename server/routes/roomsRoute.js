const express = require("express");
const router = express.Router();

const Room = require("../models/room.js")


router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({})
    res.send(rooms)
  } catch (error) {
    res.status(400).json({ message: error })
  }
});

// GET /api/rooms/getroom/:roomid
// Corrected route
router.get("/getroombyid/:roomid", async (req, res) => {
  const roomid = req.params.roomid;



  try {
    const room = await Room.findById(roomid);
    if (room) {
      res.send(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/addroom', async (req, res) => {
  try {
    const newroom = new Room(req.body)
    await newroom.save()
    res.send("New Room Added Successfully.")

  } catch (error) {
return res.status(400).json({error})
  }
})




module.exports = router