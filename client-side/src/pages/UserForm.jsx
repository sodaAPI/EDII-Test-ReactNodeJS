import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function UserForm() {
  const navigate = useNavigate();
  const { uuid } = useParams();

  // Dropdown options – adjust as needed
  const genderOptions = ["Laki-laki", "Perempuan"];
  const religionOptions = ["Islam", "Kristen", "Hindu", "Budha", "Lainnya"];
  const bloodTypeOptions = ["A", "B", "AB", "O"];
  const statusOptions = ["Lajang", "Menikah", "Bercerai"];

  // Main user state
  const [user, setUser] = useState({
    id: null,
    uuid: "",
    name: "",
    position: "",
    ktp: "",
    birth_place: "",
    date_of_birth: "",
    gender: "",
    religion: "",
    bloodtype: "",
    status: "",
    ktp_address: "",
    address: "",
    phone: "",
    close_phone: "",
    skill: "",
    willing_to_placed: "", // Expecting "Ya" or "Tidak"
    salary: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // Separate state for dynamic history arrays
  const [pendidikans, setPendidikans] = useState([]);
  const [pelatihans, setPelatihans] = useState([]);
  const [pekerjaans, setPekerjaans] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  // If editing an existing user, fetch the user data (including associations)
  useEffect(() => {
    if (uuid) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/user/${uuid}`)
        .then(({ data }) => {
          setLoading(false);
          setUser({
            ...data,
            willing_to_placed: data.willing_to_placed ? "Ya" : "Tidak",
          });
          setPendidikans(data.pendidikans || []);
          setPelatihans(data.pelatihans || []);
          setPekerjaans(data.pekerjaans || []);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [uuid]);

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      let savedUser;
      // Save or update main user record
      if (uuid) {
        const response = await axios.patch(
          `http://localhost:5000/api/user/${uuid}`,
          user,
          { headers: { "Content-Type": "application/json" } }
        );
        // Assuming your PATCH returns the updated user data under "user"
        savedUser = response.data.user || user;
        window.alert("User updated successfully");
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/user/create`,
          user,
          { headers: { "Content-Type": "application/json" } }
        );
        // Assuming your POST returns the new user under "user"
        savedUser = response.data.user;
        window.alert("User created successfully");
      }

      // Save Pendidikan records
      for (const record of pendidikans) {
        if (record.id) {
          await axios.patch(
            `http://localhost:5000/api/user/pendidikan/${record.id}`,
            record,
            { headers: { "Content-Type": "application/json" } }
          );
        } else {
          await axios.post(
            `http://localhost:5000/api/user/pendidikan`,
            { ...record, user_id: savedUser.id },
            { headers: { "Content-Type": "application/json" } }
          );
        }
      }

      // Save Pelatihan records
      for (const record of pelatihans) {
        if (record.id) {
          await axios.patch(
            `http://localhost:5000/api/user/pelatihan/${record.id}`,
            record,
            { headers: { "Content-Type": "application/json" } }
          );
        } else {
          await axios.post(
            `http://localhost:5000/api/user/pelatihan`,
            { ...record, user_id: savedUser.id },
            { headers: { "Content-Type": "application/json" } }
          );
        }
      }

      // Save Pekerjaan records
      for (const record of pekerjaans) {
        if (record.id) {
          await axios.patch(
            `http://localhost:5000/api/user/pekerjaan/${record.id}`,
            record,
            { headers: { "Content-Type": "application/json" } }
          );
        } else {
          await axios.post(
            `http://localhost:5000/api/user/pekerjaan`,
            { ...record, user_id: savedUser.id },
            { headers: { "Content-Type": "application/json" } }
          );
        }
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving user:", error);
      window.alert("Error saving user");
    }
  };

  // Helpers for dynamic tables (similar to previous implementation)
  const renderTableRows = (data, fields, setData) =>
    data.map((row, index) => (
      <tr key={index}>
        {fields.map((field) => (
          <td key={field}>
            <input
              type="text"
              className="w-full p-1 border rounded"
              value={row[field]}
              onChange={(e) => {
                const newData = [...data];
                newData[index][field] = e.target.value;
                setData(newData);
              }}
            />
          </td>
        ))}
        <td>
          <button
            type="button"
            onClick={() => setData(data.filter((_, i) => i !== index))}
            className="text-red-600">
            Delete
          </button>
        </td>
      </tr>
    ));

  const addNewRow = (fields, setData) => {
    const newRow = {};
    fields.forEach((f) => (newRow[f] = ""));
    setData((prev) => [...prev, newRow]);
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] p-5">
        {uuid ? (
          <div className="p-2 text-[16px]">
            <b>Update User:</b> <br /> {user.email}
          </div>
        ) : (
          <div className="p-2 text-[16px]">
            <b>New Applicant</b>
          </div>
        )}
        <div className="card animated fadeInDown">
          {loading && <div className="text-center">Loading...</div>}
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          {!loading && (
            <form onSubmit={saveUser} className="flex flex-col gap-2">
              {/* Main User Fields */}
              <label>Posisi Yang Dilamar</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.position}
                onChange={(ev) =>
                  setUser({ ...user, position: ev.target.value })
                }
                placeholder="Insert Here..."
              />
              <label>Nama</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.name}
                onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                placeholder="Insert Here..."
              />
              <label>No. KTP</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.ktp}
                onChange={(ev) => setUser({ ...user, ktp: ev.target.value })}
                placeholder="Insert Here..."
              />
              <label>Tempat Lahir</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.birth_place}
                onChange={(ev) =>
                  setUser({ ...user, birth_place: ev.target.value })
                }
                placeholder="Insert Here..."
              />
              <label>Tanggal Lahir</label>
              <input
                type="date"
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.date_of_birth}
                onChange={(ev) =>
                  setUser({ ...user, date_of_birth: ev.target.value })
                }
              />

              {/* Dropdown for Jenis Kelamin */}
              <label>Jenis Kelamin</label>
              <select
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.gender}
                onChange={(ev) =>
                  setUser({ ...user, gender: ev.target.value })
                }>
                <option value="">Select Gender</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Dropdown for Agama */}
              <label>Agama</label>
              <select
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.religion}
                onChange={(ev) =>
                  setUser({ ...user, religion: ev.target.value })
                }>
                <option value="">Select Religion</option>
                {religionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Dropdown for Golongan Darah */}
              <label>Golongan Darah</label>
              <select
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.bloodtype}
                onChange={(ev) =>
                  setUser({ ...user, bloodtype: ev.target.value })
                }>
                <option value="">Select Blood Type</option>
                {bloodTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Dropdown for Status */}
              <label>Status</label>
              <select
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.status}
                onChange={(ev) =>
                  setUser({ ...user, status: ev.target.value })
                }>
                <option value="">Select Status</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <label>Alamat KTP</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.ktp_address}
                onChange={(ev) =>
                  setUser({ ...user, ktp_address: ev.target.value })
                }
                placeholder="Insert Here..."
              />
              <label>Alamat Tinggal</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.address}
                onChange={(ev) =>
                  setUser({ ...user, address: ev.target.value })
                }
                placeholder="Insert Here..."
              />
              <label>Email</label>
              <input
                type="email"
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.email}
                onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                placeholder="Insert Here..."
              />
              <label>No. Telp</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.phone}
                onChange={(ev) => setUser({ ...user, phone: ev.target.value })}
                placeholder="Insert Here..."
              />
              <label>Orang terdekat yang dapat dihubungi</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.close_phone}
                onChange={(ev) =>
                  setUser({ ...user, close_phone: ev.target.value })
                }
                placeholder="Insert Here..."
              />

              {/* Dynamic Input for Riwayat Pendidikan */}
              <h2 className="mt-5 font-semibold">Riwayat Pendidikan</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Jenjang Pendidikan</th>
                      <th>Nama Institusi</th>
                      <th>Jurusan</th>
                      <th>Tahun Lulus</th>
                      <th>IPK</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendidikans.map((p, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.education}
                            onChange={(e) => {
                              const newData = [...pendidikans];
                              newData[index].education = e.target.value;
                              setPendidikans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.name}
                            onChange={(e) => {
                              const newData = [...pendidikans];
                              newData[index].name = e.target.value;
                              setPendidikans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.major}
                            onChange={(e) => {
                              const newData = [...pendidikans];
                              newData[index].major = e.target.value;
                              setPendidikans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.year}
                            onChange={(e) => {
                              const newData = [...pendidikans];
                              newData[index].year = e.target.value;
                              setPendidikans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.gpa}
                            onChange={(e) => {
                              const newData = [...pendidikans];
                              newData[index].gpa = e.target.value;
                              setPendidikans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() =>
                              setPendidikans(
                                pendidikans.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-600">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={() =>
                    setPendidikans([
                      ...pendidikans,
                      { education: "", name: "", major: "", year: "", gpa: "" },
                    ])
                  }
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Add Pendidikan
                </button>
              </div>

              {/* Dynamic Input for Riwayat Pelatihan */}
              <h2 className="mt-5 font-semibold">Riwayat Pelatihan</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Nama Kursus</th>
                      <th>Sertifikat</th>
                      <th>Tahun</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pelatihans.map((p, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.name}
                            onChange={(e) => {
                              const newData = [...pelatihans];
                              newData[index].name = e.target.value;
                              setPelatihans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.certificate}
                            onChange={(e) => {
                              const newData = [...pelatihans];
                              newData[index].certificate = e.target.value;
                              setPelatihans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.year}
                            onChange={(e) => {
                              const newData = [...pelatihans];
                              newData[index].year = e.target.value;
                              setPelatihans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() =>
                              setPelatihans(
                                pelatihans.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-600">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={() =>
                    setPelatihans([
                      ...pelatihans,
                      { name: "", certificate: "", year: "" },
                    ])
                  }
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Add Pelatihan
                </button>
              </div>

              {/* Dynamic Input for Riwayat Pekerjaan */}
              <h2 className="mt-5 font-semibold">Riwayat Pekerjaan</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Nama Perusahaan</th>
                      <th>Posisi</th>
                      <th>Pendapatan</th>
                      <th>Tahun</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pekerjaans.map((p, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.company}
                            onChange={(e) => {
                              const newData = [...pekerjaans];
                              newData[index].company = e.target.value;
                              setPekerjaans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.position}
                            onChange={(e) => {
                              const newData = [...pekerjaans];
                              newData[index].position = e.target.value;
                              setPekerjaans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.salary}
                            onChange={(e) => {
                              const newData = [...pekerjaans];
                              newData[index].salary = e.target.value;
                              setPekerjaans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={p.year}
                            onChange={(e) => {
                              const newData = [...pekerjaans];
                              newData[index].year = e.target.value;
                              setPekerjaans(newData);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() =>
                              setPekerjaans(
                                pekerjaans.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-600">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={() =>
                    setPekerjaans([
                      ...pekerjaans,
                      { company: "", position: "", salary: "", year: "" },
                    ])
                  }
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Add Pekerjaan
                </button>
              </div>

              {/* The remaining fields */}
              <label>Skill</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.skill}
                onChange={(ev) => setUser({ ...user, skill: ev.target.value })}
                placeholder="Insert Here..."
              />
              <label>
                Bersedia Ditempatkan Diseluruh Kantor Perusahaan (Ya/Tidak)
              </label>
              <input
                type="text"
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.willing_to_placed}
                onChange={(ev) =>
                  setUser({ ...user, willing_to_placed: ev.target.value })
                }
                placeholder="Ya/Tidak"
              />
              <label>Penghasilan Yang Diharapkan</label>
              <input
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                value={user.salary}
                onChange={(ev) => setUser({ ...user, salary: ev.target.value })}
                placeholder="Insert Here..."
              />
              <label>Password</label>
              <input
                type="password"
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                onChange={(ev) =>
                  setUser({ ...user, password: ev.target.value })
                }
                placeholder="Password"
              />
              <label>Password Confirmation</label>
              <input
                type="password"
                className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
                onChange={(ev) =>
                  setUser({ ...user, confirmpassword: ev.target.value })
                }
                placeholder="Password Confirmation"
              />
              <button className="my-5 flex items-center justify-center bg-[#85a236] py-4 px-10 rounded-[16px] text-[16px] text-white font-semibold hover:bg-[#9ec040]">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
