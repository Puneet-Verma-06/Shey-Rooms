const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")
const Room = require("../models/room")



router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalAmount,
        totalDays,
    } = req.body
    try {
        console.log("Booking data received:", req.body);
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalAmount,
            totalDays,
            transactionId: '1234'
        })
        const booking = await newbooking.save();
        console.log("Booking saved:", booking);
        const roomtemp = await Room.findOne({ _id: room._id })
        roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate, todate: todate, userid: userid, status: booking.status })

        await roomtemp.save();
        console.log("Room updated with new booking");
        res.send("Room Booked Successfully.")

    } catch (error) {
        console.error("Booking error:", error);
        return res.status(400).json({ error })
    }
});


router.post("/getbookingsbyuserid", async (req, res) => {

    const userid = req.body.userid

    try {
        const bookings = await Booking.find({ userid: userid })
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.post('/cancelbooking', async (req, res) => {
  console.log("Request body:", req.body); 
  const { bookingid, roomid } = req.body;

  if (!bookingid || !roomid) {
    return res.status(400).json({ error: "bookingid or roomid missing" });
  }

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    if (!bookingitem) {
      return res.status(404).json({ error: "Booking not found" });
    }

    bookingitem.status = 'Cancelled';
    await bookingitem.save();
    console.log("Booking cancelled:", bookingid);

    const room = await Room.findOne({ _id: roomid });

    if (!room) {
      console.log("Room not found for ID:", roomid);
      return res.status(404).json({ error: "Room not found" });
    }

    const updatedBookings = room.currentbookings.filter(
      booking => booking.bookingid.toString() !== bookingid
    );

    room.currentbookings = updatedBookings;
    await room.save();

    console.log("Room updated:", roomid);
    return res.send("Your Booking Cancelled Successfully.");

  } catch (error) {
    console.error("Cancel booking error:", error);
    return res.status(400).json({ error: error.message });
  }
});

router.get('/getallbookings' , async(req , res)=>{
try {
  const bookings = await Booking.find()
  res.send(bookings)
} catch (error) {
  return res.status(400).json({ error })
}
})

module.exports = router;