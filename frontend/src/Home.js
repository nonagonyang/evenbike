import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function Home() {
  return (
    <div>
      <h1>Welcome to EvenBike please sign in or sign up!</h1>
      <h2>Sign In form</h2>
      <SignInForm />
      <h2>Sign Up form</h2>
      <SignUpForm />
    </div>
  );
}

export default Home;
