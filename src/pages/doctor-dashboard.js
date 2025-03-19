import { useContext, useState, useEffect } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import Calendar from '../components/Calendar'; 
import AppointmentList from '../components/AppointmentList'; 
import { useRouter } from 'next/router';

export default function DoctorDashboard() {
  const { loggedInDoctor, doctorAppointments, doctorLogout } = useContext(AppointmentContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const router = useRouter(); 
  

  useEffect(() => {
    if (loggedInDoctor && selectedDate) {
      const filteredAppointments = doctorAppointments.filter(
        (appointment) => {
          console.log("see :", appointment.date);
          return appointment.doctorId === loggedInDoctor.id && appointment.date === selectedDate; 
        }
      );

      console.log("A :", selectedDate);
      setFilteredAppointments(filteredAppointments);
    }
  }, [loggedInDoctor, selectedDate, doctorAppointments]);

  const handleDateClick = (date) => {
    const normalizedDate = new Date(date);
    
    const utcDate = new Date(Date.UTC(normalizedDate.getFullYear(), normalizedDate.getMonth(), normalizedDate.getDate()));
  
    const formattedDate = utcDate.toISOString().split('T')[0];
  
    setSelectedDate(formattedDate); 
  };

  const handleLogout = () => {
    doctorLogout(); 
    router.push('/doctor-login');
  };

  useEffect(() => {
    if (!loggedInDoctor) {
      router.push('/doctor-login'); 
    }
  }, [loggedInDoctor, router]);

  if (!loggedInDoctor) {
    return <p>Please log in to access your dashboard.</p>;
  }

  return (
    <div className="container mx-auto p-4">
    <div className='flex justify-between'>
      <h1 className="text-2xl mb-4">Doctor Dashboard - {loggedInDoctor.name}</h1>
      
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Logout
      </button>

      </div>

      <Calendar onDateClick={handleDateClick} />
      {selectedDate && <AppointmentList appointments={filteredAppointments} />}
    </div>
  );
}
