document.addEventListener("DOMContentLoaded", function () {
  const images = [
    {
      src: "assets/images/imagen1.jpg",
      title: "OJALA TE GUSTE AMORCITO",
      desc: "Gracias por compartir tanto tiempo conmigo. Te extrañamos y siempre te llevamos en nuestros corazones.",
    },
    {
      src: "assets/images/imagen2.jpg",
      title: "TU YO Y PERLA",
      desc: "Momentos inolvidables juntos, tú, yo y nuestra querida Perla. Gracias por ser parte de nuestra familia.",
    },
    {
      src: "assets/images/imagen3.jpg",
      title: "NUESTRA CHIKI",
      desc: "Nuestra pequeña Chiki, siempre llena de alegría y amor. Juntos por siempre, disfrutando cada momento.",
    },
    {
      src: "assets/images/imagen4.jpg",
      title: "NO SABES LO FELIZ QUE ME HACES",
      desc: "Eres mi todo. Cada día a tu lado es una bendición y no puedo imaginar mi vida sin ti.",
    },
    {
      src: "assets/images/imagen5.jpg",
      title: "POR MUCHAS AVENTURAS MÁS A TU LADO",
      desc: "Construyendo un futuro juntos, lleno de aventuras y momentos inolvidables. Siempre contigo.",
    },
    {
      src: "assets/images/imagen6.jpg",
      title: "SIEMPRE CONTIGO",
      desc: "Cada día a tu lado es único. Gracias por ser mi compañero de vida y por todos los momentos especiales.",
    },
    {
      src: "assets/images/imagen7.jpg",
      title: "GRACIAS POR TODO MI AMOR",
      desc: "Mi corazón es tuyo por siempre. Gracias por todo el amor y la felicidad que me das.",
    },
  ];

  let currentIndex = 0;
  const imageElement = document.getElementById("image");
  const titleElement = document.getElementById("title");
  const descElement = document.getElementById("description");
  const galleryContainer = document.getElementById("gallery-container");
  const galleryTitle = document.getElementById("gallery-title");
  const galleryTrack = document.getElementById("gallery-track");
  const contentSection = document.querySelector(".content");
  let galleryShown = false;

  function changeImage() {
    if (currentIndex < images.length) {
      const { src, title, desc } = images[currentIndex];

      imageElement.style.opacity = "0";
      titleElement.style.opacity = "0";
      descElement.style.opacity = "0";

      setTimeout(() => {
        imageElement.src = src;
        titleElement.textContent = title;
        descElement.textContent = desc;

        imageElement.style.opacity = "1";
        titleElement.style.opacity = "1";
        descElement.style.opacity = "1";

        currentIndex++;
      }, 2000);
    } else if (!galleryShown) {
      showGallery();
      galleryShown = true;
    }
  }

  function showGallery() {
    // Primero, hacer un fade out del contenido actual
    contentSection.style.opacity = "0";
    contentSection.style.transition = "opacity 1s ease";

    setTimeout(() => {
      contentSection.style.display = "none";
      galleryTitle.style.display = "block";
      galleryTitle.style.opacity = "0";
      galleryContainer.style.display = "block";
      galleryTrack.innerHTML = "";

      // Mostrar título con fade in
      setTimeout(() => {
        galleryTitle.style.transition = "opacity 1s ease";
        galleryTitle.style.opacity = "1";
      }, 100);

      // Crear y posicionar las imágenes inicialmente fuera de la vista
      images.forEach((imageData, index) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        const img = document.createElement("img");
        img.src = imageData.src;
        img.alt = imageData.title;
        img.classList.add("gallery-img");

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.innerHTML = `
          <h2>${imageData.title}</h2>
          <p>${imageData.desc}</p>
        `;

        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        galleryTrack.appendChild(galleryItem);

        // Posición inicial aleatoria
        galleryItem.style.transform = `
          translate(${Math.random() * 1000 - 500}px, ${
          Math.random() * 1000 - 500
        }px)
          rotate(${Math.random() * 360}deg)
          scale(0.1)
        `;
        galleryItem.style.opacity = "0";

        // Agregar evento de clic para expandir y contraer la imagen
        galleryItem.addEventListener("click", () => {
          if (galleryItem.classList.contains("expanded")) {
            galleryItem.classList.remove("expanded");
            galleryItem.style.transform = `
              translateX(${xPos}px)
              translateY(0)
              rotate(0deg)
              scale(1)
            `;
          } else {
            galleryItem.classList.add("expanded");
            galleryItem.style.transform = `
              translate(-50%, -50%)
              scale(2)
            `;
          }
        });
      });

      // Animar las imágenes a sus posiciones finales
      setTimeout(() => {
        const items = document.querySelectorAll(".gallery-item");
        items.forEach((item, index) => {
          item.style.transition = "all 1.5s ease-in-out";
          item.style.opacity = "1";
          updatePosition(item, index, items.length);
        });

        // Iniciar el carrusel después de la animación inicial
        setTimeout(startCarousel, 2000);
      }, 500);
    }, 1000);
  }

  function updatePosition(item, index, total) {
    const spacing = window.innerWidth / 4; // Reducir el espacio entre las imágenes
    const xPos = (index - Math.floor(total / 2)) * spacing;
    item.style.transform = `
      translateX(${xPos}px)
      translateY(0)
      rotate(0deg)
      scale(1)
    `;
  }

  function startCarousel() {
    const items = document.querySelectorAll(".gallery-item");
    let scrollPosition = 0;
    const spacing = window.innerWidth / 4; // Reducir el espacio entre las imágenes

    function animate() {
      scrollPosition -= 1; // Ajustar la velocidad del desplazamiento

      items.forEach((item, index) => {
        let xPos =
          (index * spacing + scrollPosition) % (items.length * spacing);

        if (xPos < -(items.length * spacing) / 2) {
          xPos += items.length * spacing;
        }

        const distance = Math.abs(xPos);
        const scale = Math.max(0.7, 1 - distance / (spacing * 4));

        item.style.transform = `
          translateX(${xPos}px)
          scale(${scale})
        `;
        item.style.zIndex = Math.floor(1000 - distance);
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.getElementById("background-effect").appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  const music = document.getElementById("background-music");
  music.load();

  function playMusic() {
    music.play().catch((error) => console.log("Autoplay bloqueado:", error));
    document.body.removeEventListener("click", playMusic);
  }

  document.body.addEventListener("click", playMusic, { once: true });
  setInterval(createHeart, 500);
  setInterval(changeImage, 6000);
  changeImage();
});
