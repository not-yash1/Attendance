// src/pages/_app.js
import { Provider } from 'react-redux';
// import { CacheProvider } from '@emotion/react';

import store from '../redux/store';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';
import '../styles/register.css';
// import './login.css'


function MyApp({ Component, pageProps }) {
  return (
    // <CacheProvider >
        <>

        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
            // transition: Zoom,
        />
        <Head>
            <title>
            Chitkara
            </title>
            <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
            />
        </Head>

        <Component {...pageProps} />
        </>
    // </CacheProvider>
  );
}

const App = (props) => (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  )

export default App;
