import React, { useState } from "react";
import "./loading.scss";

const Loading = (message?: string) => {
  return (
    <div className="loading-container">
      {message ? <p>message</p> : <p>...loading</p>}
    </div>
  );
};

export default Loading;
