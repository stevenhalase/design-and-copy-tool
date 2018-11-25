<template>
  <div class="revision-image">
    <div @click="pointClick" class="revision-image-container">
      <RevisionComment :revision="revision" :commentMarker="commentMarker" @close="clearCommentMarker" />
      <RevisionMarkers :revision="revision" />
      <img :src="revision.image.src" />
    </div>
  </div>
</template>

<script>
import RevisionComment from '@/components/RevisionComment.vue';
import RevisionMarkers from '@/components/RevisionMarkers.vue';

export default {
  name: 'revision-image',
  data() {
    return {
      commentMarker: null
    };
  },
  props: {
    revision: {
      type: Object,
      required: true
    }
  },
  methods: {
    pointClick(e){
      const posX = e.offsetX;
      const posY = e.offsetY;

      this.commentMarker = { posX, posY };
    },
    clearCommentMarker() {
      this.commentMarker = null;
    }
  },
  components: {
    RevisionComment,
    RevisionMarkers
  }
}
</script>

<style lang="scss">
@import '../style/global';

.revision-image {
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfe6e9;

  .revision-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
