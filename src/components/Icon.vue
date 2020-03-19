<template>
    <svg class="icon">
        <use :xlink:href="'#'+name"/>
    </svg>
</template>

<script lang="ts">
    const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
    try {
        //经验告诉我，这个代码在单元测试的时候可能会有问题，于是我就加了一个try catch
        importAll(require.context('../assets/icons', true, /\.svg$/));
    } catch (error) {
        console.log(error);
    }
    export default {
        props:['name'],
        name: "icons"
    }
</script>

<style scoped>
    .icon {
        width: 1.5em; height: 1.5em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>