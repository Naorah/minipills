<script>
  export let isOpen = false;
  export let onClose;

  let reason = '';

  function handleSubmit() {
    if (reason.trim()) {
      // On déclenche un événement avec la raison
      dispatch('submit', reason);
      reason = ''; // Réinitialiser le champ
      onClose(); // Fermer la modale
    }
  }

  function handleClose() {
    reason = ''; // Réinitialiser le champ lorsque la modale se ferme
    onClose();
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

{#if isOpen}
  <div class="modal-overlay">
    <div class="modal-content">
      <h2 class="c-text">Rejection reason</h2>
      <input type="text" bind:value={reason} placeholder="Raison" />
      <button on:click={handleSubmit}>Validate</button>
      <button on:click={handleClose}>Cancel</button>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }

  input {
    margin-bottom: 10px;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  button {
    margin: 5px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background: #ddd;
  }
</style>