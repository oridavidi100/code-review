import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../style/App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomePageForMentors from './HomePageForMentors';
import Login from './Login';
import CodeBlockPage from './CodeBlockPage';

import { Data } from '../@types/types';
import { setCodeBlockes } from '../reducer/action';

function App() {
  const baseUrl = useSelector((state: Data.InitialState) => state.baseUrl);

  const codeBlocks = useSelector(
    (state: Data.InitialState) => state.codeBlocks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/findAllCodeBlocks`)
      .then(res => {
        dispatch(setCodeBlockes(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="">
          <Routes>
            {codeBlocks &&
              codeBlocks.map((block: Data.Codeblock) => {
                return (
                  <Route
                    path={`${block.title.replaceAll(' ', '-')}/${block._id}`}
                    element={<CodeBlockPage block={block} key={block._id} />}
                  />
                );
              })}
            <Route path="/" element={<Login />} />
            <Route path="/LobbyPage" element={<HomePageForMentors />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
