<script>
  let basic_link="http://localhost:5173/pill?"
  let pill_link="http://localhost:5173/pill?"
</script>

<section class="c-back">
  <div class="mp-container first-section">
    <h1 class="mp-h1">MINI PILLS</h1>

    <h2>Spread them <span class="bolding">EVERYWHERE</span></h2>

    <div>
      <img src="http://localhost:5173/pill?1t=It looks" alt="pill-test">
    
      <img src="http://localhost:5173/pill?1t=Really" alt="pill-test">
  
      <img src="http://localhost:5173/pill?1t=Cute ?" alt="pill-test">
    </div>

  </div>
</section>

<section>
  <div class="mp-container">
    <div>
      <img class="brand-img" src="/favicon.png" alt="pill-test">
    </div>

    <div class="c-text mp-semi-title">
      <span class="bolding">Customize</span> anything with these <span class="bolding">auto-generated</span> pills !
    </div>

    <img src="http://localhost:5173/pill?1t=Spread&1bc=a12613" alt="pill-test">

    <img src="http://localhost:5173/pill?1t=Colors&1bc=13a155" alt="pill-test">

    <img src="http://localhost:5173/pill?1t=Anywhere&1c=f0be1a" alt="pill-test">

    <img src="http://localhost:5173/pill?1t=Everywhere&1c=e210e6" alt="pill-test">
  </div>
</section>

<section class="bg-back">
  <div class="mp-container">
    <h2 class="mp-how">How is it possible ?</h2>

    <div class="mp-description">
      <div class="w-text">
        Mini pills are here to enable you to show <span class="bolding highlight">anything you need</span> through <span class="bolding highlight">mini vector</span> pills !
      </div>
      <div class="w-text">
        Mini pills are <span class="bolding highlight">generated in a millisecond</span> without any effort, just grab the <span class="bolding highlight">basic link</span>, build <span class="bolding highlight">anything</span> with text, color and background colors !
      </div>
    </div>

    <img src="http://localhost:5173/pill?1t=I really&1bc=a12613" alt="pill-test">

    <img src="http://localhost:5173/pill?1t=want&1bc=a12613" alt="pill-test">

    <img src="http://localhost:5173/pill?1t=to test !&1bc=a12613" alt="pill-test">

    <h2 class="mp-how">Let's try it out !</h2>

    <div class="mp-description">
      <div class="w-text">
        <span class="bolding">Basic link:</span> {basic_link}
      </div>
      <div class="w-text">
        <span class="bolding">First text: (mandatory)</span> 1t=
      </div>
      <div class="w-text">
        <span class="bolding">First color:</span> 1c=
      </div>
      <div class="w-text">
        <span class="bolding">First color background:</span> 1cb=
      </div>
      <div class="w-text">
        <span class="bolding">Second text:</span> 2t=
      </div>
      <div class="w-text">
        <span class="bolding">Second color:</span> 2c=
      </div>
      <div class="w-text">
        <span class="bolding">Second color background:</span> 2cb=
    </div>

    <input bind:value={pill_link}>

    <img src={pill_link} alt="pill-test">

  </div>
</section>

<section class="d-back">
  <div class="mp-container">
    <div class="w-text mp-description">
      More ?
    </div>
    <a href="https://github.com/Naorah/minipills">
      <img src="http://localhost:5173/pill?1t=Github&1bc=24292e" alt="pill-test">
    </a>
  </div>
</section>