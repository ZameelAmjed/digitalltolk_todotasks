import { boot } from 'quasar/wrappers'

export default boot(async ( { app } ) => {
  app.config.globalProperties.$filters = {
    dateFormat(value:string) {
      return new Date(value);
    }
  }
})