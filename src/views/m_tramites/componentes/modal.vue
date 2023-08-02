<template>
    <CModal backdrop="static" :visible="verModal" @close="$emit('cerrarModalTTramite')">
    <CModalHeader>
      <CModalTitle>{{ tituloModal }}</CModalTitle>
    </CModalHeader>
    <CModalBody>

      <RTTramite :tramiteId="idTTramite"  @cerrarModal="cerrarMTTramite()" />

    </CModalBody>
  </CModal>
</template>

<script>
import RTTramite from './registrarttramite.vue'

export default {
  name:'Modal',
  components:{
    RTTramite,
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
