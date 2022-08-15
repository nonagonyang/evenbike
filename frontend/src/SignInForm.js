import React, { useState } from "react";
function SignInForm() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <form>
      <label for="email">Email:</label>
      <input name="email" />
      <label for="password">Password:</label>
      <input name="password" />
      <button>Sign In</button>
    </form>
  );
}

export default SignInForm;
