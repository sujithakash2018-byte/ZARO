/* ---------------------------------------
   SMALL UI EFFECTS
--------------------------------------- */

// Fade elements on load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-element").forEach((el, i) => {
    setTimeout(() => el.classList.add("showing"), 120 * i);
  });
});

/* ---------------------------------------
   TOP BAR SLIDING TEXTS
--------------------------------------- */
(function () {
  const words = document.querySelectorAll(".top-bar p");
  if (!words.length) return;
  let index = 0;
  let interval;

  function startSliding() {
    interval = setInterval(() => {
      const current = words[index];
      current.classList.remove("active");
      current.classList.add("exit");
      index = (index + 1) % words.length;
      const next = words[index];
      setTimeout(() => {
        current.classList.remove("exit");
        next.classList.add("active");
      }, 600);
    }, 2500);
  }

  function stopSliding() {
    clearInterval(interval);
  }

  startSliding();
  const topBar = document.querySelector(".top-bar");
  topBar.addEventListener("mouseenter", stopSliding);
  topBar.addEventListener("mouseleave", startSliding);
})();

/* ---------------------------------------
   VIDEO CONTROLS
--------------------------------------- */
(function () {
  const video = document.getElementById("premiumVideo");
  const overlay = document.getElementById("playOverlay");

  if (video && overlay) {
    overlay.addEventListener("click", () => {
      overlay.classList.add("hide");
      video.play();
    });

    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        overlay.classList.add("hide");
      } else {
        video.pause();
        overlay.classList.remove("hide");
      }
    });

    video.addEventListener("play", () => overlay.classList.add("hide"));
    video.addEventListener("pause", () => overlay.classList.remove("hide"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const videoSection = document.querySelector(".video-anim");
    if (videoSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("show");
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(videoSection);
    }
  });
})();

/* ---------------------------------------
   CENTER IMAGES — ZOOM + REFLECTION
--------------------------------------- */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const centerImages = document.querySelectorAll(".center-image");
    if (!centerImages.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-effect");
            setTimeout(() => entry.target.classList.add("reflection"), 300);
          } else {
            entry.target.classList.remove("show-effect", "reflection");
          }
        });
      },
      { threshold: 0.4 }
    );

    centerImages.forEach((img) => observer.observe(img));
  });
})();

