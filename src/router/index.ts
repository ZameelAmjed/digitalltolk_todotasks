import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { StateInterface } from '../store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(function ( { store } ) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });
  
  const whiteList = ['/login']
 
  Router.beforeEach(async(to, from, next) => {
    // determine whether the user has logged in
   
    const hasToken:string = store.getters['users/getToken'];
    console.log('hasToken')
    console.log(hasToken)
    
    if (hasToken) {
      if (to.path === '/login') {
          // if is logged in, no login just redirect to the home page
          next({ path: '/' })
      } else {
        const hasGetUserInfo = store.getters['users/getUser']
        if (hasGetUserInfo.email) {
          next()
        } else { 
          // remove token and go to login page to re-login
          store.dispatch('users/logOut')
          next(`/login?redirect=${to.path}`)
        }
      }
    }else{
      try{
        await store.dispatch('users/init')
        const hasGetUserInfo = store.getters['users/getUser']
        console.log('hasGetUserInfo');
        console.log(hasGetUserInfo);
      
        if (hasGetUserInfo?.email) {
          next()
        } else { 
          if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
          } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
          }
        }
      }catch(e){
        console.error(e);
      }
    }
  })
  return Router;
});
