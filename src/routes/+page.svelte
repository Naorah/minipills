<script>
  import { PUBLIC_PILL_URL, PUBLIC_SVELTE_NPM_PACKAGE } from '$env/static/public';
  import { lazyLoad } from '$lib/LazyLoad.js'
  import Icon from '@iconify/svelte';

  let basic_link= PUBLIC_PILL_URL
  let pill_link = PUBLIC_PILL_URL+"/pill?"

  let steps = [
    {
      "text": "Add first text",
      "button": "1t=MiniPills",
      "url_shard": "1t=MiniPills",
      "pushed": false
    },
    {
      "text": "Change text color",
      "button": "&1c=FFC460",
      "url_shard": "&1c=FFC460",
      "pushed": false
    },
    {
      "text": "Change back color",
      "button": "&1bc=9D1B6F",
      "url_shard": "&1bc=9D1B6F",
      "pushed": false
    },
    {
      "text": "Add another text",
      "button": "&2t=is awesome",
      "url_shard": "&2t=is awesome",
      "pushed": false
    },
    {
      "text": "Change second color",
      "button": "&2c=667558",
      "url_shard": "&2c=667558",
      "pushed": false
    },
    {
      "text": "Change back color",
      "button": "&2bc=dedede",
      "url_shard": "&2bc=dedede",
      "pushed": false
    },
    {
      "text": "Add shadows",
      "button": "&s",
      "url_shard": "&s",
      "pushed": false
    },
    {
      "text": "Add a logo",
      "button": "&l=minipills",
      "url_shard": "&l=minipills",
      "pushed": false
    },
    {
      "text": "Add logo color",
      "button": "&lc=FFC460",
      "url_shard": "&lc=FFC460",
      "pushed": false
    }
  ]

  let copy_caption="COPY URL";

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
    pill_link = basic_link+"/pill?";
    for (let step of steps) {
      step.pushed = false;
      step.button = step.url_shard;
    }
    steps = steps;
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/pill.css" />
</svelte:head>

<section class="c-back">
  <div class="mp-container first-section">
    <h1 class="mp-h1 big">MINI PILLS</h1>

    <div class="mp-mb">
      <h2 class="mp-spread bolding mp-big-text hide-phone">
        <div>
          YOUR <span class="w-text bolding">DOSE</span> OF DATA
        </div>
        <div>
          PERFECTLY <span class="w-text bolding">PACKED</span> IN <span class="w-text bolding">PILLS</span>
        </div>
      </h2> 
    </div>

    <div>
      <img use:lazyLoad src="{PUBLIC_PILL_URL}/pill?1t=Pills" alt="pill-test">

      <img use:lazyLoad src="{PUBLIC_PILL_URL}/pill?1t=looks" alt="pill-test">
    
      <img use:lazyLoad src="{PUBLIC_PILL_URL}/pill?1t=really" alt="pill-test">
  
      <img use:lazyLoad src="{PUBLIC_PILL_URL}/pill?1t=cute ?" alt="pill-test">
    </div>

  </div>

  <!-- LOGO LINKS -->
  <div class="mp-nav">
    <!-- DOCUMENTATION -->
    <a class="nav-btn" href="docs">Documentation</a>
    <!-- TO THE LOGO PAGE -->
    <a class="nav-btn" href="logo">Logos</a>
  </div>
</section>

<section>
  <div class="mp-container">
    <div>
      <img use:lazyLoad class="brand-img" src="/favicon.png" alt="pill-test">
    </div>

    <h2 class="c-text mp-semi-title">
      <div class="bolding mp-big-text">MINI PILLS</div> 
      <div>
        <span class="bg-text">just for your data</span>
      </div>
      <div>
        <span class="bolding mp-big-text">ADDICTION</span>
      </div>
    </h2>

    <img use:lazyLoad src="{PUBLIC_PILL_URL}/pill?1t=Spread&1bc=a12613" alt="pill-test">

    <img use:lazyLoad src="{PUBLIC_PILL_URL}/pill?1t=Colors&1bc=13a155" alt="pill-test">

    <img use:lazyLoad src="{PUBLIC_PILL_URL}/pill?1t=Anywhere&1c=f0be1a" alt="pill-test">

    <img use:lazyLoad src="{PUBLIC_PILL_URL}/pill?1t=Everywhere&1c=e210e6" alt="pill-test">
  </div>
</section>

