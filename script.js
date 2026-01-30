// Highlight active nav link
(function () {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-btn").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });
})();

// Home slideshow (only runs if slideshow exists)
(function () {
  const slideshow = document.getElementById("slideshow");
  if (!slideshow) return;

  const images = ["photo1.JPG", "photo2.JPG", "photo3.jpg"];

  const a = document.getElementById("slideA");
  const b = document.getElementById("slideB");
  if (!a || !b || images.length === 0) return;

  let idx = 0;
  let showingA = true;

  a.src = images[idx];
  a.classList.add("active");

  const holdMs = 9000;
  setInterval(() => {
    idx = (idx + 1) % images.length;

    const incoming = showingA ? b : a;
    const outgoing = showingA ? a : b;

    incoming.src = images[idx];
    incoming.classList.add("active");
    outgoing.classList.remove("active");

    showingA = !showingA;
  }, holdMs);
})();

// Slide-out YouTube drawer (only runs if drawer exists)
(function () {
  const drawer = document.getElementById("ytDrawer");
  const tab = document.getElementById("ytDrawerTab");
  const closeBtn = document.getElementById("ytDrawerClose");
  const overlay = document.getElementById("ytDrawerOverlay");

  if (!drawer || !tab || !closeBtn || !overlay) return;

  const open = () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  };

  tab.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Swap main YouTube video when clicking drawer thumbnails
  const mainPlayer = document.getElementById("ytMain");
  if (!mainPlayer) return;

  document.querySelectorAll(".yt-thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-video");
      if (!id) return;

      // Ensure the main player updates every click
      mainPlayer.src = "https://www.youtube.com/embed/" + id + "?rel=0&modestbranding=1";

      // Optional: if user clicks a thumb, make sure drawer is open
      open();
    });
  });
})();
