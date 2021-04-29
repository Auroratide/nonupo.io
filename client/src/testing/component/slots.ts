import { noop, insert, detach } from 'svelte/internal';

/**
 * Svelte does not (yet) allow applying elements to slots in the public API.
 * 
 * A PR is out for adding this capability, and these functions are borrowed from it.
 * See: https://github.com/sveltejs/svelte/pull/5687 
 */

function create_root_slot_fn(elements) {
	return function () {
		return {
			c: noop,

			m: function mount(target, anchor) {
				elements.forEach(element => {
					insert(target, element, anchor);
				});
			},

			d: function destroy(detaching) {
				if (detaching) {
					elements.forEach(detach);
				}
			},

			l: noop
		};
	};
}

export function createSlot(input) {
	const slots = {};
	for (const key in input) {
		const nodeOrNodeList = input[key];
		const nodeList = Array.isArray(nodeOrNodeList) ? nodeOrNodeList : [nodeOrNodeList];
		slots[key] = [create_root_slot_fn(nodeList)];
	}
	return slots;
}