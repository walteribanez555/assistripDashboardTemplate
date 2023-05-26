import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { ClientePost } from 'src/app/Modules/shared/models/Data/Cliente';
import { Cupon, CuponAplicado } from 'src/app/Modules/shared/models/Data/Cupon';
import { Precio } from 'src/app/Modules/shared/models/Data/Precio';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { cotizacionDataForm } from 'src/app/Modules/shared/models/Pages/cotizacionDataForm.model';
import { ExtraForm } from 'src/app/Modules/shared/models/Pages/extra.model';
import { FormCotizarModel } from 'src/app/Modules/shared/models/Pages/formCotizar.model';
import { cotizacionIntefaceService } from 'src/app/Modules/shared/services/interfaces/cotizacioninterface.service';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { ExtrasPolizasService } from 'src/app/Modules/shared/services/requests/beneficiosExtras.service';
import { ClientesService } from 'src/app/Modules/shared/services/requests/clientes.service';
import { CuponesService } from 'src/app/Modules/shared/services/requests/cupones.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { PreciosService } from 'src/app/Modules/shared/services/requests/precios.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-datos-polizas',
  templateUrl: './datos-polizas.component.html',
  styleUrls: ['./datos-polizas.component.css'],
  animations: [
    loadingAnimation,
    

  ]
})

export class DatosPolizasComponent implements OnInit {

  datosCotizacion : FormCotizarModel = {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',
  };
  datosCotizacionMenores : cotizacionDataForm[] = [];
  datosCotizacionMayores : cotizacionDataForm[] = [];
  servicioMenores : Servicio | null = null;
  servicioMayores : Servicio | null = null;
  precios : Precio[]= [];
  total = 0;
  totalBruto = 0 ;

  totalEnteros = 0;
  totalDecimales : any;

  listPolizas : any[] = [];

  costoMenores = 0;
  costoMayores = 0;


  precioMayores = { 
    precio : 0,
    precioTotal : 0,
    cantidadPolizas : 0,
    servicio : this.servicioMayores
  }

  precioMenores = {
    precio : 0,
    precioTotal : 0,
    cantidadPolizas : 0,
    servicio: this.servicioMenores
  }

  



  public itemHeight = 150;
  private startY = 0;
  private startHeight = 0;
  public maxHeightReached = false;
  public maxHeight = 300;
  public minHeight = 150;
  public minHeightReached = true;
  nextId : number = 0;
  diffDays = -1;

  listCupones : Cupon[] = [];

  btn_pagar = false;
  stateBottom : 1| 2 | 3 = 1;

  listExtras : ExtraForm[]= [];
  dataExtra : any[] = [];



  listDescuentos : CuponAplicado[] =[] ;

  fechaLimite : string = "";


  hasLoaded = true;
  



  constructor(
    private dataService: cotizacionIntefaceService,
    private preciosService : PreciosService,
    private cuponesService : CuponesService,
    private clientesService : ClientesService,
    private ventasService : VentasService,
    private polizasService : PolizasService,
    private beneficiarioService : BeneficiariosService,
    private polizasPlusService : ExtrasPolizasService,
    private router : Router
  ){

    


  }


