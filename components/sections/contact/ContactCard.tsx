import { Button } from "@/components/ui/button";
import { UnderlineInput } from "@/components/ui/underline-input";
import { UnderlineTextarea } from "@/components/ui/underline-textarea";

export default function ContactCard() {
  return (
    <div className="mx-auto max-w-5xl rounded-[26px] bg-[var(--purple)] px-6 py-10 md:px-12 md:py-14">
      <div className="grid gap-10 md:grid-cols-[1fr_420px] md:gap-12">
        {/* Left */}
        <div className="text-white">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Ready to Start Your <br /> Project?
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
            Let&apos;s make your vision a reality. Contact us today and let&apos;s discuss how
            we can help you innovate and grow.
          </p>

          <div className="mt-10">
            <p className="text-sm font-semibold">Contact Info</p>

            <div className="mt-4 space-y-3 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  ✉️
                </span>
                <span>admin@revelationml.com</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  📞
                </span>
                <span>+447341224475</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  📍
                </span>
                <span>Manchester, United Kingdom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form card (Figma exact style) */}
        <div className="rounded-[18px] bg-[#F4EDFF] px-6 py-7 shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:px-7">
          <div>
            <h3 className="text-lg font-semibold text-[#2B1B3F]">
              Become a Partner
            </h3>
            <p className="mt-1 text-sm text-[#7A6A91]">
              Break the ice! Let us help you out
            </p>
          </div>

          <form className="mt-6 space-y-6">
            <UnderlineInput label="What's your name?*" required />

            <UnderlineInput
              label="What's your phone number?*"
              required
              helper="Please enter a valid phone number."
            />

            <UnderlineInput label="Whats your email?" type="email" />

            <UnderlineTextarea label="Describe your interest" />

            <Button
              type="button"
              className="mt-2 h-11 w-full rounded-full bg-[#1A1A1A] text-white hover:bg-black"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
