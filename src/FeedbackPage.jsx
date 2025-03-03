import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Button,
  TextareaAutosize,
  Paper,
} from "@mui/material";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!feedback.trim() || !selectedEmoji) {
      toast.error("⚠️ Please provide both feedback and select an emoji. 😕", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }

    toast.success("✅ Thank you for your feedback! 😊", {
      position: "top-center",
      autoClose: 5000,
    });

    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
        backgroundImage:
          "url('https://media.istockphoto.com/id/1347375453/photo/hands-holding-green-happy-smile-face-paper-cut-good-feedback-rating-and-positive-customer.jpg?s=612x612&w=0&k=20&c=acMuJHuCTrNMu1hgUjxj17X6ckBS5XuhHLRW440xU3w=')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          background: "rgba(0, 0, 0, 0.8)",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
            transform: "scale(1.02)",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            padding: "10px",
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "white",
            borderRadius: "5px",
          }}
        >
          Feedback 📝
        </Typography>

        <Box sx={{ marginBottom: "20px" }}>
          {["😊", "😢", "😠", "😲", "😍"].map((emoji) => (
            <Typography
              key={emoji}
              component="span"
              role="img"
              aria-label={emoji}
              sx={{
                margin: "0 10px",
                display: "inline-block",
                cursor: "pointer",
                fontSize: "2.1rem",
                transition: "transform 0.3s ease, filter 0.3s ease",
                "&:hover": {
                  transform: "scale(1.3)",
                  filter: "brightness(1.3)",
                },
                ...(selectedEmoji === emoji && {
                  transform: "scale(1.4)",
                  filter: "brightness(1.5)",
                }),
              }}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </Typography>
          ))}
        </Box>

        <TextareaAutosize
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback here..."
          required
          minRows={4}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            marginBottom: "20px",
            background: "rgba(244, 244, 244, 0.5)",
            color: "#333",
            fontSize: "1.1rem",
          }}
        />

        <Button
          type="submit"
          sx={{
            padding: "10px 20px",
            fontSize: "1.25rem",
            color: "white",
            backgroundColor: "#28a745",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#218838",
            },
          }}
        >
          Submit
        </Button>
      </Paper>

      <ToastContainer />
    </Box>
  );
};

export default FeedbackPage;
