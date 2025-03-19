import { useContext } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';

export default function UserDashboard() {
  const { userAppointments } = useContext(AppointmentContext);
  const user = { id: 1, name: 'Abhinav Anand' }; 

  const userSpecificAppointments = userAppointments.filter(appointment => appointment.userId === user.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Your Appointments</h1>
      <div>
        {userSpecificAppointments.length === 0 ? (
          <p>You have no upcoming appointments.</p>
        ) : (
          userSpecificAppointments.map((appointment) => (
            <div key={appointment.date + appointment.time} className="border p-4 mb-4">
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Doctor:</strong> {appointment.doctorName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
