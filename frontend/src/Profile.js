import react from "react";
function Profile({ user }) {
  return (
    <div>
      <h1>This is {user.name}'s profile page</h1>
    </div>
  );
}

export default Profile;
