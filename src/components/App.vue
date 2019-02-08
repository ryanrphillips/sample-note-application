<template>
    <div class="main">
        <div class="container">
            <div class="grid">
                <div class="row">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <input
                                            v-model="newNote.title"
                                            type="text"
                                            class="form-control"
                                            placeholder="New Note"
                                        >
                                        <color-selector @colorSelected="setNoteColor"></color-selector>
                                    </div>
                                    <div
                                        class="card-body"
                                        :style="{backgroundColor: newNote.color}"
                                    >
                                        <textarea
                                            v-model="newNote.content"
                                            type="text"
                                            class="form-control"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#" class="card-link" @click="saveNote">Save</a>
                                        <a href="#" class="card-link" @click="clearNewNote">Clear</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="row">
                            <note-item
                                v-for="note in notes"
                                :key="note.uuid"
                                :note="note"
                                @updateColor="setNoteColor"
                                @deleteNote="deleteNote"
                            ></note-item>
                            <div v-show="!notes.length" class="col-12">
                                <div
                                    class="alert alert-primary"
                                    role="alert"
                                >You have no notes. Use the form on the left to add a new one.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // Component and lib imports
    import uuidv1 from "uuid/v1";
    import ColorSelector from "./ColorSelector";
    import NoteItem from "./NoteItem";

    export default {
        name: "app",
        components: {
            NoteItem,
            ColorSelector
        },
        data: function() {
            return {
                notes: [
                    {
                        uuid: uuidv1(),
                        title: "Example Note",
                        content: "This is the note content.",
                        color: "#A872F9"
                    },
                    {
                        uuid: uuidv1(),
                        title: "Complete Note Task",
                        content: "Hopefully they think it's good.",
                        color: "#72D4F9"
                    },
                    {
                        uuid: uuidv1(),
                        title: "Send Application",
                        content: "Finger crossed for no spelling mistakes.",
                        color: "#F98E72"
                    }
                ],
                newNote: {
                    uuid: null,
                    title: "",
                    content: "",
                    color: ""
                }
            };
        },
        methods: {
            /**
             * Save a new note. Append uuid on save (timestamped)
             */
            saveNote() {
                this.newNote.uuid = uuidv1();
                this.notes = [...this.notes, this.newNote];

                // After saving, clear the form
                this.clearNewNote();
            },

            /**
             * Reset the new note form
             */
            clearNewNote() {
                this.newNote = {
                    uuid: null,
                    title: "",
                    content: "",
                    color: ""
                };
            },

            /**
             * Set the color of the active note. If no uuid is set, it's a new note
             */
            setNoteColor(data) {
                // Deconstruct array into vars
                let [uuid, color] = data;

                // If no uuid, it's a new note
                if (!uuid) {
                    this.newNote.color = color;
                } else {
                    // Find the note by uuid
                    let thisNote = this.notes.find(note => {
                        return note.uuid === uuid;
                    });

                    thisNote.color = color;
                }
            },

            /**
             * Remove a note by uuid
             */
            deleteNote(uuid) {
                this.notes = this.notes.filter(note => {
                    return note.uuid !== uuid;
                });
            }
        }
    };
</script>