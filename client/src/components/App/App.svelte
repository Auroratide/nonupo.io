<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import page from 'page'
	import { Title } from '../Title'
	import { routes } from '../pages/routes'

	let component: typeof SvelteComponent
	let params: object = {}

	routes.forEach(route => {
		page(route.path, (ctx) => {
			params = { ...ctx.params }
			component = route.component
		})
	})

	page.start()
</script>

<header>
	<Title title="Nonupo" />
</header>
<main>
	<svelte:component this={component} {params} />
</main>
