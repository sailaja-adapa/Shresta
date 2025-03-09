import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";

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
          {/* Dashboard Heading */}
          <div className="text-center mb-12">
            <motion.span
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(0,0,0,0.15)" }}
              className="bg-white text-gray-700 text-sm font-medium py-1 px-3 rounded-full cursor-pointer"
            >
              Dashboard
            </motion.span>

            {/* Animated "Hello Officer 👋" Text & Emoji */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-4 text-4xl font-bold tracking-tight text-gray-900 flex items-center justify-center gap-2"
            >
              Hello Officer{" "}
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              >
                👋
              </motion.span>
            </motion.h1>
          </div>

          {/* Complaints Management Card */}
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                background: "#ffffff", // Solid white background (Blur removed)
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.25)",
                },
              }}
            >
              <CardContent className="flex flex-col items-center justify-center space-y-6">
                {/* Icon Animation */}
                <motion.div
                  whileHover={{ rotate: 2, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner"
                >
                  <FaArrowRightLong className="w-8 h-8 text-gray-600" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  whileHover={{ scale: 1.05, textShadow: "0px 2px 10px rgba(0,0,0,0.2)" }}
                  className="text-2xl font-semibold text-gray-800 cursor-pointer"
                >
                  Complaints Management
                </motion.h2>

                {/* Description */}
                <Typography
                  variant="body1"
                  color="textSecondary"
                  textAlign="center"
                  sx={{ maxWidth: "400px" }}
                >
                  View and manage all user complaints in one centralized location.
                </Typography>

                {/* Button with Click Effect */}
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="contained"
                    sx={{
                      background: "linear-gradient(to right, #4B5563, #374151)",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      transition: "all 0.3s ease-in-out",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      "&:hover": {
                        background: "linear-gradient(to right, #374151, #1F2937)",
                        transform: "translateY(-2px)",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                      },
                    }}
                    onClick={() => navigate("/complaints")}
                  >
                    View Complaints <FaArrowRightLong />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
