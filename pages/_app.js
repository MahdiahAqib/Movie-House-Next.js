// pages/_app.js
import '../styles/globals.css';
import Header from '../components/Header';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '3rem' }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
