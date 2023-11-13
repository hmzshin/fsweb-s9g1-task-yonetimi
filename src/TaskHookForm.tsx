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

  function onSubmitHandler(formData: any) {
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

          type="text"
          {...register("title", {
            required: "Görev başlığı boş bırakılamaz",
            minLength: {
              value: 3,
              message: "Görev adı 3 harften az olamaz",
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
         
          id="description"
          
          {...register("description", {
            required: "Görev açıklaması zorunludur.",
            minLength: {
              value: 10,
              message: "Açıklama 10 karakterden az olamaz!",
            },
          })}
        ></textarea>
        <p className="input-error">{errors?.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((parameter:any) => (
            <label className="input-checkbox" key={parameter}>
              <input
                type="checkbox"
                
                value={parameter}
                {...register("people", {
                  required: "Görev ataması için bir kişi seçiniz",
                })}
              />
              {parameter}
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
