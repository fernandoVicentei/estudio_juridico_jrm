<template>
  <CModal backdrop="static" :visible="vermodal" @close="$emit('cerrarModalAbogado')">
    <CModalHeader>
      <CModalTitle>{{ tituloModal }}</CModalTitle>
    </CModalHeader>
    <CModalBody>

        <Abogado  @cerrarModalAbg="cerrarModal()"
        :id="idAbogado"
        v-if=" tipoAccion == 'AGREGAR' || tipoAccion == 'EDITAR' "
        :listaTipoPersona="listaTipos" :tipo="tipoAccion"  />

      <Eliminar
        :id="idAbogado"
        @cerrarModalEliminar="cerrarModal()"
        v-if=" tipoAccion != 'AGREGAR' && tipoAccion != 'EDITAR' "  />

    </CModalBody>

  </CModal>
</template>

<script>

import Abogado from './abogado.vue'
import Eliminar from './eliminar.vue'


export default {
  name: 'Modal',
  components:{
    Abogado,
    Eliminar,
  },
  data(){
    return {

    };
  },
  methods:{
    cerrarModal(){
      this.$emit('cerrarModalAbogado')
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
    idAbogado:{
      required: false,
    },
    tipoAccion:{
      type:String,
    }

  }
}
</script>

