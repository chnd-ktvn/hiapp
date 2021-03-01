<template>
  <b-container>
    <div
      style="display: flex; justify-content: left;
      align-items: flex-start;"
    >
      <b-icon-chevron-left
        style="margin-top: 6px; cursor: pointer; color: #007bff"
        @click="onLogin"
      ></b-icon-chevron-left>
      <h4
        style="text-align: center; color: #007bff; margin: 0 auto; margin-bottom: 5vh; "
      >
        Register
      </h4>
    </div>
    <p style="margin-bottom: 5vh;">Let's create your account!</p>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-name"
        style="margin-bottom: 3vh;"
      >
        <b-form-input
          id="input-name"
          v-model="form.user_name"
          type="text"
          placeholder="Enter your username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Email:"
        label-for="input-email"
        style="margin-bottom: 3vh;"
      >
        <b-form-input
          id="input-email"
          v-model="form.user_email"
          type="email"
          placeholder="Enter your email address"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Password:"
        label-for="input-password"
        style="margin-bottom: 3vh;"
      >
        <b-form-input
          id="input-password"
          v-model="form.user_password"
          type="password"
          placeholder="Enter your password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        block
        pill
        class="btn"
        style="background-color: #007bff;
              margin-bottom: 3vh; border-color: #007bff"
        >Register</b-button
      >
      <p style="margin-bottom: 3vh; text-align: center;">
        Register with
      </p>
      <b-button
        block
        pill
        class="btn-google"
        style="background-color: white;
              color: black;
              border-color: #007bff ;
              margin-bottom: 3vh;"
        @click="onGoogle"
        >Google</b-button
      >
    </b-form>
  </b-container>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      this.register(this.form)
        .then(result => {
          this.message = result.data.message
          this.$swal.fire({
            icon: 'success',
            title:
              '<span style="font-family: cursive;">' + this.message + '<span>',
            showConfirmButton: false,
            timer: 3000
          })
          this.statusLogin()
        })
        .catch(error => {
          this.message = error.response.data.message
          this.$swal.fire({
            icon: 'error',
            title:
              '<span style="font-family: cursive;">' + this.message + '<span>',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    ...mapMutations(['statusLogin']),
    onLogin() {
      this.statusLogin()
    },
    onGoogle() {
      this.$swal.fire({
        icon: 'error',
        title: '<span style="font-family: cursive;">Coming soon!<span>',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
}
</script>
<style scoped>
.btn:visited,
.btn:hover {
  background-color: #007bff;
  box-shadow: 0px 6px 25px rgba(12, 7, 4, 0.7);
  margin-bottom: 3vh;
  border-color: #007bff;
}
.btn-google:visited,
.btn-google:hover {
  background-color: white;
  color: black;
  border-color: #007bff;
  box-shadow: 0px 6px 25px rgba(12, 7, 4, 0.7);
  margin-bottom: 3vh;
  justify-content: space-evenly;
}
</style>
