import React from "react";
import { withProtected } from "../src/hook/route";

function Admin({ auth }) {
  const { logout } = auth;
  return (
    <div>
      <h1> DashBoard Admin</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default withProtected(Admin);
