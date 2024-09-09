import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';

import Swal from 'sweetalert2';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { loadingAnimation } from 'src/app/Shared/animations/loading.animation';
import { ClientePost } from 'src/app/Shared/models/Data/Cliente';
import { Cupon, CuponAplicado } from 'src/app/Shared/models/Data/Cupon';
import { Precio } from 'src/app/Shared/models/Data/Precio';
import { Servicio } from 'src/app/Shared/models/Data/Servicio';
import { cotizacionDataForm } from 'src/app/Shared/models/Pages/cotizacionDataForm.model';
import { ExtraForm } from 'src/app/Shared/models/Pages/extra.model';
import { FormCotizarModel } from 'src/app/Shared/models/Pages/formCotizar.model';
import { cotizacionIntefaceService } from 'src/app/Shared/services/interfaces/cotizacioninterface.service';
import { BeneficiariosService } from 'src/app/Shared/services/requests/beneficiarios.service';
import { ExtrasPolizasService } from 'src/app/Shared/services/requests/beneficiosExtras.service';
import { ClientesService } from 'src/app/Shared/services/requests/clientes.service';
import { CuponesService } from 'src/app/Shared/services/requests/cupones.service';
import { PolizasService } from 'src/app/Shared/services/requests/polizas.service';
import { PreciosService } from 'src/app/Shared/services/requests/precios.service';
import { VentasService } from 'src/app/Shared/services/requests/ventas.service';
import { dateValidator } from 'src/app/Shared/validators/date.validators';
import { emailValidator } from 'src/app/Shared/validators/email.validators';
import { UtilsService } from 'src/app/Shared/services/utils/utils.service';
import { LocalStorageService } from 'src/app/Shared/services/utils/local-storage.service';
import { Plan } from 'src/app/Shared/models/Data/Plan';
import { VentaResp } from 'src/app/Shared/models/Data/Venta.model';
import { PolizaResp } from 'src/app/Shared/models/Data/Poliza';

export enum typePolicie {
  mayores = 2,
  menores = 1,
}

export interface extraItemUi {
  extra: Plan;
  cantidad: number;
  costo: number;
  costoTotal: number;
}

@Component({
  selector: 'datos-polizas',
  templateUrl: './datos-polizas.component.html',
  styleUrls: ['./datos-polizas.component.css'],
  animations: [loadingAnimation],
})
export class DatosPolizasComponent implements OnInit {
  datosCotizacion: FormCotizarModel = {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones: [],
    email: '',
    telefono: '',
  };
  datosCotizacionMenores: cotizacionDataForm[] = [];
  datosCotizacionMayores: cotizacionDataForm[] = [];
  servicioMenores: Servicio | null = null;
  servicioMayores: Servicio | null = null;
  precios: Precio[] = [];
  total = 0;
  totalBruto = 0;

  totalEnteros = 0;
  totalDecimales: any;

  listPolizas: any[] = [];

  costoMenores = 0;
  costoMayores = 0;

  precioMayores = {
    precio: 0,
    precioTotal: 0,
    cantidadPolizas: 0,
    servicio: this.servicioMayores,
  };

  precioMenores = {
    precio: 0,
    precioTotal: 0,
    cantidadPolizas: 0,
    servicio: this.servicioMenores,
  };

  public itemHeight = 150;
  private startY = 0;
  private startHeight = 0;
  public maxHeightReached = false;
  public maxHeight = 300;
  public minHeight = 150;
  public minHeightReached = true;
  nextId: number = 0;
  diffDays = -1;

  listCupones: Cupon[] = [];

  btn_pagar = false;
  stateBottom: 1 | 2 | 3 = 1;

  listExtras: ExtraForm[] = [];
  dataExtra: any[] = [];

  extrasSelected: Plan[] = [];

  listDescuentos: CuponAplicado[] = [];

  fechaLimite: string = '';

  hasLoaded = true;

  showHeadlines: boolean = false;

  countryIso = CountryISO;

  similarEmail: boolean = false;

  defaultEmail: string = '';

  client_secret: string | null = null;
  amount: number = 0;
  makePayment: boolean = false;
  venta_id: number = 0;

  shopping_cart: boolean = false;

