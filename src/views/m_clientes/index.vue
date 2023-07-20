<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardBody>
          <strong>Gestion de Clientes</strong>
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
                                <th>Nombre Completo</th>
                                <th>Carnet</th>
                                <th>Celular/Telefono</th>
                                <th>Estado Civil</th>
                                <th>Estado</th>
                                <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(cliente, i) in listaClientes " :key="cliente.id" >
                                  <td>{{  i+1 }}</td>
                                  <td>{{  cliente.nombre  }} {{ cliente.appaterno  }} {{ cliente.apmaterno }}</td>
                                  <td>{{ cliente.carnet }}</td>
                                  <td> {{  cliente.celular }} </td>
                                  <td> {{ cliente.estadocivil }} </td>
                                  <td>
                                    <CBadge color="success" v-if="cliente.estado==1"  >ACTIVO</CBadge>
                                    <CBadge color="danger" v-else  >INACTIVO</CBadge>
                                  </td>
                                  <td>
                                    <button class="btn btn-warning" @click="abrirModal('EDITAR',cliente.id)"  >
                                      <CIcon :icon="cilClipboard" size="md"   />
                                    </button>
                                    <button class="btn btn-danger" >
                                      <CIcon :icon="cilTrash" size="md" @click="abrirModal('ELIMINAR',cliente.id)" />
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
    :listaTipos="listaTipoPersonas"
    :idCliente="idAbg"
    :tituloModal="tituloModal"
    :tipoAccion="tipoAccion"
     @cerrarModalCliente="cerrarModal()"  />

</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilList, cilShieldAlt , cilTrash  , cilClipboard} from '@coreui/icons';
import { ruta_servidor , postFetch  } from '../../helpers/contantes.js'
import Modal from './componentes/modal.vue'

export default {
  name: 'Clientes',
  components: {
    CIcon,
    Modal
  },
  data(){
    return {
      cilList,cilShieldAlt, cilTrash , cilClipboard,
      listaClientes:[],
      listaTipoPersonas:[],
      mostrarModal:false,
      tipoAccion:'',
      idAbg:'',
      tituloModal:''
    };
  },
  mounted(){
    this.retornarClientes()
    this.retornarTipoPersonas()
  },
  methods: {
      retornarClientes(){
          postFetch( ruta_servidor+'clientes/retornarclientes', null )
          .then(res=>{
            console.log( res)
             this.listaClientes =  res.clientes
          })
          .catch(err=>{
            console.log(err);
          })
      },
      abrirModal(tipo,id){

        if( tipo=='AGREGAR' ){
          this.tituloModal='NUEVO REGISTRO'
        }else{
          this.tituloModal='EDITAR REGISTRO'
        }
        this.tipoAccion = tipo
        this.idAbg =  id
        this.mostrarModal = true
      },
      cerrarModal(){
        this.mostrarModal= false
        this.retornarClientes()
      },
      retornarTipoPersonas(){
        postFetch( ruta_servidor+'tipopersona/listado', null )
        .then((res)=>{
          console.log(res);
          if(res.success){
            this.listaTipoPersonas =  res.listado_personas
          }else{

          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }

  },


}
</script>
