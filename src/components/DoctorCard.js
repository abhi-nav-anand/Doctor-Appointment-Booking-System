export default function DoctorCard({ doctor, onClick }) {
    return (
      <div
        onClick={onClick}
        className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100 w-100"
      >
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p>{doctor.specialization}</p>
        <p>{doctor.experience}</p>
        <p>{doctor.clinic}</p>
      </div>
    );
  }
  