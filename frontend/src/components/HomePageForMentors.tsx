import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Data } from '../@types/types';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HomePageForMentors() {
  const user = useSelector((state: Data.InitialState) => state.user);

  const baseUrl = useSelector((state: Data.InitialState) => state.baseUrl);

  const codeBlocks = useSelector(
    (state: Data.InitialState) => state.codeBlocks
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (user.admin != true) {
      navigate('/');
    }
  });

  return (
    <div className="homePage">
      <p>welcome {user.userName}</p>
      <header>Choose code block</header>
      <div className="codeBlocks">
        {codeBlocks &&
          codeBlocks.map((block: Data.Codeblock) => {
            return (
              <div
                className="codeBlockDivLobby"
                onClick={() => {
                  const url = window.location.href.split('/');
                  url.pop();
                  const newUrl = url.join('/');
                  navigator.clipboard.writeText(
                    `${newUrl}/${block.title.replaceAll(' ', '-')}/${block._id}`
                  );
                  toast('The code block url copied to your clipboard !', {
                    type: 'success',
                  });
                  navigate(`/${block.title.replaceAll(' ', '-')}/${block._id}`);
                }}
              >
                <p className="codeBlockItem" key={block._id}>
                  {' '}
                  {block.name}
                </p>
                <img
                  className="codeBlockImg"
                  src="https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvZGV8ZW58MHx8MHx8&w=1000&q=80"
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HomePageForMentors;
