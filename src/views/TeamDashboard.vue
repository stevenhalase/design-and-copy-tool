<template>
  <div class="team-dashboard">
    <div class="team-dashboard-header">
      <div class="team-dashboard-header-title">
        <div class="team-dashboard-header-title-current">{{ team.name }}</div>
      </div>
    </div>
    <div class="team-dashboard-projects">
      <div @click="goToProject(project)" v-for="(project, ind) of projects" :key="ind" class="team-dashboard-project">
        <span>{{ project.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'team-dashboard',
  computed: {
    ...mapState({
      team: state => state.team,
      projects: state => state.projects
    })
  },
  methods: {
    goToProject(project) {
      this.$router.push({ name: 'project', params: { projectId: project.id }});
    }
  }
}
</script>

<style lang="scss">
@import '../style/global';

.team-dashboard {

  .team-dashboard-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    padding: 15px;
    border-bottom: 1px solid #ccc;

    .team-dashboard-header-back {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      
      .team-dashboard-header-back-link {
        background-color: #00b894;
        color: #fff;
        border: none;
        text-decoration: none;
        padding: 7px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;

        .team-dashboard-header-back-icon {
          font-size: 18px;
        }

        &:hover {
          background-color: #04c7a1;
          cursor: pointer;
        }
      }
    }

    .team-dashboard-header-title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .team-dashboard-header-title-prefix {
        color: #777;
        font-size: 10px;
        margin-right: 5px;
      }

      .team-dashboard-header-title-current {

      }
    }
  }

  .team-dashboard-projects {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .team-dashboard-project {
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
