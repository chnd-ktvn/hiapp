import axios from 'axios'
import router from '../../router/index'
export default {
  modules: {},
  state: {
    user: {},
    userId: null,
    friends: [],
    profile: {},
    profileFriend: {},
    dataFriend: {},
    rooms: [],
    chats: [],
    photo: '',
    image: '',
    coordinate: {},
    token: localStorage.getItem('token') || null,
    status_reg: false,
    status_list: false,
    status_profile: false,
    status_right: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setFriend(state, payload) {
      state.friends = payload.data
    },
    setProfile(state, payload) {
      state.profile = payload.data[0]
    },
    setLocation(state, payload) {
      state.coordinate = payload
    },
    setRoom(state, payload) {
      state.rooms = payload.data
    },
    setChat(state, payload) {
      state.chats = payload.data
      console.log(state.chats)
    },
    setdataFriend(state, payload) {
      state.dataFriend = payload
      console.log(state.dataFriend)
    },
    setProfileFriend(state, payload) {
      state.profileFriend = payload.data[0]
      console.log(state.profileFriend)
    },
    delUser(state) {
      state.user = {}
      state.rooms = [],
      state.chats = [],
      state.profileFriend = {},
      state.dataFriend = {}
      state.userId = null
      state.token = null
      state.status_right = false
      state.profile = {}
      state.friends = []
    },
    statusRegister(state) {
      state.status_reg = !state.status_reg
    },
    statusLogin(state) {
      state.status_reg = false
    },
    statusList(state) {
      state.status_list = true
    },
    statusChat(state) {
      state.status_list = false
    },
    statusProfile(state) {
      state.status_profile = true
    },
    statusHome(state) {
      state.status_profile = false
    },
    //status_right
    statusLeftPart(state) {
      state.status_right = false
    },
    statusRightPart(state) {
      state.status_right = true
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/user/login`, payload)
          .then(result => {
            context.commit('setUser', result.data.data)
            localStorage.setItem('token', result.data.data.token)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/user/register`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    activationEmail(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_BASE_URL}/user/activation`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    editLocation(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/user/editlocation/${payload.user_id}`,
            payload.coordinate
          )
          .then(result => {
            context.commit('setLocation', payload.coordinate)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editProfile(context, payload) {
      return new Promise((resolve, reject) => {
        console.log('dta' + payload.data)
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/user/editprofile/${payload.user_id}`,
            payload.data
          )
          .then(result => {
            // context.dispatch('showProfile', payload.user_id)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deletePhotoProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_BASE_URL}/user/deletephoto/${payload}`)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/user/addfriend`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    showFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/user/friends/${payload}`)
          .then(result => {
            context.commit('setFriend', result.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    showProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/user/profile/${payload}`)
          .then(result => {
            context.commit('setProfile', result.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // setProfileFriend
    showProfileFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/user/profile/${payload}`)
          .then(result => {
            context.commit('setProfileFriend', result.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    showRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/room/getroom/${payload}`)
          .then(result => {
            context.commit('setRoom', result.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    showChat(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/room/getchat/${payload}`)
          .then(result => {
            context.commit('setChat', result.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    postRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/room/postRoom`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    postChat(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/room/postChat`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/login')
    },
    interceptorRequest(context) {
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          if (
            error.response.data.status === 403 &&
            (error.response.data.message === 'invalid token' ||
              error.response.data.message === 'invalid signature' ||
              error.response.data.message === 'jwt expired' ||
              error.response.data.message === 'jwt malformed')
          ) {
            context.dispatch('logout')
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    deletePhoto(state) {
      return state.image
    },
    statusReg(state) {
      return state.status_reg
    },
    statusList(state) {
      return state.status_list
    },
    statusProfile(state) {
      return state.status_profile
    },
    statusLeftPart(state) {
      return state.status_right
    },
    dataUser(state) {
      return state.user
    },
    dataFriend(state) {
      return state.friends
    },
    dataProfile(state) {
      return state.profile
    },
    // state.profileFriend
    dataProfileFriends(state) {
      return state.profileFriend
    },
    dataProfileFriend(state) {
      return state.dataFriend
    },
    dataRoom(state) {
      return state.rooms
    },
    dataChat(state) {
      return state.chats
    },
    dataPhoto(state) {
      return state.photo
    },
    dataLocation(state) {
      return state.coordinate
    }
  }
}
