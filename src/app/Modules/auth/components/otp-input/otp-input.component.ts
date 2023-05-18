import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-otp-input',
  styles: [`
    input {
        width: 3rem;
        height: 3rem;
        margin: 0 1rem;
        font-size: 2rem;
        border-radius: 4px;
        border: 1px solid var(--main-color);
        color: var(--main-color);
        text-align: center;
    }

    @media screen and (max-width: 768px) {
        input {
            width: 2.5rem;
            height: 3rem;
            margin: 0 0.1rem;
            font-size: 3rem;
        }

    }
    `],
    template: `
    <input #inputRef [type]="type ? 'text' : 'password' " maxlength="1" (input)="onInput($event)" (keydown)="onKeyDown($event)">
    `,
})
export class OtpInputComponent {
  @Output() otpEntered : EventEmitter<string> = new EventEmitter<string>();
  @Output() otpBack    : EventEmitter<string> = new EventEmitter<string>();
  @Input () type       : boolean = true;
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  onInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const otpDigit = input.value;
    if (otpDigit.length === 1) {
      this.otpEntered.emit(otpDigit);
      this.focusNextInput();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
        const input = event.target as HTMLInputElement;
        const otpDigit = input.value;
        if (otpDigit.length >0){
         this.otpBack.emit(otpDigit);

        }
      const inputElement = this.inputRef.nativeElement;
      const previousInput = inputElement.previousElementSibling as HTMLInputElement;
      if (previousInput) {


        previousInput.focus();
      }
    }
  }

  focusNextInput(): void {
    const inputElement = this.inputRef.nativeElement;
    const nextInput = inputElement.nextElementSibling as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }
}

