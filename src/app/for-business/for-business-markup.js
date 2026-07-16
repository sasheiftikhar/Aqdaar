
// --- inline SVG icon strings (purple stroke to match the brand) ---
const ic = (path) =>
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b08af0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const chatIcon = ic('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>');
const broadcastIcon = ic('<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>');
const eyeOffIcon = ic('<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>');
const inboxIcon = ic('<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>');
const usersIcon = ic('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>');
const sparkleIcon = ic('<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>');
const waIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#34c77b"><path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2zm5.5 14.13c-.23.65-1.34 1.24-1.85 1.28-.5.05-.96.24-3.23-.67-2.72-1.08-4.45-3.86-4.58-4.04-.13-.18-1.1-1.47-1.1-2.8 0-1.33.7-1.98.94-2.25a1 1 0 0 1 .72-.34c.18 0 .36 0 .52.01.17.01.4-.06.62.48.23.55.78 1.9.85 2.04.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.27-.12.53.16.27.7 1.15 1.5 1.86 1.04.92 1.9 1.2 2.17 1.34.27.13.43.11.58-.07.16-.18.67-.78.85-1.05.18-.27.36-.22.6-.13.25.09 1.58.74 1.85.88.27.13.45.2.52.31.07.11.07.65-.16 1.3z"/></svg>';
const bagIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#95BF47" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';

// --- markup helpers ---
const sectionLink = (label, href = "/contact") => `
  <a href="${href}" class="footer-link" style="display: inline-flex; align-items: center; gap: 7px; margin-top: 22px; padding: 11px 18px; border-radius: 10px; border: 1px solid rgba(180,120,255,.2); background: rgba(255,255,255,.03); font-size: 13.5px; font-weight: 600; color: #e7dcf5; text-decoration: none;">${label} <span style="font-size: 15px;">&#8594;</span></a>`;

const problemCard = (icon, title, desc) => `
  <div data-vcard="" style="padding: 26px; border-radius: 18px; background: rgba(255,255,255,.025); border: 1px solid rgba(180,120,255,.1);">
    <div class="vcard-icon" style="width: 44px; height: 44px; border-radius: 12px; background: rgba(123,47,190,.18); border: 1px solid rgba(123,47,190,.3); display: flex; align-items: center; justify-content: center; margin-bottom: 18px;">${icon}</div>
    <h3 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px;">${title}</h3>
    <p style="font-size: 13.5px; line-height: 1.6; color: rgba(220,205,238,.5);">${desc}</p>
  </div>`;

const inboxRow = (initials, name, msg, tag, tagColor, avatarBg) => `
  <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 13px; border-radius: 12px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02); margin-bottom: 10px;">
    <div style="display: flex; align-items: center; gap: 11px; min-width: 0;">
      <span style="width: 34px; height: 34px; flex-shrink: 0; border-radius: 50%; background: ${avatarBg}; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">${initials}</span>
      <div style="min-width: 0;"><div style="font-size: 13px; font-weight: 600; color: #fff;">${name}</div><div style="font-size: 11.5px; color: rgba(200,200,215,.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${msg}</div></div>
    </div>
    <span style="flex-shrink: 0; font-size: 10.5px; font-weight: 700; color: ${tagColor}; background: rgba(255,255,255,.05); padding: 5px 9px; border-radius: 999px;">${tag}</span>
  </div>`;

const rfmRow = (name, desc, count, color) => `
  <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02); margin-bottom: 10px;">
    <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
      <span style="width: 9px; height: 9px; flex-shrink: 0; border-radius: 50%; background: ${color}; box-shadow: 0 0 10px ${color};"></span>
      <div style="min-width: 0;"><div style="font-size: 13.5px; font-weight: 600; color: #fff;">${name}</div><div style="font-size: 11.5px; color: rgba(200,200,215,.5);">${desc}</div></div>
    </div>
    <span style="flex-shrink: 0; font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; font-weight: 700; color: #fff;">${count}</span>
  </div>`;

