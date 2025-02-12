import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  curtis
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import LockTokens from './components/LockTokens';
import ClaimWTokens from './components/ClaimWTokens';

const config = getDefaultConfig({
  appName: 'Bridge',
  projectId: '6dd15a3684137adf8eb5ed126f061236',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, curtis],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/lockTokens' element={<LockTokens />} />
              <Route path='/claimWTokens' element={<ClaimWTokens />} />
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;