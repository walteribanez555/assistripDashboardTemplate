// "beneficiario_id": 2,
//         "poliza_id": 1,
//         "primer_apellido": "Lopez",
//         "segundo_apellido": "Perez",
//         "primer_nombre": "Carlos",
//         "segundo_nombre": "0",
//         "ci": "1234567",
//         "pasaporte": "1234567",
//         "fecha_nacimiento": "1980-01-20T00:00:00.000Z",
//         "edad": 43,
//         "sexo": 1,
//         "origen": "Bolivia",
//         "email": "carlos@gmail.com",
//         "telefono": "34343456"


// {
//     "poliza_id": 1,
//     "primer_apellido": "Lopez",
//     "segundo_apellido": "Perez",
//     "primer_nombre": "Carlos",
//     "segundo_nombre": "",
//     "ci": "1234567",
//     "pasaporte": "1234567",
//     "fecha_nacimiento": "1980-01-20",
//     "sexo": 1,
//     "origen": "Bolivia",
//     "email": "carlosœgmail.com",
//     "telefono": "34343456"
//   }
export interface Beneficiario {
    beneficiario_id  : number,
    poliza_id : number,
    primer_apellido : string,
    segundo_apellido : string,
    primer_nombre : string,
    segundo_nombre : string,
    nro_identificacion : string,
    fecha_nacimiento : string,
    edad: number,
    sexo : number,
    origen : string,
    email : string,
    telefono : string

}


export interface BeneficiarioResp extends Omit<Beneficiario, 'beneficiario_id'>{
    id : number;

}
