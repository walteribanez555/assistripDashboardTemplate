import { FormControl } from "@angular/forms";
import { typePolicie } from "src/app/Landing-Page/Pages/datos-polizas/datos-polizas.component";

export function dateValidator(type: typePolicie, finalDate: string) {
  return (control: FormControl) => {
    const fechaReferencia: Date = new Date(finalDate);
    const fechaInput: Date = new Date(control.value);
    const currentDate = new Date();

    if (fechaInput > currentDate) {
      return { 'futureDate': true }; // Return error if the date is greater than the current date
    }

    switch (type) {
      case typePolicie.menores:
        if (fechaInput >= fechaReferencia) {
          return null; // The date is valid
        } else {
          return { 'dateGreater': true }; // The date is less than the reference
        }

      case typePolicie.mayores:
        if (fechaInput <= fechaReferencia) {
          return null; // The date is valid
        } else {
          return { 'dateLessThan': true }; // The date is greater than the reference
        }

      default:
        return null; // Return null for other cases (optional)
    }
  };
}
