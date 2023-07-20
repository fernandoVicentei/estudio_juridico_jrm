<template>
  <CModal backdrop="static " alignment="center" :visible="visible" @close="$emit('cerrarModalError')">
  <CModalHeader class="bg-danger text-light" >
    <CModalTitle>INFORMACION</CModalTitle>
  </CModalHeader>
  <CModalBody>
      <div class="col-md-12" >
        {{ mensaje }}
      </div>

  </CModalBody>
  <CModalFooter>
    <CButton class="btn btn-danger text-light"  @click="$emit('cerrarModalError')"   >Ok</CButton>
</CModalFooter>

</CModal>
</template>

<script>
export default {

name:'ModalError',
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