const flowNode = (title, sub, color, isStart) => `
  <div style="width: 250px; max-width: 100%; box-sizing: border-box; background: ${isStart ? "linear-gradient(160deg, rgba(123,47,190,.28), rgba(40,18,70,.5))" : "#131119"}; border: 1px solid ${isStart ? "rgba(180,120,255,.3)" : "rgba(255,255,255,.08)"}; border-radius: 12px; padding: 14px 16px;">
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px; background: rgba(140,82,255,.16); display: inline-flex; align-items: center; justify-content: center; color: ${color}; font-size: 13px;">&#9679;</span>
      <div><div style="font-size: 13.5px; font-weight: 600; color: #fff;">${title}</div><div style="font-size: 11.5px; color: rgba(200,200,215,.45);">${sub}</div></div>
    </div>
  </div>`;

const flowConnector = () => `
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="width: 1px; height: 18px; background: rgba(150,100,250,.4);"></div>
    <span style="width: 22px; height: 22px; border-radius: 50%; border: 1px solid rgba(150,100,250,.3); background: #0a0810; display: inline-flex; align-items: center; justify-content: center; color: #8c52ff; font-size: 13px; line-height: 1;">+</span>
    <div style="width: 1px; height: 18px; background: rgba(150,100,250,.4);"></div>
  </div>`;

const syncRow = (label, value, icon) => `
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 13px; border-radius: 12px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02); margin-bottom: 10px;">
    <div style="display: flex; align-items: center; gap: 11px;">
      <span style="width: 32px; height: 32px; border-radius: 9px; background: rgba(255,255,255,.05); display: inline-flex; align-items: center; justify-content: center;">${icon}</span>
      <div><div style="font-size: 13px; font-weight: 600; color: #fff;">${label}</div><div style="font-size: 11.5px; color: rgba(200,200,215,.45);">${value}</div></div>
    </div>
    <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 600; color: #34c77b;"><span style="width: 7px; height: 7px; border-radius: 50%; background: #34c77b;"></span>Synced</span>
  </div>`;

const bigStat = (value, label, color) => `
  <div style="padding: 28px 24px; border-radius: 18px; border: 1px solid rgba(180,120,255,.14); background: linear-gradient(160deg, #131119, #0b0a0e); box-shadow: 0 24px 60px rgba(0,0,0,.4);">
    <div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 46px; font-weight: 700; letter-spacing: -1.5px; line-height: 1; color: ${color};">${value}</div>
    <p style="margin-top: 12px; font-size: 13.5px; line-height: 1.5; color: rgba(220,205,238,.55);">${label}</p>
  </div>`;

// incoming / outgoing WhatsApp chat bubble
const bubble = (text, who) => {
  const out = who === "out";
  return `<div style="display: flex; ${out ? "justify-content: flex-end;" : ""} margin-bottom: 10px;">
    <div style="max-width: 80%; padding: 10px 13px; border-radius: 14px; ${out ? "border-bottom-right-radius: 4px; background: linear-gradient(160deg,#7B2FBE,#5B2A8C); color: #fff;" : "border-bottom-left-radius: 4px; background: rgba(255,255,255,.06); color: rgba(231,220,245,.85);"} font-size: 12.5px; line-height: 1.55;">${text}</div>
  </div>`;
};

const sectionEyebrow = "font-size: 11.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(155,89,182,.85); display: block; margin-bottom: 16px;";
const sectionH = "font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(26px, 3vw, 42px); font-weight: 700; letter-spacing: -1.1px; line-height: 1.1; color: #ffffff; margin-bottom: 18px;";
const sectionP = "font-size: 15px; line-height: 1.8; color: rgba(220,205,238,.55);";
const cardShell = "border-radius: 20px; border: 1px solid rgba(180,120,255,.14); background: #0c0b10; padding: 18px; box-shadow: 0 30px 80px rgba(0,0,0,.5);";

