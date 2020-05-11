import { Injectable } from '@angular/core';

import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, exhaustMap,  mergeMap, catchError, delay } from 'rxjs/operators';

import { UploadService } from '../component/media.service';
import * as mediaActions from '../actions/media.actions';
import { Media } from '../component/media.model';
@Injectable()
export class MediaEffect {
  constructor(
    private actions$: Actions,
    private uploadMediaService: UploadService
  ) { }

  loadMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mediaActions.loadMedia),
      delay(150),
      map(action => action),
      exhaustMap(_ =>
        this.uploadMediaService.getMedia().pipe(
          map( mediasData =>  new mediaActions.LoadMediaSuccess({ medias: mediasData.response.rows })
          ),
          catchError(error => of(mediaActions.loadMediaFailed({ error })))
        )
      )
    )
  );


  @Effect()
  loadMediaByNumber$: Observable<any> = this.actions$.pipe(
    ofType<mediaActions.LoadMediaByNumber>(
      mediaActions.MediaActionTypes.LOAD_MEDIA_BY_NUMBER
    ),
    mergeMap((action: mediaActions.LoadMediaByNumber) =>
      this.uploadMediaService.getMediaByMediaNo(action.payload).pipe(
        map(
          (media: Media[]) =>
            new mediaActions.LoadMediaByNumberSuccess(media)
        ),
        catchError(err => of(new mediaActions.LoadMediaFail(err)))
      )
    )
  );

  @Effect()
  createMedia$: Observable<any> = this.actions$.pipe(
    ofType<mediaActions.CreateMedia>(
      mediaActions.MediaActionTypes.CREATE_MEDIA
    ),
    map((action: mediaActions.CreateMedia) => action.payload),
    mergeMap((customer: Media) =>
      this.uploadMediaService.createMedia(customer).pipe(
        map(
          (newMedia: Media) =>
            new mediaActions.CreateMediaSuccess(newMedia)
        ),
        catchError(err => of(new mediaActions.CreateMediaFail(err)))
      )
    )
  );

  @Effect()
  updateMedia$: Observable<any> = this.actions$.pipe(
    ofType<mediaActions.UpdateMedia>(
      mediaActions.MediaActionTypes.UPDATE_MEDIA
    ),
    map((action: mediaActions.UpdateMedia) => action.payload),
    mergeMap((media: Media) =>
      this.uploadMediaService.updateMedia(media).pipe(
        map(
          (updateMedia: Media) =>
            new mediaActions.UpdateMediaSuccess({
              id: updateMedia.id,
              changes: updateMedia
            })
        ),
        catchError(err => of(new mediaActions.UpdateMediaFail(err)))
      )
    )
  );

  @Effect()
  deleteMedia$: Observable<any> = this.actions$.pipe(
    ofType<mediaActions.DeleteMedia>(
      mediaActions.MediaActionTypes.DELETE_MEDIA
    ),
    map((action: mediaActions.DeleteMedia) => action.payload),
    mergeMap((id: number) =>
      this.uploadMediaService.deleteMedia(id).pipe(
        map(() => new mediaActions.DeleteMediaSuccess(id)),
        catchError(err => of(new mediaActions.DeleteMediaFail(err)))
      )
    )
  );
}
