import { Component,Input, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/posts.model';


@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() postLoveIts: number;
  @Input() postCreated_at: Date;
  @Input() index: number;
  @Input() id: number;

  posts: Post[];


  constructor(private postsService: PostsService) { }

  ngOnInit() {

  }


  onLoveIts(){
    this.postsService.addLoveIts(this.index);
    this.postsService.savePosts();

  }
  onDontLoveIts(){
    this.postsService.dellLoveIts(this.index);
    this.postsService.savePosts();
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
  }


}
