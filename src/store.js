import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    SET_PROJECT(state, payload) {
      state.project = payload;
    },
    SET_ITEM(state, payload) {
      state.item = payload;
    },
    SET_REVISION(state, payload) {
      state.revision = payload;
    },
    SET_SELECTED_COMMENT(state, payload) {
      state.selectedComment = payload;
    },
    SET_COMMENTS_SHOWING(state, payload) {
      state.commentsShowing = payload;
    },
    ADD_COMMENT(state, payload) {
      const project = state.projects.find(p => p.id === payload.projectId);
      const item = project.items.find(i => i.id === payload.itemId);
      const revision = item.revisions.find(r => r.id === payload.revisionId);
      revision.comments.push(payload.comment);
    }
  },
  actions: {
    GET_PROJECT({ commit, dispatch, state }, payload) {
      const project = state.projects.find(p => p.id === payload);
      commit('SET_PROJECT', project);
    },
    GET_ITEM({ commit, dispatch, state }, payload) {
      const project = state.projects.find(p => p.id === payload.projectId);
      commit('SET_PROJECT', project);
      const item = state.project.items.find(i => i.id === payload.itemId);
      commit('SET_ITEM', item);
      commit('SET_REVISION', null);
    },
    GET_REVISION({ commit, dispatch, state }, payload) {
      const project = state.projects.find(p => p.id === payload.projectId);
      commit('SET_PROJECT', project);
      const item = state.project.items.find(i => i.id === payload.itemId);
      commit('SET_ITEM', item);
      const revision = state.item.revisions.find(i => i.id === payload.revisionId);
      commit('SET_REVISION', revision);
    },
    ADD_COMMENT({ commit, dispatch, state }, payload) {
      commit('ADD_COMMENT', payload);
    }
  }
})
