import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useForm, SubmitHandler } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    people: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...formData,
    },
    mode: "all",
  });

  function onSubmitHandler(formData) {
    console.log("form data : ", formData);
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
  }
  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Ürün adı alanı zorunludur.",
            minLength: {
              value: 3,
              message: "İsim üç karakterden az olamaz!",
            },
          })}
        />
        <p className="input-error">{errors?.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Ürün adı alanı zorunludur.",
            minLength: {
              value: 3,
              message: "İsim üç karakterden az olamaz!",
            },
          })}
        ></textarea>
        <p className="input-error">{errors?.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  required: "Ürün adı alanı zorunludur.",
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors?.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
