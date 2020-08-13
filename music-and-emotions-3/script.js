var app = new Vue({
  el: "#app",
  data: {
    playing1: false,
    audio1: "",
    emojis: "🙂",

    img:
      "https://blog.joytunes.com/blog/wp-content/uploads/2016/01/Music-and-Emotions.jpg",
    character: {
      name: "",
      age: 0,
      gender: "",
      happiness: 0,
      calmness: 0,
      loneliness: 0,
      anxiety: 0
    },
    info: {
      name: "",
      age: 0,
      gender: "",
      happiness: 0,
      calmness: 0,
      loneliness: 0,
      anxiety: 0
    },
    songs: [
      {
        audio: "https://assets.codepen.io/4545604/Fly+me+to+the+moon+-+Frank+Sinatra.mp3",
        name: "Fly Me to the Moon",
        singer: "Frank Sinatra",
        comment: '"The first music played on the moon." - Quincy Jones',
        type: "happy"
      },
      {
        audio: "https://assets.codepen.io/4545604/Green+Day+-+Troubled+Times+%28Official%29+%281%29.mp3",
        name: "Troubled Times",
        singer: "Green Day",
        comment:'"I do not know if I want this on the albulm. It is really heavy to write about." - Green Day',
        type: "anxiety"
      },
      {
        audio: "https://assets.codepen.io/4545604/Marconi+Union+-+Weightless+%281%29.mp3",
        name: "Weightless",
        singer: "Marconi Union",
        comment: '"An excellent compilation from the always interesting Just Music" -The Sunday Times',
        type: "calm"
      },
      {
        audio: "https://assets.codepen.io/4545604/Black.mp3",
        name: "Black",
        singer: "Pearl Jam",
        comment: '"The song is about letting go" -Eddie Vedder',
        type: "lonely"
      }
    ]
  },
  computed: {},
  methods: {
    emoji() {
      if (this.info.happiness >= 15) {
        this.emojis = "🤩";
      } else if (this.info.calmness >= 15) {
        this.emojis = "😌";
      } else if (this.info.happiness > 10) {
        this.emojis = "😄";
      } else if (this.info.loneliness > 15) {
        this.emojis = "😢";
      } else if (this.info.anxiety > 15) {
        this.emojis = "😡";
      } else {
        this.emojis = "🙂";
      }
    },
    update() {
      this.info.name = this.character.name;
      this.info.age = this.character.age;
      this.info.gender = this.character.gender;
      this.info.happiness = this.character.happiness;
      this.info.calmness = this.character.calmness;
      this.info.loneliness = this.character.loneliness;
      this.info.anxiety = this.character.anxiety;
      var statement1 = "";
      if (this.info.happiness <= 5) {
        alert("Your character is sad, pick a song to make him/her happier");
      }
      if (this.info.calmness <= 5) {
        alert("Your character is upset, pick a song to make him/her calm down");
      }
      if (this.info.loneliness <= 5) {
        alert(
          "Your character feels lonely, pick a song to stimulate his/her mood"
        );
      }
      if (this.info.anxiety <= 5) {
        alert("Your character is anxious, pick a song to comfort him/her");
      }
    },
    emotion(type) {
      if (type === "happy") {
        this.info.happiness += 5;
        this.info.loneliness -= 3;
      } else if (type === "calm") {
        this.info.calmness += 5;
        this.info.anxiety -= 3;
      } else if (type === "lonely") {
        this.info.loneliness += 5;
        this.info.happiness -= 3;
      } else {
        this.info.anxiety += 5;
        this.info.calmness -= 3;
      }
    },
    clear(type) {
      if (type === "happy") {
        this.info.happiness -= 5;
        this.info.loneliness += 3;
      } else if (type === "calm") {
        this.info.calmness -= 5;
        this.info.anxiety += 3;
      } else if (type === "lonely") {
        this.info.loneliness -= 5;
        this.info.happiness += 3;
      } else {
        this.info.anxiety -= 5;
        this.info.calmness += 3;
      }
    },
    play(audio) {
      
        this.audio1 = new Audio(audio);
        this.audio1.play();
       
     
    },
    stop(audio) {
        this.audio1.pause();
    }
  }
});

Vue.component("music", {
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    update() {
      this.$emit("type-check", this.item.type);
    },
    remove() {
      this.$emit("delete", this.item.type);
    },
    start() {
      this.$emit("play-songs", this.item.audio)
    },
    pause() {
      this.$emit("pause-songs", this.item.audio)
    }
  },
  template: `<div class="piece">
<p>Name: {{item.name}}</p>
<p>Singer: {{item.singer}}</p>
<p>Comments: <p class="font">{{item.comment}}</p></p>
<button class="btn btn-outline-warning" type="button" @click="start">play</button>
<button class="btn btn-outline-warning" type="button" @click="pause">pause</button>
<button class="btn btn-outline-warning" type="button" @click="update">select</button>
<button class="btn btn-outline-warning" type="button" @click="remove">remove</button>
</div>`
});