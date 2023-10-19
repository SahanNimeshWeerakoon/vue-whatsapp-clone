import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.baseURL = 'http://localhost:4001/'

export const useUserStore = defineStore('counter', {
  state: () => ({
    sub: '',
    email: '',
    picture: '',
    firstName: '',
    lastName: ''
  }),
  actions: {
    async getUserDetailsFromGoogle(data) {
      try {
        const { sub, email, picture, given_name, family_name } = await axios.post('api/google-login', {
          token: data.credential
        });

        this.sub = sub;
        this.email = email;
        this.picture = picture;
        this.firstName = given_name;
        this.lastName = family_name;
      } catch (err) {
        this.sub = "";
        this.email = "";
        this.picture = "";
        this.firstName = "";
        this.lastName = "";
      }
    },
    logout() {
      this.sub = '';

    }
  },
  persist: true
})