<template>
  <v-hover
    v-slot:default="{ hover }"
  >
    <v-card
      class="character__skills"
      outlined
      min-width="270"
      max-height="600"
    >
      <v-card-title class="pb-0 pt-2 px-3 character__skills__title">
        <span
          class="subtitle-1 primary--text pl-0 pb-0 title"
        >{{ $t('character.skills.title') }}</span>
        <v-slide-x-reverse-transition>
          <v-icon
            v-if="false"
            class="mr-2"
            @click="showSearch = !showSearch" 
          >
            search
          </v-icon>
        </v-slide-x-reverse-transition>        
        <v-spacer />
        <v-expand-x-transition>
          <span
            v-if="hover || showSearch"
            class="hover"
          >
            <v-icon
              class="mr-2"
              active-class="foo" 
              flex
              @click="showSearch = !showSearch"
            >search</v-icon>
            <v-expand-x-transition>
              <v-text-field
                v-if="showSearch"
                v-model="search"
                flat
                style="margin-left:-4px"
                :hide-details="true"
                class="search"
              />
            </v-expand-x-transition> 
            <v-icon
              v-if="pinned.find(f => f._id === pinnedId)"
              flex
              @click="REMOVE({ type: SKILLS, _id: pinnedId})"
            >
              mdi-pin-off
            </v-icon>
            <v-icon
              v-else
              @click="PUSH({ type: SKILLS, element: character, _id: pinnedId})"
            >
              mdi-pin
            </v-icon>
          </span>
        </v-expand-x-transition> 
      </v-card-title>
      
      <v-card-text class="px-3">
        <div
          v-for="(skill) in skills"
          :key="skill.name"
        >
          <Skill 
            :character="character" 
            :skill="skill"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script>
import Skill from '~/components/Skill'

import { mapMutations, mapState } from 'vuex';

export default {
  components:{
    Skill
  },
  props: {
    character: {
      type: Object,
      required: true
    }
  },  
  data: () =>({
    search: '',
    showSearch: false,
    targets: [
      { key: 'checks.cha', label: 'character.checks.charisma' },
      { key: 'checks.dex', label: 'character.checks.dexterity' },
      { key: 'checks.con', label: 'character.checks.constitution' },
      { key: 'savingThrows', label: 'character.checks.saving_throws' },
    ]
  }),
  computed: {
    ...mapState('pinned', ['pinned', 'SKILLS']),
    pinnedId(){
      return this.character.name + 'skills'
    },
    characterSkills(){
      return this.character ? this.character.skills : []
    },
    skills(){
      try {
        return this.characterSkills.filter(s => 
          !this.search || !this.showSearch || this.search.length < 3 || this.$t('skills.' + s.name).toLowerCase().includes(this.search.toLowerCase())
        ).filter(s => s.untrained || s.trained )
      } catch(err) {
        return []
      }
    }
  },
  methods:{
    ...mapMutations('pinned', ['REMOVE', 'PUSH'])
  }  
}
</script>
<style>
  .character__skills__title {
    height: 46px;
  }

  .character__skills .pin-icon {
    position: absolute; 
    top: 10px; 
    right: 10px;
  }

  .character__skills {
    overflow-y: auto;
  }

  .character__skills .title {
    padding-top: 5px;
  }

  .character__skills .search {
    padding-top: 0;
    margin-top: 0;
    padding-bottom: 7px;
  }

  .character__skills .search input {
    max-width: 140px;
    padding-bottom: 2px;
    padding-left: 3px;
  }

  .character__skills .hover {
    display: flex;
  }
</style>