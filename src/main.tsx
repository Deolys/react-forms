import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PageRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  </StrictMode>,
);
