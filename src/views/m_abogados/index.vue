<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardBody>
          <strong>Gestion de Abogados</strong>
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
                                    <button class="btn btn-warning" @click="abrirModal('EDITAR',abogado.id)"  >
                                      <CIcon :icon="cilClipboard" size="md"   />
                                    </button>
                                    <button class="btn btn-danger" >
                                      <CIcon :icon="cilTrash" size="md" @click="abrirModal('ELIMINAR',abogado.id)" />
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

  <Modal :vermodal="mostrarModal"
    :listaTipos="listaTipoPersonas"
    :idAbogado="idAbg"
    :tituloModal="tituloModal"
    :tipoAccion="tipoAccion"
     @cerrarModalAbogado="cerrarModal()"  />

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
      listaTipoPersonas:[],
      mostrarModal:false,
      tipoAccion:'',
      idAbg:'',
      tituloModal:''
    };
  },
  mounted(){
    this.retornarAbogados()
    this.retornarTipoPersonas()
  },
  methods: {
      retornarAbogados(){
          postFetch( ruta_servidor+'abogados/retornarAbogados', null )
          .then(res=>{
            console.log( res)
             this.listaAbogados =  res.abogados
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
        this.retornarAbogados()
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
