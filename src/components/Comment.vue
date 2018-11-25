<template>
  <div @mouseover="onCommentMouseEnter()" @mouseout="onCommentMouseOut()"  class="comment" :class="{ selected }">
    <div class="comment-heading">
      <span class="comment-heading-number">{{ comment.number }}</span>
      <span class="comment-heading-type">{{ comment.type.name }}</span>
      <span class="comment-heading-date">
        <timeago :datetime="comment.date*1000"></timeago>
      </span>
    </div>
    <div class="comment-content"><span>{{ comment.content }}</span></div>
    <div class="comment-footer">
      <div class="comment-footer-labels">
        <div v-for="(label, ind) of comment.labels" :key="ind" class="comment-footer-label">{{ label.name }}</div>
      </div>
      <div class="comment-footer-author">{{ comment.user.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    comment: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isComment() {
      return this.comment.type.name === 'COMMENT';
    },
    isRequirement() {
      return this.comment.type.name === 'REQUIREMENT';
    },
  },
  methods: {
    onCommentMouseEnter() {
      this.$store.commit('SET_SELECTED_COMMENT', this.comment);
    },
    onCommentMouseOut() {
      this.$store.commit('SET_SELECTED_COMMENT', null);
    }
  }
}
</script>

<style lang="scss">
@import '../style/global';

.comment {
  width: 100%;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: none;

  .comment-heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    text-transform: uppercase;
    background-color: #0984e3;
    color: #fff;

    .comment-heading-number {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0984e3;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      box-shadow: none;
    }

    .comment-heading-type {
      font-weight: bold;
    }

    .comment-heading-date {
      time {
        font-size: 10px;
      }
    }
  }

  .comment-content {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;
    background-color: #fff;
  }

  .comment-footer {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1b92ec;
    color: #fff;

    .comment-footer-labels {
      .comment-footer-label {
        background-color: #ccc;
        border-radius: 30px;
        padding: 7px 15px;
        font-size: 10px;
      }
    }
  }

  &.selected {
    cursor: pointer;
    box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
    
    .comment-heading {
      background-color: #097ad1;

      .comment-heading-number {
        border: 2px solid #fff;
        box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
      }
    }

    .comment-content {
      background-color: #f3f2f2;
    }

    .comment-footer {
      background-color: #1b92ec;
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
    
    .comment-heading {
      background-color: #097ad1;

      .comment-heading-number {
        border: 2px solid #fff;
        box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
      }
    }

    .comment-content {
      background-color: #f3f2f2;
    }

    .comment-footer {
      background-color: #1b92ec;
    }
  }
}
</style>
