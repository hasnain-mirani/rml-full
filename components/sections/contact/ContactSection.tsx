import ContactWaves from "@/components/sections/contact/ContactWaves";
import ContactCard from "@/components/sections/contact/ContactCard";



export default function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-soft)] pb-20">
    
      {/* subtle wave background like figma */}
      <div className="pointer-events-none absolute inset-0">
        <ContactWaves />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-20 md:pt-24">
        <h1 className="font-display text-center text-[44px] font-semibold leading-[1.05] text-[var(--purple)] md:text-[64px]">
          Contact Us
        </h1>

        <div className="mt-10 md:mt-12">
          <ContactCard />
        </div>
      </div>
    </section>
  );
}
