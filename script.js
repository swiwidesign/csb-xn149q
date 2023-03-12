window.addEventListener("DOMContentLoaded", (event) => {
  // lenis

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: "vertical", // vertical, horizontal
    gestureDirection: "vertical", // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // GENERIC CODE
  gsap.registerPlugin(ScrollTrigger);

  // apply parallax effect to any element with a data-speed attribute
  gsap.utils.toArray("[data-speed]").forEach((el) => {
    gsap.to(el, {
      y: function () {
        return (
          (1 - parseFloat(el.getAttribute("data-speed"))) *
          (ScrollTrigger.maxScroll(window) -
            (this.scrollTrigger ? this.scrollTrigger.start : 0))
        );
      },
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "max",
        invalidateOnRefresh: true,
        scrub: true
      }
    });
  });
  //FOOTER
  //footer marquee
  let footerMarquee = gsap.timeline({ repeat: -1 });
  footerMarquee.fromTo(
    ".footer_marquee-track",
    {
      xPercent: 0
    },
    {
      xPercent: -50,
      duration: 14,
      ease: "none"
    }
  );
  //footer instagram button image reveal
  let instagram = document.querySelector("[insta-button]");
  let instaAni = gsap.to(".footer_insta-image", {
    paused: true,
    marginTop: "0%",
    stagger: 0.2,
    ease: "ease"
  });

  instagram.addEventListener("mouseenter", () => instaAni.play());
  instagram.addEventListener("mouseleave", () => instaAni.reverse());
  //END CODE
});
