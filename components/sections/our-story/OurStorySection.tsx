import OurStoryWaves from "./OurStoryWaves";
import VideoCard from "./VideoCard";

export default function OurStorySection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-soft)] pb-20">
      {/* waves behind */}
      <div className="pointer-events-none absolute inset-0">
        <OurStoryWaves />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-20 md:pt-24">
        <h1 className="font-display text-center text-[40px] font-semibold leading-[1.08] text-[var(--purple)] md:text-[56px]">
          Our Story
        </h1>

        <div className="mt-12 flex justify-center">
          <VideoCard
            title="Our Story"
            // ✅ put your youtube link or mp4 link here
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />
        </div>
      </div>
    </section>
  );
}
