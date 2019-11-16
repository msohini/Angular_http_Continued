import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient ,HttpHeaders,HttpParams,HttpEventType} from '@angular/common/http';
import { map, retry ,tap} from 'rxjs/operators'
@Injectable({ providedIn: 'root'  })
export class postsService {
  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://ng-angular-guide.firebaseio.com/posts.json',
        postData,
        {
        observe :'response'

        }
      )

      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
  let searchparams=new HttpParams();
  searchparams=searchparams.append('print','pretty');
  searchparams=searchparams.append('custom','hi');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-angular-guide.firebaseio.com/posts.json',
        {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: searchparams
        }
      )
      .pipe(
        map((responsedata: { [key: string]: Post }) => {
          const postarray: Post[] = [];
          for (const key in responsedata) {
            if (responsedata.hasOwnProperty(key)) {
              postarray.push({ ...responsedata[key], id: key })
            }
          }
          return postarray;

        })
      );
      
  }

  deletePost() {
    return this.http.delete('https://ng-angular-guide.firebaseio.com/posts.json',
    {
     observe :'events',
     responseType:'Text'

    }
    ).pipe(
    tap(event=>{
      console.log(event);
      if(event.type===HttpEventType.Response){
        console.log(event.body);
      }
    })
    )

    ;
  }
}
