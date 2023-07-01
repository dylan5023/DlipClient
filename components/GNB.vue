<template>
  <nav>
    <div class="left-side">
      <nuxt-link to="/">
        <img src="/logo/main.png" alt="blind logo" />
      </nuxt-link>
      <nuxt-link to="/"> Home </nuxt-link>
      <nuxt-link to="/company"> Review of company </nuxt-link>
    </div>
    <div class="right-side">
      <SmallSerchbar />
      <a @click.prevent="clickWritingButton">Write article</a>
      <a @click.prevent="clikcLoginButton">Login</a>
    </div>
    <LoginModal />
    <WritingModal />
  </nav>
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
      }
    },
    clikcLoginButton() {
      if (!this.user.email) {
        this.$store.commit("modal/SET_LOGIN_MODAL_OPEN");
      }
    },
  },
};
</script>
<style></style>
