<script>
  import FadeAppear from '$lib/components/FadeAppear.svelte';
  import { PUBLIC_PILL_URL } from '$env/static/public';
  import Icon from '@iconify/svelte';
  export let data;
  let nb_icon_displayed = 50
  let displayed_data = data.icons.slice(0, 50);
  let toasted_snack = false;
  let scroll_value = 0;
  let name_search = "";

  $: if (name_search.length > 0) {
    displayed_data = null;
    let new_icons = data.icons.filter(icon => (icon.name.toUpperCase()).startsWith(name_search.toUpperCase()) || (icon.display_name.toUpperCase()).startsWith(name_search.toUpperCase()));
    displayed_data = new_icons;
  } else {
    displayed_data = null;
    let new_icons = data.icons.slice(0, 50);
    displayed_data = new_icons;
  }

  function scrolling()
  {
    console.log(name_search);
    // Guard if we're in search process
    if (name_search !== "") {
      return;
    }
    // Else load while scrolling for fluid nav
    scroll_value += 1;
    if (scroll_value == 5 && nb_icon_displayed < data.icons.length) {
      nb_icon_displayed + 50 < data.icons.length ? nb_icon_displayed += 50 : nb_icon_displayed = data.icons.length;
      displayed_data = data.icons.slice(0, nb_icon_displayed);
      scroll_value = 0;
    }
  }

  //
  // copyToPaperClip : function : copie vers le presse papier
  //
  function copyToPaperClip(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        toasted_snack = true;
      },
      (err) => {
        toasted_snack = true;
      }
    );

    setTimeout(() => {
      toasted_snack = false;
    }, 3000);
  }

  //
  // Download svg file
  //
  function downloadFile(textData, fileName) {
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

<svelte:window on:scroll={scrolling} />

<section class="c-back">
  <div class="mp-container first-section">
    <h1 class="mp-h1">ALL LOGOS</h1>

    <div>
      <img src="{PUBLIC_PILL_URL}1t=All" alt="pill-test">
      <img src="{PUBLIC_PILL_URL}1t={data.icons.length}" alt="pill-test">
      <img src="{PUBLIC_PILL_URL}1t=logos" alt="pill-test">
    </div>
  </div>

  <div class="mp-nav">
    <a class="nav-btn" href="/">
      Home
    </a>
    <a class="nav-btn" href="submit-logo">Submit new logo</a>
  </div>
</section>

<section class="bg-back min-screen">
  <div class="mp-search-container">
    <div class="mp-search">
      <div class="w-text mp-align-left">
        Search bar
      </div>
      <div>
        <input class="mp-input" bind:value={name_search}>
      </div>
    </div>
  </div>
  <div class="mp-container">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="grid-container">
      {#if displayed_data}
        {#each displayed_data as logo}

        <div>
          <div class="grid-item logo-pill">

            <div class="mp-logo-name" on:click={() => copyToPaperClip(logo.name)}>
              {logo.name}
            </div>

            <div on:click={() => copyToPaperClip(logo.logo)} class="svg-zone">
              <FadeAppear>
                <img class="svg-display" src={`data:image/svg+xml;utf8,${logo.logo}`} alt="svg for {logo.name}"/>
              </FadeAppear>
            </div>

            <div class="mp-display-name">
              {logo.display_name}
            </div>

          </div>

          <div class="bottom-pill w-text grid-mp-actions">
            <div class="mp-logo-action download-pill" on:click={downloadFile(logo.logo, logo.name+".svg")}>
              <Icon width=25 icon="material-symbols:download" />
            </div>
            <div class="mp-logo-action color-pill" on:click={() => copyToPaperClip(logo.color)}>
              <Icon width=25 icon="material-symbols:colorize" />
            </div>
            <a class="mp-logo-action get-pill" target="_blank" href="{PUBLIC_PILL_URL}1t={logo.display_name}&l={logo.name}&1bc={logo.color.replace('#', '')}&s">
              <Icon width=25 icon="material-symbols:pill-outline" />
            </a>
          </div>
        </div>
        {/each}
      {:else}

      <div>
        Loading...
      </div>

      {/if}
    </div>
    <div id="snackbar" class="{toasted_snack ? 'show' : ''}">Copied to your paperclip !</div>
  </div>
</section>

<style>

  .mp-display-name {
    margin-top: auto;
    margin-left: 1rem;
    text-align: left;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .download-pill {
    background-color: var(--color);
    border: solid 1px var(--color);
    border-bottom-left-radius: 10px;
  }

  .color-pill {
    background-color: var(--color);
    border: solid 1px var(--color);
  }

  .get-pill {
    background-color: var(--color);
    border: solid 1px var(--color);
    color: white;
    border-bottom-right-radius: 10px;
  }

  .mp-logo-action {
    padding-top: 0.5rem;
    padding-bottom: 0.2rem;
    transition: 0.3s;
  }
  
  .mp-logo-action:hover {
    background-color: #811d0d;
    border-color: #811d0d;
    cursor: pointer;
  }

  .mp-logo-name {
    font-size: 1.2rem;
    transition: 0.2s;
  }

  .mp-logo-name:hover {
    color: #474747;
    opacity: 50%;
    cursor: pointer;
  }

  .logo-pill {
    height: 80%;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding-top: 1rem;
  }

  .grid-container {
    display: grid;
    gap: 10px;
  }

  .grid-mp-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-item {
    position: relative;
    background-color: #ddd;
    text-align: center;
  }

  .svg-zone {
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: 100px;
    transition: 0.2s;
  }

  .svg-zone:hover {
    z-index: 1;
    background-color: #ddd;
    opacity: 50%;
    cursor: pointer;
  }
  
  .svg-display {
    height: 100px;
    opacity: 100%;
    transition: 1s;
  }

  .min-screen {
    min-height: 100vh;
  }

  @media (max-width: 499px) {
    .grid-container {
      row-gap: 40px;
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 550px) and (max-width: 799px) {
    .grid-container {
      gap: 20px;
      row-gap: 20px;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 800px) and (max-width: 1049px) {
    .grid-container {
      gap: 20px;
      row-gap: 20px;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1050px) and (max-width: 1349px) {
    .grid-container {
      gap: 20px;
      row-gap: 20px;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 1350px) and (max-width: 1599px) {
    .grid-container {
      gap: 20px;
      row-gap: 20px;
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (min-width: 1600px) and (max-width: 1799px) {
    .grid-container {
      gap: 30px;
      row-gap: 30px;
      grid-template-columns: repeat(6, 1fr);
    }
  }

  @media (min-width: 1800px) and (max-width: 2000px) {
    .grid-container {
      gap: 40px;
      row-gap: 40px;
      grid-template-columns: repeat(7, 1fr);
    }
  }

  @media (min-width: 2000px) {
    .grid-container {
      gap: 40px;
      row-gap: 40px;
      grid-template-columns: repeat(8, 1fr);
    }
  }

  #snackbar {
    visibility: hidden; /* Hidden by default. Visible on click */
    min-width: 250px; /* Set a default minimum width */
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: #212121; /* Black background color */
    color: #fff; /* White text color */
    text-align: center; /* Centered text */
    border-radius: 2px; /* Rounded borders */
    padding: 16px; /* Padding */
    position: fixed; /* Sit on top of the screen */
    z-index: 1; /* Add a z-index if needed */
    left: 50%; /* Center the snackbar */
    bottom: 30px; /* 30px from the bottom */
  }

  /* Show the snackbar when clicking on a button (class added with JavaScript) */
  #snackbar.show {
    visibility: visible; /* Show the snackbar */
    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
    However, delay the fade out process for 2.5 seconds */
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }

  /* Animations to fade the snackbar in and out */
  @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }

  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }

  @-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }

  @keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }

</style>