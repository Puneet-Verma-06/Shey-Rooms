import React, { useState, useEffect } from 'react'
import axios from "axios";
import Room from '../component/Room';
import Loader from '../component/Loader';
import Error from '../component/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;

function Homescreen() {

  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState()
  const [error, seterror] = useState()

  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([])
  const [searchkey , setsearchkey] = useState('')
  const [type , settype] = useState("all")

  useEffect(() => {

    const fetchData = async () => {
      try {
        setloading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_BURL}/api/rooms/getallrooms`)
        setrooms(data)
        setduplicaterooms(data)
        setloading(false)
        // console.log(data)
      } catch (error) {
        seterror(true)
        console.log(error)
        setloading(false)
      }
    }

    fetchData()
  }, [])

  function filterByDate(dates) {
    const selectedFrom = moment(dates[0]).startOf('day');
    const selectedTo = moment(dates[1]).startOf('day');

    setfromdate(selectedFrom);
    settodate(selectedTo);

    const availableRooms = [];

    for (const room of duplicaterooms) {
      let isAvailable = true;

      if (room.currentbookings && room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          const bookingFrom = moment(booking.fromdate, 'DD-MM-YYYY').startOf('day');
          const bookingTo = moment(booking.todate, 'DD-MM-YYYY').startOf('day');

          if (
            selectedFrom.isSameOrBefore(bookingTo) &&
            selectedTo.isSameOrAfter(bookingFrom)
          ) {
            isAvailable = false;
            break;
          }
        }
      }

      if (isAvailable) {
        availableRooms.push(room);
      }
    }

    setrooms(availableRooms);
  }




  // function filterByDate(dates) {
  //   if (dates && dates.length === 2) {
  //     const startDate = moment(dates[0]).format('DD-MM-YYYY');
  //     const endDate = moment(dates[1]).format('DD-MM-YYYY');
  //     console.log('Start Date:', startDate);
  //     console.log('End Date:', endDate);
  //   } else {
  //     console.log('Date range not selected.');
  //   }
  // }

  function filterBySearch(){
    const temprooms = duplicaterooms.filter(room=> room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms)
  }

  function filterByType(e){
    settype(e)
    if(e!='all'){
      const temprooms = duplicaterooms.filter(room =>room.type.toLowerCase()==e.toLowerCase())
    setrooms(temprooms)
    }
    else{
      setrooms(duplicaterooms)
    }
  }


  return (
    <div className='container'>

      <div className='row mt-5 bs'>
        <div className='col-md-3 '>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

        <div className='col-md-5'>
          <input type='text' className='form-control' placeholder='search rooms' 
          value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
          ></input>
        </div>
        <div className='col-md-3'>
          <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}} >
            <option value={"all"}>All</option>
            <option value={"delux"}>Delux</option>
            <option value={"non-delux"}>Non-Delux</option>
          </select>
        </div>
      </div>

      <div className='row  d-flex justify-content-center flex-wrap gap-3 mt-5'>

        {loading ? (<Loader></Loader>)  : (rooms?.map(room => {
          return (
            <div key={room._id} className='col-md-9 mt-2'>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          );
        })

        )}
      </div>
    </div>
  )
}

export default Homescreen