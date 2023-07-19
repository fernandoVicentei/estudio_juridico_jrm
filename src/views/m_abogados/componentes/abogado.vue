<template>
  <form  @submit="enviarformulario()" >
      <div class="row">
        <div class="col-md-12" >
          <label for="">Nombres</label>
        </div>
        <div class="col-md-12" >
          <input type="text" class="form-control" required v-model="nombres" >
        </div>
        <div class="col-md-6 row" >
          <div class="col-md-12" >
            <label for="">Apellido Paterno</label>
          </div>
          <div class="col-md-12" >
            <input type="text" class="form-control" v-model="appaterno"  required >
          </div>
        </div>
        <div class="col-md-6 row" >
          <div class="col-md-12" >
            <label for="">Apellido Materno</label>
          </div>
          <div class="col-md-12" >
            <input type="text" class="form-control" v-model="apmaterno" required >
          </div>
        </div>
        <div class="col-md-6 row" >
          <label for="">CI</label>
          <input type="number" class="form-control" v-model="ci"  required >
        </div>
        <div class="col-md-6 row" >
          <label for="">Celular</label>
          <input type="number" class="form-control" v-model="celular"  required >
        </div>
        <div class="col-md-12" >
            <label for="">Direccion</label>
            <input type="text" class="form-control"  v-model="direccion" required >
        </div>
        <div class="col-md-6" >
          <label for="">Fecha de nacimiento</label>
          <input type="date" class="form-control"  v-model="fechanacimiento" required >
        </div>

        <div class="col-md-6" >
          <label for="">Genero</label>
          <select  class="form-select"  v-model="genero" required >
              <option value="" selected disabled>Selecciona una opcion</option>
              <option value="">Masculin</option>
              <option value="">Femenino</option>
          </select>
        </div>

        <div class="col-md-6" >
          <label for="">Estado civil</label>
          <select  class="form-select"  v-model="estadocivil"  required>
              <option value="" selected disabled>Selecciona una opcion</option>
              <option value="">Casado</option>
              <option value="">Soltero </option>
              <option value="">Viudo</option>
          </select>
        </div>

        <div class="col-md-6" >
          <label for="">Codigo de acceso</label>
          <input type="text" class="form-control" v-model="codigoacceso" required >
        </div>

        <div class="col-md-12 mt-3 mb-3 d-flex justify-content-end" >
          <CButton color="secondary"  @click="$emit('cerrarModalAbg')">
            Cancelar
          </CButton>
          <button class="btn btn-info" type="submit" >Guardar</button>
        </div>

      </div>
  </form>


</template>
<script>
export default {
  name:'Abogado',
  data(){
    return {
      nombres:'',
      appaterno:'',
      apmaterno:'',
      ci:'',
      celular:'',
      direccion:'',
      fechanacimiento:'',
      genero:'',
      estadocivil:'',
      codigoacceso:''
    };
  },
  methods:{
    enviarformulario(e){
      e.preventDefault();
      alert('hola')
    }
  },
  props:{

  }

}
</script>
