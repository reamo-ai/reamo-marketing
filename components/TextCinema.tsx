import ScrollReveal from '@/components/ScrollReveal';

export default function TextCinema() {
  return (
    <ScrollReveal variant="reveal-up" className="relative z-[2] bg-black px-page py-40 text-center max-md:py-20">
      <h2 className="section-headline mx-auto max-w-[960px] text-white">
        The admin is already done
        <br />
        <em className="font-extralight not-italic text-white/25">before you hang up.</em>
      </h2>
    </ScrollReveal>
  );
}
