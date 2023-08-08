<template>
  <form  @submit="enviarformulario" >
      <div class="row">
        <div class="col-md-12" >
          <label for="">Asunto</label>
        </div>
        <div class="col-md-12" >
          <input type="text" class="form-control" required v-model="asunto" placeholder="Asunto"  >
        </div>
        <div class="col-md-12 row p-0 m-0" >
          <div class="col-md-12" >
            <label for="">Direccion</label>
          </div>
          <div class="col-md-12" >
            <input type="text" class="form-control" v-model="direccion"  required placeholder="Direccion"  >
          </div>
        </div>
        <div class="col-md-12 row" >
          <div class="col-md-12" >
            <label for="">Asociado al trámite</label>
          </div>
          <div class="col-md-12" >
              <select class="form-select" v-model="idProceso" >
                <option value="" disabled selected>Selecciona una opcion</option>
                <option  v-for="proceso in listaProcesos" :value="proceso.value" :key="proceso.value">
                  {{ proceso.label }}
                </option>
              </select>
          </div>
        </div>
        <div class="col-md-12 row p-0 m-0" >
          <div class="col-md-12" >
            <label for="">Fecha realizada</label>
          </div>
          <div class="col-md-12" >
            <input type="datetime-local" name="" class="form-control" v-model="fecha" >
          </div>
        </div>

        <div class="mt-3 mb-3" >
            <ul>
                <li   v-for="(error , i) in listaerrores" :key="i" class="text-danger">{{ error }}</li>
            </ul>
        </div>

        <div class="col-md-12 mt-3 mb-3 d-flex justify-content-end" >
          <CButton color="secondary" class="text-light"  @click="$emit('cerrarModalCita')">
            Cancelar
          </CButton>
          <button class="btn btn-info text-light" type="submit" >Guardar</button>
        </div>

      </div>
  </form>

  <ModalOk  @cerrarModalOk="cerrarOk()" v-if="modal_ok" :estado="modal_ok" :mensaje="mensaje"   />
  <ModalError  @cerrarModalError="cerrarError()" v-if="modal_error" :estado="modal_error" :mensaje="mensaje"   />

</template>
<script>
import { ruta_servidor , postFetch  } from '../../../helpers/contantes.js'
import ModalOk from '../../componentes/modalOk.vue'
import ModalError from '../../componentes/modalError.vue'


export default {
  name:'Reunion',
  components:{
    ModalOk,
    ModalError,

  },
  data(){
    return {
      direccion:'',
      listaerrores:[],
      modal_ok:false,
      modal_error:false,
      mensaje:'',
      idCita:'',
      idProceso: null ,
      listaProcesos:[],
      estado:'',
      fecha:'',
      asunto:'',
      searchTerm: '',
    };
  },
  mounted(){
    if( this.tipo == 'EDITAR' ){
      this.idCita =  this.id
      this.traerDatos()
    }
    this.traerTramites()

  },
  computed: {

  },
  methods:{
    enviarformulario(e){
      e.preventDefault();
      let obj ={
             'direccion_cita':this.direccion,
            'fecha_cita':this.fecha,
            'asunto_cita':this.asunto,
            'idProceso':this.idProceso,
            'idCita':this.idCita,
            }
      if( this.tipo == 'EDITAR' ){
        this.editar(obj)
      } else{
        this.agregar(obj)
      }
    },
    traerTramites(){
      // tramites
      postFetch( ruta_servidor+'citas/tramites', null  )
        .then((res)=>{
            console.log(res)
             if( res.status  == 200 ){
               let procesos = res.procesos
               procesos.forEach(element => {
                  this.listaProcesos.push({
                    label: (element.nombre + ' '+element.apellido1 +' ('+ element.fecha +')'),
                    value:element.cod_proceso
                  })
               });
             }
        })
        .catch((err)=>{
           this.abrirError(err)
        })
    },
    traerDatos(){
        let obj={ 'idCita':this.idCita }
        postFetch( ruta_servidor+'citas/buscar', obj  )
        .then((res)=>{
            console.log(res)
             if( res.status  == 200  ){
                this.asunto = res.cita.asunto
                this.direccion = res.cita.direccion
                this.fecha  = res.cita.fecha
                this.idProceso = res.cita.proceso_id
             }
        })
        .catch((err)=>{
           this.abrirError(err)
        })
    },
    agregar(obj){
        postFetch( ruta_servidor+'citas/store',obj )
          .then((res)=>{
            console.log( res );
            this.listaerrores = []
              if(res.status == 422){
                  this.listaerrores =  res.errors
              }else{
                  this.abrirOk('El registro se guardo correctamente.')
              }
          })
          .catch((err)=>{
            this.abrirError(err.message)
          })
    },
    editar( obj ){
      postFetch( ruta_servidor+'citas/update',obj )
          .then((res)=>{
            console.log( res );
            this.listaerrores = []
              if(res.status == 422){
                  this.listaerrores =  res.errors
              }else{
                  this.abrirOk('El registro se actualizado correctamente.')
              }
          })
          .catch((err)=>{
            this.abrirError(err.message)
          })

    },
    cerrarOk(){
      this.modal_ok = false
      this.$emit('cerrarModalCita')
    },
    abrirOk(mensaje_modal){
       this.mensaje = mensaje_modal
      this.modal_ok = true
    },
    cerrarError(){
      this.modal_error = false
    },
    abrirError(mensaje_modal){
      this.mensaje = mensaje_modal
      this.modal_error = true
    }

  },
  props:{
    tipo:{
      type:String,
    },
    id:{
     required:false,
    }
  }

}
</script>
