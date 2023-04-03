import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

export const enum EventType {
  SearchOptionSelected = 'SEARCH_OPTION_SELECTED',
  AddPostButtonSubmit = 'ADD_POST_BUTTON_SUBMIT',
  OpenLoginModal = 'OPEN_LOGIN_MODAL',
  OpenSupportModal = 'OPEN_SUPPORT_MODAL',
  SavedSearchInit = 'SAVED_SEARCH_INIT',
  DeleteCollection = 'DELETE_COLLECTION',
  UpdateCollection = 'UPDATE_COLLECTION',
  IsSettingsInnerPage = 'IS_SETTINGS_INNER_PAGE',
  ShowOnboarding = 'SHOW_ONBOARDING',
  FinishOnboarding = 'FINISH_ONBOARDING',
  FeedPostsLoaded = 'FEED_POSTS_LOADED',
}

export interface BusEvent<T = any> {
  type: EventType;
  payload: T;
}

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private _eventSubject = new Subject<BusEvent>();

  public on<T = any>(type: EventType): Observable<T> {
    return this._eventSubject.pipe(
      filter((event) => event.type === type),
      map((event) => event.payload),
    );
  }

  public next(event: BusEvent): void {
    this._eventSubject.next(event);
  }
}
