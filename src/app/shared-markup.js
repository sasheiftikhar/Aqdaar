// Shared NAV + CTA section + footer used identically across every page.
// Edit here once; all pages update.

// Top navigation — identical on every page (logo + links + CTA, hamburger <=1024).
export const NAV_MARKUP = `
  <nav data-nav="" style="position: absolute; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 26px 48px; background: transparent;">
    <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
      <img src="/uploads/extensor-labs-logo.png" alt="Extensor Labs" style="height: 30px; width: auto; display: block; flex-shrink: 0;">
    </a>
    <div data-nav-links="" style="display: flex; align-items: center; gap: 30px; font-size: 15px;">
      <a href="/about" class="nav-link">About Us</a>
      <a href="/for-business" class="nav-link">For Business</a>
      <a href="/blog" class="nav-link">Blog</a>
      <a href="/product" class="nav-link">Product</a>
      <a href="/services" class="nav-link">Services</a>
      <a href="/team" class="nav-link">Team</a>
      <a href="/contact" class="nav-link">Contact Us</a>
    </div>
    <a href="/contact" class="nav-cta" style="text-decoration: none; display: inline-block;">Book a demo</a>
    <!-- mobile hamburger (shown <=1024px) -->
    <button data-nav-toggle="" aria-label="Open menu" style="display: none; background: none; border: none; cursor: pointer; padding: 6px; line-height: 0;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f7f4fb" stroke-width="2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
    </button>
    <!-- full-screen mobile menu (toggled by JS) -->
    <div data-nav-menu="" style="display: none; position: fixed; inset: 0; z-index: 200; background: radial-gradient(72% 55% at 50% 14%, rgba(123,47,190,.30), transparent 72%), linear-gradient(165deg, rgba(26,13,42,.93) 0%, rgba(9,5,15,.96) 100%); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); flex-direction: column; align-items: center; justify-content: center; gap: 26px;">
      <button data-nav-close="" aria-label="Close menu" style="position: absolute; top: 22px; right: 22px; background: none; border: none; cursor: pointer; padding: 6px; line-height: 0;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f7f4fb" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
      </button>
      <a href="/about" class="nav-link" style="font-size: 21px;">About Us</a>
      <a href="/for-business" class="nav-link" style="font-size: 21px;">For Business</a>
      <a href="/blog" class="nav-link" style="font-size: 21px;">Blog</a>
      <a href="/product" class="nav-link" style="font-size: 21px;">Product</a>
      <a href="/services" class="nav-link" style="font-size: 21px;">Services</a>
      <a href="/team" class="nav-link" style="font-size: 21px;">Team</a>
      <a href="/contact" class="nav-link" style="font-size: 21px;">Contact Us</a>
      <a href="/contact" class="nav-cta" style="margin-top: 18px; background: linear-gradient(160deg,#7B2FBE,#9B59B6); color: #fff; padding: 15px 36px; font-size: 16px; border-radius: 14px; box-shadow: 0 12px 34px rgba(123,47,190,.5); text-decoration: none; display: inline-block;">Book a demo</a>
    </div>
  </nav>`;

// Wires the hamburger open/close. Call once from each page's useEffect.
export function setupMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  const close = document.querySelector('[data-nav-close]');
  if (!toggle || !menu) return;
  const open = () => { menu.classList.add('nav-open'); document.body.style.overflow = 'hidden'; };
  const shut = () => { menu.classList.remove('nav-open'); document.body.style.overflow = ''; };
  toggle.addEventListener('click', open);
  if (close) close.addEventListener('click', shut);
  menu.querySelectorAll('a, .nav-cta').forEach((el) => el.addEventListener('click', shut));
}

export const CTA_MARKUP = `
  <!-- CTA: full-bleed checkerboard + headline (before footer) -->
  <section style="background: #000000; padding: 0 0 110px;">
    <div style="position: relative;">
      <!-- full-bleed checkerboard (alternating square boxes) -->
      <div data-cta-checker="" style="display: grid; grid-template-columns: repeat(8, 1fr); align-content: start;">
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
        <div style="background: linear-gradient(135deg,#7B2FBE,#0a0a0a); aspect-ratio: 1 / 1;"></div>
        <div style="background: #000000; aspect-ratio: 1 / 1;"></div>
      </div>
      <!-- centered overlay: text + cta sit on top of the full-bleed checkerboard,
           with a soft dark radial behind them so they stay readable -->
      <div data-cta-text="" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px 24px;">
        <div style="position: absolute; inset: 0; background: radial-gradient(closest-side at 50% 50%, rgba(0,0,0,.94) 0%, rgba(0,0,0,.82) 38%, rgba(0,0,0,.45) 68%, rgba(0,0,0,0) 100%); -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px); pointer-events: none;"></div>
        <h2 style="position: relative; z-index: 1; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(20px, 5vw, 62px); font-weight: 700; letter-spacing: -1.8px; line-height: 1.02; color: #ffffff;">One login.<br>Zero chaos.<br>About time.</h2>
        <a href="/contact" class="cta-light-btn" style="position: relative; z-index: 1; margin-top: 30px; text-decoration: none; display: inline-block;">Book a demo</a>
      </div>
    </div>
  </section>`;

