import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import { ProfileForm } from './app/testForm.tsx'
// import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <ProfileForm />
  </StrictMode>,
)
