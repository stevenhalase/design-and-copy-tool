<template>
  <div class="item">
    <div class="item-header">
      <div class="item-header-back">
        <router-link :to="{ name: 'project', params: { projectId }}" class="item-header-back-link">
          <font-awesome-icon :icon="['fas', 'long-arrow-alt-left']" class="item-header-back-icon"/>
        </router-link>
        <span>Projects</span>
      </div>
      <div class="item-header-title">
        <div class="item-header-title-prefix">{{ team.name }}</div>
        <div class="item-header-title-prefix">/</div>
        <div class="item-header-title-prefix">{{ project.name }}</div>
        <div class="item-header-title-prefix">/</div>
        <div class="item-header-title-current">{{ item.name }}</div>
      </div>
    </div>
    <div class="item-revisions">
      <div v-for="(revision, ind) of item.revisions" :key="ind" class="item-revisions-revision">
        <span @click="selectRevision(revision)" class="item-revisions-revision-name">{{ revision.name }}</span>
        <div class="item-revisions-revision-controls">
          <div @click="downloadExcel(`${revision.name}`, revision)" class="item-revisions-revision-controls-control">
            <font-awesome-icon :icon="['fas', 'file-excel']" class="item-revisions-revision-controls-control-icon"/>
          </div>
          <div @click="downloadJSON(`${revision.name}`, revision)" class="item-revisions-revision-controls-control">
            <font-awesome-icon :icon="['fab', 'js']" class="item-revisions-revision-controls-control-icon"/>
          </div>
        </div>
      </div>
    </div>
    <Revision v-if="selectedRevision" @close="clearSelectedRevision" />
  </div>
</template>

<script>
import DownloadMixin from '@/mixins/DownloadMixin.vue';
import Revision from '@/components/Revision.vue';
import { mapState } from 'vuex';

export default {
  name: 'item',
  props: {
    itemId: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    },
    revisionId: {
      type: String
    }
  },
  computed: {
    ...mapState({
      team: state => state.team,
      project: state => state.project,
      item: state => state.item,
      selectedRevision: state => state.revision
    })
  },
  beforeMount() {
    if (this.revisionId) {
      this.$store.dispatch('GET_REVISION', { projectId: this.projectId, itemId: this.itemId, revisionId: this.revisionId });
    } else {
      this.$store.dispatch('GET_ITEM', { projectId: this.projectId, itemId: this.itemId });
    }
  },
  methods: {
    selectRevision(revision) {
      this.$router.push({ name: 'revision', params: { projectId: this.project.id, itemId: this.item.id, revisionId: revision.id }});
    },
    clearSelectedRevision() {
      this.$router.push({ name: 'item', params: { projectId: this.project.id, itemId: this.item.id }});
    }
  },
  watch: {
    $route(newRoute) {
      if (this.revisionId) {
        this.$store.dispatch('GET_REVISION', { projectId: this.projectId, itemId: this.itemId, revisionId: this.revisionId });
      } else {
        this.$store.dispatch('GET_ITEM', { projectId: this.projectId, itemId: this.itemId });
      }
    }
  },
  components: {
    Revision
  },
  mixins: [DownloadMixin]
}
</script>

<style lang="scss">
@import '../style/global';

.item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .item-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    padding: 15px;
    border-bottom: 1px solid #ccc;

    .item-header-back {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      
      .item-header-back-link {
        background-color: #00b894;
        color: #fff;
        border: none;
        text-decoration: none;
        padding: 7px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;

        .item-header-back-icon {
          font-size: 18px;
        }

        &:hover {
          background-color: #04c7a1;
          cursor: pointer;
        }
      }
    }

    .item-header-title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .item-header-title-prefix {
        color: #777;
        font-size: 10px;
        margin-right: 5px;
      }

      .item-header-title-current {

      }
    }
  }

  .item-revisions {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .item-revisions-revision {
      width: 25%;
      height: 200px;
      border: 15px solid #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #00b894;
      font-weight: bold;
      color: #fff;

      .item-revisions-revision-name {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #04c7a1;
          cursor: pointer;
        }
      }

      .item-revisions-revision-controls {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-top: 1px solid #01a887;

        .item-revisions-revision-controls-control {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          padding: 15px;
          width: 25%;
          font-size: 18px;

          &:hover {
            background-color: #04c7a1;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
