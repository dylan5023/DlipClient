<template>
  <div class="nav-container">
    <nav>
      <div class="side-block">
        <nuxt-link to="/" id="logo-btn">
          <img src="/logo/main.png" alt="D-lip" />
        </nuxt-link>
        <nuxt-link
          to="/"
          :class="['text-menu', $route.name === 'index' && 'active']"
          >Home</nuxt-link
        >
        <nuxt-link
          to="/company"
          :class="['text-menu', $route.name === 'company' && 'active']"
          >Review</nuxt-link
        >
      </div>
      <div class="side-block">
        <SmallSearchbar />
        <a @click.prevent="clickWritingButton" id="write-btn">write</a>
        <a @click.prevent="clickLoginButton" id="login-btn">{{
          user.email ? "Logout" : "Login"
        }}</a>
      </div>
      <LoginModal />
      <WritingModal />
    </nav>
  </div>
</template>
<script>
import SmallSearchbar from "@/components/GNB/SmallSearchbar";
import LoginModal from "@/components/Modal/Login";
import WritingModal from "@/components/Modal/Writing";
import { mapState } from "vuex";

export default {
  components: {
    SmallSearchbar,
    LoginModal,
    WritingModal,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    clickWritingButton() {
      if (!this.user.email) {
        this.$store.commit("modal/SET_LOGIN_MODAL_OPEN");
        return;
      }
      this.$store.commit("modal/SET_WRITING_MODAL_STATE", true);
    },
    clickLoginButton() {
      if (!this.user.email) {
        this.$store.commit("modal/SET_LOGIN_MODAL_OPEN");
        return;
      }
      this.logout();
    },
    logout() {
      this.$store.commit("user/SET_USER", {
        email: null,
        nickname: null,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-container {
  border-bottom: 1px solid #d4d4d4;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: auto;
  padding: 0 20px;
  max-width: 1100px;
  .side-block {
    display: flex;
    height: 100%;
    align-items: center;
    #logo-btn {
      margin-right: 60px;
    }
    img {
      // width: 80%;
      height: 10vh;

      // border: 1px solid green;
    }
    .text-menu {
      color: #222;
      font-size: 20px;
      margin-right: 30px;
    }
    #write-btn {
      background: rgb(144, 30, 30);
      color: white;
      font-size: 14px;
      height: 40px;
      margin-left: 10px;
      width: 82px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    #login-btn {
      background: white;
      color: rgb(34, 34, 34);
      font-size: 14px;
      border: solid 1px rgb(212, 212, 212);
      height: 40px;
      margin-left: 10px;
      width: 82px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
  }
}
</style>
