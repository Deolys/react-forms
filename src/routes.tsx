import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main-page';
import { UncontrolledFormPage } from './pages/uncontrolled-form-page';
import { ControlledFormPage } from './pages/controlled-form-page';
import { controlledFormPath, mainPath, uncontrolledFormPath } from './constants/route-paths';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={mainPath} element={<MainPage />} />
      <Route path={uncontrolledFormPath} element={<UncontrolledFormPage />} />
      <Route path={controlledFormPath} element={<ControlledFormPage />} />
    </Routes>
  );
};
