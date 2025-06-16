"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://backend-auth-app-production.up.railway.app/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("📩 OTP sent to your email!");
      router.push(`/verify?email=${form.email}`);
    } else {
      alert("❌ Registration failed: " + data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200 px-4 py-8">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg border border-pink-300 rounded-3xl shadow-xl p-8 space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-pink-700">🎀 Register Form 🎀</h1>
        <p className="text-gray-600 text-sm">Create your account 🌟</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="🧑 Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-pink-300 rounded-xl bg-pink-50 placeholder:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-pink-300 rounded-xl bg-pink-50 placeholder:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            placeholder="📱 Phone (Optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full p-3 border border-pink-300 rounded-xl bg-pink-50 placeholder:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white py-2 rounded-xl font-semibold shadow-md transition duration-300"
            >
              🚀 Submit
            </button>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="flex-1 bg-white border border-pink-300 hover:bg-pink-100 text-pink-600 py-2 rounded-xl font-semibold shadow-sm transition duration-300"
            >
              🔐 Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}