import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import { FaArrowRightLong } from "react-icons/fa6";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="main-dashboard min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 pt-16">
      <div className="relative p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="bg-white backdrop-blur-sm text-gray-700 text-sm font-medium py-1 px-3 rounded-full">
             Dashboard
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
              Hello Officer 👋
            </h1>
          </div>

          <div className="p-8 bg-white backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                <FaArrowRightLong className="w-8 h-8 text-gray-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Complaints Management
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                View and manage all user complaints in one centralized location
              </p>
              <button
                onClick={() => navigate("/complaints")}
                className="mt-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black transition-all duration-300 flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
              >
                View Complaints
                <FaArrowRightLong className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
