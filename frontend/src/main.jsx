import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@coinbase/onchainkit/styles.css';
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { TokenProvider } from './context/recylox.jsx';
import { RecycleProvider } from './context/recycle.jsx';
import { WagmiProviders } from './providers/wagmi.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <TokenProvider>
    <RecycleProvider>
      <React.StrictMode>
      <WagmiProviders>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </WagmiProviders>
      </React.StrictMode>
    </RecycleProvider>
  </TokenProvider>
)

