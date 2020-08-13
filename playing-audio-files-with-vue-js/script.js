var app = new Vue({
  el: "#app",
  data: {
    response: [
      "Mozart",
      "Transition from Classical to Romantic style",
      "19th century"
    ],
    firstQuiz: "",
    secondQuiz: "",
    thirdQuiz: "",
    audioURL: [
      "https://feiwangart.files.wordpress.com/2020/07/aefbc8flefbc8fl-e5b08fe6989fe6989fe5a489e5a58fe69bb2-k.265efbc88e7bfbbe887aa-e9838ee69c97efbc89.mp3",
      "https://feiwangart.files.wordpress.com/2020/07/ludwig-van-beethoven-moonlight-sonata.mp3",
      "https://feiwangart.files.wordpress.com/2020/07/e7bea4e6989f-e88296e982a6e59c86e8889ee69bb2.mp3"
    ],
    score: 0,
    playing1: false,
    playing2: false,
    playing3: false,
    audio1: "",
    audio2: "",
    audio3: ""
  },
  computed: {},
  methods: {
    playMusic() {},
    playMusic1(sound) {
      if (this.audio2) {
        this.audio2.pause();
      }
      if (this.audio3) {
        this.audio3.pause();
      }

      if (sound && !this.playing1) {
        this.audio1 = new Audio(sound);
        this.audio1.play();
        this.playing1 = true;
      } else {
        this.audio1.pause();
        this.playing1 = false;
      }
    },
    playMusic2(sound) {
      if (this.audio1) {
        this.audio1.pause();
      }
      if (this.audio3) {
        this.audio3.pause();
      }

      if (sound && !this.playing2) {
        this.audio2 = new Audio(sound);
        this.audio2.play();
        this.playing2 = true;
      } else {
        this.audio2.pause();
        this.playing2 = false;
      }
    },
    playMusic3(sound) {
      if (this.audio2) {
        this.audio2.pause();
      }
      if (this.audio1) {
        this.audio1.pause();
      }

      if (sound && !this.playing3) {
        this.audio3 = new Audio(sound);
        this.audio3.play();
        this.playing3 = true;
      } else {
        this.audio3.pause();
        this.playing3 = false;
      }
    },
    calculation() {
      if (this.firstQuiz === this.response[0]) {
        this.score = 20;
      } else if (this.firstQuiz != "") {
        this.score = 10;
      } else {
        this.score = 0;
      }

      if (this.secondQuiz === this.response[1]) {
        this.score += 20;
      } else if (this.secondQuiz != "") {
        this.score -= 10;
      } else {
        this.score += 0;
      }

      if (this.thirdQuiz === this.response[2]) {
        this.score += 20;
      } else if (this.thirdQuiz != "") {
        this.score -= 10;
      } else {
        this.score += 0;
      }
      if (this.score < 0) {
        this.score = 0;
      }
    },
    clear() {
      (this.firstQuiz = ""),
        (this.secondQuiz = ""),
        (this.thirdQuiz = ""),
        (this.score = 0);
    }
  }
});