export const FOOTER_MARKUP = `
  <!-- FOOTER -->
  <footer style="position: relative; background: #000000; overflow: hidden;">
    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;">
      <div style="position: absolute; bottom: -5%; left: -55%; right: -55%; height: 240%; transform: perspective(800px) rotateX(64deg); transform-origin: 50% 100%; background-image: linear-gradient(rgba(120,70,255,.32) 1px, transparent 1px), linear-gradient(90deg, rgba(120,70,255,.32) 1px, transparent 1px); background-size: 80px 80px; animation: gridFlow 2.2s linear infinite; -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.5) 10%, black 30%, black 82%, transparent 100%); mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.5) 10%, black 30%, black 82%, transparent 100%);"></div>
    </div>
    <div style="position: relative; z-index: 1; max-width: 1140px; margin: 0 auto; padding: 80px 48px 0;">
      <div data-footer-grid="" style="display: grid; grid-template-columns: 1.8fr 1fr 1fr; gap: 48px; padding-bottom: 64px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <img src="/uploads/extensor-labs-logo.png" alt="Extensor Labs" style="height: 26px; width: auto; display: block;">
          </div>
          <p style="font-size: 14px; line-height: 1.68; color: rgba(213,200,228,.48); max-width: 260px; margin-bottom: 30px;">Automate time-consuming tasks and increase your effeciency</p>
          <div style="display: flex; gap: 10px;">
            <a href="#" aria-label="LinkedIn" style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07); display: flex; align-items: center; justify-content: center; text-decoration: none;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B2FBE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="#" aria-label="Instagram" style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07); display: flex; align-items: center; justify-content: center; text-decoration: none;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7B2FBE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="#" aria-label="Discord" style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07); display: flex; align-items: center; justify-content: center; text-decoration: none;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B2FBE" stroke-width="1.5" stroke-linejoin="round"><path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg></a>
            <a href="#" aria-label="Bluesky" style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07); display: flex; align-items: center; justify-content: center; text-decoration: none;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7B2FBE" stroke-width="1.5" stroke-linejoin="round"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg></a>
          </div>
        </div>
        <div>
          <h4 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 22px; letter-spacing: 0.2px;">Pages</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 15px;">
            <li><a href="/about" class="footer-link" style="font-size: 14px; text-decoration: none;">About Us</a></li>
            <li><a href="/for-business" class="footer-link" style="font-size: 14px; text-decoration: none;">For Business</a></li>
            <li><a href="/blog" class="footer-link" style="font-size: 14px; text-decoration: none;">Blog</a></li>
            <li><a href="/product" class="footer-link" style="font-size: 14px; text-decoration: none;">Product</a></li>
            <li><a href="/services" class="footer-link" style="font-size: 14px; text-decoration: none;">Services</a></li>
            <li><a href="/team" class="footer-link" style="font-size: 14px; text-decoration: none;">Team</a></li>
            <li><a href="/contact" class="footer-link" style="font-size: 14px; text-decoration: none;">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 22px; letter-spacing: 0.2px;">Information</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 15px;">
            <li><a href="#" class="footer-link" style="font-size: 14px; text-decoration: none;">Testimonials</a></li>
            <li><a href="/team" class="footer-link" style="font-size: 14px; text-decoration: none;">Team</a></li>
          </ul>
        </div>
      </div>
      <div data-footer-bottom="" style="border-top: 1px solid rgba(180,120,255,.11); padding: 26px 0; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13px; color: rgba(175,160,195,.42);">&#169; Extensor Labs 2026</span>
        <a href="/privacy" class="footer-link" style="font-size: 13px; text-decoration: none;">Privacy Policy</a>
      </div>
    </div>
  </footer>`;

