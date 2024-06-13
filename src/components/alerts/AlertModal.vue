<template>
    <div class="conainter p-0">
        <div class="row">
            <div class="col-12">
                <div v-if="error" class="alert alert-danger" role="alert">
                    {{ message }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div v-if="success" class="alert alert-success" role="alert">
                    {{ message }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AlertModal",
    props: {
        success: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        }
    }

}
</script>