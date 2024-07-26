<script>
  import { onMount } from 'svelte';
  import { Line } from 'svelte-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

  let chartData = { labels: [], datasets: [] };
  let totalData = { labels: [], datasets: [] };

  async function fetchStats() {
    const response = await fetch('/api/daily-stats?day=' + (new Date().getDay()) +'&month=' + (new Date().getMonth()) + '&year=' + new Date().getFullYear());
    const data = await response.json();
    
    // Préparer les données pour Chart.js
    const byType = data.byType;
    const total = data.total;

    const colors = {
      "png": "#eb7734",
      "svg": "#2884e0",
      "brand": "#1f9c1f",
    }

    // Build labels
    chartData.labels = []
    for (let svg_data of byType['svg']) {
      chartData.labels.push(svg_data.date)
    }

    // Build data
    chartData.datasets = Object.keys(byType).map(type => ({
      label: `${type}`,
      data: chartData.labels.map(date => {
        const entry = byType[type].find(e => e.date === date);
        return entry ? entry.count : 0;
      }),
      borderColor: colors[type],
      fill: false
    }));

    totalData.labels = total.map(entry => entry.date);
    totalData.datasets.push({
      label: 'Total',
      data: total.map(entry => entry.count),
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    });
  }

  onMount(() => {
    fetchStats();
  });
</script>

<style>
  .chart-container {
    width: 80%;
    margin: auto;
  }
</style>

<section class="c-back">

  <div class="mp-container first-section">
    <h1 class="mp-h1 doc-h1">MINI STATS</h1>
  
  </div>

  <div class="mp-nav">
    <a class="nav-btn" href="/">Home</a>
  </div>
</section>

<div class="chart-container">
  <h2>Stats by Format</h2>
  <Line data={chartData} options={{
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Pills per format' }
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Pills generated' } }
    }
  }} />

  <h2>Total</h2>
  <Line data={totalData} options={{
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Total pill generation' }
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Pills generated' } }
    }
  }} /> 
</div>