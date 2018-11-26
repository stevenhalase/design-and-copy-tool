<template>
  <div class="project">
    <div class="project-header">
      <div class="project-header-back">
        <router-link :to="{ name: 'team-dashboard'}" class="project-header-back-link">
          <font-awesome-icon :icon="['fas', 'long-arrow-alt-left']" class="project-header-back-icon"/>
        </router-link>
        <span>Team Dashboard</span>
      </div>
      <div class="project-header-title">
        <div class="project-header-title-prefix">{{ team.name }}</div>
        <div class="project-header-title-prefix">/</div>
        <div class="project-header-title-current">{{ project.name }}</div>
      </div>
      <span>Project</span>
    </div>
    <div class="project-items">
      <div @click="goToItem(item)" v-for="(item, ind) of project.items" :key="ind" class="project-items-item">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'project',
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      team: state => state.team,
      project: state => state.project
    })
  },
  beforeMount() {
    this.$store.dispatch('GET_PROJECT', this.projectId);
  },
  methods: {
    goToItem(item) {
      this.$router.push({ name: 'item', params: { projectId: this.project.id, itemId: item.id }});
    }
  }
}
</script>

<style lang="scss">
@import '../style/global';

.project {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .project-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    padding: 15px;
    border-bottom: 1px solid #ccc;

    .project-header-back {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      
      .project-header-back-link {
        background-color: #00b894;
        color: #fff;
        border: none;
        text-decoration: none;
        padding: 7px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;

        .project-header-back-icon {
          font-size: 18px;
        }

        &:hover {
          background-color: #04c7a1;
          cursor: pointer;
        }
      }
    }

    .project-header-title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .project-header-title-prefix {
        color: #777;
        font-size: 10px;
        margin-right: 5px;
      }

      .project-header-title-current {

      }
    }
  }

  .project-items {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .project-items-item {
      width: 25%;
      height: 200px;
      border: 15px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #00b894;
      font-weight: bold;
      color: #fff;

      &:hover {
        background-color: #04c7a1;
        cursor: pointer;
      }
    }
  }
}
</style>