export const FORBUSINESS_MARKUP = `<div data-page="business" style="font-family: 'Inter', sans-serif; background: #000000; color: #f7f4fb; position: relative;">

  <!-- 1 · HERO -->
  <section style="position: relative; padding: 150px 48px 70px; text-align: center; background: linear-gradient(180deg, #100a18 0%, #0d0714 30%, #060409 58%, #000000 100%); overflow: hidden;">
    <!-- beam + god-rays background -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; pointer-events: none; z-index: 0; transform: scaleX(1.4); transform-origin: 50% 0;">
      <div style="position: absolute; top: -8%; left: 50%; width: 68%; height: 44%; transform: translateX(-50%); animation: beamWave 9s ease-in-out infinite; background: radial-gradient(50% 100% at 50% 0%, rgba(140,82,255,.45) 0%, rgba(108,92,231,.2) 32%, transparent 70%); filter: blur(44px);"></div>
      <div style="position: absolute; top: -26px; left: 50%; width: 0; height: 0; z-index: 2; animation: rayFan 8s ease-in-out infinite; transform-origin: top center;">
        <div style="position: absolute; top: 0; left: -40.0px; width: 80px; height: 528px; transform-origin: top center; transform: rotate(-71deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.5) 7%, rgba(150,100,250,0.21) 42%, rgba(123,47,190,0) 80%); filter: blur(18px); animation: twinkle 6.5s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -52.0px; width: 104px; height: 541px; transform-origin: top center; transform: rotate(-52deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.56) 7%, rgba(150,100,250,0.235) 42%, rgba(123,47,190,0) 80%); filter: blur(23px); animation: twinkle 6.0s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -45.0px; width: 90px; height: 554px; transform-origin: top center; transform: rotate(-24deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.6) 7%, rgba(150,100,250,0.252) 42%, rgba(123,47,190,0) 80%); filter: blur(20px); animation: twinkle 5.0s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -56.0px; width: 112px; height: 554px; transform-origin: top center; transform: rotate(6deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.58) 7%, rgba(150,100,250,0.244) 42%, rgba(123,47,190,0) 80%); filter: blur(24px); animation: twinkle 6.1s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -36.0px; width: 72px; height: 548px; transform-origin: top center; transform: rotate(27deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.52) 7%, rgba(150,100,250,0.218) 42%, rgba(123,47,190,0) 80%); filter: blur(17px); animation: twinkle 6.7s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -30.0px; width: 60px; height: 515px; transform-origin: top center; transform: rotate(76deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.44) 7%, rgba(150,100,250,0.185) 42%, rgba(123,47,190,0) 80%); filter: blur(15px); animation: twinkle 5.6s ease-in-out infinite;"></div>
      </div>
      <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 0%, transparent 45%, rgba(0,0,0,.5) 72%, #000000 100%);"></div>
    </div>

    <div style="position: relative; z-index: 1;">
      <span style="display: inline-flex; align-items: center; gap: 9px; margin-bottom: 22px;">
        <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(195,180,215,.6);">Quinn &middot; WhatsApp commerce</span>
      </span>
      <h1 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(40px, 5.2vw, 74px); font-weight: 700; letter-spacing: -2.4px; line-height: 1.03; color: #ffffff; max-width: 880px; margin: 0 auto 22px;">Cash, chat, commerce &mdash;<br>one platform.</h1>
      <p style="font-size: 17px; line-height: 1.7; color: rgba(223,210,238,.6); max-width: 660px; margin: 0 auto 34px;">Quinn connects your Shopify store to WhatsApp, segments your customers automatically, and lets your AI handle support &mdash; so you retain more, message smarter, and scale without adding headcount.</p>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="/contact" style="text-decoration: none; padding: 15px 26px; border-radius: 12px; background: linear-gradient(160deg,#06151e,#7B2FBE 70%,#9B59B6); font-size: 15px; font-weight: 600; color: #fff; letter-spacing: .3px; box-shadow: 0 12px 34px rgba(123,47,190,.3);">Book a demo</a>
        <a href="https://quinn-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" class="footer-link" style="text-decoration: none; padding: 15px 26px; border-radius: 12px; border: 1px solid rgba(180,120,255,.2); background: rgba(255,255,255,.03); font-size: 15px; font-weight: 600; color: #e7dcf5;">See how it works &#8594;</a>
      </div>
    </div>

    <!-- PRODUCT MOCKUP: unified WhatsApp inbox + Shopify order context -->
    <div data-reveal-up style="position: relative; z-index: 1; max-width: 1080px; margin: 60px auto 0; border-radius: 18px; border: 1px solid rgba(180,120,255,.16); background: #0b0a0e; overflow: hidden; box-shadow: 0 50px 130px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.04); opacity: 0; transform: translateY(30px);">
      <!-- app topbar -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02);">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="width: 24px; height: 24px; border-radius: 7px; background: linear-gradient(160deg,#7B2FBE,#5B2A8C); display: inline-flex; align-items: center; justify-content: center; color: #fff; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 13px;">Q</span>
          <span style="font-size: 13px; color: rgba(225,225,240,.55);">Quinn &middot; Inbox</span>
        </div>
        <div style="display: flex; align-items: center; gap: 18px; font-size: 12.5px; color: rgba(200,200,215,.45);">
          <span style="color: #fff; border-bottom: 2px solid #8c52ff; padding-bottom: 13px; margin-bottom: -13px;">Inbox</span>
          <span>Segments</span>
          <span>Campaigns</span>
          <span>Analytics</span>
        </div>
      </div>
      <div data-fb-heromock style="display: grid; grid-template-columns: 1fr 360px; min-height: 430px; text-align: left;">
        <!-- inbox list -->
        <div style="padding: 18px 20px; background: #08070b;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <span style="font-size: 13px; font-weight: 600; color: #fff;">Open conversations</span>
            <span style="font-size: 11px; font-weight: 700; color: #34c77b; background: rgba(52,199,123,.12); padding: 4px 9px; border-radius: 999px;">3 open</span>
          </div>
          ${inboxRow("SA", "Sara Ahmed", "Where's my order #4821?", "Order ready", "#34c77b", "linear-gradient(160deg,#7B2FBE,#5B2A8C)")}
          ${inboxRow("MK", "Moiz Khan", "I want to return the jacket", "Return", "#ffb347", "linear-gradient(160deg,#2563eb,#1a1a2e)")}
          ${inboxRow("FF", "Fatima F.", "Do you have size M in stock?", "AI replied", "#c39bd3", "linear-gradient(160deg,#9B59B6,#c084fc)")}
        </div>
        <!-- conversation + order context -->
        <div style="border-left: 1px solid rgba(255,255,255,.06); background: #0d0c11; padding: 18px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; gap: 9px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.06); margin-bottom: 14px;">
            <span style="width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(160deg,#7B2FBE,#5B2A8C); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">SA</span>
            <div><div style="font-size: 13px; font-weight: 600; color: #fff;">Sara Ahmed</div><div style="font-size: 11px; color: #34c77b; display: flex; align-items: center; gap: 5px;">${waIcon} WhatsApp</div></div>
          </div>
          ${bubble("Where's my order #4821?", "in")}
          <!-- shopify order context card -->
          <div style="margin: 4px 0 12px; padding: 12px; border-radius: 12px; border: 1px solid rgba(149,191,71,.25); background: rgba(149,191,71,.06);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="display: inline-flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 700; color: #b9d97a;">${bagIcon} Shopify &middot; Order #4821</span>
              <span style="font-size: 10.5px; font-weight: 700; color: #34c77b;">Ready to ship</span>
            </div>
            <div style="font-size: 11.5px; color: rgba(223,210,238,.6); line-height: 1.5;">2 items &middot; Black hoodie, Cap &middot; $84.00</div>
          </div>
          ${bubble("Hi Sara! Your order shipped today &mdash; expected by Thursday. Track it here: [link] &#127881;", "out")}
          <div style="margin-top: auto; padding-top: 12px; font-size: 11px; color: rgba(195,155,211,.7); display: flex; align-items: center; gap: 6px;">${sparkleIcon} Drafted by Ayesha &middot; AI</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2 · THE PROBLEM -->
  <section style="background: #000000; padding: 40px 48px 90px;">
    <div style="max-width: 1080px; margin: 0 auto;">
      <div style="text-align: center; max-width: 660px; margin: 0 auto 48px;">
        <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(195,180,215,.5); display: block; margin-bottom: 14px;">The problem</span>
        <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(26px, 3.2vw, 44px); font-weight: 700; letter-spacing: -1.2px; line-height: 1.1; color: #ffffff; margin-bottom: 16px;">You're leaving retention money on the table.</h2>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(220,205,238,.55);">Most e-commerce brands message everyone the same way, miss lapsed buyers, and let support chats sit unanswered. Quinn fixes all three &mdash; from one inbox.</p>
      </div>
      <div data-fb-problem style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;">
        ${problemCard(chatIcon, "Unanswered chats", "Customers ask, no one replies. Sales slip through.")}
        ${problemCard(broadcastIcon, "Blind broadcasts", "Same message to everyone. High spam, low conversion.")}
        ${problemCard(eyeOffIcon, "No visibility", "You don't know which messages drive orders.")}
      </div>
    </div>
  </section>

  <!-- 3 · UNIFIED INBOX -->
  <section id="how-it-works" style="background: #000000; padding: 30px 48px 100px;">
    <div data-fb-row style="max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
      <div data-fb-copy>
        <span style="${sectionEyebrow}">Unified inbox</span>
        <h2 style="${sectionH}">Every customer conversation, one place.</h2>
        <p style="${sectionP}">Quinn brings all your WhatsApp chats into a shared inbox &mdash; with full Shopify order context beside every message. No tab-switching. No blind replies.</p>
      </div>
      <div data-reveal-up style="${cardShell} opacity: 0; transform: translateY(30px);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <span style="font-size: 14px; font-weight: 600; color: #fff;">Shared inbox</span>
          <span style="font-size: 11px; font-weight: 700; color: #34c77b; background: rgba(52,199,123,.12); padding: 4px 9px; border-radius: 999px;">3 open</span>
        </div>
        ${inboxRow("SA", "Sara Ahmed", "Where's my order #4821?", "Order ready", "#34c77b", "linear-gradient(160deg,#7B2FBE,#5B2A8C)")}
        ${inboxRow("MK", "Moiz Khan", "I want to return the jacket", "Return", "#ffb347", "linear-gradient(160deg,#2563eb,#1a1a2e)")}
        ${inboxRow("FF", "Fatima F.", "Do you have size M in stock?", "AI replied", "#c39bd3", "linear-gradient(160deg,#9B59B6,#c084fc)")}
      </div>
    </div>
  </section>

  <!-- 4 · SMART SEGMENTATION (reversed) -->
  <section style="background: #000000; padding: 30px 48px 100px;">
    <div data-fb-row style="max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
      <div data-reveal-up style="${cardShell} opacity: 0; transform: translateY(30px);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <span style="font-size: 14px; font-weight: 600; color: #fff;">RFM segments</span>
          <span style="font-size: 11px; color: rgba(200,200,215,.45);">updated 2h ago</span>
        </div>
        ${rfmRow("Champions", "Bought recently, buy often, high spend", "482", "#34c77b")}
        ${rfmRow("At risk", "Used to buy, haven't in 45+ days", "139", "#ffb347")}
        ${rfmRow("Lost", "No activity in 90+ days", "67", "#ff6b6b")}
      </div>
      <div data-fb-copy>
        <span style="${sectionEyebrow}">Smart segmentation &middot; RFM engine</span>
        <h2 style="${sectionH}">Message customers who are actually ready to buy.</h2>
        <p style="${sectionP}">Quinn runs nightly RFM scoring on your Shopify store &mdash; recency, frequency, spend. Every campaign reaches the right segment automatically. No more blasting your whole list.</p>
      </div>
    </div>
  </section>

  <!-- 5 · CAMPAIGNS IN FLOW -->
  <section style="background: #000000; padding: 30px 48px 100px;">
    <div data-fb-row style="max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
      <div data-fb-copy>
        <span style="${sectionEyebrow}">Campaigns in flow</span>
        <h2 style="${sectionH}">Trigger campaigns from signals, not schedules.</h2>
        <p style="${sectionP}">Set up WhatsApp sequences that fire when a customer hits a segment &mdash; lapsed buyers, high spenders, first-timers. Quinn handles timing and delivery. You set the strategy once.</p>
      </div>
      <div data-reveal-up style="display: flex; flex-direction: column; align-items: center; gap: 0; padding: 30px; border-radius: 20px; border: 1px solid rgba(180,120,255,.12); background: radial-gradient(circle at 1px 1px, rgba(180,140,255,.08) 1px, transparent 0) 0 0 / 22px 22px, #08070b; opacity: 0; transform: translateY(30px);">
        ${flowNode("Enters \"At risk\" segment", "Triggered by RFM engine", "#b08af0", true)}
        ${flowConnector()}
        ${flowNode("Send WhatsApp message", "\"We miss you &mdash; here's 10% off\"", "#8b8bff", false)}
        ${flowConnector()}
        ${flowNode("Wait 3 days &middot; check opened", "Replied &#8594; agent. No reply &#8594; follow-up.", "#cbb6e8", false)}
      </div>
    </div>
  </section>

  <!-- 6 · AI IN FLOW (reversed) -->
  <section style="background: #000000; padding: 30px 48px 100px;">
    <div data-fb-row style="max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
      <div data-reveal-up style="${cardShell} opacity: 0; transform: translateY(30px);">
        <div style="display: flex; align-items: center; gap: 9px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.06); margin-bottom: 16px;">
          <span style="width: 30px; height: 30px; border-radius: 9px; background: rgba(123,47,190,.18); display: inline-flex; align-items: center; justify-content: center;">${sparkleIcon}</span>
          <div><div style="font-size: 13px; font-weight: 600; color: #fff;">Ayesha &middot; AI assistant</div><div style="font-size: 11px; color: #34c77b; display: flex; align-items: center; gap: 5px;"><span style="width: 6px; height: 6px; border-radius: 50%; background: #34c77b;"></span>live</div></div>
        </div>
        ${bubble("Where is my order? I ordered 3 days ago.", "in")}
        ${bubble("Hi Sara! Your order #4821 shipped today and is expected by Thursday. Track it here: [link] &#127881;", "out")}
      </div>
      <div data-fb-copy>
        <span style="${sectionEyebrow}">AI in flow</span>
        <h2 style="${sectionH}">Two AIs. One for customers. One for your team.</h2>
        <p style="${sectionP}">Ayesha handles WhatsApp support 24/7 &mdash; order status, returns, FAQs &mdash; in your brand voice, pulling from your Knowledge Base. Abdullah supports your ops team internally with context when it's needed.</p>
      </div>
    </div>
  </section>

  <!-- 7 · ACTIONABLE ANALYTICS -->
  <section style="background: #000000; padding: 30px 48px 100px;">
    <div data-fb-row style="max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
      <div data-fb-copy>
        <span style="${sectionEyebrow}">Actionable analytics</span>
        <h2 style="${sectionH}">See what drives orders. Not just opens.</h2>
        <p style="${sectionP}">Track performance per segment, per campaign step. Know which messages convert, which RFM groups are worth re-engaging, and where revenue is actually coming from.</p>
      </div>
      <div data-reveal-up data-fb-stats style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; opacity: 0; transform: translateY(30px);">
        ${bigStat("38%", "Win-back rate, lapsed segment", "#34c77b")}
        ${bigStat("4.2&times;", "Revenue per message vs. blast", "#9B59B6")}
        <div style="grid-column: 1 / -1;">${bigStat("91%", "Support queries resolved by AI", "#5b8bff")}</div>
      </div>
    </div>
  </section>

  <!-- 8 · POST-PURCHASE / WARRANTY (reversed) -->
  <section style="background: #000000; padding: 30px 48px 100px;">
    <div data-fb-row style="max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
      <div data-reveal-up style="${cardShell} opacity: 0; transform: translateY(30px);">
        <div style="display: flex; align-items: center; gap: 9px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.06); margin-bottom: 16px;">
          <span style="width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(160deg,#7B2FBE,#5B2A8C); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">MK</span>
          <div><div style="font-size: 13px; font-weight: 600; color: #fff;">Warranty claim</div><div style="font-size: 11px; color: #34c77b; display: flex; align-items: center; gap: 5px;">${waIcon} WhatsApp</div></div>
        </div>
        ${bubble("My headphones stopped charging.", "in")}
        ${bubble("Sorry to hear that! Tap below to start a warranty claim &mdash; no forms needed.", "out")}
        <div style="display: flex; gap: 8px; margin: 4px 0 8px;">
          <span style="font-size: 11.5px; font-weight: 600; color: #fff; background: rgba(123,47,190,.25); border: 1px solid rgba(180,120,255,.3); padding: 8px 13px; border-radius: 999px;">Start claim</span>
          <span style="font-size: 11.5px; font-weight: 600; color: rgba(231,220,245,.7); background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); padding: 8px 13px; border-radius: 999px;">Talk to a human</span>
        </div>
      </div>
      <div data-fb-copy>
        <span style="${sectionEyebrow}">Post-purchase &middot; Warranty claims</span>
        <h2 style="${sectionH}">Turn warranty claims into retention moments.</h2>
        <p style="${sectionP}">Quinn gives customers a WhatsApp-native flow to submit warranty claims &mdash; no forms, no email threads. Your team gets structured data. Customers get fast resolution and a reason to come back.</p>
      </div>
    </div>
  </section>

  <!-- 9 · SHOPIFY INTEGRATION -->
  <section style="background: #000000; padding: 30px 48px 110px;">
    <div data-fb-row style="max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
      <div data-fb-copy>
        <span style="${sectionEyebrow}">Shopify integration</span>
        <h2 style="${sectionH}">Your store data, live inside every conversation.</h2>
        <p style="${sectionP}">Connect Shopify and Quinn syncs orders, products, and customers. Agents see full history without leaving the inbox. Ayesha answers "where's my order?" before your team even sees it.</p>
      </div>
      <div data-reveal-up style="${cardShell} opacity: 0; transform: translateY(30px);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <span style="display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #fff;">${bagIcon} Shopify &middot; connected</span>
          <span style="font-size: 11px; font-weight: 700; color: #34c77b; background: rgba(52,199,123,.12); padding: 4px 9px; border-radius: 999px;">Live</span>
        </div>
        ${syncRow("Orders", "2,418 synced", bagIcon)}
        ${syncRow("Products", "326 synced", inboxIcon)}
        ${syncRow("Customers", "8,902 synced", usersIcon)}
      </div>
    </div>
  </section>

  <!-- 11 · CLOSING CTA -->
  <section style="background: #000000; padding: 0 48px 120px;">
    <div style="max-width: 1080px; margin: 0 auto; position: relative; border-radius: 28px; overflow: hidden; padding: 70px 40px; text-align: center; background: linear-gradient(180deg, #140d20 0%, #0c0715 45%, #000000 100%); border: 1px solid rgba(180,120,255,.14);">
      <div style="position: absolute; top: -40%; left: 50%; width: 60%; height: 80%; transform: translateX(-50%); pointer-events: none; background: radial-gradient(50% 50% at 50% 50%, rgba(140,82,255,.3), transparent 70%); filter: blur(50px);"></div>
      <div style="position: relative; z-index: 1;">
        <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(28px, 3.6vw, 50px); font-weight: 700; letter-spacing: -1.4px; line-height: 1.1; color: #ffffff; max-width: 700px; margin: 0 auto 16px;">Ready to turn WhatsApp into your retention engine?</h2>
        <p style="font-size: 16px; line-height: 1.6; color: rgba(223,210,238,.6); max-width: 520px; margin: 0 auto 30px;">See Quinn on your own store &mdash; takes 15 minutes to connect Shopify and go live.</p>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="/contact" style="text-decoration: none; padding: 15px 28px; border-radius: 12px; background: linear-gradient(160deg,#06151e,#7B2FBE 70%,#9B59B6); font-size: 15px; font-weight: 600; color: #fff; box-shadow: 0 12px 34px rgba(123,47,190,.3);">Book a demo</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 12 · CONTACT / HELP -->
  <section style="position: relative; background: #000000; padding: 30px 48px 120px; overflow: hidden;">
    <!-- purple glow rising from the bottom (matches the reference) -->
    <div style="position: absolute; left: 50%; bottom: -34%; width: 92%; height: 72%; transform: translateX(-50%); pointer-events: none; z-index: 0; background: radial-gradient(50% 50% at 50% 50%, rgba(123,47,190,.55), rgba(108,92,231,.2) 44%, transparent 72%); filter: blur(60px);"></div>

    <div style="position: relative; z-index: 1; max-width: 1080px; margin: 0 auto;">
      <div style="text-align: center; max-width: 620px; margin: 0 auto 50px;">
        <span style="display: inline-block; padding: 7px 16px; border-radius: 999px; border: 1px solid rgba(180,120,255,.22); background: rgba(255,255,255,.04); font-size: 12.5px; font-weight: 600; color: #e7dcf5; margin-bottom: 20px;">Contact Us</span>
        <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(34px, 4.4vw, 58px); font-weight: 700; letter-spacing: -1.6px; line-height: 1.05; color: #ffffff; margin-bottom: 18px;">We're here to <span style="color: rgba(200,185,225,.55);">help</span></h2>
        <p style="font-size: 16px; line-height: 1.7; color: rgba(223,210,238,.6);">Get in touch with our sales and support teams for product questions, live architecture sessions, demos and more.</p>
      </div>

      <div data-fb-contact style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <!-- Card 1 — Schedule a Demo -->
        <div style="border-radius: 24px; border: 1px solid rgba(180,120,255,.16); background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(123,47,190,.06)); padding: 30px; box-shadow: 0 30px 80px rgba(0,0,0,.4);">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); display: flex; align-items: center; justify-content: center; margin-bottom: 22px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <h3 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 22px; font-weight: 600; letter-spacing: -0.4px; color: #fff; margin-bottom: 10px;">Schedule a Demo</h3>
          <p style="font-size: 14px; line-height: 1.6; color: rgba(220,205,238,.55); margin-bottom: 24px;">Talk to an expert about your data security needs. Discuss your requirements, learn about custom pricing, or request a product demo.</p>
          <div data-demo-row style="display: flex; align-items: center; gap: 8px; padding: 6px 6px 6px 14px; border: 1px solid rgba(180,120,255,.18); border-radius: 12px; background: rgba(0,0,0,.28);">
            <input data-demo-email type="email" placeholder="support@extensorlabs.com" style="flex: 1; min-width: 0; background: transparent; border: none; outline: none; color: #f7f4fb; font-size: 14px; font-family: 'Inter', sans-serif;" />
            <a data-book-demo href="mailto:support@extensorlabs.com?subject=Demo%20request%20%E2%80%94%20Quinn" style="display: inline-flex; justify-content: center; align-items: center; gap: 7px; padding: 10px 16px; border-radius: 9px; background: linear-gradient(160deg,#7B2FBE,#9B59B6); color: #fff; font-size: 13.5px; font-weight: 600; text-decoration: none; white-space: nowrap;">Book demo <span style="font-size: 14px;">&#8250;</span></a>
          </div>
        </div>

        <!-- Card 2 — Send us a message -->
        <div style="border-radius: 24px; border: 1px solid rgba(180,120,255,.16); background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(123,47,190,.06)); padding: 30px; box-shadow: 0 30px 80px rgba(0,0,0,.4); display: flex; flex-direction: column;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); display: flex; align-items: center; justify-content: center; margin-bottom: 22px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>
          </div>
          <h3 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 22px; font-weight: 600; letter-spacing: -0.4px; color: #fff; margin-bottom: 10px;">Send us a message</h3>
          <p style="font-size: 14px; line-height: 1.6; color: rgba(220,205,238,.55); margin-bottom: 24px;">Have a question? Get hands on support directly from our engineers by sending us a message. We'll respond to you in &lt;12 hours.</p>
          <a href="/contact" style="display: inline-flex; align-self: flex-start; align-items: center; gap: 8px; margin-top: auto; padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(180,120,255,.25); background: rgba(255,255,255,.04); color: #e7dcf5; font-size: 14px; font-weight: 600; text-decoration: none;">Get in touch <span style="font-size: 14px;">&#8250;</span></a>
        </div>
      </div>
    </div>
  </section>

</div>`;
