<template>
  <span
    v-if="increments && increments.length"
    class="increment"
  >
    <span
      v-if="label" 
      class="increment__label font-weight-bold"
    >{{ $t(label) }}{{ colon ? ':' : '' }}</span> 
    <span
      v-for="(increment, index) in increments"
      :key="index"
      class="increment__result"
    >
      <span
        v-if="index !== 0"
        class="increment__separator"
      > | </span>
      
      <span 
        v-if="showSign && increment.value >= 0" 
        style="margin-right: -3px;"
        class="increment__value"
      >+</span>
      <span 
        v-else-if="showSign && increment.value < 0" 
        style="margin-right: -3px;"
        class="increment__value"
      >-</span>
      
      <span class="increment__value">{{ increment.value }}</span>

      <span
        v-if="showMod && mod >= 0" 
        style="margin-right: -3px;"
        class="increment__mod"
      >(+</span>
      <span 
        v-else-if="showMod && mod < 0" 
        style="margin-right: -3px;"
        class="increment__mod"
      >(</span>
      <span
        v-if="showMod"
        class="increment__mod"
      >{{ mod }})</span>

      <span
        v-if="untyped(increment.type)"
        class="increment__type" 
      >{{ increment.type }} {{ $t('increment.bonus') }}</span>

      <span
        v-if="increment.against.length"
        class="increment__against"
      >{{ $t('increment.against') }} {{ increment.against.join(', ') }}</span>
    </span>
  </span>
</template>
<script>
/*
 * This is the component that calculate a certain statistic based on the character
 * increments. The idea is that if a character has maybe a specific class that gives
 * +1 to INT and the character has 5 of base INT then the total INT will be 6. But,
 * if this bonus is a TRAINED bonus maybe, it should apply only the greatest one, not
 * every bonus that has this type. This rule does not apply to the UNTYPED bonus, that
 * stack each others.
 *   
 * This was a kind of fail because here goes all the calculation that the backend
 * should do every time I create a new character, so the frontend should only show the
 * final version of a character at certain point.
 * 
 * The idea was that every time I update my character (maybe for a level up), the backend
 * create a new row on db, so I can check where a changed has been made for a certain
 * characteristic.
 * 
 * For prototype purpouse, it was more simple to build a frontend component, just to see
 * something.
 */
export default {
  props: {
    source: {
      type: Object,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    from: {
      type: Array,
      default: () => ['feats']
    },
    showSign: {
      type: Boolean,
      default: true
    },
    showMod: {
      type: Boolean,
      default: false
    },
    showZero: {
      type: Boolean,
      default: false
    },
    applyMod: {
      type: String,
      default: ''
    },
    colon: {
      type: Boolean,
      default: true
    },
    baseValue: {
      type: Number,
      default: 0
    }
  },
  computed: {
    increments(){ return this.calculate(this.source, this.target) },
    base(){
      let base = 0
      if(this.source?.stats){
        if(this.applyMod){
          base = this.getMod(this.applyMod)
        } else if(this.source.stats[this.target]){
          base = this.source.stats[this.target]
        } else {
          base = this.getMod(this.target)
        }
      }
      return base + this.baseValue
    },
    mod(){
      const mod = this.getMod(this.target) 
      return Number.isNaN(mod) ? 0 : mod
    }
  },
  methods: {
    getMod(mod){
      if(this.source?.stats){
        const { source } = this
        const target = mod.split('.').find((t) => source.stats[t])
        return Math.floor((this.source.stats[target] - 10) / 2)
      }
      return 0
    },
    untyped(type){ return type !== 'untyped' },
    calculate(source, target){
      const effects = []
      if(source) this.from.forEach(from => source[from] && source[from].forEach(el => effects.push(...(el.effects))))
      return this.calculateEffects(effects, target)
    },
    calculateEffects(source, target){
      const effects = this.filterEffects(source, target)
      const noAgainst = effects.filter(e => !e.against.length)
      const general = this.sumEffects(noAgainst.filter(e => e.type !== 'untyped'), this.sumUntyped(noAgainst, target), target)
      const against = []
      this.getAllAgainst(effects.filter(e => e.against.length)).forEach(a => {
        const eff = this.sumEffects(effects.filter(e => e.against.includes(a)), general, target, [a])
        against.push(eff)
      })
      const result = [general, ...against]
      return this.showZero ? result : result.filter(e => e.value)
    },
    getAllAgainst(effects){
      const against = []
      effects.forEach(e => e.against.length && against.push(...(e.against)))
      return [...new Set(against)]
    },
    applyBase(value){
      return (value || 0) + (this.base || 0)
    },
    sumUntyped(effects, target){
      const value = effects.filter(e => e.type === 'untyped').map(e => e.value).reduce((a, b) => (a || 0) + (b || 0), 0)
      return { type: 'untyped', value: this.applyBase(value), target, against: [], is: []}
    },
    sumEffects(effects, general, target, against){
      const result = []
      const types = [...new Set(effects.map(e => e.type))]

      if(general) result.push(general)
      
      types.forEach(t => {
        let mapped = effects.filter(e => e.type === t).map(e => ({ ...e, value: (e.value || 0) + (general.value || 0)}))
        const max = Math.max.apply(Math, mapped.map((o) => o.value))
        result.push(mapped.find(e => e.value === max))
      })

      const value = result.reduce((a, b) => (a.value || 0) + (b.value || 0), 0)
      return { type: 'untyped', value, target, against: against || [], is: []}
    },
    filterEffects(source, target){
      let effects = source.filter(s => s.target.startsWith(target) && s.is.includes('increment'))
      
      if(this.target.startsWith('skills') && this.applyMod) {
        effects = source.filter(s => (s.target.startsWith(target) || s.target.startsWith(`checks.${this.applyMod}`)) && s.is.includes('increment'))
      }
      
      return effects
    }
  }
}
</script>
