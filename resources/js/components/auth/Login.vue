<template>
  <div id="login">
    <h3 class="text-center text-white pt-5">Login form</h3>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form @submit.prevent="authenticate" id="login-form" class="form" action method="post">
              <h3 class="text-center text-info">Login</h3>
              <div class="form-group">
                <label for="email" class="text-info">Email:</label>
                <br />
                <input v-model="form.email" type="email" name="email" id="email" class="form-control" />
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label>
                <br />
                <input v-model="form.password" type="text" name="password" id="password" class="form-control" />
              </div>
              <div class="input-group">
                  <button class="btn btn-primary btn-block">
                      Submit
                  </button>
              </div>
               <div class="error" v-if="authError">
                  {{ authError }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '../../helpers/auth';
export default {
    name: 'login',
    data() {
        return {
            form: {
                email: '',
                password:''
            },
            error: null
        }
    },
    methods: {
        authenticate(){
            this.$store.dispatch('login');
            login(this.$data.form)
            .then(res => {
                this.$store.commit("loginSuccess", res);
                this.$router.push({path: '/'});
            })
            .catch(error => {
                this.$store.commit("loginFailed", error);
            })
        }
    },
    computed: {
      authError(){
        return this.$store.getters.authError;
      }
    }
};
</script>

<style scoped>
    #login .container #login-row #login-column #login-box {
    margin-top: 120px;
    max-width: 600px;
    height: 320px;
    border: 1px solid #9c9c9c;
    background-color: #eaeaea;
    }
    #login .container #login-row #login-column #login-box #login-form {
      padding: 20px;
    }
    #login
    .container
    #login-row
    #login-column
    #login-box
    #login-form
    #register-link {
      margin-top: -85px;
    }

    .error{
      text-align: center;
      color: red;
    }
</style>