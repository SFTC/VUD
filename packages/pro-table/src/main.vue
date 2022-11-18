<template>
  <div class="pro-table-container">
    <el-row :gutter="24" style="margin: 0">
      <el-form
        :model="tempFormData"
        ref="formRef"
        v-bind="formConfig"
        label-position="left"
      >
        <el-col
          v-for="{
            type,
            field,
            formSlotName,
            formProps = {},
            formEmits,
            options,
            formName,
            formLabel,
            span,
          } in formColumns"
          :span="span || 8"
          :key="field"
        >
          <el-form-item :label="formLabel" :prop="formName" class="form-item">
            <slot
              v-if="formSlotName"
              class="item-content"
              :name="formSlotName"
              :modelVal="tempFormData[formName]"
            />
            <!-- <slot :name="" > -->
            <template v-else>
              <date-picker
                v-if="type === 'dateRange'"
                :placeholder="`请选择${formLabel}`"
                v-model="tempFormData[formName]"
                v-bind="formProps"
                v-on="formEmits"
                class="item-content"
                style="width: 100%"
                :clearable="
                  formProps.clearable === undefined ? true : formProps.clearable
                "
                size="small"
              />
              <el-select
                v-else-if="type === 'select'"
                :placeholder="`请选择${formLabel}`"
                v-model="tempFormData[formName]"
                v-bind="formProps"
                v-on="formEmits"
                class="item-content"
                filterable
                :clearable="
                  formProps.clearable === undefined ? true : formProps.clearable
                "
                size="small"
              >
                <el-option
                  v-for="{ value, label } in options"
                  :label="label"
                  :value="value"
                  v-bind="options"
                  :key="value"
                />
              </el-select>
              <el-input
                v-else
                v-model="tempFormData[formName]"
                :placeholder="`请输入${formLabel}`"
                class="item-content"
                v-bind="formProps"
                v-on="formEmits"
                :clearable="
                  formProps.clearable === undefined ? true : formProps.clearable
                "
                size="small"
              />
            </template>
            <!-- </slot> -->
          </el-form-item>
        </el-col>
      </el-form>
      <div class="operate-bar">
        <slot
          name="preFormOperate"
          :loading="loading"
          :formData="formData"
          :uploadTable="uploadTable"
          :tableData="tableData"
          :submitForm="selectSubmit"
          :resetForm="resetFormData"
        />
        <el-button
          :loading="loading"
          size="small"
          class="operate-item"
          @click="resetFormData"
        >
          重置
        </el-button>
        <el-button
          :loading="loading"
          type="primary"
          size="small"
          class="operate-item"
          @click="selectSubmit"
        >
          查询
        </el-button>
        <slot
          name="formOperate"
          :loading="loading"
          :formData="formData"
          :uploadTable="uploadTable"
          :tableData="tableData"
          :submitForm="selectSubmit"
          :resetForm="resetFormData"
        />
      </div>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      class="table"
      border
      :row-key="rowKey"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template
        v-for="{
          title,
          field,
          width,
          columnProps,
          columnSlotName,
          hideInTable,
          fixed,
          formatter,
          valueEnum,
        } in columnsOpt"
      >
        <el-table-column
          v-if="!hideInTable"
          :key="field"
          :prop="field"
          :label="title"
          :width="width"
          :fixed="fixed"
          :formatter="
            formatter ||
            (valueEnum && ((row, _t, val) => formatterHandle(val, valueEnum)))
          "
          v-bind="columnProps"
        >
          <template
            v-for="(slotVal, slotKey) in columnSlotName || {}"
            #[slotKey]="scope"
          >
            <slot
              :name="slotVal"
              v-bind="scope"
              :loading="loading"
              :formData="formData"
              :uploadTable="uploadTable"
              :tableData="tableData"
              :submitForm="selectSubmit"
              :resetForm="resetFormData"
            />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      style="float: right; margin-right: -16px; margin-top: 16px"
      background
      :current-page="current"
      :page-size="pageSizeData || pageSize"
      :pager-count="7"
      layout="prev, pager, next, sizes"
      :total="total"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      @current-change="pageChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import DatePicker from '../../date-picker';
