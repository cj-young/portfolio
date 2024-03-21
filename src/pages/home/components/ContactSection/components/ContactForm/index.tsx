import { useId, useState } from "react";
import { useForm } from "react-hook-form";

const DEFAULT_ERROR_MESSAGE = "An error occurred, please try again";

type FormInputs = {
  name: string;
  email: string;
  message: string;
  _honey: string;
};

export default function ContactForm() {
  const nameInputId = useId();
  const emailInputId = useId();
  const [formError, setFormError] = useState("");
  const { register, handleSubmit, formState } = useForm<FormInputs>();

  async function onSubmit(data: FormInputs) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        setFormError(DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      setFormError(DEFAULT_ERROR_MESSAGE);
      console.error(error);
    }
  }

  return (
    <>
      <form
        className={`mt-4 grid w-full max-w-[46.5rem] grid-cols-1 gap-4 md:grid-cols-2 ${formState.isSubmitting ? "opacity-50" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full rounded-[1rem] bg-white shadow-[0_0_16px_4px_rgba(0,0,0,15%)] outline-2 outline-purple focus-within:outline">
          <label
            htmlFor={nameInputId}
            className="px-4 py-2 pr-1 font-semibold text-purple"
          >
            Name
          </label>
          <input
            id={nameInputId}
            className={`w-full rounded-[1rem] px-4 py-2 pl-1 outline-none ${formState.isSubmitting ? "cursor-default" : ""}`}
            {...register("name")}
            readOnly={formState.isSubmitting}
          />
        </div>
        <div className="flex w-full rounded-[1rem] bg-white shadow-[0_0_16px_4px_rgba(0,0,0,15%)] outline-2 outline-purple focus-within:outline">
          <label
            htmlFor={emailInputId}
            className="px-4 py-2 pr-1 font-semibold text-purple"
          >
            Email
          </label>
          <input
            id={emailInputId}
            className={`w-full rounded-[1rem] px-4 py-2 pl-1 outline-none ${formState.isSubmitting ? "cursor-default" : ""}`}
            type="email"
            {...register("email")}
            readOnly={formState.isSubmitting}
          />
        </div>
        <textarea
          placeholder="Enter your message here"
          className={`h-48 w-full resize-none rounded-[1rem] bg-white p-4 shadow-[0_0_16px_4px_rgba(0,0,0,15%)] outline-2 outline-purple focus-within:outline md:col-span-2 ${formState.isSubmitting ? "cursor-default" : ""}`}
          {...register("message")}
          readOnly={formState.isSubmitting}
        />
        <input
          type="text"
          className="absolute h-0 w-0 opacity-0"
          aria-hidden
          tabIndex={-1}
          {...register("_honey")}
          readOnly={formState.isSubmitting}
        />
        <button
          type="submit"
          className={`w-full rounded-[1rem] ${formState.isSubmitting ? "cursor-default bg-gray-500" : "bg-purple"} px-8 py-4 font-bold text-white md:col-span-2 md:w-fit`}
        >
          Send
        </button>
      </form>
    </>
  );
}
