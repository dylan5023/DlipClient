<template>
  <aside>
    <div class="head">Real-time popular companies</div>
    <ol>
      <li v-for="(c, i) in companyList" :key="c._id">
        <em>{{ i + 1 }}</em>
        {{ c.name }}
      </li>
    </ol>
    <p>
      <InfoIcon size="1x" />
      <span style="margin-left: 5px"
        >Ranking of most searched companies on D-lip</span
      >
    </p>
  </aside>
</template>
<script>
import { InfoIcon } from "vue-feather-icons";

export default {
  components: {
    InfoIcon,
  },
  data() {
    return {
      companyList: [],
    };
  },
  created() {
    this.getRealtimeFamousCompany();
  },
  methods: {
    async getRealtimeFamousCompany() {
      const data = await this.$api.$get("/company/list/famous");
      this.companyList = data;
    },
  },
};
</script>
<style lang="scss" scoped>
aside {
  width: 300px;
  margin-left: 64px;
  margin-top: 40px;
  padding: 22px 21px 14px;
  background: #f8f8f8;
  height: fit-content;
  .head {
    font-weight: 700;
    font-size: 18px;
    padding: 0 0 8px 10px;
  }
  ol {
    padding: 0;
    margin: 0;
    li {
      padding: 5px 3px;
      line-height: 17px;
      vertical-align: middle;
      list-style: none;
      em {
        display: inline-block;
        width: 20px;
        margin-right: 10px;
        font-weight: 700;
        color: #94969b;
        text-align: center;
        line-height: 20px;
        vertical-align: middle;
      }
    }
  }
  p {
    margin-top: 4px;
    padding: 9px 0 8px;
    color: #94969b;
    font-size: 12px;
    letter-spacing: -0.5px;
    text-align: center;
  }
}
</style>
