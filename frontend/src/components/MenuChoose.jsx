import React from "react";
import { useForm } from "react-hook-form";
import "../styles/HomePage.css";

const MenuChoose = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    onSubmit(data.menuId); // Pass the menu ID back to the parent component
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="homepage-form">
      <div className="form-group roboto-light">
        <label htmlFor="menuId">Enter Menu ID</label>
        <input
          id="menuId"
          className="user-data-input roboto-light"
          {...register("menuId", { required: "" })}
          placeholder="Menu ID"
        />
        {errors.menuId && (
          <p className="error-message">{errors.menuId.message}</p>
        )}
      </div>
      <div className="centeredBtn roboto-light">
        <button className="submitButton" type="submit">
          Show Menu
        </button>
      </div>
    </form>
  );
};

export default MenuChoose;
