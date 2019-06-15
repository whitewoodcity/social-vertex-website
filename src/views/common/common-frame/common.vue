<template>
    <!-- tab page 的common frame -->
    <div class="common">
        <a-row><div class="guiding-line"></div></a-row>
        <a-row>
            <a-col :span="3"><div class="purple-side"></div></a-col>
            <a-col :span="18">

            </a-col>
            <a-col :span="3"><div class="purple-side"></div></a-col>
        </a-row>
    </div>
</template>

<script>
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";

    export default {
        components: {ACol, ARow},
    };
</script>

<style scoped>
    .guiding-line{
        height: 10px;
        width: 100%;
        background-color: #6f338b;
    }
    .purple-side{
        background-color: #6f338b;
        height: 100vh;
    }

</style>
