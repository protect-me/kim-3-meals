@@ -0,0 +1,40 @@
<template>
  <div class="container">
    <div class="info-wrapper kim-info">
      <h1>
        세 끼 먹는 김사원
        <br />
        <div>김사원세끼</div>
      </h1>
      <p>
        <span> 서울 맛집, </span>
        <span> 맛없는 건 안 올립니다. </span>
      </p>
      <div class="link">
        <a :href="kimURL" target="_blank">
          <span>Youtube</span>
          <i
            title="새 탭에서 유튜브 열기"
            class="fa fa-arrow-circle-o-right fa-2x"
            aria-hidden="true"
          >
          </i>
        </a>
      </div>
    </div>

    <div class="info-wrapper jung-info">
      <h1>
        일 커밋하는 개발자
        <br />
        <div>프로텍트미</div>
      </h1>
      <p>
        <span> 프론트 엔드, </span>
        <span> 주니어 개발자입니다. </span>
      </p>
      <div class="link">
        <a :href="jungVelogURL" target="_blank">
          <span>Blog(Velog)</span>
          <i
            title="새 탭에서 유튜브 열기"
            class="fa fa-arrow-circle-o-right fa-2x"
            aria-hidden="true"
          ></i>
        </a>
      </div>
      <div class="link">
        <a :href="jungGithubURL" target="_blank">
          <span>Github</span>
          <i
            title="새 탭에서 유튜브 열기"
            class="fa fa-arrow-circle-o-right fa-2x"
            aria-hidden="true"
          ></i>
        </a>
      </div>
    </div>

    <div class="finger-down">👇🏻👇🏻👇🏻</div>

    <div class="contact">
      <div>Contact 🚀</div>
      <div>pmfwiww@gmail.com</div>
    </div>

    <div class="thanks">
      <div>Special Thanks to 🙏🏻</div>
      <div>김사원세끼 / HEROPY / memi dev</div>
    </div>
  </div>
</template>

<script>
import { getCookie, setCookie } from "@/plugins/cookie.js";

export default {
  mounted() {
    this.checkVisitCount("aboutPage");
  },
  data() {
    return {
      url: "http://gdata.youtube.com/feeds/api/videos/ylLzyHk54Z0",
      title: "",

      kimURL: "https://www.youtube.com/channel/UC-x55HF1-IilhxZOzwJm7JA",
      jungVelogURL: "https://velog.io/@protect-me/series",
      jungGithubURL: "https://github.com/protect-me",
    };
  },
  methods: {
    checkVisitCount(pageName) {
      const cookieName =
        "kim3mealsVisitHistory" +
        pageName[0].toUpperCase() +
        pageName.slice(1, pageName.length);
      const userHistory = getCookie(cookieName);
      if (!userHistory) {
        setCookie(cookieName, pageName, 1);
        this.visitCountUp(pageName);
      }
    },
    async visitCountUp(pageName) {
      try {
        await this.$firebase
          .firestore()
          .collection("meta")
          .doc("visitCounts")
          .update(pageName, this.$firebase.firestore.FieldValue.increment(1));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 70px;
  font-family: "TmonMonsori";
  height: calc(100vh - 120px);
  .info-wrapper {
    max-width: 600px;
    margin-top: 20px;
    margin-bottom: 30px;
    h1 {
      font-size: 2.5rem;
      line-height: 1;
      div {
        margin-top: 10px;
        font-size: 4rem;
        color: $primary;
      }
    }
    p {
      font-size: 1.8rem;
      color: $gray-600;
    }
    .link {
      text-align: right;
      a {
        text-decoration: none;
        span {
          font-size: 1.8rem;
          margin-right: 10px;
        }
      }
    }
  }
  .finger-down {
    text-align: center;
    margin-bottom: 30px;
  }
  .contact {
    text-align: left;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  .thanks {
    text-align: right;
    font-size: 1.2rem;
  }
}
@include media-breakpoint-down(sm) {
  .container {
    .info-wrapper {
      p {
        span {
          display: block;
        }
      }
    }
  }
}
</style>