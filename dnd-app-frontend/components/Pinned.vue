<template>
  <div v-if="pinned">
    <div
      v-for="pin in pinned"
      :key="pin._id"
    >
      <vue-draggable-resizable 
        :id="pin._id"
        :resizable="false" 
        :z="1"
        :x="window.width - 550"
        :class="{ 'grabbing': grabbing, 'not_grabbing': !grabbing }"
        style="border: 0"
        @dragging="grabbing = true"
        @dragstop="grabbing = false"
      >
        <Feat
          v-if="pin.pin.type === FEAT"
          :feat="pin"
          :width="350"
        />

        <CharacterSkills
          v-if="pin.pin.type === SKILLS"
          :character="pin" 
        />
      </vue-draggable-resizable>
    </div>
  </div>
</template>
<script>
/*
 * This module visualize the draggable elements pinned by the various pinned icon
 */
import Feat from '~/components/Feat'
import CharacterSkills from '~/components/character/CharacterSkills'

import VueDraggableResizable from 'vue-draggable-resizable'
import { mapMutations, mapState } from 'vuex';

export default {
  components: {
    VueDraggableResizable,
    CharacterSkills,
    Feat
  },
  data: () => ({
    grabbing: false
  }),
  computed: {
    ...mapState('pinned', ['pinned', 'FEAT', 'SKILLS']),
    window(){ return { width: window.innerWidth, heigth: window.innerHeight } }
  },
  methods: {
    ...mapMutations('pinned', ['REMOVE', 'PUSH'])
  }
}
</script>
<style scoped>
  .not_grabbing {
    cursor: grab
  }

  .grabbing {
    cursor: grabbing
  }
</style>
