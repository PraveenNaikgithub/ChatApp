import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Modal, ButtonToolbar, Button, Icon, Message } from 'rsuite';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [modal, setmodal] = useState(false);
  const showModal = () => {
    setmodal(true);
  };
  const closeModal = () => {
    setmodal(false);
  };
  return (
    <div>
      <div style={{ marginLeft: 100, marginTop: 100 }}>
        <h1>Join a Room and Enjoy!!!</h1>
        <Button
          variant='contained'
          color='cyan'
          className='button mt-100'
          type='submit'
          onClick={() => showModal()}
        >
          Join A Room
        </Button>
      </div>

      <Modal show={modal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Join Room</Modal.Title>
          <Message
            showIcon
            type='warning'
            title='Warning'
            description='Do Enter a Unique and Exact ID to chat with your friends.'
          />
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginTop: 10 }}>
            <TextField
              id='outlined-basic'
              label='Name'
              variant='outlined'
              style={{ width: '100%' }}
              className='joinInput mt-20'
              type='text'
              onChange={(event) => setName(event.target.value)}
            />
          </div>{' '}
          <br /> <br />
          <div>
            <TextField
              id='outlined-basic'
              label='Room ID'
              variant='outlined'
              style={{ width: '100%' }}
              className='joinInput mt-20'
              type='text'
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>{' '}
          <br /> <br />
          <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/chat?name=${name}&room=${room}`}
          >
            <ButtonToolbar>
              <Button
                color='green'
                variant='contained'
                className='button mt-20'
                type='submit'
              >
                <Icon icon='wechat' />
                Sign in
              </Button>
            </ButtonToolbar>
          </Link>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Join;
