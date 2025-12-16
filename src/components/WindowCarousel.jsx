// import useEmblaCarousel from "embla-carousel-react";
// import { useEffect, useCallback, useRef, useLayoutEffect, useState } from "react";
// import gsap from "gsap";
// import video from '../assets/pictures/carousel/slide-1.webm'
// import img1 from '../assets/pictures/carousel/slide-2.webp'
// import img2 from '../assets/pictures/carousel/slide-3.webp'
// import img22 from '../assets/pictures/carousel/slide-3-2.webp'

// import img3 from '../assets/pictures/carousel/slide-4.webp'
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger)


// export default function WindowCarousel() {
//     const [emblaRef, emblaApi] = useEmblaCarousel({
//         align: "center",
//         loop: false,
//     });

//     // Depth animation
//     useEffect(() => {
//         if (!emblaApi) return;

//         const update = () => {
//             const progress = emblaApi.scrollProgress();

//             emblaApi.slideNodes().forEach((slide, i) => {
//                 const snap = emblaApi.scrollSnapList()[i];
//                 const diff = snap - progress;

//                 gsap.to(slide, {
//                     scale: 1 - Math.abs(diff) * 0.15,
//                     opacity: 1 - Math.abs(diff) * 0.35,
//                     duration: 0.3,
//                     ease: "power3.out",
//                 });
//             });
//         };

//         emblaApi.on("scroll", update);
//         emblaApi.on("reInit", update);
//         update();
//     }, [emblaApi]);

//     // Controls
//     const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
//     const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

//     const sectionRef = useRef(null)
//     const videoRef = useRef(null)


//     const items = [
//         {
//             type: 'video',
//             src: video,
//             heading: "Video preview",
//             desc: "Watch how the experience comes together with smooth motion and interactions."
//         },
//         {
//             src: img1,
//             heading: "Stay on top of tabs",
//             desc: "Chrome has tools to help you manage the tabs you’re not quite ready to close. Group, label, and colour-code your tabs to stay organised and work faster."
//         },
//         {
//             src: img2,
//             heading: "Optimised for your device",
//             desc: "Chrome is built to work with your device across platforms. That means a smooth experience on whatever you’re working with."
//         },
//         {
//             src: img3,
//             heading: "Automatic updates",
//             desc: "There’s a new Chrome update every four weeks, making it easy to have the newest features and a faster, safer browser."
//         }
//     ];


//     const [activeIndex, setActiveIndex] = useState(0);

//     useEffect(() => {
//         if (!emblaApi || !videoRef.current) return;

//         const onScroll = () => {
//             const snaps = emblaApi.scrollSnapList();
//             const progress = emblaApi.scrollProgress();

//             // video slide index = 0
//             const diff = snaps[0] - progress;

//             // Clamp 0 → 1
//             const t = gsap.utils.clamp(0, 1, 1 - Math.abs(diff) * 2);

//             gsap.to(videoRef.current, {
//                 scale: 0.8 + 0.4 * t, // 1.2 → 0.8
//                 overwrite: true,
//                 ease: "none",
//                 duration: 0.1,
//             });
//         };

//         emblaApi.on("scroll", onScroll);
//         onScroll();

//         return () => emblaApi.off("scroll", onScroll);
//     }, [emblaApi]);



//     // useLayoutEffect(() => {
//     //     if (!videoRef.current) return;

//     //     let st;

//     //     if (activeIndex === 0) { // 👈 video slide index
//     //         st = gsap.fromTo(
//     //             videoRef.current,
//     //             { scale: 1.2 },
//     //             {
//     //                 scale: 0.8,
//     //                 ease: "none",
//     //                 scrollTrigger: {
//     //                     trigger: emblaRef.current,   // 👈 NOT the slide
//     //                     start: "top 60%",
//     //                     end: "top 30%",
//     //                     scrub: true,
//     //                     invalidateOnRefresh: true,
//     //                 },
//     //             }
//     //         );
//     //     }

//     //     return () => {
//     //         if (st) {
//     //             st.scrollTrigger?.kill();
//     //             st.kill();
//     //         }
//     //     };
//     // }, [activeIndex]);








//     return (
//         <>


//             <div className="relative border  py-20">




//                 {/* Carousel */}

//                 <div ref={emblaRef}>
//                     <div className="flex   gap-12 px-[12vw]">
//                         {items.map((i, indx) => (
//                             <div
//                                 key={indx}
//                                 className="min-w-[70vw] h-[420px] rounded-3xl bg-white shadow-xl "
//                             >
//                                 <div className={` border h-full w-full ${indx == 2 ? "flex   gap-0 pl-10 justify-between" : "flex flex-col items-center justify-between"}  `} >

