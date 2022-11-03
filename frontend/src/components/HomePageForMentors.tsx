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
  const itemClicked = async () => {};

  return (
    <div>
      <header>Choose code block</header>
      <div>
        {codeBlocks &&
          codeBlocks.map((block: Data.Codeblock) => {
            return (
              // <div>
              <p
                className="codeBlockItem"
                key={block._id}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${baseUrl}/${block.title.replaceAll(' ', '-')}/${
                      block._id
                    }`
                  );

                  toast('The code block url copied to your clipboard !', {
                    type: 'success',
                  });
                  navigate(`/${block.title.replaceAll(' ', '-')}/${block._id}`);
                }}
              >
                {' '}
                {block.name}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default HomePageForMentors;
