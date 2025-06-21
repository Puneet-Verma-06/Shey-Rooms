import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import Error from '../component/Error';
import moment from 'moment';
import Swal from 'sweetalert2'

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [totalAmount, settotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
if(!localStorage.getItem('currentUser')){
  window.location.reload = '/login'
}

    const fetchData = async () => {
      try {
        setloading(true);

        const { data } = await axios.get(`/api/rooms/getroombyid/${roomid}`);
        setRoom(data);

        // calculate total days only after dates and room data are available
        if (fromdate && todate) {
          const from = moment(fromdate, 'YYYY-MM-DD');
          const to = moment(todate, 'YYYY-MM-DD');
          const days = to.diff(from, 'days') + 1;

          setTotalDays(days);
          settotalAmount(data.rentperday * days);
        }

        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };

    fetchData();
  }, [roomid, fromdate, todate]);

  async function bookRoom() {
    const bookingdetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalAmount,
      totalDays,
    };

    try {
      await axios.post('/api/bookings/bookroom', bookingdetails);
      alert('Room booked!');
    } catch (error) {
      console.error(error);
    }
  }

  // Slider navigation handlers
  const handlePrev = () => {
    if (room?.imageurls && room.imageurls.length > 1) {
      setCurrentImg((prev) => (prev === 0 ? room.imageurls.length - 1 : prev - 1));
    }
  };
  const handleNext = () => {
    if (room?.imageurls && room.imageurls.length > 1) {
      setCurrentImg((prev) => (prev === room.imageurls.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="booking-screen-bg">
      <div className="booking-container">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : error ? (
          <Error />
        ) : (
          <div className="row justify-content-center mt-5  booking-row">
            <div className="col-md-6 booking-image-col">
              <div className="booking-image-card">
                <h1 className="room-title">{room.name}</h1>
                <div className="booking-slider-wrapper">
                  {room.imageurls && room.imageurls.length > 1 ? (
                    <div className="booking-slider">
                      <button className="slider-arrow left" onClick={handlePrev} aria-label="Previous image">&#8592;</button>
                      <img
                        src={room.imageurls[currentImg]}
                        alt={`room ${currentImg + 1}`}
                        className="booking-room-img main-room-img slider-img"
                      />
                      <button className="slider-arrow right" onClick={handleNext} aria-label="Next image">&#8594;</button>
                      <div className="slider-dots">
                        {room.imageurls.map((_, idx) => (
                          <span
                            key={idx}
                            className={`slider-dot${idx === currentImg ? ' active' : ''}`}
                            onClick={() => setCurrentImg(idx)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <img
                      src={room.imageurls?.[0]}
                      alt="room"
                      className="booking-room-img main-room-img slider-img"
                      style={{ maxWidth: '320px', maxHeight: '220px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #2563eb', boxShadow: '0 4px 16px rgba(37, 99, 235, 0.12)' }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6 booking-details-col">
              <div className="booking-details-card">
                <h1 className="details-title">Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name: {JSON.parse(localStorage.getItem('currentUser')).name}
                  </p>
                  <p>
                    From date:{' '}
                    {fromdate ? moment(fromdate).format('DD-MM-YYYY') : 'N/A'}
                  </p>
                  <p>
                    To date:{' '}
                    {todate ? moment(todate).format('DD-MM-YYYY') : 'N/A'}
                  </p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
                <div className="booking-amount-card">
                  <h1 className="amount-title">Amount</h1>
                  <hr />
                  <p>Total days: {totalDays}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalAmount}</p>
                </div>
                <div className="booking-btn-wrapper">
                  <button className="btn btn-primary booking-btn" onClick={bookRoom}>
                    Pay now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .booking-screen-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
          padding: 40px 0;
        }
        .booking-container {
          max-width: 1100px;
          margin: 0 auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(60, 72, 88, 0.12);
          padding: 40px 30px;
        }
        .booking-row {
          gap: 32px;
        }
        .booking-image-card {
          background: #f4f6fb;
          border-radius: 14px;
          padding: 24px 18px 18px 18px;
          box-shadow: 0 2px 8px rgba(60, 72, 88, 0.08);
        }
        .room-title {
          font-size: 2.1rem;
          font-weight: 700;
          margin-bottom: 18px;
          color: #2d3748;
        }
        .booking-slider-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .booking-slider {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slider-img {
          width: 320px;
          height: 220px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid #2563eb;
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.12);
          margin: 0 32px;
          transition: box-shadow 0.2s;
        }
        .slider-arrow {
          background: rgba(37, 99, 235, 0.85);
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          transition: background 0.2s;
        }
        .slider-arrow.left {
          left: 0;
        }
        .slider-arrow.right {
          right: 0;
        }
        .slider-arrow:hover {
          background: #1e40af;
        }
        .slider-dots {
          display: flex;
          justify-content: center;
          margin-top: 12px;
        }
        .slider-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #cbd5e1;
          margin: 0 4px;
          cursor: pointer;
          display: inline-block;
          transition: background 0.2s;
        }
        .slider-dot.active {
          background: #2563eb;
        }
        @media (max-width: 900px) {
          .booking-row {
            flex-direction: column;
            gap: 24px;
          }
          .booking-image-col, .booking-details-col {
            width: 100%;
            max-width: 100%;
          }
          .main-room-img {
            width: 100%;
            height: 180px;
            margin-bottom: 12px;
          }
          .slider-img, .main-room-img {
            width: 100%;
            height: 180px;
            margin: 0 0 12px 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Bookingscreen;
