import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        nextTick(() => {
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            mainContent.scrollTo({ top: savedPosition.top, left: 0 });
          }
          resolve(savedPosition);
        });
      });
    }
    return new Promise((resolve) => {
      nextTick(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          mainContent.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
        resolve({ left: 0, top: 0, behavior: 'instant' });
      });
    });
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },

    {
      path: '/project',
      name: 'Project',
      component: () => import('../views/project/ProjectView.vue'),
      children: [
        {
          path: '',
          name: 'ProjectListEmpty',
          component: {
            render: () => null,
          },
        },
        {
          path: ':slug',
          name: 'ProjectDetail',
          component: () => import('../views/project/ProjectDetail.vue'),
        },
      ],
    },

    {
      path: '/study/:pathMatch(.*)*',
      name: 'Study',
      component: () => import('../views/StudyView.vue'),
    },

    {
      path: '/articles',
      name: 'Articles',
      component: () => import('../views/ArticlesView.vue'),
    },

    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/AdminView.vue'),
    },
  ],
});

export default router;
