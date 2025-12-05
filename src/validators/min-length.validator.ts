import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

@Directive({
    selector: "[minLength]",
    providers: [{ provide: NG_VALIDATORS, useExisting: MinLengthDirective, multi: true }]
})
export class MinLengthDirective implements Validator {
    @Input() minLength!: number;

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value || control.value.length >= this.minLength) {
            return null;
        }
        
        return {
            minLength: {
                requiredLength: this.minLength,
                actualLength: control.value.length
            }
        };
    }
}