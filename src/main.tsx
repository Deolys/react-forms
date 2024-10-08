import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PageRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
