<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardBody>
          <strong>Gestion de Tipo de trámites</strong>
          <div class="row" >
              <div class="col-md-4 mt-4 mb-1" >
                <button  class="btn btn-info text-light" @click="registrarTipoTramite('Registrar Tipo Tramite')">Iniciar Tramite</button>
              </div>
              <div class="col-md-12  " >
                  <div class="table-responsive" >
                      <table class="table" >
                          <thead class="bg-info text-light" >
                              <tr>
                                <th>Cod</th>
                                <th>Nombre </th>
                                <th>Descripcion</th>
                                <th>Precio Inicial</th>
                                <th>Estado</th>
                                <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr  v-for="(ttramite) in listaTipoTramites" :key="ttramite.id">
                                <td> {{ ttramite.id }} </td>
                                <td> {{ ttramite.proceso }}  </td>
                                <td> {{ ttramite.descripcion }} </td>
                                <td class="" >
                                    <CBadge v-if="ttramite.precioinicial<=0"  color="warning">
                                        {{ ttramite.precioinicial }} bs.
                                    </CBadge>
                                    <CBadge v-else color="success">
                                        {{ ttramite.precioinicial }} bs.
                                    </CBadge>
                                </td>
                                <td>
                                  <CBadge v-if="ttramite.estado==0"  color="danger">
                                        INACTIVO
                                    </CBadge>
                                    <CBadge v-else color="info">
                                        ACTIVO
                                    </CBadge>

                                </td>
                                <td>
                                    <button class="btn btn-warning"   @click="editarTramite(ttramite.id)"  >
                                      <CIcon :icon="cilClipboard" size="md"    />
                                    </button>
                                    <button class="btn btn-danger" @click="eliminarTTamite(ttramite.id)"   >
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
    :idTTtramite="idTTramite"
    :tituloModal="tituloModal"
    :verModal="mostrarModal"
    @cerrarModalTTramite="cerrarModal()"  />

</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilList, cilShieldAlt , cilTrash  , cilClipboard} from '@coreui/icons';
import { ruta_servidor , postFetch  } from '../../helpers/contantes.js'
import Modal from './componentes/modal.vue'

export default {
  name :'TTramite',
  components:{
    Modal ,
    CIcon,
  },
  data(){
    return {
      cilList,cilShieldAlt, cilTrash , cilClipboard,
      listaTipoTramites:[],
      mostrarModal:false,
      tipoAccion:'',
      idTTramite:'',
      tituloModal:'',
    }
  },
  mounted(){
    this.retornarDatos()
  },
  methods:
  {
      retornarDatos()
      {
        postFetch( ruta_servidor + 'tipotramites/retornartipotramite' )
        .then(res=>{
            if( res.status == 200 ){
              this.listaTipoTramites = res.tipotramites
            }else{

            }
        })
        .catch((e)=>{
            console.log(e)
        })
      },

      registrarTipoTramite(titulo)
      {
          this.abrirModal(titulo)
      },
      eliminarTTamite(idTT){
        this.idTTramite = idTT
          this.abrirModal('Eliminar Registro')
      },
      editarTramite(idTT)
      {
        this.idTTramite = idTT
        this.abrirModal('Editar Tipo de tramite')
      },
      abrirModal(titulo){
         this.tituloModal= titulo
         this.mostrarModal = true
      },
      cerrarModal(){
        this.mostrarModal = false
        this.tituloModal = 'Registrar Tipo Tramite'
        this.retornarDatos()
      }


  }
}

</script>
