export const lazyLoad = (image) => {
  const src = image.getAttribute('data-src');

  if (!src) {
    return;
  }

  const loaded = () => {
    image.style.opacity = "1";
  };

  const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      console.log('an image has loaded');
      image.src = src;
      image.removeAttribute('data-src');

      if (image.complete) {
        loaded();
      } else {
        image.addEventListener('load', loaded);
      }
      observer.unobserve(image);
    }
  });

  observer.observe(image);

  return {
    destroy() {
      image.removeEventListener('load', loaded);
    }
  };
};