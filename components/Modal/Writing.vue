<template>
  <div v-if="modal.writing" class="modal-outside">
    <div id="writing-modal">
      <div class="head">
        <a
          @click.prevent="$store.commit('modal/SET_WRITING_MODAL_STATE', false)"
          class="close-btn"
        >
          <img src="/icon/close.png" alt="close" />
        </a>
        <h5>Spill the tea</h5>
        <a @click.prevent="confirmUploadModal">Register</a>
      </div>
      <div v-if="boardList.length > 0" class="dropdown">
        <a
          class="current-select"
          @click.prevent="isBoardSelected = !isBoardSelected"
        >
          <span>{{ boardList[currentSelectedBoard].title }}</span>
          <ChevronDownIcon
            :class="[isBoardSelected && 'rotated', 'down-icon']"
          />
        </a>
        <!--  drop down -->
        <div v-if="isBoardSelected" class="board-container">
          <div
            v-for="(b, i) in boardList"
            :key="b._id"
            class="board-item"
            @click="clickBoard(i)"
          >
            {{ b.title }}
          </div>
        </div>
        <div class="input-container">
          <!-- title -->
          <input
            type="text"
            v-model="title"
            placeholder="Please enter the subject."
          />
          <!-- body text-->
          <textarea
            v-model="content"
            placeholder="If a post is judged to be inappropriate for the topic and receives more than a certain number of reports from other users, the post may be automatically hidden."
          ></textarea>
        </div>
        <!-- foot -->
        <div class="foot">
          <CameraIcon class="icon" />
          <BarChart2Icon class="icon" />
          <AtSignIcon class="icon" />
          <HashIcon class="icon" />
        </div>
      </div>
    </div>
    <ConfirmModal
      :show="showConfirmModal"
      :title="confirmTitle"
      @confirm="listenConfirm"
    />
  </div>
</template>
<script>
import {
  ChevronDownIcon,
  CameraIcon,
  BarChart2Icon,
  AtSignIcon,
  HashIcon,
} from "vue-feather-icons";
import ConfirmModal from "@/components/Modal/Confirm";
import { mapState } from "vuex";

export default {
  components: {
    ChevronDownIcon,
    CameraIcon,
    BarChart2Icon,
    AtSignIcon,
    HashIcon,
    ConfirmModal,
  },
  computed: {
    ...mapState(["modal"]),
  },
  data() {
    return {
      boardList: [],
      currentSelectedBoard: 0,
      isBoardSelected: false,
      title: null,
      content: null,
      showConfirmModal: false,
      confirmTitle: null,
      imgFile: null,
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
      this.boardList = data;
    },
    clickBoard(index) {
      this.currentSelectedBoard = index;
      this.isBoardSelected = false;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
      this.confirmTitle = null;
    },
    listenConfirm(confirm) {
      !confirm ? this.closeConfirmModal() : this.uploadArticle();
    },
    confirmUploadModal() {
      this.showConfirmModal = true;
      this.confirmTitle = `Would you like to post on '${
        this.boardList[this.currentSelectedBoard].title
      }'?`;
    },
    async uploadArticle() {
      const data = await this.$api.$post("/article/create", {
        title: this.title,
        content: this.content,
        board: this.boardList[this.currentSelectedBoard]._id,
      });

      if (!data) {
        return;
      }
      this.closeConfirmModal();
      this.$store.commit("modal/SET_WRITING_MODAL_STATE", false);
    },
  },
};
</script>
<style lang="scss" scoped>
#writing-modal {
  width: 750px;
  height: auto;
  background: white;
  height: 610px;
  .dropdown {
    width: inherit;
    user-select: none;
    .current-select {
      height: 68px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #d4d4d4;
      .down-icon {
        transition: 0.3s ease-in-out;
        &.rotated {
          transform: rotate(180deg);
        }
      }
    }
    .board-container {
      position: absolute;
      overflow-y: auto;
      width: inherit;
      border-bottom: 1px solid #d4d4d4;
      height: 100%;
      max-height: 252px;
    }
    .board-item {
      padding: 12px 20px 11px;
      font-size: 12px;
      border-bottom: 1px solid #f6f7fa;
      cursor: pointer;
      background: white;
      &:hover {
        color: #fff;
        background: #da3238;
      }
    }
  }
  .input-container {
    padding: 0 52px 55px;
  }
  input[type="text"] {
    padding: 26px 60px 24px 0;
    font-size: 20px;
    line-height: 1.25em;
    display: block;
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-bottom: 1px solid #eee;
  }
  textarea {
    width: 100%;
    resize: none;
    display: block;
    border: none;
    margin-top: 30px;
    font-size: 16px;
    min-height: 240px;
    overflow: hidden;
    letter-spacing: -0.1px;
    line-height: 1.5em;
  }
  .foot {
    height: 67px;
    padding: 0 24px;
    background: #f6f7fa;
    border: 0;
    display: flex;
    align-items: center;
    & > .icon {
      padding: 0 10px;
    }
  }
}
</style>
