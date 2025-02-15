import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../auth/authSlice";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  // Combine birth_place and date_of_birth for display
  const birthInfo = user
    ? `${user.birth_place || "-"}, ${user.date_of_birth || "-"}`
    : "-";

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] pb-[100px]">
        <h1 className="px-5 pt-5 text-[24px] font-bold">Dashboard</h1>
        <h1 className="px-5 pb-5 text-[16px]">
          Welcome {user?.email || "-"}
        </h1>
        <div className="card p-5">
          <h1 className="font-semibold pb-2">Your Detail Information :</h1>
          <form className="flex flex-col gap-2">
            <label>Posisi Yang Dilamar</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.position || "-"}
              type="text"
              disabled
            />
            <label>Nama</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.name || "-"}
              type="text"
              disabled
            />
            <label>No. KTP</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.ktp || "-"}
              type="text"
              disabled
            />
            <label>Tempat, Tanggal Lahir</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={birthInfo}
              type="text"
              disabled
            />
            <label>Jenis Kelamin</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.gender || "-"}
              type="text"
              disabled
            />
            <label>Agama</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.religion || "-"}
              type="text"
              disabled
            />
            <label>Golongan Darah</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.bloodtype || "-"}
              type="text"
              disabled
            />
            <label>Status</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.status || "-"}
              type="text"
              disabled
            />
            <label>Alamat KTP</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.ktp_address || "-"}
              type="text"
              disabled
            />
            <label>Alamat Tinggal</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.address || "-"}
              type="text"
              disabled
            />
            <label>Email</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.email || "-"}
              type="text"
              disabled
            />
            <label>No. Telp</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.phone || "-"}
              type="text"
              disabled
            />
            <label>Kontak Darurat</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.close_phone || "-"}
              type="text"
              disabled
            />
            <label>Skill</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.skill || "-"}
              type="text"
              disabled
            />
            <label>Bersedia Ditempatkan Diseluruh Kantor Perusahaan</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.willing_to_placed ? "Ya" : "Tidak"}
              type="text"
              disabled
            />
            <label>Penghasilan Yang Diharapkan</label>
            <input
              className="h-[50px] bg-[#F5F6F9] rounded-[16px] px-3 text-black"
              placeholder={user?.salary || "-"}
              type="text"
              disabled
            />
          </form>

          {/* Riwayat Pendidikan */}
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
                </tr>
              </thead>
              <tbody>
                {user?.pendidikans && user.pendidikans.length > 0 ? (
                  user.pendidikans.map((p) => (
                    <tr key={p.id}>
                      <td>{p.education}</td>
                      <td>{p.name}</td>
                      <td>{p.major}</td>
                      <td>{p.year}</td>
                      <td>{p.gpa}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Riwayat Pelatihan */}
          <h2 className="mt-5 font-semibold">Riwayat Pelatihan</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Nama Kursus</th>
                  <th>Sertifikat</th>
                  <th>Tahun</th>
                </tr>
              </thead>
              <tbody>
                {user?.pelatihans && user.pelatihans.length > 0 ? (
                  user.pelatihans.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.certificate}</td>
                      <td>{p.year}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Riwayat Pekerjaan */}
          <h2 className="mt-5 font-semibold">Riwayat Pekerjaan</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Nama Perusahaan</th>
                  <th>Posisi</th>
                  <th>Pendapatan</th>
                  <th>Tahun</th>
                </tr>
              </thead>
              <tbody>
                {user?.pekerjaans && user.pekerjaans.length > 0 ? (
                  user.pekerjaans.map((p) => (
                    <tr key={p.id}>
                      <td>{p.company}</td>
                      <td>{p.position}</td>
                      <td>{p.salary}</td>
                      <td>{p.year}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => navigate(`/user-form/` + user?.uuid)}
            className="my-5 flex flex-row gap-2 items-center justify-center bg-[#85a236] py-4 px-10 rounded-[16px] text-[16px] text-white font-semibold hover:bg-[#9ec040]"
          >
            <FaEdit /> Edit
          </button>
        </div>
      </div>
    </>
  );
}
