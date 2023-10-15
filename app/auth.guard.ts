

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable } from 'rxjs';

import { AuthService } from "./services/auth.service" ;
import { Injectable } from "@angular/core"
import { from } from "rxjs"
import { ToastrService } from "ngx-toastr";

@Injectable({

  providedIn: 'root'

})

export class AuthGuard implements CanActivate {
  user:any
  constructor(private authService: AuthService, private router: Router,private toastr:ToastrService) {
   
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable <boolean | UrlTree> | Promise<boolean | UrlTree> | boolean| UrlTree{

      if (this.authService.isloggedin()) {
        if (route.url.length > 0) {
          let menu = route.url[0].path;
          //
          if (menu == 'users' || menu == 'add-course' || menu == 'users-data' ) {
            //
            if (this.authService.getrole() == 'professor') {
              return true;
            } else {
              this.router.navigate(['']);
                this.toastr.warning('غير مصرح بالدخول لهذه الصفحة')
              return false;
            }
            ///
          }else{
            return true;
          }

          //
        } 
        else {
          return true;
        }
      }

      else {
        this.router.navigate(['login']);
        return false;
      }
    }

  }

  

