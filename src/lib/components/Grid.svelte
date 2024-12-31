<script lang="ts">
  import { pview } from '../stores/items';
  import type { PViewItem } from '../stores/items';
  import { fade } from 'svelte/transition';

  export let items: PViewItem[] = [];

  function handleSelect(id: string, event: MouseEvent | KeyboardEvent) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    pview.select(id);
  }
</script>

<div class="grid" transition:fade={{ duration: 200 }}>
  {#each items as item (item.id)}
    <button
      class="item"
      role="gridcell"
      on:click={(e) => handleSelect(item.id, e)}
      on:keydown={(e) => handleSelect(item.id, e)}>
      {#if item.image}
        <img src={item.image} alt={item.title} />
      {/if}
      <div class="title">{item.title}</div>
    </button>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .item {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s;
    overflow: hidden;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .item:hover {
    transform: translateY(-2px);
    border-color: #999;
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .title {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
</style>