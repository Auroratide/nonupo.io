<script lang="ts">
	import { Title } from './Title'
	import { Nonupo } from './Nonupo'
</script>

<header>
	<Title title="Nonupo" />
</header>
<main>
	<Nonupo />
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>