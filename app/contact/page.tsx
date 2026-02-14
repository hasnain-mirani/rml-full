import Navbar from "@/components/layout/Navbar";
import ContactSection from "@/components/sections/contact/ContactSection";

export default function ContactPage() {
  return (
    <main className="bg-[var(--bg-soft)]">
      <Navbar />
      <ContactSection />
    </main>
  );
}
