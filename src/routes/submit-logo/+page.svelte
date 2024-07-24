<script>
  import { PUBLIC_PILL_URL } from '$env/static/public';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

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

    const response = await fetch('/api/logo', {
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
    } else {
      const error = await response.json();
      message.set(`Error: ${error.message}... Verify you put a .svg file`);
    }
  };

</script>

<section class="c-back">

  <div class="mp-container first-section">
    <h1 class="mp-h1">SUBMIT A NEW LOGO</h1>
  
    <div>
      <img alt="mini-pill" src="{PUBLIC_PILL_URL}&1t=Help the pill&2t=grow&2bc=1ec542" />
    </div>
  
  </div>

  <div class="mp-nav">
    <a class="nav-btn" href="/">Home</a>
    <a class="nav-btn" href="logo">Logos</a>
  </div>
</section>

<section class="bg-back min-screen">
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
        Brand color:
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

<style>
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
</style>