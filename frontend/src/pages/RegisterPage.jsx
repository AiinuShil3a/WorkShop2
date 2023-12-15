import { useState } from "react";

const RegisterPage = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const handleRegister = async(event) => {
    event.preventDefault();
    const res = await fetch(`${URL}/register` ,{
      method:"POST",
      body: JSON.stringify({username , password}),
      headers:{"Content-Type":"application/json"},
    });
    if(res.status === 200){
      alert("Successful")
    }else{
      alert("Error Something!!!")

    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Register</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />

          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
