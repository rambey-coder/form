import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../services/auth";
import { SignUp } from "../services/auth";
import { SignOut } from "../services/auth";

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

const ContextProvider = ({ children }) => {
 
  // sign up state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup error state
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [togglePassword, setTogglePassword] = useState(false);

  // sign in state
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  // sign in error state
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const emailTest = new RegExp(/\S+@\S+\.\S+/);
  const passwordTest = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  );
  const usernameTest = new RegExp(/^[A-Za-z]{5,29}$/);

  const navigate = useNavigate();

  // toggle password visibility
  const handleToggle = () => {
    setTogglePassword(!togglePassword);
  };

  // input value
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "UserName":
        setUserName(value);
        break;
      case "pass":
        setPass(value);
        break;
      default:
        break;
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    validateField(name);
  };

  const removeError = () => {
    setTimeout(() => {
      setPassError(false);
      setNameError(false);
      setEmailError(false);
      setuserNameError(false);
      setPasswordError(false);
    }, 3000);
  };

  const validateField = (name) => {
    let isValid = false;
    switch (name) {
      case "username":
        isValid = validatUsername();
        break;
      case "email":
        isValid = validateEmail();
        break;
      case "password":
        isValid = validatePassword();
        break;
      case "UserName":
        isValid = validatUserName();
        break;
      case "pass":
        isValid = validatePass();
        break;
      default:
        break;
    }
    return isValid;
  };

  // signup validate
  const validatePassword = () => {
    let passwordError = "";
    const value = password;
    if (value.trim() === "") passwordError = "Password is required";
    else if (!passwordTest.test(value))
      passwordError =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";
    setPassError(passwordError);
    return passwordError === "";
  };

  const validateEmail = () => {
    let emailError = "";
    const value = email;
    if (value.trim() === "") emailError = "Email Address is required";
    else if (!emailTest.test(value)) emailError = "Email is not valid";
    setEmailError(emailError);
    return emailError === "";
  };

  const validatUsername = () => {
    let usernameError = "";
    const value = username;
    if (value.trim() === "") usernameError = "Username is required";
    else if (!usernameTest.test(value))
      usernameError = "Username must be atleast 5 characters";
    removeError();
    setNameError(usernameError);
    return usernameError === "";
  };
  //

  // sign in validate
  const validatePass = () => {
    let passwordError = "";
    const value = pass;
    if (value.trim() === "") passwordError = "Password is required";
    else if (!passwordTest.test(value))
      passwordError =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";
    removeError();
    setPasswordError(passwordError);
    return passwordError === "";
  };

  const validatUserName = () => {
    let usernameError = "";
    const value = userName;
    if (value.trim() === "") usernameError = "Username is required";
    else if (!usernameTest.test(value))
      usernameError = "Username must be atleast 5 characters";
    removeError();
    setuserNameError(usernameError);
    return usernameError === "";
  };
  //

  //signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
    };

    const formFields = ["username", "email", "password"];

    let isValid = true;
    formFields.forEach((field) => {
      isValid = validateField(field) && isValid;
    });

    if (isValid) {
      try {
        const res = await SignUp(data);
        if (res) {
          toast.success(res?.data?.message);

          navigate("/profile");

          setEmail("");
          setPassword("");
          setUsername("");
        }
      } catch (error) {
        if (error) {
          toast.error(error?.response?.data?.message);
          navigate(null);
        }
      }
    }
  };

  //sign in
  const handleLogin = async (e) => {
    e.preventDefault();

    const formFields = ["UserName", "pass"];

    let isValid = true;
    formFields.forEach((field) => {
      isValid = validateField(field) && isValid;
    });

    const data = {
      username: userName,
      password: pass,
    };

    if (isValid) {
      try {
        const res = await SignIn(data);
        if (res) {
          toast.success(res?.data?.message);

          localStorage.setItem("user", JSON.stringify(res?.data));

          navigate("/profile");

          setUserName("");
          setPass("");
        }
        return res?.data;
      } catch (error) {
        if (error) {
          toast.error(error?.response?.data?.message);
          navigate(null);
        }
      }
    }

     
  };

  //sign out
  const handleLogout = () => {
    SignOut();
    navigate("/login");
  };

  return (
    <AppContext.Provider
      value={{
        handleBlur,
        handleChange,
        handleToggle,
        handleSubmit,
        handleLogin,
        userName,
        handleLogout,
        setUserName,
        pass,
        setPass,
        username,
        email,
        password,
        togglePassword,
        emailError,
        nameError,
        passError,
        userNameError,
        passwordError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
