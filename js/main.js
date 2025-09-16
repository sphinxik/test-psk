/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


document.addEventListener("DOMContentLoaded", function () {
  initHorizontalMouseScroll();
  initStarRating();
  initFormFiles();
  initSideControlsSlider();
  initOutletFiltersSidebar();
  initNewCardSliders();
  initNewCardInfoList();
  initProductReviews();
  initProductCompareSection();
  initStickyElements();
});

function debounce(func, time) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;
      func.apply(context, args);
    }, time);
  };
}

function initHorizontalMouseScroll() {
  const scrollElems = document.querySelectorAll("._horizontal-scroll");

  scrollElems.forEach((el) => {
    let targetScroll = 0;
    let isAnimating = false;

    function animateScroll() {
      isAnimating = true;
      const currentScroll = el.scrollLeft;
      const distance = targetScroll - currentScroll;

      if (Math.abs(distance) < 0.5) {
        el.scrollLeft = targetScroll;
        isAnimating = false;
        return;
      }

      el.scrollLeft += distance * 0.1;
      requestAnimationFrame(animateScroll);
    }

    el.addEventListener(
      "wheel",
      (e) => {
        if (el.scrollWidth > el.clientWidth) {
          e.preventDefault();

          targetScroll += e.deltaY || e.deltaX;
          targetScroll = Math.max(0, Math.min(targetScroll, el.scrollWidth - el.clientWidth));

          if (!isAnimating) animateScroll();
        }
      },
      { passive: false }
    );

    el.addEventListener("scroll", () => {
      if (!isAnimating) {
        targetScroll = el.scrollLeft;
      }
    });

    el.addEventListener("mousedown", () => {
      if (isAnimating) {
        isAnimating = false;
      }
      targetScroll = el.scrollLeft;
    });
  });
}

function initStarRating() {
  const starRatings = document.querySelectorAll(".star-rating");
  let ratingResult;

  starRatings.forEach((rating) => {
    startStarRating(rating);
  });

  function startStarRating(rating) {
    initStarRatingVars(rating);
    setStarRatingResultWidth(rating.dataset.ratingValue);

    if (rating.classList.contains("_setRating")) {
      setStarRating(rating);
    }
  }

  function initStarRatingVars(rating) {
    ratingResult = rating.querySelector(".star-rating__result");
  }

  function setStarRatingResultWidth() {let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    const ratingResultWidth = index / 0.05;
    ratingResult.style.width = `${ratingResultWidth}%`;
  }

  function setStarRating(rating) {
    const ratingItems = rating.querySelectorAll(".star-rating__item");

    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];

      ratingItem.addEventListener("mouseenter", function (e) {
        initStarRatingVars(rating);
        setStarRatingResultWidth(ratingItem.value);
      });

      ratingItem.addEventListener("mouseleave", function (e) {
        setStarRatingResultWidth(rating.dataset.ratingValue);
      });

      ratingItem.addEventListener("click", function (e) {
        initStarRatingVars(rating);
        rating.dataset.ratingValue = index + 1;
        setStarRatingResultWidth(rating.dataset.ratingValue);
      });
    }
  }
}

