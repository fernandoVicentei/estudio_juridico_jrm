<template>
  <div class="row" >
    <div class="col-md-12">
      <CCard class="mb-4">
        <CCardBody>

            <h4 v-if="idTramite==''" >Iniciar Tramite</h4>
            <h4 v-else > {{ textoTitulo }} </h4>

            <form  @submit="validarDatos" >

              <strong>Informacion Adicionial</strong>
              <div class="row mt-3 mb-2" >
                  <div class="col-md-3 mt-1" >
                      <span>Fecha de Registro</span>
                      <input type="date" class="form-control"
                        v-model="fechaRegistro" :disabled="bloquearComponentes"  required>
                  </div>
                  <div class="col-md-3 mt-1" >
                      <span>Abogado Asignado</span>
                      <select class="form-select"  v-model="codAbogado" required >
                        <option value="" selected disabled >Seleccione una opcion</option>
                        <option  v-for="abogado in listaAbogados"  :value="abogado.id" :key="abogado.id">
                            {{  abogado.nombre_completo  }}
                        </option>
                      </select>
                  </div>
                  <div class="col-md-3 mt-1" >
                      <span>Cliente</span>
                      <select class="form-select"  v-model="codCliente" :disabled="bloquearComponentes"  required >
                        <option value="" selected disabled >Seleccione una opcion</option>
                        <option  v-for="cliente in listaClientes"  :value="cliente.id" :key="cliente.id">
                            {{  cliente.nombre_completo  }}
                        </option>
                      </select>
                  </div>
                  <div class="col-md-3 mt-1" >
                      <span>Juzgado </span>
                      <select class="form-select"  v-model="codJuzgado"  required>
                          <option value="" selected disabled >Seleccione una opcion</option>
                          <option  v-for="juzgado in listaJuzgados"  :value="juzgado.id" :key="juzgado.id">
                            {{  juzgado.nombre  }}
                          </option>
                      </select>
                  </div>
                  <div class="col-md-12 mt-1" >
                      <span>Sucesos Ocurridos</span>
                      <textarea class="form-control"  cols="30" rows="4"
                        v-model="sucesosOcurridos"
                        placeholder="Descripcion del problema " required></textarea>
                  </div>
              </div>

              <strong>Detalles Especificos</strong>
              <div class="row mt-3 mb-3" >
                  <div class="col-md-3 mt-1" >
                    <span>Fecha de los sucesos</span>
                    <input type="date" class="form-control" v-model="fechaSucesos" required>
                  </div>
                  <div class="col-md-7 mt-1" >
                      <span>Tipo de trámite</span>
                      <select class="form-select"  @change="ttipotramiteseleccionado()"  v-model="codTipoTramite" required >
                        <option value="" selected disabled >Selecciona una opcion</option>
                          <option  v-for="tproceso in listaTipoTramites" :value="tproceso.id" :key="tproceso.id" >
                              {{  tproceso.proceso  }}
                          </option>
                      </select>
                  </div>
                  <div class="col-md-3 mt-1" >
                    <span>Presupuesto Inicial</span>
                    <input type="number" class="form-control bg-warning text-dark"   placeholder="0.0" disabled v-model="presupuestoInicial" required >
                  </div>
                  <div class="col-md-5 mt-1" >
                    <span>Observaciones del presupuesto</span>
                    <input type="text" placeholder="Opcional" class="form-control" v-model="obsPresupuesto"  >
                  </div>
                  <div class="col-md-6 mt-1" >
                    <span>Declaracion del Cliente</span>
                    <textarea  class="form-control"  v-model="declaracionCliente"
                      placeholder="Descripcion del suceso actual por parte del cliente" cols="30" rows="5" required ></textarea>
                  </div>
                  <div class="col-md-6 mt-1"  >
                    <span>Declaracion del Implicado</span>
                    <textarea  class="form-control" v-model="declaracionImplicado"
                    placeholder="Descripcion sobre el suceso por parte de la persona implicada" cols="30" rows="5"></textarea>
                  </div>
              </div>

              <strong>Detalles Personales</strong>
              <div class="row mt-2 mb-2" >
                  <div class="col-md-5 col-10 mt-1" >
                      <span>Tipo de pretencion</span>
                      <select class="form-select" v-model="codTipoPretencion" required >
                          <option value="" selected disabled>Selecciona una opcion</option>
                          <option  v-for="pretencion in listaTipoPretenciones" :value="pretencion.id" :key="pretencion.id" >
                              {{ pretencion.pretencion  }}
                          </option>
                      </select>
                  </div>
                  <div class="col-md-1 col-2 d-flex align-items-end mt-1" >
                      <button class="btn btn-info" @click="verPretencion()" type="button" >+</button>
                  </div>
                  <div class="col-md-6 mt-1">
                      <span>Valor Medida</span>
                      <input type="text" class="form-control"  v-model="valorMedida" placeholder="Valor medida (Opcional) " >
                  </div>
                  <div class="col-md-6 mt-1" >
                    <span>Detalle pretencion (Cliente)</span>
                    <textarea class="form-control"  v-model="pretencionCliente"  required placeholder="Detalle pretencion del cliente" cols="30" rows="3"></textarea>
                  </div>
                  <div class="col-md-6 mt-1" >
                    <span>Detalle pretencion (Implicado)</span>
                    <textarea class="form-control"  v-model="pretencionImplicado" placeholder="Detalle pretencion del implicado" cols="30" rows="3"></textarea>
                  </div>

                  <div class="mt-3 mb-3 justify-content-center " >
                    <ul>
                        <li   v-for="(error , i) in listaErrores " :key="i" class="text-danger">{{ error }}</li>

                    </ul>
                  </div>

                  <div class="d-flex flex-row justify-content-end col-md-12 mt-3 mb-3" >
                      <button class="btn btn-info text-light" type="submit">Registrar Tramite</button>
                      <button class="btn btn-danger text-light" @click="cancelar()"  >Cancelar</button>
                  </div>

              </div>

            </form>

        </CCardBody>

        <ModalOk  @cerrarModalOk="cerrarOk()" v-if="modalOk" :estado="modalOk" :mensaje="mensaje"   />
        <ModalError  @cerrarModalError="cerrarError()" v-if="modalError" :estado="modalError" :mensaje="mensaje"   />

      </CCard>
    </div>
  </div>
