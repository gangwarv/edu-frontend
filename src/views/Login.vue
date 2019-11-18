<template>
  <div id="login" class="overlay">
    <div class="login-card">
      <div class="card-title has-background-primary">
        <h1>Please Sign In</h1>
      </div>
      <div class="content">
        <form method="POST" action="#">
          <input
            type="text"
            v-model="userName"
            title="Username"
            placeholder="Username"
            required
            autofocus
          />
          <input
            type="password"
            v-model="password"
            title="Password"
            placeholder="Password"
            required
          />
          <div class="level options">
            <div class="checkbox level-left">
              <input type="checkbox" id="checkbox" v-model="rememberMe" class="regular-checkbox" />
              <label for="checkbox"></label>
              <span>Remember me</span>
            </div>
            <router-link to="/" class="btn btn-link level-right" href="#">Forgot Password?</router-link>
          </div>
          <p class="has-text-danger">{{ error }}</p>
          <button
            type="button"
            :disabled="!userName || !password || loading"
            class="btn btn-primary"
            @click="signin"
          >{{ loading?'Checking':'Login' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "@/graphql/auth";
import { AUTH_SET, AUTH_REMOVE } from '@/store/auth/types'
import {apolloClient} from '../apollo'

export default {
  name: "Login",
  mounted() {
    apolloClient.resetStore();
    // apolloClient.cache.reset();
    this.$store.commit(AUTH_REMOVE);
  },
  data: function() {
    return {
      userName: "vishal",
      password: "123",
      rememberMe: true,
      loading: false,
      error: null
    };
  },
  methods: {
    signin: function() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: {
            userName: this.userName,
            password: this.password
          }
        })
        .then(({ data: { login } }) => {
          this.loading = false;
          this.$store.commit(AUTH_SET, login);
          this.$router.push("/");
        })
        .catch(err => {
          this.loading = false;
          try {
            this.error = err.networkError.result.errors[0].message;
          } catch (error) {
            this.error = err.message;
          }
        });
    }
  }
};
</script>

<style lang="scss">
$primary: hsl(0, 1%, 25%);
$grey-darker: hsl(0, 0%, 21%);
$grey-dark: hsl(0, 0%, 29%);
$grey: hsl(0, 0%, 48%);
$grey-light: hsl(0, 0%, 71%);
$grey-lighter: hsl(0, 0%, 86%);

.overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
}

#login {
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f7f7f7;

  .login-card {
    background: #fff;
    width: 24rem;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.11);

    .card-title {
      // background-color: darken($primary, 5%);
      padding: 2rem;

      h1 {
        color: #fff;
        text-align: center;
        font-size: 1.2rem;
      }
    }

    .content {
      padding: 3rem 2.5rem 5rem;
    }

    input[type="text"],
    input[type="password"] {
      display: block;
      width: 100%;
      font-size: 1rem;
      margin-bottom: 1.75rem;
      padding: 0.25rem 0;
      border: none;
      border-bottom: 1px solid $grey-lighter;
      transition: all 0.5s;

      &:hover {
        border-color: $grey;
      }

      &:active,
      &:focus {
        border-color: $primary;
      }
    }

    .checkbox {
      color: $grey-light;
      font-size: 0.8rem;

      span {
        margin-left: 0.5rem;
      }
    }

    a {
      font-size: 0.8rem;
    }

    .options {
      color: $grey-light;
      margin-bottom: 1.5rem;
    }

    button {
      cursor: pointer;
      font-size: 1.2rem;
      color: $primary;
      border-radius: 4rem;
      display: block;
      width: 100%;
      background: transparent;
      border: 2px solid $primary;
      padding: 0.9rem 0 1.1rem;
      transition: color 0.5s, border-color 0.5s;

      &:hover,
      &:focus {
        color: darken($primary, 10%);
        border-color: darken($primary, 10%);
      }

      &:active {
        transform: translateY(1px);
      }
      &:disabled {
        background-color: gainsboro;
        border-color: gray;
        cursor: not-allowed;
      }
    }
  }
}

label {
  cursor: pointer;
}

.regular-checkbox {
  display: none;
}

.regular-checkbox + label {
  background-color: #fafafa;
  border: 1px solid $grey-lighter;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 7px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}

.regular-checkbox:checked + label {
  background-color: #e9ecee;
}

.regular-checkbox:checked + label:after {
  content: "\2714";
  font-size: 11px;
  position: absolute;
  top: 0;
  left: 3px;
  color: $grey-light;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>