import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main-page';
import { UncontrolledFormPage } from './pages/uncontrolled-form-page';
import { ControlledFormPage } from './pages/controlled-form-page';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
      <Route path="/controlled-form" element={<ControlledFormPage />} />
    </Routes>
  );
};
