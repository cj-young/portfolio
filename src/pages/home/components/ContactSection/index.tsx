import useStaggeredFadeIn from "@/src/hooks/useStaggeredFadeIn";
import { useScrollContext } from "../../contexts/ScrollContext";
import ContactForm from "./components/ContactForm";

export default function ContactSection() {
  const { scroller } = useScrollContext();
  const { parentRef } = useStaggeredFadeIn(scroller);

  return (
    <section
      className="flex min-h-screen w-full flex-col items-center justify-center"
      ref={parentRef}
    >
      <h2 className="text-subtitle font-bold text-purple">Contact</h2>
      <ContactForm />
    </section>
  );
}
