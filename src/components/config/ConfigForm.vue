<template>
    <div class="config-form">
        <h3>{{ current.name }}</h3>
        <a-form ref="formRef">
            <a-form-item label="Activity form" name="desc">
                <a-textarea :value="current && current.data && current.data.text || ''" @change="onChange"/>
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts">
import { useSketchStore } from '../../store/sketch'
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: ' ConfigForm',
    setup() {
        const store = useSketchStore()
        const showForm = computed(() => typeof store.activeId === 'number')

        const onChange = (val:InputEvent) => {
            console.log(val)
            const list = store.componentList.map(item => {
                if(item.id === 0) {
                    item.data.text = (val.target as HTMLInputElement).value
                }
                return item
            })
            store.$patch({
                componentList: list
            })

        }
        
        return {
            showForm,
            onChange,
            current: computed(()=> store.current),
        }
    },
})
</script>
<style lang="scss">
.config-form {
    width: 500px;
}
</style>
