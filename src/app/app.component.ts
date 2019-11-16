import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { postsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error=null;
  constructor(private http: HttpClient, private postService: postsService) { }

  ngOnInit() {
    //this.fetchposts();
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
      //console.log(posts[0].content);
    },
    error=>{
    this.isFetching = false;
    this.error=error.message;
    }

    );

  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    //this.fetchposts();
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
      //console.log(posts[0].content);
    },
    error=>{
    this.isFetching = false;
    this.error=error.message;
    }
    );
  }
  OnhandleError(){
    this.error=null;
   
  }
  onClearPosts() {
    // Send Http request

    this.postService.deletePost().subscribe(() => {
      this.loadedPosts = [];

    })
  }
  private fetchposts() {
  
   
  }


}
