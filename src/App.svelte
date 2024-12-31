<script lang="ts">
  import { onMount } from 'svelte';
  import Papa from 'papaparse';
  import { pview } from './lib/stores/items';
  import Grid from './lib/components/Grid.svelte';
  import FilterPanel from './lib/components/FilterPanel.svelte';
  import './app.css';

  let items = [];
  let filteredItems = [];
  let currentFile = '';
  
  pview.subscribe(state => items = state.items);
  pview.filtered.subscribe(filtered => filteredItems = filtered);

  async function loadData(file: string) {
    currentFile = file;
    const response = await window.fs.readFile(`data/${file}`);
    const text = new TextDecoder().decode(response);
    
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const items = results.data.map((row, i) => ({
          id: row.id || i.toString(),
          title: row.title || row.name || row.race_name,
          image: row.image_url,
          metadata: row
        }));
        pview.setItems(items);
      }
    });
  }
</script>

<main>
  <header class="app-header">
    <h1>pview</h1>
    <select bind:value={currentFile} on:change={() => loadData(currentFile)}>
      <option value="">Select dataset...</option>
      <option value="f1_races.csv">Formula 1 Races</option>
      <option value="albums.csv">Classic Albums</option>
      <option value="artifacts.csv">Archaeological Finds</option>
      <option value="peripherals.csv">Computer Peripherals</option>
    </select>
  </header>

  <div class="main-content">
    <FilterPanel {items} />
    <div class="viewport">
      <div class="tools">
        <button>Grid</button>
        <button>Chart</button>
      </div>
      <div class="content">
        <Grid items={filteredItems} />
      </div>
    </div>
  </div>
</main>

<style>
  main {
    height: 100vh;
    display: grid;
    grid-template-rows: var(--header-height) 1fr;
  }

  .app-header {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h1 {
    font-size: 1.2rem;
    font-weight: 500;
  }

  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .main-content {
    display: grid;
    grid-template-columns: var(--filter-width) 1fr;
    overflow: hidden;
  }

  .viewport {
    display: grid;
    grid-template-rows: var(--header-height) 1fr;
  }

  .tools {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .content {
    overflow-y: auto;
    background: #f5f5f5;
  }

  button {
    padding: 0.5rem 1rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #f5f5f5;
  }
</style>