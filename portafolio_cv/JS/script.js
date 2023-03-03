/* ********** Menu ********** */
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ********** Modo oscuro ********** */
((d) => {
  const $btnDarkMode = d.querySelector(".btn-dark-mode"),
    $options = d.querySelectorAll(".options"),
    $portfolioModal = d.querySelectorAll(".portfolio-modal"),
    $contactFormResponse = d.querySelector(".contact-form-response"),
    $modalPictures = d.querySelector(".modal-pictures"),
    ls = localStorage;

  const lightMode = () => {
    d.body.classList.remove("dark-mode");
    d.body.classList.add("light-mode");
    d.querySelector(".header").style.backgroundColor = "var(--white-color)";
    d.querySelector(".header a").style.color = "var(--black-color)";
    d.querySelector(".menu").style.backgroundColor = "var(--white-color)";
    $options.forEach((ele) => (ele.style.color = "var(--dark-color)"));
    $portfolioModal.forEach(
      (ele) => (ele.style.backgroundColor = "var(--white-color)")
    );
    $modalPictures.style.backgroundColor = "var(--white-color)";
    $contactFormResponse.style.backgroundColor = "var(--white-color)";
    $btnDarkMode.firstElementChild.classList.toggle("none");
    $btnDarkMode.lastElementChild.classList.toggle("none");
    ls.setItem("theme", "light");
  };

  const darkMode = () => {
    d.body.classList.remove("light-mode");
    d.body.classList.add("dark-mode");
    d.querySelector(".header").style.backgroundColor = "var(--second-color)";
    d.querySelector(".header a").style.color = "var(--white-color)";
    d.querySelector(".menu").style.backgroundColor = "var(--second-color)";
    $options.forEach((ele) => (ele.style.color = "var(--white-color)"));
    $portfolioModal.forEach(
      (ele) => (ele.style.backgroundColor = "var(--second-color)")
    );
    $modalPictures.style.backgroundColor = "var(--second-color)";
    $contactFormResponse.style.backgroundColor = "var(--second-color)";
    $btnDarkMode.insertAdjacentElement = ` `;

    $btnDarkMode.firstElementChild.classList.toggle("none");
    $btnDarkMode.lastElementChild.classList.toggle("none");
    ls.setItem("theme", "dark");
  };

  $btnDarkMode.addEventListener("click", (e) => {
    if (d.body.classList.contains("light-mode")) {
      darkMode();
    } else {
      lightMode();
    }
  });

  d.addEventListener("DOMContentLoaded", (e) => {
    if (ls.getItem("theme") === null) ls.setItem("theme", "light");
    if (ls.getItem("theme") === "light") lightMode();
    if (ls.getItem("theme") === "dark") {
      darkMode();
      $btnDarkMode.firstElementChild.classList.toggle("none");
      $btnDarkMode.lastElementChild.classList.toggle("none");
    }
  });
})(document);

/* ********** Revelar elementos ********** */
((d, w) => {
  const $btnLightMode = d.querySelector(".btn-dark-mode"),
    $modalPictures = d.querySelector(".modal-pictures"),
    $header = d.querySelector(".header"),
    $indicador = d.querySelector(".indicador"),
    $scroll = d.querySelector(".btn-scroll-top");

  w.addEventListener("scroll", (e) => {
    if (scrollY >= 100) {
      $btnLightMode.classList.remove("none");
    } else {
      $btnLightMode.classList.add("none");
    }
    if (scrollY >= 3700 && scrollY < 5600) {
      $modalPictures.classList.remove("none");
    } else {
      $modalPictures.classList.add("none");
    }
    if (scrollY >= 100) {
      $header.classList.remove("none");
    } else {
      $header.classList.add("none");
    }
    if (scrollY >= 800) {
      $scroll.classList.remove("none");
    } else {
      $scroll.classList.add("none");
    }
  });

  setTimeout(() => {
    $indicador.innerHTML = `
     <h4>Desliza hacia abajo..</h4>
              <br>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
              </svg>
    `;
    setTimeout(() => {
      $indicador.textContent = "";
    }, 3000);
  }, 1000);

  $scroll.addEventListener("click", (e) => {
    w.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  });
})(document, window);

/* ********** Contact Form ********** */
((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/luisadriannu13@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((json) => {
        console.log(json);
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);
