import { Component, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate
{
    constructor(public router: Router) {}

    canActivate(): boolean 
    {
        if (localStorage.getItem('user') == null)
        {
            this.router.navigateByUrl('/Login');
            return false;
        }
        return true;
    }
}