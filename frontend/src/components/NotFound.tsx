import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate('/'), 3000);
  }, []);
  return <div>Wrong url</div>;
}

export default NotFound;
