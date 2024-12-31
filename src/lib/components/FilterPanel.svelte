<script lang="ts">
  import { pview } from '../stores/items';
  import type { PViewItem } from '../stores/items';
  
  export let items: PViewItem[] = [];
  
  $: filterKeys = [...new Set(
    items.flatMap(item => Object.keys(item.metadata))
  )].sort();
  
  function updateFilter(key: string, value: unknown) {
    pview.setFilters({ ...pview.getFilters(), [key]: value });
  }
</script>

<aside>
  <div class="search">
    <input type="text" placeholder="Search..." />
  </div>
  
  {#each filterKeys as key}
    <div class="filter-group">
      <h3>{key}</h3>
      <div class="filter-values">
        {#each [...new Set(items.map(item => item.metadata[key]))] as value}
          <label class="filter-option">
            <input type="checkbox" />
            <span>{value}</span>
          </label>
        {/each}
      </div>
    </div>
  {/each}
</aside>

<style>
  aside {
    height: 100vh;
    border-right: 1px solid #eee;
    background: white;
    padding: 1rem;
    overflow-y: auto;
  }

  .search input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .filter-group {
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }

  .filter-values {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .filter-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.25rem 0;
  }

  .filter-option:hover {
    background: #f5f5f5;
  }
</style>