function initFormFiles() {
  const MAX_FILES_TO_UPLOAD = 5;
  const MAX_FILES_SIZE = 50 * 1024 * 1024; // 50mb
  const SUPPORTED_FILE_FORMATS = ["image/jpeg", "image/png", "video/mp4", "video/quicktime", "video/webm", "video/3gpp"];

  const fileBlocks = document.querySelectorAll(".file");
  fileBlocks.forEach((fileBlock) => {
    const fileInput = fileBlock.querySelector(".file-input");
    const filePreviews = fileBlock.querySelector(".file-previews");
    const filesObj = {};

    fileBlock.addEventListener("click", (e) => {
      if (e.target.closest(".file-preview__delete")) {
        e.stopPropagation();
        e.preventDefault();
        deleteFile(filesObj, fileInput, e.target.closest(".file-preview__delete"));
      }
    });

    fileInput.addEventListener("change", function () {
      if (fileInput.files.length > 0) {
        handleFiles(fileInput.files, filesObj, fileInput, filePreviews);
      }
    });
  });

  function handleFiles(newFiles, filesObj, fileInput, filePreviews) {
    const filesArr = Array.from(newFiles);
    removeFileError(fileInput);

    let totalFilesCount = Object.keys(filesObj).length;
    if (totalFilesCount > MAX_FILES_TO_UPLOAD) {
      showFileError(fileInput, "file-error-quantity");
      return;
    }

    filesArr.forEach((file) => {
      if (filesObj[file.name]) {
        console.warn(`Файл "${file.name}" уже добавлен, пропускаем.`);
        return;
      }

      if (totalFilesCount >= MAX_FILES_TO_UPLOAD) {
        showFileError(fileInput, "file-error-quantity");
        return;
      }

      if (!SUPPORTED_FILE_FORMATS.includes(file.type)) {
        showFileError(fileInput, "file-error-type");
        return;
      }

      if (file.size > MAX_FILES_SIZE) {
        showFileError(fileInput, "file-error-size");
        return;
      }

      totalFilesCount++;

      const reader = new FileReader();
      reader.onload = (e) => {
        const imgPreview = file.type.startsWith("video/") ? `<span>${file.type.split("/")[1].toUpperCase()}</span>` : `<img src="${e.target.result}" alt="">`;

        const previewHTML = `<div class="file-preview" data-file-id="${file.name}">
                              <button class="file-preview__delete" type="button">
                                <svg>
                                  <use xlink:href="img/icons/sprite.svg#close"></use>
                                </svg>
                              </button>
                              <div class="file-preview__img">
                                ${imgPreview}
                              </div>
                            </div>`;

        filePreviews.insertAdjacentHTML("beforeend", previewHTML);
        filesObj[file.name] = file;

        const dt = new DataTransfer();
        Object.values(filesObj).forEach((f) => dt.items.add(f));
        fileInput.files = dt.files;
      };

      reader.readAsDataURL(file);
    });
  }

  function deleteFile(filesObj, fileInput, deleteBtn) {
    const parent = deleteBtn.closest(".file-preview");
    const fileID = parent.dataset.fileId;

    parent.remove();
    delete filesObj[fileID];

    const dt = new DataTransfer();
    Object.values(filesObj).forEach((file) => dt.items.add(file));
    fileInput.files = dt.files;

    removeFileError(fileInput);
  }

  function showFileError(fileInput, errorClass) {
    const parent = fileInput.closest(".file");
    const fileError = parent.querySelector(".form-input-error");

    Array.from(fileError.children).forEach((el) => {
      el.classList.remove("_active");
      if (el.classList.contains(errorClass)) {
        el.classList.add("_active");
      }
    });
  }

  function removeFileError(fileInput) {
    const parent = fileInput.closest(".file");
    const fileError = parent.querySelector(".form-input-error");

    Array.from(fileError.children).forEach((el) => {
      el.classList.remove("_active");
    });
  }
}

function initSideControlsSlider() {
  const sideControlsSliders = document.querySelectorAll(".side-controls__slider");

  sideControlsSliders.forEach((slider) => {
    const parent = slider.closest(".side-controls__slider-wrapper");
    const prevBtn = parent.querySelector(".swiper-button-prev");
    const nextBtn = parent.querySelector(".swiper-button-next");
    const slidesQuantity = parseInt(slider.dataset.slidesQuantity);

    const currentSliderSettings = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: true,
      preloadImages: true,
      initialSlide: 0,
      speed: 600,
      freeMode: false,
      rewind: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      allowTouchMove: true,
      slideToClickedSlide: false,
      touchMoveStopPropagation: true,
      touchStartForcePreventDefault: true,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        578: {
          slidesPerView: 1.6,
          spaceBetween: 15
        },
        768: {
          slidesPerView: slidesQuantity - 2.7 >= 1 ? slidesQuantity - 2.7 : 1,
          spaceBetween: 15
        },
        992: {
          slidesPerView: slidesQuantity - 2,
          spaceBetween: 15
        },
        1100: {
          slidesPerView: slidesQuantity - 1.5,
          spaceBetween: 20
        },
        1400: {
          slidesPerView: slidesQuantity - 1,
          spaceBetween: 20
        },
        1600: {
          slidesPerView: slidesQuantity,
          spaceBetween: 20
        }
      }
    };

    new Swiper(slider, currentSliderSettings);
  });
}

