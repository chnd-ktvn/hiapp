<template>
  <b-container>
    <div v-for="(item, index) in profile" :key="index">
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
          {{ item.user_name }}
        </h4>
      </div>
      <b-form>
        <b-img
          v-if="showPhoto"
          :src="
            img === '' || undefined ? require('./../assets/account.png') : img
          "
          class="preview"
        ></b-img>
        <b-img
          v-else
          :src="
            image === '' || null ? require('./../assets/account.png') : image
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
        <b-input
          v-model="form.user_fullname"
          style="border: none; width: 60%; margin: 0 auto; text-align: center; font-weight: bold; color: black;"
          :placeholder="
            item.user_fullname ? item.user_fullname : 'Your fullname'
          "
        ></b-input>
        <p style="margin: 0 auto 3vh auto; text-align: center; color: grey">
          {{ item.user_name }}
        </p>
        <p style="font-weight: 600; color: black;">Account</p>
        <b-input
          id="inputPhone"
          v-model="form.user_phone"
          style="border: none; width: 50%; margin-bottom: 1vh; font-weight: bold; color: black;"
          :placeholder="item.user_phone ? item.user_phone : 'Your phone number'"
        ></b-input>
        <label for="inputPhone" style="color: #007bff; margin-bottom: 3vh;"
          >Tap to change phone number</label
        >
        <hr style="background-color: lightgrey;" />
        <b-input
          id="inputUsername"
          v-model="form.user_name"
          style="border: none; width: 50%; font-weight: bold; color: black;"
          :placeholder="item.user_name ? item.user_name : 'Your username'"
        ></b-input>
        <label for="inputUsername" style="color: grey; margin-bottom: 2vh;"
          >Username</label
        >
        <hr style="background-color: lightgrey;" />
        <b-input
          id="inputUserbio"
          v-model="form.user_bio"
          style="border: none; width: 50%; font-weight: bold; color: black;"
          :placeholder="item.user_bio ? item.user_bio : 'Your bio'"
        ></b-input>
        <label for="inputUserbio" style="color: grey; margin-bottom: 5vh;"
          >Bio</label
        >
        <p style="font-weight: 600; color: black;">Location</p>
        <GmapMap
          :center="location"
          :zoom="10"
          map-type-id="terrain"
          style="width: 230px; height: 200px; margin: 0 auto; margin-bottom: 5vh;"
        >
          <GmapMarker
            :position="location"
            :clickable="true"
            :draggable="true"
            @click="clickMarker"
            icon="https://img.icons8.com/color/48/000000/map-pin.png"
          />
        </GmapMap>
        <p style="font-weight: 600; color: black;">Settings</p>
        <div
          style="display: flex; justify-content: left;
      align-items: flex-start;"
        >
          <b-icon-lock></b-icon-lock>
          <p style="margin-left: 15px;">Privacy and Security</p>
        </div>
      </b-form>
      <b-button style="margin: 5vh 0;" @click="onEdit" block pill
        >Edit data</b-button
      >
    </div>
  </b-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      image: '',
      show: false,
      showPhoto: true,
      message: null,
      statusDelete: false,
      form: {
        user_name: '',
        user_phone: '',
        user_bio: '',
        user_fullname: '',
        user_photo: ''
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
    this.showProfile(this.user.user_id)
    // console.log(this.user.user_id)
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
        this.form.user_photo = e.target.files[0]
      }
    },
    onDelete() {
      this.showPhoto = false
      this.image = this.statusPhoto
      this.statusDelete = true
    },
    onEdit() {
      console.log('tertrigger')
      if (!this.statusDelete) {
        this.post()
        this.statusDelete = false
      } else {
        console.log('else')
        this.post()
        const dataPayload = {}
        dataPayload.user_id = this.user.user_id
        dataPayload.data = this.user.user_email
        this.deletePhotoProfile(dataPayload)
        this.statusDelete = false
      }
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
      this.form.user_name === ''
        ? (this.form.user_name = this.profile[0].user_name)
        : this.form.user_name

      this.form.user_phone === ''
        ? (this.form.user_phone = this.profile[0].user_phone)
        : this.form.user_phone

      this.form.user_bio === ''
        ? (this.form.user_bio = this.profile[0].user_bio)
        : this.form.user_bio

      this.form.user_fullname === ''
        ? (this.form.user_fullname = this.profile[0].user_fullname)
        : this.form.user_fullname
      const { user_name, user_phone, user_bio, user_fullname } = this.form
      const user_photo = this.form.user_photo
      const user_email = this.profile[0].user_email

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
      dataPayload.data = this.data
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
