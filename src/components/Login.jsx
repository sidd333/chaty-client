import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Paper, CssBaseline, Grid, Link } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // Import useAuth

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from context

  // React Hook Form setup with Zod resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "siddhant.chettri@yopmail.com",
      password: "strong@123HHH",
    },
  });

  const onSubmit = (data) => {
    login(data.email, data.password); // Use the login function from context
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toaster position="top-center" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              width: "100%",
              borderRadius: 2,
              background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "primary.main",
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 4, color: "text.secondary" }}
            >
              Sign in to continue to your account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
            >
              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    sx={{ mb: 3 }}
                  />
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 1,
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #1976d2, #2196f3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                  },
                }}
              >
                Sign In
              </Button>

              {/* Forgot Password Link */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/signup"
                    variant="body2"
                    sx={{ color: "primary.main", textDecoration: "none" }}
                  >
                    Dont have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Login;
