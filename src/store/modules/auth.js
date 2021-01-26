import axios from 'axios'
import router from '../../router/index'
export default {
  modules: {},
  state: {
    user: {},
    userId: null,
    friends: [],
    profile: [],
    rooms: [],
    photo: '',
    image: '',
    coordinate: {},
    token: localStorage.getItem('token') || null,
    status_reg: false,
    status_list: false,
    status_profile: false
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
      state.profile = payload.data
      state.userId = payload.data[0].user_id
      state.photo = payload.data[0].user_photo
      if (payload.data[0].user_photo === '') {
        state.photo = ''
      } else {
        state.photo = 'http://localhost:3010/' + payload.data[0].user_photo
      }
    },
    setLocation(state, payload) {
      state.coordinate = payload
    },
    setRoom(state, payload) {
      state.rooms = payload.data
    },
    delUser(state) {
      state.user = {}
      state.userId = null
      state.token = null
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
          .patch(
            `${process.env.VUE_APP_BASE_URL}/user/deletephoto/${payload.user_id}`,
            payload.data
          )
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
    showRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/room/getRoom/${payload}`)
          .then(result => {
            context.commit('setRoom', result.data)
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
              error.response.data.message === 'jwt expired')
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
    dataUser(state) {
      return state.user
    },
    dataFriend(state) {
      return state.friends
    },
    dataProfile(state) {
      return state.profile
    },
    dataRoom(state) {
      return state.rooms
    },
    dataPhoto(state) {
      return state.photo
    },
    dataLocation(state) {
      return state.coordinate
    }
  }
}
