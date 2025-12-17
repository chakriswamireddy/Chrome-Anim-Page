import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import item1 from "../assets/pictures/accordian/themes.webm"
import item2 from "../assets/pictures/accordian/autofill.webp"
import item3 from "../assets/pictures/accordian/tab-sync.webp"


const FEATURES = [
  {
    id: 0,
    title: "Customise your Chrome",
    desc: "Personalise your web browser with themes and dark mode.",
    video: item1,
  },
  {
    id: 1,
    title: "Browse across devices",
    desc: "Continue where you left off on any device.",
    image: item2,
  },
  {
    id: 2,
    title: "Save time with autofill",
    desc: "Passwords and forms filled instantly.",
    image:item3
  },
];


export default function FeatureAccordion() {
  const [active, setActive] = useState(0);
  const panelsRef = useRef([]);
  const intervalRef = useRef(null);

 
  useEffect(() => {
    panelsRef.current.forEach((el, i) => {
      if (!el) return;

      const content = el.querySelector(".content");

      if (i === active) {
        gsap.to(content, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [active]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % FEATURES.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = (i) => {
    clearInterval(intervalRef.current);
    setActive(i);
  };

  const mediaRef = useRef(null);

useEffect(() => {
  const el = mediaRef.current;
  if (!el) return;

  gsap.killTweensOf(el);

  gsap.fromTo(
    el,
    { opacity: 0.5, scale: 1.03 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    }
  );
}, [active]);

  return (
    <section className="flex gap-16   justify-center items-center px-10">
      {/* LEFT VISUAL */}
      <div ref={mediaRef} className="size-96 rounded-3xl overflow-hidden bg-black">
        { FEATURES[active].image ?
        <img
          src={FEATURES[active].image}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        :
        <video loop src={ FEATURES[active].video }  className="w-full h-full object-cover transition-opacity duration-500" />

      }
      </div>

      {/* RIGHT ACCORDION */}
      <div className="flex flex-col gap-6 w-[420px]">
        {FEATURES.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (panelsRef.current[i] = el)}
            onClick={() => handleClick(i)}
            className="cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-[3px] rounded-full transition-all duration-300 ${
                  active === i ? "bg-blue-600 h-10" : "bg-gray-300 h-6"
                }`}
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <div className="content overflow-hidden h-0 opacity-0">
                  <p className="text-gray-600 mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
