import { useId } from "react";

export default function ContactForm() {
  const nameInputId = useId();
  const emailInputId = useId();

  return (
    <form className="mt-4 grid w-full max-w-[46.5rem] grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex w-full rounded-[1rem] shadow-[0_0_16px_4px_rgba(0,0,0,15%)]">
        <label
          htmlFor={nameInputId}
          className="text-purple px-4 py-2 pr-1 font-semibold"
        >
          Name
        </label>
        <input
          id={nameInputId}
          className="w-full rounded-[1rem] px-4 py-2 pl-1 outline-none"
        />
      </div>
      <div className="flex w-full rounded-[1rem] shadow-[0_0_16px_4px_rgba(0,0,0,15%)]">
        <label
          htmlFor={emailInputId}
          className="text-purple px-4 py-2 pr-1 font-semibold"
        >
          Email
        </label>
        <input
          id={emailInputId}
          className="w-full rounded-[1rem] px-4 py-2 pl-1 outline-none"
          type="email"
        />
      </div>
      <textarea
        placeholder="Enter your message here"
        className="h-48 w-full resize-none rounded-[1rem] p-4 shadow-[0_0_16px_4px_rgba(0,0,0,15%)] outline-none md:col-span-2"
      />
      <button
        type="submit"
        className="bg-purple w-full rounded-[1rem] px-8 py-4 font-bold text-white md:col-span-2 md:w-fit"
      >
        Send
      </button>
    </form>
  );
}
