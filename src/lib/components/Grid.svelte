<script lang="ts">
  import { pview } from '../stores/items';
  import type { PViewItem } from '../stores/items';
  import { fade } from 'svelte/transition';

  export let items: PViewItem[] = [];
</script>

<div class="grid"
  transition:fade={{ duration: 200 }}>
  {#each items as item (item.id)}
    <div class="item"
      on:click={() => pview.select(item.id)}
      animate:flip={{ duration: 200 }}>
      <img src={item.image} alt={item.title} />
      <div class="title">{item.title}</div>
    </div>
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
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    cursor: pointer;
    transition: transform 0.2s;
  }

  .item:hover {
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px 4px 0 0;
  }

  .title {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
</style>