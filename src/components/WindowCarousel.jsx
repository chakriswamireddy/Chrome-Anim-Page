import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import video from '../assets/pictures/carousel/slide-1.webm'
import img1 from '../assets/pictures/carousel/slide-2.webp'
import img2 from '../assets/pictures/carousel/slide-3.webp'
import img22 from '../assets/pictures/carousel/slide-3-2.webp'

import img3 from '../assets/pictures/carousel/slide-4.webp'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)


export default function WindowCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: false,
  });

  // Depth animation
  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      const progress = emblaApi.scrollProgress();

      emblaApi.slideNodes().forEach((slide, i) => {
        const snap = emblaApi.scrollSnapList()[i];
        const diff = snap - progress;

        gsap.to(slide, {
          scale: 1 - Math.abs(diff) * 0.15,
          opacity: 1 - Math.abs(diff) * 0.35,
          duration: 0.3,
          ease: "power3.out",
        });
      });
    };

    emblaApi.on("scroll", update);
    emblaApi.on("reInit", update);
    update();
  }, [emblaApi]);

  // Controls
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const videoMaskRef = useRef(null)

  const firstSlideRef = useRef(null)



  const items = [
    {
      type: 'video',
      src: video,
      heading: "Video preview",
      desc: "Watch how the experience comes together with smooth motion and interactions."
    },
    {
      src: img1,
      heading: "Stay on top of tabs",
      desc: "Chrome has tools to help you manage the tabs you’re not quite ready to close. Group, label, and colour-code your tabs to stay organised and work faster."
    },
    {
      src: img2,
      heading: "Optimised for your device",
      desc: "Chrome is built to work with your device across platforms. That means a smooth experience on whatever you’re working with."
    },
    {
      src: img3,
      heading: "Automatic updates",
      desc: "There’s a new Chrome update every four weeks, making it easy to have the newest features and a faster, safer browser."
    }
  ];



  const slidesRef = useRef([]);
  const introDoneRef = useRef(false);


  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      if (!introDoneRef.current) return;

      const progress = emblaApi.scrollProgress();
      const snaps = emblaApi.scrollSnapList();

      emblaApi.slideNodes().forEach((slide, i) => {
        const diff = snaps[i] - progress;
        const t = Math.abs(diff);

        gsap.to(slide, {
          scale: 1 - t * 0.15,
          opacity: 1 - t * 0.35,
          duration: 0.3,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };

    emblaApi.on("scroll", onScroll);
    onScroll();

    return () => emblaApi.off("scroll", onScroll);
  }, [emblaApi]);


  useEffect(() => {
  if (!emblaApi) return;

  const onSelect = () => {
    const index = emblaApi.selectedScrollSnap();

    if (index !== 0 && ScrollTrigger.getById("intro")) {
      ScrollTrigger.getById("intro").disable(false);
    }

    if (index === 0 && ScrollTrigger.getById("intro")) {
      ScrollTrigger.getById("intro").enable(false);
    }
  };

  emblaApi.on("select", onSelect);
  onSelect();

  return () => emblaApi.off("select", onSelect);
}, [emblaApi]);




  useLayoutEffect(() => {
    if (
      !firstSlideRef.current ||
      !videoRef.current ||
      !videoMaskRef.current ||
      !slidesRef.current.length 
    ) return;

    const ctx = gsap.context(() => {
      gsap.set(firstSlideRef.current, {
        transformOrigin: "50% 100%",
      });

      gsap.set(videoRef.current, {
        transformOrigin: "0% 100%",
      });

      const others = slidesRef.current.slice(1);

      gsap.timeline({
        scrollTrigger: {
          id: "intro",
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          // onLeave: () => {
          //   introDoneRef.current = true;
          //   gsap.set(slidesRef.current.slice(1), {
          //     scale: 1,
          //     clearProps: "transform",
          //   });
          // },
          // onUpdate: (self) => {
          //   if (self.progress >= 0.98) {
          //     introDoneRef.current = true;

          //     gsap.to(slidesRef.current.slice(1), {
          //       opacity: 1,
          //       duration: 0.2,
          //       overwrite: true,
          //     });
          //   }
          // },

        },
      })
        // First slide scales down
        .fromTo(
          firstSlideRef.current,
          {
            scale: 1.3,
            yPercent: 50,
          },
          {
            scale: 1,
            yPercent: 0,
            ease: "none",
          })



        // Video scales down INSIDE mask (Chrome-style crop)
        .fromTo(
          videoRef.current,
          { scale: 1.35 },
          { scale: 0.8, ease: "none" },
          0
        )

        // Optional: subtle upward parallax for realism
        .fromTo(
          videoRef.current,
          { y: 0, ease: "none" },
          { y: 120, x: -10, },
          0
        )

        // Push other slides away during intro
        .fromTo(
          others,
          {
            xPercent: 30,
            opacity: 0,
          },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
          },
          0
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);




  return (
    <div ref={sectionRef} className="border border-red-500 " >


      <div className="relative border  py-20">

        {/* Carousel */}

        <div ref={emblaRef}>
          <div className="flex   gap-12 px-[12vw]">
            {items.map((i, indx) => (
              <div
                key={indx}
                ref={(el) => {
                  slidesRef.current[indx] = el;
                  if (indx === 0) firstSlideRef.current = el;
                }}
                className="relative shrink-0 basis-[70vw] max-w-[70vw] h-[420px]
               rounded-3xl bg-white shadow-xl overflow-hidden"
              >

                <div className={` border h-full  ${indx == 2 ? "flex   gap-0 pl-10 justify-between" : "flex flex-col items-center justify-between"}  `} >

                  <div className={`${indx == 2 ? "flex  flex-col items-center justify-between border" : ""}`} >

                    <div className={`flex p-10   size-full ${indx == 2 ? "flex-col  " : ""}`} >
                      <p className="flex-1 text-bold" > {i.heading} </p>
                      <p className={` ${indx == 2 ? "text-[10px] " : "flex-2 "}`} > {i.desc} </p>

                    </div>
                    {indx == 2 &&
                      <img
                        src={img22}
                        className=" bg-white p-4 pb-8 border  max-w-32 rounded-xl   "
                      />
                    }
                  </div>


                  {i?.type == 'video' ?
                    <>

                      <div className="relative w-full max-w-[1100px] mx-auto">
                        <div
                          ref={videoMaskRef}
                          className="
 absolute
      left-0
      right-0
      -bottom-24
      z-10
      aspect-[16/9]
      overflow-hidden
      rounded-3xl
      shadow-xl"
                        >
                          <video
                            ref={videoRef}
                            src={video}
                            muted
                            autoPlay
                            loop
                            playsInline
                            className="
        absolute inset-0
        w-full h-full
        object-cover
        origin-top-left
        will-change-transform
      "
                          />
                        </div>
                      </div>



                    </>

                    :
                    <img
                      src={i.src}
                      className={`${indx == 2 ? " border w-[60%]    h-96 object-contain " : "self-start justify-self-start  border"}`}
                    />
                  }


                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="  flex gap-2 mt-4 px-[12vw] *:hover:bg-blue-100 " >
          <button
            onClick={scrollPrev}
            className=" 
                   h-12 w-12 rounded-full bg-white shadow-md
                   flex items-center justify-center
                    transition"
          >
            ‹
          </button>


          <button
            onClick={scrollNext}
            className="  
                   h-12 w-12 rounded-full bg-white shadow-md
                   flex items-center justify-center
                   hover:scale-110 transition"
          >
            ›
          </button>

        </div>




        {/* Prev Button */}
      </div>
      <div style={{ height: '800px' }} />
    </div>
  );
}

