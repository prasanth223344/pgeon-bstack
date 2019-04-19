  <template>
  <div>
    <header class="landing_header relative">
      <div
        class="mw6 m-auto landing_header__inner flex items-center top__header relative pr15 pl15"
      >
        <a v-on:click="goBack()" class="question-details__close pointer fc">
          <img width="22" height="22" src="../../assets/img/svg/times.svg">
        </a>
        <div class="question-details__profile fc">
           <router-link
              :to="{ name: 'profile', params: { id:  question.user_id}}">
            <avatar :size="36" :src="profile_pic" :username="question.user_id"></avatar>
          </router-link>
        </div>
        <div class="question-details__more pointer" >
          <!-- changes names -->
          <div class="ellipses fc" v-if = "!nomenu">
            <img width="22" height="22" src="../../assets/img/svg/ellipsis-v.svg">
          </div>
          <div class="times fc">
            <img width="22" height="22" src="../../assets/img/svg/times.svg">
          </div>
        </div>
      </div>
      <div class="details__dropdown__container mw6 m-auto" >
        <ul class="details__dropdown">
          <li
            class="details__dropdown_item details__dropdown_item--share pointer pl15p mt15p mb15p" v-if = "!noshare"
          >
            <img width="22" height="22" src="../../assets/img/svg/share-alt.svg">
            
            <span>Share</span>
          </li>

          <li  class="details__dropdown_item pointer pl15p mb15p mt15p">
            <img width="22" height="22" src="../../assets/img/svg/flag.svg">
            <span id="report_question" v-on:click="report()">Report</span>
          </li>

          <!-- <li class="details__dropdown_item pointer pl15p mb15p">
        {{Helper::read_svg("img/svg/book.svg")}}
            <span >Tutorial</span>
          </li>-->
        </ul>
      </div>
      <div class="details__overlay standard-overlay"></div>
    </header>

    <div class="details-share">
      <div class="details-share__inner mw6 m-auto">
        <div class="details-share__header">
          <span></span>
          <h3>Share Question</h3>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z"></path></svg>
        </div>
        <div class="details-share__body">
          <div class="details-share__item details-share__item--fb">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"></path></svg>

            <h3>FaceBook</h3>
          </div>
          <div class="details-share__seperator"></div>

          <div class="details-share__item details-share__item--twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>

            <h3>Twitter</h3>
          </div>
          <div class="details-share__seperator"></div>

          <div class="details-share__item details-share__item--linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>

            <h3>LinkedIn</h3>
          </div>
          <div class="details-share__seperator"></div>

          <div class="details-share__item details-share__item--reddit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M283.2 345.5c2.7 2.7 2.7 6.8 0 9.2-24.5 24.5-93.8 24.6-118.4 0-2.7-2.4-2.7-6.5 0-9.2 2.4-2.4 6.5-2.4 8.9 0 18.7 19.2 81 19.6 100.5 0 2.4-2.3 6.6-2.3 9 0zm-91.3-53.8c0-14.9-11.9-26.8-26.5-26.8-14.9 0-26.8 11.9-26.8 26.8 0 14.6 11.9 26.5 26.8 26.5 14.6 0 26.5-11.9 26.5-26.5zm90.7-26.8c-14.6 0-26.5 11.9-26.5 26.8 0 14.6 11.9 26.5 26.5 26.5 14.9 0 26.8-11.9 26.8-26.5 0-14.9-11.9-26.8-26.8-26.8zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-99.7 140.6c-10.1 0-19 4.2-25.6 10.7-24.1-16.7-56.5-27.4-92.5-28.6l18.7-84.2 59.5 13.4c0 14.6 11.9 26.5 26.5 26.5 14.9 0 26.8-12.2 26.8-26.8 0-14.6-11.9-26.8-26.8-26.8-10.4 0-19.3 6.2-23.8 14.9l-65.7-14.6c-3.3-.9-6.5 1.5-7.4 4.8l-20.5 92.8c-35.7 1.5-67.8 12.2-91.9 28.9-6.5-6.8-15.8-11-25.9-11-37.5 0-49.8 50.4-15.5 67.5-1.2 5.4-1.8 11-1.8 16.7 0 56.5 63.7 102.3 141.9 102.3 78.5 0 142.2-45.8 142.2-102.3 0-5.7-.6-11.6-2.1-17 33.6-17.2 21.2-67.2-16.1-67.2z"></path></svg>

            <h3>Reddit</h3>
          </div>
          <div class="details-share__seperator"></div>

          <div class="details-share__item details-share__item--link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M301.148 394.702l-79.2 79.19c-50.778 50.799-133.037 50.824-183.84 0-50.799-50.778-50.824-133.037 0-183.84l79.19-79.2a132.833 132.833 0 0 1 3.532-3.403c7.55-7.005 19.795-2.004 20.208 8.286.193 4.807.598 9.607 1.216 14.384.481 3.717-.746 7.447-3.397 10.096-16.48 16.469-75.142 75.128-75.3 75.286-36.738 36.759-36.731 96.188 0 132.94 36.759 36.738 96.188 36.731 132.94 0l79.2-79.2.36-.36c36.301-36.672 36.14-96.07-.37-132.58-8.214-8.214-17.577-14.58-27.585-19.109-4.566-2.066-7.426-6.667-7.134-11.67a62.197 62.197 0 0 1 2.826-15.259c2.103-6.601 9.531-9.961 15.919-7.28 15.073 6.324 29.187 15.62 41.435 27.868 50.688 50.689 50.679 133.17 0 183.851zm-90.296-93.554c12.248 12.248 26.362 21.544 41.435 27.868 6.388 2.68 13.816-.68 15.919-7.28a62.197 62.197 0 0 0 2.826-15.259c.292-5.003-2.569-9.604-7.134-11.67-10.008-4.528-19.371-10.894-27.585-19.109-36.51-36.51-36.671-95.908-.37-132.58l.36-.36 79.2-79.2c36.752-36.731 96.181-36.738 132.94 0 36.731 36.752 36.738 96.181 0 132.94-.157.157-58.819 58.817-75.3 75.286-2.651 2.65-3.878 6.379-3.397 10.096a163.156 163.156 0 0 1 1.216 14.384c.413 10.291 12.659 15.291 20.208 8.286a131.324 131.324 0 0 0 3.532-3.403l79.19-79.2c50.824-50.803 50.799-133.062 0-183.84-50.802-50.824-133.062-50.799-183.84 0l-79.2 79.19c-50.679 50.682-50.688 133.163 0 183.851z"></path></svg>

            <h3>Copy Link</h3>
          </div>
          <div class="details-share__seperator"></div>
        </div>
      </div>
    </div>
    <!-- <div id="share_q" class="dn" data-unesx="{{$question->question}}">{{ urlencode($question->question)}}</div> -->
  </div>
