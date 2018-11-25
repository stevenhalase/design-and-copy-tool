<template>
  <div class="revision-additional">
    <div class="revision-additional-tabs">
      <span @click="selectType('ALL')" class="revision-additional-tabs-comments-button" :class="{ active: allCommentTypeSelected }">All</span>
      <span @click="selectType('COMMENT')" class="revision-additional-tabs-comments-button" :class="{ active: commentsSelected }">Comments</span>
      <span @click="selectType('REQUIREMENT')" class="revision-additional-tabs-comments-button" :class="{ active: requirementsSelected }">Requirements</span>
    </div>
    <div v-if="labels" class="revision-additional-tabs-additional-type">
      <span @click="selectLabel('ALL')" class="revision-additional-tabs-additional-type-button" :class="{ active: allCommentLabelSelected }">All</span>
      <span @click="selectLabel(label.name)" v-for="(label, ind) of labels" :key="ind" class="revision-additional-tabs-additional-type-button" :class="{ active: labelSelected(label) }">{{ label.name }}</span>
    </div>
    <div class="revision-additional-items">
      <div class="revision-additional-items-container">
        <Comment v-for="(comment, ind) of comments" :key="ind" :comment="comment" :selected="isCommentSelected(comment)" />
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue';
import { mapState } from 'vuex';

export default {
  name: 'revision-additional',
  data() {
    return {
      selectedType: 'ALL',
      selectedLabel: 'ALL'
    };
  },
  props: {
    revision: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      selectedComment: state => state.selectedComment
    }),
    comments() {
      let filteredComments = [];
      if (this.revision) {
        if (this.selectedType === 'COMMENT') {
          if (this.selectedLabel === 'ALL') {
            filteredComments = this.revision.comments.filter(c => c.type.name === 'COMMENT' && c.labels.filter(l => l.name === 'QUESTION' || l.name === 'SUGGESTION'));
          }
          for (let label of this.labels) {
            if (this.selectedLabel === label.name) {
              filteredComments = this.revision.comments.filter(c => c.type.name === 'COMMENT' && !!c.labels.filter(l => l.name === label.name).length);
            }
          }
        }
        
        if (this.selectedType === 'REQUIREMENT') {
          if (this.selectedLabel === 'ALL') {
            filteredComments = this.revision.comments.filter(c => c.type.name === 'REQUIREMENT' && c.labels.filter(l => l.name === 'CONTENT' || l.name === 'REQUIREMENT'));
          }
          for (let label of this.labels) {
            if (this.selectedLabel === label.name) {
              filteredComments = this.revision.comments.filter(c => c.type.name === 'REQUIREMENT' && !!c.labels.filter(l => l.name === label.name).length);
            }
          }
        }
        
        if (this.selectedType === 'ALL') {
          if (this.selectedLabel === 'ALL') {
            filteredComments = this.revision.comments.filter(c => true);
          }
          for (let label of this.labels) {
            if (this.selectedLabel === label.name) {
              filteredComments = this.revision.comments.filter(c => !!c.labels.filter(l => l.name === label.name).length);
            }
          }
        }
      }
      return filteredComments;
    },
    allCommentTypeSelected() {
      return this.selectedType === 'ALL';
    },
    allCommentLabelSelected() {
      return this.selectedLabel === 'ALL';
    },
    commentsSelected() {
      return this.selectedType === 'COMMENT';
    },
    requirementsSelected() {
      return this.selectedType === 'REQUIREMENT';
    },
    labels() {
      return this.selectedType === 'ALL' ?
        [{ name: 'QUESTION' }, { name: 'SUGGESTION' }, { name: 'CONTENT' }, { name: 'ACCESSIBILITY' }] :
        this.selectedType === 'COMMENT' ?
          [{ name: 'QUESTION' }, { name: 'SUGGESTION' }] :
          [{ name: 'CONTENT' }, { name: 'ACCESSIBILITY' }];
    },
  },
  methods: {
    selectType(type) {
      this.selectedLabel = 'ALL';
      this.selectedType = type;
    },
    selectLabel(label) {
      this.selectedLabel = label;
    },
    isCommentSelected(comment) {
      return this.selectedComment ? this.selectedComment.id === comment.id : false;
    },
    labelSelected(label) {
      return this.selectedLabel === label.name;
    },
  },
  watch: {
    comments: {
      handler(comments) {
        this.$store.commit('SET_COMMENTS_SHOWING', comments);
      },
      immediate: true
    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss">
@import '../style/global';

.revision-additional {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;

  .revision-additional-tabs {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-top: 25px;
    background-color: #00b894;
    color: #fff;
    border-bottom: 1px solid #fff;

    .revision-additional-tabs-comments-button {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 7px 15px;
      border-bottom: 2px solid transparent;
      background-color: #00b894;
      text-transform: uppercase;

      &.active {
        border-bottom: 2px solid #fff;
        background-color: #04c9a2;
      }

      &:hover {
        cursor: pointer;
        border-bottom: 2px solid #fff;
        background-color: #04c9a2;
      }
    }
  }

  .revision-additional-tabs-additional-type {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background-color: #03a182;
    color: #fff;
    border-bottom: 1px solid #fff;

    .revision-additional-tabs-additional-type-button {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 7px 15px;
      font-size: 10px;
      border-bottom: 2px solid transparent;
      background-color: #03a182;
      text-transform: uppercase;

      &.active {
        border-bottom: 2px solid #fff;
        background-color: #04ba96;
      }

      &:hover {
        cursor: pointer;
        border-bottom: 2px solid #fff;
        background-color: #04ba96;
      }
    }
  }

  .revision-additional-items {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: auto;

    .revision-additional-items-container {
      width: 100%;
    }
  }
}
</style>
