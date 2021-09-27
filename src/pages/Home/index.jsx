import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';

const Home = function(props){
  return (
    <div>
      <Header title='虹の漫画'/>
      <div>
        <Card/>
      </div>
    </div>
  )
}

export default Home