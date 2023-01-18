import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router'; 

import App from './components/App.vue';
import Students from './components/Students.vue';
import StudentInfo from './components/StudentInfo.vue';
import axios  from 'axios';
import VueAxios  from 'vue-axios';

const routes = [
    { path: "/", component: Students },
    { path: "/student-info/:id", component: StudentInfo, props: true },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App)
.use(router)
.use(VueAxios, axios)
.mount('#app');