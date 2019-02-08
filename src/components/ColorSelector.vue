<template>
    <div class="color-selector btn-group" role="group">
        <button
            v-for="color in colors"
            :key="color"
            type="button"
            class="btn color-selector__btn"
            @click="colorSelected(color)"
            :style="{backgroundColor:color}"
        ></button>
    </div>
</template>

<script>
    export default {
        name: "color-selector",
        data() {
            return {
                colors: ["#A872F9", "#F98E72", "#72D4F9", "#A7E56D"]
            };
        },
        methods: {
            /**
             * A color has been selected, tell the parent
             */
            colorSelected(color) {
                this.$emit("colorSelected", [null, color]);
            }
        }
    };
</script>

<style lang="scss">
    .color-selector {
        padding-top: 0.5rem;
    }

    .color-selector__btn {
        width: 2rem;
        height: 2rem;
        border: 0;
        padding: 0;
        margin: 0;
    }
</style>