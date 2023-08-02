<template>

    <form >
        <div class="row" >
          <div class="col-md-12" >
            <label for="">Nombre</label>
          </div>
          <div class="col-md-12" >
              <input type="text" class="form-control"  v-model="nombre"  required>
          </div>
          <div class="col-md-12" >
            <label for="">Descripcion</label>
          </div>
          <div class="col-md-12" >
              <textarea class="form-control" cols="30" rows="2" v-model="descripcion"  required></textarea>
          </div>
          <div class="col-md-6 row" >
            <div class="col-md-12" >
              <label for="">Precio</label>
            </div>
            <div class="col-md-12" >
              <input type="number" class="form-control" v-model="precio" required >
            </div>
          </div>

          <div class="mt-3 mb-2" >
            <ul>
                <li   v-for="(error , i) in listaerrores" :key="i" class="text-danger">{{ error }}</li>
            </ul>
          </div>

        <div class="col-md-12 mt-2 mb-3 d-flex justify-content-end" >
            <button class="btn btn-secondary text-light"  @click="$emit('cerrarModal')" >Cancelar</button>
            <button class="btn btn-info text-light" type="submit" >Guardar</button>
        </div>

        </div>
    </form>

</template>

<script>

export default {
  name:'RTTramite',
  components:{

  },
  data(){
    return {
      nombre:'',
      descripcion:'',
      precio:'',
      listaerrores:[],

    }
  },
  methods:{

  },
  props:{
    tramiteId:{
      type:Number,
      required:false,
    },


  },


}

</script>
