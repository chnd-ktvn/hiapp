<template>
  <div>
    <b-list-group v-for="(item, index) in friends" :key="index">
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
        <span class="mr-auto">{{ item.user_name }}</span>
        <!-- <span class="mr-auto">{{ item.user_bio }}</span> -->
        <b-icon-chat-fill
          style="color:  #007bff; cursor: pointer;"
          @click="onChat(item.friends_with, item.user_id)"
          title="Chat"
        ></b-icon-chat-fill>
        <p>{{ item.user_email }}</p>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'ListFriends',
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['statusChat']),
    ...mapActions(['postRoom']),
    onChat(b, a) {
      const data = {
        sender: a,
        receiver: b
      }
      let roomWithIdReceiver = null
      this.rooms.forEach(el => {
        if (el.receiver === b) {
          roomWithIdReceiver = el.receiver
        }
      })
      console.log(roomWithIdReceiver)
      if (roomWithIdReceiver === null) {
        this.postRoom(data)
          .then(result => {
            console.log(result)
            this.statusChat()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.statusChat()
      }
    }
  },
  computed: {
    ...mapGetters({
      friends: 'dataFriend',
      rooms: 'dataRoom'
    })
  }
}
</script>
<style scoped></style>
