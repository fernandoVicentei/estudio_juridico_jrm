<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardBody>
          <strong>Gestion de Juzgados </strong>
          <div class="row" >
              <div class="col-md-4 mt-4 mb-1" >
                <button  class="btn btn-info text-light" @click="abrirModal( 'AGREGAR' ,0)">Agregar</button>
              </div>
              <div class="col-md-12  " >
                  <div class="table-responsive" >
                      <table class="table" >
                          <thead class="bg-info text-light" >
                              <tr>
                                <th>Cod</th>
                                <th>Nombre Entidad</th>
                                <th>Direccion</th>
                                <th>Estado</th>
                                <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(juzgado, i) in listaJuzgados" :key="juzgado.id" >
                                  <td>{{  i+1 }}</td>
                                  <td>{{  juzgado.nombre  }} </td>
                                  <td>{{ juzgado.direccion}}</td>
                                  <td>
                                      <CBadge v-if="juzgado.estado==0"  color="danger">
                                          INACTIVO
                                      </CBadge>
                                      <CBadge v-else color="info">
                                          ACTIVO
                                      </CBadge>
                                  </td>
                                  <td>
                                    <button class="btn btn-warning" @click="abrirModal('EDITAR',juzgado.id)"  >
                                      <CIcon :icon="cilClipboard" size="md"   />
                                    </button>
                                    <button class="btn btn-danger" @click="abrirModal('ELIMINAR',juzgado.id)" >
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

  <Modal
    :vermodal="mostrarModal"
    :idJuzgado="idJuzgados"
    :tituloModal="tituloModal"
    :tipoAccion="tipoAccion"
     @cerrarModalJuzgado="cerrarModal()"  />

</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilList, cilShieldAlt , cilTrash  , cilClipboard} from '@coreui/icons';
import { ruta_servidor , postFetch  } from '../../helpers/contantes.js'
import Modal from './componentes/modal.vue'

export default {
  name: 'Juzgados',
  components: {
    CIcon,
    Modal
  },
  data(){
    return {
      cilList,cilShieldAlt, cilTrash , cilClipboard,
      listaJuzgados:[],
      mostrarModal:false,
      tipoAccion:'',
      idJuzgados:'',
      tituloModal:''
    };
  },
  mounted(){
    this.retornarJuzgados()
  },
  methods: {
      retornarJuzgados(){
          postFetch( ruta_servidor+'juzgado/retornarjuzgados', null )
          .then(res=>{
            this.listaJuzgados =  res.juzgados
          })
          .catch(err=>{
            console.log(err);
          })
      },
      abrirModal(tipo,id){
        if( tipo=='AGREGAR' ){
          this.tituloModal='NUEVO REGISTRO'
        }else if(  tipo=='EDITAR' ){
          this.tituloModal='EDITAR REGISTRO'
        }else{
          this.tituloModal = 'ELIMINAR REGISTRO'
        }
        this.tipoAccion = tipo
        this.idJuzgados =  id
        this.mostrarModal = true
      },
      cerrarModal(){
        this.mostrarModal= false
        this.retornarJuzgados()
      },


  },


}
</script>
