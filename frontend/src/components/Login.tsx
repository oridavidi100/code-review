import React, { useRef, useEffect } from 'react';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setUser } from '../reducer/action';
import { Data } from '../@types/types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();

  const userName = useRef<string | any>('');
  const password = useRef<string | any>('');

  const baseUrl = useSelector((state: Data.InitialState) => state.baseUrl);

  const dispatch = useDispatch();

  const user = useSelector((state: Data.InitialState) => state.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.put(`${baseUrl}/api/login`, {
        userName: userName.current.value,
        password: password.current.value,
      });
      if (response.status === 200) {
        dispatch(setUser(response.data));
        if (response.data.admin === true) {
          navigate('/LobbyPage');
          toast('Sign in successfully', {
            type: 'success',
          });
        }
      }
    } catch (err: any) {
      toast(err.response.data.error, {
        type: 'error',
      });
    }
  };

  return (
    <div className="LoginPage">
      <h1 className="loginHeader">Sign in</h1>

      <form className="loginForm" onSubmit={e => handleSubmit(e)}>
        <label htmlFor="username">username</label>
        <input
          required={true}
          className="loginInput"
          name="username"
          type="text"
          placeholder="please enter username"
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
        <button>Sign in</button>
      </form>
    </div>
  );
}
export default Login;
