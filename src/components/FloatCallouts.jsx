import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
import pc2 from '../assets/pictures/pc2.webp'



 
import BrushIcon from "@mui/icons-material/Brush";
import DevicesIcon from "@mui/icons-material/Devices";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export const FEATURES = [
  {
    id: 1,
    icon: BrushIcon,
    color: "#8AB4F8",
    x: -160,
    y: -120,
  },
  {
    id: 2,
    icon: DevicesIcon,
    color: "#F28B82",
    x: 160,
    y: -120,
  },
  {
    id: 3,
    icon: AutoFixHighIcon,
    color: "#81C995",
    x: 180,
    y: 60,
  },
  {
    id: 4,
    icon: SecurityIcon,
    color: "#FDD663",
    x: -180,
    y: 90,
  },
  {
    id: 5,
    icon: ShoppingBagIcon,
    color: "#C58AF9",
    x: 0,
    y: -100,
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function FloatCallouts() {
  const sectionRef = useRef(null);
  const iconsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        iconsRef.current,
        {
          opacity: 0,
          scale: 0.8,
          x: (i) => FEATURES[i].x * 1.5,
          y: (i) => FEATURES[i].y * 1.5 ,
        },
        {
          opacity: 1,
          x: (i) => FEATURES[i].x,
          y: (i) => FEATURES[i].y,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom 90%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center  "
    >
      {/* HERO */}
      <div className="relative z-10 w-[600px] h-[340px] rounded-3xl      ">
        <img
          src= {pc2}
          alt="Chrome"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RADIAL ICONS */}
      {FEATURES.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            ref={(el) => (iconsRef.current[i] = el)}
            className="absolute flex z-10 items-center justify-center w-14 h-14 rounded-full shadow-md"
            style={{
              backgroundColor: item.color,
            }}
          >
            <Icon style={{ color: "#fff", fontSize: 28 }} />
          </div>
        );
      })}
      <div style={{height: '600px'}} />
    </section>
  );
}
