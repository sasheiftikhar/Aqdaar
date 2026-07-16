
export const ABOUT_MARKUP = `<div data-page="" style="font-family: 'Inter', sans-serif; background: #000000; color: #f7f4fb; position: relative;">

  <!-- HERO -->
  <section style="position: relative; padding: 170px 48px 48px; text-align: center; background: linear-gradient(180deg, #100a18 0%, #0d0714 28%, #060409 54%, #000000 100%); overflow: hidden;">
    <!-- Purple ray fan -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; pointer-events: none; z-index: 0; transform: scaleX(1.4); transform-origin: 50% 0;">
      <div style="position: absolute; top: -8%; left: 50%; width: 68%; height: 44%; transform: translateX(-50%); animation: beamWave 9s ease-in-out infinite; background: radial-gradient(50% 100% at 50% 0%, rgba(140,82,255,.45) 0%, rgba(108,92,231,.2) 32%, transparent 70%); filter: blur(44px);"></div>
      <div style="position: absolute; top: -26px; left: 50%; width: 0; height: 0; z-index: 2; animation: rayFan 8s ease-in-out infinite; transform-origin: top center;">
        <div style="position: absolute; top: 0; left: -17.0px; width: 34px; height: 515px; transform-origin: top center; transform: rotate(-80deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.3) 8%, rgba(150,100,250,0.126) 42%, rgba(123,47,190,0) 80%); filter: blur(11px); animation: twinkle 5.5s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -40.0px; width: 80px; height: 528px; transform-origin: top center; transform: rotate(-71deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.5) 7%, rgba(150,100,250,0.21) 42%, rgba(123,47,190,0) 80%); filter: blur(18px); animation: twinkle 6.5s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -52.0px; width: 104px; height: 541px; transform-origin: top center; transform: rotate(-52deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.56) 7%, rgba(150,100,250,0.235) 42%, rgba(123,47,190,0) 80%); filter: blur(23px); animation: twinkle 6.0s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -45.0px; width: 90px; height: 554px; transform-origin: top center; transform: rotate(-24deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.6) 7%, rgba(150,100,250,0.252) 42%, rgba(123,47,190,0) 80%); filter: blur(20px); animation: twinkle 5.0s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -7.0px; width: 14px; height: 554px; transform-origin: top center; transform: rotate(-4deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.4) 9%, rgba(150,100,250,0.168) 42%, rgba(123,47,190,0) 80%); filter: blur(6px); animation: twinkle 4.6s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -56.0px; width: 112px; height: 554px; transform-origin: top center; transform: rotate(6deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.58) 7%, rgba(150,100,250,0.244) 42%, rgba(123,47,190,0) 80%); filter: blur(24px); animation: twinkle 6.1s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -36.0px; width: 72px; height: 548px; transform-origin: top center; transform: rotate(27deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.52) 7%, rgba(150,100,250,0.218) 42%, rgba(123,47,190,0) 80%); filter: blur(17px); animation: twinkle 6.7s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -47.0px; width: 94px; height: 535px; transform-origin: top center; transform: rotate(50deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.55) 7%, rgba(150,100,250,0.231) 42%, rgba(123,47,190,0) 80%); filter: blur(22px); animation: twinkle 5.3s ease-in-out infinite;"></div>
        <div style="position: absolute; top: 0; left: -30.0px; width: 60px; height: 515px; transform-origin: top center; transform: rotate(76deg); background: linear-gradient(to bottom, transparent 0%, rgba(176,138,240,0.44) 7%, rgba(150,100,250,0.185) 42%, rgba(123,47,190,0) 80%); filter: blur(15px); animation: twinkle 5.6s ease-in-out infinite;"></div>
      </div>
      <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 0%, transparent 45%, rgba(0,0,0,.5) 72%, #000000 100%);"></div>
    </div>

    <!-- Hero text -->
    <div style="position: relative; z-index: 1; margin-bottom: 52px;">
      <h1 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(40px, 5.2vw, 72px); font-weight: 700; letter-spacing: -2px; line-height: 1.07; color: #ffffff; max-width: 680px; margin: 0 auto 22px;">Built for how business<br>actually works here.</h1>
      <p style="font-size: 17px; line-height: 1.65; color: rgba(223,210,238,.58); max-width: 680px; margin: 0 auto;">AI-native operating software for emerging market commerce — built by the people the industry forgot to design for.</p>
    </div>

    <!-- Chatbot animation box -->
    <div class="spin-border" style="position: relative; z-index: 1; max-width: 640px; margin: 0 auto 22px; border-radius: 12px;">
      <div style="background: #18191a; border-radius: 12px; padding: 28px 26px; text-align: left; box-shadow: 0 24px 80px rgba(0,0,0,.55);">
        <p style="font-size: 15.5px; line-height: 1.6; color: rgba(220,205,238,.75); min-height: 54px; margin: 0;">
          <span data-typewriter style="color: rgba(220,205,238,.85);"></span><span data-cursor style="display: inline-block; width: 2px; height: 1em; background: #8c52ff; margin-left: 2px; vertical-align: text-bottom; animation: twinkle 0.8s ease-in-out infinite;"></span>
        </p>
      </div>
    </div>
    <p style="position: relative; z-index: 1; font-size: 13.5px; color: rgba(210,195,230,.38);">Talk to our team and <a href="/contact" style="color: rgba(140,82,255,.8); text-decoration: underline; text-underline-offset: 3px;">book a demo</a></p>
  </section>

  <!-- THE STORY: Mission & Values -->
  <section style="background: #000000; padding: 64px 48px 110px;">
    <div style="max-width: 1140px; margin: 0 auto;">
      <div style="max-width: 780px; margin: 0 auto; text-align: center;">
        <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(195,180,215,.6); display: block; margin-bottom: 16px;">The Story</span>
        <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(32px, 3.8vw, 54px); font-weight: 700; letter-spacing: -1.2px; line-height: 1.1; color: #ffffff; margin-bottom: 28px;">The best software for these markets will be built from inside them — not shipped in from somewhere else.</h2>
        <p style="font-size: 17px; line-height: 1.78; color: rgba(220,205,238,.55);">The software running commerce here was built for somewhere else — too foreign, too rigid, blind to how business actually moves. So we stopped waiting and built from the inside: AI-native, from first principles, for the markets the rest of the industry still hasn't figured out.</p>
      </div>
      <!-- Values row -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 72px;">
        <div data-vcard="" style="padding: 32px; border-radius: 20px; background: rgba(255,255,255,.025); border: 1px solid rgba(180,120,255,.1);">
          <div class="vcard-icon" style="width: 44px; height: 44px; border-radius: 12px; background: rgba(123,47,190,.2); border: 1px solid rgba(123,47,190,.3); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B59B6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"/></svg>
          </div>
          <h3 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">Built from the inside</h3>
          <p style="font-size: 14px; line-height: 1.7; color: rgba(220,205,238,.48);">Every feature earns its place by working the way this market works — not the way a demo on the other side of the world assumed it would.</p>
        </div>
        <div data-vcard="" style="padding: 32px; border-radius: 20px; background: rgba(255,255,255,.025); border: 1px solid rgba(180,120,255,.1);">
          <div class="vcard-icon" style="width: 44px; height: 44px; border-radius: 12px; background: rgba(123,47,190,.2); border: 1px solid rgba(123,47,190,.3); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B59B6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
          </div>
          <h3 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">Speed as a feature</h3>
          <p style="font-size: 14px; line-height: 1.7; color: rgba(220,205,238,.48);">We obsess over speed, because time is the one thing none of us can buy more of.</p>
        </div>
        <div data-vcard="" style="padding: 32px; border-radius: 20px; background: rgba(255,255,255,.025); border: 1px solid rgba(180,120,255,.1);">
          <div class="vcard-icon" style="width: 44px; height: 44px; border-radius: 12px; background: rgba(123,47,190,.2); border: 1px solid rgba(123,47,190,.3); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B59B6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
          </div>
          <h3 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">Trust by default</h3>
          <p style="font-size: 14px; line-height: 1.7; color: rgba(220,205,238,.48);">Security and privacy aren't add-ons we bolt on later. They're the floor everything else stands on.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- THE CONFLICT: Origin story + timeline -->
  <section style="background: #000000; padding: 0 48px 110px;">
    <div style="max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
      <div>
        <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(195,180,215,.6); display: block; margin-bottom: 16px;">The Conflict</span>
        <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(26px, 3vw, 42px); font-weight: 700; letter-spacing: -0.8px; line-height: 1.15; color: #ffffff; margin-bottom: 22px;">Why did we start Extensor Labs?</h2>
        <p style="font-size: 15px; line-height: 1.8; color: rgba(220,205,238,.52);">Businesses were losing hours to work software was supposed to handle — copying numbers, chasing orders in chat threads, reconciling cash by hand. The tools existed. They just weren't built for here. So we built the one that should have been.</p>
      </div>
      <!-- Timeline -->
      <div style="display: flex; flex-direction: column; gap: 0;">
        <div style="display: flex; gap: 20px; padding-bottom: 32px; position: relative;">
          <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
            <div style="width: 14px; height: 14px; border-radius: 50%; background: #7B2FBE; border: 2px solid rgba(123,47,190,.4); flex-shrink: 0; margin-top: 3px;"></div>
            <div style="width: 1px; flex: 1; background: linear-gradient(to bottom, rgba(123,47,190,.4), rgba(123,47,190,.1)); margin-top: 6px;"></div>
          </div>
          <div style="padding-bottom: 8px;">
            <p style="font-size: 11.5px; font-weight: 700; color: #8c52ff; letter-spacing: 1px; margin-bottom: 6px;">January 2026</p>
            <p style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 6px;">The problem gets a name</p>
            <p style="font-size: 13.5px; line-height: 1.6; color: rgba(220,205,238,.48);">Extensor Labs is founded. We start with the problem, not the product — emerging-market businesses running on software built for somewhere else — and spend our first weeks getting that problem statement exactly right.</p>
          </div>
        </div>
        <div style="display: flex; gap: 20px; padding-bottom: 32px; position: relative;">
          <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
            <div style="width: 14px; height: 14px; border-radius: 50%; background: #7B2FBE; border: 2px solid rgba(123,47,190,.4); flex-shrink: 0; margin-top: 3px;"></div>
            <div style="width: 1px; flex: 1; background: linear-gradient(to bottom, rgba(123,47,190,.4), rgba(123,47,190,.1)); margin-top: 6px;"></div>
          </div>
          <div style="padding-bottom: 8px;">
            <p style="font-size: 11.5px; font-weight: 700; color: #8c52ff; letter-spacing: 1px; margin-bottom: 6px;">February 2026</p>
            <p style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 6px;">Into the Foundry</p>
            <p style="font-size: 13.5px; line-height: 1.6; color: rgba(220,205,238,.48);">Extensor Labs is selected into the Foundry program at the National Incubation Center (NIC), NED University — our first real validation, and a home to build in.</p>
          </div>
        </div>
        <div style="display: flex; gap: 20px; padding-bottom: 32px; position: relative;">
          <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
            <div style="width: 14px; height: 14px; border-radius: 50%; background: #7B2FBE; border: 2px solid rgba(123,47,190,.4); flex-shrink: 0; margin-top: 3px;"></div>
            <div style="width: 1px; flex: 1; background: linear-gradient(to bottom, rgba(123,47,190,.4), rgba(123,47,190,.1)); margin-top: 6px;"></div>
          </div>
          <div style="padding-bottom: 8px;">
            <p style="font-size: 11.5px; font-weight: 700; color: #8c52ff; letter-spacing: 1px; margin-bottom: 6px;">March 2026</p>
            <p style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 6px;">The first build ships</p>
            <p style="font-size: 13.5px; line-height: 1.6; color: rgba(220,205,238,.48);">We design and deploy a SaaS admin dashboard for Boost Lifestyle — our first demonstration project, and the first real step toward Quinn, our flagship product.</p>
          </div>
        </div>
        <div style="display: flex; gap: 20px; padding-bottom: 32px; position: relative;">
          <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
            <div style="width: 14px; height: 14px; border-radius: 50%; background: #7B2FBE; border: 2px solid rgba(123,47,190,.4); flex-shrink: 0; margin-top: 3px;"></div>
            <div style="width: 1px; flex: 1; background: linear-gradient(to bottom, rgba(123,47,190,.4), rgba(123,47,190,.1)); margin-top: 6px;"></div>
          </div>
          <div style="padding-bottom: 8px;">
            <p style="font-size: 11.5px; font-weight: 700; color: #8c52ff; letter-spacing: 1px; margin-bottom: 6px;">April 2026</p>
            <p style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 6px;">A real ERP, in the wild</p>
            <p style="font-size: 13.5px; line-height: 1.6; color: rgba(220,205,238,.48);">We build a marketing-campaign ERP system for digitEMB — proof the platform bends to real, messy business needs, not just clean demos.</p>
          </div>
        </div>
        <div style="display: flex; gap: 20px;">
          <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
            <div style="width: 14px; height: 14px; border-radius: 50%; background: linear-gradient(135deg,#7B2FBE,#9B59B6); border: 2px solid rgba(155,89,182,.5); flex-shrink: 0; margin-top: 3px; box-shadow: 0 0 12px rgba(123,47,190,.5);"></div>
          </div>
          <div>
            <p style="font-size: 11.5px; font-weight: 700; color: #8c52ff; letter-spacing: 1px; margin-bottom: 6px;">May 2026 — Now</p>
            <p style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 6px;">The flagship begins</p>
            <p style="font-size: 13.5px; line-height: 1.6; color: rgba(220,205,238,.48);">We start building Quinn — our flagship product — folding everything the early projects taught us into a single platform.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- THE RESOLUTION: What we solve + stats -->
  <section style="background: #000000; padding: 0 48px 110px;">
    <div style="max-width: 1140px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 56px;">
        <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(195,180,215,.6); display: block; margin-bottom: 16px;">The Resolution</span>
        <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(28px, 3.2vw, 46px); font-weight: 700; letter-spacing: -1px; line-height: 1.1; color: #ffffff; margin-bottom: 16px;">What problem do we actually solve?</h2>
        <p style="font-size: 16px; line-height: 1.7; color: rgba(220,205,238,.5); max-width: 560px; margin: 0 auto;">We clear the manual work that quietly slows a business down — the data entry, the report-chasing, the twelve-tab juggling — and hand the time back to the people doing real work.</p>
      </div>
      <!-- Stats row -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; border: 1px solid rgba(180,120,255,.1); border-radius: 20px; overflow: hidden; margin-bottom: 48px;">
        <div style="padding: 36px 28px; background: rgba(255,255,255,.02); text-align: center; border-right: 1px solid rgba(180,120,255,.08);">
          <p style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 42px; font-weight: 700; color: #ffffff; letter-spacing: -1.5px; line-height: 1; margin-bottom: 8px;">10<span style="color: #8c52ff;">+</span></p>
          <p style="font-size: 13px; line-height: 1.55; color: rgba(220,205,238,.45);">Hours a week handed back to teams, on average</p>
        </div>
        <div style="padding: 36px 28px; background: rgba(255,255,255,.02); text-align: center; border-right: 1px solid rgba(180,120,255,.08);">
          <p style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 42px; font-weight: 700; color: #ffffff; letter-spacing: -1.5px; line-height: 1; margin-bottom: 8px;">10k<span style="color: #8c52ff;">+</span></p>
          <p style="font-size: 13px; line-height: 1.55; color: rgba(220,205,238,.45);">Actions the platform handles automatically each month</p>
        </div>
        <div style="padding: 36px 28px; background: rgba(255,255,255,.02); text-align: center; border-right: 1px solid rgba(180,120,255,.08);">
          <p style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 42px; font-weight: 700; color: #ffffff; letter-spacing: -1.5px; line-height: 1; margin-bottom: 8px;">20<span style="color: #8c52ff;">+</span></p>
          <p style="font-size: 13px; line-height: 1.55; color: rgba(220,205,238,.45);">Businesses running on it</p>
        </div>
        <div style="padding: 36px 28px; background: rgba(255,255,255,.02); text-align: center;">
          <p style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 42px; font-weight: 700; color: #ffffff; letter-spacing: -1.5px; line-height: 1; margin-bottom: 8px;">4.9<span style="color: #8c52ff;">&#9733;</span></p>
          <p style="font-size: 13px; line-height: 1.55; color: rgba(220,205,238,.45);">What those businesses say when we ask</p>
        </div>
      </div>
    </div>
  </section>

  <!-- THE SEQUEL: Vision -->
  <section style="background: #000000; padding: 0 48px 110px;">
    <div style="max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
      <!-- Vision statement -->
      <div style="padding: 52px; border-radius: 24px; background: linear-gradient(135deg, rgba(123,47,190,.12), rgba(155,89,182,.06)); border: 1px solid rgba(180,120,255,.14); position: relative; overflow: hidden;">
        <div style="position: absolute; top: -40%; right: -20%; width: 60%; height: 80%; background: radial-gradient(circle, rgba(123,47,190,.18) 0%, transparent 70%); pointer-events: none;"></div>
        <span style="font-size: 11.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(195,180,215,.6); display: block; margin-bottom: 16px;">The Sequel</span>
        <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(26px, 2.8vw, 38px); font-weight: 700; letter-spacing: -0.8px; line-height: 1.15; color: #ffffff; margin-bottom: 20px; position: relative; z-index: 1;">Where this goes next.</h2>
        <p style="font-size: 15px; line-height: 1.8; color: rgba(220,205,238,.55); position: relative; z-index: 1;">The platform today is the first floor. The goal for the next five years is simple to say and hard to do: make running a business here feel effortless.</p>
      </div>
      <!-- Roadmap items -->
      <div style="display: flex; flex-direction: column; gap: 22px;">
        <div data-vcard="" style="display: flex; align-items: flex-start; gap: 16px; padding: 22px; border-radius: 16px; background: rgba(255,255,255,.025); border: 1px solid rgba(180,120,255,.08);">
          <div class="vcard-icon" style="width: 36px; height: 36px; border-radius: 10px; background: rgba(123,47,190,.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B59B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>
          </div>
          <div>
            <p style="font-size: 14.5px; font-weight: 600; color: #ffffff; margin-bottom: 4px;">More than one product</p>
            <p style="font-size: 13px; line-height: 1.6; color: rgba(220,205,238,.45);">The platform is the foundation. New products will be built on top of it — each one purpose-built for a different corner of how these markets trade.</p>
          </div>
        </div>
        <div data-vcard="" style="display: flex; align-items: flex-start; gap: 16px; padding: 22px; border-radius: 16px; background: rgba(255,255,255,.025); border: 1px solid rgba(180,120,255,.08);">
          <div class="vcard-icon" style="width: 36px; height: 36px; border-radius: 10px; background: rgba(123,47,190,.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B59B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>
          </div>
          <div>
            <p style="font-size: 14.5px; font-weight: 600; color: #ffffff; margin-bottom: 4px;">More than one market</p>
            <p style="font-size: 13px; line-height: 1.6; color: rgba(220,205,238,.45);">What works here works in a dozen markets that have been handed the same wrong software. We intend to reach them.</p>
          </div>
        </div>
        <div data-vcard="" style="display: flex; align-items: flex-start; gap: 16px; padding: 22px; border-radius: 16px; background: rgba(255,255,255,.025); border: 1px solid rgba(180,120,255,.08);">
          <div class="vcard-icon" style="width: 36px; height: 36px; border-radius: 10px; background: rgba(123,47,190,.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B59B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"/></svg>
          </div>
          <div>
            <p style="font-size: 14.5px; font-weight: 600; color: #ffffff; margin-bottom: 4px;">Intelligence that gets ahead of you</p>
            <p style="font-size: 13px; line-height: 1.6; color: rgba(220,205,238,.45);">The platform stops waiting to be asked — spotting the bottleneck, flagging the risk, and suggesting the fix before it becomes a problem.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TRUSTED BY: infinite horizontal marquee -->
  <section style="background: #000000; padding: 56px 0 84px; overflow: hidden;">
    <div style="max-width: 1180px; margin: 0 auto; padding: 0 24px;">
      <div style="padding: 18px 0 22px; overflow: hidden;">
        <p style="text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 2.4px; text-transform: uppercase; color: rgba(140,82,255,.55); margin-bottom: 32px;">Trusted by teams at</p>
        <div style="position: relative; overflow: hidden; -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%);">
      <div class="marquee-track" style="display: flex; align-items: center; width: max-content;">
        <span class="marquee-logo">Boeing</span>
        <span class="marquee-logo">Adobe</span>
        <span class="marquee-logo">DoorDash</span>
        <span class="marquee-logo">OpenAI</span>
        <span class="marquee-logo">Stripe</span>
        <span class="marquee-logo">Vercel</span>
        <span class="marquee-logo">Spotify</span>
        <span class="marquee-logo">Airbnb</span>
        <span class="marquee-logo">Notion</span>
        <span class="marquee-logo">Figma</span>
        <span class="marquee-logo">Shopify</span>
        <span class="marquee-logo">Slack</span>
        <span class="marquee-logo">Netflix</span>
        <!-- duplicate set (aria-hidden) for a seamless, gap-free loop -->
        <span class="marquee-logo" aria-hidden="true">Boeing</span>
        <span class="marquee-logo" aria-hidden="true">Adobe</span>
        <span class="marquee-logo" aria-hidden="true">DoorDash</span>
        <span class="marquee-logo" aria-hidden="true">OpenAI</span>
        <span class="marquee-logo" aria-hidden="true">Stripe</span>
        <span class="marquee-logo" aria-hidden="true">Vercel</span>
        <span class="marquee-logo" aria-hidden="true">Spotify</span>
        <span class="marquee-logo" aria-hidden="true">Airbnb</span>
        <span class="marquee-logo" aria-hidden="true">Notion</span>
        <span class="marquee-logo" aria-hidden="true">Figma</span>
        <span class="marquee-logo" aria-hidden="true">Shopify</span>
        <span class="marquee-logo" aria-hidden="true">Slack</span>
        <span class="marquee-logo" aria-hidden="true">Netflix</span>
        </div>
      </div>
    </div>
  </section>

</div>`;
