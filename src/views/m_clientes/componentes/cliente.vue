<template>
  <form  @submit="enviarformulario" >
      <div class="row">
        <div class="col-md-12" >
          <label for="">Nombres</label>
        </div>
        <div class="col-md-12" >
          <input type="text" class="form-control" required v-model="nombres" >
        </div>
        <div class="col-md-6 row" >
          <div class="col-md-12" >
            <label for="">Apellido Paterno</label>
          </div>
          <div class="col-md-12" >
            <input type="text" class="form-control" v-model="appaterno"  required >
          </div>
        </div>
        <div class="col-md-6 row" >
          <div class="col-md-12" >
            <label for="">Apellido Materno</label>
          </div>
          <div class="col-md-12" >
            <input type="text" class="form-control" v-model="apmaterno" required >
          </div>
        </div>
        <div class="col-md-6 row" >
          <label for="">CI</label>
          <input type="number" class="form-control" v-model="ci"  required >
        </div>
        <div class="col-md-6 row" >
          <label for="">Celular</label>
          <input type="number" class="form-control" v-model="celular"  required >
        </div>
        <div class="col-md-12" >
            <label for="">Direccion</label>
            <input type="text" class="form-control"  v-model="direccion" required >
        </div>
        <div class="col-md-6" >
          <label for="">Fecha de nacimiento</label>
          <input type="date" class="form-control"  v-model="fechanacimiento" required >
        </div>

        <div class="col-md-6" >
          <label for="">Genero</label>
          <select  class="form-select"  v-model="genero" required >
              <option value="" selected disabled>Selecciona una opcion</option>
              <option value="1">Masculino</option>
              <option value="0">Femenino</option>
          </select>
        </div>

        <div class="col-md-6" >
          <label for="">Estado civil</label>
          <select  class="form-select"  v-model="estadocivil"  required>
              <option value="" selected disabled>Selecciona una opcion</option>
              <option value="1">Casado</option>
              <option value="2">Soltero </option>
              <option value="3">Divorciado</option>
              <option value="4">Viudo</option>
          </select>
        </div>

        <div class="col-md-6" >
          <label for="">Tipo Persona</label>
          <select   v-model="tipopersona" class="form-select" >
            <option value="" selected disabled>Seleccione una opcion</option>
              <option  v-for="tipo in listaTipoPersona" :value="tipo.id" :key="tipo.id">
                  {{  tipo.tipo  }}
              </option>
          </select>
        </div>

        <div class="col-md-6" v-if="tipo=='EDITAR'"  >
          <label for="">Estado</label>
          <select class="form-select"  v-model="estado" required>
            <option value="1">ACTIVO</option>
            <option value="0">INACTIVO</option>
          </select>
        </div>

        <div class="mt-3 mb-3" >
            <ul>
                <li   v-for="(error , i) in listaerrores" :key="i" class="text-danger">{{ error }}</li>
            </ul>
        </div>

        <div class="col-md-12 mt-3 mb-3 d-flex justify-content-end" >
          <CButton color="secondary" class="text-light"  @click="$emit('cerrarModalCli')">
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
  name:'Cliente',
  components:{
    ModalOk,
    ModalError
  },
  data(){
    return {
      nombres:'',
      appaterno:'',
      apmaterno:'',
      ci:'',
      celular:'',
      direccion:'',
      fechanacimiento:'',
      genero:'',
      estadocivil:'',
      codigoacceso:'',
      tipopersona:'',
      listaerrores:[],
      modal_ok:false,
      modal_error:false,
      mensaje:'',
      idCli:'',
      idPersona:'',
      estado:''
    };
  },
  mounted(){
    console.log(this.id)
    if( this.tipo == 'EDITAR' ){
      this.idCli =  this.id
      this.traerDatos()
    }
  },
  methods:{
    enviarformulario(e){
      e.preventDefault();
      if( this.validarCampos() )
      {

          let obj ={
            'nombre':this.nombres ,
            'apellido1':  this.appaterno  ,
            'apellido2': this.apmaterno  ,
            'cedula': this.ci  ,
            'celular':  this.celular ,
            'direccion':  this.direccion ,
            'fechaNacimiento':   this.fechanacimiento ,
            'genero': this.genero  ,
            'estadocivil': this.estadocivil ,
            'tipopersona':  this.tipopersona ,
            'codigo': this.codigoacceso  ,
            'id': this.idCli ,
            'idpersona': this.idPersona  ,
            'estado':this.estado==''?1:this.estado,
            }
          if( this.tipo == 'EDITAR' ){
            this.editar(obj)
          } else{
            this.agregar(obj)
          }
      }else{
      }
    },
    traerDatos(){
          let obj={ 'id':this.idCli }
        postFetch( ruta_servidor+'clientes/buscar', obj  )
        .then((res)=>{
            console.log(res)
             if( res.success ){
                let datos = res.cliente
                this.nombres = datos.nombre
                this.appaterno = datos.appaterno
                this.apmaterno = datos.apmaterno
                this.ci = datos.cedula
                this.celular = datos.celular
                this.direccion = datos.direccion
                this.fechanacimiento = datos.fechaNacimiento
                this.genero = datos.genero
                this.estadocivil = datos.estadocivil
                this.tipopersona = datos.tipopersona_id
                this.codigoacceso = datos.codigo_acceso
                this.idPersona= datos.persona_id
                this.estado = datos.estado
             }
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    agregar(obj){
        postFetch( ruta_servidor+'clientes/agregar',obj )
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
      postFetch( ruta_servidor+'clientes/actualizar',obj )
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
    validarCampos(){
      if(  this.nombres!='' && ( this.appaterno!='' || this.apmaterno != '' ) && this.ci !='' &&
          this.celular != '' && this.direccion != '' && this.fechanacimiento != ''
      ){
        return true
      }else{
        return false
      }
    },
    cerrarOk(){
      this.modal_ok = false
      this.$emit('cerrarModalCli')
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
    listaTipoPersona:{
      type:Array,
    },
    tipo:{
      type:String,
    },
    id:{
     required:false,
    }
  }

}
</script>
