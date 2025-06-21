import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Room({ room, fromdate, todate }) { //fromdate and to date here helps in searching.
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate(); // initialize navigation

  const goToRoom = () => {
    navigate(`/getroomby/${room._id}/${fromdate.format('DD-MM-YYYY')}/${todate.format('DD-MM-YYYY')}`);

  };
  return (
    <div className='row bs'>
      <div className='col-md-4'>
        <img src={room.imageurls[0]} className='smallimg'></img>
      </div>
      <div className='col-md-7 '>
        <h1>{room.name}</h1>
        <b><p>Max Count : {room.maxcount}</p>
          <p>Phone Number : {room.phonenumber}</p>
          <p>Type : {room.type}</p></b>
        <div style={{ float: 'right' }}>

          {(fromdate && todate) && (<button className='btn btn-primary' onClick={goToRoom}>Book Room</button>)}

          <button className='btn btn-primary' onClick={handleShow}>View Details</button><br></br><br></br>

        </div>

      </div>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header >
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigimg"
                  src={url} //  use variable, not 'url'
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}


          </Carousel>
          <p>{room.description}</p>
          <p>RENT PER DAY : {room.rentperday}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Room