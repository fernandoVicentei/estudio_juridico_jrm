<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardBody>
          <strong>Gestion de Tramites</strong>
          <div class="row" >
              <div class="col-md-4 mt-4 mb-1" >
                <button  class="btn btn-info text-light" @click="registrarTramite()">Iniciar Tramite</button>
              </div>
              <div class="col-md-12  " >
                  <div class="table-responsive" >
                      <table class="table" >
                          <thead class="bg-info text-light" >
                              <tr>
                                <th>Cod</th>
                                <th>Abogado (Asignado)</th>
                                <th>Cliente</th>
                                <th>Fecha Iniciada</th>
                                <th>Descripcion</th>
                                <th>Estado</th>
                                <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(tramite) in listaTramites " :key="tramite.id" >
                                  <td>{{  tramite.id }}</td>
                                  <td>{{  tramite.abogado  }} </td>
                                  <td>{{ tramite.cliente }}</td>
                                  <td> {{  tramite.fecha }} </td>
                                  <td> {{ tramite.hechosOcurridos }} </td>
                                  <td>
                                    <CBadge color="success" v-if="tramite.estado==1"  >ACTIVO</CBadge>
                                    <CBadge color="danger" v-else  >INACTIVO</CBadge>
                                  </td>
                                  <td>
                                    <button class="btn btn-warning" @click="editarTramite(tramite.id)"  >
                                      <CIcon :icon="cilClipboard" size="md"   />
                                    </button>
                                    <button class="btn btn-danger" @click="abrirModal('ELIMINAR',tramite.id)" >
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



</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilList, cilShieldAlt , cilTrash  , cilClipboard} from '@coreui/icons';
import { ruta_servidor , postFetch  } from '../../helpers/contantes.js'
import Modal from './componentes/modal.vue'

export default {
  name: 'Tramites',
  components: {
    CIcon,
    Modal
  },
  data(){
    return {
      cilList,cilShieldAlt, cilTrash , cilClipboard,
      listaTramites:[],
      mostrarModal:false,
      tipoAccion:'',
      idAbg:'',
      tituloModal:''
    };
  },
  mounted(){
    this.retornarTramites()
  },
  methods: {
      retornarTramites(){
          postFetch( ruta_servidor+'tramite/listar', null )
          .then(res=>{
            console.log( res)
            this.listaTramites = res.tramites
          })
          .catch(err=>{
            console.log(err);
          })
      },
      abrirModal(tipo,id)
      {
        if( tipo=='AGREGAR' ){
          this.tituloModal='NUEVO REGISTRO'
        }else{
          this.tituloModal='EDITAR REGISTRO'
        }
        this.tipoAccion = tipo
        this.idAbg =  id
        this.mostrarModal = true
      },
      editarTramite(id){
        this.$router.push(`/tramites/actualizar/${id}`);
      },
      cerrarModal(){
        this.mostrarModal= false
        this.retornarClientes()
      },
      registrarTramite(){
        this.$router.push('/tramites/registrar');
      },
  },
}
</script>
