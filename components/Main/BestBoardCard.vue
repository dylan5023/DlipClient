<template>
  <div class="best board-card">
    <div class="head">
      <div class="title-side">
        <div class="board-icon"></div>
        <h2>Topic Recommend</h2>
      </div>
      <!-- <nuxt-link
        :to="{
          name: 'topics-id',
          params: {
            id: 'topic-best',
          },
        }"
        >more ></nuxt-link
      > -->
    </div>
    <div class="body">
      <ul class="article-list">
        <li v-for="article in articleList" :key="article._id">
          <div class="article-title">
            <span class="board-tag">{{ boardList[article.board] }}</span>
            <span>{{ article.title }}</span>
          </div>
          <div class="count-display">
            <div class="count-item">
              <ThumbsUpIcon size="1x" class="icon" />
              <span>{{ article.thumbupCount }}</span>
            </div>
            <div class="count-item">
              <MessageCircleIcon size="1x" class="icon" />
              <span>{{ article.commentCount }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ThumbsUpIcon, MessageCircleIcon } from "vue-feather-icons";
export default {
  props: {
    articleList: {
      type: Array,
      default: [],
    },
  },
  components: {
    MessageCircleIcon,
    ThumbsUpIcon,
  },
  data() {
    return {
      boardList: {},
    };
  },
  created() {
    this.getBoardList();
  },
  methods: {
    async getBoardList() {
      const data = await this.$api.$get("/board/list");

      if (!Array.isArray(data)) {
        return;
      }

      data.forEach((v) => {
        this.boardList[v._id] = v.title;
      });
    },
  },
};
</script>
<style lang="scss">
.board-tag {
  font-size: 12px;
  padding: 2px;
  border: solid 1px #94969b;
  color: #94969b;
  margin-right: 5px;
  position: relative;
  top: -2px;
}
</style>