//                                     <div className={`${indx == 2 ? "flex  flex-col items-center justify-between border" : ""}`} >

//                                         <div className={`flex p-10   size-full ${indx == 2 ? "flex-col  " : ""}`} >
//                                             <p className="flex-1 text-bold" > {i.heading} </p>
//                                             <p className={` ${indx == 2 ? "text-[10px] " : "flex-2 "}`} > {i.desc} </p>

//                                         </div>
//                                         {indx == 2 &&
//                                             <img
//                                                 src={img22}
//                                                 className=" bg-white p-4 pb-8 border  max-w-32 rounded-xl   "
//                                             />
//                                         }
//                                     </div>


//                                     {i?.type == 'video' ?
//                                         <>
//                                             <section
//                                                 className=" z-99999  w-full h-[420px] absolute -translate-y-60 inset-0 border border-red-500  ">
//                                                 <video
//                                                     ref={videoRef}
//                                                     src={video}
//                                                     loop
//                                                     muted
//                                                     playsInline
//                                                     className="    w-full  h-full object-cover  will-change-transform"
//                                                 />
//                                             </section>
//                                         </>

//                                         :
//                                         <img
//                                             src={i.src}
//                                             className={`${indx == 2 ? " border w-[60%]    h-96 object-contain " : "self-start justify-self-start  border"}`}
//                                         />
//                                     }


//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="  flex gap-2 mt-4 px-[12vw] *:hover:bg-blue-100 " >
//                     <button
//                         onClick={scrollPrev}
//                         className=" 
//                    h-12 w-12 rounded-full bg-white shadow-md
//                    flex items-center justify-center
//                     transition"
//                     >
//                         ‹
//                     </button>


//                     <button
//                         onClick={scrollNext}
//                         className="  
//                    h-12 w-12 rounded-full bg-white shadow-md
//                    flex items-center justify-center
//                    hover:scale-110 transition"
//                     >
//                         ›
//                     </button>

//                 </div>




//                 {/* Prev Button */}
//             </div>
//             <div style={{ height: '800px' }} />
//         </>
//     );
// }


import slide1Video from "../assets/pictures/carousel/slide-1.webm";
import slide2Img from "../assets/pictures/carousel/slide-2.webp";
import slide3Img from "../assets/pictures/carousel/slide-3.webp";
import slide4Img from "../assets/pictures/carousel/slide-4.webp";







import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const items = [
  {
    type: "video",
    src: slide1Video,
    heading: "Stay productive",
    desc: "Work faster with tabs and organised spaces",
  },
  {
    type: "image",
    src: slide2Img,
    heading: "Switch instantly",
    desc: "Jump between tasks without losing focus",
  },
  {
    type: "image",
    src: slide3Img,
    heading: "Clean layout",
    desc: "Everything you need, nothing you don’t",
  },
  {
    type: "image",
    src: slide4Img,
    heading: "Built for speed",
    desc: "Optimised for performance and clarity",
  },
];


export default function ChromeStyleCarousel({ items }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center" });
  const mediaRefs = useRef([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      const snaps = emblaApi.scrollSnapList();
      const progress = emblaApi.scrollProgress();

      mediaRefs.current.forEach((el, i) => {
        if (!el) return;

        const diff = snaps[i] - progress;
        const t = gsap.utils.clamp(0, 1, 1 - Math.abs(diff) * 2);

        gsap.to(el, {
          scale: 0.85 + 0.35 * t, // zoom when centered
          ease: "none",
          duration: 0.15,
          overwrite: true,
        });
      });
    };

    emblaApi.on("scroll", onScroll);
    onScroll();

    return () => emblaApi.off("scroll", onScroll);
  }, [emblaApi]);

  return (
    <div className="relative py-20 overflow-hidden">
      {/* CAROUSEL */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-12 px-[12vw]">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 min-w-[70vw] h-[420px]
                         rounded-3xl bg-white shadow-xl overflow-hidden"
            >
              {/* MEDIA */}
              <div className="absolute inset-0">
                {item.type === "video" ? (
                  <video
                    ref={(el) => (mediaRefs.current[i] = el)}
                    src={item.src}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover
                               will-change-transform"
                  />
                ) : (
                  <img
                    ref={(el) => (mediaRefs.current[i] = el)}
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover
                               will-change-transform"
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="relative z-10 p-10 text-white max-w-md">
                <h3 className="text-xl font-semibold">{item.heading}</h3>
                <p className="mt-2 text-sm opacity-80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-3 mt-6 px-[12vw]">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="h-12 w-12 rounded-full bg-white shadow
                     flex items-center justify-center"
        >
          ‹
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="h-12 w-12 rounded-full bg-white shadow
                     flex items-center justify-center"
        >
          ›
        </button>
      </div>
    </div>
  );
}