function initOutletFiltersSidebar() {
  const outletCatalog = document.querySelector(".outlet-catalog");

  if (outletCatalog) {
    const outletSidebar = outletCatalog.querySelector(".outlet-sidebar");
    const outletSidebarTrigger = outletCatalog.querySelector(".outlet-categories__btn");

    if (outletSidebar && outletSidebarTrigger) {
      outletSidebarTrigger.addEventListener("click", () => {
        outletSidebarTrigger.classList.toggle("_active");
        outletCatalog.classList.toggle("_active");
        outletSidebar.classList.toggle("_active");

        if (outletSidebarTrigger.classList.contains("_active")) {
          if (window.matchMedia("(max-width: 1100px)").matches) {
            openOverlay();
          }
        } else {
          if (window.matchMedia("(max-width: 1100px)").matches) {
            closeOverlay();
          }
        }
      });
    }
  }
}

function initNewCardSliders() {
  const sliderMain = document.querySelector(".new-card__slider-main");
  const sliderThumbs = document.querySelector(".new-card__slider-thumbs");

  if (sliderMain && sliderThumbs) {
    const sliderThumbsSwiper = new Swiper(sliderThumbs, {
      watchSlidesVisibility: true,
      watchSlidesProgress: false,
      slideToClickedSlide: false,
      lazy: true,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: "auto",
      spaceBetween: 10,
      speed: 800,
      freeMode: false,
      loop: false,
      allowTouchMove: true,
      direction: "vertical",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

    const sliderMainSwiper = new Swiper(sliderMain, {
      lazy: true,
      observer: true,
      observerParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 800,
      freeMode: false,
      allowTouchMove: false,
      simulateTouch: false,
      loop: false,
      rewind: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      thumbs: {
        swiper: sliderThumbsSwiper
      },
      breakpoints: {
        0: {
          allowTouchMove: true,
          simulateTouch: true
        },
        992: {
          allowTouchMove: false,
          simulateTouch: false
        }
      }
    });
  }
}

function initNewCardInfoList() {
  const showmoreBtn = document.querySelector(".new-card__info-showmore");
  const list = document.querySelector(".new-card__info-list");

  if (showmoreBtn && list) {
    const showmoreBtnText = showmoreBtn.querySelector("span");

    showmoreBtn.addEventListener("click", () => {
      showmoreBtn.classList.toggle("_active");
      list.classList.toggle("_active");

      if (showmoreBtn.classList.contains("_active")) {
        showmoreBtnText.textContent = "Скрыть";
      } else {
        showmoreBtnText.textContent = "Показать еще";
      }
    });
  }
}

function initProductReviews() {
  const reviewsBody = document.querySelector(".product-reviews__body--reviews");
  let destroySlider;

  // Init slider and get destroy function for it
  if (reviewsBody && reviewsBody.classList.contains("_minimized")) {
    destroySlider = initProductReviewsSlider();
  }

  // Change review structure
  const productReviewsToggleBtns = document.querySelectorAll(".product-reviews__toggle-btn");
  productReviewsToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentReviewsBody = btn.closest(".product-reviews__body");
      currentReviewsBody.classList.toggle("_minimized");

      if (!currentReviewsBody.classList.contains("_minimized")) {
        destroySlider();
      } else {
        destroySlider = initProductReviewsSlider();
      }

      setReviewsClamp(currentReviewsBody);
    });
  });

  // Filters
  const productReviewsFilters = document.querySelectorAll(".product-reviews__filter");
  productReviewsFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      if (!filter.classList.contains("_active")) {
        const parent = filter.parentElement;
        const activeFilter = parent.querySelector(".product-reviews__filter._active");

        if (activeFilter) {
          activeFilter.classList.remove("_active");
          activeFilter.classList.remove("_active--reverse");
        }

        filter.classList.add("_active");
      } else if (!filter.classList.contains("_active--reverse")) {
        filter.classList.add("_active--reverse");
      } else {
        filter.classList.remove("_active--reverse");
      }
    });
  });

  // Helpful selector
  const productHelpfulBtns = document.querySelectorAll(".product-reviews__helpful-btn");
  productHelpfulBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("_active")) {
        const parent = btn.parentElement;
        const activeBtn = parent.querySelector(".product-reviews__helpful-btn._active");

        if (activeBtn) {
          activeBtn.classList.remove("_active");
        }

        btn.classList.add("_active");
      }
    });
  });

  function setReviewsClamp(currentBody) {
    const clampItems = currentBody.querySelectorAll('[data-text-max-rows]');
    clampItems.forEach((item) => {
      if (currentBody.classList.contains('_minimized')) {
        const maxRows = Number(item.dataset.textMaxRows);
        $clamp(item, { clamp: maxRows });
      } else {
        item.removeAttribute('style');
      }
    });
  }
}

