<script>
  import { onMount, onDestroy } from 'svelte';

  let element;
  let observer;
  let isVisible = false;

  const handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const event = new CustomEvent('fadeappear', {
          detail: { visible: entry.isIntersecting }
        });
        element.dispatchEvent(event);
        isVisible = true;
      } else {
        isVisible = false;
      }
    });
  };

  onMount(() => {
    observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "50px",
      threshold: 0
    });

    if (element) {
      observer.observe(element);
    }
  });

  onDestroy(() => {
    if (observer && element) {
      observer.unobserve(element);
    }
  });
</script>

<style>
  .fade-hidden {
    opacity: 0;
    transition: 1.5s ease-in-out;
  }
  .fade-appear {
    opacity: 1;
    transition: 0.5s ease-in-out;
  }
</style>

<div bind:this={element} class:fade-hidden={!isVisible} class:fade-appear={isVisible}>
  <slot></slot>
</div>