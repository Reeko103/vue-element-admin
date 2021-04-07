<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <h1>这里是admin能看到的首页</h1>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
  },
  data() {
    return {
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
