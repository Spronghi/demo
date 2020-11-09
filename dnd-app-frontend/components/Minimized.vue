<template>
  <div
    v-if="pinned" 
    class="text-center"
  >
    <v-menu 
      open-on-hover
      bottom 
      offset-y 
      transition="scroll-y-transition" 
      origin="top top"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="!pinned.length"
          dark
          text
          icon
          v-on="on"
        >
          <v-icon
            v-if="pinned.length"
          >
            mdi-pin
          </v-icon>
          <v-icon
            v-else
          >
            mdi-pin-off
          </v-icon>
        </v-btn>
      </template>

      <v-list
        v-if="pinned.length" 
        dense
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="pin in pinned"
            :key="pin._id"
          >
            <v-list-item-content @click="REMOVE({ type: pin.pin.type, _id: pin._id})">
              <v-list-item-title>
                <v-icon
                  left
                  color="red"
                  small
                >
                  mdi-pin-off
                </v-icon>
                <span v-if="pin.pin.type === SKILLS">{{ pin.name }}'s Skills</span>
                <span v-else>{{ $t(pin.name) }}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
/*
 * This component visualize the minimized feature that you want to show
 */
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('pinned', ['pinned', 'FEAT', 'SKILLS'])
  },
  methods: {
    ...mapMutations('pinned', ['REMOVE', 'PUSH'])
  }
}
</script>
