import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  form: FormGroup;
  showPassword: boolean;

  constructor(private fb: FormBuilder,) {
    this.form = this.fb.group({
			password: ['', [Validators.required]],
			confirmPassword: ['', [Validators.required]],
		}, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true };
  }

  ngOnInit(): void {

  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // Handle form submission
  }

}