</template>

<script>

import { ruta_servidor , postFetch  } from '../../../helpers/contantes.js'
import ModalOk from '../../componentes/modalOk.vue'
import ModalError from '../../componentes/modalError.vue'

export default {
  name:'RegistrarTramite',
  components:{
    ModalOk,
    ModalError
  },
  data(){
    return{
      fechaRegistro:'',
      codAbogado:'',
      codCliente:'',
      codJuzgado:'',
      fechaSucesos:'',
      sucesosOcurridos:'',
      codTipoTramite:'',
      presupuestoInicial:'',
      obsPresupuesto:'',
      declaracionCliente:'',
      declaracionImplicado:'',
      codTipoPretencion:'',
      valorMedida:'',
      pretencionCliente:'',
      pretencionImplicado:'',
      listaClientes:[],
      listaAbogados:[],
      listaJuzgados:[],
      listaTipoTramites:[],
      listaTipoPretenciones:[],
      idTramite: '' ,
      listaErrores: [] ,
      bloquearComponentes: false ,

      modalOk: false ,
      modalError: false ,
      mensaje: '' ,
      editar: false ,
      textoTitulo:'Recargando Tramite ...',
      contadorIntentos:0,
    };
  },
  mounted(){
    this.cargarClientes()
    this.cargarAbogados()
    this.cargarJuzgados()
    this.cargarTipoTramites()
    this.cargarTipoPretenciones()
    this.idTramite= this.$route.params.idTramite
    this.bloquearComponentes = this.idTramite==''?false:true
    this.traerTramite()
  },
  methods:{
      traerTramite(){
        let obj = {idTramite: this.idTramite}
        postFetch( ruta_servidor + 'tramite/buscar', obj )
        .then(res=>{
            console.log(res)
            if(res.status == 200)
            {
                let resultados = res.tramite

                this.fechaRegistro = resultados.fecha
                this.codAbogado =  resultados.abogado_id
                this.codCliente = resultados.cliente_id
                this.codJuzgado = resultados.juzgado_id
                this.fechaSucesos =  resultados.fechaSuceso
                this.sucesosOcurridos = resultados.hechosOcurridos
                this.codTipoTramite =  resultados.tipoproceso_id
                this.presupuestoInicial = resultados.monto
                this.obsPresupuesto =  resultados.asunto
                this.declaracionCliente = resultados.detalleCliente
                this.declaracionImplicado = resultados.detalleDemandado
                this.codTipoPretencion =  resultados.tipopretencion_id
                this.valorMedida =  resultados.valorMedida
                this.pretencionCliente =  resultados.detallePretencionDemandante
                this.pretencionImplicado = resultados.detallePretencionDemandado
                this.textoTitulo = 'Actualizar Tramite'
            }else{
              console.log('error')
            }

        })
        .catch((e)=>{
          this.mensaje="Ocurrio un problema al obtener los datos del tramite. "+e.message
          this.mostrarError()
        })
      },

      validarDatos(e){
        e.preventDefault();
        this.listaErrores= []
        if( this.idTramite == '' ){
          this.registrarTramite()
        }else{
          this.editarTramite()
        }
      },

      verPretencion(){
        alert('HOLA')
      },

      registrarTramite()
      {

        let data = this.prepararDatos()
        postFetch( ruta_servidor+ 'tramite/agregar', data)
        .then(res=>{
            console.log(res)
            if(res.status == 200 ){
               this.mensaje =  'El tramite fue iniciado y registrado correctamente'
               this.mostrarOk()
            }else if(res.status == 422) {
              this.listaErrores = res.errors
            }else{
              this.mensaje =  'Hubo un error al registrar el tramite. Vuelva a intentarlo nuevamente.'+res.message
              this.mostrarError()
            }
        })
        .catch((e)=>{
           this.mensaje="Ocurrio un problema al guardar el registro. "+e.message
           this.mostrarError()
        })

      },
      editarTramite(){

        let data = this.prepararDatos()
        data.idTramite = this.idTramite

        postFetch( ruta_servidor +'tramite/editar' ,data )
        .then(res=>{
            console.log(res)
            if(res.status == 200 ){
              this.mensaje =  'El tramite fue actualizado correctamente'
               this.mostrarOk()
            }else if(res.status == 422) {
              this.listaErrores = res.errors
            }else{
              this.mensaje="Ocurrio un problema al guardar el registro. "+e.message
              this.mostrarError()
            }
        })
        .catch((e)=>{
          console.log(e)
        })

      },
      prepararDatos(){
        let obj = {
          fecha: this.fechaRegistro ,
          fechaSucesos:this.fechaSucesos,
          estado :1,
          hechosOcurridos: this.sucesosOcurridos,
          abogado_id : this.codAbogado ,
          cliente_id : this.codCliente ,
          tipoproceso_id: this.codTipoTramite ,
          valor_medida: this.valorMedida ,
          tipopretencion_id : this.codTipoPretencion ,
          declaracionCliente :  this.declaracionCliente ,
          declaracionDemandado : this.declaracionImplicado ,
          monto: this.presupuestoInicial ,
          asunto : this.obsPresupuesto  ,
          detallePretencionDemandado : this.pretencionImplicado,
          detallePretencionCliente: this.pretencionCliente   ,
          juzgado_id: this.codJuzgado,
          idTramite:0,
        }
        return obj
      },
      cargarClientes(){
        postFetch( ruta_servidor+ 'clientes/retornarclientesbasico', null  )
        .then(res=>{
            if(res.status == 200 ){
                this.listaClientes = res.clientes
            }else{
            }
        })
        .catch((e)=>{

        })
      },
      cargarAbogados(){
          postFetch(ruta_servidor+'abogados/retornarabogadosbasico', null)
          .then(res=>{

              if(res.status == 200 ){
                  this.listaAbogados = res.abogados
              }else{

              }
          })
          .catch((e)=>{

          })
      },
      cargarJuzgados(){
        postFetch(ruta_servidor+'tramite/retornarjuzgadobasico',null)
        .then(res=>{

            if(res.status == 200 ){
                this.listaJuzgados = res.juzgados
            }else{
            }
        })
        .catch((e)=>{
        })

      },
      cargarTipoTramites(){
        postFetch(ruta_servidor+'tipotramites/retornartipotramite',null)
        .then(res=>{
          console.log(res)
            if(res.status == 200 ){
                this.listaTipoTramites = res.tipotramites
            }else{
            }
        })
        .catch((e)=>{
        })
      },
      cargarTipoPretenciones(){//
          postFetch(ruta_servidor+'tipotramites/retornartipopretenciones',null)
          .then(res=>{
              if(res.status == 200 ){
                  this.listaTipoPretenciones = res.pretenciones
              }else{
              }
          })
          .catch((e)=>{

          })
      },
      ttipotramiteseleccionado(){
         let idTT= this.codTipoTramite
         let obj =  this.listaTipoTramites.find(e => e.id === idTT)
         this.presupuestoInicial = obj.precioinicial

      },
      cancelar(){
        this.$router.push('/tramites');
      },
      cerrarOk(){
        this.modalOk= false
        document.body.style.overflow = 'auto';
        this.$router.push('/tramites');

      },
      mostrarOk(){
        this.modalOk = true
      },
      cerrarError(){
        this.modalError = false
        document.body.style.overflow = 'auto';
        if( this.idTramite != '' ){
           this.textoTitulo = 'Recargando Tramite'
           this.traerTramite()
          if( this.contadorIntentos == 3 ){
            this.$router.push('/tramites');
          }
          this.contadorIntentos+=1
        }

      },
      mostrarError(){
        this.modalError = true
      },

  },
}

</script>
