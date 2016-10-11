import { Component } from '@angular/core';
import { Router } from '@angular/router'; //ROUTER_DIRECTIVES, RouterModule 
import {
    // FORM_DIRECTIVES,
    // REACTIVE_FORM_DIRECTIVES,
    //FormsModule,
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';
import { AccountService } from '../../shared/account.service';
import { Observable } from 'rxjs/Observable';

@Component({
    //imports: [FormsModule, RouterModule],
    template: require("./register.component.html")
})
export class RegisterComponent {
    public registerForm: FormGroup;
    public elements: { [name: string]: AbstractControl } = {};
    private loadingState: boolean = false;
    private errorMessage: string = "";

    constructor(private accountService: AccountService, fb: FormBuilder, private router: Router) {
        //const emailRegex = '^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)' +
        //    '*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?'; 
        const emailRegex = '[a-z0-9]+@[a-z]+\.[a-z]+';

        this.registerForm = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            'password': ['', Validators.required],
            'confirmPassword': ['', Validators.required]
        },
            { validator: this.passwordMatch('password', 'confirmPassword') }
        );

        this.elements['email'] = this.registerForm.controls['email'];
        this.elements['password'] = this.registerForm.controls['password'];
        this.elements['confirmPassword'] = this.registerForm.controls["confirmPassword"];
    }

    RegisterUser(form: any): void {
        console.log('you submitted value:', form);
        if (!this.registerForm.valid) {
            console.log('Invalid!');
            this.errorMessage = "Some errors detected in form";
        }
        else {
            this.errorMessage = "";
            this.loadingState = true;
            this.accountService.registerAccount(form.email, form.password, form.confirmPassword)
                .catch((err, caught) => {
                    this.errorMessage = "Registration failed";
                    this.loadingState = false;
                    return Observable.throw(err);
                })
                .do(x => this.loadingState = false)
                .do(x => this.router.navigate(['./account/login']))
                .subscribe(x => {
                    //you can do something with returned data
                });
        }
    }

    passwordMatch(passwordElement: string, confirmPasswordElement: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordElement];
            let confirmPassword = group.controls[confirmPasswordElement];

            if (password.value !== confirmPassword.value) {
                return {
                    passwordsMismatch: true
                };
            }
        }
    };
}