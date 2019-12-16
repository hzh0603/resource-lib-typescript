<template>
  <div>
    <a-collapse
      :defaultActiveKey="defaultActiveKey"
      :activeKey="activeKey"
      :bordered="false"
      :key="item"
      v-for="item in  data"
    >
      <a-collapse-panel
        :header="item.label"
        :key="item.key"
      >
        <slot :name="item.value">
        </slot>
      </a-collapse-panel>
    </a-collapse>
  </div>

</template>

<script lang="ts" src="./hCollapse.ts" />
<style lang="scss" src="./hCollapse.scss" />
