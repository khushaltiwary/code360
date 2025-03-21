import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { loginSuccess, loginFailure } from "../reduxToolkit/slices/loginSlice"; // Import actions from your slice



const LoginSc = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Create dispatch to send actions

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    if (!validateEmail(email)) {
      errors.email = "Invalid email format";
      valid = false;
    }
    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters";
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      const userData = { email }; // You can enrich this object with real user data
      dispatch(loginSuccess(userData)); // Dispatch login success action
      navigate("/home"); 
    } else {
      dispatch(loginFailure(errors)); // Dispatch login failure action
    }
  };

  return (
    <Box sx={styles.container}>
      <Card elevation={5} sx={styles.card}>
        <CardContent>
          <Typography variant="h5" component="div" sx={styles.title}>
            360° Code Analytics
          </Typography>

          <Typography variant="body2" sx={styles.paragraph}>
            Please enter your credentials to continue.
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              variant="outlined"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={styles.input}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={styles.input}
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" sx={styles.button} onClick={handleLogin}>
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

// Styles defined outside the component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#46beaa",
    padding: 2,
    height:"100vh"
  },
  card: {
    //height: "40vh",
    width: "25%",
    borderRadius: 5,
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s",
    backgroundColor: "#ffffff",
    padding: "1rem",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 1,
    color: "#46beaa",
    paddingBottom: 0.5,
    textAlign: "center",
  },
  paragraph: {
    color: "#555",
    marginBottom: 2,
    textAlign: "center",
  },
  button: {
    width: "100%",
    marginEnd: 10,
    marginBottom: "0.5",
    backgroundColor: "#46beaa",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#39a493",
    },
  },
  input: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.3)",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#46beaa",
    },
    "& .MuiInputLabel-root": {
      color: "rgba(0, 0, 0, 0.7)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#46beaa",
    },
    "& .MuiFormHelperText-root": {
      color: "#d32f2f",
    },
  },
};

export default LoginSc;
