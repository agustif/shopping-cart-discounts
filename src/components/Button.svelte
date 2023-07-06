<script lang="ts">
  export let disabled = false;
  export let className = "";
  export let onClick;
</script>
  
<button class={className} disabled={disabled} on:click={onClick}> <slot /> </button>

<style>
  button {
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    justify-self: center;
    width: 100%;
    font-size: 120%;
    background-color: #6E51F6;
    color: white;
  }
  button:hover {
    background-color: #513da9;
    color: white;
    transition: all 0.3s ease-in-out;
  }
  button:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
  .remove {
    background-color: rgb(194, 0, 0);
    max-width: 100px; 
    font-size: 70%;
  }
  .remove:hover {
    background-color: rgb(129, 0, 0);
  }
</style>
