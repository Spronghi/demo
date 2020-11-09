<template>
  <v-data-table
    :headers="headers"
    :items="feats"
    :loading="loading"
    :items-per-page="5"
    class="elevation-1"
  />
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    loading: true,
    headers: [
      { text: 'id', align: 'start', value: '_id', sortable: false },
      { text: 'Name', align: 'start', value: 'name' },
      { text: 'Description', align: 'start', value: 'description', sortable: false },
      { text: 'Number of effects', align: 'center', value: 'effects.length', sortable: false }
    ]
  }),
  computed: {
    ...mapState('feats', ['feats'])
  },
  async created() {
    await this.loadFeats();
    this.loading = false;
  },
  methods: {
    ...mapActions('feats', ['loadFeats'])
  }
}
</script>
<style lang="scss" scoped></style>
