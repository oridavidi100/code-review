import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Data } from '../@types/types';

import { useNavigate } from 'react-router-dom';

function HomePageForMentors() {
  const user = useSelector((state: Data.InitialState) => state.user);

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
    <div>
      <div>
        {codeBlocks &&
          codeBlocks.map((block: Data.Codeblock) => {
            return (
              <p
                key={block._id}
                onClick={() => {
                  navigate(`/${block.title.replaceAll(' ', '-')}/${block._id}`);
                }}
              >
                {' '}
                {block.title}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default HomePageForMentors;
