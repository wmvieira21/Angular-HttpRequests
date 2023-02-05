import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PostModel } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  arrayPosts: PostModel[] = [];
  isFeatching = false;
  error: string = '';
  errorSub: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    //this.featchPosts();
  }

  onSendPost(formData: PostModel) {
    this.postService.onSendPostService(formData);
    this.postService.errorSub.subscribe((data) => {
      this.isFeatching = false;
      this.error = data
    });
  }

  /*Handling the next e error inthe component*/
  onFeatchingData() {
    this.isFeatching = true;
    this.postService.onFeatchPosts().subscribe({
      next: (data) => {
        this.arrayPosts = data;
        this.isFeatching = false;
      }, error: (erro) => {
        this.isFeatching = false;
        /*When not using catchError in PostService
        this.error = erro.error['error'] + erro.status + erro.name;*/

        this.error = erro;
        console.log(erro);
      }
    })
  }
  onClearPost() {
    this.postService.onClearPost().subscribe(() => this.arrayPosts = []);
  }
}
