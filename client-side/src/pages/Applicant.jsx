import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Applicant() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // new state for search

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/user`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const deleteUser = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${uuid}`);
      toast.success("User deleted successfully");
      getUsers();
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  // Format an ISO date string to YYYY-MM-DD
  const formatDate = (isoDate) => (isoDate ? isoDate.split("T")[0] : "");

  // Combine birth_place and date_of_birth
  const formatBirthInfo = (birthPlace, dateOfBirth) => {
    if (!birthPlace && !dateOfBirth) return "";
    return `${birthPlace || ""}${birthPlace && dateOfBirth ? ", " : ""}${
      dateOfBirth ? formatDate(dateOfBirth) : ""
    }`;
  };

  // Filter users based on searchTerm (by name or email)
  const filteredUsers = users.filter((u) => {
    const lowerSearch = searchTerm.toLowerCase();
    const userName = (u.name || "").toLowerCase();
    const userPosition = (u.position || "").toLowerCase();
    const userEdu = (u.education_id || "").toLowerCase();
    return (
      userName.includes(lowerSearch) ||
      userPosition.includes(lowerSearch) ||
      userEdu.includes(lowerSearch)
    );
  });

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] p-5">
        <div className="flex flex-col gap-5 pb-5">
          <div className="flex flex-row gap-5 items-center">
            <h1 className="text-lg font-semibold">Applicants</h1>
            <button
              onClick={() => navigate(`/user-form/new`)}
              className="flex flex-row gap-2 items-center bg-[#85a236] p-3 rounded-[16px] text-[16px] text-white font-semibold hover:bg-[#9ec040]">
              <FaPlusCircle /> Create
            </button>
          </div>
          <div className="flex flex-row pb-5">
            <div className="bg-[#85a236] p-3 rounded-l-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              className="p-3 font-semibold px-3 rounded-r-xl round border w-[350px] border-[#B7B6B8]"
              type="text"
              placeholder="Search by name or position or education..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
        <div className="overflow-scroll card relative rounded-lg shadow-md p-2">
          {loading ? (
            <div className="flex flex-col items-center text-center">
              <FaSpinner className="animate-spin text-[#FF6A35]" />
              Loading...
            </div>
          ) : (
            <table className="table table-zebra">
              <thead className="text-white">
                <tr>
                  <th>Nama</th>
                  <th>Posisi</th>
                  <th>No. KTP</th>
                  <th>Tempat, Tgl Lahir</th>
                  <th>Jenis Kelamin</th>
                  <th>Agama</th>
                  <th>Gol. Darah</th>
                  <th>Status</th>
                  <th>Alamat KTP</th>
                  <th>Alamat Tinggal</th>
                  <th>Email</th>
                  <th>No. Telp</th>
                  <th>Kontak Darurat</th>
                  <th>Skill</th>
                  <th>Bersedia Ditempatkan</th>
                  <th>Penghasilan Diharapkan</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.position}</td>
                    <td>{u.ktp}</td>
                    <td>{formatBirthInfo(u.birth_place, u.date_of_birth)}</td>
                    <td>{u.gender}</td>
                    <td>{u.religion}</td>
                    <td>{u.bloodtype}</td>
                    <td>{u.status}</td>
                    <td>{u.ktp_address}</td>
                    <td>{u.address}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.close_phone}</td>
                    <td>{u.skill}</td>
                    <td>{u.willing_to_placed ? "Ya" : "Tidak"}</td>
                    <td>{u.salary}</td>
                    <td>{formatDate(u.createdAt)}</td>
                    <td className="flex flex-row gap-2">
                      <Link
                        className="btn p-3 bg-green-600"
                        to={"/user-form/" + u.uuid}>
                        Edit
                      </Link>
                      <button
                        className="btn p-3 bg-red-700"
                        onClick={() => deleteUser(u.uuid)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
