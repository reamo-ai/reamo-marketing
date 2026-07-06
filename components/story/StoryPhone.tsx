import { type ReactNode } from 'react';

export default function StoryPhone({ children }: { children: ReactNode }) {
  return (
    <div className="story-phone">
      <div className="story-notch" />
      <div className="absolute inset-0 flex flex-col justify-center px-3.5 pb-3.5 pt-9 opacity-100">
        {children}
      </div>
    </div>
  );
}
