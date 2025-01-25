import React from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";

const Register = () => {
  const navigate = useNavigate();
  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      toast.success("Registration Successful!");
      navigate("/login");
    },
    onError: () => toast.error("Registration Failed! Please try again."),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      username: formData.get("username"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      position: formData.get("position"),
      password: formData.get("password"),
      role: "user",
      linkedInProfile: formData.get("linkedInProfile"),
      company: formData.get("company"),
      companyLogo: formData.get("companyLogo"),
      profilePicture: formData.get("profilePicture"),
    });
  };

  return (
    <Container className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1>Register</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="username" label="Username" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="firstName" label="First Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="lastName" label="Last Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="email" label="Email" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="position" label="Position" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="linkedInProfile"
              label="LinkedIn Profile"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField name="company" label="Company" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField name="companyLogo" label="Company Logo URL" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="profilePicture"
              label="Profile Picture URL"
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
