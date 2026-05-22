
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

if (!hasValidKey) {
  root.render(
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center',maxWidth:520}}>
        <h2>Google Maps API Key Required</h2>
        <p><strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener">Get an API Key</a></p>
        <p><strong>Step 2:</strong> Add your key as a secret in AI Studio:</p>
        <ul style={{textAlign:'left',lineHeight:'1.8'}}>
          <li>Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)</li>
          <li>Select <strong>Secrets</strong></li>
          <li>Type <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong></li>
          <li>Paste your API key as the value, press <strong>Enter</strong></li>
        </ul>
        <p>The app rebuilds automatically after you add the secret.</p>
      </div>
    </div>
  );
} else {
  root.render(
    <React.StrictMode>
      <APIProvider apiKey={API_KEY} version="weekly">
        <App />
      </APIProvider>
    </React.StrictMode>
  );
}
