import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { BlogService } from "../service";

export type BlogComment = {
    id: string,
    text: string;
};

export type BlogPost = {
    id: string,
    name: string,
    comments:Array<BlogComment>
}

type BlogPostState = {
    blogPost: {
        id: string,
    name: string,
    comments: [],
    } | null
}


export const BlogStore = signalStore(
    { providedIn: 'root' },
    withState({ id:"", name: "", comments:[] }),
    withMethods((store, service = inject(BlogService)) => ({
        async get(blogPostId: string): Promise<void> {
            const { id, name, comments} = await service.get(blogPostId);
           
            patchState(store, { id, name, comments });
        },
    }))
);