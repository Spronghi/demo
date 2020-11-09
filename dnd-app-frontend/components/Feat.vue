<template>
  <v-hover
    v-slot:default="{ hover }"
  >
    <v-card
      class="mb-3 px-1 py-1 mr-3 character__feats"
      max-width="403"
      :width="width"
      outlined
      shaped
    >
      <v-card-title class="body-1 py-2">
        {{ $t(feat.name) }}
        <v-spacer />
        <v-slide-x-reverse-transition>
          <v-icon
            v-if="pinned.find(f => f._id === feat._id) && hover"
            @click="REMOVE({ type: FEAT, _id: feat._id})" 
          >
            mdi-pin-off
          </v-icon>
          <v-icon
            v-else-if="hover"
            @click="PUSH({ type: FEAT, element: feat})"
          >
            mdi-pin
          </v-icon>
        </v-slide-x-reverse-transition>  
      </v-card-title>
      <v-card-text class="pb-2">
        <div>{{ $t(feat.description) }}</div>
      
        <div v-if="feat.effects.length">
          <v-divider class="mt-2" />
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="px-0 py-0 caption">
                <span v-if="feat.effects.length === 1">{{ feat.effects.length }} {{ $t('character.feats.effect') }}</span>
                <span v-else>{{ feat.effects.length }} {{ $t('character.feats.effects') }}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="caption">
                <div
                  v-for="(effect, index) in feat.effects"
                  :key="index"
                >
                  {{ $t('effects.' + effect.target) }}
                  {{ effect.value >= 0 ? '+' : '-' }}
                  <span style="margin-left: -3px;">{{ effect.value }}</span>
                  <span v-if="!untyped(effect.type)">{{ effect.type }}</span>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel> 
          </v-expansion-panels> 
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

export default {
  props: {
    feat: {
      type: Object,
      required: true
    },
    width: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapState('pinned', ['pinned', 'FEAT'])
  },
  methods: {
    ...mapMutations('pinned', ['REMOVE', 'PUSH']),
    untyped(type){
      return type === 'untyped'
    }
  }
}
</script>

<style scoped>
.character__feats {
  max-height: 300px;
  overflow-y: scroll;
}
</style>