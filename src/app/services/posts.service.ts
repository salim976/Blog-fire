import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/posts.model';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  /* private posts = [
    {
      id: 1,
      title: 'Premier post',
      content: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles,',
      loveIts: 1,
      created_at: new Date()
    } ,
    {

      id: 2,
      title: 'Deuxième post',
      content: 'On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L\'avantage du Lorem Ipsum sur un texte générique comme \'Du texte. Du texte. Du texte.\' est qu\'il possède une distribution de lettres plus ou moins normale,',
      loveIts: 0,
      created_at: new Date()

    } ,
    {

      id: 3,
      title: 'Troisième post',
      content: 'Contrairement à une opinion répandue, le Lorem Ipsum n\'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans.',
      loveIts: -1,
      created_at: new Date()
    }

  ]*/

  postsSubject = new Subject<Post[]>();

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
      firebase.database().ref('/posts')
        .on('value', (data: Datasnapshot) => {
            this.posts = data.val() ? data.val() : [];
            this.emitPosts();
          }
        );
    }

    constructor() {
        this.getPosts();
    }

    createNewPosts(newPost: Post){
        this.posts.push(newPost);
        this.savePosts();
        this.emitPosts();
    }

  addLoveIts(i: number){
    this.posts[i].loveIts = this.posts[i].loveIts + 1;
    //console.log(this.posts[i].loveIts);
    this.savePosts();
    this.emitPosts();

  }
  dellLoveIts(i: number){
    this.posts[i].loveIts = this.posts[i].loveIts - 1;
    //console.log(this.posts[i].loveIts);

  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }


}
