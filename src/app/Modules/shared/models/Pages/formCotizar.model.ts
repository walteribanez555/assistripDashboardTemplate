import { cotizacionDataForm } from "./cotizacionDataForm.model";

export interface FormCotizarModel{
    initialDate: string;
    finalDate: string;
    tags: string[];
    origen: string;
    listCotizaciones : cotizacionDataForm[];
    email: string;
    telefono?: string;

}
