"use client";

interface ToggleProps {
  checked: boolean;
  /** Omitted for always-on, disabled switches (e.g. strictly-necessary). */
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** Accessible label describing what the switch controls. */
  label: string;
  id?: string;
}

// Accessible on/off switch styled with the Reamo theme tokens. Rendered as a
// <button role="switch"> so it's keyboard-operable (Space/Enter) and reachable
// in tab order.
export default function Toggle({ checked, onChange, disabled, label, id }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
        checked ? "border-accent bg-accent" : "border-border bg-input"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-[18px] w-[18px] transform rounded-full bg-primary shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}