<section class="bg-back">
  <div class="mp-container">
    <h2 class="mp-how">Pills That Proliferate Your Data Reach</h2>

    <div class="mp-description w-text">

      <div class="grid-container">
        <div class="grid-item">
          <div class="mp-explain-img">
            <img use:lazyLoad height=150 src="/svg/amplify.svg" alt="amplify"/>
          </div>
          <div class="mp-grid-title">
            AMPLIFY
          </div>
          <div class="mp-grid-description">
            Seek for a big <span class="bolding highlight">impact</span>, with an <span class="bolding highlight">attractive</span> design.
            No need to think of <span class="bolding highlight">how</span>, we hold the <span class="bolding highlight">solution</span>.
          </div>
        </div>
        <div class="grid-item">
          <div class="mp-explain-img">
            <img use:lazyLoad height=150 src="/svg/minify.svg" alt="amplify"/>
          </div>
          <div class="mp-grid-title">
            MINIFY
          </div>
          <div class="mp-grid-description">
            <span class="bolding highlight">Less</span> is <span class="bolding highlight">More</span>.
          </div>
        </div>
        <div class="grid-item">
          <div class="mp-explain-img">
            <img use:lazyLoad height=150 src="/svg/fix.svg" alt="amplify"/>
          </div>
          <div class="mp-grid-title">
            GET A FIX
          </div>
          <div class="mp-grid-description">
            We <span class="bolding highlight">take care</span> of you, we'll never stop to <span class="bolding highlight">bring you</span> mini pills.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bg-back">
  <div class="mp-container">
    <h2 class="mp-how">Let's build a pill together</h2>

    <div class="w-text">
      <div class="mp-mb">
        <div>
          Parameters give the pill content !
        </div>
        <div>
          For each step, push the button to craft the pill
        </div>
      </div>

      <table class="practice-table">
        <thead>
            <tr>
                <th>
                  Steps
                </th>
                <th>
                  Build with buttons
                </th>
            </tr>
        </thead>
        <tbody>
          {#each steps as step}
            <tr>
              <td>
                <span style="text-align: left;">{step.text}</span>
              </td>
              <td>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span style="text-align: right; background-color: {step.pushed ? '#a12613' : '#535353'}" class="mp-test-clickable" on:click={() => pill_link += step.url_shard} on:click={() => step.pushed = true} on:click={() => step.button = "OK"}>{step.button}</span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="input-zone mp-grid-container">
      <div>
        <Icon style="color:white;" icon="ion:caret-down" /> 
      </div>
      <div>
        {#if pill_link.startsWith(`${basic_link}`)}
          <img src="{pill_link}" alt="pill-test">
        {:else}
          <img src="{PUBLIC_PILL_URL}/pill?1t=Wrong url&1bc=a12613" alt="pill-test">
        {/if}
      </div>
      <div>
        <Icon style="color:white;" icon="ion:caret-up" /> 
      </div>
      
      <div class="mp-tab">
        <input class="mp-input" bind:value={pill_link}/>
      </div>

      <div>
        <button on:click={() => copyToPaperClip(pill_link)} class="mp-white-button">{copy_caption}</button>
        <button on:click={() => reset_link()} class="mp-red-button">RESET</button>
      </div>

      <div class="w-text final">
        If you don't have enough, you can visit the <a class="mp_link" href="/docs">documentation</a>, all the <a class="mp_link" href="/logo">logos</a> available today, and more !
      </div>
    </div>
  </div>
</section>

<!-- SECOND SECTION WITH IMAGES -->

<section class="bg-back">
  <div class="mp-container">
    <h2 class="mp-how">Compact Pills for Powerful Information</h2>
  
    <div class="mp-description w-text">
  
      <div class="grid-container">
        <div class="grid-item">
          <div class="mp-explain-img">
            <img use:lazyLoad height=150 src="/svg/fast.svg" alt="amplify"/>
          </div>
          <div class="mp-grid-title">
            VERY FAST
          </div>
          <div class="mp-grid-description">
            A pill <span class="bolding highlight">delivered</span> in just a hand of <span class="bolding highlight">milliseconds</span>
          </div>
        </div>
        <div class="grid-item">
          <div class="mp-explain-img">
            <img use:lazyLoad height=150 src="/svg/multi.svg" alt="amplify"/>
          </div>
          <div class="mp-grid-title">
            MULTI USAGE
          </div>
          <div class="mp-grid-description">
            <div>Need <span class="bolding highlight">SVG</span> ? I got it ! </div>
            <div>Need <span class="bolding highlight">PNG</span> ?  I got it ! </div>
            <div>Need <span class="bolding highlight">customisation</span> ? Just guess !</div>
          </div>
        </div>
        <div class="grid-item">
          <div class="mp-explain-img">
            <img use:lazyLoad height=150 src="/svg/refix.svg" alt="amplify"/>
          </div>
          <div class="mp-grid-title">
            GET A FIX AGAIN
          </div>
          <div class="mp-grid-description">
            I know you're already <span class="bolding highlight">addict</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="mp-container">
    <div class="mp-description">

      <h2>Your addiction everywhere.</h2>

      <!-- MARKDOWN INTEGRATION -->
      <div>
        <div class="pill-zone">
          <div class="pill-part pill-left pill-red">
            <div class="icon-container">
              <Icon style="color: white;" width=30 icon="bi:markdown"/>
            </div>
          </div>

          <div class="pill-part pill-right pill-black">
            <div class="bolding">
              Markdown
            </div>
            <div class="pill-text-big">
              A <span class="bolding">simple</span> markdown integration to display a minipill and a link of your choice!
            </div>
            <div class="pill-text-small">
              A <span class="bolding">simple</span> markdown integration
            </div>
          </div>
        </div>

        <!-- DISCORD INTEGRATION -->
        <div class="pill-zone">
          
          <div class="pill-part pill-left pill-red">
            <div class="icon-container">
              <Icon style="color: white;" width=30 icon="ic:baseline-discord"/>
            </div>
          </div>
          
          <div class="pill-part pill-right pill-black">
            <div class="bolding">
              Discord
            </div>
            <div class="pill-text-big">
              Discord can't display svg, so create a <span class="bolding">png minipill</span> with /pillng !
            </div>
            <div class="pill-text-small">
              Send <span class="bolding">png minipill</span> instead !
            </div>
          </div>

        </div>

        <!-- WEBSITE INTEGRATION -->
        <div class="pill-zone">
          
          <div class="pill-part pill-left pill-red">
            <div class="icon-container">
              <Icon style="color: white;" width=30 icon="fluent-mdl2:website"/>
            </div>
          </div>
          
          <div class="pill-part pill-right pill-black">
            <div class="bolding">
              Website
            </div>
            <div class="pill-text-big">
              &lt;img src=&quot;{PUBLIC_PILL_URL}/pill?1t=<span class="bolding">IN IMG TAG !</span>&quot; alt=&quot;minipills link&quot;/&gt;
            </div>
            <div class="pill-text-small">
              Instant integration in img tags !
            </div>
          </div>
        </div>

        <!-- DOCUMENTATION INTEGRATION -->
        <div class="pill-zone">
          
          <div class="pill-part pill-left pill-red">
            <div class="icon-container">
              <Icon icon="material-symbols:docs-add-on" />
            </div>
          </div>
          
          <div class="pill-part pill-right pill-black">
            <div class="bolding">
              Documentation
            </div>
            <div class="pill-text-big">
              Colors attracts your eyes ! Use the highly customisation to enrich your docs !
            </div>
            <div class="pill-text-small">
              Enrich <span class="bolding">docs</span> with colored pills !
            </div>
          </div>

        </div>

        <!-- STATUS INTEGRATION -->
        <div class="pill-zone">
          
          <div class="pill-part pill-left pill-red">
            <div class="icon-container">
              <Icon icon="pajamas:status-health" />
            </div>
          </div>
          
          <div class="pill-part pill-right pill-black">
            <div class="bolding">
              Status
            </div>
            <div class="pill-text-big">
              Use minipills as indicators for all of your projects with nice logos !
            </div>
            <div class="pill-text-small">
              Display with real-time pills !
            </div>
          </div>

        </div>

        <!-- PRESENTATION INTEGRATION -->
        <div class="pill-zone">
          
          <div class="pill-part pill-left pill-red">
            <div class="icon-container">
              <Icon style="color: white;" width=30 icon="uil:presentation-line"/>
            </div>
          </div>
          
          <div class="pill-part pill-right pill-black">
            <div class="bolding">
              Presentations
            </div>
            <div class="pill-text-big">
              Generate images and display them into your slides with /pillng !
            </div>
            <div class="pill-text-small">
              Png generation on your slides !
            </div>
          </div>

        </div>
      </div>
       
      
      <div>
        <h3 class="icon-text-container">
          <div>
            <Icon width=20 icon="gg:more"/>
            <span class="v-align">And more !</span>
          </div>
        </h3>
        <div>
          As bitmap and vector images, the places to use minipills are unlimited !
        </div>
      </div>
    </div>
  </div>
</section>

<style>

  .icon-text-container {
    display: flex;
    align-items: center; /* Aligne les éléments verticalement */
    justify-content: center;
  }

  .v-align {
    margin-left: 8px;
  }

  .text-zone {
    font-size: 1rem;
    border: 1px solid #4d4d4d;
    border-radius: 5px;
    margin: 0rem 5rem 0.5rem 5rem;
    padding: 0.5rem 0rem 0.5rem 0rem;
  }

  .final {
    line-height: 2rem;
  }

  .mp_link {
    text-decoration: none;
    color: white;
    background-color: #4d4d4d;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    border-radius: 5px;
  }

  .mp-explain-img {
    margin-top: auto;
    height: 200px;
  }

  .mp-grid-title {
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 0.2rem;
    margin-bottom: 1rem;
  }

  .mp-grid-description {
    margin-right: 3rem;
    margin-left: 3rem;
  }

  /* Conteneur de la grille */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 colonnes de largeur égale */
    gap: 16px; /* Espacement entre les éléments de la grille */
  }

  /* Style des éléments de la grille */
  .grid-item {
    padding: 0px; /* Espacement intérieur pour les éléments */
    margin-top: 1rem;
  }

  .where-to-use-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 3 colonnes de largeur égale */
    gap: 16px; /* Espacement entre les éléments de la grille */
  }

    /* Style des éléments de la grille */
  .where-to-use-item {
    padding: 0px; /* Espacement intérieur pour les éléments */
    margin-top: 0.5rem;
  }

  /* Media query pour les écrans inférieurs à 1000px */
  @media (max-width: 1000px) {
    .grid-container {
      grid-template-columns: 1fr;
    }

    .where-to-use-grid {
      grid-template-columns: 1fr;
    }

    .text-zone {
      margin: auto;
      margin-bottom: 0.5rem;
    }
  }
</style>