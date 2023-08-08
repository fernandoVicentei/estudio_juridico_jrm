<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardBody>
          <strong>Gestion de Reuniones </strong>
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
                                <th>Abogado Responsable</th>
                                <th>Cliente</th>
                                <th>Asunto</th>
                                <th>Cod. Proceso</th>
                                <th>Fecha</th>
                                <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(cita, i) in listaCitas" :key="cita.id" >
                                  <td>{{  i+1 }}</td>
                                  <td>{{  cita.nombre_abg  }} {{ cita.ap1_abg }} {{ cita.ap2_abg }}</td>
                                  <td>{{  cita.nombre_cli  }} {{ cita.ap1_cli }} {{ cita.ap2_cli }}</td>
                                  <td>{{ cita.asunto }}</td>
                                  <td>{{ cita.cod_proceso }}</td>
                                  <td>
                                      <CBadge v-if="fechaMayor(cita.fecha)"  color="secondary">
                                          {{ cita.fecha }}
                                      </CBadge>
                                      <CBadge v-else color="info">
                                          {{ cita.fecha }}
                                      </CBadge>
                                  </td>
                                  <td  >
                                      <button class="btn btn-warning" @click="abrirModal('EDITAR',cita.id)"  :disabled="fechaMayor(cita.fecha)"  >
                                      <CIcon :icon="cilClipboard" size="md"   />
                                    </button>
                                    <button class="btn btn-danger text-light" @click="abrirModal('ELIMINAR',cita.id)" >
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
    :idCita="idCita"
    :tituloModal="tituloModal"
    :tipoAccion="tipoAccion"
     @cerrarModalCita="cerrarModal()"  />

</template>

<script>

import { CIcon } from '@coreui/icons-vue';
import { cilList, cilShieldAlt , cilTrash  , cilClipboard} from '@coreui/icons';
import { ruta_servidor , postFetch  } from '../../helpers/contantes.js'
import Modal from './componentes/modal.vue'

export default {
  name: 'Reuniones',
  components: {
    CIcon,
    Modal
  },
  data(){
    return {
      cilList,cilShieldAlt, cilTrash , cilClipboard,
      listaCitas:[],
      mostrarModal:false,
      tipoAccion:'',
      idCita:'',
      tituloModal:''
    };
  },
  mounted(){
    this.retornarCitas()
  },
  methods: {
      fechaMayor(fecha){
        let fechaactual =  new Date();
        let fechacita=  new Date(fecha)
        if( fechacita < fechaactual ){
            return true
        }else{
          return false
        }
      },
      retornarCitas(){
          postFetch( ruta_servidor+'citas/retornar', null )
          .then(res=>{
            this.listaCitas =  res.citas
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
        this.idCita =  id
        this.mostrarModal = true
      },
      cerrarModal(){
        this.mostrarModal= false
        this.retornarCitas()
      },


  },


}
</script>
