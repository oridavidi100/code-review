import React, { useRef, useEffect } from 'react';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setUser } from '../reducer/action';
import { Data } from '../@types/types';

function Login() {
  const navigate = useNavigate();

  const userName = useRef<string | any>('');
  const password = useRef<string | any>('');

  const dispatch = useDispatch();

  const user = useSelector((state: Data.InitialState) => state.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.put('http://localhost:5000/api/login', {
        userName: userName.current.value,
        password: password.current.value,
      });
      if (response.status === 200) {
        dispatch(setUser(response.data));
        console.log(user);
        if (response.data.admin === true) navigate('/LobbyPage');
      }
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };

  return (
    <div className="LoginPage">
      <h1 className="loginHeader">Sign in</h1>
      <form className="loginForm" onSubmit={e => handleSubmit(e)}>
        <label htmlFor="fullName">Full name</label>
        <input
          required={true}
          className="loginInput"
          name="userName"
          type="text"
          placeholder="please enter userName"
          ref={userName}
        />
        <label htmlFor="password">Password</label>
        <input
          className="loginInput"
          name="password"
          type="password"
          placeholder="please enter password"
          ref={password}
        />
        <button>sign in</button>
      </form>
    </div>
  );
}
export default Login;
