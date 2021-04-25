<!-- element 文档 https://element.eleme.cn/#/zh-CN/component -->
<template>
    <!-- ！！！！！！本案例是导入和导出 ！！！！！！ -->
    <div class="reekoTable">
        <el-row type="flex">
            <!-- 导入使用-文档 https://element.eleme.cn/#/zh-CN/component/upload -->
            <!-- action 必选参数，导入的地址 -->
            <!-- :limit="1" 最大允许个数 -->
            <!-- :before-upload 上传文件之前的钩子 -->
            <!-- :on-success 文件上传成功时的钩子 -->
            <!-- accept="" 接受上传的文件类型 -->
            <!-- :auto-upload="false" 是否在选取文件后立即进行上传 -->
            <el-upload
            style="margin: 0 20px;"
            class="upload-demo"
            ref="uploadExcel"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            accept=".xlsx"
            :auto-upload="true">
            <el-button type="primary" icon="el-icon-upload2">导入</el-button>
            </el-upload>
            <el-button 
            type="primary" 
            icon="el-icon-download"
            :loading="downloadLoading"
            @click="handleDownload">导出</el-button>
        </el-row>
            
        

        <!-- 表格-start -->
        <!-- 表格使用-文档 https://element.eleme.cn/#/zh-CN/component/table -->
        <el-table
        border
        :data="tableData">
            <el-table-column
            prop="date1"
            label="日期">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名">
            </el-table-column>
        </el-table>
        <!-- 表格-end -->
    </div>
</template>

<script>
export default {
  name: 'reekoTable',
  data() { 
    return {
        //// 自定义的数据 能够响应数据变化  通过this可以指向进来  案例: this.total  可以获取到当前页面表格数据的总条数
        downloadLoading: false,     //* 导出状态
        tableData: [],              //* 表格数据
        fileList: [],               //* 上传的文件列表
    }
  },
  created() { //* 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    /// 这里应该是调用接口获取当前页面所需要的数据 - 本案例：表格的数据
    //// 模拟
    this.tableData = [] /// 表格数据-赋值
    
  },
  methods: { //* 定义方法
        /// 导入 —— 开始 需要根据业务与后端进行处理 本案例{{模拟}}
        beforeUpload(file){
            console.log(file,'文件');
            this.files = file;
            const extension = file.name.split('.')[1] === 'xls'
            const extension2 = file.name.split('.')[1] === 'xlsx'
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!extension && !extension2) {
                this.$message.warning('上传模板只能是 xls、xlsx格式!')
                return
            }
            if (!isLt5M) {
                this.$message.warning('上传模板大小不能超过 5MB!')
                return
            }
            this.fileName = file.name;
            // 模拟数据
            this.tableData = [{id: 1, date1: '2021-04-01', name: '张三',gender: 3}]
            return false; // 返回false不会自动上传
        },
        // 文件上传成功时的钩子-业务处理
        handleSuccess(file, fileList) {
            console.log(file, fileList)
        },
        /// 导入 —— 结束

        /// 导出 —— 开始 需要根据业务与后端进行处理 本案例{{模拟}}
        handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['time', 'avolt', 'bvolt', 'cvolt']   //表头 必填
                const filterVal = ['time', 'avolt', 'bvolt', 'cvolt'] // 数据
                const list = [
                    {time:'1',avolt:'220',bvolt:'220',cvolt:'220'},
                    {time:'2',avolt:'220',bvolt:'220',cvolt:'220'},
                    {time:'3',avolt:'220',bvolt:'220',cvolt:'220'},
                ] // 数据
                const data = this.formatJson(filterVal,list) 
                console.log(data)
                excel.export_json_to_excel({
                    header: tHeader,             //表头 必填
                    data,                        //具体数据 必填
                    filename: '书刊狗贼看什么看', //具体数据 必填
                    autoWidth: true,             //非必填
                    bookType: 'xlsx'             //非必填 xlsx txt csv
                })
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j] ))
        },
        /// 导出 —— 结束
    }
}
</script>

<style lang="scss" scoped>
.reekoTable{padding: 20px;
    .el-table{margin: 20px 0;}
    
}
::v-deep .el-upload-list{display: none;}
</style>
