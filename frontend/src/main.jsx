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
  <WagmiProviders>
  <TokenProvider>
    <RecycleProvider>
      <React.StrictMode>
   
        <BrowserRouter>
            <App />
        </BrowserRouter>
     
      </React.StrictMode>
    </RecycleProvider>
  </TokenProvider>
  </WagmiProviders>
)

