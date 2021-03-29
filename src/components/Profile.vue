<template>
  <b-container>
    <div
      style="display: flex; justify-content: left;
      align-items: flex-start;"
    >
      <b-icon-chevron-left
        style="margin-top: 6px; cursor: pointer; color: #007bff"
        @click="onHome"
      ></b-icon-chevron-left>
      <h4
        style="text-align: center; color: #007bff; margin: 0 auto; margin-bottom: 5vh; "
      >
        {{ profile.user_name }}
      </h4>
    </div>
    <b-form>
      <b-img
        v-if="showPhoto"
        :src="
          profile.user_photo === '' || profile.user_photo === undefined
            ? require('./../assets/cat-hi.png')
            : `${env}/fileuploads/` + profile.user_photo
        "
        class="preview"
      ></b-img>
      <b-img
        v-else
        :src="
          image === '' || image === null
            ? require('./../assets/cat-hi.png')
            : image
        "
        class="preview"
      ></b-img>
      <div
        style="display: flex; justify-content: center; align-items: center; margin: 3vh 0 0 0;"
      >
        <b-icon-trash
          @click="onDelete"
          style="color: #007bff; margin-right: 2vh; cursor: pointer"
          title="Delete Photo Profile"
        ></b-icon-trash>
        <label
          style="margin-left: 2vh; margin-top: 1vh; cursor: pointer"
          title="Edit Photo Profile"
        >
          <b-icon-pencil style="color: #007bff;"></b-icon-pencil>
          <input type="file" @change="editPhoto" v-show="show" />
        </label>
      </div>
      <p style="font-weight: 600; color: black;">Account</p>
      <b-input-group v-b-tooltip.hover title="Username" size="sm" class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon-person style="color: #007bff;"></b-icon-person>
        </b-input-group-prepend>
        <b-form-input
          v-model="profile.user_name"
          type="text"
          placeholder="Username"
        ></b-form-input>
      </b-input-group>
      <b-input-group v-b-tooltip.hover title="Full Name" size="sm" class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon-person-fill style="color: #007bff;"></b-icon-person-fill>
        </b-input-group-prepend>
        <b-form-input
          v-model="profile.user_fullname"
          type="text"
          placeholder="Full Name"
        ></b-form-input>
      </b-input-group>
      <b-input-group
        v-b-tooltip.hover
        title="Phone Number"
        size="sm"
        class="mb-2"
      >
        <b-input-group-prepend is-text>
          <b-icon-telephone-fill
            style="color: #007bff;"
          ></b-icon-telephone-fill>
        </b-input-group-prepend>
        <b-form-input
          v-model="profile.user_phone"
          type="number"
          placeholder="Phone Number"
        ></b-form-input>
      </b-input-group>
      <b-input-group v-b-tooltip.hover title="Bio" size="sm" class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon-book-half style="color: #007bff;"></b-icon-book-half>
        </b-input-group-prepend>
        <b-form-textarea
          v-model="profile.user_bio"
          type="text"
          placeholder="Bio"
        ></b-form-textarea>
      </b-input-group>
      <b-button style="margin: 5vh 0;" @click="onEdit" pill>Edit data</b-button>
      <p style="font-weight: 600; color: black;">
        Location
      </p>
      <GmapMap
        :center="location"
        :zoom="10"
        map-type-id="terrain"
        style="width: 230px; height: 200px; margin: 0 auto; margin-bottom: 5vh;"
      >
      <!-- @click="clickMarker" -->
        <GmapMarker
          :position="location"
          :clickable="true"
          :draggable="true"
          icon="https://img.icons8.com/color/48/000000/map-pin.png"
        />
      </GmapMap>
      <p style="font-weight: 600; color: black;">Settings</p>
      <div
        style="display: flex; justify-content: left;
      align-items: flex-start;"
      >
        <b-icon-lock style="color: #007bff;"></b-icon-lock>
        <p
          style="margin-left: 15px; color: gray; cursor: pointer;"
          @click="onPrivacy"
        >
          Privacy and Security
        </p>
      </div>
    </b-form>
  </b-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      env: process.env.VUE_APP_BASE_URL,
      image: '',
      show: false,
      showPhoto: true,
      message: null,
      statusDelete: false,
      location: {
        lat: 10,
        lng: 10
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'dataUser',
      profile: 'dataProfile',
      location: 'dataLocation',
      img: 'dataPhoto',
      statusPhoto: 'deletePhoto'
    })
  },
  created() {
    this.showProfile(this.user.user_id).then(result => {
      this.location.lat = parseFloat(result.data.data[0].lat)
      this.location.lng = parseFloat(result.data.data[0].lng)
    })
  },
  methods: {
    ...mapActions(['showProfile', 'editProfile', 'deletePhotoProfile']),
    ...mapMutations(['statusHome']),
    onHome() {
      this.statusHome()
    },
    clickMarker(position) {
      console.log(position)
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
      console.log(this.coordinate)
    },
    onPrivacy() {
      this.message = 'Coming Soon'
      this.alert()
    },
    editPhoto(e) {
      this.showPhoto = false
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      this.image = URL.createObjectURL(e.target.files[0])
      if (!allowedTypes.includes(e.target.files[0].type)) {
        this.message = 'Filetype is wrong!'
        this.image = ''
        this.alert()
      } else if (e.target.files[0].size > 2 * 1024 * 1024) {
        this.message = 'Too large, max size allowed is 2MB'
        this.image = ''
        this.alert()
      } else {
        console.log('ini yang oke inputan file')
        this.profile.user_photo = e.target.files[0]
      }
    },
    onDelete() {
      this.showPhoto = false
      this.image = this.statusPhoto
      console.log(this.profile.user_id)
      this.deletePhotoProfile(this.profile.user_id)
        .then(result => {
          this.message = result.data.message
          this.$swal.fire({
            icon: 'success',
            title:
              '<span style="font-family: cursive;">' + this.message + '<span>',
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alert()
        })
    },
    onEdit() {
      this.post()
    },
    alert() {
      this.$swal.fire({
        icon: 'error',
        title: '<span style="font-family: cursive;">' + this.message + '<span>',
        showConfirmButton: false,
        timer: 3000
      })
    },
    post() {
      const {
        user_name,
        user_phone,
        user_bio,
        user_fullname,
        user_photo,
        user_email
      } = this.profile

      const data = new FormData()
      data.append('user_name', user_name)
      data.append('user_phone', user_phone)
      data.append('user_bio', user_bio)
      data.append('user_fullname', user_fullname)
      data.append('user_photo', user_photo)
      data.append('user_email', user_email)
      for (var pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      const dataPayload = {}
      dataPayload.user_id = this.user.user_id
      dataPayload.data = data
      console.log(dataPayload)
      this.editProfile(dataPayload)
        .then(result => {
          this.message = result.data.message
          this.$swal.fire({
            icon: 'success',
            title:
              '<span style="font-family: cursive;">' + this.message + '<span>',
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alert()
        })
    }
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
</style>
