document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin();

  const imgLink =
    "https://cdn.pixabay.com/photo/2016/03/25/12/19/man-1278713_1280.jpg";
  const container = document.querySelector(".image-container");
  const canvas = document.querySelector(".pixi");

  // Get width & height from the `.image-container` instead of `<canvas>`
  let canvasWidth = parseInt(container.dataset.width) || 600;
  let canvasHeight = parseInt(container.dataset.height) || 700;

  // Set CSS aspect ratio dynamically
  canvas.style.aspectRatio = `${canvasWidth} / ${canvasHeight}`;

  // ✅ Use PIXI's built-in resolution handling (supports Retina screens)
  const app = new PIXI.Application({
    view: canvas,
    width: canvasWidth,
    height: canvasHeight,
    transparent: true,
    resolution: window.devicePixelRatio || 1, // ✅ Handles Retina displays
    autoDensity: true, // ✅ Ensures crisp rendering
  });

  // ✅ Create PIXI sprite (Waits until texture loads before rendering)
  const texture = PIXI.Texture.from(imgLink);

  texture.baseTexture.once("loaded", () => {
    console.log("✅ Image loaded successfully!");

    const img = new PIXI.Sprite(texture);

    // ✅ Scale image to "cover" the canvas (like `background-size: cover`)
    img.anchor.set(0.5); // Center it
    img.x = app.screen.width / 2;
    img.y = app.screen.height / 2;

    // Use PIXI's built-in scaling to cover the canvas without stretching
    let scale = Math.max(
      app.screen.width / texture.width,
      app.screen.height / texture.height
    );
    img.scale.set(scale); // ✅ Scale proportionally to cover the canvas

    // ✅ Add to PIXI stage AFTER texture loads
    app.stage.addChild(img);

    // ✅ Apply glitch filters
    img.filters = [
      new PIXI.filters.RGBSplitFilter(),
      new PIXI.filters.GlitchFilter(),
    ];
    img.filters[0].red.x = img.filters[0].red.y = 0;
    img.filters[0].green.x = img.filters[0].green.y = 0;
    img.filters[0].blue.x = img.filters[0].blue.y = 0;
    img.filters[1].slices = 0;
    img.filters[1].offset = 20;

    let isAnimating = false;

    function runEntranceAnimation() {
      if (isAnimating) return;
      isAnimating = true;

      gsap.set(canvas, {
        x: window.innerWidth + 50,
        opacity: 0.3,
        scaleX: 1.5,
        scaleY: 0.8,
      });

      gsap
        .timeline({
          onComplete: () => {
            isAnimating = false;
            startGlitchEffect(); // Start glitch effect after animation completes
          },
        })
        .set(
          canvas,
          {
            transformOrigin: "0% 50%",
            x: window.innerWidth + 50,
            scaleX: 1.5,
            scaleY: 0.8,
            opacity: 0.3,
          },
          "begin+=1.05"
        )
        .to(canvas, { duration: 0.2, ease: "expo.out", x: 0 }, "begin+=1.05")
        .to(
          canvas,
          {
            duration: 0.6,
            ease: "elastic.out(1, 0.7)",
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
          },
          "begin+=1.1"
        );
    }

    function startGlitchEffect() {
      function random(min, max) {
        return Math.random() * (max - min) + min;
      }

      function glitchAnim() {
        if (isAnimating) return;

        const tl = gsap.timeline({
          delay: random(0, 3),
          onComplete: glitchAnim,
        });

        tl.to(img.filters[0].red, {
          duration: 0.2,
          x: random(-15, 15),
          y: random(-15, 15),
        })
          .to(img.filters[0].red, { duration: 0.01, x: 0, y: 0 })
          .to(
            img.filters[0].blue,
            {
              duration: 0.2,
              x: random(-15, 15),
              y: 0,
              onComplete: () => {
                img.filters[1].slices = 20;
                img.filters[1].direction = random(-75, 75);
              },
            },
            "-=0.2"
          )
          .to(img.filters[0].blue, {
            duration: 0.1,
            x: random(-15, 15),
            y: random(-5, 5),
            onComplete: () => {
              img.filters[1].slices = 12;
              img.filters[1].direction = random(-75, 75);
            },
          })
          .to(img.filters[0].blue, {
            duration: 0.01,
            x: 0,
            y: 0,
            onComplete: () => {
              img.filters[1].slices = 0;
              img.filters[1].direction = 0;
            },
          })
          .to(
            img.filters[0].green,
            { duration: 0.2, x: random(-15, 15), y: 0 },
            "-=0.2"
          )
          .to(img.filters[0].green, {
            duration: 0.1,
            x: random(-20, 20),
            y: random(-15, 15),
          })
          .to(img.filters[0].green, { duration: 0.01, x: 0, y: 0 });

        tl.timeScale(1.2);
      }

      glitchAnim();
    }

    // Run entrance animation after image loads
    runEntranceAnimation();
  });
});
