import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("aira_user");

    if (!storedUser) {
      alert("User not found. Please register.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === form.email && user.password === form.password) {
      setToken("aira_secure_token");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3ede5]">
      <div className="bg-white w-[420px] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-[#4b2e2e] text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/" className="text-red-500 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
