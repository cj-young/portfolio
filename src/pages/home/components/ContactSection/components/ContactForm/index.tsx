import { ContactInfo, contactSchema } from "@/src/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

const DEFAULT_ERROR_MESSAGE = "An error occurred, please try again";
const SUBMIT_SUCCESS_MESSAGE = "Message sent!";
const MAX_MESSAGE_LENGTH = 20_000;

export default function ContactForm() {
  const nameInputId = useId();
  const emailInputId = useId();
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ContactInfo>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInfo) {
    setFormError("");
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
      console.log(resData);
      if (!res.ok || resData.message !== "success") {
        setFormError(DEFAULT_ERROR_MESSAGE);
      } else {
        setFormError("");
        setFormMessage(SUBMIT_SUCCESS_MESSAGE);
      }
    } catch (error) {
      setFormError(DEFAULT_ERROR_MESSAGE);
      console.error(error);
    }
  }

  return (
    <>
      <form
        className={`mt-4 grid w-full max-w-[46.5rem] grid-cols-1 gap-4 md:grid-cols-2 ${isSubmitting ? "opacity-50" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={`relative flex w-full rounded-[1rem] bg-white shadow-[0_0_16px_4px_rgba(0,0,0,15%)] outline-2 ${errors.name ? "outline-red-600" : "outline-purple"} focus-within:outline`}
        >
          <label
            htmlFor={nameInputId}
            className={`px-4 py-2 pr-1 font-semibold ${errors.name ? "text-red-600" : "text-purple"}`}
          >
            Name
          </label>
          <input
            id={nameInputId}
            className={`w-full rounded-[1rem] px-4 py-2 pl-1 outline-none ${isSubmitting ? "cursor-default" : ""}`}
            {...register("name", { required: true })}
            readOnly={isSubmitting}
          />
          {errors.name?.message && (
            <div className="absolute -bottom-1 right-0 z-30 mt-2 translate-y-full rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-white">
              {errors.name.message}
            </div>
          )}
        </div>
        <div
          className={`relative flex w-full rounded-[1rem] bg-white shadow-[0_0_16px_4px_rgba(0,0,0,15%)] outline-2 ${errors.email ? "outline-red-600" : "outline-purple"} focus-within:outline`}
        >
          <label
            htmlFor={emailInputId}
            className={`px-4 py-2 pr-1 font-semibold ${errors.email ? "text-red-600" : "text-purple"}`}
          >
            Email
          </label>
          <input
            id={emailInputId}
            className={`w-full rounded-[1rem] px-4 py-2 pl-1 outline-none ${isSubmitting ? "cursor-default" : ""}`}
            type="email"
            {...register("email")}
            readOnly={isSubmitting}
          />
          {errors.email?.message && (
            <div className="absolute -bottom-1 right-0 z-30 mt-2 translate-y-full rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-white">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="relative md:col-span-2">
          <textarea
            placeholder="Enter your message here"
            className={`h-48 w-full resize-none rounded-[1rem] bg-white p-4 shadow-[0_0_16px_4px_rgba(0,0,0,15%)] outline-2 ${errors.message ? "outline-red-600" : "outline-purple"} focus-within:outline ${isSubmitting ? "cursor-default" : ""}`}
            {...register("message", {
              required: true,
              maxLength: MAX_MESSAGE_LENGTH,
            })}
            readOnly={isSubmitting}
          />
          {errors.message?.message && (
            <div className="absolute -bottom-1 right-0 z-30 mt-2 translate-y-full rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-white">
              {errors.message.message}
            </div>
          )}
        </div>
        <input
          type="text"
          className="absolute h-0 w-0 opacity-0"
          aria-hidden
          tabIndex={-1}
          {...register("_honey")}
          readOnly={isSubmitting}
        />
        <div className="flex flex-col items-center justify-between gap-4 md:col-span-2 md:flex-row">
          <button
            type="submit"
            className={`w-full rounded-[1rem] ${isSubmitting ? "cursor-default bg-gray-500" : "bg-purple"} px-8 py-4 font-bold text-white md:w-fit`}
          >
            Send
          </button>
          <div className="ml-auto flex w-full items-center justify-center text-center md:w-fit md:justify-start">
            <span>
              &hellip; or send me an email at{" "}
              <span className="text-purple">seejaewhy@gmail.com</span>.
            </span>
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          {formError ? (
            <span className="text-red-600">* {formError}</span>
          ) : formMessage ? (
            <span className="text-purple">{formMessage}</span>
          ) : null}
        </div>
      </form>
    </>
  );
}