function initProductReviewsSlider() {
  const productReviewsSlider = document.querySelector(".product-reviews__slider");

  if (productReviewsSlider) {
    const swiperSlider = new Swiper(productReviewsSlider, {
      lazy: false,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 600,
      freeMode: false,
      rewind: true,
      allowTouchMove: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 15
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        1100: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1600: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });

    return function destroySlider() {
      swiperSlider.destroy(true, true);
    };
  }
}

function initProductCompareSection() {
  const tabsNavBtns = document.querySelectorAll(".product-compare__nav-btn");
  const compareBodies = document.querySelectorAll(".product-compare__body");

  tabsNavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      compareBodies.forEach((item) => {
        item.removeAttribute("style");
      });

      setTimeout(() => {
        generateActiveProductCompareBodyStructure();
      }, 40);
    });
  });

  compareBodies.forEach((currentbody) => {
    currentbody.addEventListener("click", (e) => {
      // Remove row
      if (e.target.closest(".product-compare__row-label-delete")) {
        deleteProductCompareRow(currentbody, e.target.closest(".product-compare__row-label-delete"));
      }
    });

    // Sliders
    initProductCompareBodySliders(currentbody);
  });

  generateActiveProductCompareBodyStructure();
}

function initProductCompareBodySliders(currentBody) {
  const sliderMain = currentBody.querySelector(".product-compare__main-slider");
  const sliderInfo = currentBody.querySelector(".product-compare__info-slider");

  if (sliderMain && sliderInfo) {
    const prevBtn = currentBody.querySelector(".swiper-button-prev");
    const nextBtn = currentBody.querySelector(".swiper-button-next");

    const slidersGlobalSettings = {
      lazy: true,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: 6,
      spaceBetween: 20,
      speed: 800,
      freeMode: false,
      loop: false,
      rewind: true,
      allowTouchMove: true,
      simulateTouch: true,
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        850: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1140: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 20
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 20
        }
      }
    };

    const sliderMainSwiper = new Swiper(sliderMain, {
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      ...slidersGlobalSettings
    });

    const sliderInfoSwiper = new Swiper(sliderInfo, slidersGlobalSettings);

    sliderMainSwiper.controller.control = sliderInfoSwiper;
    sliderInfoSwiper.controller.control = sliderMainSwiper;
  }
}

function deleteProductCompareRow(currentBody, deleteBtn) {
  const charLists = currentBody.querySelectorAll(".product-compare__list");
  const el = deleteBtn.closest(".product-compare__list-item");
  const parent = el.parentElement;
  const elIndex = Array.prototype.indexOf.call(parent.children, el);

  charLists.forEach((list) => {
    list.children[elIndex].remove();
  });

  setTimeout(() => {
    generateActiveProductCompareBodyStructure();
  }, 40);
}

