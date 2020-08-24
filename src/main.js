import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueCookie from 'vue-cookie';
import VueBootstrapToasts from "vue-bootstrap-toasts";
import App from './App.vue';
import Profile from './components/Profile.vue';
import Login from './components/Login.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueBootstrapToasts);

Vue.config.productionTip = false; 

function guardMyroute(to, from, next)
{
    var isAuthenticated= false; 
    if(localStorage.getItem('email')&& localStorage.getItem('password')){
      isAuthenticated = true;
    }else{
      isAuthenticated= false;
    }
    if(isAuthenticated) {
      next(); 
    }else{
      next('/login'); 
    }
}


const routes = [
  { 
    name: 'Profile',
    path: '/profile',
    beforeEnter : guardMyroute,
    component: Profile
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  }
];

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  render: h => h(App),
  router
}).$mount('#app')