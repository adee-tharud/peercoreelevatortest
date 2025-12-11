import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import './index.css'
import App from './App.tsx'

import { startElevatorController } from './services/elevatorController.ts'

startElevatorController();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<Provider store={store}>
    <App />
  </Provider>
  </StrictMode>,
)
