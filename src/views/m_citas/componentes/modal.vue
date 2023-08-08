<template>
  <CModal backdrop="static" :visible="vermodal" @close="$emit('cerrarModalCita')">
    <CModalHeader>
      <CModalTitle>{{ tituloModal }}</CModalTitle>
    </CModalHeader>
    <CModalBody>

        <Reunion  @cerrarModalCita="cerrarModal()"
          :id="idCita"
          v-if=" tipoAccion == 'AGREGAR' || tipoAccion == 'EDITAR' "
          :tipo="tipoAccion"  />

        <Eliminar
          :id="idCita"
          @cerrarModalEliminar="cerrarModal()"
          v-if=" tipoAccion != 'AGREGAR' && tipoAccion != 'EDITAR' "  />

    </CModalBody>

  </CModal>
</template>

<script>

import Reunion from './cita.vue'
import Eliminar from './eliminar.vue'


export default {
  name: 'Modal',
  components:{
    Reunion,
    Eliminar,
  },
  data(){
    return {

    };
  },
  methods:{
    cerrarModal(){
      this.$emit('cerrarModalCita')
    },
  },
  props:{
    vermodal:{
      required: true,
    },
    tituloModal:{
      type:String,
    },
    idCita:{
      required: false,
    },
    tipoAccion:{
      type:String,
    }

  }
}
</script>

