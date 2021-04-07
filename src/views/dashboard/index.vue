<template>
  <div class="dashboard-container">
    <component :is="currentRole" />  
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },  /// 组件
  data() {
    return {
      currentRole: 'adminDashboard', /// 动态组件
    }
  },
  computed: {
    /// 使用对象展开运算符将此对象混入到外部对象中
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    console.log(this.roles,'用户角色')
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
