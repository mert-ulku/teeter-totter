<template>
    <div class="circle" ref="shape">
        {{ weight}} kg
    </div>
</template>

<script>

    import weightMixin from '../../mixins/weight-mixin'

    export default {
        name: 'CircleWeight',
        mixins: [ weightMixin ]   
    }

</script>

<style lang="scss" scoped>

    .circle {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        background-color: orangered;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>