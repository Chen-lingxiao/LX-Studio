<script setup>
import { ref, onMounted } from 'vue';
import AdminLogin from './admin/AdminLogin.vue';
import AdminDashboard from './admin/AdminDashboard.vue';

const isLoggedIn = ref(false);
const currentUser = ref(null);

const handleLogin = (user) => {
  isLoggedIn.value = true;
  currentUser.value = user;
};

const checkAuth = () => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    fetch('/lx-api/admin/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        isLoggedIn.value = true;
        currentUser.value = result.data;
      } else {
        localStorage.removeItem('admin_token');
      }
    })
    .catch(() => {
      localStorage.removeItem('admin_token');
    });
  }
};

onMounted(checkAuth);
</script>

<template>
  <div class="admin-view">
    <AdminDashboard v-if="isLoggedIn" />
    <AdminLogin v-else @login="handleLogin" />
  </div>
</template>

<style scoped>
.admin-view {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
