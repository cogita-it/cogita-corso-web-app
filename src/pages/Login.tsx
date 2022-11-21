import { useState, useEffect } from "react";
import { signIn, signUp } from "../services/LoginService";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
        navigate("../chat")
    }
  }, [])

  const onSignIn = () => {
    setErrorMessage("")
    signIn(email, password).then((userId: string) => {
      // redirect
      localStorage.setItem("userId", userId);
      navigate("../chat");
    })
    .catch((error) => setErrorMessage("Si e' verificato un errore!"));
  };

  const onSignUp = () => {
    setErrorMessage("")
    signUp(email, password, username)
      .then((userId: string) => {
        // redirect
        localStorage.setItem("userId", userId);
        navigate("../chat");
      })
      .catch((error) => setErrorMessage("Si e' verificato un errore!"));
  };

  return (
    <div className="login-page-container">
      <p>Accedi alla chat</p>
      <div className="login-form-container">
      {isSignUp &&
        <input
            className="username-input-field"
            type="text"
            placeholder="Come ti chiami?"
            onChange={(event) => setUsername(event.target.value)}
          />
      }
        <input
          className="email-input-field"
          type="email"
          placeholder="Il tuo indirizzo email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="password-input-field"
          type="password"
          placeholder="Scegli una password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {errorMessage && 
        <>
        <p className="login-error-message">{errorMessage}</p>
        </>
        }
        {isSignUp &&
          <span>
            <a className="login-toggle" onClick={() => setIsSignUp(false)}>Hai gia un profilo?</a>
            <button className="login-form-button" onClick={onSignUp}>Crea il tuo profilo</button>
          </span>
        }
        {!isSignUp &&
          <span>
            <a className="login-toggle" onClick={() => setIsSignUp(true)}>Non hai un profilo?</a>
            <button className="login-form-button" onClick={onSignIn}>Accedi alla chat</button>
          </span>
        }
      </div>
    </div>
  );
}

export default Login;
