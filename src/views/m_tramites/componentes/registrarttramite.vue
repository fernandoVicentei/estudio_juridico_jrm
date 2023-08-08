<template>
    <form  @submit="enviarFormulario" >
        <div class="row" >
          <div class="col-md-12" >
            <label for="">Nombre</label>
          </div>
          <div class="col-md-12" >
              <input type="text" class="form-control"  v-model="nombre"  required>
          </div>
          <div class="col-md-12" >
            <label for="">Descripcion</label>
          </div>
          <div class="col-md-12" >
              <textarea class="form-control" cols="30" rows="2" v-model="descripcion"  required></textarea>
          </div>
          <div class="col-md-6 row" >
            <div class="col-md-12" >
              <label for="">Precio</label>
            </div>
            <div class="col-md-12" >
              <input type="number" class="form-control" v-model="precio" required >
            </div>
          </div>

          <div class="col-md-12 mt-2" v-if="idTipoTramite!=''"  >
            <span> <strong>Nota: </strong> Al momento de actualizar el registro, se volverá a habilitar para su uso. </span>
          </div>

          <div class="mt-3 mb-2" >
            <ul>
                <li   v-for="(error , i) in listaerrores" :key="i" class="text-danger">{{ error }}</li>
            </ul>
          </div>

        <div class="col-md-12 mt-2 mb-3 d-flex justify-content-end" >
            <button class="btn btn-secondary text-light"  @click="$emit('cerrarModal')" >Cancelar</button>
            <button class="btn btn-info text-light" type="submit" >Guardar</button>
        </div>
        </div>
    </form>

  <ModalOk  @cerrarModalOk="cerrarOk()" v-if="modal_ok" :estado="modal_ok" :mensaje="mensaje"   />
  <ModalError  @cerrarModalError="cerrarError()" v-if="modal_error" :estado="modal_error" :mensaje="mensaje"   />


</template>

<script>

import ModalOk from '../../componentes/modalOk.vue'
import ModalError from '../../componentes/modalError.vue'
import { ruta_servidor , postFetch  } from '../../../helpers/contantes.js'

export default {
  name:'RTTramite',
  components:{
    ModalOk, ModalError
  },
  data(){
    return {
      nombre:'',
      descripcion:'',
      precio:'',
      listaerrores:[],
      modal_ok:false,
      modal_error:false,
      mensaje:'',
      idTramite:0,
    }
  },
  mounted(){
    this.idTramite = this.tramiteId
    if( this.idTramite != '' ){
      this.obtenerDatosTTramite()
    }
  },
  methods:{
        enviarFormulario(e){
          let obj ={
            'nombre':this.nombre ,
            'descripcion':  this.descripcion  ,
            'precio': this.precio ,
            'id': this.idTramite
          }
          if( this.idTramite == '' || this.idTramite == 0 || this.idTramite == null ){
            this.registrarTTramite( obj )
          }else{
            this.editarTTramite( obj )
          }
          e.preventDefault();
        },
        obtenerDatosTTramite(){
            let obj = { 'idTipoTramite': this.idTramite  }
            postFetch( ruta_servidor + 'tipotramites/buscartipotramite', obj )
            .then((e)=>{
                if(e.status == 422){
                  this.listaerrores =  e.errors
                }else{
                  let data =  e.tipotramite
                  this.nombre = data.proceso
                  this.descripcion = data.descripcion
                  this.precio = data.precioinicial
                }
            })
            .catch((e)=>{
              this.abrirError(e.message)
            })
        },
        registrarTTramite(data){
          postFetch( ruta_servidor+'tipotramites/agregar', data )
          .then((res)=> {
            console.log( res );
            this.listaerrores = []
              if(res.status == 422){
                  this.listaerrores =  res.errors
              }else{
                  this.abrirOk('El registro se guardo correctamente.')
              }
          })
          .catch((err)=>  {
            this.abrirError(err.message)
          })
        },
        editarTTramite(data)
        {
          postFetch( ruta_servidor+'tipotramites/actualizar', data )
          .then((res)=> {
            this.listaerrores = []
              if(res.status == 422){
                  this.listaerrores =  res.errors
              }else{
                  this.abrirOk('El registro se actualizo correctamente.')
              }
          })
          .catch((err)=>  {
            this.abrirError(err.message)
          })
        },
        abrirOk(mensaje){
          this.mensaje = mensaje
          this.modal_ok = true
        },
        abrirError(mensaje){
          this.mensaje = mensaje
          this.modal_error= true
        },
        cerrarOk(){
          this.modal_ok = false
          this.$emit('cerrarModal')
        },
        cerrarError(){
          this.modal_error = false
        },

  },
  props:{
    tramiteId:{
      type:Number,
      required:false,
    },


  },


}

</script>
