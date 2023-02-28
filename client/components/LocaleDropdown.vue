<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button"
       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
    >
      {{ locales[locale] }}
    </a>
    <div >
      <a v-for="(value, key) in locales" :key="key" class="dropdown-item" href="#"
         @click.prevent="setLocale(key)"
      >
        {{ value }}
      </a>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    locale: 'lang/locale',
    locales: 'lang/locales'
  }),

  methods: {
    
  }
}
</script>
