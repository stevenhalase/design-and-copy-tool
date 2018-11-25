<template>
  <div class="revision">
    <div @click="close" class="revision-backdrop"></div>
    <div class="revision-container">
      <div class="revision-header">
        <div class="revision-header-back">
          <router-link :to="{ name: 'item', params: { projectId: this.project.id, itemId: item.id }}" class="revision-header-back-link">
            <font-awesome-icon :icon="['fas', 'long-arrow-alt-left']" class="revision-header-back-icon"/>
          </router-link>
          <span>Revisions</span>
        </div>
        <div class="revision-header-title">
          <div class="revision-header-title-prefix">{{ team.name }}</div>
          <div class="revision-header-title-prefix">/</div>
          <div class="revision-header-title-prefix">{{ project.name }}</div>
          <div class="revision-header-title-prefix">/</div>
          <div class="revision-header-title-prefix">{{ item.name }}</div>
          <div class="revision-header-title-prefix">/</div>
          <div class="revision-header-title-current">{{ revision.name }}</div>
        </div>
        <div @click="close" class="revision-close">
          <div class="revision-close-button">
            <font-awesome-icon :icon="['fas', 'times']" class="revision-close-button-icon"/>
          </div>
        </div>
      </div>
      <div class="revision-container-content">
        <RevisionImage :revision="revision" />
        <RevisionAdditional @close="close" :revision="revision" />
      </div>
    </div>
  </div>
</template>

<script>
import RevisionImage from '@/components/RevisionImage.vue';
import RevisionAdditional from '@/components/RevisionAdditional.vue';
import { mapState } from 'vuex';

export default {
  name: 'revision',
  computed: {
    ...mapState({
      team: state => state.team,
      project: state => state.project,
      item: state => state.item,
      revision: state => state.revision
    })
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  components: {
    RevisionImage,
    RevisionAdditional
  }
}
</script>

<style lang="scss">
@import '../style/global';

.revision {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;

  .revision-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #fff;
    z-index: 101;

    .revision-header {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      padding: 15px;
      background-color: #fff;

      .revision-header-back {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        .revision-header-back-link {
          background-color: #00b894;
          color: #fff;
          border: none;
          text-decoration: none;
          padding: 7px 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 15px;

          .revision-header-back-icon {
            font-size: 18px;
          }

          &:hover {
            background-color: #04c7a1;
            cursor: pointer;
          }
        }
      }

      .revision-header-title {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .revision-header-title-prefix {
          color: #777;
          font-size: 10px;
          margin-right: 5px;
        }

        .revision-header-title-current {

        }
      }

      .revision-close-button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        color: #fff;
        background-color: #02977a;

        .revision-close-button-icon {
          text-transform: uppercase;
        }

        &:hover {
          cursor: pointer;
          background-color: #d63031;
        }
      }
    }

    .revision-container-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  .revision-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
  }
}
</style>
