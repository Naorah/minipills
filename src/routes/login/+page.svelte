<script>
  import { PUBLIC_PILL_URL } from '$env/static/public';
  export let form
</script>

<section class="c-back">
  <div class="mp-container first-section">
    <h1 class="mp-h1 doc-h1">LOGIN</h1>

    <div>
      <img src="{PUBLIC_PILL_URL}/pill?1t=Connect&2t=for&3t=fame" alt="pill-test">
    </div>
  </div>

  <div class="mp-nav">
    <a class="nav-btn" href="/">Home</a>
    <a class="nav-btn" href="/register">Register</a>
  </div>
</section>


<section class="bg-back min-screen">
  
  <div class="mp-search-container mp-search">
    <h2 class="w-text">Login</h2>
    
    <form action="?/login" method="POST">
      <div>
        <label class="w-text" for="username">Username</label>
        <input class="mp-input" id="username" name="username" type="text" required />
      </div>
    
      <div>
        <label class="w-text" for="password">Password</label>
        <input class="mp-input" id="password" name="password" type="password" required />
      </div>
    
      {#if form?.invalid}
        <p class="error">Username and password is required.</p>
      {/if}
    
      {#if form?.credentials}
        <p class="error">You have entered the wrong credentials.</p>
      {/if}
    
      <button class="submit-button" type="submit">LOG IN</button>
    </form>
  </div>

</section>

<style>
  .submit-button {
    margin-top: 1rem;
    padding: 1rem 2rem 1rem 2rem;
    border: solid 1px var(--color);
    border-radius: 5px;
    background-color: var(--color);
    color: white;
    transition: 0.5s;
  }

  .submit-button:hover {
    background-color: #212121;
    border: solid 1px white;
    cursor: pointer;
  }

  .min-screen {
    height: 80vh;
  }
</style>