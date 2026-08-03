import { useEffect, useRef, useState } from 'react';
import couplePhoto from '../couple-photo.jpg';

const reasons = [
  'I love that I can be playful and teasing around you without pretending to be someone else.',
  'I appreciate that even after everything we have gone through, you continue to show me your real and honest self.',
  'I love the small memories we have created - the kind that may seem ordinary to other people but mean so much to me.',
  'I appreciate your patience with my clinginess, my jokes and the moments when I have difficulty expressing myself.',
  'I love that our relationship is not based only on happy moments. We have faced difficult days, learned from them and continued trying.',
  'I appreciate how you became part of my everyday life. Talking to you, teasing you and checking on you now feel natural to me.',
  'I love remembering how our story started, especially the day you became nervous and dropped your coins when you saw me.',
  'Most of all, I love you because you are Lejanie - not a perfect person, but the real person I chose and continue to choose.'
];

function App() {
  const [stars, setStars] = useState([]);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showSections, setShowSections] = useState({ story: false, memory: false, reasons: false, finale: false });
  const [currentReason, setCurrentReason] = useState(0);
  const [animateReason, setAnimateReason] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const storySectionRef = useRef(null);
  const memorySectionRef = useRef(null);
  const reasonsSectionRef = useRef(null);
  const finaleSectionRef = useRef(null);
  const loveLetterRef = useRef(null);

  useEffect(() => {
    setStars(
      Array.from({ length: 110 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }))
    );
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const heart = {
        id: `${Date.now()}-${Math.random()}`,
        left: `${Math.random() * 100}vw`,
        fontSize: `${12 + Math.random() * 18}px`,
        duration: `${7 + Math.random() * 7}s`,
        glyph: ['♡', '♥', '💗'][Math.floor(Math.random() * 3)]
      };

      setFloatingHearts((prev) => [...prev, heart]);
      window.setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((item) => item.id !== heart.id));
      }, 15000);
    }, 1700);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimateReason(false);
    const frame = window.requestAnimationFrame(() => setAnimateReason(true));
    return () => window.cancelAnimationFrame(frame);
  }, [currentReason]);

  const handleGiftOpen = () => {
    if (giftOpened) return;

    setGiftOpened(true);
    setShowSections((prev) => ({ ...prev, story: true }));

    window.setTimeout(() => setShowSections((prev) => ({ ...prev, memory: true })), 250);
    window.setTimeout(() => setShowSections((prev) => ({ ...prev, reasons: true })), 500);
    window.setTimeout(() => setShowSections((prev) => ({ ...prev, finale: true })), 750);

    window.setTimeout(() => {
      storySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 850);
  };

  const handleNextReason = () => {
    if (currentReason < reasons.length - 1) {
      setCurrentReason((prev) => prev + 1);
    } else {
      finaleSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenLetter = () => {
    createHeartBurst();
    setShowLetter(true);
    window.setTimeout(() => {
      loveLetterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 450);
  };

  const createHeartBurst = () => {
    const burst = Array.from({ length: 42 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      x: `${Math.cos(Math.random() * Math.PI * 2) * (80 + Math.random() * 260)}px`,
      y: `${Math.sin(Math.random() * Math.PI * 2) * (80 + Math.random() * 260)}px`,
      fontSize: `${14 + Math.random() * 22}px`,
      glyph: ['💗', '♡', '✨', '♥'][Math.floor(Math.random() * 4)]
    }));

    setSparks((prev) => [...prev, ...burst]);
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((item) => !burst.some((entry) => entry.id === item.id)));
    }, 1500);
  };

  return (
    <>
      <div className="stars" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration
            }}
          />
        ))}
      </div>

      <div className="floating-hearts" aria-hidden="true">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              fontSize: heart.fontSize,
              animationDuration: heart.duration
            }}
          >
            {heart.glyph}
          </span>
        ))}
      </div>

      <div className="spark-layer" aria-hidden="true">
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="spark"
            style={{
              fontSize: spark.fontSize,
              ['--x']: spark.x,
              ['--y']: spark.y
            }}
          >
            {spark.glyph}
          </span>
        ))}
      </div>

      <main className="page">
        <section className="section" id="opening">
          <div className="glass-card hero-card">
            <div className="string-lights lights-left" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="string-lights lights-right" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="hanging-hearts" aria-hidden="true">
              <span className="drop drop-1"><i>♥</i></span>
              <span className="drop drop-2"><i>♥</i></span>
              <span className="drop drop-3"><i>♥</i></span>
              <span className="drop drop-4"><i>♥</i></span>
              <span className="drop drop-5"><i>♥</i></span>
              <span className="drop drop-6"><i>♥</i></span>
            </div>

            <span className="outline-heart one" aria-hidden="true">♡</span>
            <span className="outline-heart two" aria-hidden="true">♡</span>
            <span className="outline-heart three" aria-hidden="true">♡</span>
            <div className="cloud-row" aria-hidden="true" />

            <div className="hero-content">
              <p className="eyebrow">♥ Made just for you ♥</p>

              <h1 className="hero-title">
                <span className="hero-for">For</span>
                <span className="script">Lejanie</span>
              </h1>

              <div className="romantic-divider" aria-hidden="true">
                <span>✦</span>
                <span className="divider-heart">♥</span>
                <span>✦</span>
              </div>

              <p className="hero-message">
                You make every moment brighter,<br />
                every day better,<br />
                and every memory unforgettable.
              </p>

              <p className="hero-thanks">Thank you for being you. 💗</p>

              <div className="gift-wrapper">
                <button className={`gift-button ${giftOpened ? 'opened' : ''}`} onClick={handleGiftOpen} aria-label="Open your surprise">
                  <span className="gift-lid" />
                  <span className="gift-box" />
                </button>

                <span className="click-note" aria-hidden="true">
                  Click<br />
                  to open
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${showSections.story ? '' : 'hidden-section'}`} ref={storySectionRef} id="storySection">
          <div className="glass-card section-card surprise-card">
            <div className="section-header surprise-header">
              <h2>A little something for you</h2>
              <p className="section-description">
                A small reminder of how loved, important, special and wonderful you are to me.
              </p>
            </div>

            <div className="surprise-layout">
              <div className="affection-column">
                <div className="affection-note">
                  <div className="affection-icon" aria-hidden="true">♥</div>
                  <p>
                    You are
                    <strong>Loved</strong>
                    <span>More than words can say.</span>
                  </p>
                </div>

                <div className="affection-note">
                  <div className="affection-icon" aria-hidden="true">★</div>
                  <p>
                    You are
                    <strong>Special</strong>
                    <span>In every single way.</span>
                  </p>
                </div>
              </div>

              <div className="surprise-center">
                <div className="open-gift-visual" aria-hidden="true">
                  <div className="confetti">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="open-lid" />
                  <span className="heart-aura">
                    <span className="heart-core" />
                    <span className="heart-message">
                      <b>You are</b>
                      <em>amazing</em>
                      <span>just the way you are.</span>
                    </span>
                  </span>
                  <span className="open-box" />
                </div>
              </div>

              <div className="affection-column">
                <div className="affection-note">
                  <div className="affection-icon" aria-hidden="true">♛</div>
                  <p>
                    You are
                    <strong>Important</strong>
                    <span>To me, always and forever.</span>
                  </p>
                </div>

                <div className="affection-note">
                  <div className="affection-icon" aria-hidden="true">✦</div>
                  <p>
                    You are
                    <strong>Wonderful</strong>
                    <span>A rare gem in this world.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="message-ribbon">
              <span className="ribbon-heart" aria-hidden="true">♥</span>
              <p>
                Thank you for being such a beautiful part of my life. I am so lucky to have you. 💗
              </p>
            </div>

            <div className="timeline">
              <article className="timeline-card">
                <span className="timeline-number">01</span>
                <h3>Two years and three months</h3>
                <p>
                  That is how long we have known each other. It has been a journey filled with conversations, teasing, misunderstandings, growth and memories that became part of who we are.
                </p>
              </article>

              <article className="timeline-card">
                <span className="timeline-number">02</span>
                <h3>One year and three months</h3>
                <p>
                  I courted you patiently because I did not only want to impress you. I wanted you to feel that my intentions were genuine and that I was willing to stay.
                </p>
              </article>

              <article className="timeline-card">
                <span className="timeline-number">03</span>
                <h3>One year together</h3>
                <p>
                  Now we have reached one year in our relationship. We are not perfect, but everything we have overcome has made our story real, meaningful and worth protecting.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={`section ${showSections.memory ? '' : 'hidden-section'}`} ref={memorySectionRef} id="memorySection">
          <div className="glass-card section-card">
            <div className="memory-layout">
              <div className="photo-placeholder">
                <img src={couplePhoto} alt="Venjie and Lejanie together" />
                <div className="photo-caption">Our story</div>
              </div>

              <div className="memory-copy">
                <p className="eyebrow">A memory I will always remember</p>
                <h2>
                  The first time
                  <span className="script">we met</span>
                </h2>

                <blockquote>
                  I still remember seeing you at the counter in Jaro, Pavia, Iloilo. You were buying some goods, and when you saw me, you started trembling. The coins in your hand fell onto the floor. It was such a simple and funny moment, but it became one of my favorite memories because it was the beginning of something I never expected to become this important.
                </blockquote>

                <p className="section-description">
                  I may tease you a lot, but moments like that remind me how special our beginning was. Even before we became a couple, you were already giving me memories I would keep smiling about.
                </p>

                <div className="inside-jokes">
                  <div className="joke">“Ngala ko wala na ang preno sang jeep, ara na gali sa imo ilong.”</div>
                  <div className="joke">“Daw tambutso imo ilong.”</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${showSections.reasons ? '' : 'hidden-section'}`} ref={reasonsSectionRef} id="reasonsSection">
          <div className="glass-card section-card">
            <div className="section-header surprise-header">
              <p className="eyebrow">Some things I want you to know</p>
              <h2>
                Why I still
                <span className="script">choose you</span>
              </h2>
              <p className="section-description">
                Not because everything is always easy, but because what we have is real.
              </p>
            </div>

            <div className="reason-container">
              <div className={`reason-card ${animateReason ? 'animate' : ''}`}>
                <div>
                  <p className="reason-text">{reasons[currentReason]}</p>
                  <p className="reason-counter">{`${currentReason + 1} OF ${reasons.length}`}</p>
                </div>
              </div>

              <button className="primary-button" onClick={handleNextReason}>
                {currentReason === reasons.length - 1 ? 'Read my final message' : 'Show me another reason'}
              </button>
            </div>
          </div>
        </section>

        <section className={`section ${showSections.finale ? '' : 'hidden-section'}`} ref={finaleSectionRef} id="finaleSection">
          <div className="glass-card section-card finale-card">
            <p className="eyebrow">One last thing</p>
            <h2>
              Tap my heart,
              <span className="script">Lejanie</span>
            </h2>
            <p className="section-description">
              There is something I want to tell you honestly.
            </p>

            <button className="heart-button" onClick={handleOpenLetter} aria-label="Open my letter">💗</button>
            <p className="tap-label">Open my letter</p>

            <article className={`letter ${showLetter ? 'visible' : ''}`} ref={loveLetterRef}>
              <h3>My dearest Lejanie,</h3>
              <p>
                I made this little website because sometimes I do not know how to explain everything I feel when I am talking to you. I tease you, I make jokes about you, and I can be very clingy, but behind all of that is someone who is genuinely thankful that you came into his life.
              </p>
              <p>
                We have known each other for two years and three months. I spent one year and three months courting you, and now we have reached one year as a couple. Looking back, I realize that what we have was not built in one perfect moment. It was built through patience, conversations, laughter, misunderstandings, forgiveness and the choice to keep trying.
              </p>
              <p>
                I still smile whenever I remember the first time we met. You were at the counter buying something, then you saw me and became so nervous that the coins fell from your hands. I know I will probably keep teasing you about it, but the truth is that memory is precious to me. It was an ordinary moment that became the start of someone extraordinary entering my life.
              </p>
              <p>
                I know the past few days have not been easy for us. We have gone through things that tested our patience and understanding. But even during difficult moments, I appreciate that you are still yourself. I appreciate the real you - not a perfect version, not someone who never makes mistakes, but the honest and genuine person I have come to know and love.
              </p>
              <p>
                Thank you for staying, for trying, for listening and for allowing me to be part of your life. Thank you for accepting my teasing, my clinginess and even the times when I may be difficult to understand. I may not always express myself perfectly, but please know that my feelings for you are real.
              </p>
              <p>
                I do not expect our relationship to be perfect. I only hope that, whatever challenges come, we continue to communicate, understand each other and remember why we chose one another. I want us to grow not only as a couple, but also as two people who support each other.
              </p>
              <p>
                Happy one year to us, my love. After everything we have experienced, I am still here, still clingy, still teasing you, still choosing you and still grateful that the girl who dropped her coins that day became the girl who now holds such an important place in my heart.
              </p>
              <div className="signature">
                With all my love,<br />
                Venjie
              </div>
            </article>

            <p className="tiny-note">Made especially for Lejanie Pol Delacruz 💗</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
