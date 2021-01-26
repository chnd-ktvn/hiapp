<template>
  <b-row class="login">
    <b-col lg="4" md="3" sm="4"> </b-col>
    <b-col lg="4" md="6" sm="6" class="b">
      <Register v-if="status_reg" />
      <b-container v-else>
        <h4 style="text-align: center; color: #007bff; margin-bottom: 5vh;">
          Login
        </h4>
        <p style="margin-bottom: 5vh;">Hi, Welcome back!</p>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="input-group-1"
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
            id="input-group-2"
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
          <p
            style="margin-bottom: 3vh; text-align: right; color: #007bff; cursor: pointer;"
          >
            Forgot password?
          </p>
          <b-button
            type="submit"
            class="btn"
            style="background-color: #007bff;
                  margin-bottom: 3vh; border-color: #007bff"
            block
            pill
            >Login</b-button
          >
          <p style="margin-bottom: 3vh; text-align: center;">
            Login with
          </p>
          <b-button
            block
            pill
            class="btn-google"
            style="background-color: white;
                    color: black;
                    border-color: #007bff;
                    margin-bottom: 3vh;"
            @click="onGoogle"
            >Google</b-button
          >
          <p style="text-align: center;">
            Don't have an account?
            <span style="cursor: pointer;" @click="onRegister">Sign Up</span>
          </p>
        </b-form>
      </b-container>
    </b-col>
    <b-col lg="4" md="3" sm="3"> </b-col>
  </b-row>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Register from '../components/Register.vue'
export default {
  name: 'Login',
  components: {
    Register
  },
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      status_reg: 'statusReg'
    })
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(result => {
          this.message = result.data.message
          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title:
              '<span style="font-family: cursive;">' + this.message + '<span>',
            showConfirmButton: false,
            timer: 3000
          })
          this.$router.push('/')
        })
        .catch(error => {
          this.message = error.response.data.message
          this.$swal.fire({
            position: 'top-end',
            icon: 'error',
            title:
              '<span style="font-family: cursive;">' + this.message + '<span>',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    ...mapMutations(['statusRegister', 'statusLogin']),
    onRegister() {
      this.statusRegister()
    },
    onGoogle() {
      this.$swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '<span style="font-family: cursive;">Coming soon!<span>',
        showConfirmButton: false,
        timer: 2000
      })
    }
  },
  created() {
    this.statusLogin()
  }
}
</script>
<style scoped>
.row {
  margin: 0;
  padding: 0;
}
.login {
  background-color: lightgrey;
  font-family: cursive;
}
.b {
  background-color: white;
  margin: 20vh 0;
  padding: 5vh;
  box-shadow: 0px 6px 25px rgba(12, 7, 4, 0.7);
  border-radius: 3vh;
  border: none;
}
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
}
span {
  color: #007bff;
}
@media screen and (max-width: 768px) {
  .b {
    margin: 10vh 0;
  }
}
</style>
