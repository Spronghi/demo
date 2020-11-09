<template>
  <div>
    <v-simple-table
      class="classes__table"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              {{ $t('class_list.actions') }}
            </th>
            <th class="text-left">
              {{ $t('class_list.name') }}
            </th>
            <th class="text-center">
              {{ $t('class_list.levels') }}
            </th>
            <th class="text-center">
              {{ $t('class_list.hit_die') }}
            </th>
            <th class="text-center">
              {{ $t('class_list.skill_points') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in classes"
            :key="c.name"
          >
            <td class="text-center col-medium">
              <v-icon
                color="primary"
                @click="open(c._id)"
              >
                mdi-open-in-new
              </v-icon>
            </td>
            <td class="text-left">
              {{ $t(c.name) }}
            </td>
            <td class="text-center col-medium">
              {{ c.levels.length }}
            </td>
            <td class="text-center col-medium">
              {{ c.hitDie }}
            </td>
            <td class="text-center col-medium">
              {{ c.skillPoints }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapState('classes', ['classes'])
  },
  async mounted() {
    await this.loadClasses();
    this.loading = false;
  },
  methods: {
    ...mapActions('classes', ['loadClasses']),
    open(id){
      this.$router.push({name: 'class', query: { id }});
    }
  }
}
</script>
<style scoped>
  .classes__table .col-small {
     width: 50px
  }
  .classes__table .col-medium {
     width: 100px
  }
</style>
