<!-- element 文档 https://element.eleme.cn/#/zh-CN/component -->
<template>
    <!-- ！！！！！！请小伙伴在本案例中需要什么就参照，无需全部参照 ！！！！！！ -->
    <div class="reekoTable">
        <el-row type="flex">
            <el-button 
            type="primary" 
            icon="el-icon-plus"
            @click="addVisible = true">添加</el-button>
        </el-row>

        <!-- 表格-start -->
        <!-- 表格使用-文档 https://element.eleme.cn/#/zh-CN/component/table -->
        <!-- border 边框 -->
        <!-- v-loading="loading" 表格加载动画 -->
        <!-- @selection-change="handleSelectionChange" 多选需要添加事件 以此来获取选中的id集 -->
        <!-- :data="tableData" 表格数据 -->
        <!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。 -->
        <el-table
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
        :data="tableData">
            
            <!-- 需要多选添加此el-table-column   在父级el-table添加事件(@selection-change="handleSelectionChange")获取多选-选中数据 案例: 拿取多选id-->
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <!-- 需要多选添加此el-table-column -->

            <el-table-column
            prop="date1"
            label="日期">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    icon="el-icon-edit"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
            
            <!-- 表格自定义列 参考本例的编辑和删除 -->
        <!-- 表格-end -->

        <!-- 分页-start -->
        <!-- 分页使用-文档 https://element.eleme.cn/#/zh-CN/component/pagination -->
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total">
        </el-pagination>
            <!-- background 带背景的分页样式 -->
            <!-- @size-change 页码改变时会触发 -->
            <!-- @current-change 每页显示多少条改变时会触发 -->
            <!-- :page-sizes 每页显示个数选择器的选项设置-数组[] -->
            <!-- :page-size  每页显示条目个数 -->
            <!-- layout 组件布局，子组件名用逗号分隔 total(总条数), sizes(切换显示条数), prev(上一页), pager(页码), next(下一页), jumper(跳转多少页) -->
            <!-- :page-total  总条目数 -->
        <!-- 分页-end -->




        <!-- 添加弹窗 -->
        <el-dialog title="添加数据" :visible.sync="addVisible" width="30%">
            <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->
            <el-form :model="addForm" :rules="rules" ref="ruleAddForm" label-width="100px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date1">
                    <el-date-picker 
                    type="date" 
                    format="yyyy-MM-dd" 
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期" 
                    v-model="addForm.date1" 
                    style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select style="width: 100%" v-model="addForm.gender" placeholder="请选择性别">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限开关" prop="jurisdiction">
                    <el-switch v-model="addForm.jurisdiction"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button @click="submitAdd('ruleAddForm')" type="primary">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog title="编辑数据" :visible.sync="editVisible" width="30%">
            <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->
            <el-form :model="editForm" :rules="rules" ref="ruleEditForm" label-width="100px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date1">
                    <el-date-picker 
                    type="date" 
                    format="yyyy-MM-dd" 
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期" 
                    v-model="editForm.date1" 
                    style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select style="width: 100%" v-model="editForm.gender" placeholder="请选择性别">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限开关" prop="jurisdiction">
                    <el-switch v-model="editForm.jurisdiction"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button @click="submitEdit('ruleEditForm')" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'reekoTable',
  data() { 
    return {
        //// 自定义的数据 能够响应数据变化  通过this可以指向进来  案例: this.total  可以获取到当前页面表格数据的总条数
        loading: true,              //* 加载状态
        pageSize: 1,                //* 每页显示条数
        total: 0,                   //* 表格总条数  
        tableData: [],              //* 表格数据
        multipleSelectionId: [],    //* 多选 - 选中的id
        addVisible: false,          //* 添加功能 - 弹窗状态
        editVisible: false,         //* 编辑功能 - 弹窗状态
        options: [{                 //* 性别数据
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }, {
          value: 3,
          label: '中'
        }],
        // 添加的弹窗的表单数据
        addForm: {
          name: '', // 姓名
          date1: '', // 日期
          gender: '', // 性别
          jurisdiction: false, // 权限开关
        },
        // 编辑的弹窗的表单数据
        editForm: {
          name: '', // 姓名
          date1: '', // 日期
          gender: '', // 性别
          jurisdiction: false, // 权限开关
        },
        // 表单验证 - 校验规则参见 https://github.com/yiminghe/async-validator 或者 https://blog.csdn.net/qq_48169457/article/details/112504594
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          date1: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
        }
    }
  },
  created() { //* 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    /// 这里应该是调用接口获取当前页面所需要的数据 - 本案例：表格的数据
    //// 模拟
    this.tableData = [{id: 1, date1: '2021-04-01', name: '张三',gender: 3}] /// 表格数据-赋值
    this.total = 2 /// 表格总条数-赋值
    setTimeout(() => {  /// 关闭加载  这里为了案例效果使用的延时器 你可以立即执行 this.loading = false
        this.loading = false 
    }, 1000);
    
  },
  methods: { //* 定义方法
        /// 添加-确定添加
        submitAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('验证成功,可以告知后端了',this.addForm)
                    // 调用接口添加
                    //// 模拟
                    this.tableData.push({id: 1, date1: '2021-04-06', name: '张三1',gender: 3})
                    console.log(this.tableData)
                    this.addVisible = false // 关闭弹窗
                    this.$refs[formName].resetFields(); // 重置
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /// 编辑-确定编辑
        submitEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('验证成功,可以告知后端了',this.editForm)
                    // 调用接口编辑
                    this.editVisible = false // 关闭弹窗
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /// 表格-多选 
        handleSelectionChange(val) {
            console.log(val)
            /// 处理数据-拿取id
            for(let list of val){
                this.multipleSelectionId.push(list.id)
            }
        },
        /// 表格-编辑
        handleEdit(index, row) {
            this.editForm = JSON.parse(JSON.stringify(row)); // 深拷贝给弹窗里数据赋值
            this.editVisible = true // 打开编辑弹窗
            console.log(index, row);
        },
        /// 表格-删除
        handleDelete(index, row) {
            console.log(index, row);
            /// row 是当前要删除的完整数据 拿取id传给后台并删除 row.id
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(index,1) /// 删除
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {});
        },
        /// 每页显示多少条变化后
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val /// 改变每页显示条数
        },
        /// 页码发生变化 向后端发送请求获取表格数据-渲染表格数据
        handleCurrentChange(val) {
            // val 是当前页码  this.pageSize 是当前页展示多少条 例：10条
            console.log(`当前第: ${val} 页`,`每页: ${this.pageSize} 条`);

            //// 模拟
            if(val == 1){   /// 第一页数据
                this.tableData = [{id: 1,date1: '2021-04-01',name: '张三',gender: 3}]
            }else{          /// 第二页数据
                this.tableData = [{id: 2,date1: '2021-04-02',name: '李四',gender: 3}]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.reekoTable{padding: 20px;
    .el-table{margin: 20px 0;}
}
</style>
