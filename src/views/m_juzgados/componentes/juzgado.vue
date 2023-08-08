<template>
  <form  @submit="enviarformulario" >
      <div class="row">
        <div class="col-md-12" >
          <label for="">Nombre</label>
        </div>
        <div class="col-md-12" >
          <input type="text" class="form-control" required v-model="nombres" placeholder="Nombre"  >
        </div>
        <div class="col-md-12 row" >
          <div class="col-md-12" >
            <label for="">Direccion</label>
          </div>
          <div class="col-md-12" >
            <input type="text" class="form-control" v-model="direccion"  required placeholder="Direccion"  >
          </div>
        </div>
        <div class="col-md-12 mt-2" v-if="idJuzgado !=''"  >
            <span> <strong>Nota: </strong> Al momento de actualizar el registro, se volverá a habilitar para su uso. </span>
          </div>

        <div class="mt-3 mb-3" >
            <ul>
                <li   v-for="(error , i) in listaerrores" :key="i" class="text-danger">{{ error }}</li>
            </ul>
        </div>

        <div class="col-md-12 mt-3 mb-3 d-flex justify-content-end" >
          <CButton color="secondary" class="text-light"  @click="$emit('cerrarModalJzg')">
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
  name:'Abogado',
  components:{
    ModalOk,
    ModalError
  },
  data(){
    return {
      nombres:'',
      direccion:'',
      listaerrores:[],
      modal_ok:false,
      modal_error:false,
      mensaje:'',
      idJuzgado:'',
      idPersona:'',
      estado:''
    };
  },
  mounted(){
    if( this.tipo == 'EDITAR' ){
      this.idJuzgado =  this.id
      this.traerDatos()
    }

  },
  methods:{
    enviarformulario(e){
      e.preventDefault();
      let obj ={
            'nombre':this.nombres ,
            'idJuzgado': this.idJuzgado ,
            'direccion':this.direccion
            }
      if( this.tipo == 'EDITAR' ){
        this.editar(obj)
      } else{
        this.agregar(obj)
      }
    },
    traerDatos(){
        let obj={ 'idJuzgado':this.idJuzgado }
        postFetch( ruta_servidor+'juzgado/buscar', obj  )
        .then((res)=>{
            console.log(res)
             if( res.status  == 200 ){
                this.nombres = res.juzgado.nombre
                this.direccion = res.juzgado.direccion
             }
        })
        .catch((err)=>{
           this.abrirError(err)
        })
    },
    agregar(obj){
        postFetch( ruta_servidor+'juzgado/agregar',obj )
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
      postFetch( ruta_servidor+'juzgado/actualizar',obj )
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
      this.$emit('cerrarModalJzg')
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
