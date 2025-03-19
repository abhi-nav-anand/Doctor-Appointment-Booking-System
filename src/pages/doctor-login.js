import { useContext, useState, useEffect } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import { useRouter } from 'next/router';

export default function DoctorLogin() {
  const { doctors, loggedInDoctor, doctorLogin } = useContext(AppointmentContext);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [password, setPassword] = useState(''); 
  const router = useRouter();

  useEffect(() => {
    if (loggedInDoctor) {
      router.push('/doctor-dashboard');
    }
  }, [loggedInDoctor, router]);

  const handleLogin = () => {
    if (selectedDoctorId && password) {
      const doctor = doctors.find((doctor) => doctor.id === Number(selectedDoctorId));

      if (doctor && password === '12345') { 
        doctorLogin(Number(selectedDoctorId));
        router.push('/doctor-dashboard'); 
      } else {
        alert('Invalid password or doctor selection.');
      }
    } else {
      alert('Please select a doctor and enter a password.');
    }
  };

  return (
    <div className="container mx-auto p-4 w-100">
      <h1 className="text-2xl mb-4">Doctor Login</h1>
      
      <select
        value={selectedDoctorId}
        onChange={(e) => setSelectedDoctorId(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="">Select Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
        required
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded mt-4 ml-2 mx-auto block"
      >
        Login
      </button>

    </div>
  );
}
