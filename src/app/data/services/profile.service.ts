import { HttpClient } from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import {map, tap} from "rxjs";
import {Pageble} from "../interfaces/pageble.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)
  baseApiUrl =  'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null)

  getTestAccounts(){
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
       tap(res => this.me.set(res))
      )
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, 3))
      )
  }


// що нижче, то підарас не показав
  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseApiUrl}account/me`,
      profile
    )
  }
}
// більше не видно нічого
