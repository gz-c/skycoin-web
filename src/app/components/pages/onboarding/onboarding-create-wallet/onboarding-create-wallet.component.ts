import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DoubleButtonActive} from '../../../layout/double-button/double-button.component';

@Component({
  selector: 'app-onboarding-create-wallet',
  templateUrl: './onboarding-create-wallet.component.html',
  styleUrls: ['./onboarding-create-wallet.component.scss']
})
export class OnboardingCreateWalletComponent implements OnInit {
  showNewForm = true;
  form: FormGroup;
  doubleButtonActive = DoubleButtonActive.LeftButton;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initWalletForm();
  }

  initWalletForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      seed: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      confirmSeed: new FormControl('',
        this.showNewForm ? Validators.compose([Validators.required, Validators.minLength(2)]) : Validators.compose([])
      )
    });
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  changeForm(newState) {
    if (newState === DoubleButtonActive.RightButton) {
      this.showNewForm = false;
    } else {
      this.showNewForm = true;
    }
    this.initWalletForm();
  }

  onValueChanged(data) {

  }

  onSubmit(values) {

  }

}
