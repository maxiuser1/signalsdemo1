import { addEntities, entityConfig, removeAllEntities, withEntities } from "@ngrx/signals/entities";
import { BlogComment, BlogPost, BlogStore } from "../blog-post/blog-post.store";
import { patchState, signalStore, type, withHooks, withMethods } from "@ngrx/signals";
import { Signal, inject } from "@angular/core";

const commentsConfig = entityConfig({
    entity: type<BlogComment>(),
    collection: 'comments',
    selectId: (comment) => comment.id
  });

  export const CommentsStore = signalStore(
    withEntities(commentsConfig),
    withMethods((store) => ({
        sync(comments: Signal<never[]>): void {
            console.log('aer', comments());
            patchState(store, removeAllEntities(commentsConfig));
            // patchState(store, addEntities(comments,commentsConfig));
        }  
    })),
    withHooks((store) => {
        const globalStore = inject(BlogStore);
        return {
          onInit() {
            store.sync(globalStore.comments);
          }
        };
    })
);
    