  ngOnInit(): void {
    this.datosCotizacion  = this.dataService.sharedData;
    this.datosCotizacionMenores = this.dataService.cotizacionMenores;
    this.datosCotizacionMayores = this.dataService.cotizacionMayores;
    this.servicioMenores  = this.dataService.servicioMenores;
    this.servicioMayores = this.dataService.servicioMayores;
    this.listExtras = this.dataService.listExtras;


    this.comparar(this.datosCotizacion.initialDate,this.datosCotizacion.finalDate);


    this.hasLoaded = false;


    


    //Las polizas limitamos a las edades de 75 años

    const fecha = new Date(this.datosCotizacion.finalDate); // fecha del viaje
    const anosARestar = 75;

    const nuevaFecha = new Date(
      fecha.getFullYear() - anosARestar,
      fecha.getMonth(),
      Math.min(fecha.getDate(), new Date(fecha.getFullYear() - anosARestar, fecha.getMonth() + 1, 0).getDate())
    );


    nuevaFecha.setDate(fecha.getDate() + 2);

    this.fechaLimite = nuevaFecha.toISOString().split('T')[0];


    this.datosCotizacionMayores.forEach(element => {
      this.listPolizas.push(
        {
          form : this.createItemForm(),
          isOpen : false,
          servicio : this.servicioMayores,
          type: 2,
        }
      )
      
    });

    this.datosCotizacionMenores.forEach(element => {
        this.listPolizas.push(
          {
            form : this.createItemForm(),
            isOpen : false,
            servicio : this.servicioMenores,
            type: 1,
          }
        )  
    });


    this.preciosService.getPrecios().pipe(
      switchMap(data => {
        this.precios = data;
        this.obtenerCostoPoliza();
        return this.cuponesService.getCupones();
      })

    ).subscribe(
      data => {
        this.hasLoaded = true;
        this.listCupones = data.filter(cupon => cupon.status===1);
        console.log(this.listCupones);
        this.precioMayores={
          precio : this.costoMayores,
          precioTotal : this.costoMayores * this.datosCotizacionMayores.length,
          cantidadPolizas : this.datosCotizacionMayores.length,
          servicio : this.servicioMayores,
        }

        this.precioMenores = {
          precio : this.costoMenores,
          precioTotal : this.costoMenores * this.datosCotizacionMenores.length,
          cantidadPolizas : this.datosCotizacionMenores.length,
          servicio: this.servicioMenores
        }


        this.realizarDescuentos();

        this.dataExtra = this.listExtras.map(
          extra => {
            return{
              extra : extra.extra,
              cantidad: this.datosCotizacionMayores.length+ this.datosCotizacionMenores.length,
              costo : extra.extra.complemento ? parseFloat(extra.extra.complemento ) :  0,
              costoTotal : extra.extra.complemento ? (parseFloat(extra.extra.complemento)* this.diffDays * (this.datosCotizacionMayores.length + this.datosCotizacionMenores.length)): 0,

            }
          }
        )

        this.totalBruto = this.precioMayores.precioTotal + this.precioMenores.precioTotal  +this.dataExtra.reduce((a,b)=> a+b.costoTotal,0);
        this.total = this.totalBruto  - this.listDescuentos.reduce((a,b) => a + b.montoTotal,0);

        
         const { parteEntera, parteDecimal}   =this.dividirTotal(this.total)

         this.totalEnteros = parteEntera,
         this.totalDecimales = parteDecimal



        
        
      }
    )

    

    




    


  }



  createItemForm(  ): FormGroup {
    return new FormGroup({
      nombres: new FormControl('',Validators.required),
      apellidos: new FormControl('',Validators.required),
      age: new FormControl('',Validators.required),
      ci : new FormControl('', Validators.required),
      passport: new FormControl('',Validators.required),
      email : new FormControl('',Validators.required),
      telf : new FormControl('',Validators.required),
      origen: new FormControl('',Validators.required),
      titular : new FormControl(false,Validators.required),
      gender : new FormControl('', Validators.required)
    });
  }


  expand(){
    if(this.minHeightReached){
      
      this.itemHeight = this.maxHeight;
    }
    else{
      this.itemHeight = this.minHeight;
      
    }
    this.minHeightReached = !this.minHeightReached;

    

  }
  reducir(){
   this.itemHeight = this.minHeight;
   this.minHeightReached= true;
  }

