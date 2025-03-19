import { AppointmentProvider } from "@/context/AppointmentContext";
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify'; 

export default function App({ Component, pageProps }) {
  return (
    <AppointmentProvider>
      <Component {...pageProps} />
      <ToastContainer/>
    </AppointmentProvider>
  )
}
