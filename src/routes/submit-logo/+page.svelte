<script>
  import { PUBLIC_PILL_URL } from '$env/static/public';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  export let data;

  let name;
  let display_name;
  let logo;
  let color;
  let discord;
  let csrfToken;

  const message = writable('');

  onMount(async () => {
    const response = await fetch('/api/csrf-token');
    if (response.ok) {
      csrfToken = await response.text();
    } else {
      message.set('Failed to get CSRF token');
    }
  });

  const submitLogo = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('display_name', display_name);
    formData.append('logo', logo);
    formData.append('color', color);
    formData.append('discord', discord);

    const response = await fetch('/api/logo_submission', {
      method: 'POST',
      headers: {
        'x-csrf-token': csrfToken
      },
      body: formData
    });

    if (response.ok) {
      message.set('Logo submitted successfully!');
      // Clear the form
      name = '';
      display_name = '';
      logo = '';
      color = '';
      discord = '';
      // reload the logos
      data = fetch('/api/logo_submission').json();
    } else {
      const error = await response.json();
      message.set(`Error: ${error.message}...`);
    }
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-'); 
  }

</script>

<section class="c-back">

  <div class="mp-container first-section">
    <h1 class="mp-h1 doc-h1">SUBMIT A NEW LOGO</h1>
  
    <div>
      <img alt="mini-pill" src="{PUBLIC_PILL_URL}/pill?1t=Help the pill&2t=grow&2bc=1ec542" />
    </div>
  
  </div>

  <div class="mp-nav">
    <a class="nav-btn" href="/">Home</a>
    <a class="nav-btn" href="logo">Logos</a>
  </div>
</section>

<section class="bg-back">
  <div class="mp-search-container mp-search">
    <h2 class="w-text">Submit a Logo</h2>
    <form on:submit={submitLogo}>
      <label class="w-text">
        Logo tag:
        <div>
          <input class="mp-input-static" type="text" bind:value={name} required />
        </div>
      </label>
      <label class="w-text">
        Display Name:
        <div>
          <input class="mp-input-static" type="text" bind:value={display_name} required />
        </div>
      </label>
      <label class="w-text">
        Logo file (svg):
        <div>
          <input class="mp-input-static" type="file" accept=".svg" on:change={(e) => logo = e.target.files[0]} required />
        </div>
      </label>
      <label class="w-text">
        Brand color (ff0000):
        <div>
          <input class="mp-input-static" type="text" bind:value={color} required />
        </div>
      </label>
      <label class="w-text">
        Your discord: (optionnal)
        <div>
          <input class="mp-input-static" type="text" bind:value={discord} />
        </div>
      </label>
      <button type="submit">Submit</button>
    </form>
    <p class="w-text">{$message}</p>
  </div>
</section>

<section class="bg-back">
  <div class="mp-container">
    <div class="up-line"></div>
    <h2 class="w-text">Logos waiting for approval</h2>
    {#if data.logos.length > 0}
      <div class="grid-container">
        {#each data.logos as logo}
          <div class="grid-item">
            <div class="logo-pill">
              <div class="submit-name">
                <div>{logo.display_name}</div>
                <div class="color-dot" style="background-color: #{logo.color};"></div>
              </div>
              <div>
                <img class="submit-logo" src={`data:image/svg+xml;utf8,${logo.logo}`} alt="svg"/>
              </div>
              {#if logo.createdAt}
                <div>
                  {formatDate(logo.createdAt)}
                </div>
              {/if}
              {#if logo.discord}
                <div>
                  from: {logo.discord}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="mp-description">

        <div class="w-text mp-text-shard">
          No logo waiting...
        </div>
        <div class="w-text mp-text-shard">
          Looks like everything has been added, it's time to make a suggestion !
        </div>
        
      </div>
    {/if}
  </div>
</section>

<style>

  .color-dot {
    width: 2px;
    height: 2px;
    padding: 5px;
    border-radius:5px;
    margin-left: 0.5rem;
    margin-top: 0.25rem;
  }

  .up-line {
    border-top: solid;
    border-color: rgb(19, 19, 19);
    margin: auto;
    width: 80%;
  }

  .submit-logo {
    width: 100px;
    height: 100px;
  }

  .submit-name {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .mp-input-static {
    width: 90%;
    padding: 12px;
    border-radius: 12px;
    border: 1.5px solid var(--darker);
    outline: none;
    box-shadow: 0px 0px 20px -18px;
  }

  .mp-input-static:focus {
    padding: 11px;
    border: 2px solid var(--color);
  }

  label {
    display: block;
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: var(--color);
    color: white;
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }
  button:hover {
    background-color: #680000;
  }
  p {
    margin-top: 1rem;
  }

  .grid-container {
    display: grid;
  }

  .grid-item {
    position: relative;
    background-color: #ddd;
    border-radius: 15px;
    text-align: center;
  }


  @media (max-width: 499px) {
    .grid-container {
      gap: 20px;
      row-gap: 40px;
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 500px) and (max-width: 799px) {
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
</style>