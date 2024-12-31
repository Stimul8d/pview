<script lang="ts">
  import { onMount } from 'svelte';
  import { pview } from './lib/stores/items';
  import Grid from './lib/components/Grid.svelte';
  import FilterPanel from './lib/components/FilterPanel.svelte';
  import './app.css';

  let items = [];
  let filteredItems = [];
  
  pview.subscribe(state => items = state.items);
  pview.filtered.subscribe(filtered => filteredItems = filtered);

  // Test data - we'll swap this out later
  onMount(() => {
    const testItems = Array(50).fill(null).map((_, i) => ({
      id: i.toString(),
      title: `Test Item ${i}`,
      image: `https://picsum.photos/seed/${i}/400/300`,
      metadata: {
        type: i % 2 ? 'photo' : 'document',
        year: 2020 + (i % 5),
        tags: ['test', 'demo']
      }
    }));
    pview.setItems(testItems);
  });
</script>

<main>
  <FilterPanel {items} />
  <div class="viewport">
    <header>
      <div class="tools">
        <button>Grid</button>
        <button>Chart</button>
      </div>
    </header>
    <div class="content">
      <Grid items={filteredItems} />
    </div>
  </div>
</main>

<style>
  main {
    height: 100vh;
    display: grid;
    grid-template-columns: var(--filter-width) 1fr;
  }

  .viewport {
    display: grid;
    grid-template-rows: var(--header-height) 1fr;
    overflow: hidden;
  }

  header {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .tools {
    display: flex;
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