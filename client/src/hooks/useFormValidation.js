import { useState, useEffect } from "react";

const useFormValidation = (username, room) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formError, setFormError] = useState("");

  const validateFormInput = () => {
    if (!username || !room) {
      setFormIsValid(false);
      return setFormError("all input fields are required");
    }

    setFormError("");
    return setFormIsValid(true);
  };

  useEffect(() => {
    validateFormInput();
  }, [username, room]);

  return [formIsValid, formError];
};

export default useFormValidation;
