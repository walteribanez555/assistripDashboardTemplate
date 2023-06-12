import { Plan } from "../Data/Plan";



export interface tipoBeneficio {
    id_catalogo: number;
    descripcion: string;
    listadoBeneficios : Plan[];
}