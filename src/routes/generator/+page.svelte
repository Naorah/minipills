<script>
  import { PUBLIC_PILL_URL } from '$env/static/public';
  import Icon from '@iconify/svelte';

  let pill_link = PUBLIC_PILL_URL+"/pill?";

  let copy_caption = "COPY";

  let text_1 = {
    text: "",
    color: "",
    back: ""
  };

  let text_2 = {
    text: "",
    color: "",
    back: ""
  };

  let text_3 = {
    text: "",
    color: "",
    back: ""
  };

  let logo = "";
  let logo_color = "";

  let shadow = false;

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
    pill_link = PUBLIC_PILL_URL+"/pill?";
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
      <div class="w-text">
        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            First text ( Hey ! )
          </div>
          <div class="mp-align-right bolding highlight">
            REQUIRED
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_1.text}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            First color ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_1.color}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            First background ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_1.back}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Second text ( Hey ! )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_2.text}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Second color ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_2.color}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Second background ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_2.back}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Third text ( Hey ! )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_3.text}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Third color ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_3.color}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Third background ( FFFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={text_3.back}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Logo ( minipills )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={logo}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Logo color ( FFFFF )
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input class="mp-input max-width" bind:value={logo_color}/>
        </div>

        <div class="generator-card mp-flex-container">
          <div class="generator-title">
            Shadow
          </div>
          <div class="mp-align-right bolding mp-optionnal">
            OPTIONNAL
          </div>
          <div class="break"></div>
          <input type="checkbox" class="mp-input max-width" bind:checked={shadow}/>
        </div>

      </div>
  
      <!-- PILL --> 
      <div>
        {#if pill_link.startsWith(`${PUBLIC_PILL_URL}`)}
          <img src="{pill_link}" alt="pill-test">
        {:else}
          <img src="{PUBLIC_PILL_URL}/pill?1t=Wrong url&1bc=a12613" alt="pill-test">
        {/if}
      </div>
  
      <!-- COPY BUTTONS -->
      <div class="mp-tab">
        <input class="mp-input" bind:value={pill_link}/>
      </div>
  
      <div>
        <button on:click={() => copyToPaperClip(pill_link)} class="mp-white-button">{copy_caption}</button>
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