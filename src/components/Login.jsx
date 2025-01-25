import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/authApi";
import styles from "../styles/login.module.css";
import { Container } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const decodedTokenUser = jwtDecode(data.data.token);
      localStorage.setItem("user", JSON.stringify(decodedTokenUser));
      toast.success("Login Successful!");
      navigate("/dashboard");
    },
    onError: (e) => toast.error(e?.response?.data?.error || "Login Failed!"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <Container className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1>Login</h1>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            defaultValue="amantha.jayathilake@hapstar.app"
            sx={{
              backgroundColor: "white",
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            defaultValue="Zaq1xsw@"
          />
        </div>

        <div className={styles.loginButtonContainer}>
          <button
            type="submit"
            variant="contained"
            fullWidth
            className={styles.loginButton}
            disabled={mutation.isLoading}
          >
            Login
          </button>
        </div>

        <p>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={() => toast.info("Please contact admin to register")}
          >
            Sign up here
          </a>
          .
        </p>
      </form>
    </Container>
  );
};

export default Login;
