"use client"
import { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function ContactUs() {
  const servicesItems = [
    "Business Management & Consultancy",
    "Human Resource Management",
    "Digital Marketing & Business Consultant",
    "Warehouse Management",
    "Asset Management",
    "Governance, Risk Management & Compliance",
    "Web Development & Hosting Services",
    "IT Services",
  ];
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    services: [],
  });

  const handleChange = (e) => {
    const { name, id, value, type, checked } = e.target;
    // console.log(e.target);
    if (type === "checkbox") {
      // console.log("name"+ id,"value"+ value,"type"+ type,"checked"+ checked);
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, id]
          : prev.services.filter((service) => service !== value),
      }));
      // console.log(formData)
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const message = `
      Name: ${formData.fullName}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Services: ${formData.services.join(", ")}
      Message: ${formData.message}
    `;

    const res = await fetch("/api/sendemail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/form-Success");
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <main className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 justify-center items-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-8 rounded-lg bg-white/80 backdrop-blur-md shadow-xl"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-800 text-3xl font-semibold sm:text-4xl"
          >
            Get in touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-3"
          >
            We’d love to hear from you! Please fill out the form below.
          </motion.p>
        </div>
        <form onSubmit={sendEmail} className="space-y-5 mt-12 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className="font-medium">Full name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label className="font-medium">Phone number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <label className="font-medium">Services</label>
            <ul className="grid gap-y-2 gap-x-6 flex-wrap grid-cols-2 mt-3">
              {servicesItems.map((item, idx) => (
                <li key={idx} className="flex gap-x-3 text-sm">
                  <div>
                    <input
                      id={`${item}`}
                      type="checkbox"
                      className="checkbox-item peer hidden"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <label
                      htmlFor={`${item}`}
                      className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                    ></label>
                  </div>
                  <label htmlFor={`${item}`} className="cursor-pointer">
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <label className="font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
            ></textarea>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <button
              className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150 flex items-center justify-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </main>
  );
}
//checked