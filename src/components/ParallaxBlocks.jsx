import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pc1 from '../assets/pictures/pc1.webp'
import pc2 from '../assets/pictures/pc2.webp'
import Mobile2 from '../assets/pictures/Mobile2.webp'
import Mobile1 from '../assets/pictures/Mobile1.jpg'



gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBlocks() {

  const sectionRef = useRef(null);
  const pc1Ref = useRef(null);
  const pc2Ref = useRef(null);
  const pc3Ref = useRef(null);

  const mobile1Ref = useRef(null);
  const mobile2Ref = useRef(null);
  const mobile3Ref = useRef(null);

  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const lastItem = track.lastElementChild;

      const totalScroll =
        track.scrollWidth - section.offsetWidth;

      const stopAt =
        lastItem.offsetLeft +
        lastItem.offsetWidth / 2 -
        section.offsetWidth;

      const maxTranslate = Math.min(totalScroll, stopAt);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 30%",
          end: () => `+=${maxTranslate + 1400}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          // markers: true,
          invalidateOnRefresh: true,
        },
      });

      // 🔹 PHASE 1 – entrance animations
      tl.from(pc1Ref.current, { x: 50 })
        .from(mobile1Ref.current, { opacity: 0, y: 50 }, "<")
        .from(pc2Ref.current, { scale: 1.4 }, "<")
        .from(mobile2Ref.current, { y: -50 }, "<");



      // 🔹 PHASE 2 – horizontal scroll
      tl.to(track, {
        x: maxTranslate,
        ease: "none",
      },);

    }, sectionRef);

    return () => ctx.revert();
  }, []);





  return (
    <>

      <div  className="size-72  w-screen" >

      </div>
      <div ref={sectionRef} className="relative    overflow-visible">

        <div className="pointer-events-none absolute   inset-0 -left-[20%] flex gap-10 px-[10px]">
          <div ref={trackRef} className="flex gap-12 *:h-[44vh]">

            <img ref={pc1Ref} src={pc1} className="h-70   scale-[135%] object-contain " />
            <img ref={mobile1Ref} src={Mobile1} className="  aspect-[9/16]" />
            <img ref={pc2Ref} src={pc2} className="  scale-[135%]  object-contain" />
            <img ref={mobile2Ref} src={Mobile2} className="  aspect-[9/16]" />

            <img ref={pc3Ref} src={pc1} className="  scale-[135%] object-contain" />
          </div>

        </div>

        <div className="flex justify-start  overflow-x-auto  overflow-y-hidden px-[10px] opacity-0">

          <img src={pc1} className=" top-0 h-full object-contain" />
          <img src={Mobile1} className="shrink-0 h-70 " />
          <img src={pc2} className="shrink-0 h-70  " />

          <img src={Mobile2} className="h-[280px] aspect-[9/16]" />

          <img src={pc1} className="shrink-0 h-70  " />

        </div>

      </div>
        {/* <div style={{ height:  800 }} /> */}



    </>
  );
}
