import { useState, useContext } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


export default function AppointmentModal({ doctor, closeModal }) {
  const { bookAppointment } = useContext(AppointmentContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
   const router = useRouter();
  
  const user = { id: 1, name: 'John Doe' }; 

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      bookAppointment(doctor, selectedDate, selectedTime, user);

      toast.success('Appointment booked successfully!');

      closeModal();
    router.push('/user-dashboard');

    } else {
      alert('Please select a date and time');
    }
  };

  return (
<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Book an Appointment with {doctor.name}</h2>

        <div className='flex flex-row gap-2'>
        <div className="mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border p-2 rounded w-full"
            placeholderText="Select appointment date"
          />
        </div>

        <div className="mb-4">
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="border p-2 rounded w-30"
          />
        </div>
        </div>

        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Book Appointment
        </button>

        <button
          onClick={closeModal}
          className="mt-2 text-red-500 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