  constructor(
    private dataService: cotizacionIntefaceService,
    private preciosService: PreciosService,
    private cuponesService: CuponesService,
    private clientesService: ClientesService,
    private ventasService: VentasService,
    private polizasService: PolizasService,
    private beneficiarioService: BeneficiariosService,
    private polizasPlusService: ExtrasPolizasService,
    private utilService: UtilsService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  getActivePolizas(): boolean {
    return this.listPolizas.every((poliza) => poliza.form.valid);
  }

  ngOnInit(): void {
    this.datosCotizacion = this.dataService.sharedData;
    this.datosCotizacionMenores = this.dataService.cotizacionMenores;
    this.datosCotizacionMayores = this.dataService.cotizacionMayores;
    this.servicioMenores = this.dataService.servicioMenores;
    this.servicioMayores = this.dataService.servicioMayores;
    this.listExtras = this.dataService.listExtras;
    this.extrasSelected = this.dataService.extrasSelected;

    // if(this.dataService.sharedData.listCotizaciones.length === 0){
    //   Swal.close();
    //   this.router.navigate(['../../home]']);
    // }

    this.comparar(
      this.datosCotizacion.initialDate,
      this.datosCotizacion.finalDate
    );

    this.hasLoaded = false;

    // //Las polizas limitamos a las edades de 75 años

    // const fecha = new Date(this.datosCotizacion.finalDate); // fecha del viaje
    // const anosARestar = 75;

    // const nuevaFecha = new Date(
    //   fecha.getFullYear() - anosARestar,
    //   fecha.getMonth(),
    //   Math.min(fecha.getDate(), new Date(fecha.getFullYear() - anosARestar, fecha.getMonth() + 1, 0).getDate())
    // );

    // this.defaultEmail = this.datosCotizacion.email;

    // nuevaFecha.setDate(fecha.getDate() + 2);

    // this.fechaLimite = nuevaFecha.toISOString().split('T')[0];

    this.fechaLimite = this.setFechaLimite(this.datosCotizacion.finalDate);

    this.datosCotizacionMenores.forEach((element) => {
      this.listPolizas.push({
        form: this.createItemForm(typePolicie.menores),
        isOpen: true,
        servicio: this.servicioMenores,
        type: typePolicie.menores,
      });
    });

    this.datosCotizacionMayores.forEach((element) => {
      this.listPolizas.push({
        form: this.createItemForm(typePolicie.mayores),
        isOpen: true,
        servicio: this.servicioMayores,
        type: typePolicie.mayores,
      });
    });

    this.preciosService
      .getPrecios()
      .pipe(
        switchMap((data) => {
          this.precios = data;
          this.obtenerCostoPoliza();
          return this.cuponesService.getCupones();
        })
      )
      .subscribe((data) => {
        this.hasLoaded = true;
        this.listCupones = data.filter((cupon) => cupon.status === 1);
        this.listCupones = this.utilService.filterCouponsByDates(
          this.listCupones
        );
        this.precioMayores = {
          precio: this.costoMayores,
          precioTotal: this.costoMayores * this.datosCotizacionMayores.length,
          cantidadPolizas: this.datosCotizacionMayores.length,
          servicio: this.servicioMayores,
        };

        this.precioMenores = {
          precio: this.costoMenores,
          precioTotal: this.costoMenores * this.datosCotizacionMenores.length,
          cantidadPolizas: this.datosCotizacionMenores.length,
          servicio: this.servicioMenores,
        };

        this.realizarDescuentos();

        // this.dataExtra = this.extrasSelected.map((extra) => {
        //   return {
        //     extra,
        //     cantidad: this.datosCotizacionMayores.length + this.datosCotizacionMenores.length,
        //     costo: extra.incremento  * this.betweenTheRange,
        //     costoTotal: extra.complemento ? (parseFloat(extra.complemento) * this.diffDays * (this.datosCotizacionMayores.length + this.datosCotizacionMenores.length)) : 0,
        //   };
        // })

        // this.dataExtra = this.listExtras.map(
        //   extra => {
        //     return{
        //       extra : extra.extra,
        //       cantidad: this.datosCotizacionMayores.length+ this.datosCotizacionMenores.length,
        //       costo : extra.extra.complemento ? parseFloat(extra.extra.complemento ) :  0,
        //       costoTotal : extra.extra.complemento ? (parseFloat(extra.extra.complemento)* this.diffDays * (this.datosCotizacionMayores.length + this.datosCotizacionMenores.length)): 0,

        //     }
        //   }
        // )

        this.totalBruto =
          this.precioMayores.precioTotal + this.precioMenores.precioTotal;

        this.dataExtra = this.extrasSelected.map((item) => {
          return {
            extra: item,
            cantidad:
              this.datosCotizacionMayores.length +
              this.datosCotizacionMenores.length,
            costo: parseFloat(
              (
                (this.totalBruto * item.incremento) /
                100 /
                (this.datosCotizacionMayores.length +
                  this.datosCotizacionMenores.length)
              ).toFixed(2)
            ),
            costoTotal: parseFloat(
              ((this.totalBruto * item.incremento) / 100).toFixed(2)
            ),
          };
        });
        this.total =
          this.totalBruto -
          this.listDescuentos.reduce((a, b) => a + b.montoTotal, 0) +
          this.dataExtra.reduce((a, b) => a + b.costoTotal, 0);

        const { parteEntera, parteDecimal } = this.dividirTotal(this.total);

        (this.totalEnteros = parteEntera), (this.totalDecimales = parteDecimal);
      });

    if (this.listPolizas.length == 1) {
      this.listPolizas[0].titular = true;
    }
  }

  setFechaLimite(finalDate: string): string {
    //Las polizas limitamos a las edades de 75 años

    const fecha = new Date(finalDate); // fecha del viaje
    const anosARestar = 75;

    const nuevaFecha = new Date(
      fecha.getFullYear() - anosARestar,
      fecha.getMonth(),
      Math.min(
        fecha.getDate(),
        new Date(
          fecha.getFullYear() - anosARestar,
          fecha.getMonth() + 1,
          0
        ).getDate()
      )
    );

    this.defaultEmail = this.datosCotizacion.email;

    nuevaFecha.setDate(fecha.getDate() + 2);

    return nuevaFecha.toISOString().split('T')[0];
  }

  createItemForm(typePoliza: typePolicie): FormGroup {
    return new FormGroup({
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      age: new FormControl(null, [
        Validators.required,
        dateValidator(typePoliza, this.fechaLimite),
      ]),
      identifier: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, emailValidator]),
      telf: new FormControl(null, Validators.required),
      origen: new FormControl(null, Validators.required),
      titular: new FormControl(false, Validators.required),
      gender: new FormControl(null, Validators.required),
    });
  }

  expand() {
    if (this.minHeightReached) {
      this.itemHeight = this.maxHeight;
    } else {
      this.itemHeight = this.minHeight;
    }
    this.minHeightReached = !this.minHeightReached;
  }
  reducir() {
    this.itemHeight = this.minHeight;
    this.minHeightReached = true;
  }

  salir() {
    this.router.navigateByUrl('/landing-page/home');
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

  siguiente() {}

  openForm(poliza: any) {
    poliza.isOpen = !poliza.isOpen;
  }

  listVentas: VentaResp[] = [];
  listPolizasResp: PolizaResp[] = [];
  stringResp : string = '';

  comprobarDatos(polizas: any) {
    if (polizas.length !== 1) {
      this.showErrorMsg('Se necesita que sea un titular obligatoriamente');
      return;
    }

    if (!this.listPolizas.every((poliza) => poliza.form.valid)) {
      this.showErrorMsg(
        'Revise los datos de cada poliza, el icono marca la poliza con error'
      );
      return;
    }

    Swal.fire({
      text: 'Espere un momento mientras se procesa la informacion',
      imageUrl: 'assets/svg/loading.svg',

      showConfirmButton: false,
      allowOutsideClick: false,

      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });

    let cliente_id: number = 0;

    const arrcantidad: string[] = [];
    const arrservicios: string[] = [];

    if (this.datosCotizacionMenores.length > 0 && this.servicioMenores) {
      arrcantidad.push(this.datosCotizacionMenores.length.toString());
      arrservicios.push(this.servicioMenores.servicio_id.toString());
    }
    if (this.datosCotizacionMayores.length > 0 && this.servicioMayores) {
      arrcantidad.push(this.datosCotizacionMayores.length.toString());
      arrservicios.push(this.servicioMayores.servicio_id.toString());
    }

    const cantidadDto = arrcantidad.join(',');

    const requests: any[] = [];

    const listMenoresPolizas: any[] = this.listPolizas.filter(
      (poliza) => poliza.type === 1
    );
    const listMayoresPolizas: any[] = this.listPolizas.filter(
      (poliza) => poliza.type === 2
    );

    if (listMenoresPolizas.length > 0) {
      requests.push({
        listPolizas: listMenoresPolizas,
        servicio: this.servicioMenores?.servicio_id,
      });
    }
    if (listMayoresPolizas.length > 0) {
      requests.push({
        listPolizas: listMayoresPolizas,
        servicio: this.servicioMayores?.servicio_id,
      });
    }

    const descuentosDto = this.mapListDescuentos(
      this.listDescuentos,
      this.listPolizas.length,
      this.servicioMayores,
      this.servicioMenores
    ).join(',');

    const tipoDescuentosDto = this.mapCantDescuentos(
      this.listDescuentos,
      arrcantidad.length
    ).join(',');

    const serviciosDto = arrservicios.join(',');

    this.clientesService
      .getClienteById(polizas[0].form.value.identifier)
      .pipe(
        switchMap((data) => {


          if (data.length > 0) {
            cliente_id = data[0].cliente_id;

            return forkJoin(
              requests[0].listPolizas.map((request : any) => {
                return this.ventasService.postVenta(
                  cliente_id,
                  '1',
                  descuentosDto.length > 0 ? descuentosDto : '0',
                  tipoDescuentosDto,
                  0,
                  serviciosDto,
                  this.datosCotizacion.initialDate,
                  this.datosCotizacion.finalDate,
                  this.extrasSelected.map((item) => item.beneficio_id).join(',')
                );
              })
            );
          } else {
            const nuevoCliente: ClientePost = {
              apellido: polizas[0].form.value.apellidos,
              nombre: polizas[0].form.value.nombres,
              nit_ci: polizas[0].form.value.identifier,
              origen: polizas[0].form.value.origen,
              email: polizas[0].form.value.email,
              nro_contacto: polizas[0].form.value.telf.value
                ? polizas[0].form.value.telf.value.internationalNumber
                : '',
            };
            // Use `switchMap` to chain the `postCliente` Observable to the `postVenta` Observable
            return this.clientesService
              .postCliente(nuevoCliente)
              .pipe(
                switchMap((data) => {
                  cliente_id = data.id;

                  this.dataService.titular = data;

                  return forkJoin(
                    requests[0].listPolizas.map((request : any) => {
                      return this.ventasService.postVenta(
                        cliente_id,
                        '1',
                        descuentosDto.length > 0 ? descuentosDto : '0',
                        tipoDescuentosDto,
                        0,
                        serviciosDto,
                        this.datosCotizacion.initialDate,
                        this.datosCotizacion.finalDate,
                        this.extrasSelected
                          .map((item) => item.beneficio_id)
                          .join(',')
                      );
                    })
                  );
                })
              )
              .pipe(
                catchError((err) => {
                  return throwError(err);
                })
              );
          }
        }),
        switchMap((responds) => {
          this.listVentas = responds as VentaResp[];
          const requestsPoliza = (responds as VentaResp[]).map((respond) => {
            return this.polizasService.postPolizas(
              respond.id,
              parseInt(serviciosDto),
              this.datosCotizacion.tags.join(','),
              this.datosCotizacion.initialDate,
              this.datosCotizacion.finalDate,
              this.listExtras.length
            );
          });

          return forkJoin(requestsPoliza);
        }),
        switchMap((respondPolizas) => {
          this.listPolizasResp = respondPolizas;

          const polizas: any[] =
            listMayoresPolizas.length > 0
              ? listMayoresPolizas
              : listMenoresPolizas;

          const requestsBeneficiarios: any[] = [];

          respondPolizas.forEach((response, index) => {
            this.dataService.listPolizas.push(response.id);

            const names = this.splitFirstWord(
              polizas[index].form.value.nombres
            );

            const firstName = names.firsWord;
            const secondName = names.resOfWord;

            const lastNames = this.splitFirstWord(
              polizas[index].form.value.apellidos
            );

            const firtLastName = lastNames.firsWord;
            const seconLastName = lastNames.resOfWord;

            requestsBeneficiarios.push(
              this.beneficiarioService
                .postBeneficiario(
                  response.id,
                  firtLastName,
                  seconLastName,
                  firstName,
                  secondName,
                  polizas[index].form.value.identifier,
                  polizas[index].form.value.age,
                  polizas[index].form.value.gender === 'Masculino' ? '1' : '2 ',
                  polizas[index].form.value.origen,
                  polizas[index].form.value.email.trimEnd(),
                  polizas[index].form.value
                    ? polizas[index].form.value.telf.internationalNumber
                    : ''
                )
                .pipe(
                  map((beneficiario) => {
                    return { response, beneficiario };
                  })
                )
            );

            // const polizas: any[] = response.request.listPolizas;
          });

          return forkJoin(requestsBeneficiarios);
        })
      )
      .subscribe({
        next: (data) => {
          const totalPayment = this.listVentas.reduce(
            (venta, accum) => venta + accum.total_pago,
            0
          ).toFixed(2);

          const details = this.listPolizasResp
            .map((poliza) => poliza.id)
            .join(',');

          console.log({totalPayment, details});

          this.amount= parseFloat(totalPayment);

          this.ventasService
            // .createIntentPaymentStripe(parseFloat(totalPayment), details)
            .createIntentPaymentStripe(parseFloat(totalPayment), details)
            .subscribe({
              next: (resp : any) => {
                this.client_secret = resp.data;
                this.stringResp = this.listVentas.map(venta => venta.id).join(',') +'-'+details;
                Swal.close();
                this.makePayment = true;
                this.dataService.haveData = true;
              },
              error: (error) => {
                console.log(error);
                this.showErrorMsg(error);
              },
            });
        },
        error: (error) => {
          console.log(error);
          this.showErrorMsg(error);
        },
      });
  }

  splitFirstWord(input: string): { firsWord: string; resOfWord: string } {
    const inputNormalized: string = this.normalizeSpaces(input);

    const firstSpaceIndex = inputNormalized.indexOf(' ');

    if (firstSpaceIndex === -1) {
      // No hay espacios en el string, así que se devuelve el string en un array
      return { firsWord: input, resOfWord: '' };
    }

    const firstWord = inputNormalized.slice(0, firstSpaceIndex);
    const restOfString = inputNormalized.slice(firstSpaceIndex + 1);

    return { firsWord: firstWord, resOfWord: restOfString.trimEnd() };
  }

  mapListDescuentos(
    descuentos: CuponAplicado[],
    cantidadPolizas: number,
    servicioMenores: Servicio | null,
    servicioMayores: Servicio | null
  ): string[] {
    // const descuentosMapped : string[] = [];
    // descuentosMapped.push(descuentos.reduce((a, b) => a + b.montoTotal, 0).toString());

    // if(descuentos.length != cantidadPolizas ){
    //   for (let index = 0; index < cantidadPolizas-1; index++) {
    //     descuentosMapped.push('0');
    //   }
    // }

    if (descuentos.length === 0) {
      const descuentosAplicados: string[] = [];

      if (servicioMenores) {
        descuentosAplicados.push('0');
      }

      if (servicioMayores) {
        descuentosAplicados.push('0');
      }

      return descuentosAplicados;
    }

    const descuentosMapped: string[] = this.agruparPorServicioId(
      descuentos
    ).map((listDescuento) => {
      return (listDescuento
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.montoTotal,
          0
        )/cantidadPolizas)
        .toFixed(3);
    });

    return descuentosMapped;
  }

  agruparPorServicioId(cupones: CuponAplicado[]): CuponAplicado[][] {
    const grupos: { [key: number]: CuponAplicado[] } = {};

    cupones.forEach((cuponAplicado) => {
      const { servicio_id } = cuponAplicado.cupon;
      if (!grupos[servicio_id]) {
        grupos[servicio_id] = [];
      }
      grupos[servicio_id].push(cuponAplicado);
    });

    return Object.values(grupos);
  }

  mapCantDescuentos(descuentos: CuponAplicado[], cantidadPolizas: number) {
    const descuentosMapped: string[] = [];

    for (let index = 0; index < cantidadPolizas; index++) {
      descuentosMapped.push('0');
    }

    return descuentosMapped;
  }

  backPrev() {
    this.router.navigateByUrl('/landing-page/cotizar');
  }

  successMessage(msg: string) {
    Swal.close();

    Swal.fire({
      title: 'Venta registrada correctamente',
      icon: 'success',
      text: msg,
      showCancelButton: true,
      confirmButtonColor: '#16F80B',
      cancelButtonColor: '#d33',
      denyButtonText: `Finalizar`,
      confirmButtonText: 'Dirigir a listado',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigateByUrl('/dashboard/polizas-detalles');
      } else if (result.isDenied) {
        console.log('Termino');
      }
    });
  }

  obtenerCostoPoliza() {
    const rangoPrecioMenores = this.precios.find(
      (precio) =>
        precio.servicio_id === this.servicioMenores?.servicio_id &&
        this.betweenTheRange(precio.limite_inferior, precio.limite_superior)
    );

    const rangoPrecioMayores = this.precios.find(
      (precio) =>
        precio.servicio_id === this.servicioMayores?.servicio_id &&
        this.betweenTheRange(precio.limite_inferior, precio.limite_superior)
    );

    if (rangoPrecioMenores) {
      const costoMenores = this.realizarCalculo(rangoPrecioMenores);
      this.costoMenores = costoMenores;
    }

    if (rangoPrecioMayores) {
      const costoMayores = this.realizarCalculo(rangoPrecioMayores);
      this.costoMayores = costoMayores;
    }

    return 0;
  }

  betweenTheRange(liInf: number, liSup: number): boolean {
    return this.diffDays >= liInf && this.diffDays <= liSup;
  }

  realizarCalculo(rangoPrecio: Precio) {
    let precio: number = 0;
    if (rangoPrecio.tipo_ecuacion === 1) {
      precio = this.ecuacionCurva(rangoPrecio, this.diffDays) * this.diffDays;
    }
    if (rangoPrecio.tipo_ecuacion === 2) {
      precio = rangoPrecio.intercepto;
    }

    return precio;
  }

  ecuacionCurva(rangoPrecio: Precio, dias: number) {
    const valor = Math.pow(dias, rangoPrecio.intercepto);
    return valor * rangoPrecio.pendiente;
  }

  ecuacionRecta(rangoPrecio: Precio, dias: number) {
    const valor = rangoPrecio.intercepto;

    return valor;
  }

  comparar(initialDay: string, finalDay: string) {
    const date1: Date = new Date(initialDay);
    const date2: Date = new Date(finalDay);

    // Get the difference in milliseconds
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());

    // Convert the difference to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (!isNaN(diffInDays)) {
      this.diffDays = diffInDays;
    }

    this.diffDays = diffInDays + 1;
  }

  realizarDescuentos() {
    this.listDescuentos = this.listCupones
      .filter(
        (cupon) =>
          cupon.servicio_id === this.servicioMayores?.servicio_id ||
          cupon.servicio_id === this.servicioMenores?.servicio_id
      )
      .map((cupon) => {
        const servicioDesc =
          this.precioMayores.servicio?.servicio_id === cupon.servicio_id
            ? this.precioMayores
            : this.precioMenores;
        switch (cupon.tipo_valor) {
          case 1:
            return {
              cupon: cupon,
              monto: servicioDesc.precio * (cupon.valor / 100),
              montoTotal: servicioDesc.precioTotal * (cupon.valor / 100),
            };
          case 2:
            return {
              cupon: cupon,
              monto: cupon.valor,
              montoTotal: cupon.valor * servicioDesc.cantidadPolizas,
            };
          default:
            return {
              cupon: cupon,
              monto: servicioDesc.precioTotal * (cupon.valor / 100),
              montoTotal: cupon.valor * servicioDesc.cantidadPolizas,
            };
        }
      });
  }

  dividirTotal(numero: number) {
    let parteEntera;
    let parteDecimal: string = '';

    if (numero % 1 === 0) {
      parteEntera = numero;
      parteDecimal = '0';
    } else {
      parteEntera = Math.trunc(numero);
      parteDecimal = (numero - parteEntera)
        .toFixed(3)
        .toString()
        .split('.')[1]
        .substring(0, 3);
    }

    return {
      parteEntera,
      parteDecimal,
    };
  }

  normalizeSpaces(input: string): string {
    // Dividir el string en palabras, utilizando un espacio como separador
    const words = input.split(' ');

    // Filtrar palabras vacías (espacios adicionales)
    const nonEmptyWords = words.filter((word) => word !== '');

    // Unir las palabras con un solo espacio entre ellas
    const normalizedString = nonEmptyWords.join(' ');

    return normalizedString;
  }

  showErrorMsg(msg: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    });
  }

  emailState: boolean = true;
  changeEmail() {
    this.emailState = !this.emailState;

    this.listPolizas.forEach((poliza) => {
      console.log(poliza.form);
    });
  }

  openHeadlines() {
    this.showHeadlines = true;
  }

  closeHeadlines() {
    this.showHeadlines = false;
  }

  closePayment() {
    this.makePayment = false;
  }

  showEvent() {
    console.log(this.similarEmail);
  }

  setEmails(event: any) {
    if (this.similarEmail) {
      this.listPolizas.forEach((poliza) => {
        poliza.form.get('email').setValue(this.defaultEmail);
      });
    }
  }

  toggleShoppingCart() {
    this.shopping_cart = !this.shopping_cart;
  }

  closeCartOpenHeadline() {
    this.toggleShoppingCart();

    if (this.listPolizas.length > 1) {
      this.openHeadlines();
      return;
    }

    this.comprobarDatos(this.listPolizas);
  }
}
