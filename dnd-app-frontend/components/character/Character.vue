<template>
  <v-row>
    <v-col
      :class="{ 'col-lg-9 col-md-12': hasSkills, 'col-12': !hasSkills }"
      flex
    >
      <v-card
        :loading="loading"
        min-height="200"
        outlined
      >
        <v-card-title class="pb-0 headline">
          {{ character.name }}
        </v-card-title>
        <v-card-text
          v-if="hasLoaded"
          class="pb-2"
        >
          <v-row no-gutters>
            <span>{{ $t('character.level') }}: {{ character.level }}</span>
            <span class="ml-3">{{ $t('character.age') }}: {{ character.age }}</span>
            <span class="ml-3">{{ $t('character.sex') }}: {{ character.sex }}</span>
            <span class="ml-3">{{ $t('character.hit_point') }}: {{ character.hitPoint }}</span>
            <span 
              v-if="character.languages"
              class="ml-3"
            >{{ $t('character.languages') }}: {{ character.languages.join(', ') }}</span>
          </v-row>

          <v-row
            class="my-2"
            no-gutters 
          >
            <span class="col-12 subtitle-1 primary--text">{{ $t('character.stats.title') }}</span>
            <CharacterStats :character="character" />
          </v-row>

          <v-row
            v-if="hasFeats"
            class="mt-4 mb-2"
            no-gutters
          >
            <span class="col-12 mb-2 subtitle-1 primary--text">{{ $t('character.feats.title') }}</span>
            <CharacterFeats
              class="col-12"
              :feats="character.feats" 
            />
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      v-if="hasSkills"
      class="col-lg-3 col-md-12"
      flex
    >
      <CharacterSkills
        :character="character" 
      />
    </v-col>
  </v-row>
</template>
<script>
import CharacterFeats from '~/components/character/CharacterFeats'
import CharacterStats from '~/components/character/CharacterStats'
import CharacterSkills from '~/components/character/CharacterSkills'

import { mapActions, mapState } from 'vuex';

export default {
  components: {
    CharacterFeats,
    CharacterStats,
    CharacterSkills
  },
  props: {
    characterId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapState('characters', ['character']),
    hasFeats(){ return this.character.feats && this.character.feats.length },
    hasSkills(){ return this.character.skills && this.character.skills.length },
    hasLoaded(){ return !this.loaded && this.character && this.character.name }
  },
  async mounted() {
    try {
        await this.getCharacter(this.characterId);
    } catch(err){
      console.error(err);
    }
    this.loading = false;
  },
  methods: {
    ...mapActions('characters', ['getCharacter'])
  },
  head () {
    return {
      title: (this.character && this.character.name) || this.$t('character.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('character.description') }
      ]
    }
  }
}
</script>
<style lang="scss" scoped></style>
