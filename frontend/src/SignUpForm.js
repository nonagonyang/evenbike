import React, { useState } from "react";
function SignUpForm() {
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
      <label for="username">Username:</label>
      <input name="username" />
      <label for="weight">Weight:</label>
      <input name="weight" />
      <label for="height">Height:</label>
      <input name="height" />
      <button>Sign Un</button>
    </form>
  );
}

export default SignUpForm;
