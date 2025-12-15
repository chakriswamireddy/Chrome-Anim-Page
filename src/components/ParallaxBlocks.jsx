import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBlocks() {

  const sectionRef = useRef(null);
  const pc1Ref = useRef(null);
  const pc2Ref = useRef(null);
  const pc3Ref = useRef(null);

  const mobile1Ref = useRef(null);
  const mobile2Ref = useRef(null);
  const mobile3Ref = useRef(null);


  useLayoutEffect(() => {
    if (!sectionRef.current || !pc1Ref.current || !pc2Ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(pc1Ref.current, {
        width: "20vw",
        y: -80,
        ease: "none",
      }).to(
        pc2Ref.current,
        {
          width: "20vw",
          y: 80,
          ease: "none",
        },
        0
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(pc1Ref.current, {
        x: x * 0.03,
        y: y * 0.03,
        duration: 0.3,
        overwrite: "auto",
      });

      gsap.to(pc2Ref.current, {
        x: x * -0.03,
        y: y * -0.03,
        duration: 0.3,
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
 
      <div className="size-40 border w-screen" >

      </div>
      <section
        ref={sectionRef}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 5vw",
          overflowX: "hidden",
          height:"500px",
          border:'1px soild blue'
        }}
      >
        <div
          ref={pc1Ref}  className="w-[300px] h-[280px] bg-[#2a1abd] -mt-40  "
          style={{translate:"100px 0" , }}
         
        />
        <div
          ref={mobile1Ref}
          className="w-[50vw] h-[280px] bg-[#a4bd1a] "
        > Mobile</div>
        <div
          ref={pc2Ref}
          style={{
            width: "50vw",
            height: "280px",
            background: "#4f46e5",
          }}
        />
         <div
          ref={mobile2Ref}
          className="w-[50vw] h-[280px] bg-[#ad3b6b] "
        > Mobile</div>
        <div
          ref={pc3Ref}
          style={{
            width: "50vw",
            height: "280px",
            background: "#22c55e",
          }}
        />

      </section>

      <section style={{ height: "100vh" }} />
    </>
  );
}
