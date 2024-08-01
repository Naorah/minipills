<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let mybutton;
  let pill;

  // is open
  let is_open = false;

  function toggleMenu() {
    is_open = !is_open;
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // When the user is scrolling
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
</script>	

<svelte:window on:scroll={scrollFunction} />

<button bind:this={mybutton} on:click={topFunction} id="scroll-top" title="Go to top">
  <i class="gg-chevron-up"></i>
</button>

<div>
  <input type="checkbox" id="active" class="menu-btn" on:click={toggleMenu} bind:checked={is_open}>
  <label bind:this={pill} for="active" class="menu-btn">
    <div class="nav-icon">
      <Icon width=35 icon="pepicons-pop:pill-circle"/>
    </div>
  </label>
  <div class="wrapper">
    <ul>
      <li><a on:click={toggleMenu} href="/" class="nav-link">Home</a></li>
      <li><a on:click={toggleMenu} href="/docs">Documentation</a></li>
      <li><a on:click={toggleMenu} href="/generator">Generator</a></li>
      <li><a on:click={toggleMenu} href="/logo">Logo</a></li>
      <li><a on:click={toggleMenu} href="/submit-logo">Add Logo</a></li>
      <li><a on:click={toggleMenu} href="/stats">Statistics</a></li>
    </ul>
  </div>
</div>

<style>
  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrapper{
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--back);
    clip-path: circle(25px at calc(100% - 50px) calc(100% - 50px));
    transition: all 0.3s ease-in-out;
  }
  #active:checked ~ .wrapper{
    clip-path: circle(75%);
  }
  .menu-btn{
    position: fixed;
    z-index: 3;
    right: 25px;
    bottom: 25px;
    height: 50px;
    width: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 15px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    background: var(--back);
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    /** Highlight when clicked */
    -webkit-tap-highlight-color: transparent;
    outline: none;
    user-select: none;
  }
  #active:checked ~ .menu-btn{
    color: #fff;
  }
  #active:checked ~ .menu-btn i:before{
    content: "\f00d";
  }
  .wrapper ul{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    list-style: none;
    text-align: center;
  }
  .wrapper ul li{
    margin: 15px 0;
  }
  .wrapper ul li a{
    color: none;
    text-decoration: none;
    font-size: 30px;
    font-weight: 500;
    padding: 5px 30px;
    color: #fff;
    border-radius: 15px;
    background: var(--back);
    position: relative;
    line-height: 50px;
    transition: all 0.3s ease;
  }
  .wrapper ul li a:hover{
    color: var(--color);
  }
  input[type="checkbox"]{
    display: none;
  }

  /**
 * SCROLL TOP BUTTON
**/

#scroll-top {
  display: none;
  position: fixed;
  bottom: 80px;
  right: 25px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: var(--color);
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 15px;
}

#scroll-top{
  font-size: 2rem;
}

.gg-chevron-up {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs,1));
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px
}

.gg-chevron-up::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  border-top: 2px solid;
  border-right: 2px solid;
  transform: rotate(-45deg);
  left: 4px;
  bottom: 2px
}

  @keyframes rotate {
    0%{
      filter: hue-rotate(0deg);
    }
    100%{
      filter: hue-rotate(360deg);
    }
  }
  @keyframes pillrotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* styles.css */

</style>