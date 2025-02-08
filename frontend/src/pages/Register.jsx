import { useState } from "react";
import Form from "../components/Form";
import { AUTH_ENDPOINTS } from "../constants";

function Register() {
  const [isProvider, setIsProvider] = useState(false);

  return (
    <div className="register-page">
      <div className="register-type-selector">
        <button
          onClick={() => setIsProvider(false)}
          className={!isProvider ? "active" : ""}
        >
          Register as Client
        </button>
        <button
          onClick={() => setIsProvider(true)}
          className={isProvider ? "active" : ""}
        >
          Register as Provider
        </button>
      </div>
      <Form
        route={
          isProvider
            ? AUTH_ENDPOINTS.REGISTER_PROVIDER
            : AUTH_ENDPOINTS.REGISTER_CLIENT
        }
        method="register"
        isProvider={isProvider}
      />
    </div>
  );
}

export default Register;
