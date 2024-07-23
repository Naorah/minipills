<script>
  import { PUBLIC_PILL_URL } from '$env/static/public';
  let basic_link= PUBLIC_PILL_URL
  let pill_link = PUBLIC_PILL_URL

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
    pill_link = basic_link;
    for (let step of steps) {
      step.pushed = false;
      step.button = step.url_shard;
    }
    steps = steps;
  }
</script>

<section class="c-back">
  <div class="mp-container first-section">
    <h1 class="mp-h1">MINI PILLS</h1>

    <div class="mp-mb">
      <h2 class="mp-spread bolding mp-big-text">SPREAD</h2> 
      <h2 class="mp-spread"><span class="w-text bolding">EVERYWHERE</span></h2>
    </div>

    <div>
      <img src="{PUBLIC_PILL_URL}1t=Pills" alt="pill-test">

      <img src="{PUBLIC_PILL_URL}1t=looks" alt="pill-test">
    
      <img src="{PUBLIC_PILL_URL}1t=really" alt="pill-test">
  
      <img src="{PUBLIC_PILL_URL}1t=cute ?" alt="pill-test">
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
      <img class="brand-img" src="/favicon.png" alt="pill-test">
    </div>

    <h2 class="c-text mp-semi-title">
      <div class="bolding mp-big-text">CUSTOMIZE</div> 
      <div>
        <span class="bg-text">anything with these</span>
      </div>
      <div>
        <span class="bolding mp-big-text">AUTO-GENERATED</span>
      </div>
      <div>
        <span class="bg-text">pills !</span>
      </div>
    </h2>

    <img src="{PUBLIC_PILL_URL}1t=Spread&1bc=a12613" alt="pill-test">

    <img src="{PUBLIC_PILL_URL}1t=Colors&1bc=13a155" alt="pill-test">

    <img src="{PUBLIC_PILL_URL}1t=Anywhere&1c=f0be1a" alt="pill-test">

    <img src="{PUBLIC_PILL_URL}1t=Everywhere&1c=e210e6" alt="pill-test">
  </div>
</section>

<section class="bg-back">
  <div class="mp-container">
    <h2 class="mp-how">Displayable pills</h2>

    <div class="mp-description">
      <div class="w-text mp-text-shard">
        Mini pills are here to enable you to show <span class="bolding highlight">anything you need</span> through <span class="bolding highlight">mini vector</span> pills !
      </div>
      <div class="w-text mp-text-shard">
        Mini pills are <span class="bolding highlight">generated in a millisecond</span> without any effort, just grab the <span class="bolding highlight">basic link</span>, build <span class="bolding highlight">anything</span> with text, color and background colors !
      </div>
    </div>

    <img src="{PUBLIC_PILL_URL}1t=I really&1bc=a12613" alt="pill-test">

    <img src="{PUBLIC_PILL_URL}1t=want&1bc=a12613" alt="pill-test">

    <img src="{PUBLIC_PILL_URL}1t=to test !&1bc=a12613" alt="pill-test">

    <h2 class="mp-how">Generate more pills</h2>

    <div class="mp-description w-text">
      <div class="mp-text-shard">
        Mini pills are <span class="bolding highlight">generated</span> as svg directly from a link !
      </div>
      <div class="mp-text-shard">
        You can generate them by grabing the <span class="bolding highlight">basic link</span> below, and add the <span class="bolding highlight">rights parameters</span> for you to get the right output !
      </div>
      <div class="mp-text-shard">
        It's very easy but why not <span class="bolding highlight">try it out</span> a bit ?
      </div>
      <div class="mp-text-shard">
        Try to <span class="bolding highlight">push</span> the differents buttons below and see the <span class="bolding highlight">pill building</span> ! If you've <span class="bolding highlight">not enough</span> you can change the <span class="bolding highlight">url directly</span> and test more combinations !
      </div>
    </div>

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
        {#if pill_link.startsWith(`${basic_link}`)}
          <img src={pill_link} alt="pill-test">
        {:else}
          <img src="{PUBLIC_PILL_URL}1t=Wrong url&1bc=a12613" alt="pill-test">
        {/if}
      </div>
      
      <div>
        <input class="mp-input" bind:value={pill_link}/>
      </div>

      <div>
        <button on:click={() => copyToPaperClip(pill_link)} class="mp-white-button">{copy_caption}</button>
        <button on:click={() => reset_link()} class="mp-red-button">RESET</button>
      </div>
    </div>
  </div>
</section>