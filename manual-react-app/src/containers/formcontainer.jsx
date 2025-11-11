import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../features/formSlice";
import FormComponent from "../components/formcomponent";

const FormContainer = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleChange = (name, value) => {
    dispatch(updateField({ name, value }));
  };

  const handleSubmit = () => {
    alert(`Form Submitted:\n${JSON.stringify(formData, null, 2)}`);
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  return (
    <FormComponent
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  );
};

export default FormContainer;
