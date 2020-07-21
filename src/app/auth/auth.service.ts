import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { resetStores } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<firebase.User>;
  private uid: string;
  redirectUrl = '/';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.autoLogin();

    afAuth.user.subscribe(user => {
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        this.userSubject.next(user);

        if (!this.uid) {
          this.uid = user.uid;
          this.router.navigateByUrl(this.redirectUrl);
          this.redirectUrl = '/';
        }
      } else {
        this.userSubject.next(null);
        this.uid = null;
      }
    });
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData'));

    this.uid = user?.uid;

    this.userSubject = new BehaviorSubject<firebase.User>(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  signinWithGoogle() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut().then(() => {
      resetStores();
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  get userId() {
    return this.uid;
  }
}
