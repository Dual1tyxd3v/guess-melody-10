import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { questions } from './mocks/questions';

const settings = {
  ERRORS_COUNT: 13,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      errorsCount = {settings.ERRORS_COUNT}
      questions={questions}
    />
  </React.StrictMode>,
);
