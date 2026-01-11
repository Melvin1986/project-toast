import React from "react";

function useEscapeKey(onEscapeKeyPressed) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        onEscapeKeyPressed();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEscapeKeyPressed]);
}

export default useEscapeKey;
