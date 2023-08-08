<template>
   <div class="row" >
    <div class="col-md-12" >
        <strong>El registro con el codigo {{ idTTramite }} ¿Desea eliminarlo?</strong>
    </div>
    <div class="col-md-12 mt-3 mb-3 d-flex justify-content-end" >
      <CButton color="secondary" class="text-light"  @click="$emit('cerrarModal')">
        Cancelar
      </CButton>
      <button class="btn btn-info text-light" type="submit"  @click="eliminar()" >Aceptar</button>
    </div>
   </div>

   <ModalOk  @cerrarModalOk="cerrarOk()" v-if="modal_ok" :estado="modal_ok" :mensaje="mensaje"   />
  <ModalError  @cerrarModalError="cerrarError()" v-if="modal_error" :estado="modal_error" :mensaje="mensaje"   />


</template>

<script>
import { ruta_servidor , postFetch  } from '../../../helpers/contantes.js'
import ModalOk from '../../componentes/modalOk.vue'
import ModalError from '../../componentes/modalError.vue'

export default {
  name:'Eliminar',
  components:{
    ModalError,
    ModalOk
  },
  data(){
    return {
      idTTramite:'',
      modal_ok:false,
      modal_error:false,
      mensaje:'',
    };
  },
  mounted() {
    this.idTTramite = this.id
  },
  methods:{
      eliminar(){
          let obj= { 'id': this.idTTramite }
          postFetch( ruta_servidor +'tipotramites/eliminar' , obj )
          .then((res)=>{
              if(res.status == 422){
                this.mensaje = res.errors[0]
                this.abrirError()
              }else{
                 if(res.success){
                    this.mensaje  = res.mensaje
                    this.abrirOk()
                 }else{
                    this.mensaje = 'Ocurrio un problema al desabilitar el registro. Intentelo nuevamente'
                    this.abrirError()
                 }
              }
          })
          .catch((err)=>{

          })
      },
      cerrarOk(){
      this.modal_ok = false
      this.$emit('cerrarModal')
      },
      abrirOk( ){
        this.modal_ok = true
      },
      cerrarError(){
        this.modal_error = false

      },
      abrirError(){
        this.modal_error = true
      }

  },
  props:{
    id:{
      require:true
    }
  }
}

</script>
