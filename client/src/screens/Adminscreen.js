import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Swal from 'sweetalert2';

const items = [
  {
    key: '1',
    label: 'Bookings',
    children: <Bookings></Bookings>,
  },
  {
    key: '2',
    label: 'Rooms',
    children: <Rooms></Rooms>,
  },
  {
    key: '3',
    label: 'Add Rooms',
    children: <h1><AddRoom></AddRoom></h1>,
  },
  {
    key: '4',
    label: 'Users',
    children: <h1><Users></Users></h1>,
  },
];

function Adminscreen() {

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = '/home'
    }
  }, [])
  return (
    <div className="mt-3 ml-3 bs mr-3">
      <h2>Admin Panel</h2>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Adminscreen;




export function Bookings() {
  const [bookings, setbookings] = useState([])
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState()
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true);
        const response = await axios.get(`${process.env.REACT_APP_BURL}/api/bookings/getallbookings`);
        console.log(" Bookings fetched:", response.data);
        setbookings(response.data);
        setloading(false);
      } catch (err) {
        console.error(" API error:", err);
        seterror(err);
        setloading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-12'>

        <h1>Bookings</h1>
        {loading && <Loader></Loader>}

        <table className='table table-bordered table-dark'>
          <thead className='bs '>
            <tr>
              <th>Booking Id</th>
              <th>Room Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading && bookings && (bookings.map(booking => {
              return <tr>
                <td>{booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.room}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
                <td>{booking.status}</td>
              </tr>
            }))}
          </tbody>
        </table>



      </div>
    </div>
  )
}



export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setloading(true);
        const response = await axios.get(`${process.env.REACT_APP_BURL}/api/rooms/getallrooms`);
        console.log(" Rooms fetched:", response.data);
        setrooms(response.data);
        setloading(false);
      } catch (err) {
        console.error(" API error:", err);
        seterror(err);
        setloading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}
        {error && <Error message="Failed to fetch rooms" />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              rooms &&
              rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}




export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setloading(true);
        const response = await axios.get(`${process.env.REACT_APP_BURL}/api/users/getallusers`);
        console.log(" Users fetched:", response.data);
        setusers(response.data);
        setloading(false);
      } catch (err) {
        console.error(" API error:", err);
        seterror(err);
        setloading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Users</h1>
        {loading && <Loader />}
        {error && <Error message="Something went wrong" />}
        {!loading && users.length > 0 && (
          <table className='table table-bordered table-dark'>
            <thead className='bs'>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && users.length === 0 && <h5>No users found.</h5>}
      </div>
    </div>
  );
}


//Add Room Component.



export function AddRoom() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const [name, setname] = useState('')
  const [rentperday, setrentperday] = useState()
  const [maxcount, setmaxcount] = useState()
  const [description, setdescription] = useState()
  const [phonenumber, setphonenumber] = useState()
  const [type, settype] = useState()
  const [imageurl1, setimageurl1] = useState()
  const [imageurl2, setimageurl2] = useState()
  const [imageurl3, setimageurl3] = useState()

  async function addRoom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3]
    }
    try {
      setloading(true)
      const result = await (await axios.post(`${process.env.REACT_APP_BURL}/api/rooms/addroom`, newroom))
      console.log(result.data)
      setloading(false)
      Swal.fire('Congrats', "Your Room Added Successfully.", 'Success').then(result => {
        window.location.href = '/home'
      })
    } catch (error) {
      console.log(error)
      setloading(false)
      Swal.fire('OOPS', "Something went wrong.", 'Failed')
    }
  }

  return (
    <div className='row'>

      <div className='col-md-5'>
        {loading && <Loader></Loader>}
        <input type='text' className='form-control' placeholder='Room Name'
          value={name} onChange={(e) => { setname(e.target.value) }}
        ></input>
        <input type='text' className='form-control' placeholder='Rent Pre Day'
          value={rentperday} onChange={(e) => { setrentperday(e.target.value) }}
        ></input>
        <input type='text' className='form-control' placeholder='Max count'
          value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }}
        ></input>
        <input type='text' className='form-control' placeholder='Description'
          value={description} onChange={(e) => { setdescription(e.target.value) }}
        ></input>
        <input type='text' className='form-control' placeholder='Phone Number'
          value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }}
        ></input>
      </div>

      <div className='col-md-5'>
        <input type='text' className='form-control' placeholder='type'
          value={type} onChange={(e) => { settype(e.target.value) }}
        ></input>
        <input type='text' className='form-control' placeholder='image url 1'
          value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }}
        ></input>
        <input type='text' className='form-control' placeholder='image url 2'
          value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }}
        ></input>
        <input type='text' className='form-control' placeholder='image url 3'
          value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }}
        ></input>
        <div className='text-right'>
          <button className='btn btn-primary' onClick={addRoom}>Add Room</button>
        </div>
      </div>
    </div>
  )
}
