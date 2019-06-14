<template>
    <svg>
        <use :xlink:href="`#${name}`" :style="`fill:${fill}`"></use>
    </svg>
</template>

<script>
    export default {
        name: "icon",
        props: ['name', 'fill'],
    }
</script>

<style scoped>

</style>