// src/screens/Profilescreen.js

import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Swal from 'sweetalert2';
import { Divider, Flex, Tag } from 'antd';

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  const items = [
    {
      key: '1',
      label: 'Profile',
      children: <MyProfile user={user} />,
    },
    {
      key: '2',
      label: 'Bookings',
      children: <MyBookings />,
    },
  ];

  return (
    <div className='md-3 mt-3 ml-4'>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Profilescreen;

export function MyProfile({ user }) {
  return (
    <div className='ml-2 bs mr-4'>
      <h1>My Profile</h1>
      <br />
      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>isAdmin:</b> {user?.isAdmin ? 'Yes' : 'No'}</p>
    </div>
  );
}

export function MyBookings() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem('currentUser')));


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true);
        const data = await axios.post(`${process.env.REACT_APP_BURL}/api/bookings/getbookingsbyuserid`, {
          userid: user._id,
        });
        setBookings(data.data);
        setloading(false);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setloading(false);
        seterror(error);
      }
    };

    if (user && user._id) {
      fetchBookings();
    }
  }, [user]);

  async function cancleBooking(bookingid, roomid) {
    try {
      setloading(true)
      const result = await (await axios.post(`${process.env.REACT_APP_BURL}/api/bookings/cancelbooking`, { bookingid, roomid })).data
      console.log(result)
      setloading(false)
      Swal.fire('Booking Cancelled.').then(result => {
        window.location.reload()
      })

    } catch (error) {
      console.log(error)
      setloading(false)
      Swal.fire("OOPS", " something went wrong ", "error")
    }
  }

  return (
    <div>
      <div className='row'>
        <div className='"col-md-6'>
          {loading && (<Loader></Loader>)}
          {bookings && (bookings.map(booking => {
            return <div className='ml-5 bs '>
              <h1>{booking.room}</h1>
              <p><b>Booking Id</b> - {booking._id}</p>
              <p><b>CheckIn</b> : {booking.fromdate}</p>
              <p><b>CheckOut</b> : {booking.todate}</p>
              <p><b>Amount</b> : {booking.totalAmount}</p>
              <p><b>Status</b> : {booking.status == 'Booked' ? (<Tag color="green">Booked</Tag>) : ( <Tag color="red">cancelled</Tag>)}</p>
              {booking.status == 'Booked' && (<div className='text-right'>
                <button className='btn btn-primary' onClick={() => { cancleBooking(booking._id, booking.roomid) }}>CANCLE BOOKING</button>
              </div>)}
            </div>
          }))}
        </div>
      </div>
    </div>
  );
}
