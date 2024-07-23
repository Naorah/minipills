export const lazyLoad = (image) => {
  const src = image.getAttribute('data-src');

  if (!src) {
    return;
  }

  image.classList.add('loading');

  const loaded = () => {
    image.style.opacity = "1";
    image.classList.remove('lazy');
    image.classList.remove('loading');
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
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
  });

  observer.observe(image);

  return {
    destroy() {
      image.removeEventListener('load', loaded);
    },
    reload(newSrc) {
      console.log('Reloading image', image);
      src = newSrc || src;
      if (!image.src) {
        image.setAttribute('data-src', src);
      }
      observeImage();
    }
  };
};