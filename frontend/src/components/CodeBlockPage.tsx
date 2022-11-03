import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import {
  ClientToServerEvents,
  Data,
  ServerToClientEvents,
} from '../@types/types';

import { io, Socket } from 'socket.io-client';

function CodeBlockPage({ block }: { block: Data.Codeblock }) {
  const socketRef = useRef<Socket>();

  const codeBlock = useRef<string | any>('');
  const titleRef = useRef<string | any>('');

  const [mentor, setMentor] = useState<string>('');

  const user = useSelector((state: Data.InitialState) => state.user);
  const baseUrl = useSelector((state: Data.InitialState) => state.baseUrl);

  useEffect(() => {
    titleRef.current.value = block.title;

    socketRef.current = io(`${baseUrl}`);
    socketRef.current.on('updateBack', ({ content }) => {
      codeBlock.current.value = content;
    });

    socketRef.current.on('updateTitleBack', ({ title }) => {
      titleRef.current.value = title;
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

  const updateCode = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    socketRef.current!.emit('update', {
      id: block._id,
      content: codeBlock.current.value,
    });
  };

  const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    socketRef.current!.emit('updateTitle', {
      id: block._id,
      title: titleRef.current.value,
    });
  };

  return (
    <div>
      <p>{mentor}</p>
      <input type="text" ref={titleRef} onChange={e => updateTitle(e)} />
      <textarea
        ref={codeBlock}
        readOnly={user.admin}
        onChange={e => updateCode(e)}
      />
    </div>
  );
}

export default CodeBlockPage;
