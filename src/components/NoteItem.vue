<template>
    <div class="col-6 mb-4">
        <div class="card">
            <div class="card-header">
                <p v-if="!editing">{{ note.title }}</p>
                <input v-else type="text" class="form-control" :value="note.title">

                <color-selector v-show="editing" @colorSelected="updateNoteColor"></color-selector>
            </div>
            <div class="card-body" :style="{backgroundColor: note.color}">
                <p v-if="!editing">{{ note.content }}</p>
                <textarea v-else v-model="note.content" type="text" class="form-control" rows="4"></textarea>
            </div>
            <div class="card-footer">
                <a
                    href="#"
                    class="card-link"
                    @click="toggleEditing"
                >{{ !editing ? 'Edit' : 'Save' }}</a>
                <a href="#" @click="deleteNote" class="card-link">Delete</a>
            </div>
        </div>
    </div>
</template>

<script>
    import ColorSelector from "./ColorSelector";

    export default {
        name: "note-item",
        components: {
            ColorSelector
        },
        props: {
            note: Object
        },
        data() {
            return {
                editing: false
            };
        },
        methods: {
            /**
             * Update the editing state of this note
             */
            toggleEditing() {
                this.editing = !this.editing;
            },

            /**
             * Emit an event saying this notes color as changed
             */
            updateNoteColor(color) {
                this.$emit("updateColor", [this.note.uuid, color]);
            },

            /**
             * Emit an event saying this note has been deleted
             */
            deleteNote() {
                this.$emit("deleteNote", this.note.uuid);
            }
        }
    };
</script>