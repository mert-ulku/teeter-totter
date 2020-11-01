<template>
    <div class="rectangle" ref="shape">
        {{ weight }} kg
    </div>
</template>

<script>

    import weightMixin from '../../mixins/weight-mixin'

    export default {
        name: 'RectangleWeight',
        mixins: [ weightMixin ]
    }

</script>

<style lang="scss" scoped>

    .rectangle {
        height: 60px;
        width: 120px;
        background: rebeccapurple;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>