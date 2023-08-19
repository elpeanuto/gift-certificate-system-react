import { useFormik } from "formik";
import * as Yup from "yup";
import useLocalState from "../util/useLocalStateHook";
import styles from "./styles/login.module.css";
import "../../assets/global.css";
import { Helmet } from "react-helmet";
import { getToken } from "../util/api";

const Login = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

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

        window.location.href = "/certificates";
        setJwt(jwtData);
      } catch (error) {
        window.alert(error.message);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className={styles.container}>
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username:</label>
              <input
                type="email"
                id="username"
                name="username"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <div className={styles.error}>{formik.errors.username}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button id="submit" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
