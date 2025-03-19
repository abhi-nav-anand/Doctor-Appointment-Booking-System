import { useState, useContext } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import AppointmentModal from '../components/AppointmentModal';
import DoctorCard from '../components/DoctorCard';

export default function Home() {
  const { doctors } = useContext(AppointmentContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        className="p-2 border rounded w-80"
        placeholder="Search by doctor name or specialization"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onClick={() => openModal(doctor)} />
        ))}
      </div>

      {isModalOpen && <AppointmentModal doctor={selectedDoctor} closeModal={closeModal} />}
    </div>
  );
}
