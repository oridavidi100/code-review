import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import { Data } from '../@types/types';
import { setCodeBlockes } from '../reducer/action';

function CodeBlockPage({ block }: { block: any }) {
  const codeBlock = useRef<string | any>('');
  //   const [content, setContent] = useState<string>('');

  const baseUrl = useSelector((state: Data.InitialState) => state.baseUrl);

  useEffect(() => {
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
      <input type="text" ref={codeBlock} />
      {/* {content} */}
    </div>
  );
}

export default CodeBlockPage;
