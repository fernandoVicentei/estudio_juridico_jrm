<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarBrand class=" pt-3 pb-3 mb-0 p-0" >
      <img  :src="imagen" alt="Imagen" width="100" height="100" class=""/>
      <strong class="m-auto">Estudio Juridico J.R.M.</strong>
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      />
    </CSidebarBrand>

    <AppSidebarNav />
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  data(){
    return {
      imagen:require('@/assets/images/estudiojrm.png'),
    };
  },
  setup() {
    const store = useStore()
    return {
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>