function generateActiveProductCompareBodyStructure() {
  const compareBodies = document.querySelectorAll(".product-compare__body._active");
  const matchMediaValue = "(max-width: 991.98px)";

  window.removeEventListener("resize", debounce(setElementsSize, 200));
  window.addEventListener("resize", debounce(setElementsSize, 200));

  setElementsSize();
  function setElementsSize() {
    compareBodies.forEach((body) => {
      // Same height for characteristics rows
      const charLists = body.querySelectorAll(".product-compare__list");
      const charItemsQuantity = charLists[0].children.length;
      const charItemsHeight = [];

      for (let i = 0; i < charLists.length; i++) {
        const items = charLists[i].querySelectorAll(".product-compare__list-item");

        for (let j = 0; j < charItemsQuantity; j++) {
          items[j].removeAttribute("style");

          if (i === 0) {
            charItemsHeight.push(items[j].scrollHeight);
          } else {
            const curItemHeight = items[j].scrollHeight;
            if (charItemsHeight[j] < curItemHeight) {
              charItemsHeight[j] = curItemHeight;
            }
          }
        }
      }

      charLists.forEach((list) => {
        const items = list.querySelectorAll(".product-compare__list-item");
        items.forEach((item, index) => {
          item.style.height = charItemsHeight[index] + "px";
        });
      });

      // Body height
      setTimeout(() => {
        body.removeAttribute("style");

        if (!window.matchMedia(matchMediaValue).matches) {
          if (body.getBoundingClientRect().top < 0) {
            const stickyEl = document.querySelector(".sticky-init");
            body.style.height = body.scrollHeight + stickyEl.offsetHeight + "px";
          } else {
            body.style.height = body.scrollHeight + "px";
          }
        }
      }, 40);
    });
  }
}

function initStickyElements() {
  const stickyEl = document.querySelectorAll("[data-sticky]:not(.sticky-init)");
  const stickyElSettings = [];
  const TOP_GAP = 0;
  const BOTTOM_GAP = 0;

  setStickyElementsSettings();
  window.addEventListener("scroll", setStickyElementsPosition);

  const resizeObserver = new ResizeObserver(() => {
    setStickyElementsSettings();
  });

  for (let index = 0; index < stickyEl.length; index++) {
    stickyEl[index].classList.add("sticky-init");
    resizeObserver.observe(stickyEl[index].parentElement);
  }

  function setStickyElementsSettings() {
    for (let index = 0; index < stickyEl.length; index++) {
      const elMatchmediaValue = stickyEl[index].dataset.stickyMatchmedia;
      if (elMatchmediaValue && window.matchMedia(`(max-width: ${elMatchmediaValue}px)`).matches) {
        stickyEl[index].removeAttribute("style");
        return;
      }

      stickyElSettings[index] = {};
      setCurrentStickyElementSettings(stickyEl[index], index);
    }
  }

  function setStickyElementsPosition() {
    for (let index = 0; index < stickyEl.length; index++) {
      const elMatchmediaValue = stickyEl[index].dataset.stickyMatchmedia;
      if (elMatchmediaValue && window.matchMedia(`(max-width: ${elMatchmediaValue}px)`).matches) {
        stickyEl[index].removeAttribute("style");
        return;
      }

      setCurrentStickyElemenetPosition(stickyEl[index], stickyElSettings[index]);
    }
  }

  function setCurrentStickyElementSettings(el, index) {
    el.removeAttribute("style");
    const parent = el.parentElement;
    stickyElSettings[index].topGap = TOP_GAP;
    stickyElSettings[index].bottomGap = BOTTOM_GAP;
    stickyElSettings[index].elTop = el.getBoundingClientRect().top + window.pageYOffset;
    stickyElSettings[index].elLeft = el.getBoundingClientRect().left;
    stickyElSettings[index].elOffsetTop = el.offsetTop;
    stickyElSettings[index].elHeight = el.offsetHeight;
    stickyElSettings[index].elWidth = el.offsetWidth;
    stickyElSettings[index].parentBottom = parent.getBoundingClientRect().bottom + window.pageYOffset;

    setCurrentStickyElemenetPosition(el, stickyElSettings[index]);
  }

  function setCurrentStickyElemenetPosition(el, elSettings) {
    const settings = elSettings;
    const winY = window.pageYOffset;
    const scrollStart = winY - settings.elTop + settings.topGap;

    if (scrollStart >= 0) {
      el.classList.add("sticky-scrolled");
      if (settings.parentBottom <= winY + settings.elHeight + settings.topGap) {
        el.style.cssText = `
          position: absolute !important;
          top: calc(100% - ${settings.elHeight + settings.bottomGap}px) !important;
          width: ${settings.elWidth}px !important;
        `;
      } else {
        el.style.cssText = `
          position: fixed !important;
          top: ${settings.topGap}px !important;
          left: ${settings.elLeft}px !important;
          width: ${settings.elWidth}px !important;
        `;
      }
    } else {
      el.classList.remove("sticky-scrolled");
      el.removeAttribute("style");
    }
  }
}
/******/ })()
;