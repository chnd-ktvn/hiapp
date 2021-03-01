<template>
  <b-container>
    <b-container style="margin: 30px 0">
      <b-card
        no-body
        class="overflow-hidden"
        style="box-shadow: 0px 6px 25px rgba(12, 7, 4, 0.7);"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="require('../assets/hi-cat.jpg')"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body style="font-family: cursive;">
              <h3>Hi App</h3>
              <p>{{ msg }}</p>
              <p>
                Hello, there. Thank you for using this app. Please click the
                button bellow to login!
              </p>
              <b-button
                style="margin: 0 30px 30px 30px; background-color: #007bff; order-color: #007bff"
                class="btn"
                pill
                @click="onLogin"
              >
                <b-icon-chevron-left></b-icon-chevron-left> Back to
                Login</b-button
              >
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Activation',
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    ...mapActions(['activationEmail']),
    onLogin() {
      this.$router.push('/login')
    }
  },
  created() {
    this.user_id = this.$route.params.id
    const form = {
      id: this.user_id
    }
    this.activationEmail(form)
      .then(result => {
        this.msg = result.data.message
      })
      .catch(err => {
        this.msg = err.response.data.message
      })
  }
}
</script>
<style scoped>
p {
  margin: 30px 0;
  padding: 30px;
  border-bottom: 1px solid #007bff;
}
.btn:hover {
  background-color: #007bff;
  box-shadow: 0px 6px 25px rgba(12, 7, 4, 0.7);
  border-color: #007bff;
}
</style>
