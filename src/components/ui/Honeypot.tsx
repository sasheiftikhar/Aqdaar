/**
 * A decoy form field, hidden from people and irresistible to bots.
 *
 * The server drops any submission where this arrives non-empty (see the contact
 * route's HONEYPOT_FIELD). Both contact forms render it so they're covered by
 * the same trap.
 *
 * It's positioned off-screen rather than `display:none`, because some bots skip
 * fields they can tell are hidden — but taken out of the tab order and hidden
 * from assistive tech, so a real user never lands on it. `autoComplete="off"`
 * stops a browser helpfully filling it and flagging a genuine person as a bot.
 */
export default function Honeypot({ name = "website" }: { name?: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
      }}
    >
      <label>
        Leave this field empty
        <input
          type="text"
          name={name}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  );
}
