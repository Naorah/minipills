<script>
  import { onMount } from 'svelte';
  import { PUBLIC_PILL_URL, PUBLIC_GITHUB_URL, PUBLIC_DISCORD_URL, PUBLIC_DONATION_URL } from '$env/static/public';
	
	let now = new Date(), month, day, year;
	let dateString;
  
  onMount(async ()=> {

    month = '' + (now.getMonth() + 1),
    day = '' + now.getDate(),
    year = now.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    dateString = [year];
  })

</script>

<section class="d-back">
  <div class="mp-container">
    <div class="w-text mp-description">
      Mini Pills by Naorah
    </div>
    <!-- Info pills -->
    <a href="{ PUBLIC_GITHUB_URL }" target="_blank">
      <img src="{ PUBLIC_PILL_URL }/pill?1t=Github&1bc=24292e&l=github" alt="pill-test">
    </a>
    <a href="{ PUBLIC_DISCORD_URL }" target="_blank">
      <img src="{ PUBLIC_PILL_URL }/pill?1t=Discord&1bc=5865F2&l=discord" alt="pill-test">
    </a>
    <a href="{ PUBLIC_DONATION_URL }" target="_blank">
      <img src="{ PUBLIC_PILL_URL }/pill?1t=Donate&l=paypal&1bc=003087" alt="pill-test">
    </a>
    <!-- Free use -->
    <div class="w-text">Free Use {dateString}</div>
  </div>
</section>