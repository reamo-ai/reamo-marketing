import Image from 'next/image';

const integrations = [
  { src: '/images/integrations/follow-up-boss.png', alt: 'Follow Up Boss' },
  { src: '/images/integrations/lofty.png', alt: 'Lofty' },
  { src: '/images/integrations/dotloop.png', alt: 'dotloop' },
  { src: '/images/integrations/google.png', alt: 'Google' },
  { src: '/images/integrations/microsoft.png', alt: 'Microsoft' },
  { src: '/images/integrations/claude.png', alt: 'Claude' },
] as const;

export default function IntegrationsContent() {
  return (
    <ul
      className="mx-auto grid w-max max-w-full grid-cols-6 items-center gap-x-1.5 sm:gap-x-2.5 md:gap-x-3"
      aria-label="Integration partners"
    >
      {integrations.map((logo) => (
        <li
          key={logo.alt}
          className={`flex w-[clamp(71px,13.65vw,139px)] items-center justify-center${logo.alt === 'Google' ? ' translate-y-[3px]' : ''}`}
        >
          <div className="relative h-[50.4px] w-full sm:h-[58.8px] md:h-[67.2px]">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 768px) 16vw, 200px"
              className="object-contain object-center"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
