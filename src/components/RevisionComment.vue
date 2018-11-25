<template>
  <div @click.stop.prevent v-if="commentMarker" class="revision-comment" :style="{ left: `${posX}px`, top: `${this.posY}px` }">
    <div class="revision-comment-marker" :style="{ left: `${posX}px`, top: `${this.posY}px` }">
      {{ revision.comments.length + 1 }}
    </div>
    <div class="revision-comment-container">
      <div class="revision-comment-toggle">
        <div @click="changeCommentType('COMMENT')" class="revision-comment-toggle-button" :class="{ active: commentSelected }">Comment</div>
        <div @click="changeCommentType('REQUIREMENT')" class="revision-comment-toggle-button" :class="{ active: requirementSelected }">Requirement</div>
      </div>
      <div class="revision-comment-content">
        <textarea v-model="comment.content" rows="5" type="text" class="revision-comment-content-input"></textarea>
      </div>
      <div class="revision-comment-controls">
        <div @click="close" class="revision-comment-controls-cancel">Cancel</div>
        <div class="revision-comment-controls-save">Save</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'revision-comment',
  data() {
    return {
      posX: 0,
      posY: 0,
      comment: {
        type: 'COMMENT',
        content: ''
      }
    };
  },
  props: {
    revision: {
      type: Object,
      required: true
    },
    commentMarker: {
      type: Object
    }
  },
  computed: {
    commentSelected() {
      return this.comment.type === 'COMMENT';
    },
    requirementSelected() {
      return this.comment.type === 'REQUIREMENT';
    },
  },
  methods: {
    changeCommentType(type) {
      this.comment.type = type;
    },
    close() {
      this.$emit('close');
    }
  },
  watch: {
    commentMarker(commentMarker) {
      if (commentMarker) {
        this.posX = commentMarker.posX;
        this.posY = commentMarker.posY;
      } else {
        this.posX = 0;
        this.posY = 0;
      }
    }
  }
}
</script>

<style lang="scss">
@import '../style/global';

.revision-comment {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 103;

  .revision-comment-container {
    box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);

    .revision-comment-toggle {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      background-color: #03a182;
      color: #fff;

      .revision-comment-toggle-button {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 10px 15px;
        background-color: #03a182;
        text-transform: uppercase;

        &.active {
          background-color: #04ba96;
        }

        &:hover {
          cursor: pointer;
          background-color: #04ba96;
        }
      }
    }

    .revision-comment-controls {
      width: 100%;
      display: flex;

      .revision-comment-controls-cancel {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        background-color: #b2bec3;
        color: #fff;

        &:hover {
          cursor: pointer;
          background-color: #c0cdd2;
        }
      }

      .revision-comment-controls-save {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        background-color: #03a182;
        color: #fff;

        &:hover {
          cursor: pointer;
          background-color: #04ba96;
        }
      }
    }

    .revision-comment-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: #fff;

      .revision-comment-content-input {
        width: 300px;
        padding: 5px;
        resize: none;
      }
    }
  }

  .revision-comment-marker {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 25px;
    color: #fff;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #04ba96;
    border: 2px solid #fff;
    box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
  }
}
</style>