  salir(){
    this.router.navigate(['/home']);
  }

  
  onTouchStart(event: TouchEvent) {
    // Record the initial touch position and height of the element
    this.startY = event.touches[0].clientY;
    this.startHeight = this.itemHeight;
  }

  
  onTouchMove(event: TouchEvent) {
    this.minHeightReached = false;
    // Calculate the distance between the initial touch position and the current touch position
    const deltaY = event.touches[0].clientY - this.startY;

    // Calculate the new height of the element based on the distance and direction of the drag
    let newHeight = this.startHeight - deltaY;
    newHeight = Math.max(this.minHeight, Math.min(newHeight, this.maxHeight));


    // Update the height of the element
    this.itemHeight = newHeight;
    this.maxHeightReached = newHeight === this.maxHeight;
    this.minHeightReached = newHeight === this.minHeight;
  }


  onTouchEnd(event: TouchEvent) {
    // Clear the initial touch position and height of the element
    this.startY = 0;
    this.startHeight = 0;
  }

  siguiente(){
   
   
  }


  openForm(  poliza : any ){

    poliza.isOpen = !poliza.isOpen;
    
  }


  comprobarDatos(){
    const polizas  = this.listPolizas.filter(poliza => poliza.form.value.titular);

    if(polizas.length!==1){
      return;
    }


   
    Swal.fire({
      
      text: 'Espere un momento mientras se procesa la informacion',
      imageUrl: 'https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif',
      
      showConfirmButton : false,
      allowOutsideClick: false,
      
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })


    
    
      

    this.clientesService
  .getClienteById(polizas[0].form.value.ci)
  .pipe(
    switchMap((data) => {
      let cliente_id: number = 0;
      if (data.length > 0) {
        cliente_id = data[0].cliente_id;
        return this.ventasService.postVenta(
          cliente_id,
          this.listPolizas.length,
          this.listDescuentos.reduce((a, b) => a + b.montoTotal, 0),
          this.datosCotizacion.initialDate,
          this.datosCotizacion.finalDate,
          this.total
        );
      } else {
        const nuevoCliente: ClientePost = {
          apellido: polizas[0].form.value.apellidos,
          nombre: polizas[0].form.value.nombres,
          nit_ci: polizas[0].form.value.ci,
          origen: polizas[0].form.value.origen,
          email: polizas[0].form.value.email,
          nro_contacto: polizas[0].form.value.telf,
        };
        // Use `switchMap` to chain the `postCliente` Observable to the `postVenta` Observable
        return this.clientesService.postCliente(nuevoCliente).pipe(
          switchMap((data) => {
            cliente_id = data.id;

            this.dataService.titular = data;
            return this.ventasService.postVenta(
              cliente_id,
              this.listPolizas.length,
              this.listDescuentos.reduce((a, b) => a + b.montoTotal, 0),
              this.datosCotizacion.initialDate,
              this.datosCotizacion.finalDate,
              this.total
            );
          })
        );
      }
    }),
    switchMap((data)=> { 
      const venta_id = data.id;
      const requests : any[]= [];


      const listMenoresPolizas : any[] = this.listPolizas.filter(poliza => poliza.type===1);
      const listMayoresPolizas : any[] = this.listPolizas.filter(poliza => poliza.type===2);

      if(listMenoresPolizas.length>0){
        requests.push({ listPolizas : listMenoresPolizas, servicio : this.servicioMenores?.servicio_id});
      }
      if(listMayoresPolizas.length>0){
        requests.push({ listPolizas : listMayoresPolizas, servicio : this.servicioMayores?.servicio_id});
      }



      console.log(requests);

      return forkJoin(
        requests.map((request)=> { 
          return this.polizasService.postPolizas(venta_id, request.servicio , this.datosCotizacion.tags.join(','), this.datosCotizacion.initialDate, this.datosCotizacion.finalDate, this.listExtras.length).pipe(
            map((response) => {
              return { request, response };
            })
          );
        })
      );
    }),
    switchMap((data)=>{

      const requests : any[] = [];


      data.forEach(  response => {
        this.dataService.listPolizas.push(response.response.id);

        const polizas : any[] = response.request.listPolizas;

        polizas.forEach(poliza => {
                    

          const names = this.splitFirstWord(poliza.form.value.nombres);

          const firstName = names.firsWord;
          const secondName= names.resOfWord;
          
          const lastNames= this.splitFirstWord(poliza.form.value.apellidos);

          const firtLastName = lastNames.firsWord;
          const seconLastName = lastNames.resOfWord;



          requests.push(
            this.beneficiarioService.postBeneficiario(
            response.response.id,
            firtLastName,seconLastName,
            firstName,secondName,
            poliza.form.value.ci, 
            poliza.form.value.passport,
            poliza.form.value.age,
            poliza.form.value.gender,
            poliza.form.value.origen,
            poliza.form.value.email,
            poliza.form.value.telf ).pipe(
              map((beneficiario)=> {
                return { response, beneficiario}
              })
            ));
        })

      })


      return forkJoin(requests);


      // return forkJoin(
      //   data.map ( (response) => {

      //     this.dataService.listPolizas.push(response.response.id);

          

      //     const names = this.splitFirstWord(response.request.form.value.nombres);

      //     const firstName = names.firsWord;
      //     const secondName= names.resOfWord;
          
      //     const lastNames= this.splitFirstWord(response.request.form.value.apellidos);

      //     const firtLastName = lastNames.firsWord;
      //     const seconLastName = lastNames.resOfWord;



      //     return this.beneficiarioService.postBeneficiario(
      //       response.response.id,
      //       firtLastName,seconLastName,
      //       firstName,secondName,
      //       response.request.form.value.ci, 
      //       response.request.form.value.passport,
      //       response.request.form.value.age,
      //       response.request.form.value.gender,
      //       response.request.form.value.origen,
      //       response.request.form.value.email,
      //       response.request.form.value.telf ).pipe(
      //         map((beneficiario)=> {
      //           return { response, beneficiario}
      //         })
      //       )
      //   })
      // )
     
    }),

    switchMap((data)=> {


      if(this.dataExtra.length>0){
        const requests : any[] = [];

        console.log(data);

        data.forEach(
          response => {
            this.dataService.listClientes.push(response.beneficiario.id);
            this.dataExtra.forEach(
              extra => {
                requests.push( {
                  extra : extra.extra,
                  poliza_id : response.response.response.id,
                  costo : extra.costo

                })
              }
            )
          }
        )
        return forkJoin(
          requests.map((request)=> {
            return this.polizasPlusService.postPolizaExtra(request.poliza_id, request.extra.beneficio_id,request.costo)
          })
        )
      }
      
      

      return "ok";

      
      
    })

    
  )
  .subscribe((data) => {


    Swal.close();
    this.dataService.haveData = true;


    this.successMessage('Se ha registrado la venta correctamente');



  });

  }


