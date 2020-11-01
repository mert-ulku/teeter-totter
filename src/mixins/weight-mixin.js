export default {
    props: {
        weight: {
            type: Number,
            required: true
        },
        hasTransition: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    mounted(){

        setTimeout(() => {
            this.$refs.shape.style.bottom = 0
        }, 100)

    }
}