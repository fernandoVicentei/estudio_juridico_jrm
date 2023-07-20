<template>
  <CModal backdrop="static" :visible="vermodal" @close="$emit('cerrarModalCliente')">
    <CModalHeader>
      <CModalTitle>{{ tituloModal }}</CModalTitle>
    </CModalHeader>
    <CModalBody>

       <Cliente  @cerrarModalCli="cerrarModal()"
        :id="idCliente"
        v-if=" tipoAccion == 'AGREGAR' || tipoAccion == 'EDITAR' "
        :listaTipoPersona="listaTipos" :tipo="tipoAccion"  />


      <Eliminar
        :id="idCliente"
        @cerrarModalEliminar="cerrarModal()"
        v-if=" tipoAccion != 'AGREGAR' && tipoAccion != 'EDITAR' "  />

    </CModalBody>

  </CModal>
</template>

<script>
import Cliente from './cliente.vue'
import Eliminar from './eliminar.vue'


export default {
  name: 'Modal',
  components:{
    Cliente,
    Eliminar,
  },
  data(){
    return {
      idCli:''
    };
  },
  mounted(){

    this.idCli = this.idCliente
    
  },
  methods:{
    cerrarModal(){
      this.$emit('cerrarModalCliente')
    },
  },
  props:{
    vermodal:{
      required: true,
    },
    tituloModal:{
      type:String,
    },
    listaTipos:{
      type:Array
    },
    idCliente:{
      required: false,
    },
    tipoAccion:{
      type:String,
    }

  }
}
</script>

