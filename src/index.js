import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactDOM from 'react-dom/client';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import App from './App';
import UserContext from './contexts/UserContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

AOS.init({
  duration: 600,
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <UserContext>
      <PhotoProvider>
        <MantineProvider
          theme={{ fontFamily: 'Karla' }}
          withGlobalStyles
          withNormalizeCSS
        >
          <App />
        </MantineProvider>
      </PhotoProvider>
    </UserContext>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
