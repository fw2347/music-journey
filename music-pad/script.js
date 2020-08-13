let db = firebase.firestore();
let todoRef = db.collection('music');
let commentRef = db.collection('comment');

Vue.component('music', {
  props: {
      music: {
          type: Object
      }
  },
  template:`<button v-bind:class="{ on: isPlaying}" class="dot dotwhite"  @click="isPlaying ? pause() : play()" >{{isPlaying?'⬜️' : '🎶'}}</button>`,
  data() {
    return this.music
  },
  
  methods: {
    play () {
      this.isPlaying = true;
      console.log(typeof(this.file))
      if (typeof(this.file) === "string") {
        this.file = new Audio(this.file)
      }
      this.file.play();
   },
    
    pause () {
      this.isPlaying = false;
      this.file.pause();
    }
  }
});

Vue.component('comment', {
  props: ["comment"],
   data() {
    this.comment.replyString = ""
    return this.comment
  },
  template: `
    <div class="comment">
      <p class="usernameNew">📩 {{ comment.username }}:</p>
      <p class="commentNew">{{ comment.posts }}</p>
      <hr>
      <button class="btn btn-info" @click="likeComment"><span v-if="comment.like > 0">({{ comment.like }}) </span>👍Like</button>
     
      <button class="btn btn-danger" @click="deleteComment">❕Delete</button>
      <p/>
      <textarea class="comment__answers" type="text" placeholder="Reply to this comment anonymously" v-model="comment.replyString"></textarea>
      <br>
      <button class="btn btn-comment" @click="commentReply">Reply</button>
      <hr>
      <div class="reply container" v-for="reply in comment.reply">{{ reply }}</div>
    </div>
  `,
  methods: {
    likeComment() {
      this.$emit('like-comment', this.comment)
    },
    deleteComment() {
      this.$emit('delete-comment', this.comment.id)
    },
    commentReply() {
      this.$emit('comment-reply', this.comment, this.comment.replyString)
      console.log(this.comment)
    }
  }
});

// var app = new Vue({
//     el: '#app',
//     data: {
//     products:[],
//       comments: [],
//     user: "",
//     response:"",
//     comment:"",
//     newComment: ""
//     },
//     methods: {
//     likeComment() {
//       this.$emit('like-comment', this.comment)
//     },
//     deleteComment() {
//       this.$emit('delete-comment', this.comment.id)
//     },
//     commentReply() {
//       this.$emit('comment-reply', this.comment.id)
//       console.log("cc")
//     }
//   }
// });

let app = new Vue({
  el: "#app",
  data: {
    musics:[],
    comments: [],
    user: "",
    // response:"",
    comment:"",
    newComment: ""
  },
  methods: {
    readComments() {
      commentRef.get().then(snapshot => {
        var comments = [];
        snapshot.forEach(doc => {
          comments.push(doc.data());
        });
        this.comments = comments;
      })
    },
    addComment() {
      let id = commentRef.doc().id
      commentRef.doc(id).set({
        id: id,
        username: this.user,
        posts: this.newComment,
        like: 0,
        reply: []
      });
      
      this.user = ""
      this.newComment = ""
      this.readComments();
    },
    likeComment(comment) {
      comment.like += 1
      commentRef.doc(comment.id).update({
        like: comment.like
      });
      this.readComments();
    },
    deleteComment(id) {
      commentRef.doc(id).delete();
      this.readComments();
    },
    commentReply(comment, reply) {
      comment.reply.push(reply)
      commentRef.doc(comment.id).update({
        reply: comment.reply
      })
    }

  },
  mounted() {
    
    db.collection('music').onSnapshot(querySnapshot => {
      var todo = [];
      querySnapshot.forEach(doc => {
        todo.push(doc.data());
      })
      this.musics = todo;
      // console.log("this.products: ", this.products)
    });
     this.readComments();
  }
  
})