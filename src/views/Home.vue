<template>
  <b-row class="home">
    <b-col lg="4" md="4" sm="4" class="a">
      <Profile v-if="status_profile" />
      <b-container v-else>
        <div
          style="display: flex; justify-content: center; align-items: flex-start;"
        >
          <h4
            style="text-align: center; color: #007bff; margin: 0 auto 0 0; margin-bottom: 5vh; "
          >
            Hi App
          </h4>
          <b-dropdown variant="outline-primary" offset="-100">
            <template #button-content>
              <b-icon-menu-button-wide></b-icon-menu-button-wide>
            </template>
            <b-dropdown-item style="padding-bottom: 2vh;" @click="onSettings"
              ><b-icon-gear style="color: #007bff;"></b-icon-gear
              ><span style="color: #007bff; padding-left: 2vh"
                >Settings</span
              ></b-dropdown-item
            >
            <b-dropdown-item style="padding-bottom: 2vh;" @click="onContact"
              ><b-icon-person style="color: #007bff;"></b-icon-person
              ><span style="color: #007bff; padding-left: 2vh"
                >Contacts</span
              ></b-dropdown-item
            >
            <b-dropdown-item style="padding-bottom: 2vh;" @click="onInvite"
              ><b-icon-person-plus-fill
                style="color: #007bff;"
              ></b-icon-person-plus-fill>
              <span style="color: #007bff; padding-left: 2vh">
                Invite friends
              </span>
            </b-dropdown-item>
            <b-dropdown-item style="padding-bottom: 2vh;" @click="onQuestion"
              ><b-icon-question-circle
                style="color: #007bff;"
              ></b-icon-question-circle
              ><span style="color: #007bff; padding-left: 2vh">
                Hi App FAQ</span
              ></b-dropdown-item
            >
            <b-dropdown-item @click="onLogout"
              ><b-icon-arrow-bar-left
                style="color: #007bff;"
              ></b-icon-arrow-bar-left
              ><span style="color: #007bff; padding-left: 2vh">
                Logout</span
              ></b-dropdown-item
            >
          </b-dropdown>
        </div>
        <div
          style="display: flex; justify-content: space-between; align-items: center;"
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
        <b-list-group v-for="(item, index) in rooms" :key="index" v-else>
          <b-list-group-item class="d-flex align-items-center">
            <b-avatar
              style="background-color: lightgrey;"
              :src="
                item.user_photo === ''
                  ? require('./../assets/account.png')
                  : `http://localhost:3010/` + item.user_photo
              "
              class="mr-3"
              rounded="lg"
            ></b-avatar>
            <span
              class="mr-auto"
              @click="selectRoom(item.id_room_gen, item.sender, item.receiver)"
              >{{ item.user_name }}</span
            >
            <!-- <p>{{ item.id_room_gen }}</p> -->
          </b-list-group-item>
        </b-list-group>
      </b-container>
    </b-col>
    <b-col lg="8" md="8" sm="8" class="b">
      <div class="chat">
        <div class="chat-window">
          <div class="output">
            <!-- <p v-if="typing.isTyping">
              <em>{{ typing.username }} is typing a message...</em>
            </p> -->
            <p v-for="(value, index) in messages" :key="index">
              <strong>{{ value.username }} :</strong>
              {{ value.msg }}
            </p>
          </div>
        </div>
        <b-input
          class="message"
          v-model="chat.msg"
          type="text"
          placeholder="Message"
        ></b-input>
        <b-button class="send" @click="sendMessage">Send</b-button>
        <p>{{ messages }}</p>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import ListFriends from '../components/ListFriends.vue'
import Profile from '../components/Profile.vue'
// import io from 'socket.io-client'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListFriends,
    Profile
  },
  data() {
    return {
      show: true,
      search: {
        text: null
      },
      message: null,
      data: {
        user_email: null,
        user_id: null
      },
      // coordinate: {}
      coordinate: {
        lat: 10,
        lng: 10
      },
      // socket: io('http://localhost:3000'),
      username: '',
      // msg: '',
      messages: [],
      room: '',
      oldRoom: '',
      typing: {
        isTyping: false
      },
      chat: {
        id_room_gen: null,
        id_sender: null,
        id_receiver: null,
        msg: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'dataUser',
      status_list: 'statusList',
      status_profile: 'statusProfile',
      rooms: 'dataRoom'
    })
  },
  created() {
    this.$getLocation({ enableHighAccuracy: true })
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        console.log(coordinates)
        const dataPayload = {}
        dataPayload.coordinate = this.coordinate
        dataPayload.user_id = this.user.user_id
        this.editLocation(dataPayload)
      })
      .catch(error => {
        alert(error)
      })
    this.statusChat()
    this.showRoom(this.user.user_id)
    this.data.user_id = this.user.user_id
  },
  methods: {
    ...mapActions([
      'logout',
      'addFriend',
      'showFriend',
      'showRoom',
      'editLocation',
      'postChat'
    ]),
    onLogout() {
      this.logout()
    },
    onInvite() {
      this.$swal
        .fire({
          title: '<span style="font-family: cursive">Add Friend</span>',
          input: 'email',
          inputLabel: 'Greet your friend on Hi App!',
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
        "Simple messaging app that connects people around the world with simple UI. Still curious? What are you waiting for? Let's get started!",
        'question'
      )
    },
    ...mapMutations(['statusList', 'statusProfile', 'statusChat']),
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
    selectRoom(a, b, c) {
      this.chat.id_room_gen = a
      this.chat.id_sender = b
      this.chat.id_receiver = c
    },
    sendMessage() {
      this.postChat(this.chat)
      this.chat.msg = ''
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
}
.b {
  background-color: lightgrey;
}
.chat {
  max-width: 100%;
}
.chat-window {
  height: 90vh;
  overflow: auto;
  background: lightgrey;
}
</style>
