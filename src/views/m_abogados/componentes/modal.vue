<template>
  <CModal backdrop="static" :visible="vermodal" @close="$emit('cerrarModalAbogado')">
    <CModalHeader>
      <CModalTitle>{{ tituloModal }}</CModalTitle>
    </CModalHeader>
    <CModalBody>

        <Abogado  @cerrarModalAbg="cerrarModal()"  />


    </CModalBody>

  </CModal>
</template>

<script>
import Abogado from './abogado.vue'
export default {
  name: 'Modal',
  components:{
    Abogado
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

  }
}
</script>