</template>

<script>
import { configure } from "radiks";
import { User } from "radiks"; 
import Avatar from "vue-avatar";
import { BlockstackMixin } from "../../mixins/BlockstackMixin.js";
import { NavMixin } from "../../mixins/NavMixin.js";
const SparkPost = require('sparkpost');


export default {
  name: "app",
  components: { Avatar },

  props: ["question", "noshare", "nomenu"],
            mixins: [BlockstackMixin, NavMixin],
  methods: {
  report: async function(id) {
    var uname = "guest"
      if(this.current_user && this.current_user.username) {
          uname = this.current_user.username
      }
      //this.users =  await axios.post(`${process.env.API_PATH}/reportq/${this.question._id}/${uname}`);

      location.reload();
    },
  },
  //async
  async mounted() {

    configure(this.RADIKS_SERVER);


      



    var pf = await this.blockstack.lookupProfile(this.question.user_id);
    if (pf && typeof pf.image !== "undefined" && pf.image[0]["contentUrl"]) {
      this.profile_pic = pf.image[0]["contentUrl"];
    }


    $(".question-details__more").click(e => {
      const open = $(".landing_header").hasClass("details__dropdown--active");
      open ? closeDetailsDropdown() : openDetailsDropdown();
    });

    const closeDetailsDropdown = () => {
      $(".landing_header").removeClass("details__dropdown--active");
      closeSharedLinks();
    };

    const openDetailsDropdown = () => {
      $(".landing_header").addClass("details__dropdown--active");
    };

    const openSharedLinks = () => {
      $(".details-share").addClass("details-share--visible");
      $(".details__dropdown").addClass("dn");
    };
    const closeSharedLinks = () => {
      $(".details-share").removeClass("details-share--visible");
      $(".details__dropdown").removeClass("dn");
    };

    $(".details__overlay").on("click", closeDetailsDropdown);
    $(".details__dropdown_item--share").on("click", openSharedLinks);
    $(".details-share__header").on("click", closeDetailsDropdown);

    //  $unesxq=  $("#share_q").data('unesx')
    var q_url = window.location.href;
    $(".details-share__item--fb").on("click", () => {
      // https://twitter.com/intent/tweet?text=Hello%20world

      FB.ui(
        {
          method: "share",
          display: "popup",
          href: q_url,
          quote: this.question.question
        },
        function(response) {}
      );
    });
    $(".details-share__item--twitter").on("click", () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${
          this.question.question
        }&url=${q_url}`,
        "targetWindow",
        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250"
      );
    });

    $(".details-share__item--linkedin").on("click", () => {
      window.open(
        `http://www.linkedin.com/shareArticle?mini=true&url=${q_url}`,
        "targetWindow",
        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250"
      );
    });

    $(".details-share__item--reddit").on("click", () => {
      window.open(
        ` http://www.reddit.com/submit?title=${
          this.question.question
        }&url=${q_url}`,
        "targetWindow",
        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250"
      );
    });

    $(".details-share__item--link").on("click", () => {
      var input = document.createElement("input");
      input.setAttribute("value", q_url);
      document.body.appendChild(input);
      input.select();
      var result = document.execCommand("copy");
      document.body.removeChild(input);
      return result;
    });
  
  },
  data() {
    return {
      profile_pic: null
    };
  }
};
</script>