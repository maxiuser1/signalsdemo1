import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { BlogPost } from "./blog-post/blog-post.store";

@Injectable({
    providedIn: 'root'
  })
  export class BlogService {
    
    url = "https://rickandmortyapi.com/api/episode"
    constructor(private http: HttpClient) {}

    get(id: string): Promise<any> {
        return firstValueFrom(this.http.get<any>(`${this.url}/${id}`).pipe(map(r => {
          
          const result : any = {
            id:r.id,
            name: r.name,
            comments: r.characters.map((p:any) => {
              return { id: p, text:p}
            })
          }
          return result;
        })));
    }
  }