<template>
  <v-row>
    <v-col
      flex
      class="col-md-12"
    >
      <v-card
        :loading="loading"
        min-height="200"
        outlined
      >
        <v-card-title class="pb-0 headline">
          {{ $t(cla.name) }}
        </v-card-title>
        <v-card-text
          v-if="hasLoaded"
          class="pb-2"
        >
          <v-row
            class="mt-4 mb-0"
            no-gutters
          >
            <b>{{ $t('class.hit_die') }}:</b>
            <span class="ml-1">{{ cla.hitDie }}</span>

            <span class="mx-2"> - </span>
            <b>{{ $t('class.skill_points') }}:</b>
            <span class="ml-1">{{ cla.skillPoints }}</span>
          </v-row>
          
          <ClassFeatures 
            :levels="cla.levels"
            :name="cla.name"
            :proficiency="cla.proficiency"
          />
          <ClassSkills :skills="cla.skills" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ClassFeatures from '~/components/classes/ClassFeatures'
import ClassSkills from '~/components/classes/ClassSkills'

export default {
  components: {
    ClassFeatures,
    ClassSkills,
  },
  props: {
    classId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapState('classes',{ cla: state => state.class }),
    hasLoaded(){ return !this.loaded && this.cla && this.cla.name }
  },
  async mounted() {
    try {
        await this.loadClass(this.classId);
    } catch(err){
      console.error(err);
    }
    this.loading = false;
  },
  methods: {
    ...mapActions('classes', ['loadClass'])
  },
  head () {
    return {
      title: (this.cla && this.$t(this.cla.name)) || this.$t('class.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('class.description') }
      ]
    }
  }
}
</script>
