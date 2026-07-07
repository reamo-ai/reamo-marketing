const VIGNETTE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<base href="/">
<title>Loop created vignette</title>
<style>
  html, body {
    margin: 0;
    padding: 0;
    background: transparent;
  }
  .viewport {
    position: relative;
    width: 100%;
    height: 350px;
    overflow: hidden;
    background: transparent;
  }
  .bgscroll {
    position: absolute;
    top: 118px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 12%, black 90%, transparent);
    mask-image: linear-gradient(to bottom, transparent, black 12%, black 90%, transparent);
  }
  @keyframes bgShimmer {
    0%   { background-position: 0% 0%; }
    50%  { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
  }
  .bgtrack {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    padding: 0 0.5rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 21px;
    line-height: 1.7;
    background-image: linear-gradient(
      135deg,
      rgba(60,60,60,0.5) 0%,
      rgba(110,110,110,0.7) 30%,
      rgba(130,130,130,0.6) 50%,
      rgba(110,110,110,0.7) 70%,
      rgba(60,60,60,0.5) 100%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: blur(1.5px);
    will-change: transform;
    animation: bgShimmer 6s ease-in-out infinite;
  }
  .focuswrap {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 39px;
    padding: 118px clamp(16px, 3.5vw, 40px) 0;
  }
  .avatars {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  .avatars img {
    height: 130px;
    width: auto;
    display: block;
  }
  .waveform {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4.5px;
    height: 39.6px;
    position: relative;
    top: 0;
    z-index: 1;
    align-self: center;
    flex-shrink: 0;
  }
  .waveform .bar {
    width: 2px;
    border-radius: 1px;
    background: #ffffff;
    height: 7.2px;
    animation: wave 1.1s ease-in-out infinite;
  }
  @keyframes wave {
    0%, 100% { height: 5.4px; opacity: 0.5; }
    50% { height: var(--peak, 36px); opacity: 1; }
  }
  .textblock {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    top: -15px;
  }
  .eyebrow {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6393b4;
    margin: 0 0 4px;
    position: relative;
    z-index: 1;
  }
  .line {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: clamp(calc(16px + 1pt), calc(5.6vw + 1pt), calc(32px + 1pt));
    font-weight: 500;
    color: #ffffff;
    white-space: normal;
    position: relative;
    z-index: 1;
    text-align: center;
    margin: 0;
  }
  .word {
    opacity: 0;
  }
</style>
</head>
<body>

<div class="viewport">
  <div class="bgscroll">
    <div class="bgtrack" id="bgtrack"></div>
  </div>
  <div class="focuswrap">
    <div class="avatars">
      <img src="images/headshot-composite.png" alt="">
    </div>
    <div class="waveform" id="waveform"></div>
    <div class="textblock">
      <p class="eyebrow" id="eyebrow"></p>
      <p class="line" id="line"></p>
    </div>
  </div>
</div>

<script>
(function () {
  var wf = document.getElementById('waveform');
  var BAR_COUNT = 18;
  var mid = (BAR_COUNT - 1) / 2;
  for (var b = 0; b < BAR_COUNT; b++) {
    var bar = document.createElement('span');
    bar.className = 'bar';
    var distFromCenter = Math.abs(b - mid) / mid;
    var peak = 36 - distFromCenter * 19.8;
    bar.style.setProperty('--peak', peak + 'px');
    bar.style.animationDelay = (b * 0.05) + 's';
    bar.style.animationDuration = (0.9 + (b % 4) * 0.12) + 's';
    wf.appendChild(bar);
  }
})();
</script>

<script>
(function () {
  // ── Background track setup ──────────────────────────────────────────────────
  var fullScript = [
    "Agent: Hey Jessica, thanks for calling back. So you said you're ready to move forward on listing the house?",
    "Client: We are. My husband and I talked it over this weekend and we want to get it on the market before the kids start school again.",
    "Agent: That works, let's lock in everything I need so I can get the listing packet built today. Can you confirm the property address for me?",
    "Client: 4192 Whitmore Lane, Chagrin Falls, Ohio, 44022.",
    "Agent: Perfect. And just so I have it, what's the parcel ID? Should be on your tax bill.",
    "Client: Let me grab it, okay, it's 11-034-0087.",
    "Agent: Got it. What year was the house built?",
    "Client: 1998. We added the sunroom in 2011 though, if that matters.",
    "Agent: It does, I'll note that as an improvement. How many bedrooms and bathrooms?",
    "Client: Four bedrooms, three full bathrooms, one half bath.",
    "Agent: And lot size, do you know roughly?",
    "Client: It's just under an acre. 0.92 acres according to the survey we had done.",
    "Agent: Any HOA?",
    "Client: Yes, Whitmore Estates HOA, it's 340 dollars a year. Real low key, mostly just landscaping standards.",
    "Agent: Good to know. Now for the listing agreement itself, we talked about the 6 percent commission split, correct? 3 to your agent, 3 to buyer's side?",
    "Client: Yes, that's what we agreed on.",
    "Agent: And what's on title, full legal names, exactly as they'd appear on a deed.",
    "Client: Jessica Anne Fletcher and Robert Douglas Fletcher.",
    "Agent: Perfect, I'll list you both as sellers. What's the best email for the paperwork?",
    "Client: jessica.fletcher88@gmail.com",
    "Agent: Got it. Last few things, anything you're planning to exclude from the sale?",
    "Client: The washer and dryer are staying with us. Everything else can stay.",
    "Agent: And are you expecting any earnest money range or do you want me to leave that open for offers?",
    "Client: Let's leave it open, whatever's standard.",
    "Agent: Last question, school district, is that Chagrin Falls Exempted Village?",
    "Client: Yes, that's right.",
    "Agent: That's everything I need. I'm going to build out the full listing file today and send it over for signature.",
    "Client: That was fast. Thank you.",
    "Agent: Of course, talk soon."
  ];

  var bgtrack = document.getElementById('bgtrack');
  var html = fullScript.map(function (l) {
    return '<p style="margin:0 0 0.6em;">' + l + '</p>';
  }).join('');
  bgtrack.innerHTML = html + html;

  // ── Scroll animation ─────────────────────────────────────────────────────────
  var trackHalf = bgtrack.scrollHeight / 2;
  var normalSpeed = trackHalf / 48; // px/s — full loop in ~48s
  var scrollY = 0;
  var lastTs = null;

  var lineEl = document.getElementById('line');

  function exitText() {
    lineEl.style.transition = 'transform 0.18s ease-in, opacity 0.18s ease-in';
    lineEl.style.transform = 'translateY(-16px)';
    lineEl.style.opacity = '0';
  }

  function enterText() {
    lineEl.style.transition = 'none';
    lineEl.style.transform = 'translateY(16px)';
    lineEl.style.opacity = '0';
    void lineEl.offsetWidth;
    lineEl.style.transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
    lineEl.style.transform = '';
    lineEl.style.opacity = '';
  }

  function animateScroll(ts) {
    if (lastTs !== null) {
      var dt = Math.min((ts - lastTs) / 1000, 0.1);
      scrollY -= normalSpeed * dt;
      if (scrollY <= -trackHalf) scrollY += trackHalf;
      bgtrack.style.transform = 'translateY(' + scrollY + 'px)';
    }
    lastTs = ts;
    requestAnimationFrame(animateScroll);
  }
  requestAnimationFrame(animateScroll);

  // ── Line animation ──────────────────────────────────────────────────────────
  var lines = [
    { speaker: "Client", text: "We need to get the house on the market fast." },
    { speaker: "Client", text: "All appliances stay." },
    { speaker: "Client", text: "6% commission works." },
    { speaker: "Client", text: "Robert got the promotion!" },
    { speaker: "Client", text: "The baby's due in September!" },
    { speaker: "Agent", text: "We'll go live on the first." },
    { speaker: "Agent", text: "I'll lock in 9am Thursday for listing photos." },
    { speaker: "Agent", text: "I'll send it to you for signature by end of day." },
    { speaker: "Agent", text: "I'll get the photographer confirmation sent over as soon as I book it." }
  ];

  var el = document.getElementById('line');
  var eyebrowEl = document.getElementById('eyebrow');
  var li = 0;
  var MAX_LINE_CHARS = 28;

  function wrapWords(text, maxLen) {
    var words = text.split(' ');
    var wrapped = [];
    var current = [];
    var currentLen = 0;
    words.forEach(function (w) {
      var addLen = (current.length ? 1 : 0) + w.length;
      if (current.length && currentLen + addLen > maxLen) {
        wrapped.push(current);
        current = [w];
        currentLen = w.length;
      } else {
        current.push(w);
        currentLen += addLen;
      }
    });
    if (current.length) wrapped.push(current);
    return wrapped;
  }

  function runLine() {
    el.innerHTML = '';
    var index = li;
    var item = lines[index];
    eyebrowEl.textContent = item.speaker;

    window.parent.postMessage({ source: 'reamo-vignette', event: 'line-index', index: index }, '*');

    enterText();

    var wrappedLines = wrapWords(item.text, MAX_LINE_CHARS);
    var words = [];
    var spans = [];
    wrappedLines.forEach(function (lineWords, wrappedIndex) {
      lineWords.forEach(function (w) {
        var s = document.createElement('span');
        s.className = 'word';
        s.textContent = w + ' ';
        el.appendChild(s);
        spans.push(s);
        words.push(w);
      });
      if (wrappedIndex < wrappedLines.length - 1) {
        el.appendChild(document.createElement('br'));
      }
    });
    var i = 0;
    function step() {
      if (i >= spans.length) {
        setTimeout(exitText, 650);
        setTimeout(function () {
          li = (li + 1) % lines.length;
          runLine();
        }, 900);
        return;
      }
      spans[i].style.opacity = '1';
      i++;
      setTimeout(step, 150 + words[i - 1].length * 10);
    }
    step();
  }

  runLine();
})();
</script>

</body>
</html>
`;

export default function LoopCreatedVignette() {
  return (
    <iframe
      title="Loop created vignette animation"
      srcDoc={VIGNETTE_HTML}
      className="h-[350px] w-full border-0 bg-transparent"
      scrolling="no"
    />
  );
}