  splitFirstWord(input: string) : {firsWord : string , resOfWord : string} {


    const inputNormalized:  string =  this.normalizeSpaces(input);

    const firstSpaceIndex = inputNormalized.indexOf(' ');
  
    if (firstSpaceIndex === -1) {
      // No hay espacios en el string, así que se devuelve el string en un array
      return {firsWord : input , resOfWord : ""};
    }
  
    const firstWord = inputNormalized.slice(0, firstSpaceIndex);
    const restOfString = inputNormalized.slice(firstSpaceIndex + 1);
  
    return {firsWord : firstWord , resOfWord : restOfString.trimEnd()}
  }

  backPrev(){
    this.router.navigate(['../../home/cotizar']);
  }

  successMessage(msg : string){
    Swal.close();
   

    Swal.fire({
      title: 'Venta registrada correctamente',
      icon:  'success',
      text: msg,
      showCancelButton: true,
      confirmButtonColor: '#16F80B',
      cancelButtonColor: '#d33',
      denyButtonText: `Finalizar`,
      confirmButtonText: 'Dirigir a listado',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['../../home/polizas/listado-polizas']);

      } else if (result.isDenied) {
        console.log("Termino");
      }
    })
    
    
  }


  


  obtenerCostoPoliza( ){


    const rangoPrecioMenores =  this.precios.find(precio => precio.servicio_id === this.servicioMenores?.servicio_id  && this.betweenTheRange(precio.limite_inferior, precio.limite_superior)); 
    

    const rangoPrecioMayores = this.precios.find(precio => precio.servicio_id === this.servicioMayores?.servicio_id  && this.betweenTheRange(precio.limite_inferior, precio.limite_superior));

    if(rangoPrecioMenores){
      const costoMenores= this.realizarCalculo(rangoPrecioMenores) ;
      this.costoMenores = costoMenores;
    }

    if(rangoPrecioMayores){
      const costoMayores = this.realizarCalculo(rangoPrecioMayores);
      this.costoMayores = costoMayores;
    }

    
    return 0;

  }

  betweenTheRange( liInf: number, liSup: number ) : boolean{
    
    return this.diffDays >= liInf && this.diffDays <= liSup;
  }



  realizarCalculo(rangoPrecio : Precio){
    let precio :number = 0;
    if(rangoPrecio.tipo_ecuacion ===1){
      precio=this.ecuacionCurva(rangoPrecio, this.diffDays) * this.diffDays;
    }
    if(rangoPrecio.tipo_ecuacion ===2){
      precio = this.ecuacionRecta(rangoPrecio, this.diffDays) *this.diffDays;
    }

    return precio;

  }


  ecuacionCurva(rangoPrecio : Precio, dias : number){
    const valor = Math.pow(dias, rangoPrecio.intercepto)
    return valor*rangoPrecio.pendiente;

  }


  ecuacionRecta( rangoPrecio : Precio, dias: number){
      
      
  
      const valor = (rangoPrecio.pendiente*dias) + rangoPrecio.intercepto;
  
      return valor;
  
  }

  comparar(initialDay : string, finalDay : string){
    const date1: Date = new Date(initialDay);
    const date2: Date = new Date(finalDay);
  
      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  
      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
      if(!isNaN(diffInDays)){
        this.diffDays= diffInDays;
      }
  
      this.diffDays = diffInDays +1;
   }




    realizarDescuentos(){
        this.listDescuentos = this.listCupones.filter(cupon => cupon.servicio_id === this.servicioMayores?.servicio_id || cupon.servicio_id === this.servicioMenores?.servicio_id)
                                .map(cupon => {
                                  const servicioDesc = this.precioMayores.servicio?.servicio_id === cupon.servicio_id ? this.precioMayores : this.precioMenores;
                                  switch (cupon.tipo_valor) {
                                    case 1:
                                      return {
                                        cupon : cupon,
                                        monto : servicioDesc.precio * (cupon.valor/100),
                                        montoTotal : servicioDesc.precioTotal * (cupon.valor/100),
                                      }
                                    case 2:
                                      return {
                                        cupon : cupon,
                                        monto : cupon.valor,
                                        montoTotal : cupon.valor* servicioDesc.cantidadPolizas,
                                      }
                                    default:
                                      return {
                                        cupon : cupon,
                                        monto : servicioDesc.precioTotal * (cupon.valor/100),
                                        montoTotal : cupon.valor* servicioDesc.cantidadPolizas,

                                      }
                                  }})
                              
    }

    dividirTotal( numero : number ){
            
      let parteEntera;
      let parteDecimal : string = "";

      if (numero % 1 === 0) {
        parteEntera = numero;
        parteDecimal = "0";
      } else {
        parteEntera = Math.trunc(numero);
        parteDecimal = (numero - parteEntera).toFixed(3).toString().split(".")[1].substring(0, 3);
      }

      return({
        parteEntera,
        parteDecimal
      })
    }


    normalizeSpaces(input: string): string {
      // Dividir el string en palabras, utilizando un espacio como separador
      const words = input.split(' ');
    
      // Filtrar palabras vacías (espacios adicionales)
      const nonEmptyWords = words.filter(word => word !== '');
    
      // Unir las palabras con un solo espacio entre ellas
      const normalizedString = nonEmptyWords.join(' ');
    
      return normalizedString;
    }


}
