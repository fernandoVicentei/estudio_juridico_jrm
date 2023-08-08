<template>
  <CModal backdrop="static" :visible="vermodal" @close="$emit('cerrarModalJuzgado')">
    <CModalHeader>
      <CModalTitle>{{ tituloModal }}</CModalTitle>
    </CModalHeader>
    <CModalBody>

        <Abogado  @cerrarModalJzg="cerrarModal()"
          :id="idJuzgado"
          v-if=" tipoAccion == 'AGREGAR' || tipoAccion == 'EDITAR' "
          :tipo="tipoAccion"  />

        <Eliminar
          :id="idJuzgado"
          @cerrarModalEliminar="cerrarModal()"
          v-if=" tipoAccion != 'AGREGAR' && tipoAccion != 'EDITAR' "  />

    </CModalBody>

  </CModal>
</template>

<script>

import Abogado from './juzgado.vue'
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
      this.$emit('cerrarModalJuzgado')
    },
  },
  props:{
    vermodal:{
      required: true,
    },
    tituloModal:{
      type:String,
    },
    idJuzgado:{
      required: false,
    },
    tipoAccion:{
      type:String,
    }

  }
}
</script>

