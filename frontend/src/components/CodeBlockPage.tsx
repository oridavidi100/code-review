import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import { Data } from '../@types/types';
import { setCodeBlockes } from '../reducer/action';

function CodeBlockPage({ block }: { block: any }) {
  const codeBlock = useRef<string | any>('');
  const [mentor, setMentor] = useState<string>('');

  const user = useSelector((state: Data.InitialState) => state.user);
  const baseUrl = useSelector((state: Data.InitialState) => state.baseUrl);

  useEffect(() => {
    if (user.admin === true) {
      setMentor('you are in read only mode');
    }
    axios
      .get(`${baseUrl}/api/findOneCodeBlock/${block._id}`)
      .then(res => {
        // setContent(res.data.content);
        codeBlock.current.value = res.data.content;
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <p>{mentor}</p>

      <input type="text" ref={codeBlock} readOnly={user.admin} />
      {/* {content} */}
    </div>
  );
}

export default CodeBlockPage;
