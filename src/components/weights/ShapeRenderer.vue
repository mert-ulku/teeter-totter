<template>
    <div class="shapes-wrapper">
        <component 
            v-for="(shape, index) in shapes"
            :key="index" 
            :is="shape.type" 
            :weight="shape.weight"
            :has-transition="hasTransition"
            class="shape-position"
            :style="{
                transition: hasTransition ? 'bottom 2.5s linear' : 'none', 
                left: `${shape.position}px`
            }"
            :ref="`shape-${index}`"
        >
        </component>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'
    import CircleWeight from './Circle'
    import RectangleWeight from './Rectangle'
    import TriangleWeight from './Triangle'

    export default {
        name: 'ShapeRenderer',
        components: {
            CircleWeight,
            RectangleWeight,
            TriangleWeight
        },
        props: {
            shapes: {
                type: Array,
                required: true
            },
            hasTransition: {
                type: Boolean,
                required: true
            }
        },
        data(){
            return {
                timeout: undefined
            }
        },
        computed: {
            ...mapGetters({
                isGamePaused: 'isGamePaused',
                leftSide: 'leftSide'
            })

        },
        methods: {
            ...mapActions({
                changeBalance: 'changeBalance'
            })
        },
        watch: {
            isGamePaused(newVal){

                if(!this.hasTransition) return

                const reference =  this.$refs[`shape-${this.leftSide.length - 1}`]

                if(!reference) return false;

                const element = reference[0].$el

                const bottomDistance = element.offsetTop + element.offsetHeight

                if(bottomDistance >= 400) return false;

                if(newVal){

                    element.style.bottom = getComputedStyle(element, null).getPropertyValue('bottom')

                    if(this.timeout) window.clearTimeout(this.timeout)

                } else {

                    const calculation = 2 * parseInt(getComputedStyle(element, null).getPropertyValue('bottom')) / 400
                    
                    element.style.transition = `bottom ${calculation}s linear`
                    element.style.bottom = '0px'
                    
                    this.timeout = setTimeout(() => { 
                        this.changeBalance()
                    }, calculation * 1000)

                }

            },
            shapes(newValue){

                this.$nextTick(() => {

                    if(!this.hasTransition || this.isGamePaused) return

                    const reference = this.$refs[`shape-${newValue.length - 1}`]

                    if(!reference) return false;

                    const element = reference[0].$el

                    const bottomDistance = element.offsetTop + element.offsetHeight

                    if(bottomDistance >= 400) return false;

                    const balanceFn = () => {
                        this.changeBalance()
                        element.removeEventListener('transitionend', balanceFn)
                    }

                    element.addEventListener('transitionend', balanceFn)

                })


                
            }
        }

    }

</script>

<style lang="scss" scoped>

    .shapes-wrapper {
        position: relative;
        width: 400px;
        height: 400px;
        overflow: hidden;

        .shape-position {
            position: absolute;
            bottom: 500px;
        }
    }


</style>