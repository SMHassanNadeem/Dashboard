import { Global } from "./global-context";
import { useState, useEffect, useContext } from "react";
export default function Profile() {
  const {role,setRole} = useContext(Global)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "none",
  })
  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [])
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(param) {
    param.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(formData));
    alert("Saved !!!")
    setRole(formData?.role);
  }
  return (
    <div className="flex items-center sm:flex-row flex-col gap-4 p-10 rounded w-[97vw] sm:w-[77vw] h-[100vh] sm:h-[70vh]">
      <div className="flex justify-center items-center p-5 rounded bg-[#0e1117] h-[30%] sm:h-[84%] w-[70%] sm:w-[30%]">
        <div className="flex justify-center items-center bg-blue-700 w-[60%] h-[40%] rounded-[50%]">
          <b className="text-[5vw]">{formData.name?.[0] || "A"}</b>
        </div>
      </div>
      <div className="flex flex-col p-5 rounded bg-[#0e1117] w-[70%]">
        <h2 className="mb-3">Profile Information</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>Full Name</label>
          <input type="text" className="rounded pl-1 h-[5vh]" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
          <label>Email Address</label>
          <input type="email" className="rounded pl-1 h-[5vh]" placeholder="Enter your email address" name="email" value={formData.email} onChange={handleChange} />
          <label>Role</label>
          <select className="bg-[#242B38] pl-1 h-[5vh]" id="cars" name="role" value={formData.role} onChange={handleChange}>
            <option disabled value="none">Select</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit" className="!bg-[#3c3fff]">Save</button>
        </form>
      </div>
    </div>
  )
}