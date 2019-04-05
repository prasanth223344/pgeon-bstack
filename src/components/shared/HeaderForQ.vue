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
          <a href="/">
            <avatar :size="42" :src="profile_pic" :username="question.user_id"></avatar>
          </a>
        </div>
        <div class="question-details__more pointer">
          <!-- changes names -->
          <div class="ellipses fc">
            <img width="22" height="22" src="../../assets/img/svg/ellipsis-v.svg">
          </div>
          <div class="times fc">
            <img width="22" height="22" src="../../assets/img/svg/times.svg">
          </div>
        </div>
      </div>
      <div class="details__dropdown__container mw6 m-auto">
        <ul class="details__dropdown">
          <li
            class="details__dropdown_item details__dropdown_item--share pointer pl15p mt15p mb15p"
          >
            <img width="22" height="22" src="../../assets/img/svg/share-alt.svg">
            
            <span>Share</span>
          </li>

          <li v-if class="details__dropdown_item pointer pl15p mb15p">
            <img width="22" height="22" src="../../assets/img/svg/flag.svg">
            <span id="report_question">Report</span>
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
          <img src="../../assets/img/svg/times.svg">
        </div>
        <div class="details-share__body">
          <div class="details-share__item details-share__item--fb">
            <img wsrc="../../assets/img/svg/facebook.svg">

            <h3>FaceBook</h3>
          </div>
          <div class="details-share__seperator"></div>

          <div class="details-share__item details-share__item--twitter">
            <img src="../../assets/img/svg/twitter.svg">

            <h3>Twitter</h3>
          </div>
          <div class="details-share__seperator"></div>

          <div class="details-share__item details-share__item--linkedin">
            <img src="../../assets/img/svg/linkedin.svg">

            <h3>LinkedIn</h3>
          </div>
          <div class="details-share__seperator"></div>

          <div class="details-share__item details-share__item--reddit">
            <img src="../../assets/img/svg/reddit-square.svg">

            <h3>Reddit</h3>
          </div>
          <div class="details-share__seperator"></div>

          <div class="details-share__item details-share__item--link">
            <img src="../../assets/img/svg/link.svg">

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


export default {
  name: "app",
  components: { Avatar },

  props: ["question"],
            mixins: [BlockstackMixin, NavMixin],


  //async
  async mounted() {

    configure(this.RADIKS_SERVER);

    // const blockstack = this.blockstack;
    //  if (blockstack.isUserSignedIn()) {
    //   this.userData = blockstack.loadUserData()
    //   this.user = new blockstack.Person(this.userData.profile)
    //   this.user.username = this.userData.username
    // }


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
    $("#report_question").click(function() {
      $qid = "";
      //alert('ss')
      $(this).html("Reported");
      $parent = $(this);
      $.post(
        "/reportQ",
        {
          _token: $('meta[name="csrf-token"]').attr("content"),
          qid: $(this).data("qid")
        },
        function() {
          $parent.removeAttr("id");
        }
      );
    });
  },
  data() {
    return {
      profile_pic: null
    };
  }
};
</script>