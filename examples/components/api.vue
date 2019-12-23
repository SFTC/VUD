<template>
  <div class="api">
    <div  v-for="(item,index) in tableDataList" :key="index">
      <section class="markdown api-container">
        <h2 class="p-10"><span>{{item.name}}</span></h2>
        <ul v-if="item.rules">
          <li v-for="(it,i) in item.rules" :key="i">{{it}}</li>
        </ul>
        <p>{{item.introduce}}</p>
      </section>
      <el-table
        v-if="item.type==='API'"
        :data="item.tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="attr"
          label="参数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="introduce"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="option"
          label="可选值">
          <template slot-scope="scope">
            {{scope.row.option || '-'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="default"
          label="默认值">
          <template slot-scope="scope">
            {{scope.row.default || '-'}}
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="item.type==='Events'"
        :data="item.tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="事件名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="introduce"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="arguments"
          label="回调参数">
          <template slot-scope="scope">
            {{scope.row.arguments || '-'}}
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="item.type==='Slot'"
        :data="item.tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="插槽名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="introduce"
          label="说明">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {
  name: 'api',
  props: {
    apiIntroduce: {
      type: Object,
      default () {
        return {
          name: 'API',
          introd: '适用平台：VUE移动端项目'
        }
      }
    },
    tableDataList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      introduce: {
      }
    }
  }
}
</script>

<style scoped>
.p-10{
  padding: 10px 0;
}
</style>
