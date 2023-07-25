<template>
    <CModal backdrop="static" alignment="center" :visible="visible" @close="$emit('cerrarModalOk')">
    <CModalHeader>
      <CModalTitle>INFORMACION</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <div class="col-md-12" >
          {{ mensaje }}
        </div>

    </CModalBody>
    <CModalFooter>
      <CButton class="btn btn-info"  @click="$emit('cerrarModalOk')"   >Ok</CButton>
  </CModalFooter>

  </CModal>
</template>

<script>
export default {

  name:'ModalOk',
  data(){
    return {
      visible:false
    };
  },
  mounted(){
    this.visible =  this.estado
  },
  methods:{
  },
  props:{
    estado:{
      type:Boolean,
      required:true
    },
    mensaje:{
      type:String
    }
  }


}

</script>
