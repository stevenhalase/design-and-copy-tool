<template>
  <div @click.stop.prevent class="revision-markers">
    <div
      @mouseover="onMarkerMouseEnter(marker)"
      @mouseout="onMarkerMouseOut()"
      v-for="(marker, ind) of commentsShowing"
      :key="ind"
      class="revision-marker"
      :class="{ selected: isMarkerSelected(marker) }"
      :style="{ left: `${marker.position.x}px`, top: `${marker.position.y}px` }">
      {{ marker.number }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'revision-markers',
  props: {
    revision: {
      type: Object,
      required: true
    },
  },
  computed: {
    ...mapState({
      commentsShowing: state => state.commentsShowing,
      selectedComment: state => state.selectedComment
    }),
  },
  methods: {
    onMarkerMouseEnter(marker) {
      this.$store.commit('SET_SELECTED_COMMENT', marker);
    },
    onMarkerMouseOut() {
      this.$store.commit('SET_SELECTED_COMMENT', null);
    },
    isMarkerSelected(marker) {
      return this.selectedComment ? this.selectedComment.id === marker.id : false;
    }
  }
}
</script>

<style lang="scss">
@import '../style/global';

.revision-markers {
  
  .revision-marker {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #03a182;
    color: #fff;
    border: none;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);

    &.selected {
      cursor: pointer;
      background-color: #04ba96;
      border: 2px solid #fff;
      box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
    }

    &:hover {
      cursor: pointer;
      background-color: #04ba96;
      border: 2px solid #fff;
      box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
    }
  }
}
</style>
