<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/bard.png"
        alt="Bard"
        class="mb-5"
        width="400"
        style="margin-left: 60px"
      >
      <blockquote class="blockquote">
        <span v-if="error.statusCode === 404">
          {{ $t('error.not_found') }}
        </span>
        <span v-else>
          {{ $t('error.general') }}
        </span>
        <span>
          {{ $t('error.end') }}
        </span>
        <NuxtLink to="/">
          {{ $t('error.home') }}
        </NuxtLink>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
<script>

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title: this.$t('home.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('character_list.description') }
      ]
    }
  }
}
</script>

