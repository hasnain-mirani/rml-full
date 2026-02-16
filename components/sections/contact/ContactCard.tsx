"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { UnderlineInput } from "@/components/ui/underline-input";
import { UnderlineTextarea } from "@/components/ui/underline-textarea";

export default function ContactCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      await addDoc(collection(db, "contactMessages"), {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim(),
        read: false,
        createdAt: serverTimestamp(),
      });

      setStatus("sent");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-5xl rounded-[26px] bg-[var(--purple)] px-6 py-10 md:px-12 md:py-14">
      <div className="grid gap-10 md:grid-cols-[1fr_420px] md:gap-12">
        {/* Left */}
        <div className="text-white">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Ready to Start Your <br /> Project?
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
            Let&apos;s make your vision a reality. Contact us today and
            let&apos;s discuss how we can help you innovate and grow.
          </p>

          <div className="mt-10">
            <p className="text-sm font-semibold">Contact Info</p>

            <div className="mt-4 space-y-3 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  &#9993;
                </span>
                <span>admin@revelationml.com</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  &#128222;
                </span>
                <span>+447341224475</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  &#128205;
                </span>
                <span>Manchester, United Kingdom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form card */}
        <div className="rounded-[18px] bg-[#F4EDFF] px-6 py-7 shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:px-7">
          <div>
            <h3 className="text-lg font-semibold text-[#2B1B3F]">
              Become a Partner
            </h3>
            <p className="mt-1 text-sm text-[#7A6A91]">
              Break the ice! Let us help you out
            </p>
          </div>

          {status === "sent" ? (
            <div className="mt-8 flex flex-col items-center py-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100">
                <svg
                  className="h-7 w-7 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-[#2B1B3F]">
                Message Sent!
              </h4>
              <p className="mt-1 text-sm text-[#7A6A91]">
                We&apos;ll get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-[#6F2AA7] underline underline-offset-2 hover:text-[#5a1f8a]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <UnderlineInput
                label="What's your name?*"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <UnderlineInput
                label="What's your phone number?*"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                helper="Please enter a valid phone number."
              />

              <UnderlineInput
                label="Whats your email?"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <UnderlineTextarea
                label="Describe your interest"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {status === "error" && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 h-11 w-full rounded-full bg-[#1A1A1A] text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Submit"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
