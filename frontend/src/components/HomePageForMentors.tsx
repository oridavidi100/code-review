import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Data } from '../@types/types';

import { useNavigate } from 'react-router-dom';

function HomePageForMentors() {
  const user = useSelector((state: Data.InitialState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user.admin);
    if (user.admin != true) {
      navigate('/');
    }
  });
  return <div>HomePageForMentors</div>;
}

export default HomePageForMentors;
