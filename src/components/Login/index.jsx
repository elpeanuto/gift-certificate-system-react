import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { setToken } from "../util/jwt";
import { getToken } from "../api/jwt/api";

const Login = () => {
  const [error, setError] = useState(null); 

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must not exceed 30 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(30, "Password must not exceed 30 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const body = {
        email: values.username,
        password: values.password,
      };

      try {
        const jwtData = await getToken(body);
        setToken(jwtData);

        window.location.href = "/certificates";
      } catch (error) {
        setError(error.message); 
      }
    },
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          backgroundColor: "#E7EAEF",
        }}
      >
        <Container
          className="p-4 border rounded"
          style={{
            width: "350px",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h1 className="text-center mb-4">Login</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="username" style={{ marginBottom: "10px" }}>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="email"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-danger">{formik.errors.username}</div>
              )}
            </Form.Group>
            <Form.Group controlId="password" style={{ marginBottom: "20px" }}>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </Form.Group>
            <div className="text-center">
              <Button
                id="submit"
                type="submit"
                variant="primary"
                style={{ width: "100%", padding: "10px" }}
              >
                Login
              </Button>
            </div>
          </Form>
      {error && ( 
        <div className="text-danger text-center mt-2">{error}</div>
      )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
