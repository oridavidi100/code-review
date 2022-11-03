import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import {
  ClientToServerEvents,
  Data,
  ServerToClientEvents,
} from '../@types/types';

import { io, Socket } from 'socket.io-client';

function CodeBlockPage({ block }: { block: any }) {
  const socketRef = useRef<Socket>();

  const codeBlock = useRef<string | any>('');

  const [mentor, setMentor] = useState<string>('');

  const user = useSelector((state: Data.InitialState) => state.user);
  const baseUrl = useSelector((state: Data.InitialState) => state.baseUrl);

  useEffect(() => {
    socketRef.current = io(`${baseUrl}`);
    socketRef.current.on('updateBack', ({ content }) => {
      console.log('now');
      codeBlock.current.value = content;
    });

    if (user.admin === true) {
      setMentor('you are in read only mode');
    }
    axios
      .get(`${baseUrl}/api/findOneCodeBlock/${block._id}`)
      .then(res => {
        codeBlock.current.value = res.data.content;
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateCode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    socketRef.current!.emit('update', {
      id: block._id,
      content: codeBlock.current.value,
    });
  };

  return (
    <div>
      <p>{mentor}</p>
      <input
        type="text"
        ref={codeBlock}
        readOnly={user.admin}
        onChange={e => updateCode(e)}
      />
    </div>
  );
}

export default CodeBlockPage;
