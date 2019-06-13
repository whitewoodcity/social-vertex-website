<template>
  <div class="community">
    <a-row><div class="guiding-line"></div></a-row>
    <a-row>
      <a-col :span="12">
        <a-input-search
                placeholder="input search text"
                style="width: 200px"
                @search="onSearch"
        />
      </a-col>
      <a-col :span="12">some Links</a-col>
    </a-row>
    <a-row>
      <a-col :span="16">col-16</a-col>
      <a-col :span="8">col-8</a-col>
    </a-row>
    <a-row>
      <a-col :span="24">footer</a-col>
    </a-row>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  components: {ACol, ARow}
};
</script>

<style scoped>
  .guiding-line{
    height: 30px;
    width: 100%;
    background-color: #6f338b;
  }
</style>
