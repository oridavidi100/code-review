import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import {
  ClientToServerEvents,
  Data,
  ServerToClientEvents,
} from '../@types/types';

import { io, Socket } from 'socket.io-client';

import { toast } from 'react-toastify';

import hljs from 'highlight.js';
import { useNavigate } from 'react-router-dom';

function CodeBlockPage({ block }: { block: Data.Codeblock }) {
  const socketRef = useRef<Socket>();

  const navigate = useNavigate();

  const codeBlock = useRef<string | any>('');
  const titleRef = useRef<string | any>('');
  const name = useRef<string | any>('');

  const [code, setCode] = useState<string>('');
  const [mentor, setMentor] = useState<string>('');
  const [solutionBtnClass, setSolutionBtnClass] =
    useState<string>('notShowBtnSolutin');

  const user = useSelector((state: Data.InitialState) => state.user);
  const baseUrl = useSelector((state: Data.InitialState) => state.baseUrl);

  useEffect(() => {
    titleRef.current.value = block.title;
    setCode('!');
    socketRef.current = io(`${baseUrl}`);
    socketRef.current!.emit('join', {
      room: block._id,
    });
    socketRef.current.on('updateBack', ({ content }) => {
      codeBlock.current!.value = content;
      setCode(content);
    });

    socketRef.current.on('updateTitleBack', ({ title }) => {
      titleRef.current.value = title;
    });

    socketRef.current.on('correctAnswerBack', () => {
      toast('nice solution', {
        type: 'success',
      });
    });
    if (user.admin === true) {
      setMentor('You are in read only mode');
      setSolutionBtnClass('showBtnSolutin');
    }
    axios
      .get(`${baseUrl}/api/findOneCodeBlock/${block._id}`)
      .then(res => {
        codeBlock.current.value = res.data.content;
      })
      .catch(err => {
        console.log(err);
      });
    // hljs.highlightAll();
    console.log(codeBlock.current.value);
    return () => {
      // socketRef.current?.emit('disconnect');
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [code]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/api/changeCodeBlockName`, {
        newName: name.current.value,
        id: block._id,
      });
      toast('Name changed', {
        type: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const correctAnswer = async () => {
    socketRef.current?.emit('correctAnswer');
  };

  const BacktoLobby = async () => {
    navigate('/LobbyPage');
  };

  return (
    <div className="codeBlockDiv">
      <p>{mentor}</p>
      <input type="text" ref={titleRef} onChange={e => updateTitle(e)} />
      <textarea
        ref={codeBlock}
        readOnly={user.admin}
        onChange={e => updateCode(e)}
      />
      <pre>
        <code className="javascript">{codeBlock.current.value}</code>
      </pre>
      <form onSubmit={e => handleSubmit(e)} className="changeName">
        <label htmlFor="changeName">Change name of block code</label>
        <input
          className="changeNameInput"
          name="changeName"
          type="changeName"
          placeholder="please enter new name"
          ref={name}
        />
        <button>change</button>
      </form>
      <button className={solutionBtnClass} onClick={() => correctAnswer()}>
        solution
      </button>
      <button
        onClick={() => {
          BacktoLobby();
        }}
      >
        Back to Lobby
      </button>
    </div>
  );
}

export default CodeBlockPage;
