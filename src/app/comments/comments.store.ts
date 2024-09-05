import {
  addEntities,
  entityConfig,
  removeAllEntities,
  setAllEntities,
  setEntities,
  withEntities
} from "@ngrx/signals/entities";
import {BlogComment, BlogPost, BlogStore} from "../blog-post/blog-post.store";
import {patchState, signalStore, type, withHooks, withMethods} from "@ngrx/signals";
import {Signal, inject} from "@angular/core";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, tap} from "rxjs";

const commentsConfig = entityConfig({
  entity: type<BlogComment>(),
  collection: 'comments',
  selectId: (comment) => comment.id
});

export const CommentsStore = signalStore(
    withEntities(commentsConfig),
    withMethods((store) => ({
      sync: rxMethod<BlogComment[]>(pipe(tap(value => console.log('aer', value)), tap(comments => patchState(store, setAllEntities(comments, commentsConfig)))))
    })),
    withHooks((store) => {
      const globalStore = inject(BlogStore);
      return {
        onInit() {
          store.sync(globalStore.comments);
        }
      };
    })
  )
;
