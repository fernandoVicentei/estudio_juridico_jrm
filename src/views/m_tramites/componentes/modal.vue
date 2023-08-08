<template>
    <CModal backdrop="static" :visible="verModal" @close="$emit('cerrarModalTTramite')">
    <CModalHeader>
      <CModalTitle>{{ tituloModal }}</CModalTitle>
    </CModalHeader>
    <CModalBody>

      <RTTramite :tramiteId="idTTtramite"  @cerrarModal="cerrarMTTramite()" v-if="tituloModal!= 'Eliminar Registro'"  />

      <Eliminar :id="idTTtramite"  @cerrarModal="cerrarMTTramite()" v-if="tituloModal == 'Eliminar Registro'" />


    </CModalBody>
  </CModal>
</template>

<script>
import RTTramite from './registrarttramite.vue'
import Eliminar from './eliminar.vue'

export default {
  name:'Modal',
  components:{
    RTTramite,
    Eliminar
  },
  data(){
    return{

    };
  },
  mounted(){

  },
  methods:{
      cerrarMTTramite(){
          this.$emit('cerrarModalTTramite')
      }
  },
  props:{
    tituloModal:{
      type:String,
      required:false,
    },
    verModal:{
      type:Boolean,
      required:true,
    },
    idTTtramite:{
      type:Number,
      required:false,
    },


  }

}

</script>
