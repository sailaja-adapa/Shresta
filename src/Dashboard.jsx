import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";
import backgroundImage from "./dashboard2.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "900px", width: "100%", textAlign: "center", mb: 12 }}> {/* max-w-4xl in MUI */}
        <Typography
          variant="h4"
          fontWeight="bold"
          mt={4}
          mb={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          Hello Officer
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            👋
          </motion.span>
        </Typography>

        <motion.div whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}>
          <Card
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: 4,
              boxShadow: 3,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.25)",
              },
            }}
          >
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <motion.div whileHover={{ rotate: 2, scale: 1.1 }} transition={{ duration: 0.3 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    bgcolor: "grey.200",
                    boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <FaArrowRightLong style={{ width: 32, height: 32, color: "gray" }} />
                </Box>
              </motion.div>

              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Complaints Management
              </Typography>

              <Typography variant="body1" color="textSecondary" textAlign="center" maxWidth={400}>
                View and manage all user complaints in one centralized location.
              </Typography>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "gray.700",
                    color: "white",
                    py: 1,
                    px: 3,
                    borderRadius: "8px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      bgcolor: "gray.800",
                      transform: "translateY(-2px)",
                      boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                  onClick={() => navigate("/complaints")}
                >
                  View Complaints <FaArrowRightLong />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Dashboard;