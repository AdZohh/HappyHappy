import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Music, VolumeX, Gift, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

interface InteractiveMessage {
  id: string;
  text: string;
  revealed: boolean;
}

export default function BirthdayPage() {
  const [giftOpened, setGiftOpened] = useState(false);
  const [lidOpening, setLidOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [interactiveMessages, setInteractiveMessages] = useState<
    InteractiveMessage[]
  >([
    {
      id: "msg1",
      text: "Siempre te elijo mi niña, nunca dudes eso.",
      revealed: false,
    },
    {
      id: "msg2",
      text: "Gracias por llegar a mi vida y hacerla más bonita.",
      revealed: false,
    },
    {
      id: "msg3",
      text: "Disfruta tu día, te lo mereces mi niñita.",
      revealed: false,
    },
  ]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heartIdRef = useRef(0);

  const launchConfetti = () => {
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = [
      "#ffc0cb",
      "#ff69b4",
      "#ffb6c1",
      "#fff0f5",
      "#ffe4e1",
      "#ffd700",
    ];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: colors,
    });

    frame();
  };

  const handleGiftClick = () => {
    if (!giftOpened && !lidOpening) {
      setLidOpening(true);

      setTimeout(() => {
        launchConfetti();
      }, 400);

      setTimeout(() => {
        setGiftOpened(true);
      }, 800);

      setTimeout(() => {
        setShowContent(true);
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
          audioRef.current
            .play()
            .then(() => {
              setIsMusicPlaying(true);
            })
            .catch(() => {
              console.log("Autoplay blocked - user can enable music manually");
            });
        }
      }, 1500);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const createFloatingHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart: FloatingHeart = {
      id: heartIdRef.current++,
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  const revealMessage = (id: string) => {
    setInteractiveMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, revealed: true } : msg)),
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: "url('/mifondo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="fixed inset-0 bg-pink-100/30" />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-pink-300/50 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Sparkles
              className="animate-sparkle"
              style={{
                animationDelay: `${Math.random() * 2}s`,
                width: `${12 + Math.random() * 16}px`,
                height: `${12 + Math.random() * 16}px`,
              }}
            />
          </div>
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-floating-particle text-pink-400/40"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          >
            <Heart className="w-4 h-4 fill-current" />
          </div>
        ))}
      </div>

      <audio ref={audioRef} loop preload="auto" src="micancion.mp3" />

      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 animate-float-up"
          style={{ left: heart.x - 12, top: heart.y }}
        >
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
        </div>
      ))}

      <AnimatePresence mode="wait">
        {!giftOpened ? (
          <motion.div
            key="gift"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
          >
            <button
              onClick={handleGiftClick}
              className="group relative cursor-pointer focus:outline-none"
              data-testid="button-gift-box"
            >
              <div className="relative animate-float">
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <div className="absolute bottom-0 w-full h-36 md:h-40 bg-gradient-to-b from-pink-400 to-pink-500 rounded-lg shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-full bg-pink-300/50" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-4 bg-pink-300/50" />
                    </div>
                  </div>

                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-full origin-bottom transition-all duration-500 ${lidOpening ? "animate-lid-open" : ""}`}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                  >
                    <div
                      className={`w-full h-12 md:h-14 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-lg shadow-md ${!lidOpening ? "animate-shake" : ""}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-full bg-pink-200/50" />
                      </div>
                    </div>

                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        <div className="w-8 h-12 bg-pink-300 rounded-full transform -rotate-45 absolute -left-4" />
                        <div className="w-8 h-12 bg-pink-300 rounded-full transform rotate-45 absolute -right-4" />
                        <div className="w-4 h-4 bg-pink-400 rounded-full absolute left-1/2 -translate-x-1/2 top-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-4 rounded-full bg-pink-300/30 blur-xl group-hover:bg-pink-400/40 transition-all duration-300 animate-pulse" />
              </div>

              <div className="mt-8 text-center">
                <p
                  className="text-2xl md:text-3xl font-script text-pink-600 animate-pulse-glow"
                  data-testid="text-tap-me"
                >
                  Tap Tap aquí
                </p>
                <div className="mt-2 flex items-center justify-center gap-2 text-pink-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-sans">
                    para abrir el regalito
                  </span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-10 min-h-screen py-8 px-4 md:px-6"
          >
            {showContent && (
              <button
                onClick={toggleMusic}
                className="fixed top-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-pink-200 hover:scale-110 transition-transform animate-rainbow-glow"
                data-testid="button-music-toggle"
              >
                {isMusicPlaying ? (
                  <Music className="w-5 h-5 text-pink-500" />
                ) : (
                  <VolumeX className="w-5 h-5 text-pink-400" />
                )}
              </button>
            )}

            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-lg mx-auto"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.5 }}
                      className="inline-flex items-center justify-center gap-3 mb-4"
                    >
                      <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-heart-beat" />
                      <Gift className="w-8 h-8 text-pink-400" />
                      <Heart
                        className="w-6 h-6 text-pink-500 fill-pink-500 animate-heart-beat"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </motion.div>
                    <h1
                      className="text-4xl md:text-5xl font-serif text-gradient-pink glow-pink mb-2"
                      data-testid="text-title"
                    >
                      Feliz Cumpleaños
                    </h1>
                    <p className="text-2xl md:text-3xl font-script text-pink-500 animate-pulse-glow">
                      Mi Amor
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-pink-200 card-glow"
                    data-testid="card-letter"
                  >
                    <div className="space-y-6 text-gray-700 font-sans text-base md:text-lg leading-relaxed">
                      <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-pink-500 first-letter:mr-1 first-letter:float-left">
                        Hoy es un día muy especial, hoy es tu día, y no quería
                        que fuera solo un "feliz cumpleaños" más del monton.
                        Quería que fuera un recordatorio de lo importante que
                        eres para mí y de lo agradecido que estoy con Dios por
                        haberte puesto en mi vida. Llegaste y mi vida fue
                        distinta, me diste compañia y el sentido más grande que
                        es siempre buscar hacer feliz a mi niña hermosa.
                      </p>

                      <div className="flex justify-center py-2">
                        <button
                          onClick={createFloatingHeart}
                          className="group p-3 rounded-full bg-pink-50 border border-pink-200 transition-transform active:scale-95"
                          data-testid="button-heart-1"
                        >
                          <Heart className="w-8 h-8 text-pink-400 group-hover:text-pink-500 group-hover:fill-pink-500 transition-all" />
                        </button>
                      </div>

                      <p>
                        Sé que a veces puedes sentir que no te priorizo por
                        algunas acciones o decisiones que tomo, y quiero que
                        sepas que te entiendo mi amor y lo siento tanto. Nunca
                        ha sido mi intención hacerte sentir menos imporante,
                        porque tú eres mi prioridad. Aunque tenga amigos y no
                        sé, a veces la pase con ellos, tú sigues siendo la
                        persona que siempre elijo, con la que quiero estar y con
                        la que me siento en mi mejor versión.
                      </p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="relative py-4"
                      >
                        {!interactiveMessages[0].revealed ? (
                          <button
                            onClick={() => revealMessage("msg1")}
                            className="w-full py-4 px-6 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl border border-dashed border-pink-300 text-pink-500 font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                            data-testid="button-reveal-1"
                          >
                            <Star className="w-5 h-5" />
                            <span>Tap para ver el mensaje oculto</span>
                            <Star className="w-5 h-5" />
                          </button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4 px-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200"
                          >
                            <p className="text-lg font-script text-pink-600">
                              "{interactiveMessages[0].text}"
                            </p>
                          </motion.div>
                        )}
                      </motion.div>

                      <p>
                        Gracias por acompañarme, por escucharme, por ser mi
                        apoyo incondicional y también por tenerme tanta
                        paciencia xd Me ecanta compartir mucho contigo, reirnos,
                        jugar, ver pelis y se que juntos vamos a crecer y
                        aprender a querernos mejor cada día. No eres solo mi
                        pareja, eres mi todo.
                      </p>

                      <div className="flex justify-center gap-4 py-2">
                        <button
                          onClick={createFloatingHeart}
                          className="group p-2 rounded-full bg-pink-50 border border-pink-200 transition-transform active:scale-95"
                          data-testid="button-heart-2"
                        >
                          <Sparkles className="w-6 h-6 text-pink-400 group-hover:text-pink-500" />
                        </button>
                        <button
                          onClick={createFloatingHeart}
                          className="group p-3 rounded-full bg-pink-50 border border-pink-200 transition-transform active:scale-95"
                          data-testid="button-heart-3"
                        >
                          <Heart className="w-8 h-8 text-pink-400 group-hover:text-pink-500 group-hover:fill-pink-500" />
                        </button>
                        <button
                          onClick={createFloatingHeart}
                          className="group p-2 rounded-full bg-pink-50 border border-pink-200 transition-transform active:scale-95"
                          data-testid="button-heart-4"
                        >
                          <Sparkles className="w-6 h-6 text-pink-400 group-hover:text-pink-500" />
                        </button>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="relative py-4"
                      >
                        {!interactiveMessages[1].revealed ? (
                          <button
                            onClick={() => revealMessage("msg2")}
                            className="w-full py-4 px-6 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl border border-dashed border-pink-300 text-pink-500 font-medium flex items-center justify-center gap-2"
                            data-testid="button-reveal-2"
                          >
                            <Heart className="w-5 h-5" />
                            <span>Oh cielos viejo, otro mensaje oculto</span>
                            <Heart className="w-5 h-5" />
                          </button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4 px-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-pink-200"
                          >
                            <p className="text-lg font-script text-pink-600">
                              "{interactiveMessages[1].text}"
                            </p>
                          </motion.div>
                        )}
                      </motion.div>

                      <p>
                        En este nuevo año de tu vida solo deseo que seas feliz,
                        que te sientas amada y tranquila y que nunca dudes de lo
                        que significas para mí. Aquí estoy, contigo, caminando a
                        tu lado, no porque tenga que hacerlo, sino porque de
                        verdad quiero hacerlo, estar a tu lado por el resto de
                        mi vida.
                      </p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="relative py-4"
                      >
                        {!interactiveMessages[2].revealed ? (
                          <button
                            onClick={() => revealMessage("msg3")}
                            className="w-full py-4 px-6 bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100 rounded-xl border border-dashed border-pink-300 text-pink-500 font-medium flex items-center justify-center gap-2"
                            data-testid="button-reveal-3"
                          >
                            <Sparkles className="w-5 h-5" />
                            <span>Tap Tap</span>
                            <Sparkles className="w-5 h-5" />
                          </button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4 px-6 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 rounded-xl border border-pink-200"
                          >
                            <p className="text-xl font-script text-pink-600">
                              "{interactiveMessages[2].text}"
                            </p>
                          </motion.div>
                        )}
                      </motion.div>

                      <div className="pt-6 text-center border-t border-pink-100">
                        <p className="text-xl font-script text-pink-600 mb-4">
                          Con todo mi amor,
                        </p>
                        <p
                          className="text-2xl font-serif text-pink-500"
                          data-testid="text-signature"
                        >
                          ⚡︎ AdZo ⚡︎
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-8 text-center"
                  >
                    <button
                      onClick={() => launchConfetti()}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-medium shadow-lg transition-transform active:scale-95"
                      data-testid="button-more-confetti"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Tap Tap aquí</span>
                      <Sparkles className="w-5 h-5" />
                    </button>
                  </motion.div>

                  <div className="mt-12 flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Heart
                        key={i}
                        className="w-4 h-4 text-pink-300 fill-pink-300 animate-heart-beat"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
