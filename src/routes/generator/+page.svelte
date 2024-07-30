<script>
  import { PUBLIC_PILL_URL } from '$env/static/public';
  import Icon from '@iconify/svelte';

  let pill_link = PUBLIC_PILL_URL+"/pill";
  let pill_parameters = ""
  let final_link = pill_link;

  let copy_caption = "COPY";

  let pill_bindings = {
    "1t": "",
    "1c": "",
    "1bc": "",
    "2t": "",
    "2c": "",
    "2bc": "",
    "3t": "",
    "3c": "",
    "3bc": "",
    "l": "",
    "lc": "",
    "s": false
  };
  $: if (pill_bindings) {
    refresh_link();
  }

  function refresh_link() {
    final_link = pill_link
    let count = 0;
    for(let [key, value] of Object.entries(pill_bindings)) {
      if (pill_bindings[key] == "") continue
      if (count == 0) final_link += '?';
      else final_link += "&";
      final_link += key + "=" + value
      count += 1
    }
  }

  function copyToPaperClip(text) {

    navigator.clipboard.writeText(text).then(
      () => {
        copy_caption = "COPIED !";
      },
      (err) => {
        copy_caption = "COPY ERROR";
      }
    );

    setTimeout(() => {
      copy_caption = "COPY URL";
    }, 2000);
  }

  function reset_link() {
    final_link = PUBLIC_PILL_URL+"/pill?";
    shadow_styles = "border: solid 2px #212121";
    for(let [key, value] of Object.entries(pill_bindings)) {
      if (key == 's') pill_bindings[key] = false;
      else pill_bindings[key] = "";
    }
  }


  let shadow_styles = 'border: solid 2px #212121';
  function toggleShadow() {
    pill_bindings['s'] = !pill_bindings['s']
    if (pill_bindings['s']) {
      shadow_styles = "border: solid 2px #a12613";
    }
    else {
      shadow_styles = "border: solid 2px #212121";
    }
    refresh_link();
  }

</script>

<section class="c-back">
  <div class="mp-container first-section">
    <h1 class="mp-h1 doc-h1">PILL GENERATOR</h1>

    <div>
      <img src="{PUBLIC_PILL_URL}/pill?1t=Hmmm some generators" alt="pill-test">
    </div>
  </div>

  <div class="mp-nav">
    <a class="nav-btn" href="/">Home</a>
    <a class="nav-btn" href="/logo">Logo</a>
  </div>
</section>

<section class="bg-back">
  <div class="mp-container">

    <h2 class="w-text">Generate pills here !</h2>
  
    <div class="w-text">
      Pills generated here are svg only but the differents parameters works for svg & png !
    </div>
  
    <!-- GENERATOR ZONE -->
    <div class="input-zone mp-grid-container">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="w-text">
        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            First text ( Hey ! )
          </div>
          <div class="mp-align-right bolding highlight">
            REQUIRED
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['1t']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            First color ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['1c']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            First background ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['1bc']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Second text ( Hey ! )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['2t']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Second color ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['2c']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Second background ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['2bc']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Third text ( Hey ! )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['3t']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Third color ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['3c']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Third background ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['3bc']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Logo ( minipills )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['l']}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Logo color ( FFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={pill_bindings['lc']}/>
        </div>

        <div style="{shadow_styles}" class="generator-card mp-flex-container" on:click={toggleShadow}>
          <div class="generator-title">
            Shadow ( {pill_bindings['s'] ? 'ON' : 'OFF'} )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
        </div>

      </div>
  
      <!-- PILL --> 
      <div>
        {#if final_link.startsWith(`${PUBLIC_PILL_URL}`)}
          <img src="{final_link}" alt="pill-test">
        {:else}
          <img src="{PUBLIC_PILL_URL}/pill?1t=Wrong url&1bc=a12613" alt="pill-test">
        {/if}
      </div>
  
      <!-- COPY BUTTONS -->
      <div class="mp-tab">
        <input class="mp-input" bind:value={final_link}/>
      </div>
  
      <div>
        <button on:click={() => copyToPaperClip(pill_link + pill_parameters)} class="mp-white-button">{copy_caption}</button>
        <button on:click={() => reset_link()} class="mp-red-button">RESET</button>
      </div>
    </div>
  
  </div>
</section>

<style>

  .mp-optionnal {
    color: #1ec542;
  }

  .max-width {
    width: 100%;
  }

  .break {
    margin: 0.5rem 0rem 0.5rem 0rem;
    flex-basis: 100%;
  }

  .mp-flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }

  .mp-align-right {
    margin-left: auto;
  }

  .generator-title{
    text-align: left;
  }

  .generator-card {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    background-color: #282828;
    border-radius: 5px;
  }
</style>