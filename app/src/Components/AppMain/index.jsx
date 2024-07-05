import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NoSelected from '../NoSelected';
import TaxonomyForm from '../TaxonomyForm';

export default function AppMain() {
  return (
    <Routes>
      <Route path='*' element={<NoSelected />} />
      <Route path='/:topic/:subTopic' element={<TaxonomyForm />} />
    </Routes>
  )
}