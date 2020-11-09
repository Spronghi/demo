<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/favicon.png"
        alt="Mage"
        class="mb-5"
        width="400"
        style="margin-left: 60px"
      >
      <blockquote class="blockquote">
        {{ $t('inspire.title') }}
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
<script>

export default {
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
