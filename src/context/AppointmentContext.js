import { createContext, useState, useEffect } from 'react';

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [loggedInDoctor, setLoggedInDoctor] = useState(null);

  const isClient = typeof window !== 'undefined'; 

  const staticDoctors = [
    { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', experience: '10 years', clinic: 'Clinic A, Bengaluru' },
    { id: 2, name: 'Dr. Jane Smith', specialization: 'Neurologist', experience: '8 years', clinic: 'Clinic B, Bengaluru' },
    { id: 3, name: 'Dr. Emily Lee', specialization: 'Pediatrician', experience: '5 years', clinic: 'Clinic C, Bengaluru' },
    { id: 3, name: 'Dr. Zack Doe', specialization: 'Neurologist', experience: '9 years', clinic: 'Clinic D, Bengaluru' },
    { id: 3, name: 'Dr. A.k Lee', specialization: 'Pediatrician', experience: '12 years', clinic: 'Clinic E, Bengaluru' },
    { id: 3, name: 'Dr. Smith Doe', specialization: 'Cardiologist', experience: '7 years', clinic: 'Clinic F, Bengaluru' },
  ];

  useEffect(() => {
    if (isClient) {
      setDoctors(staticDoctors); 

      const savedUserAppointments = localStorage.getItem('userAppointments');
      const savedDoctorAppointments = localStorage.getItem('doctorAppointments');
      if (savedUserAppointments) setUserAppointments(JSON.parse(savedUserAppointments));
      if (savedDoctorAppointments) setDoctorAppointments(JSON.parse(savedDoctorAppointments));
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      const savedDoctor = localStorage.getItem('loggedInDoctor');
      if (savedDoctor) setLoggedInDoctor(JSON.parse(savedDoctor));
    }
  }, [isClient]);

  const doctorLogin = (doctorId) => {
    const doctor = doctors.find((doc) => doc.id === doctorId);
    if (doctor) {
      setLoggedInDoctor(doctor);
      localStorage.setItem('loggedInDoctor', JSON.stringify(doctor));
    }
  };

  const doctorLogout = () => {
    setLoggedInDoctor(null);
    localStorage.removeItem('loggedInDoctor');
  };

  const bookAppointment = (doctor, date, time, user) => {
    const normalizedDate = new Date(date).toISOString().split('T')[0];

    const appointment = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      userId: user.id,
      userName: user.name,
      date: normalizedDate,
      time,
      user,
    };

    console.log('Booking Appointment:', appointment);

    setUserAppointments((prevAppointments) => {
      const updatedAppointments = [...prevAppointments, appointment];
      console.log('Updated User Appointments:', updatedAppointments);
      return updatedAppointments;
    });

    setDoctorAppointments((prevAppointments) => {
      const updatedAppointments = [...prevAppointments, appointment];
      console.log('Updated Doctor Appointments:', updatedAppointments);
      return updatedAppointments;
    });
  };

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('userAppointments', JSON.stringify(userAppointments));
    }
  }, [userAppointments]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('doctorAppointments', JSON.stringify(doctorAppointments));
    }
  }, [doctorAppointments]);

  return (
    <AppointmentContext.Provider
      value={{
        doctors,
        loggedInDoctor,
        userAppointments,
        doctorAppointments,
        bookAppointment,
        doctorLogin,
        doctorLogout,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
