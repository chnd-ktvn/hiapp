<template>
  <div class="profile-friend">
    <div class="px-3 py-2">
      <h4
        style="text-align: center; color: #007bff; margin: 0 auto; margin-bottom: 5vh; "
      >
        {{ profileFriend.user_name }}
      </h4>
    </div>
    <b-img
      :src="
        profileFriend.user_photo === '' ||
        profileFriend.user_photo === undefined
          ? require('./../assets/cat-hi.png')
          : `${env}/fileuploads/` + profileFriend.user_photo
      "
      class="preview"
    ></b-img>
    <b-card style="margin: 20px;">
      <h6 style="padding-bottom: 17px; border-bottom: 1px solid #007bff;">
        Username
      </h6>
      <p style="margin-bottom: 0px;">{{ profileFriend.user_name }}</p>
    </b-card>
    <b-card style="margin: 20px;">
      <h6 style="padding-bottom: 17px; border-bottom: 1px solid #007bff;">
        Full Name
      </h6>
      <p style="margin-bottom: 0px;">{{ profileFriend.user_fullname }}</p>
    </b-card>
    <b-card style="margin: 20px;">
      <h6 style="padding-bottom: 17px; border-bottom: 1px solid #007bff;">
        Phone Number
      </h6>
      <p style="margin-bottom: 0px;">{{ profileFriend.user_phone }}</p>
    </b-card>
    <b-card style="margin: 20px;">
      <h6 style="padding-bottom: 17px; border-bottom: 1px solid #007bff;">
        Bio
      </h6>
      <p style="margin-bottom: 0px;">{{ profileFriend.user_bio }}</p>
    </b-card>
    <b-card style="margin: 20px;">
      <h6 style="padding-bottom: 17px; border-bottom: 1px solid #007bff;">
        Location
      </h6>
      <GmapMap
        :center="location"
        :zoom="10"
        map-type-id="terrain"
        style="width: 230px; height: 200px; margin: 0 auto; margin-bottom: 5vh;"
      >
        <GmapMarker
          :position="location"
          :clickable="true"
          :draggable="false"
          @click="clickMarker"
          icon="https://img.icons8.com/color/48/000000/map-pin.png"
        />
      </GmapMap>
    </b-card>
    <p style="text-align: center;">
      Joined since {{ profileFriend.created_at.split('T')[0] }}
    </p>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ProfileFriend',
  data() {
    return {
      env: process.env.VUE_APP_BASE_URL,
      location: {
        lat: 10.5,
        lng: 10.5
      }
    }
  },
  computed: {
    ...mapGetters({
      chat: 'dataProfileFriend',
      profileFriend: 'dataProfileFriends'
    })
  },
  created() {
    this.showProfileFriend(this.chat.id_receiver).then(result => {
      this.location.lat = parseFloat(result.data.data[0].lat)
      this.location.lng = parseFloat(result.data.data[0].lng)
    })
  },
  methods: {
    ...mapActions(['showProfileFriend'])
  }
}
</script>
<style scoped>
.preview {
  margin: 0 auto;
  width: 70px;
  height: 70px;
  border-radius: 20px;
  object-fit: cover;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-friend,
h6 {
  color: gray;
  font-size: 14px;
}
</style>