// Quinn dashboard mockup (built in HTML/CSS) — used in the hero AI overlay + Performance section.
export const QUINN_DASHBOARD_MARKUP = `<div data-dash="" style="display: flex; min-height: 392px; background: #0a0a0c; text-align: left;">
          <!-- sidebar -->
          <div style="width: 56px; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,.06); display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 16px 0;">
            <div style="width: 30px; height: 30px; border-radius: 9px; background: #5b5bf5; display: flex; align-items: center; justify-content: center; color: #fff; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 15px;">Q</div>
            <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(91,91,245,.18); display: flex; align-items: center; justify-content: center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b8bff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"/></svg></div>
            <div style="width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(180,180,200,.4)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/></svg></div>
            <div style="width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(180,180,200,.4)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"/></svg></div>
            <div style="width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(180,180,200,.4)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg></div>
          </div>
          <!-- main -->
          <div style="flex: 1; padding: 20px 24px; overflow: hidden;">
            <!-- topbar -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: rgba(225,225,240,.65);">
                <span style="padding: 5px 11px; border: 1px solid rgba(255,255,255,.1); border-radius: 8px; color: #fff;">Quinn &#9662;</span>
                <span>Dashboard</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 12px; color: rgba(180,180,200,.4); border: 1px solid rgba(255,255,255,.08); border-radius: 8px; padding: 6px 30px 6px 10px;">Search&#8230;</span>
                <span style="width: 28px; height: 28px; border-radius: 7px; border: 1px solid rgba(255,255,255,.08);"></span>
                <span style="width: 28px; height: 28px; border-radius: 50%; background: #e7dfc9; color: #1a1a1a; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">S</span>
              </div>
            </div>
            <!-- overview heading -->
            <div style="font-size: 11px; letter-spacing: 1.6px; color: #7c7cff; font-weight: 700; margin-bottom: 6px;">&#8212; OVERVIEW</div>
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;">
              <div>
                <div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 30px; font-weight: 700; color: #fff; letter-spacing: -1px;">Welcome back<span style="color:#5b5bf5;">.</span></div>
                <div style="margin-top: 6px; font-size: 13px; color: rgba(205,205,220,.5);">Tuesday, June 23 &middot; here's how your store is moving today.</div>
              </div>
              <button style="flex-shrink: 0; background: #5b5bf5; color: #fff; border: none; border-radius: 10px; padding: 10px 16px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap;">New campaign &#8594;</button>
            </div>
            <!-- quick actions -->
            <div data-dash-grid="" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 22px;">
              <div style="border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 16px; background: rgba(255,255,255,.015);"><div style="width: 34px; height: 34px; border-radius: 9px; background: #5b5bf5; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></div><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 600; color: #fff;">View Inbox</div><div style="margin-top: 3px; font-size: 12px; color: rgba(200,200,215,.45);">Manage conversations</div></div>
              <div style="border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 16px; background: rgba(255,255,255,.015);"><div style="width: 34px; height: 34px; border-radius: 9px; background: rgba(91,91,245,.15); display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8b8bff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg></div><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 600; color: #fff;">Manage Customers</div><div style="margin-top: 3px; font-size: 12px; color: rgba(200,200,215,.45);">Customer database</div></div>
              <div style="border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 16px; background: rgba(255,255,255,.015);"><div style="width: 34px; height: 34px; border-radius: 9px; background: rgba(91,91,245,.15); display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8b8bff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg></div><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 600; color: #fff;">Knowledge Base</div><div style="margin-top: 3px; font-size: 12px; color: rgba(200,200,215,.45);">Manage articles</div></div>
              <div style="border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 16px; background: rgba(255,255,255,.015);"><div style="width: 34px; height: 34px; border-radius: 9px; background: rgba(91,91,245,.15); display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8b8bff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg></div><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 600; color: #fff;">Analytics</div><div style="margin-top: 3px; font-size: 12px; color: rgba(200,200,215,.45);">View insights</div></div>
            </div>
            <!-- stat cards -->
            <div data-dash-grid="" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 12px;">
              <div style="border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 15px 16px; background: rgba(255,255,255,.015);"><div style="display: flex; align-items: center; justify-content: space-between;"><span style="font-size: 10px; letter-spacing: 1px; color: rgba(190,190,210,.5); font-weight: 600;">TOTAL CUSTOMERS</span><span style="width: 24px; height: 24px; border-radius: 7px; background: #5b5bf5;"></span></div><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: 700; color: #fff; margin-top: 8px; letter-spacing: -1px;">598</div><div style="font-size: 11.5px; color: rgba(190,190,210,.4); margin-top: 2px;">in your CRM</div></div>
              <div style="border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 15px 16px; background: rgba(255,255,255,.015);"><div style="display: flex; align-items: center; justify-content: space-between;"><span style="font-size: 10px; letter-spacing: 1px; color: rgba(190,190,210,.5); font-weight: 600;">TOTAL MESSAGES</span><span style="width: 24px; height: 24px; border-radius: 7px; background: rgba(91,91,245,.18);"></span></div><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: 700; color: #fff; margin-top: 8px; letter-spacing: -1px;">0</div><div style="font-size: 11.5px; color: rgba(190,190,210,.4); margin-top: 2px;">across all channels</div></div>
              <div style="border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 15px 16px; background: rgba(255,255,255,.015);"><div style="display: flex; align-items: center; justify-content: space-between;"><span style="font-size: 10px; letter-spacing: 1px; color: rgba(190,190,210,.5); font-weight: 600;">ESCALATED CHATS</span><span style="width: 24px; height: 24px; border-radius: 7px; background: rgba(91,91,245,.18);"></span></div><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: 700; color: #fff; margin-top: 8px; letter-spacing: -1px;">0</div><div style="font-size: 11.5px; color: rgba(190,190,210,.4); margin-top: 2px;">needing attention</div></div>
              <div style="border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 15px 16px; background: rgba(255,255,255,.015);"><div style="display: flex; align-items: center; justify-content: space-between;"><span style="font-size: 10px; letter-spacing: 1px; color: rgba(190,190,210,.5); font-weight: 600;">ORDERS</span><span style="width: 24px; height: 24px; border-radius: 7px; background: rgba(91,91,245,.18);"></span></div><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: 700; color: #fff; margin-top: 8px; letter-spacing: -1px;">1,725</div><div style="font-size: 11.5px; color: rgba(190,190,210,.4); margin-top: 2px;">all time</div></div>
            </div>
          </div>
        </div>`;
