<template>

    <div class="triangle-wrapper" ref="shape">
        <div class="triangle">
        </div>
        <div class="triangle-weight">
            {{weight}} kg
        </div>
    </div>

</template>

<script>

    import weightMixin from '../../mixins/weight-mixin'


    export default {
        name: 'TriangleWeight',
        mixins: [ weightMixin ]
        
    }


</script>

<style lang="scss" scoped>

    .triangle-wrapper {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .triangle {
            width: 0; 
            height: 0; 
            border-left: 40px solid transparent;
            border-right: 40px solid transparent; 
            border-bottom: 80px solid yellow;
            
        }


        .triangle-weight {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }


</style>