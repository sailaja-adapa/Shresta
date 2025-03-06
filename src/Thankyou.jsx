import React from "react";
import { useNavigate } from "react-router-dom";
import background from "./thank.jpg";
import { Box, Typography, Button, Paper } from "@mui/material";

const Thankyou = () => {
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate("/feedback");
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
        fontSize: { xs: "1.5rem", sm: "2rem" },
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
        paddingLeft: { xs: "20px", sm: "50px" },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.7)",
          padding: { xs: "20px", sm: "40px" },
          borderRadius: "15px",
          width: { xs: "95%", sm: "500px" },
          height: { xs: "auto", sm: "auto" },
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            padding: "10px",
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "white",
            borderRadius: "10px",
            display: "inline-block",
            fontSize: { xs: "2rem", sm: "2.5rem" },
          }}
          >
            Thank You! 🙏🎉
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "1.25rem", margin: "6px 0", color: "white" }}>
          Your responsibility and actions are appreciated
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.25rem", margin: "6px 0", color: "white" }}>
          We are grateful for your contribution. 🙌
        </Typography>

        <Button
          onClick={handleFeedbackClick}
          sx={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "1.25rem",
            color: "white",
            backgroundColor: "#007bff",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              backgroundColor: "#0056b3",
              transform: "scale(1.05)",
            },
          }}
        >
          Give Feedback
        </Button>
      </Paper>
    </Box>
  );
};

export default Thankyou;
