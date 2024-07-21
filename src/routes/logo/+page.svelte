<script>
  import { lazyLoad } from '$lib/lazyLoad.js'
  export let data;
</script>

<section class="c-back">
  <div class="mp-container">
    <h1 class="mp-h1">ALL LOGOS</h1>

    <div>
      <img src="http://localhost:5173/pill?1t=All" alt="pill-test">
      <img src="http://localhost:5173/pill?1t=available" alt="pill-test">
      <img src="http://localhost:5173/pill?1t=logos" alt="pill-test">
    </div>
  </div>
</section>

<section class="bg-back">
  <div class="mp-container">
    <div class="grid-container">
      {#if data}
        {#each data.icons as logo}
        <div class="grid-item logo-pill">
          <div>
            {logo.name}
          </div>
          <div>
            <img class="svg-display" use:lazyLoad data-src={`data:image/svg+xml;utf8,${logo.logo}`} alt="svg for {logo.name}"/>
          </div>
          <div class="bottom-pill">
            download
          </div>
        </div>
        {/each}
      {:else}
      <div>
        Loading...
      </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .bottom-pill {
    background-color: var(--color);
    border: solid 1px var(--color);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .logo-pill {
    border-radius: 5px;
    padding-top: 1rem;
  }

  .grid-container {
    display: grid;
    gap: 10px;
  }

  .grid-item {
    background-color: #ddd;
    text-align: center;
  }

  .svg-display {
    width: 100px;
  }

  @media (max-width: 499px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 500px) and (max-width: 699px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 700px) and (max-width: 799px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 800px) and (max-width: 999px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 1000px) and (max-width: 1199px) {
    .grid-container {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (min-width: 1200px) and (max-width: 1399px) {
    .grid-container {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  @media (min-width: 1400px) and (max-width: 2000px) {
    .grid-container {
      gap: 20px;
      grid-template-columns: repeat(7, 1fr);
    }
  }

  @media (min-width: 2000px) {
    .grid-container {
      gap: 40px;
      grid-template-columns: repeat(8, 1fr);
    }
  }
</style>