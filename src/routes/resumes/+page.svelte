<script lang="ts">
  export let data;
  console.log('data: ', data);

</script>

<div class="wrapper">
  <div class="container mx-auto p-8 space-y-8">
  <h1 class="h1">Resumes</h1>
  <div class="list-wrap">
  {#each data.resumes as item}
			<div class="row">
        <div>{item.name}</div>
        <div>{item.email}</div>
        <div>{item.phone}</div>
				<a class="btn variant-filled-secondary" href="/resume/{item.id}">
					view
				</a>
			</div>
		{/each}
  </div>
  </div>
</div>
<style>
  .list-wrap {
    border: solid 1px black;
    border-bottom: unset;
  }
  .row {
    display: flex;
    border-bottom: solid 1px black;
    padding: 10px;
    justify-content: space-between;
  }
  .row div,a {
    width: 300px
  }
</style>