import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save temporarily (you'll connect backend later)
    localStorage.setItem("aira_user", JSON.stringify(form));

    // After register → go to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3ede5]">
      <div className="bg-white w-[420px] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-[#4b2e2e] text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already registered?{" "}
          <Link to="/login" className="text-red-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
