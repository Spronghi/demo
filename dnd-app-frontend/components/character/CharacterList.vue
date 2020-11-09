<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="characters"
      :loading="loading"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          color="primary"
          @click="open(item._id)"
        >
          mdi-open-in-new
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    loading: true,
    headers: [
      { text: 'Actions', align: 'center', value: 'actions', sortable: false },
      { text: 'Name', align: 'start', value: 'name' },
      { text: 'Age', align: 'center', value: 'age', sortable: false },
      { text: 'Sex', align: 'center', value: 'sex', sortable: false },
      { text: 'Level', align: 'center', value: 'level', sortable: false },
      { text: 'Updated on', align: 'center', value: 'updated', sortable: false },
      { text: 'Created on', align: 'center', value: 'created', sortable: false },
    ]
  }),
  computed: {
    ...mapState('characters', ['characters'])
  },
  async mounted() {
    await this.loadCharacters();
    this.loading = false;
  },
  methods: {
    ...mapActions('characters', ['loadCharacters']),
    open(id){
      this.$router.push({name: 'character', query: { id }});
      // window.open(routeData.href, '_blank');
    }
  }
}
</script>
<style lang="scss" scoped></style>
