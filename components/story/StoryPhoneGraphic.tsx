import Image from 'next/image';

const DEFAULT_USER_MESSAGE = "What's the status on J.B. Fletch?";
const DEFAULT_REAMO_MESSAGE =
  "J.B. is active and moving. She's under contract on 412 Birchwood Lane — Dotloop loop is created. I updated her status in Follow Up Boss and noted that she had her baby. You've got a call with her lender tomorrow at 2pm to confirm the inspection timeline. Inspection is currently scheduled for Thursday morning.";

const BUBBLE_CLASS =
  'rounded-xl px-3 py-2 font-sans text-[14px] leading-snug';

export type StoryPhoneMessage = {
  role: 'user' | 'reamo';
  text: string;
};

type StoryPhoneGraphicProps = {
  messages?: StoryPhoneMessage[];
  userMessage?: string;
  reamoMessage?: string;
};

export default function StoryPhoneGraphic({
  messages,
  userMessage = DEFAULT_USER_MESSAGE,
  reamoMessage = DEFAULT_REAMO_MESSAGE,
}: StoryPhoneGraphicProps) {
  const thread: StoryPhoneMessage[] =
    messages ??
    [
      { role: 'user', text: userMessage },
      { role: 'reamo', text: reamoMessage },
    ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px] max-md:max-w-[400px]">
      <div className="absolute top-[10%] left-1/2 w-[81%] -translate-x-1/2">
        <div className="relative aspect-[388.8/777.6] w-full overflow-hidden">
        <Image
          src="/images/story/iphone-frame-animation.png"
          alt=""
          aria-hidden
          fill
          className="pointer-events-none z-10 scale-[1.6] object-contain"
          sizes="(max-width: 768px) 324px, 388px"
        />
        <div className="absolute left-1/2 top-[5.4%] z-30 flex -translate-x-1/2 flex-col items-center max-md:top-[6.25%]">
          <div className="flex aspect-square w-[10.2%] min-w-[40px] items-center justify-center rounded-full bg-gradient-to-br from-white via-[#e5e5ea] to-[#aeaeb2]">
            <span className="font-sans text-[clamp(14px,4.7vw,22.68px)] font-semibold leading-none text-[#48484a]">R</span>
          </div>
          <p className="mt-2 font-sans text-[clamp(11px,2.8vw,13.5px)] font-medium leading-tight text-white">Reamo</p>
        </div>
        <div className="relative z-30 h-full">
          <div className="absolute inset-x-0 bottom-0 top-[18%] flex flex-col justify-start gap-2 overflow-hidden px-[7.5%]">
            {thread.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`${BUBBLE_CLASS} max-w-[78%] lg:max-w-[92%] whitespace-pre-line text-white ${
                  message.role === 'user'
                    ? `${index === 0 ? 'my-3 ' : ''}self-end bg-[#007AFF]`
                    : 'self-start bg-[#2c2c2e]'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
