<template>
	<footer>
		<front-contacts />
		<front-visual-map />
		<front-map />
		<div class="cell-xs-12 offset-top-42">
			<hr class="hr-gray hr-fullwidth">
		</div>
		<front-copyrights />
	</footer>
</template>

<script>

import frontContacts from '@/components/front/footer/frontContacts.vue'
import frontCopyrights from '@/components/front/footer/frontCopyrights.vue'
import frontMap from '@/components/front/footer/frontMap.vue'
import frontVisualMap from '@/components/front/footer/frontVisualMap.vue'

export default {
  	components: {
		frontContacts,
		frontCopyrights,
		frontMap,
		frontVisualMap
	}
}

</script>