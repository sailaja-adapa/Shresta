import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  Box, Button, Container, Paper, TextField, Typography 
} from "@mui/material";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!feedback.trim() || !selectedEmoji) {
      toast.error('⚠️ Please provide both feedback and select an emoji. 😕', {
        position: "top-center",
        autoClose: 5000, // Display duration of 5 seconds
      });
      return;
    }

    toast.success('✅ Thank you for your feedback! 😊', {
      position: "top-center",
      autoClose: 5000, // Display duration of 5 seconds
    });

    // Redirect after toast has been shown
    setTimeout(() => {
      navigate('/');
    }, 5000); // Same duration as toast display time
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url('https://media.istockphoto.com/id/1347375453/photo/hands-holding-green-happy-smile-face-paper-cut-good-feedback-rating-and-positive-customer.jpg?s=612x612&w=0&k=20&c=acMuJHuCTrNMu1hgUjxj17X6ckBS5XuhHLRW440xU3w=')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
          }}
        >
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: "bold", 
              mb: 2, 
              background: "linear-gradient(to right, #ff7e5f, #feb47b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Feedback 📝
          </Typography>

          <Box 
            sx={{
              display: "flex", 
              justifyContent: "center", 
              gap: 2, 
              fontSize: "2rem", 
              mb: 2 
            }}
          >
            {["😊", "😢", "😠", "😲", "😍"].map((emoji) => (
              <Box
                key={emoji}
                component="span"
                role="img"
                aria-label={emoji}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.3s, filter 0.3s",
                  "&:hover": { transform: "scale(1.3)", filter: "brightness(1.3)" },
                  transform: selectedEmoji === emoji ? "scale(1.4)" : "scale(1)",
                  filter: selectedEmoji === emoji ? "brightness(1.5)" : "none",
                }}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </Box>
            ))}
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{
              backgroundColor: "rgba(244, 244, 244, 0.5)",
              borderRadius: 1,
              color: "#333",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "#ff7e5f" },
                "&.Mui-focused fieldset": { borderColor: "#feb47b" },
              },
              mb: 2,
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#28a745",
              color: "white",
              fontSize: "1.2rem",
              padding: "10px",
              borderRadius: "5px",
              "&:hover": { backgroundColor: "#218838" },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </Container>

      <ToastContainer />
    </Box>
  );
};

export default FeedbackPage;
