<template>
  <div id="input-comment">
    <CameraIcon class="icon" />
    <div v-if="!enlarge" class="empty" @click="enlarge = true">
      Leave comment.
    </div>
    <div v-else class="content-container">
      <textarea v-model="content" placeholder="Leave comment"></textarea>
      <div class="foot">
        <a @click.prevent="enlarge = false">Cancel</a>
        <a
          :class="[content !== null && content !== '' && 'active']"
          @click.prevent="uploadComment"
          >Register</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { CameraIcon } from "vue-feather-icons";
export default {
  components: {
    CameraIcon,
  },
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      enlarge: false,
      content: null,
    };
  },
  methods: {
    async uploadComment() {
      const data = await this.$api.$post("/comment/create", {
        content: this.content,
        article: this.articleId,
      });
      if (!data) {
        return;
      }
      this.enlarge = false;
      this.content = null;
    },
  },
};
</script>
<style lang="scss" scoped>
#input-comment {
  display: flex;
  padding: 20px;
  border: 1px solid #d4d4d4;
  .icon {
    margin-right: 20px;
  }
  .empty {
    line-height: 28px;
    cursor: pointer;
  }
  .content-container {
    width: 100%;
  }
  textarea {
    resize: none;
    width: 100%;
    display: block;
    border: none;
    font-size: 16px;
    min-height: 100px;
    margin-bottom: 20px;
  }
  .foot {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    a {
      color: #d4d4d4;
      &.active {
        color: #222222;
      }
    }
  }
}
</style>
