<template>
  <div v-if="modal.login.show" class="modal-outside">
    <div id="login-modal">
      <div class="head">
        <h5>Authentication of blind OTP</h5>
        <a
          @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_CLOSE')"
          class="close-btn"
        ></a>
        <img src="" alt="" />
      </div>
    </div>
    <GNB />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["modal"]) },
};
</script>
<style></style>
