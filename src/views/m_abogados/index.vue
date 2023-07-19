<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardBody>
          <strong>Gestion de abogados</strong>
          <div class="row" >
              <div class="col-md-4 mt-4 mb-1" >
                <button  class="btn btn-info text-light" @click="() => { mostrarModal = true }">Agregar</button>
              </div>
              <div class="col-md-12  " >
                  <div class="table-responsive" >
                      <table class="table" >
                          <thead class="bg-info text-light" >
                              <tr>
                                <th>Cod</th>
                                <th>Nombre Completo</th>
                                <th>Carnet</th>
                                <th>Celular/Telefono</th>
                                <th>Estado Civil</th>
                                <th>Codigo de acceso</th>
                                <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(abogado, i) in listaAbogados" :key="abogado.id" >
                                  <td>{{  i+1 }}</td>
                                  <td>{{  abogado.nombre  }} {{ abogado.appaterno  }} {{ abogado.apmaterno }}</td>
                                  <td>{{ abogado.carnet }}</td>
                                  <td> {{  abogado.celular }} </td>
                                  <td> {{ abogado.estadocivil }} </td>
                                  <td> {{  abogado.codigo }} </td>
                                  <td>
                                    <button class="btn btn-warning">
                                      <CIcon :icon="cilClipboard" size="md"   />
                                    </button>
                                    <button class="btn btn-danger" >
                                      <CIcon :icon="cilTrash" size="md"  />
                                    </button>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <Modal :vermodal="mostrarModal" @cerrarModalAbogado="cerrarModal()"  />

</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilList, cilShieldAlt , cilTrash  , cilClipboard} from '@coreui/icons';
import { ruta_servidor , postFetch  } from '../../helpers/contantes.js'
import Modal from './componentes/modal.vue'

export default {
  name: 'Abogados',
  components: {
    CIcon,
    Modal
  },
  data(){
    return {
      cilList,cilShieldAlt, cilTrash , cilClipboard,
      listaAbogados:[],
      mostrarModal:false,
    };
  },
  mounted(){
    this.retornarAbogados()
  },
  methods: {
      retornarAbogados(){
          postFetch( ruta_servidor+'abogados/retornarabogados', null )
          .then(res=>{
            console.log( res)
             this.listaAbogados =  res.abogados
          })
          .catch(err=>{
            console.log(err);
          })
      },
      cerrarModal(){
        this.mostrarModal= false
      },

  },


}
</script>
