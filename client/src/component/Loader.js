import React, { useState } from 'react';
import { HashLoader } from "react-spinners";

function Loader() {
  const [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <HashLoader
        color="#000"
        loading={loading}
        cssOverride={override}  // works in react-spinners v2+
        size={80}
      />
    </div>
  );
}

export default Loader;
