<template>
	 <a-form :form="form" @submit="handleSubmit" ref="form">
        <a-form-item
                v-for="(item) in this.formConfig"
                :key="item.key"
                v-bind="formItemLayout"
                :label="noLabel ? '' : item.label"
                :validate-status="keyError(item.key,item.requiredMsg ) ? 'error' : ''"
                :help="keyError(item.key,item.requiredMsg ) || ''"
                :required="item.required">
            <!--文字输入框-->
            <a-input v-if="item.type === 'input'" :disabled="item.disabled" autocomplete="off" v-bind="formItemLayout"
                     v-decorator="[
            `${item.key}`,
          {
            validateTrigger: ['change', 'blur'],
            initialValue: item.value,
            rules: [{
              required: item.required,
              pattern: item.pattern,
              max: item.maxLength,
              whitespace: true,
              message: `${item.errorMsg ? item.errorMsg : ''}`,
            }],
          }
        ]"
                     :placeholder="`${item.placeholder ? item.placeholder : ''}`"
            >
                <a-icon v-if="item.icon"
                        slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
            </a-input>
            <!--邮箱输入框-->
            <a-input v-if="item.type === 'email'"
                     :disabled="item.disabled" autocomplete="off" v-bind="formItemLayout"
                     v-decorator="[
            `${item.key}`,
          {
            validateTrigger: ['change', 'blur'],
            initialValue: item.value,
            rules: [{
              type: 'email',
              required: item.required,
              whitespace: true,
              message: `${item.errorMsg ? item.errorMsg : ''}`,
            },{validator: emailValidator,}],
          }
        ]" :placeholder="`${item.placeholder ? item.placeholder : ''}`">
            </a-input>
            <a-input v-if="item.type === 'password'"
                     v-decorator="[
            `${item.key}`,
          {
            validateTrigger: ['change', 'blur'],
            initialValue: item.value,
            rules: [{
              required: item.required,
              pattern: item.pattern,
              message: `${item.requiredMsg ? item.requiredMsg : ''}`,
            }],
          }
        ]"
                     type="password"
                     :placeholder="`${item.placeholder ? item.placeholder : ''}`"
            >
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input>
            <!--数字输入框-->
            <a-input-number v-if="item.type === 'number'"
                            :min="item.minNumber ? item.minNumber : 0"
                            :max="item.maxNumber ? item.maxNumber : 999"
                            step="1"
                            :placeholder="`${item.placeholder ? item.placeholder : ''}`"
                            v-decorator="[`${item.key}`, { initialValue: item.value,  rules: [{
                            type: 'number',
              required: item.required,
              whitespace: false,
              message: `${item.errorMsg}`,
            }],}]"
            />
            <!--选择器(selectMode控制多选，单选)-->
            <a-select v-if="item.type === 'select'" :disabled="item.disabled"
                      :allowClear="true"
                      :mode="item.selectMode ? item.selectMode : ''"
                      :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}"
                      v-decorator="[
          `${item.key}`,
          {initialValue: item.value,
           rules: [{ required: item.required, message: `${item.errorMsg}`,
           type: item.selectMode==='multiple'?'array':item.validateType}]}
        ]"
                      :placeholder="`${item.placeholder ? item.placeholder : ''}`"
            >
                <a-select-option v-for="i in item.selectInfo"
                                 :key="i.key"> {{i.label}}
                </a-select-option>
            </a-select>
            <!--查看且无法编辑的span-->
            <span v-if="item.type === 'span'" v-decorator="[
          `${item.key}`,{initialValue: item.value,}]">
                <!--{{`${item.value}`}}-->
                {{item.value | formPipe(item.pipe)}}
          </span>
            <!--时间选择器，showTime控制显示是否显示时间-->
            <a-date-picker v-if="item.type === 'dataPicker'" :disabled="item.disabled"
                           :getCalendarContainer="triggerNode => {return triggerNode.parentNode || document.body;}"
                           v-decorator="[ `${item.key}`,
          {initialValue: item.value,type: 'object',
           rules: [{ required: item.required, message: `${item.errorMsg}`,
           }]}]" :placeholder="item.placeholder"
                           :show-time="item.showTime"
                           :format="item.showTime? `YYYY-MM-DD HH:mm:ss` : `YYYY-MM-DD`"
            />
            <a-range-picker v-if="item.type === 'rangePicker'" :disabled="item.disabled"
                            :getCalendarContainer="triggerNode => {return triggerNode.parentNode || document.body;}"
                            v-decorator="[ `${item.key}`,
          {initialValue: item.value,type: 'object',
           rules: [{ required: item.required, message: `${item.errorMsg}`,
           }]}]" :placeholder="[`${item.startPlaceholder}`, `${item.endPlaceholder}`]"
                            :show-time="item.showTime? {
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
      } : false"
                            :format="item.showTime? `YYYY-MM-DD HH:mm:ss` : `YYYY-MM-DD`"
            />
            <a-time-picker v-if="item.type === 'timePicker'" :disabled="item.disabled"
                           :getCalendarContainer="triggerNode => {return triggerNode.parentNode || document.body;}"
                           v-decorator="[ `${item.key}`,
          {initialValue: item.value,type: 'object',
           rules: [{ required: item.required, message: `${item.errorMsg}`,
           }]}]" :placeholder="item.placeholder"
            >
            </a-time-picker>
            <!--多选框-->
            <a-checkbox-group v-if="item.type === 'checkBox'"
                              :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}"
                              v-decorator="[ `${item.key}`,
          {initialValue: item.value,type: 'Array',
           rules: [{ required: item.required, message: `${item.errorMsg}`,
           }]}]"
                              :options="item.checkOptions"/>
            <slot v-if="item.type === 'slot'" :name="item.key" :data="item.key">
            </slot>
            <!--备注框-->
            <a-textarea v-if="item.type === 'textarea'"
                        v-decorator="[
            `${item.key}`,
          {
            rules: [{
              required: item.required,
              max: item.maxLength,
              message: `${item.errorMsg ? item.errorMsg : ''}`,
            }],
          }
        ]"
                        :placeholder="`${item.placeholder ? item.placeholder : ''}`"
                        :rows="4" style="resize: none"/>
            <!--级联选择-->
            <a-cascader v-if="item.type === 'cascader'" :disabled="item.disabled"
                        :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body;}"
                        v-decorator="[
            `${item.key}`,
          { initialValue: item.value,type: 'array',
            rules: [{
              required: item.required,
              message: `${item.errorMsg ? item.errorMsg : ''}`,
            }],
          }
        ]" :placeholder="`${item.placeholder ? item.placeholder : ''}`"
                        :options="item.options"
                        changeOnSelect
            />
        </a-form-item>

        <div class="submit-class">
            <a-form-item v-show="hasSubmit">
                <a-button :disabled="hasErrors(form.getFieldsError())"
                          type="primary"
                          v-show="hasSubmit"
                          :style="submitStyle"
                          html-type="submit"
                          :loading="formLoading"
                >
                    {{ submitName || '确定'}}
                </a-button>
                <a-button style="margin-left: 30px"
                          v-if="noCancel"
                          @click="handleCancel"
                >
                    {{ '取消'}}
                </a-button>
            </a-form-item>
        </div>

    </a-form>
</template>

<script lang="ts" src="./hForm.ts" />
<style lang="scss" src="./hForm.scss" />
