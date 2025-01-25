import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LeftPanel from "./components/Layout/LeftPanel";
import TopNavigation from "./components/Layout/TopNavigation";
import Login from "./components/Login";
import styles from "./styles/app.module.css";
import CryptoJS from "crypto-js";

const SECRET = process.env.REACT_APP_SECRET;

const AppRoutes = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userSecret, setUserSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Retrieve and compare the hashed secret from localStorage
    const storedHashedSecret = localStorage.getItem("site_secret");
    const hashedSecret = CryptoJS.SHA256(SECRET).toString(); // Hash the secret from .env

    if (storedHashedSecret === hashedSecret) {
      setIsModalOpen(false); // Unlock the site if the hashes match
    }
  }, []);

  const handleUnlock = () => {
    const hashedUserSecret = CryptoJS.SHA256(userSecret).toString(); // Hash the entered secret
    const hashedSecret = CryptoJS.SHA256(SECRET).toString(); // Hash the secret from .env

    if (hashedUserSecret === hashedSecret) {
      localStorage.setItem("site_secret", hashedUserSecret); // Store the hashed secret in localStorage
      setIsModalOpen(false); // Close the modal
      setErrorMessage(""); // Clear any error messages
    } else {
      setErrorMessage("Incorrect secret. Please try again.");
    }
  };

  return (
    <>
      <Modal open={isModalOpen} disableEscapeKeyDown>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Enter One Time Secret to Access the Site
          </Typography>
          <TextField
            label="Secret"
            variant="outlined"
            fullWidth
            value={userSecret}
            onChange={(e) => setUserSecret(e.target.value)}
            sx={{ mb: 2 }}
            autoComplete="off"
          />
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUnlock}
            fullWidth
          >
            Unlock
          </Button>
        </Box>
      </Modal>
      {!isModalOpen && (
        <Router>
          <TopNavigation />
          <div className={styles.appContainer}>
            <LeftPanel />
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
};

export default AppRoutes;
