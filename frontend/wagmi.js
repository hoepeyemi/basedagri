import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains'; 
import { coinbaseWallet } from 'wagmi/connectors';
 
export function getConfig() {
  return createConfig({
    chains: [base], 
    multiInjectedProviderDiscovery:false,
    connectors: [
      coinbaseWallet({
        appName: "OnchainKit",
        preference: 'all',
        version: '4',
      }),
    ],
    // storage: createStorage({
    //   storage: cookieStorage,
    // }),
    ssr: true,
    transports: {
      [base.id]: http(), 
    },
  });
}