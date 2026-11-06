let mynavi = document.querySelector(".navi");

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    if ($(window).width() >= 1024) {
      mynavi.style.display = "none";
    }
  } else {
    mybutton.style.display = "none";
    if ($(window).width() >= 1024) {
      mynavi.style.display = "block";
    }
  }
}

// scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// function eventFire(el, etype) {
//     if (el.fireEvent) {
//         el.fireEvent('on' + etype);
//     } else {
//         var evObj = document.createEvent('Events');
//         evObj.initEvent(etype, true, false);
//         el.dispatchEvent(evObj);
//     }
// }

function soundOn() {
  var beep = $("#sound")[0];

  $(".volume").on("click", function () {
    $(this).toggleClass("on");

    if ($(this).hasClass("on")) {
      $("#section-projects a").mouseover(function () {
        beep.play();
      });

      $("#section-projects a").mouseout(function () {
        beep.pause();
        beep.currentTime = 0;
      });
    } else {
      $("#section-projects a").mouseover(function () {
        beep.pause();
      });
    }
  });
}

function cursorInit() {
  var cursorOffset = {
    left: -10,
    top: -10,
  };

  document.getElementById("bodyCursor").addEventListener(
    "mousemove",
    function (e) {
      var $cursor = document.getElementById("cursor");

      $cursor.style.left = e.pageX - cursorOffset.left + "px";
      $cursor.style.top = e.pageY - cursorOffset.top + "px";
    },
    false
  );
}

function support_format_webp() {
  var elem = document.createElement("canvas");

  if (!!(elem.getContext && elem.getContext("2d"))) {
    // was able or not to get WebP representation
    return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
  } else {
    // very old browser like IE 8, canvas not supported
    return false;
  }
}

function setSectionEducationHeight() {
  if ($(window).width() >= 1024) {
    let h = $("#section-education .container .cert").height();
    $("#section-education .cert").css({
      height: h + 100,
      // background: "red",
    });
  } else {
    $("#section-education").css({
      height: "auto",
      // background: "blue",
    });
  }
}

jQuery(document).ready(function () {
  // webp support check:
  async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData =
      "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    const blob = await fetch(webpData).then((r) => r.blob());
    return createImageBitmap(blob).then(
      () => true,
      () => false
    );
  }

  (async () => {
    if (await supportsWebp()) {
      $("html").attr("id", "webpsupported");
    } else {
      $("html").attr("id", "webpnotsupported");
    }
  })();

  $("#bodyCursor").mousedown();
  $("#bodyCursor").click();
  $("#bodyCursor").trigger("click");
  $($("#bodyCursor")[0]).click();

  /*burger*/

  if ($(window).width() < 1024) {
    $(".navi").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass("navi-opened");
    });
  }
  //   } else {
  //     $(".navi").on("mouseenter", function () {
  //       $(this).addClass("navi-opened");
  //     });

  //     $(".navi").on("mouseleave", function () {
  //       $(this).removeClass("navi-opened");
  //     });
  //   }

  $("body,html").click(function (e) {
    $(".navi").removeClass("navi-opened");
  });

  $(".navi a").on("click", function () {
    let l = document
      .querySelector(this.getAttribute("href"))
      .getAttribute("id");

    let testDiv = document.getElementById(l).offsetHeight;

    // console.log(testDiv + " id: " + l);

    let boxes = $("#section-boxes");
    const offsetTopBoxes = boxes.offset().top;
    console.log(offsetTopBoxes);

    let hello = $("#section-hello").height();
    let personal = $("#section-personal").height();
    let education = $("#section-education").height();
    let projects = $("#section-projects").height();
    let contact = $("#section-contact").height();

    console.log("boxes " + boxes);
    console.log("hello " + hello);
    console.log("personal " + personal);
    console.log("education " + education);
    console.log("projects " + projects);
    console.log("contact " + contact);

    const element = document.getElementById(l);
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    // document.body.scrollTop = testDiv + 20 + "px"; // For Safari
    // document.documentElement.scrollTop = testDiv + 20 + "px"; // For Chrome, Firefox, IE and Opera
  });

  /*btt*/
  mybutton = document.getElementById("btt");

  $("#btt").on("click", function () {
    topFunction();
  });

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  jQuery(".zoom-modal").click(function () {
    jQuery(this).hide();
    $("body").removeClass("bImg-opened");
  });

  jQuery(".sImg").click(function () {
    jQuery(this).next().css({
      display: "block",
      transition: "opacity 2s linear",
      transform: "translate(0)",
      opacity: "1",
    });
    $("body").addClass("bImg-opened");
  });

  //   $(document).on("click", "a", function (event) {
  //     console.log($(this).attr("href"));
  //     // or
  //     console.log(this.href);
  //   });

  //   $('a[href^="#"]').on("click", function (event) {
  //     event.preventDefault();
  //     var anchor = $(this).attr("href");
  //     $("html, body").animate(
  //       {
  //         scrollTop: $(anchor).offset().top,
  //       },
  //       1000
  //     );
  //   });

  /*slider*/
  $(".slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
  });

  $(".slider .slick-slide.slick-cloned a").removeAttr("data-lightbox");

  document.getElementById("year").innerHTML = new Date().getFullYear();

  $(window).on("resize", function () {
    cursorInit();
    setSectionEducationHeight();
  });

  cursorInit();

  setSectionEducationHeight();

  soundOn();
});

const tooltip = document.querySelector(".tooltip");
const tooltiptext = document.querySelector(".tooltiptext");

tooltip.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  tooltiptext.style.top = `${y}px`;
  tooltiptext.style.left = `${x}px`;
});

const slider_tooltip = document.querySelector(".slider-tooltiptext");
const slider = document.querySelector(".slider");

slider.addEventListener("mousemove", (e) => {
  const rect = slider.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  slider_tooltip.style.top = `${y}px`;
  slider_tooltip.style.left = `${x}px`;
});

// Get all sections
const sections = document.querySelectorAll("section");

// Add event listener to window scroll
window.addEventListener("scroll", () => {
  // Get current scroll position
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    // Get section top and bottom positions
    const sectionTop = section.offsetTop;
    const sectionBottom = section.offsetTop + section.offsetHeight;

    // Check if section is in view
    if (
      scrollPosition >= sectionTop - 100 &&
      scrollPosition < sectionBottom + 100
    ) {
      // Add class to section to trigger transition and animation
      section.classList.add("active");
    } else {
      // Remove class from section
      section.classList.remove("active");
    }
  });
});
