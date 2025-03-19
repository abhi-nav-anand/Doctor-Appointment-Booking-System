export default function AppointmentList({ appointments }) {
    if (!appointments || appointments.length === 0) {
      return <p>No appointments for this day.</p>;
    }
  
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Appointments</h3>
        <ul>
          {appointments.map((appointment) => {
            const formattedDate = new Date(appointment.date).toLocaleDateString();
            
            return (
              <li key={appointment.id} className="mb-2">
                <p><strong>Patient Name:</strong> {appointment.userName}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Date:</strong> {formattedDate}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  