/* ---------------------------------------
   3D CARD WHEEL
--------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const RADIUS =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--radius")
    ) || 420;
  const CENTER_LIFT =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--lift")
    ) || 130;

  const VISIBLE_RANGE = 3;
  const EDGE_RESIST = 0.4;
  const FRICTION = 0.92;
  const MIN_VEL = 0.015;

  const track = document.getElementById("track");
  let cards = [];

  /* Card Data */
  const CARD_DATA = [
    {
      img: "https://bunny-wp-pullzone-walceftkyh.b-cdn.net/wp-content/uploads/2025/11/Family-means-UNDERSTANDING-Thumbnail-Design-1-1270x720.jpg",
      title: "Love Fades Without Understanding – The Yogic Secret to a Peaceful Family!",
      desc: "Last Week-Newly Added!",
      btn: "Buy Now",
      bg: "#fff",
      link: "#",
    },
    {
      img: "https://bunny-wp-pullzone-walceftkyh.b-cdn.net/wp-content/uploads/2025/10/Paramporul-Masters-blackhole-class-1270x720.jpg",
      title: "Paramporul Masters — Blackhole Class",
      desc: "New",
      btn: "Buy Now",
      bg: "#fff",
      link: "#",
    },
    {
      img: "https://bunny-wp-pullzone-walceftkyh.b-cdn.net/wp-content/uploads/2025/10/Reduce-Stress-Thumbnail-Design-1270x720.jpg",
      title: "Reduce Stress — Mini Course",
      desc: "Popular",
      btn: "Buy Now",
      bg: "#fff",
      link: "#",
    },
    {
      img: "https://bunny-wp-pullzone-walceftkyh.b-cdn.net/wp-content/uploads/2025/10/Becomeing-Guru-Thumbnail-Design-1270x720.jpg",
      title: "Becoming Guru — Deep Practice",
      desc: "Hot",
      btn: "Buy Now",
      bg: "#fff",
      link: "#",
    },
    {
      img: "https://bunny-wp-pullzone-walceftkyh.b-cdn.net/wp-content/uploads/2025/10/DEEP-SECRETS-Thumbnail-Design-1270x720.jpg",
      title: "Deep Secrets",
      desc: "Exclusive",
      btn: "Buy Now",
      bg: "#fff",
      link: "#",
    },
    {
      img: "https://bunny-wp-pullzone-walceftkyh.b-cdn.net/wp-content/uploads/2025/09/Paramporul-Masters-Part-7-1270x720.jpg",
      title: "Masters Part 7",
      desc: "Part 7",
      btn: "Buy Now",
      bg: "#fff",
      link: "#",
    },
    {
      img: "https://bunny-wp-pullzone-walceftkyh.b-cdn.net/wp-content/uploads/2025/09/SILENCE-Thumbnail-Design-1270x720.jpg",
      title: "Silence",
      desc: "Classic",
      btn: "Buy Now",
      bg: "#fff",
      link: "#",
    },
  ];

  /* Build cards */
  CARD_DATA.forEach((data, i) => {
    const el = document.createElement("div");
    el.className = "card";
    el.dataset.i = i;
    el.style.background = data.bg;

    el.innerHTML = `
      <img src="${data.img}" alt="">
      <div class="meta">
        <h3 style="margin:0; font-size:13px; color:black;">${data.title}</h3>
        <button style="margin-top:6px; width:60%; padding:3px; border:none; border-radius:3px; background:red; color:white; font-size:11px; font-weight:bold; cursor:pointer;">
          ${data.desc}
        </button>

        <div class="price-row" aria-label="Price: was 1000, now 499" style="margin-top:8px;">
          <span class="original-price" aria-hidden="true">₹1000</span>
          <span class="sale-price">₹499</span>
          <span class="badge-off" aria-hidden="true">50% OFF</span>
        </div>

        <a href="${data.link}" target="_blank">
          <button style="width:100%; padding:10px; margin-top:8px; border:none; border-radius:10px; background:blue; color:#000; font-weight:bold; cursor:pointer;">
            ${data.btn}
          </button>
        </a>
      </div>
    `;

    track.appendChild(el);
    cards.push(el);
  });

  let center = 0;
  let maxIndex = cards.length - 1;
  let velocity = 0;
  let dragging = false;
  let pointerId = null;
  let lastX = 0;

  /* Render wheel */
  function render() {
    const computedRadius =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--radius")
      ) || RADIUS;
    const computedLift =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--lift")
      ) || CENTER_LIFT;

    for (let i = 0; i < cards.length; i++) {
      const el = cards[i];
      const offset = i - center;

      if (Math.abs(offset) > VISIBLE_RANGE + 0.8) {
        el.style.opacity = 0;
        el.style.pointerEvents = "none";
        continue;
      }
      el.style.opacity = 1;
      el.style.pointerEvents = "auto";

      const angle = offset * 24;
      const rad = (angle * Math.PI) / 180;

      const x = Math.sin(rad) * (computedRadius + 90);
      const y = Math.cos(rad) * computedRadius;

      const lift = computedLift * (1 - Math.min(1, Math.abs(offset)));
      const scale = 1 + 0.25 * (1 - Math.min(1, Math.abs(offset)));
      const rotateY = angle * -1.6;
      const tz = (1 - Math.min(1, Math.abs(offset))) * 120;

      el.style.transform = `
        translateX(${x}px)
        translateY(${-(y - computedRadius) - lift}px)
        translateZ(${tz}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

      el.style.zIndex = 1000 - Math.round(Math.abs(offset) * 10);

      if (Math.abs(offset) < 0.45) el.classList.add("front");
      else el.classList.remove("front");
    }
  }

  /* Pointer events */
  track.addEventListener("pointerdown", (e) => {
    if (!e.target.closest(".card")) return;
    dragging = true;
    pointerId = e.pointerId;
    track.setPointerCapture(pointerId);
    lastX = e.clientX;
    velocity = 0;
    track.classList.add("grabbing");
  });

  window.addEventListener("pointermove", (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;

    let delta = -dx / 210;
    let newCenter = center + delta;

    if (newCenter < 0) {
      const extra = -newCenter;
      delta *= Math.max(0.15, 1 - extra * (1 - EDGE_RESIST));
      newCenter = center + delta;
    }
    if (newCenter > maxIndex) {
      const extra = newCenter - maxIndex;
      delta *= Math.max(0.15, 1 - extra * (1 - EDGE_RESIST));
      newCenter = center + delta;
    }

    velocity = velocity * 0.5 + delta * 0.8;
    center = newCenter;
    render();
  });

  function endDrag(e) {
    if (!dragging || (e && e.pointerId !== pointerId)) return;
    dragging = false;
    try {
      track.releasePointerCapture(pointerId);
    } catch (err) {}

    pointerId = null;
    track.classList.remove("grabbing");
  }

  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  /* Wheel momentum */
  function loop() {
    if (!dragging) {
      if (Math.abs(velocity) > MIN_VEL) {
        center += velocity;
        velocity *= FRICTION;
      } else {
        velocity = 0;
        const nearest = Math.round(center);
        updateDots(nearest);

        const diff = nearest - center;
        if (Math.abs(diff) > 0.001) {
          center += diff * 0.18;
          if (Math.abs(diff) < 0.01) center = nearest;
        }
      }

      if (center < 0) {
        const pull = -center;
        center += pull * 0.18;
        velocity *= 0.6;
        if (pull < 0.001) center = 0;
      }

      if (center > maxIndex) {
        const pull = maxIndex - center;
        center += pull * 0.18;
        velocity *= 0.6;
        if (Math.abs(pull) < 0.001) center = maxIndex;
      }

      render();
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* Click to snap */
  track.addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (!c) return;
    const i = Number(c.dataset.i);
    if (Math.abs(i - center) > 0.2) velocity = (i - center) * 0.25;
  });

  /* Start render */
  render();

  window.addEventListener("resize", render);
});

/* ---------------------------------------
   DOT INDICATOR FUNCTION
--------------------------------------- */
function updateDots(activeIndex) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    if (i === activeIndex) dot.classList.add("active");
    else dot.classList.remove("active");
  });
}

/* ---------------------------------------
   WHEEL SECTION SCROLL ANIMATION
--------------------------------------- */
const wheelSection = document.querySelector(".wheel-section");
const trackElement = document.getElementById("track");
const cardsList = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  const rect = wheelSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100) {
    wheelSection.classList.add("visible");
    trackElement.classList.add("zoom-in");

    cardsList.forEach((card, i) => {
      setTimeout(() => card.classList.add("show"), i * 120);
    });
  }
});
