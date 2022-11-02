import React, { useRef, useEffect } from 'react';
function Login() {
  const fullName = useRef<string | any>('');
  const password = useRef<string | any>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(fullName.current.value, password.current.value);
  };
  return (
    <div className="LoginPage">
      <h1 className="loginHeader">Sign in</h1>
      <form className="loginForm" onSubmit={e => handleSubmit(e)}>
        <label htmlFor="fullName">Full name</label>
        <input
          required={true}
          className="loginInput"
          name="fullName"
          type="text"
          placeholder="please enter full name"
          ref={fullName}
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
