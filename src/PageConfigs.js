import React from 'react';
import { Routes , Route } from 'react-router-dom';

import Home from './AlchemistLab';
import ReferralsTool from './pages/tools/referrals';

const PageConfigs = () => {
  return (
    <Routes > {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/tool/referrals" element={<ReferralsTool/>}></Route>
    </Routes >
  );
}

export default PageConfigs;