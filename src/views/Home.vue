<template>
  <b-row class="home">
    <b-col lg="4" md="4" sm="4" class="a">
      <Profile v-if="status_profile" />
      <b-container v-else>
        <div
          style="display: flex;   justify-content: space-evenly; align-items: flex-start;"
        >
          <h5 style=" color: #007bff; margin: 0 auto 0 0; margin-bottom: 5vh; ">
            Hi App
          </h5>
          <b-dropdown variant="outline-primary" offset="-100">
            <template #button-content>
              <b-icon-menu-button-wide></b-icon-menu-button-wide>
            </template>
            <b-dropdown-item style="padding-bottom: 2vh;" @click="onSettings"
              ><b-icon-gear style="color: #007bff;"></b-icon-gear
              ><span>Settings</span></b-dropdown-item
            >
            <b-dropdown-item style="padding-bottom: 2vh;" @click="onContact"
              ><b-icon-person style="color: #007bff;"></b-icon-person
              ><span>Contacts</span></b-dropdown-item
            >
            <b-dropdown-item style="padding-bottom: 2vh;" @click="onInvite"
              ><b-icon-person-plus-fill
                style="color: #007bff;"
              ></b-icon-person-plus-fill>
              <span>Invite friends</span>
            </b-dropdown-item>
            <b-dropdown-item style="padding-bottom: 2vh;" @click="onQuestion"
              ><b-icon-question-circle
                style="color: #007bff;"
              ></b-icon-question-circle
              ><span>Hi App FAQ</span></b-dropdown-item
            >
            <b-dropdown-item @click="onLogout"
              ><b-icon-arrow-bar-left
                style="color: #007bff;"
              ></b-icon-arrow-bar-left
              ><span>Logout</span></b-dropdown-item
            >
          </b-dropdown>
        </div>
        <div
          style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #007bff;"
        >
          <b-form-input
            v-model="search.text"
            type="text"
            placeholder="Type your messages..."
            style="margin-bottom: 5vh; width: 80%"
          ></b-form-input>
          <b-icon-plus
            @click="onContact"
            style="color: #007bff; margin: 0 auto 30px auto; cursor: pointer;"
            font-scale="2"
          ></b-icon-plus>
        </div>

        <ListFriends v-if="status_list" />
        <div v-else>
          <b-card
            v-if="rooms.length === 0"
            style="padding: 5vh 0; border: none;"
          >
            <p style="text-align: center;">
              Click icon<span style="color: #007bff;">+</span> to start the
              chat.
            </p>
          </b-card>
          <b-list-group v-for="(item, index) in rooms" :key="index" v-else>
            <b-list-group-item
              class="d-flex align-items-center list"
              @click="
                selectRoom(
                  item.id_room_gen,
                  item.sender,
                  item.receiver,
                  item.user_name,
                  item.user_photo
                )
              "
            >
              <b-avatar
                :src="
                  item.user_photo === ''
                    ? require('./../assets/cat-hi.png')
                    : `${env}/fileuploads/` + item.user_photo
                "
                class="mr-3 avatar"
                rounded="lg"
              ></b-avatar>

              <p class="mr-auto span">{{ item.user_name }}</p>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-container>
    </b-col>
    <b-col lg="8" md="8" sm="8" class="b">
      <div class="chat" v-if="status_left">
        <div class="chat-windows">
          <div class="output">
            <b-navbar variant="faded" type="light" class="wrapper">
              <b-navbar-brand>
                <b-img
                  :src="
                    chat.photo === ''
                      ? require('./../assets/cat-hi.png')
                      : `${env}/fileuploads/` + chat.photo
                  "
                  class="img"
                ></b-img>
                <span>{{ chat.user_name }}</span>
              </b-navbar-brand>
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <template #button-content><em> </em></template>
                  <b-dropdown-item v-b-toggle.sidebar-right
                    ><span>View Contact</span></b-dropdown-item
                  >
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-navbar>
            <b-sidebar id="sidebar-right" right shadow>
              <ProfileFriend />
            </b-sidebar>
            <b-col v-for="(value, index) in chats" :key="index">
              <b-row>
                <b-col
                  v-if="value.id_sender !== chat.id_sender"
                  class="chat-left"
                >
                  <b-card class="card-left">
                    <p>{{ value.msg }}</p>
                    <p class="time left">
                      {{ value.created_at.split('T')[1].split('.')[0] }}
                    </p>
                  </b-card>
                </b-col>
                <b-col
                  v-if="value.id_sender === chat.id_sender"
                  class="chat-right"
                >
                  <b-card class="card-right">
                    <p>{{ value.msg }}</p>
                    <p class="time">
                      {{ value.created_at.split('T')[1].split('.')[0] }}
                    </p>
                  </b-card>
                </b-col>
              </b-row>
            </b-col>
          </div>
        </div>
        <b-row
          style="display: flex; justify-content: space-evenly; align-items: center;"
        >
          <b-col lg="11" md="11" sm="11" style="flex: 7; margin-top: 7px;">
            <b-input
              class="message"
              v-model="chat.msg"
              type="text"
              placeholder="Type your message in here..."
            ></b-input>
          </b-col>
          <b-col
            lg="1"
            md="1"
            sm="1"
            style="flex: 1; cursor: pointer;"
            v-b-tooltip.hover
            title="Send your message"
            @click="sendMessage"
          >
            <b-icon-triangle-half
              style="color: #007bff; margin: 0 30%;"
              rotate="90"
            ></b-icon-triangle-half>
          </b-col>
        </b-row>
      </div>

      <div
        style="display: flex; justify-content: center; align-items: center; margin: auto 0"
        class="chat-window"
        v-else
      >
        <p style="color: grey;">Select room chat to start the conversation!</p>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import ListFriends from '../components/ListFriends.vue'
