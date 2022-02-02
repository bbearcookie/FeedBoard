import axios from 'axios';
import React, { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    console.log('test중임');
    
    axios.get('http://localhost:5000/auth/test', {withCredentials:true})
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      테스트페이지
    </div>
  );
};

export default Test;