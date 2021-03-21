<template>
  <div>
    <b-card v-if="friends.length === 0" style="padding: 5vh 0; border: none;">
      <p style="text-align: center;">
        Click <span style="color: #007bff;"><i>invite friends</i></span> to
        added a friend to your list.
      </p>
    </b-card>
    <b-list-group
      v-for="(item, index) in friends"
      :key="index"
      class="list"
      @click="onChat(item.friends_with, item.user_id)"
      v-else
    >
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar
          style="background-color: lightgrey;"
          :src="
            item.user_photo === ''
              ? require('./../assets/cat-hi.png')
              : `${env}/` + item.user_photo
          "
          class="mr-3"
          rounded="lg"
        ></b-avatar>
        <p class="mr-auto span">{{ item.user_name }}</p>
        <b-icon-chat-left-text-fill
          style="color:  #007bff; cursor: pointer;"
          @click="onChat(item.friends_with, item.user_id)"
          :title="`Chat with ${item.user_name}`"
        ></b-icon-chat-left-text-fill>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'ListFriends',
  data() {
    return {
      env: process.env.VUE_APP_BASE_URL
    }
  },
  computed: {
    ...mapGetters({
      friends: 'dataFriend',
      rooms: 'dataRoom',
      user: 'dataUser'
    })
  },
  methods: {
    ...mapMutations(['statusChat']),
    ...mapActions(['postRoom', 'showRoom', 'showFriend']),
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
        roomWithIdReceiver = null
        this.postRoom(data)
          .then(result => {
            roomWithIdReceiver = null
            console.log(result)
            this.showRoom(this.user.user_id)
            this.statusChat()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.showRoom(this.user.user_id)
        this.statusChat()
      }
    }
  },
  created() {
    this.showFriend(this.user.user_id)
    // this.rooms.forEach(el => {
    //     // if (el.receiver === b) {
    //       console.log(el)
    //       // roomWithIdReceiver = el.receiver
    //     // }
    //   })
  }
}
</script>
<style scoped>
.list {
  cursor: pointer;
  color: #007bff;
}
.list:hover {
  color: gray;
}
</style>