import Profile from '../components/Profile.vue'
import ProfileFriend from '../components/ProfileFriend.vue'
import io from 'socket.io-client'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListFriends,
    Profile,
    ProfileFriend
  },
  data() {
    return {
      env: process.env.VUE_APP_BASE_URL,
      show: true,
      search: {
        text: null
      },
      message: null,
      data: {
        user_email: null,
        user_id: null
      },
      coordinate: {
        lat: 10,
        lng: 10
      },
      // socket: io('http://localhost:3010'),
      // TAMBAHKAN SYNTAX YANG ADA DI DALAM INI
      // =========================================
      // socket: io.connect("https://backend-web6.fwebdev.online", {
      //   path: "/api2/socket.io"
      // }),
      socket: io.connect("http://localhost:3010", {
        path: "/api2/socket.io"
      }),
      // =========================================
      username: '',
      messages: [],
      notif: [],
      usernamee: null,
      chat: {
        id_room_gen: null,
        oldRoom: null,
        id_sender: null,
        id_receiver: null,
        photo: null,
        user_name: null,
        created_at: null,
        msg: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'dataUser',
      status_list: 'statusList',
      status_profile: 'statusProfile',
      rooms: 'dataRoom',
      chats: 'dataChat',
      status_left: 'statusLeftPart',
      profileFriend: 'dataProfileFriends'
    })
  },
  created() {
    this.$getLocation({ enableHighAccuracy: true })
      .then(coordinates => {
        // if (coordinates.accuracy <= 100) {
        console.log(coordinates)
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        // } else {
        //   this.$getLocation()
        // }
        console.log(coordinates)
        const dataPayload = {}
        console.log(this.coordinate.lng)
        dataPayload.coordinate = this.coordinate
        dataPayload.user_id = this.user.user_id
        console.log(typeof dataPayload.user_id)
        this.editLocation(dataPayload)
      })
      .catch(error => {
        alert(error)
      })
    this.statusLeftPart()
    this.statusChat()
    this.showRoom(this.user.user_id)
    this.data.user_id = this.user.user_id
    console.log(this.data)
    this.socket.on('chatMessage', data => {
      this.chats.push(data)
    })
    console.log('created()')
    console.log(this.chats)
    // showNotif
    // const notif = []
    // this.showNotif(this.user.user_id).then(result => {
    //   console.log(result.data.data)
    //   notif.push(result.data.data)
    // })
    // this.socket.emit('notif', notif)
    // this.socket.on('notifs', data => {
    //   data.forEach(el => {
    //     console.log(el.user_name)
    //     this.usernamee = el.user_name
    //     this.makeToast('primary')
    //   })
    // this.showNotif(this.user.user_id).then(result => {
    //   notif.push(result.data.data)
    // })
    // this.socket.emit('notif', notif)
    // })
  },
  methods: {
    ...mapActions([
      'logout',
      'addFriend',
      'showFriend',
      'showProfileFriend',
      'showRoom',
      'showChat',
      'editLocation',
      'postChat',
      'showNotif',
      'changeStatus'
    ]),
    ...mapMutations([
      'setdataFriend',
      'statusList',
      'statusProfile',
      'statusChat',
      'statusLeftPart',
      'statusRightPart'
    ]),
    onLogout() {
      this.logout()
    },
    onInvite() {
      this.$swal
        .fire({
          title: '<span style="font-family: cursive">Add Friend</span>',
          input: 'email',
          inputLabel: 'Say hi to your friend on Hi App!',
          inputPlaceholder: "Type your friend's email!",
          confirmButtonText: '<span style="font-family: cursive;">Search</span>'
        })
        .then(result => {
          if (result.isConfirmed) {
            this.data.user_email = result.value
            this.addFriend(this.data)
              .then(result => {
                this.message = result.data.message
                this.$swal.fire({
                  icon: 'success',
                  title:
                    '<span style="font-family: cursive;">' +
                    this.message +
                    '<span>',
                  showConfirmButton: false,
                  timer: 3000
                })
                this.showFriend(this.data.user_id)
                this.statusList()
              })
              .catch(error => {
                this.message = error.response.data.message
                this.$swal.fire({
                  icon: 'error',
                  title:
                    '<span style="font-family: cursive;">' +
                    this.message +
                    '<span>',
                  confirmButtonText:
                    '<span style="font-family: cursive;">I understand</span>',
                  showCancelButton: false
                })
              })
          }
        })
    },
    onQuestion() {
      this.$swal.fire(
        '<span style="font-family: cursive;">What is Hi App?</span>',
        'Pronounced like high and hi, Hi APP is simple messaging app that connects people around the world with various features such as private chat.',
        'question'
      )
    },
    onContact() {
      this.showFriend(this.data.user_id).catch(error => {
        this.$swal.fire({
          icon: 'error',
          title:
            '<span style="font-family: cursive;">' +
            error.response.data.message +
            '<span>',
          confirmButtonText:
            '<span style="font-family: cursive;">I understand</span>'
        })
      })
      this.statusList()
    },
    ...mapActions(['showProfile']),
    onSettings() {
      this.showProfile(this.user.user_id)
      this.statusProfile()
    },
    selectRoom(a, b, c, d, e) {
      this.chat.id_room_gen = a
      this.chat.id_sender = b
      this.chat.id_receiver = c
      this.chat.user_name = d
      this.chat.photo = e
      // const payload = {}
      // id_room_gen, id_receiver
      // payload.id_room_gen = this.chat.id_room_gen
      // payload.id_receiver = this.user.user_id
      // this.changeStatus(payload)

      this.showChat(this.chat.id_room_gen)
      this.setdataFriend(this.chat)
      this.showProfileFriend(this.chat.id_receiver)
      this.statusRightPart()
      if (this.chat.oldRoom) {
        this.socket.emit('changeRoom', {
          id_sender: this.chat.id_sender,
          id_room_gen: this.chat.id_room_gen,
          oldRoom: this.chat.oldRoom
        })
        this.chat.oldRoom = this.chat.id_room_gen
      } else {
        this.socket.emit('joinRoom', {
          id_sender: this.chat.id_sender,
          id_room_gen: this.chat.id_room_gen
        })

        this.chat.oldRoom = this.chat.id_room_gen
      }
    },
    sendMessage() {
      // id_room_gen, id_sender, id_receiver, msg
      if (this.chat.msg) {
        this.postChat(this.chat).then(result => {
          console.log(result.data.data.created_at)
          this.chat.created_at = result.data.data.created_at
          // 2021-03-01T21:37:07+07:00
          const datetime = this.chat.created_at.split('+').join('.')
          this.chat.created_at = datetime
          console.log(datetime)
          console.log(this.chat)
          this.socket.emit('roomMessage', this.chat)
          this.chat.msg = ''
        })
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast(`You've got new message from ${this.usernamee}`, {
        title: 'HiApp',
        variant: variant,
        solid: true
      })
    }
  }
}
</script>
<style scoped>
.row {
  margin: 0;
  padding: 0;
}
.home {
  font-family: cursive;
}
.a {
  background-color: white;
  margin-top: 7vh;
  overflow: auto;
  height: 93vh;
  border-bottom: 1px solid lightgray;
}
.b {
  background-color: lightgrey;
}
span {
  color: #007bff;
  padding-left: 2vh;
}
.chat {
  max-width: 100%;
}
.chat-window {
  overflow: auto;
  height: 100vh;
  background: lightgrey;
}
.chat-windows {
  overflow: auto;
  height: 90vh;
  background: lightgrey;
}
.message {
  border-radius: 20px;
}
.list {
  cursor: pointer;
  color: #007bff;
}
.list:hover {
  color: white;
  background-color: #007bff;
}
.avatar {
  background-color: transparent;
  width: 50px;
  height: 40px;
  margin-left: -10px;
}
.img {
  background-color: lightgrey;
  object-fit: cover;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 20px;
}
.wrapper {
  margin-bottom: 7px;
  z-index: 10;
  top: 0;
  position: sticky;
  background-color: white;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.card-right {
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.chat-left {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px 0;
}
.chat-right {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 10px 0;
}
.card-left {
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #007bff;
  color: white;
}
.card-right p,
.card-left p {
  margin-bottom: 0;
}
.time {
  font-size: 10px;
  color: gray;
}
.time.left {
  color: white;
}
</style>
