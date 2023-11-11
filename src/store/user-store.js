import axios from 'axios'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { db } from '@/firebase-init'
import { setDoc, getDoc, doc, collection, getDocs, updateDoc, arrayUnion, query, onSnapshot } from 'firebase/firestore'

axios.defaults.baseURL = 'http://localhost:4001/'

export const useUserStore = defineStore('counter', {
  state: () => ({
    sub: '',
    email: '',
    picture: '',
    firstName: '',
    lastName: '',
    chats: [],
    allUsers: [],
    userDataForChat: [],
    removeUsersFromFindFriends: [],
    currentChat: null,
    showFindFriends: false
  }),
  actions: {
    async getUserDetailsFromGoogle(credential) {
      try {
        const {data} = await axios.post('api/google-login', {
          token: credential
        });

        const { sub, email, picture, given_name, family_name } = data;

        let userexists = await this.checkIfUserExists(sub);
        if(!userexists) await this.saveUserDetails({ sub, email, picture, given_name, family_name });

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
    async checkIfUserExists(sub) {
      const docRef = doc(db, "users", sub);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    },
    async getAllUsers() {
      const querySnapshot = await getDocs(collection(db, "users"))
      let results = []
      querySnapshot.forEach(doc => results.push(doc.data()));

      if(results.length) {
        this.allUsers = [...results];
      }
    },
    async saveUserDetails({ sub, email, picture, given_name, family_name }) {
      try {
        await setDoc(doc(db, "users", sub), {
          sub, email, picture,
          firstName: given_name,
          lastName: family_name
        });
      } catch(e) {
        console.log(e);
      }
    },
    async getChatById(id) {
      if(id) {
        onSnapshot(doc(db, "chat", id), doc => {
          let res = [];
          res.push(doc.data());
          this.currentChat = res;
        });
      } else {
        const { sub1, sub2 } = this.userDataForChat;
        this.currentChat = [{
          messages: [],
          sub1,
          sub1HasViewed: true,
          sub2,
          sub2HasViewed: false
        }];
      }
    },
    async getAllChatsByUser() {
      const q = query(collection(db, 'chat'));
      onSnapshot(q, (querySnapshot) => {
        let chatArray = [];
        querySnapshot.forEach(doc => {
          let data = {
            id: doc.id,
            sub1: doc.data().sub1,
            sub2: doc.data().sub2,
            sub1HasViewed: doc.data().sub1HasViewed,
            sub2HasViewed: doc.data().sub2HasViewed,
            messages: doc.data().messages
          }

          if(doc.data().sub1 === this.sub) chatArray.push(data);
          if(doc.data().sub2 === this.sub) chatArray.push(data);

          this.removeUsersFromFindFriends = [];
          
          chatArray.forEach(chat => {
            const subToGetFriendData = this.sub === chat.sub1 ? chat.sub2 : chat.sub1;
            const friendData = this.allUsers.find(user => user.sub === subToGetFriendData);
            chat.user = friendData;
            this.removeUsersFromFindFriends.push(subToGetFriendData); 
          });

          this.chats = [...chatArray];
        });
      });
    },
    async sendMessage(data) {
      try {
        if(data.chatId) {
          await updateDoc(doc(db, `chat/${data.chatId}`), {
            sub1HasViewed: false,
            sub2HasViewed: false,
            messages: arrayUnion({
              sub: this.sub,
              message: data.message,
              createdAt: Date.now()
            })
          });
        } else {
          const id = uuid();
          await setDoc(doc(db, `chat/${id}`), {
            sub1: this.sub,
            sub2: data.sub2,
            sub1HasViewed: false,
            sub2HasViewed: false,
            messages: [{
                sub: this.sub,
                message: data.message,
                createdAt: Date.now()
              }]
          });
          this.userDataForChat[0].id = id;
          this.showFindFriends = false;
        }
      } catch (e) {console.log(e)}
    },
    async hasReadMessage(data) {
      await updateDoc(doc(db, `chat/${data.id}`), {
        [data.key1]: data.val1,
        [data.key2]: data.val2
      }, { merge: true });
    },
    logout() {
      this.sub = '';
      this.email = '';
      this.picture = '';
      this.firstName = '';
      this.lastName = '';
      this.allUsers = [];
      this.chats = [];
      this.userDataForChat = [];
      this.removeUsersFromFindFriends = [];
      this.showFindFriends = false;
      this.currentChat = null;
    }
  },
  persist: true
})