import type { Params, ProTableData, ProTableProps, RequestRes } from './type';
import { valueEnumHandle, optionsHandle } from 'free-utils';
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component({
  components: { DatePicker }
})
export default class ProTable extends Vue {
  /** 请求数据的方法 */
  @Prop({
    type: Function
  })
  readonly request: ((params: Params) => Promise<RequestRes>) | undefined;

  @Prop({ type: Array, default: () => [] })
  readonly columns!: ProTableProps['columns'];

  /** 遍历的主键 */
  @Prop({ type: String, default: 'id' })
  readonly rowKey!: string;

  /** 页面大小 */
  @Prop({ type: Number, default: 50 })
  readonly pageSize!: number;

  /** 当前页的名称 */
  @Prop({ type: String, default: 'page_no' })
  readonly currentField!: string;

  @Prop({ type: String, default: 'page_size' })
  readonly pageSizeField!: string;

  @Prop({ type: Object, default: () => ({}) })
  readonly formConfig: any;

  /** 重置的时候重新加载, 如果关闭了的话点击重置就不会翻到第一页和重新加载 */
  @Prop({ type: Boolean, default: true })
  readonly resetReload: boolean | undefined;

  name = 'ProTable';

  createData (columns?: ProTableProps['columns']): ProTableData['formData'] {
    return (
      (columns || this.columns)
        ?.filter(({ search }) => search)
        .reduce((pre, cur) => {
          return Object.assign(pre, {
            [cur.formName || cur.field]: cur.initValue
          });
        }, {}) || {}
    );
  }

  get formColumns () {
    return [
      ...this.columns
        .filter(({ search }) => search)
        .map(
          ({
            title,
            field,
            valueEnum,
            options,
            formLabel,
            formName,
            ...reset
          }) => {
            return {
              title,
              field,
              options: options ?? valueEnumHandle(valueEnum || []),
              formLabel: formLabel || title,
              formName: formName || field,
              valueEnum,
              ...reset
            };
          }
        )
    ];
  }

  get columnsOpt () {
    return this.columns.map(({ options, valueEnum, ...resets }) => {
      const optionsSource = options || valueEnum;
      return {
        valueEnum: optionsSource ? optionsHandle(optionsSource) : undefined,
        options,
        ...resets
      };
    });
  }

  /** 是否在加载中 */
  loading = false;
  formData: ProTableData['formData'] = this.createData();
  tempFormData: ProTableData['formData'] = this.createData();
  tableData: ProTableData['tableData'] = [];
  total = 0;
  current = 1;
  pageSizeData = 0;

  mounted () {
    this.formData = this.createData();
    this.tempFormData = this.createData();
    this.getTableData();
  }

  formatterHandle (
    val: string,
    valueEnum: Map<string | number, string | number>
  ) {
    const res = valueEnum.get(val);
    return res !== undefined ? res : ([undefined, null, ''].includes(val) ? '--' : val);
  }

  /** 获取数据信息 */
  getFormData () {
    const { currentField, pageSizeField, current, pageSize, formData } = this;
    return {
      ...formData,
      [currentField]: current,
      [pageSizeField]: pageSize
    };
  }

  async getTableData () {
    if (!this.request) {
      return;
    }
    this.loading = true;
    try {
      const { list, ...resetData } =
        (await this.request(this.getFormData())) || {};
      const tableData = list || resetData.tableData || [];
      Object.assign(this, { ...resetData, tableData });
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  selectSubmit () {
    Object.assign(this.formData, this.tempFormData);
    this.pageChange(1)
  }

  resetFormData () {
    Object.assign(this.tempFormData, this.createData(this.columns));
    if (this.resetReload) {
      Object.assign(this.formData, this.tempFormData);
      this.pageChange(1);
    }
  }

  uploadTable () {
    this.getTableData();
  }

  refreshTableData () {
    this.current = 1;
    this.getTableData();
  }

  sizeChange (num: number) {
    this.pageSizeData = num;
    this.getTableData();
  }

  pageChange (current: number) {
    this.current = current;
    this.getTableData();
  }
}
</script>

<style lang="less" scoped>
.form-item {
  display: flex;
  margin-bottom: 0;
  min-height: 40px;
}
/deep/.el-form-item__content {
  flex: 1;
}
.item-content {
  width: 100%;
}
.pro-table-container {
  background: #fff;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: block;
  overflow: auto;
}
.operate-bar {
  float: right;
  padding-bottom: 4px;
  line-height: 38px;
}
</style>
