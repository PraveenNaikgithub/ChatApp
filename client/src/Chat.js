import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'rsuite/dist/styles/rsuite-default.css';
import { Panel, Notification } from 'rsuite';

let socket;
const Chat = ({ location }) => {
  const [name, setname] = useState(null);
  const [messageReceived, setmessageReceived] = useState([]);
  const [input, setinput] = useState('');
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    // Notification.open({
    //   title: 'Welcome To the Chat',
    //   description: (
    //     <h4 width={300} rows={3}>
    //       Share the same ID with your friends, Enjoy!!!
    //     </h4>
    //   ),
    // });
    Notification['success']({
      title: 'Welcome',
      description: (
        <h3 style={{ width: 300 }} rows={3}>
          Share the same ID with your friends, Enjoy!!!
        </h3>
      ),
    });
    const { name, room } = queryString.parse(location.search);
    setname(name);
    socket = io(ENDPOINT);
    //Join chatroom
    socket.emit('joinRoom', { name, room });

    socket.on('message', (message) => {
      // console.log(message.name);
    });

    socket.on('servermessage', (message) => {
      const newMessage = message;

      setmessageReceived([...messageReceived, newMessage]);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search, messageReceived]);

  const handleChange = (event) => {
    event.preventDefault();
    setinput(event.target.value);
  };
  const handleSubmit = () => {
    const message = input;
    socket.emit('chatMessage', message);
    setinput('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <TextField
        id='filled-basic'
        label='Enter the Message'
        variant='filled'
        type='text'
        value={input}
        onChange={(event) => handleChange(event)}
        style={{ marginRight: 20 }}
      />

      <Button
        color='secondary'
        variant='outlined'
        onClick={handleSubmit}
        style={{ marginTop: 13 }}
      >
        Send
      </Button>

      <hr />
      {messageReceived.map((msg, index) => (
        <Panel
          style={{
            backgroundColor: msg.name !== name ? '#7f8c8d' : '#2e86de',
            marginBottom: 20,
            width: '60%',
            marginLeft: msg.name !== name ? 0 : 500,
          }}
          bordered={true}
          shaded={true}
          key={index}
          header={msg.name}
        >
          <h4> {msg.text}</h4>
        </Panel>
      ))}
    </div>
  );
};

export default Chat;
