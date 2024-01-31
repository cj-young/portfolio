import ContactForm from "./components/ContactForm";

export default function ContactSection() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center">
      <h2 className="text-purple text-subtitle font-bold">Contact</h2>
      <ContactForm />
    </section>
  );
}
