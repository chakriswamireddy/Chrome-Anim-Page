import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import imageA from '../assets/pictures/wallpaper.webp'
import imageB from '../assets/pictures/pc1.webp'
import pc2 from '../assets/pictures/pc2.webp'




gsap.registerPlugin(ScrollTrigger);

export default function PinnedHeroReveal() {
    const sectionRef = useRef(null);
    const imgARef = useRef(null);
    const imgBRef = useRef(null);
    const maskRef = useRef(null);
    const insideMaskRef = useRef(null);

    const spaceRef = useRef(null);
    const pc2Ref = useRef(null);




    useLayoutEffect(() => {
        if (!sectionRef.current || !imgARef.current || !imgBRef.current) return;


        const ctx = gsap.context(() => {

            const imgHeight = imgARef.current.offsetHeight;
            const imgBHeight = imgBRef.current.offsetHeight;


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,


                    start: "top top",

                    // Scroll budget for the reveal (increase for slower flow)
                    end: "+=1200",

                    scrub: 0.6,        
                    pin: true,          
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    

                },
            });

            tl.addLabel("intro");

            tl.fromTo(
                imgARef.current,
                { scale: 0.6 },
                { scale: 0.7, ease: "none" },
                "intro"
            );

            tl.fromTo(
                imgBRef.current,
                { scale: 0.6, opacity: 0 },
                { scale: 0.7, opacity: 1, ease: "none" },
                "intro"
            );

            // PHASE 2 — mask A shrinks
            tl.addLabel("maskA");

            tl.to(
                maskRef.current,
                { height: imgARef.current.offsetHeight * 0.4, ease: "none" },
                "maskA"
            );

            // PHASE 3 — mask B shrinks
            tl.addLabel("maskB");

            tl.to(
                insideMaskRef.current,
                { height: imgBRef.current.offsetHeight * 0.4, ease: "none" },
                "maskB"
            );

            // PHASE 4 — reveal final image
            tl.addLabel("final", 0);
            tl.to(
                pc2Ref.current,
                { opacity: 1, ease: "none" },
                "final"
            );


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>

            <section />

            {/* HERO SCENE */}
            <section ref={sectionRef} className="relative h-screen overflow-hidden">

                {/* MASK A (top layer) */}
                <div
                    ref={maskRef}
                    className="absolute inset-0 overflow-hidden z-30"
                >
                    <img
                        ref={imgARef}
                        src={imageA}
                        className="absolute inset-0 w-full    "
                    />
                </div>

                {/* MASK B   */}
                <div
                    ref={insideMaskRef}
                    className="absolute inset-0 overflow-hidden z-20"
                >
                    <img
                        ref={imgBRef}
                        src={imageB}
                        className="absolute inset-0 w-full  "
                    />
                </div>

                {/* FINAL IMAGE (bottom) */}

                <img
                    ref={pc2Ref}
                    src={pc2}
                    className="absolute inset-0 w-full scale-[0.7]    z-10 opacity-0"
                />

            </section>

            <div ref={spaceRef} style={{ height: "1200px" }} />

        </>
    );
}
